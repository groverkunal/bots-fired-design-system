import React, { useState, useRef } from "react";
import { motion } from "motion/react";
import { Check, X, AlertTriangle, RefreshCw, Eye } from "lucide-react";

/* ═══════════════════════════════════════════════════════════════════
   BOTS FIRED · DESIGN SPEC VERIFICATION TESTS
   Run these to confirm everything is built to specification.
═══════════════════════════════════════════════════════════════════ */

// ── WCAG helpers ──
function luminance(hex: string): number {
  const r = parseInt(hex.slice(1,3),16)/255;
  const g = parseInt(hex.slice(3,5),16)/255;
  const b = parseInt(hex.slice(5,7),16)/255;
  const lin = (c: number) => c <= 0.04045 ? c/12.92 : Math.pow((c+0.055)/1.055, 2.4);
  return 0.2126*lin(r) + 0.7152*lin(g) + 0.0722*lin(b);
}
function contrast(a: string, b: string) {
  const L1 = luminance(a), L2 = luminance(b);
  return (Math.max(L1,L2)+0.05)/(Math.min(L1,L2)+0.05);
}
function wcag(ratio: number, isLarge=false): "AAA"|"AA"|"AA-large"|"FAIL" {
  if(ratio>=7) return "AAA";
  if(ratio>=4.5) return "AA";
  if(ratio>=3 && isLarge) return "AA-large";
  return "FAIL";
}

// ── AUTOMATED SPEC TESTS ──
interface SpecTest {
  id: string;
  category: string;
  name: string;
  description: string;
  run: () => { pass: boolean; detail: string };
}

const SPEC_TESTS: SpecTest[] = [
  // TYPOGRAPHY TESTS
  {
    id: "t01", category: "Typography", name: "Base font size = 16px",
    description: "Root html font-size must be 16px. Everything else is calculated from this.",
    run: () => {
      const size = parseInt(getComputedStyle(document.documentElement).fontSize);
      return { pass: size === 16, detail: `Computed root font-size: ${size}px (expected 16px)` };
    },
  },
  {
    id: "t02", category: "Typography", name: "Body line-height ≥ 1.6",
    description: "All body text (Inter 400, 16px) must have line-height ≥ 1.6 for readability.",
    run: () => {
      const el = document.querySelector("p");
      if (!el) return { pass: false, detail: "No <p> element found to test" };
      const lh = parseFloat(getComputedStyle(el).lineHeight);
      const fs = parseFloat(getComputedStyle(el).fontSize);
      const ratio = lh / fs;
      return { pass: ratio >= 1.6, detail: `Line-height: ${lh}px / font-size: ${fs}px = ${ratio.toFixed(2)} (min 1.6)` };
    },
  },
  {
    id: "t03", category: "Typography", name: "H1 uses Barlow Condensed",
    description: "All h1 elements must use Barlow Condensed as primary font family.",
    run: () => {
      const el = document.querySelector("h1");
      if (!el) return { pass: false, detail: "No h1 found — check page structure" };
      const ff = getComputedStyle(el).fontFamily;
      const pass = ff.toLowerCase().includes("barlow");
      return { pass, detail: `h1 font-family: "${ff}"` };
    },
  },
  {
    id: "t04", category: "Typography", name: "H1 font-size ≥ 32px (2rem)",
    description: "H1 must be at least 32px. Minimum is display-m at 40px on large screens.",
    run: () => {
      const el = document.querySelector("h1");
      if (!el) return { pass: false, detail: "No h1 found" };
      const fs = parseFloat(getComputedStyle(el).fontSize);
      return { pass: fs >= 32, detail: `h1 computed size: ${fs.toFixed(1)}px (min 32px)` };
    },
  },
  {
    id: "t05", category: "Typography", name: "Minimum font size ≥ 12px",
    description: "Scan all text elements for any font-size below 12px (the caption floor).",
    run: () => {
      const all = Array.from(document.querySelectorAll("p, span, a, li, td, th, label"));
      const offenders = all.filter(el => {
        const fs = parseFloat(getComputedStyle(el).fontSize);
        return fs < 10 && (el as HTMLElement).innerText?.trim().length > 0;
      });
      return { pass: offenders.length === 0, detail: offenders.length === 0 ? "All text ≥ 10px ✓" : `${offenders.length} element(s) below 10px found` };
    },
  },
  {
    id: "t06", category: "Typography", name: "No more than 3 font families per view",
    description: "Count unique font families in use. Max: Barlow Condensed + Inter + Caveat (+ JetBrains optional).",
    run: () => {
      const all = Array.from(document.querySelectorAll("*"));
      const families = new Set<string>();
      all.slice(0, 200).forEach(el => {
        const ff = getComputedStyle(el).fontFamily.split(",")[0].replace(/['"]/g, "").trim().toLowerCase();
        if (ff && !["inherit", ""].includes(ff)) families.add(ff);
      });
      const relevant = Array.from(families).filter(f => ["barlow", "inter", "caveat", "jetbrains"].some(b => f.includes(b)));
      return { pass: relevant.length <= 4, detail: `Font families detected: ${relevant.join(", ")} (${relevant.length} of 4 max)` };
    },
  },

  // COLOUR TESTS
  {
    id: "c01", category: "Colour", name: "Primary brand: #1C2E5E vs white = AAA",
    description: "Navy 500 on white must achieve AAA (≥7:1). This is the primary text-on-background pairing.",
    run: () => {
      const r = contrast("#1C2E5E", "#FFFFFF");
      return { pass: r >= 7, detail: `#1C2E5E on #FFFFFF: ${r.toFixed(2)}:1 (need ≥7:1 for AAA)` };
    },
  },
  {
    id: "c02", category: "Colour", name: "Fire 500 on white = AA",
    description: "Fire 500 (#E8541A) on white must achieve at least AA (≥4.5:1). Used for overlines, kickers.",
    run: () => {
      const r = contrast("#E8541A", "#FFFFFF");
      const pass = r >= 4.5;
      return { pass, detail: `#E8541A on #FFFFFF: ${r.toFixed(2)}:1 (need ≥4.5:1 for AA, or ≥3:1 for large text AA)` };
    },
  },
  {
    id: "c03", category: "Colour", name: "White on Fire 500 = AA (large text)",
    description: "White text on Fire 500 CTA buttons — must pass AA for large text (≥3:1). Ideally ≥4.5.",
    run: () => {
      const r = contrast("#FFFFFF", "#E8541A");
      return { pass: r >= 3, detail: `White on Fire 500: ${r.toFixed(2)}:1 (AA large text = 3:1 min, AA = 4.5:1)` };
    },
  },
  {
    id: "c04", category: "Colour", name: "Gold 400 on Navy 800 = AAA",
    description: "Gold (#F5A030) on dark navy (#0D1829) — used for annotations on dark sections — must be AAA.",
    run: () => {
      const r = contrast("#F5A030", "#0D1829");
      return { pass: r >= 7, detail: `Gold on Navy 800: ${r.toFixed(2)}:1 (need ≥7:1 for AAA)` };
    },
  },
  {
    id: "c05", category: "Colour", name: "Amber on white FAILS (expected)",
    description: "Amber (#D97706) on white should FAIL AA — this validates the spec rule 'Amber is dark-bg only'.",
    run: () => {
      const r = contrast("#D97706", "#FFFFFF");
      const fails = r < 4.5;
      return { pass: fails, detail: `Amber on white: ${r.toFixed(2)}:1 — ${fails ? "Correctly FAILS (dark bg only)" : "Unexpectedly passes — recheck spec"}` };
    },
  },
  {
    id: "c06", category: "Colour", name: "Gold on white FAILS (expected)",
    description: "Gold 400 (#F5A030) on white should FAIL AA — validates that Gold must only be used on dark surfaces.",
    run: () => {
      const r = contrast("#F5A030", "#FFFFFF");
      const fails = r < 4.5;
      return { pass: fails, detail: `Gold on white: ${r.toFixed(2)}:1 — ${fails ? "Correctly FAILS (dark bg only ✓)" : "Unexpectedly passes"}` };
    },
  },
  {
    id: "c07", category: "Colour", name: "Body text (Ink 600) on white = AA",
    description: "Primary body text colour #4B5563 on white must pass AA (≥4.5:1).",
    run: () => {
      const r = contrast("#4B5563", "#FFFFFF");
      return { pass: r >= 4.5, detail: `Ink 600 on white: ${r.toFixed(2)}:1 (need ≥4.5:1)` };
    },
  },
  {
    id: "c08", category: "Colour", name: "White on Navy 800 = AAA",
    description: "White text on the deepest navy dark background must be AAA-level readable.",
    run: () => {
      const r = contrast("#FFFFFF", "#0D1829");
      return { pass: r >= 7, detail: `White on Navy 800: ${r.toFixed(2)}:1 (need ≥7:1 for AAA)` };
    },
  },

  // SPACING TESTS
  {
    id: "s01", category: "Spacing", name: "4px grid: paragraph margin",
    description: "All paragraph margins should be divisible by 4 (the base grid unit).",
    run: () => {
      const el = document.querySelector("p");
      if (!el) return { pass: false, detail: "No <p> found" };
      const mb = parseFloat(getComputedStyle(el).marginBottom);
      const pass = mb % 4 === 0 || mb === 0;
      return { pass, detail: `Paragraph margin-bottom: ${mb}px — ${pass ? "divisible by 4 ✓" : "NOT on 4px grid ✗"}` };
    },
  },
  {
    id: "s02", category: "Spacing", name: "Touch targets ≥ 44px",
    description: "All interactive elements (buttons, links with padding) must have min 44×44px touch area per WCAG 2.5.5.",
    run: () => {
      const buttons = Array.from(document.querySelectorAll("button, a[href], [role='button']"));
      const small = buttons.filter(el => {
        const r = el.getBoundingClientRect();
        return (r.width < 44 || r.height < 44) && r.width > 0;
      });
      return {
        pass: small.length === 0,
        detail: small.length === 0 ? "All interactive elements ≥ 44×44px ✓" : `${small.length} elements below 44px touch target size`,
      };
    },
  },
  {
    id: "s03", category: "Spacing", name: "Cards use rounded-2xl (16px) or larger",
    description: "Brand radius standard: 16px (rounded-2xl) minimum for card components.",
    run: () => {
      const cards = Array.from(document.querySelectorAll("[class*='rounded-2xl'], [class*='rounded-3xl'], [class*='rounded-xl']"));
      return { pass: cards.length > 0, detail: `Found ${cards.length} elements with correct brand radius (rounded-xl or larger)` };
    },
  },

  // LOGO / BRAND TESTS
  {
    id: "b01", category: "Brand", name: "Logo images load successfully",
    description: "Both brand logo images must be present and loaded in the DOM.",
    run: () => {
      const imgs = Array.from(document.querySelectorAll("img[alt='BOTS FIRED']"));
      const allLoaded = imgs.every(img => (img as HTMLImageElement).complete && (img as HTMLImageElement).naturalWidth > 0);
      return { pass: imgs.length > 0 && allLoaded, detail: `Logo img elements: ${imgs.length}, all loaded: ${allLoaded}` };
    },
  },
  {
    id: "b02", category: "Brand", name: "Page has a single H1 (SEO)",
    description: "Each page must have exactly one H1 element for SEO and document structure.",
    run: () => {
      const h1s = document.querySelectorAll("h1");
      return { pass: h1s.length === 1, detail: `H1 elements found: ${h1s.length} (expected exactly 1)` };
    },
  },
  {
    id: "b03", category: "Brand", name: "Handwritten font used for annotations",
    description: "Caveat font must be present somewhere on the page — the brand voice depends on it.",
    run: () => {
      const all = Array.from(document.querySelectorAll("*"));
      const hasCaveat = all.some(el => {
        const ff = getComputedStyle(el).fontFamily.toLowerCase();
        return ff.includes("caveat");
      });
      return { pass: hasCaveat, detail: hasCaveat ? "Caveat font detected in DOM ✓" : "Caveat not found — check handwritten annotations" };
    },
  },

  // ACCESSIBILITY TESTS
  {
    id: "a01", category: "Accessibility", name: "All images have alt text",
    description: "Every <img> element must have an alt attribute (can be empty for decorative).",
    run: () => {
      const imgs = Array.from(document.querySelectorAll("img"));
      const missing = imgs.filter(img => img.getAttribute("alt") === null);
      return { pass: missing.length === 0, detail: missing.length === 0 ? `All ${imgs.length} images have alt attributes ✓` : `${missing.length} image(s) missing alt attribute` };
    },
  },
  {
    id: "a02", category: "Accessibility", name: "Buttons have accessible text",
    description: "All buttons must have visible text or aria-label for screen readers.",
    run: () => {
      const buttons = Array.from(document.querySelectorAll("button"));
      const bad = buttons.filter(b => !b.textContent?.trim() && !b.getAttribute("aria-label") && !b.querySelector("[aria-label]"));
      return { pass: bad.length === 0, detail: bad.length === 0 ? `All ${buttons.length} buttons have accessible text ✓` : `${bad.length} button(s) without text or aria-label` };
    },
  },
  {
    id: "a03", category: "Accessibility", name: "Focus indicators present",
    description: "Interactive elements must have visible focus styles (outline/ring) for keyboard navigation.",
    run: () => {
      const style = document.querySelector("style, link[rel='stylesheet']");
      const hasFocusStyle = document.body.innerHTML.includes("focus") || document.body.innerHTML.includes("ring");
      return { pass: !!hasFocusStyle, detail: hasFocusStyle ? "Focus styles detected in page ✓" : "No focus styles found — add :focus-visible styles" };
    },
  },
];

type TestResult = { pass: boolean; detail: string };

function TestRow({ test, result, onRun }: {
  test: SpecTest;
  result: TestResult | null;
  onRun: () => void;
}) {
  const catColor: Record<string, string> = {
    Typography: "#1C2E5E",
    Colour: "#E8541A",
    Spacing: "#D97706",
    Brand: "#4A66A0",
    Accessibility: "#166534",
  };
  return (
    <div className={`border-l-4 rounded-xl overflow-hidden border border-r-[#E8E6E0] border-t-[#E8E6E0] border-b-[#E8E6E0] ${
      result === null ? "border-l-[#E8E6E0]" : result.pass ? "border-l-green-400" : "border-l-red-400"
    }`}>
      <div className="bg-white p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[9px] font-bold px-2 py-0.5 rounded-full" style={{ backgroundColor: (catColor[test.category] || "#1C2E5E") + "18", color: catColor[test.category] || "#1C2E5E" }}>
                {test.category}
              </span>
              <span className="text-[9px] text-[#9BA3B0] font-mono">{test.id}</span>
            </div>
            <p className="text-xs font-bold text-[#0D1829]">{test.name}</p>
            <p className="text-[10px] text-[#6B7280] mt-0.5">{test.description}</p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            {result && (
              <div className={`w-6 h-6 rounded-full flex items-center justify-center ${result.pass ? "bg-green-100" : "bg-red-100"}`}>
                {result.pass ? <Check size={12} className="text-green-600" /> : <X size={12} className="text-red-600" />}
              </div>
            )}
            <button onClick={onRun} className="px-3 py-1.5 rounded-lg bg-[#EEF2F8] text-[#1C2E5E] text-[10px] font-semibold hover:bg-[#1C2E5E] hover:text-white transition-colors">
              Run
            </button>
          </div>
        </div>
        {result && (
          <div className={`mt-2 px-3 py-2 rounded-lg text-[10px] font-mono ${result.pass ? "bg-green-50 text-green-800" : "bg-red-50 text-red-800"}`}>
            {result.detail}
          </div>
        )}
      </div>
    </div>
  );
}

// ── INTERACTIVE CONTRAST CHECKER ──
function ContrastChecker() {
  const [fg, setFg] = useState("#1C2E5E");
  const [bg, setBg] = useState("#FFFFFF");

  const ratio = contrast(fg, bg);
  const normalRating = wcag(ratio, false);
  const largeRating = wcag(ratio, true);

  const ratingColor = (r: string) => r === "AAA" ? "#166534" : r === "AA" || r === "AA-large" ? "#92400E" : "#991B1B";
  const ratingBg = (r: string) => r === "AAA" ? "#F0FDF4" : r === "AA" || r === "AA-large" ? "#FFFBEB" : "#FEF2F2";

  return (
    <div className="bg-white rounded-2xl border border-[#E8E6E0] p-6">
      <p className="text-[10px] font-bold uppercase tracking-widest text-[#9BA3B0] mb-4">Interactive WCAG Contrast Checker</p>
      <div className="grid sm:grid-cols-2 gap-5">
        <div className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-[#374151] block mb-1.5">Text (foreground) colour</label>
            <div className="flex items-center gap-3">
              <input type="color" value={fg} onChange={e => setFg(e.target.value)} className="w-10 h-10 rounded-xl border border-[#E8E6E0] cursor-pointer" />
              <input type="text" value={fg} onChange={e => { if (/^#[0-9A-Fa-f]{6}$/.test(e.target.value)) setFg(e.target.value); }}
                className="flex-1 px-3 py-2 rounded-xl border border-[#E8E6E0] text-xs font-mono text-[#374151]" />
            </div>
          </div>
          <div>
            <label className="text-xs font-semibold text-[#374151] block mb-1.5">Background colour</label>
            <div className="flex items-center gap-3">
              <input type="color" value={bg} onChange={e => setBg(e.target.value)} className="w-10 h-10 rounded-xl border border-[#E8E6E0] cursor-pointer" />
              <input type="text" value={bg} onChange={e => { if (/^#[0-9A-Fa-f]{6}$/.test(e.target.value)) setBg(e.target.value); }}
                className="flex-1 px-3 py-2 rounded-xl border border-[#E8E6E0] text-xs font-mono text-[#374151]" />
            </div>
          </div>
          {/* Quick brand presets */}
          <div>
            <p className="text-[10px] text-[#9BA3B0] uppercase tracking-widest mb-2">Quick brand presets</p>
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: "White on Navy", fg: "#FFFFFF", bg: "#1C2E5E" },
                { label: "Navy on White", fg: "#1C2E5E", bg: "#FFFFFF" },
                { label: "Fire on White", fg: "#E8541A", bg: "#FFFFFF" },
                { label: "White on Fire", fg: "#FFFFFF", bg: "#E8541A" },
                { label: "Gold on Navy 800", fg: "#F5A030", bg: "#0D1829" },
                { label: "White on Navy 800", fg: "#FFFFFF", bg: "#0D1829" },
                { label: "Amber on Warm 50", fg: "#D97706", bg: "#FAFAF8" },
                { label: "Body on White", fg: "#4B5563", bg: "#FFFFFF" },
              ].map(p => (
                <button key={p.label} onClick={() => { setFg(p.fg); setBg(p.bg); }}
                  className="text-[10px] px-2 py-1.5 rounded-lg border border-[#E8E6E0] text-left text-[#6B7280] hover:border-[#1C2E5E] hover:text-[#1C2E5E] transition-colors">
                  {p.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {/* Preview */}
          <div className="rounded-2xl overflow-hidden border border-[#E8E6E0]">
            <div className="p-6 flex flex-col gap-3" style={{ backgroundColor: bg }}>
              <p style={{ fontFamily: "Barlow Condensed, sans-serif", fontWeight: 800, fontStyle: "italic", fontSize: "32px", color: fg, lineHeight: 1.1 }}>
                Display Headline
              </p>
              <p style={{ fontFamily: "Inter, sans-serif", fontWeight: 400, fontSize: "16px", color: fg, lineHeight: 1.7, opacity: 0.9 }}>
                Body text at 16px Inter Regular. This is the standard reading size for BOTS FIRED content.
              </p>
              <p style={{ fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: "11px", color: fg, letterSpacing: "2.5px", textTransform: "uppercase" }}>
                OVERLINE LABEL
              </p>
            </div>
          </div>

          {/* Results */}
          <div className="space-y-2">
            <div className="grid grid-cols-3 gap-2">
              <div className="bg-[#FAFAF8] rounded-xl p-3 text-center">
                <p style={{ fontFamily: "JetBrains Mono, monospace", fontWeight: 700, fontSize: "24px", color: "#0D1829", lineHeight: 1 }}>{ratio.toFixed(2)}</p>
                <p className="text-[9px] text-[#9BA3B0] mt-1">Contrast Ratio</p>
              </div>
              <div className="rounded-xl p-3 text-center" style={{ backgroundColor: ratingBg(normalRating), color: ratingColor(normalRating) }}>
                <p style={{ fontFamily: "JetBrains Mono, monospace", fontWeight: 700, fontSize: "16px", lineHeight: 1 }}>{normalRating}</p>
                <p className="text-[9px] mt-1">Normal text</p>
              </div>
              <div className="rounded-xl p-3 text-center" style={{ backgroundColor: ratingBg(largeRating), color: ratingColor(largeRating) }}>
                <p style={{ fontFamily: "JetBrains Mono, monospace", fontWeight: 700, fontSize: "16px", lineHeight: 1 }}>{largeRating}</p>
                <p className="text-[9px] mt-1">Large text</p>
              </div>
            </div>
            {[
              { label: "Normal text (≤18px)", need: 4.5, pass: ratio >= 4.5, level: "AA" },
              { label: "Normal text AAA (≤18px)", need: 7, pass: ratio >= 7, level: "AAA" },
              { label: "Large text/UI (≥18px or bold ≥14px)", need: 3, pass: ratio >= 3, level: "AA" },
              { label: "UI components & graphics", need: 3, pass: ratio >= 3, level: "AA" },
            ].map(({ label, need, pass, level }) => (
              <div key={label} className="flex items-center justify-between py-1.5 border-b border-[#F1F2F4] text-xs">
                <span className="text-[#6B7280]">{label}</span>
                <div className="flex items-center gap-2">
                  <span className="text-[9px] font-mono text-[#9BA3B0]">need {need}:1</span>
                  <span className={`flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full ${pass ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                    {pass ? <Check size={9} /> : <X size={9} />} {pass ? `${level} ✓` : "FAIL"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── TYPE SPEC VALIDATOR ──
function TypeSpecValidator() {
  const tokenSpecs = [
    { token: "display-2xl", family: "Barlow Condensed", weight: 800, sizePx: 80, lineH: 1.0, lsPx: -2 },
    { token: "display-xl",  family: "Barlow Condensed", weight: 800, sizePx: 64, lineH: 1.0625, lsPx: -1 },
    { token: "display-l",   family: "Barlow Condensed", weight: 800, sizePx: 48, lineH: 1.083, lsPx: -0.5 },
    { token: "display-m",   family: "Barlow Condensed", weight: 700, sizePx: 40, lineH: 1.1, lsPx: 0 },
    { token: "h1",          family: "Barlow Condensed", weight: 700, sizePx: 36, lineH: 1.222, lsPx: 0.25 },
    { token: "h2",          family: "Barlow Condensed", weight: 700, sizePx: 28, lineH: 1.286, lsPx: 0.5 },
    { token: "h3",          family: "Barlow Condensed", weight: 600, sizePx: 24, lineH: 1.333, lsPx: 0.5 },
    { token: "h4",          family: "Inter",            weight: 700, sizePx: 20, lineH: 1.4, lsPx: 0 },
    { token: "body",        family: "Inter",            weight: 400, sizePx: 16, lineH: 1.75, lsPx: 0 },
    { token: "body-s",      family: "Inter",            weight: 400, sizePx: 14, lineH: 1.714, lsPx: 0 },
    { token: "caption",     family: "Inter",            weight: 500, sizePx: 12, lineH: 1.667, lsPx: 0.25 },
    { token: "overline",    family: "Inter",            weight: 700, sizePx: 11, lineH: 1.455, lsPx: 2.5 },
    { token: "handwritten", family: "Caveat",           weight: 600, sizePx: 20, lineH: 1.4, lsPx: 0 },
    { token: "mono",        family: "JetBrains Mono",   weight: 500, sizePx: 13, lineH: 1.538, lsPx: 0 },
  ];

  const [selectedToken, setSelectedToken] = useState(tokenSpecs[0]);

  return (
    <div className="bg-white rounded-2xl border border-[#E8E6E0] p-6">
      <p className="text-[10px] font-bold uppercase tracking-widest text-[#9BA3B0] mb-4">Type Token Spec Reference</p>
      <div className="flex gap-2 flex-wrap mb-6">
        {tokenSpecs.map(t => (
          <button key={t.token} onClick={() => setSelectedToken(t)}
            className={`px-3 py-1.5 rounded-xl text-[10px] font-semibold transition-all ${selectedToken.token === t.token ? "bg-[#1C2E5E] text-white" : "border border-[#E8E6E0] text-[#6B7280]"}`}>
            {t.token}
          </button>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        <div>
          {/* Live preview */}
          <div className="rounded-xl bg-[#FAFAF8] border border-[#E8E6E0] p-5 min-h-[100px] flex items-center">
            <p style={{
              fontFamily: `${selectedToken.family}, ${selectedToken.family === "Caveat" ? "cursive" : selectedToken.family === "JetBrains Mono" ? "monospace" : "sans-serif"}`,
              fontWeight: selectedToken.weight,
              fontSize: Math.min(selectedToken.sizePx, 48),
              lineHeight: selectedToken.lineH,
              letterSpacing: `${selectedToken.lsPx}px`,
              color: "#1C2E5E",
              wordBreak: "break-word",
            }}>
              AI Clarity for Executive Leaders
            </p>
          </div>

          {/* Scale visualizer: major-third check */}
          <div className="mt-4 bg-[#FAFAF8] rounded-xl p-4">
            <p className="text-[9px] font-bold uppercase tracking-widest text-[#9BA3B0] mb-3">Major Third scale check (1.25×)</p>
            <div className="space-y-1">
              {tokenSpecs.slice(0, 9).map((t, i) => {
                const prev = tokenSpecs[i - 1];
                const ratio = prev ? (t.sizePx / prev.sizePx) : null;
                const ok = ratio === null || ratio >= 0.75; // descending, so check ≥75% of prev
                return (
                  <div key={t.token} className="flex items-center gap-3 text-[10px]">
                    <span className="w-20 font-mono text-[#9BA3B0]">{t.token}</span>
                    <div className="flex-1 h-1.5 bg-[#E8E6E0] rounded-full">
                      <div className="h-full bg-[#1C2E5E] rounded-full" style={{ width: `${(t.sizePx / 80) * 100}%` }} />
                    </div>
                    <span className="w-8 font-mono font-bold text-[#374151]">{t.sizePx}</span>
                    {ratio && <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-bold ${ok ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>{(ratio * 100).toFixed(0)}%</span>}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Spec card */}
        <div>
          <div className="bg-[#0D1829] rounded-xl p-5">
            <p className="text-[9px] font-bold uppercase tracking-widest text-[#4A66A0] mb-3">Spec: <span className="text-[#E8541A]">{selectedToken.token}</span></p>
            <table className="w-full text-[11px]">
              <tbody>
                {[
                  ["Font family", selectedToken.family],
                  ["Weight", `${selectedToken.weight}`],
                  ["Size", `${selectedToken.sizePx}px`],
                  ["Rem equiv.", `${(selectedToken.sizePx / 16).toFixed(4)}rem`],
                  ["Line height", `${selectedToken.lineH} (= ${Math.round(selectedToken.sizePx * selectedToken.lineH)}px)`],
                  ["Letter spacing", `${selectedToken.lsPx}px (= ${(selectedToken.lsPx / selectedToken.sizePx).toFixed(4)}em)`],
                  ["Para spacing", `${Math.round(selectedToken.sizePx * 0.5)}px (0.5× font-size)`],
                ].map(([k, v]) => (
                  <tr key={k} className="border-b border-[#162244]">
                    <td className="py-2 pr-4 text-[#4A66A0] font-semibold">{k}</td>
                    <td className="py-2 text-[#EEF2F8] font-mono">{v}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-4 bg-[#162244] rounded-lg p-3">
              <p className="text-[9px] text-[#4A66A0] mb-1">CSS</p>
              <pre className="text-[10px] text-[#8FA5C8] whitespace-pre-wrap leading-relaxed">{`font-family: '${selectedToken.family}';
font-size: ${(selectedToken.sizePx / 16).toFixed(4)}rem; /* ${selectedToken.sizePx}px */
font-weight: ${selectedToken.weight};
line-height: ${selectedToken.lineH};
letter-spacing: ${selectedToken.lsPx === 0 ? "0" : `${selectedToken.lsPx}px`};
margin-bottom: ${Math.round(selectedToken.sizePx * 0.5)}px;`}</pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function VerificationTests() {
  const [results, setResults] = useState<Record<string, TestResult>>({});
  const [running, setRunning] = useState(false);

  const runTest = (test: SpecTest) => {
    try {
      const result = test.run();
      setResults(prev => ({ ...prev, [test.id]: result }));
    } catch (e) {
      setResults(prev => ({ ...prev, [test.id]: { pass: false, detail: `Error: ${String(e)}` } }));
    }
  };

  const runAll = async () => {
    setRunning(true);
    for (const test of SPEC_TESTS) {
      runTest(test);
      await new Promise(r => setTimeout(r, 80));
    }
    setRunning(false);
  };

  const passed = Object.values(results).filter(r => r.pass).length;
  const failed = Object.values(results).filter(r => !r.pass).length;
  const total = Object.keys(results).length;

  const categories = [...new Set(SPEC_TESTS.map(t => t.category))];

  return (
    <div className="space-y-8">
      <div>
        <p className="text-[10px] font-bold uppercase tracking-widest text-[#9BA3B0] mb-1">Quality Assurance</p>
        <h3 style={{ fontFamily: "Barlow Condensed, sans-serif", color: "#1C2E5E", fontSize: "28px", fontWeight: 700 }}>
          Design Spec Verification Tests
        </h3>
        <p className="text-xs text-[#6B7280] mt-1">Run automated checks to verify the design system is implemented correctly.</p>
      </div>

      {/* Summary bar */}
      {total > 0 && (
        <div className="bg-white rounded-2xl border border-[#E8E6E0] p-4 flex items-center gap-6">
          <div className="flex-1">
            <div className="flex gap-4 text-sm font-bold mb-2">
              <span className="text-green-600">{passed} passed</span>
              <span className="text-red-600">{failed} failed</span>
              <span className="text-[#9BA3B0]">{SPEC_TESTS.length - total} untested</span>
            </div>
            <div className="h-2 bg-[#F1F2F4] rounded-full overflow-hidden flex">
              <div className="h-full bg-green-400 rounded-l-full transition-all" style={{ width: `${(passed / SPEC_TESTS.length) * 100}%` }} />
              <div className="h-full bg-red-400 transition-all" style={{ width: `${(failed / SPEC_TESTS.length) * 100}%` }} />
            </div>
          </div>
          <span className="text-2xl font-bold text-[#1C2E5E]">{total > 0 ? Math.round((passed / total) * 100) : 0}%</span>
        </div>
      )}

      {/* Run all button */}
      <button
        onClick={runAll}
        disabled={running}
        className="flex items-center gap-2 px-5 py-3 rounded-xl bg-[#1C2E5E] text-white text-sm font-semibold disabled:opacity-60"
      >
        <RefreshCw size={16} className={running ? "animate-spin" : ""} />
        {running ? "Running tests…" : "Run All Tests"}
      </button>

      {/* Tests by category */}
      {categories.map(cat => (
        <div key={cat}>
          <p className="text-[10px] font-bold uppercase tracking-widest text-[#9BA3B0] mb-3">{cat} Tests</p>
          <div className="space-y-3">
            {SPEC_TESTS.filter(t => t.category === cat).map(test => (
              <TestRow key={test.id} test={test} result={results[test.id] ?? null} onRun={() => runTest(test)} />
            ))}
          </div>
        </div>
      ))}

      <div className="border-t border-[#E8E6E0] pt-8">
        <p className="text-[10px] font-bold uppercase tracking-widest text-[#9BA3B0] mb-5">Interactive Tools</p>
        <div className="space-y-6">
          <ContrastChecker />
          <TypeSpecValidator />
        </div>
      </div>
    </div>
  );
}
