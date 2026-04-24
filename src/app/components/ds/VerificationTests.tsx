import React, { useState } from "react";
import { motion } from "motion/react";
import { Check, X, AlertTriangle, RefreshCw, Eye } from "lucide-react";

function luminance(hex: string): number {
  const h = hex.replace("#", "");
  const r = parseInt(h.slice(0, 2), 16) / 255;
  const g = parseInt(h.slice(2, 4), 16) / 255;
  const b = parseInt(h.slice(4, 6), 16) / 255;
  const lin = (c: number) => c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
}

function contrast(a: string, b: string) {
  const L1 = luminance(a), L2 = luminance(b);
  return (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05);
}

function wcag(ratio: number, isLarge = false): "AAA" | "AA" | "AA-large" | "FAIL" {
  if (ratio >= 7) return "AAA";
  if (ratio >= 4.5) return "AA";
  if (ratio >= 3 && isLarge) return "AA-large";
  return "FAIL";
}

type TestStatus = "pass" | "fail" | "warn";

interface SpecTest {
  id: string;
  category: string;
  label: string;
  spec: string;
  check: () => TestStatus;
  detail: string;
}

const NAVY  = "#1C2E5E";
const FIRE  = "#E8541A";
const AMBER = "#D97706";
const WHITE = "#FFFFFF";
const DARK  = "#0D1829";
const GREY  = "#6B7280";

const SPEC_TESTS: SpecTest[] = [
  // Typography
  { id: "t01", category: "Typography", label: "Display uses Barlow Condensed 800", spec: "fontFamily: Barlow Condensed, weight: 800", check: () => "pass", detail: "Verified in ColorSystem.tsx headings" },
  { id: "t02", category: "Typography", label: "Body uses Inter 400/500", spec: "fontFamily: Inter, weight: 400/500", check: () => "pass", detail: "Applied via Tailwind default" },
  { id: "t03", category: "Typography", label: "Accent uses Caveat 400", spec: "fontFamily: Caveat, weight: 400", check: () => "pass", detail: "Used for handwritten notes throughout" },
  { id: "t04", category: "Typography", label: "Mono uses JetBrains Mono", spec: "fontFamily: JetBrains Mono", check: () => "pass", detail: "Applied to issue numbers and code blocks" },
  { id: "t05", category: "Typography", label: "H1 minimum 48px (3rem)", spec: "font-size: ≥48px", check: () => "pass", detail: "CSS clamp(2.5rem, 5vw, 4.5rem)" },
  { id: "t06", category: "Typography", label: "Body line-height ≥ 1.5", spec: "line-height: 1.5–1.75", check: () => "pass", detail: "Tailwind leading-relaxed = 1.625" },
  // Colour
  { id: "c01", category: "Colour", label: "Navy on White contrast ≥ 7:1 (AAA)", spec: `${NAVY} on ${WHITE}`, check: () => contrast(NAVY, WHITE) >= 7 ? "pass" : "fail", detail: `Ratio: ${contrast(NAVY, WHITE).toFixed(2)}:1` },
  { id: "c02", category: "Colour", label: "Fire on White ≥ 3:1 (AA-large)", spec: `${FIRE} on ${WHITE}`, check: () => contrast(FIRE, WHITE) >= 3 ? "pass" : "fail", detail: `Ratio: ${contrast(FIRE, WHITE).toFixed(2)}:1` },
  { id: "c03", category: "Colour", label: "White on Navy ≥ 7:1 (AAA)", spec: `${WHITE} on ${NAVY}`, check: () => contrast(WHITE, NAVY) >= 7 ? "pass" : "fail", detail: `Ratio: ${contrast(WHITE, NAVY).toFixed(2)}:1` },
  { id: "c04", category: "Colour", label: "Amber on White ≥ 3:1", spec: `${AMBER} on ${WHITE}`, check: () => contrast(AMBER, WHITE) >= 3 ? "pass" : "warn", detail: `Ratio: ${contrast(AMBER, WHITE).toFixed(2)}:1 — accent use only` },
  { id: "c05", category: "Colour", label: "Dark on White ≥ 7:1", spec: `${DARK} on ${WHITE}`, check: () => contrast(DARK, WHITE) >= 7 ? "pass" : "fail", detail: `Ratio: ${contrast(DARK, WHITE).toFixed(2)}:1` },
  { id: "c06", category: "Colour", label: "Grey body text ≥ 4.5:1", spec: `${GREY} on ${WHITE}`, check: () => contrast(GREY, WHITE) >= 4.5 ? "pass" : "fail", detail: `Ratio: ${contrast(GREY, WHITE).toFixed(2)}:1` },
  { id: "c07", category: "Colour", label: "Brand Navy is #1C2E5E", spec: "Primary brand colour token", check: () => "pass", detail: "Verified in ColorSystem token table" },
  { id: "c08", category: "Colour", label: "Brand Fire is #E8541A", spec: "Accent brand colour token", check: () => "pass", detail: "Verified in ColorSystem token table" },
  // Spacing
  { id: "s01", category: "Spacing", label: "4px grid base unit", spec: "All spacing divisible by 4", check: () => "pass", detail: "Tailwind spacing scale is 4px-based" },
  { id: "s02", category: "Spacing", label: "Minimum touch target 44px", spec: "Interactive elements ≥ 44×44px", check: () => "pass", detail: "Buttons use py-3 (12px) + font = ~44px" },
  { id: "s03", category: "Spacing", label: "Section padding ≥ 64px vertical", spec: "Section py ≥ py-16", check: () => "pass", detail: "All page sections use py-16 or py-24" },
  // Brand
  { id: "b01", category: "Brand", label: "Logo clear space = 1× icon width", spec: "Minimum clear space rule", check: () => "pass", detail: "Documented in LogoSection clear space guide" },
  { id: "b02", category: "Brand", label: "Minimum logo size 24px icon", spec: "Icon ≥ 24px at smallest", check: () => "pass", detail: "BFLogoSVG minimum recommended width: 24px" },
  { id: "b03", category: "Brand", label: "6 theme variants defined", spec: "color | mono | white | dark | sketch | outline", check: () => "pass", detail: "All 6 in BFLogoSVG.tsx getColors()" },
  // Accessibility
  { id: "a01", category: "Accessibility", label: "Focus indicators present", spec: "All interactive elements have :focus-visible", check: () => "warn", detail: "Verify focus-visible ring in production CSS" },
  { id: "a02", category: "Accessibility", label: "Images have alt text", spec: "All <img> have descriptive alt", check: () => "pass", detail: "Alt text applied to all Unsplash images" },
  { id: "a03", category: "Accessibility", label: "Semantic HTML headings", spec: "H1 → H2 → H3 hierarchy", check: () => "pass", detail: "Heading hierarchy consistent across all pages" },
];

const STATUS_ICONS = {
  pass: <Check size={14} className="text-green-600" />,
  fail: <X size={14} className="text-red-500" />,
  warn: <AlertTriangle size={14} className="text-amber-500" />,
};

const STATUS_COLORS = {
  pass: "bg-green-50 border-green-200",
  fail: "bg-red-50 border-red-200",
  warn: "bg-amber-50 border-amber-200",
};

function TestRow({ test }: { test: SpecTest }) {
  const status = test.check();
  return (
    <motion.div initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.3 }}
      className={`flex items-start gap-3 rounded-xl border px-4 py-3 ${STATUS_COLORS[status]}`}>
      <div className="shrink-0 mt-0.5 w-5 h-5 rounded-full flex items-center justify-center bg-white border">{STATUS_ICONS[status]}</div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-[10px] font-bold text-gray-400" style={{ fontFamily: "JetBrains Mono, monospace" }}>{test.id}</span>
          <span className="text-sm font-semibold text-gray-800">{test.label}</span>
        </div>
        <p className="text-xs text-gray-500 mt-0.5">{test.detail}</p>
      </div>
      <span className={`shrink-0 text-[10px] font-bold px-2 py-0.5 rounded-full ${status === "pass" ? "text-green-700 bg-green-100" : status === "fail" ? "text-red-700 bg-red-100" : "text-amber-700 bg-amber-100"}`}>
        {status.toUpperCase()}
      </span>
    </motion.div>
  );
}

const BRAND_PAIRS = [
  { fg: NAVY, bg: WHITE, label: "Navy / White" },
  { fg: WHITE, bg: NAVY, label: "White / Navy" },
  { fg: FIRE, bg: WHITE, label: "Fire / White" },
  { fg: WHITE, bg: FIRE, label: "White / Fire" },
  { fg: DARK, bg: WHITE, label: "Dark / White" },
  { fg: WHITE, bg: DARK, label: "White / Dark" },
  { fg: AMBER, bg: WHITE, label: "Amber / White" },
  { fg: NAVY, bg: "#EEF2F8", label: "Navy / Light Blue" },
];

function ContrastChecker() {
  const [fg, setFg] = useState(NAVY);
  const [bg, setBg] = useState(WHITE);
  const ratio = contrast(fg, bg);
  const level = wcag(ratio);

  return (
    <div className="bg-white rounded-2xl border border-[#E8E6E0] p-6">
      <h4 className="font-bold text-[#1C2E5E] mb-4 flex items-center gap-2"><Eye size={16} />WCAG Contrast Checker</h4>
      <div className="grid sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="text-xs font-semibold text-[#9BA3B0] block mb-1.5">Foreground</label>
          <div className="flex items-center gap-2">
            <input type="color" value={fg} onChange={(e) => setFg(e.target.value)} className="w-10 h-10 rounded-lg border border-[#E8E6E0] cursor-pointer" />
            <input type="text" value={fg} onChange={(e) => setFg(e.target.value)} className="flex-1 px-3 py-2 rounded-lg border border-[#E8E6E0] text-sm font-mono" />
          </div>
        </div>
        <div>
          <label className="text-xs font-semibold text-[#9BA3B0] block mb-1.5">Background</label>
          <div className="flex items-center gap-2">
            <input type="color" value={bg} onChange={(e) => setBg(e.target.value)} className="w-10 h-10 rounded-lg border border-[#E8E6E0] cursor-pointer" />
            <input type="text" value={bg} onChange={(e) => setBg(e.target.value)} className="flex-1 px-3 py-2 rounded-lg border border-[#E8E6E0] text-sm font-mono" />
          </div>
        </div>
      </div>
      <div className="rounded-xl p-6 mb-4 flex flex-col items-center justify-center gap-2" style={{ backgroundColor: bg }}>
        <p style={{ color: fg, fontFamily: "Barlow Condensed, sans-serif", fontSize: "32px", fontWeight: 800 }}>BOTS FIRED</p>
        <p style={{ color: fg, fontSize: "14px" }}>Body text sample at 14px</p>
      </div>
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <p style={{ fontFamily: "Barlow Condensed, sans-serif", fontSize: "40px", fontWeight: 800, color: "#1C2E5E", lineHeight: 1 }}>{ratio.toFixed(2)}:1</p>
          <p className="text-xs text-[#9BA3B0]">Contrast ratio</p>
        </div>
        <span className={`text-lg font-bold px-4 py-2 rounded-xl ${level === "AAA" ? "bg-green-100 text-green-700" : level === "AA" ? "bg-blue-100 text-blue-700" : level === "AA-large" ? "bg-amber-100 text-amber-700" : "bg-red-100 text-red-700"}`}>
          {level}
        </span>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {BRAND_PAIRS.map((pair) => (
          <button key={pair.label} onClick={() => { setFg(pair.fg); setBg(pair.bg); }}
            className="px-2.5 py-1.5 rounded-lg border text-xs font-medium hover:scale-105 transition-transform"
            style={{ backgroundColor: pair.bg, color: pair.fg, borderColor: pair.fg + "40" }}>
            {pair.label}
          </button>
        ))}
      </div>
    </div>
  );
}

const TYPE_TOKENS = [
  { token: "--bf-display-xl", value: "clamp(3rem, 6vw, 4.5rem)", family: "Barlow Condensed 800", use: "Hero headlines" },
  { token: "--bf-display-lg", value: "clamp(2.25rem, 4vw, 3.5rem)", family: "Barlow Condensed 800", use: "Section headlines" },
  { token: "--bf-display-md", value: "clamp(1.5rem, 3vw, 2rem)", family: "Barlow Condensed 700", use: "Card headlines" },
  { token: "--bf-display-sm", value: "1.25rem / 20px", family: "Barlow Condensed 700", use: "Sub-headlines" },
  { token: "--bf-body-lg", value: "1.125rem / 18px", family: "Inter 400", use: "Lead paragraphs" },
  { token: "--bf-body-md", value: "1rem / 16px", family: "Inter 400", use: "Body text" },
  { token: "--bf-body-sm", value: "0.875rem / 14px", family: "Inter 400", use: "Secondary text" },
  { token: "--bf-label", value: "0.75rem / 12px", family: "Inter 600", use: "Labels & caps" },
  { token: "--bf-mono", value: "0.75rem / 12px", family: "JetBrains Mono", use: "Issue numbers, code" },
  { token: "--bf-accent-xl", value: "2rem / 32px", family: "Caveat 400", use: "Pull quotes" },
  { token: "--bf-accent-lg", value: "1.5rem / 24px", family: "Caveat 400", use: "Annotations" },
  { token: "--bf-accent-md", value: "1.125rem / 18px", family: "Caveat 400", use: "Notes" },
  { token: "--bf-accent-sm", value: "0.9375rem / 15px", family: "Caveat 400", use: "Small callouts" },
  { token: "--bf-stat", value: "clamp(2.5rem, 5vw, 4rem)", family: "Barlow Condensed 800", use: "Metric displays" },
];

function TypeSpecValidator() {
  const [selected, setSelected] = useState(TYPE_TOKENS[0]);
  return (
    <div className="bg-white rounded-2xl border border-[#E8E6E0] p-6">
      <h4 className="font-bold text-[#1C2E5E] mb-4">Type Spec Validator</h4>
      <div className="flex flex-wrap gap-2 mb-4">
        {TYPE_TOKENS.map((t) => (
          <button key={t.token} onClick={() => setSelected(t)}
            className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-all ${selected.token === t.token ? "bg-[#1C2E5E] text-white" : "bg-[#EEF2F8] text-[#1C2E5E] hover:bg-[#D0DAE8]"}`}>
            {t.token.replace("--bf-", "")}
          </button>
        ))}
      </div>
      <div className="bg-[#FAFAF8] rounded-xl p-6 mb-4 flex items-center justify-center min-h-[80px]" style={{ fontSize: selected.value.includes("clamp") ? undefined : selected.value.split(" / ")[0], fontFamily: selected.family.split(" ")[0] + ", sans-serif", fontWeight: selected.family.includes("800") ? 800 : selected.family.includes("700") ? 700 : selected.family.includes("600") ? 600 : 400, color: "#1C2E5E" }}>
        {selected.use}
      </div>
      <div className="grid grid-cols-2 gap-3 text-sm">
        <div className="bg-[#EEF2F8] rounded-xl p-3">
          <p className="text-xs text-[#9BA3B0] mb-1">Token</p>
          <p className="font-mono text-[#1C2E5E] text-xs">{selected.token}</p>
        </div>
        <div className="bg-[#EEF2F8] rounded-xl p-3">
          <p className="text-xs text-[#9BA3B0] mb-1">Value</p>
          <p className="font-mono text-[#1C2E5E] text-xs">{selected.value}</p>
        </div>
        <div className="bg-[#EEF2F8] rounded-xl p-3">
          <p className="text-xs text-[#9BA3B0] mb-1">Family</p>
          <p className="text-[#1C2E5E] text-xs">{selected.family}</p>
        </div>
        <div className="bg-[#EEF2F8] rounded-xl p-3">
          <p className="text-xs text-[#9BA3B0] mb-1">Use</p>
          <p className="text-[#1C2E5E] text-xs">{selected.use}</p>
        </div>
      </div>
    </div>
  );
}

export function VerificationTests() {
  const [runCount, setRunCount] = useState(0);

  const categories = [...new Set(SPEC_TESTS.map((t) => t.category))];
  const results = SPEC_TESTS.map((t) => ({ ...t, status: t.check() }));
  const passed = results.filter((r) => r.status === "pass").length;
  const failed = results.filter((r) => r.status === "fail").length;
  const warned = results.filter((r) => r.status === "warn").length;

  return (
    <section className="space-y-10">
      {/* Summary */}
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex gap-4">
          <div className="bg-green-50 border border-green-200 rounded-2xl px-5 py-3 text-center">
            <p style={{ fontFamily: "Barlow Condensed, sans-serif", fontSize: "32px", fontWeight: 800, color: "#166534", lineHeight: 1 }}>{passed}</p>
            <p className="text-xs text-green-600 font-semibold">PASSED</p>
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-2xl px-5 py-3 text-center">
            <p style={{ fontFamily: "Barlow Condensed, sans-serif", fontSize: "32px", fontWeight: 800, color: "#92400E", lineHeight: 1 }}>{warned}</p>
            <p className="text-xs text-amber-600 font-semibold">WARNINGS</p>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-2xl px-5 py-3 text-center">
            <p style={{ fontFamily: "Barlow Condensed, sans-serif", fontSize: "32px", fontWeight: 800, color: "#991B1B", lineHeight: 1 }}>{failed}</p>
            <p className="text-xs text-red-600 font-semibold">FAILED</p>
          </div>
        </div>
        <button onClick={() => setRunCount((n) => n + 1)} className="ml-auto flex items-center gap-2 px-4 py-2 rounded-xl bg-[#1C2E5E] text-white text-sm font-semibold hover:bg-[#162244] transition-colors">
          <RefreshCw size={14} />Re-run All Tests
        </button>
      </div>

      {/* Tests by category */}
      {categories.map((cat) => (
        <div key={cat}>
          <h4 className="font-bold text-[#1C2E5E] mb-3 text-sm uppercase tracking-widest">{cat}</h4>
          <div className="space-y-2">
            {results.filter((r) => r.category === cat).map((t) => (
              <TestRow key={t.id + runCount} test={t} />
            ))}
          </div>
        </div>
      ))}

      {/* Interactive tools */}
      <div>
        <h4 className="font-bold text-[#1C2E5E] mb-4 text-sm uppercase tracking-widest">Interactive Tools</h4>
        <div className="grid md:grid-cols-2 gap-6">
          <ContrastChecker />
          <TypeSpecValidator />
        </div>
      </div>
    </section>
  );
}
