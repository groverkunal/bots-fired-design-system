import React, { useState } from "react";
import { motion } from "motion/react";
import { Check, X } from "lucide-react";

/* ═══════════════════════════════════════════════════════════════════
   BOTS FIRED · TYPOGRAPHY ENGINEERING SPECIFICATION
   Base unit: 4px grid. All measurements divisible by 4.
   Root font-size: 16px (1rem = 16px)
   Scale: Major Third (1.25×) minimum between adjacent levels
═══════════════════════════════════════════════════════════════════ */

interface TypeToken {
  token: string; label: string; family: string; familyStack: string;
  weight: number; weightLabel: string; style: "normal" | "italic";
  sizePx: number; sizeRem: string; lineHeightPx: number; lineHeightRatio: string;
  letterSpacingPx: string; letterSpacingEm: string; paragraphSpacingPx: number;
  maxWidthCh: number | null; transform?: "uppercase" | "none";
  usage: string[]; color: string; hex: string; sample: string;
}

const TYPE_SCALE: TypeToken[] = [
  { token: "display-2xl", label: "Display 2XL", family: "Barlow Condensed", familyStack: "'Barlow Condensed', 'Arial Narrow', sans-serif", weight: 800, weightLabel: "ExtraBold", style: "italic", sizePx: 80, sizeRem: "5rem", lineHeightPx: 80, lineHeightRatio: "1.0 (80px)", letterSpacingPx: "-2px", letterSpacingEm: "-0.025em", paragraphSpacingPx: 24, maxWidthCh: 28, transform: "none", usage: ["Hero campaign headlines", "Homepage hero above-fold title", "Splash screens"], color: "Navy 500", hex: "#1C2E5E", sample: "AI Clarity for Leaders" },
  { token: "display-xl", label: "Display XL", family: "Barlow Condensed", familyStack: "'Barlow Condensed', 'Arial Narrow', sans-serif", weight: 800, weightLabel: "ExtraBold", style: "italic", sizePx: 64, sizeRem: "4rem", lineHeightPx: 68, lineHeightRatio: "1.0625 (68px)", letterSpacingPx: "-1px", letterSpacingEm: "-0.0156em", paragraphSpacingPx: 20, maxWidthCh: 32, transform: "none", usage: ["Page hero titles", "Section openers on dark bg", "Podcast/Newsletter hero"], color: "Navy 500", hex: "#1C2E5E", sample: "The Boardroom AI" },
  { token: "display-l", label: "Display L", family: "Barlow Condensed", familyStack: "'Barlow Condensed', 'Arial Narrow', sans-serif", weight: 800, weightLabel: "ExtraBold", style: "italic", sizePx: 48, sizeRem: "3rem", lineHeightPx: 52, lineHeightRatio: "1.083 (52px)", letterSpacingPx: "-0.5px", letterSpacingEm: "-0.0104em", paragraphSpacingPx: 16, maxWidthCh: 40, transform: "none", usage: ["About page hero", "Training section headers", "Print headline"], color: "Navy 500", hex: "#1C2E5E", sample: "AI for the C-Suite" },
  { token: "display-m", label: "Display M", family: "Barlow Condensed", familyStack: "'Barlow Condensed', 'Arial Narrow', sans-serif", weight: 700, weightLabel: "Bold", style: "italic", sizePx: 40, sizeRem: "2.5rem", lineHeightPx: 44, lineHeightRatio: "1.1 (44px)", letterSpacingPx: "0px", letterSpacingEm: "0em", paragraphSpacingPx: 16, maxWidthCh: 48, transform: "none", usage: ["Invitations heading", "Card hero text", "Newsletter article titles"], color: "Navy 500", hex: "#1C2E5E", sample: "The Pilot Failed — Now What?" },
  { token: "h1", label: "Heading 1", family: "Barlow Condensed", familyStack: "'Barlow Condensed', 'Arial Narrow', sans-serif", weight: 700, weightLabel: "Bold", style: "normal", sizePx: 36, sizeRem: "2.25rem", lineHeightPx: 44, lineHeightRatio: "1.222 (44px)", letterSpacingPx: "0.25px", letterSpacingEm: "0.007em", paragraphSpacingPx: 16, maxWidthCh: 52, transform: "none", usage: ["Blog post title", "Policy/Terms page title", "Training module title"], color: "Navy 800", hex: "#0D1829", sample: "Why Your AI Pilot Failed" },
  { token: "h2", label: "Heading 2", family: "Barlow Condensed", familyStack: "'Barlow Condensed', 'Arial Narrow', sans-serif", weight: 700, weightLabel: "Bold", style: "normal", sizePx: 28, sizeRem: "1.75rem", lineHeightPx: 36, lineHeightRatio: "1.286 (36px)", letterSpacingPx: "0.5px", letterSpacingEm: "0.018em", paragraphSpacingPx: 12, maxWidthCh: 60, transform: "none", usage: ["Blog section break", "About section header", "Podcast episode title"], color: "Navy 700", hex: "#111C36", sample: "The Governance Gap" },
  { token: "h3", label: "Heading 3", family: "Barlow Condensed", familyStack: "'Barlow Condensed', 'Arial Narrow', sans-serif", weight: 600, weightLabel: "SemiBold", style: "normal", sizePx: 24, sizeRem: "1.5rem", lineHeightPx: 32, lineHeightRatio: "1.333 (32px)", letterSpacingPx: "0.5px", letterSpacingEm: "0.021em", paragraphSpacingPx: 12, maxWidthCh: 68, transform: "none", usage: ["Blog sub-section", "Card title (editorial)", "FAQ question"], color: "Navy 700", hex: "#111C36", sample: "Board-Level AI Accountability" },
  { token: "h4", label: "Heading 4", family: "Inter", familyStack: "'Inter', 'Helvetica Neue', Arial, sans-serif", weight: 700, weightLabel: "Bold", style: "normal", sizePx: 20, sizeRem: "1.25rem", lineHeightPx: 28, lineHeightRatio: "1.4 (28px)", letterSpacingPx: "0px", letterSpacingEm: "0em", paragraphSpacingPx: 8, maxWidthCh: null, transform: "none", usage: ["Popup/modal title", "Card title (UI)", "Navigation group header"], color: "Navy 800", hex: "#0D1829", sample: "Join the Executive Cohort" },
  { token: "h5", label: "Heading 5", family: "Inter", familyStack: "'Inter', 'Helvetica Neue', Arial, sans-serif", weight: 600, weightLabel: "SemiBold", style: "normal", sizePx: 18, sizeRem: "1.125rem", lineHeightPx: 28, lineHeightRatio: "1.556 (28px)", letterSpacingPx: "0px", letterSpacingEm: "0em", paragraphSpacingPx: 8, maxWidthCh: null, transform: "none", usage: ["Sidebar card title", "Footer section label (large)", "Profile sub-title"], color: "Navy 700", hex: "#111C36", sample: "Weekly AI Brief" },
  { token: "body-l", label: "Body Large", family: "Inter", familyStack: "'Inter', 'Helvetica Neue', Arial, sans-serif", weight: 400, weightLabel: "Regular", style: "normal", sizePx: 18, sizeRem: "1.125rem", lineHeightPx: 32, lineHeightRatio: "1.778 (32px)", letterSpacingPx: "0px", letterSpacingEm: "0em", paragraphSpacingPx: 20, maxWidthCh: 65, transform: "none", usage: ["Homepage intro paragraph", "About page bio text", "Lead paragraph in newsletter"], color: "Ink 600", hex: "#4B5563", sample: "Every Monday, senior leaders receive a focused briefing on what AI means for their industry, their board, and their decisions." },
  { token: "body", label: "Body", family: "Inter", familyStack: "'Inter', 'Helvetica Neue', Arial, sans-serif", weight: 400, weightLabel: "Regular", style: "normal", sizePx: 16, sizeRem: "1rem", lineHeightPx: 28, lineHeightRatio: "1.75 (28px)", letterSpacingPx: "0px", letterSpacingEm: "0em", paragraphSpacingPx: 16, maxWidthCh: 68, transform: "none", usage: ["All standard body copy", "Blog article content", "Newsletter body paragraphs", "Card descriptions"], color: "Ink 600", hex: "#4B5563", sample: "The challenge isn't deploying AI — it's knowing what to ask before you do." },
  { token: "body-s", label: "Body Small", family: "Inter", familyStack: "'Inter', 'Helvetica Neue', Arial, sans-serif", weight: 400, weightLabel: "Regular", style: "normal", sizePx: 14, sizeRem: "0.875rem", lineHeightPx: 24, lineHeightRatio: "1.714 (24px)", letterSpacingPx: "0px", letterSpacingEm: "0em", paragraphSpacingPx: 12, maxWidthCh: 72, transform: "none", usage: ["Secondary descriptions", "Helper text", "Popup body text", "Email footnote body"], color: "Ink 500", hex: "#6B7280", sample: "By subscribing you agree to our terms. Unsubscribe any time." },
  { token: "caption", label: "Caption", family: "Inter", familyStack: "'Inter', 'Helvetica Neue', Arial, sans-serif", weight: 500, weightLabel: "Medium", style: "normal", sizePx: 12, sizeRem: "0.75rem", lineHeightPx: 20, lineHeightRatio: "1.667 (20px)", letterSpacingPx: "0.25px", letterSpacingEm: "0.021em", paragraphSpacingPx: 8, maxWidthCh: null, transform: "none", usage: ["Author byline", "Image captions", "Timestamp", "Footnotes", "Legal text"], color: "Ink 400", hex: "#9BA3B0", sample: "By BOTS FIRED · Apr 21, 2026 · 6 min read" },
  { token: "overline", label: "Overline", family: "Inter", familyStack: "'Inter', 'Helvetica Neue', Arial, sans-serif", weight: 700, weightLabel: "Bold", style: "normal", sizePx: 11, sizeRem: "0.6875rem", lineHeightPx: 16, lineHeightRatio: "1.455 (16px)", letterSpacingPx: "2.5px", letterSpacingEm: "0.227em", paragraphSpacingPx: 8, maxWidthCh: null, transform: "uppercase", usage: ["Section kickers above headlines", "Category labels above article title", "Step indicators in forms"], color: "Fire 500", hex: "#E8541A", sample: "AI Strategy · Newsletter" },
  { token: "label", label: "Label", family: "Inter", familyStack: "'Inter', 'Helvetica Neue', Arial, sans-serif", weight: 700, weightLabel: "Bold", style: "normal", sizePx: 10, sizeRem: "0.625rem", lineHeightPx: 16, lineHeightRatio: "1.6 (16px)", letterSpacingPx: "3px", letterSpacingEm: "0.3em", paragraphSpacingPx: 4, maxWidthCh: null, transform: "uppercase", usage: ["Tag pills", "Badge text", "Metadata chips", "Form field labels"], color: "Navy 300", hex: "#4A66A0", sample: "Governance · Issue #052" },
  { token: "handwritten", label: "Handwritten", family: "Caveat", familyStack: "'Caveat', 'Comic Sans MS', cursive", weight: 600, weightLabel: "SemiBold", style: "normal", sizePx: 20, sizeRem: "1.25rem", lineHeightPx: 28, lineHeightRatio: "1.4 (28px)", letterSpacingPx: "0px", letterSpacingEm: "0em", paragraphSpacingPx: 8, maxWidthCh: 48, transform: "none", usage: ["In-body annotation", "Card aside comment", "Newsletter personal note aside", "Sidebar callout"], color: "Amber", hex: "#D97706", sample: "No jargon. Just signal." },
  { token: "handwritten-l", label: "Handwritten Large", family: "Caveat", familyStack: "'Caveat', 'Comic Sans MS', cursive", weight: 700, weightLabel: "Bold", style: "normal", sizePx: 28, sizeRem: "1.75rem", lineHeightPx: 36, lineHeightRatio: "1.286 (36px)", letterSpacingPx: "0px", letterSpacingEm: "0em", paragraphSpacingPx: 12, maxWidthCh: 40, transform: "none", usage: ["Pull quote / highlight quote in blog", "Hero annotation overlay", "Invitation accent line"], color: "Fire 500", hex: "#E8541A", sample: "\"AI won't replace executives who understand it.\"" },
  { token: "mono", label: "Monospace", family: "JetBrains Mono", familyStack: "'JetBrains Mono', 'Fira Code', 'Courier New', monospace", weight: 500, weightLabel: "Medium", style: "normal", sizePx: 13, sizeRem: "0.8125rem", lineHeightPx: 20, lineHeightRatio: "1.538 (20px)", letterSpacingPx: "0px", letterSpacingEm: "0em", paragraphSpacingPx: 8, maxWidthCh: null, transform: "none", usage: ["Issue number + date", "Tag metadata", "Code snippets inline", "API/technical labels"], color: "Ink 400", hex: "#9BA3B0", sample: "ISSUE #052 · VOL.2 · APR 21 2026" },
];

const ELEMENT_MAP = [
  { element: "Homepage Hero", parts: [
    { role: "Eyebrow kicker", token: "overline", spec: "Inter 700 · 11px · 16px lh · 2.5px ls · UPPERCASE", color: "#E8541A" },
    { role: "Headline", token: "display-2xl", spec: "Barlow Condensed 800 Italic · clamp(48px,8vw,80px)", color: "#1C2E5E" },
    { role: "Sub-headline", token: "body-l", spec: "Inter 400 · 18px · 32px lh · max 52ch", color: "#4B5563" },
    { role: "Handwritten annotation", token: "handwritten", spec: "Caveat 600 · 20px · 28px lh · rotate(-1 to -2deg)", color: "#D97706" },
    { role: "CTA button text", token: "body-s+", spec: "Inter 700 · 15px · 1.5px ls · UPPERCASE", color: "#FFFFFF" },
  ]},
  { element: "Blog Post", parts: [
    { role: "Category kicker", token: "overline", spec: "Inter 700 · 11px · 2.5px ls · UPPERCASE", color: "#E8541A" },
    { role: "Article title (H1)", token: "h1", spec: "Barlow Condensed 700 · clamp(32px,5vw,48px)", color: "#0D1829" },
    { role: "Deck / subtitle", token: "body-l", spec: "Inter 400 · 18px · 32px lh · max 60ch", color: "#4B5563" },
    { role: "Byline", token: "caption", spec: "Inter 500 · 12px · 20px lh", color: "#9BA3B0" },
    { role: "Body paragraphs", token: "body", spec: "Inter 400 · 16px · 28px lh · max 68ch", color: "#4B5563" },
    { role: "Pull quote", token: "handwritten-l", spec: "Caveat 700 · 28px · 36px lh · max 40ch", color: "#E8541A" },
  ]},
  { element: "Newsletter", parts: [
    { role: "Issue + Vol. metadata", token: "mono", spec: "JetBrains Mono 500 · 13px · Ink 400", color: "#9BA3B0" },
    { role: "Issue title / H1", token: "h1", spec: "Barlow Condensed 700 · clamp(32px,5vw,40px)", color: "#0D1829" },
    { role: "Body paragraphs", token: "body", spec: "Inter 400 · 16px · 28px lh · max 60ch", color: "#4B5563" },
    { role: "Pull quote", token: "handwritten-l", spec: "Caveat 700 · 28px · Fire 500", color: "#E8541A" },
  ]},
  { element: "Navigation", parts: [
    { role: "Nav link (default)", token: "body-s", spec: "Inter 500 · 14px · 0px ls", color: "#6B7280" },
    { role: "Nav link (active)", token: "body-s", spec: "Inter 600 · 14px · Navy 500", color: "#1C2E5E" },
    { role: "Brand wordmark in nav", token: "display-m", spec: "Barlow Condensed 800 Italic · 24px · Navy 500", color: "#1C2E5E" },
  ]},
  { element: "Footer", parts: [
    { role: "Section heading", token: "label", spec: "Inter 700 · 10px · 3px ls · UPPERCASE", color: "#4B5563" },
    { role: "Links", token: "body-s", spec: "Inter 400 · 14px · Ink 400", color: "#6B7280" },
    { role: "Tagline / brand voice", token: "handwritten", spec: "Caveat 500 · 16px · Amber", color: "#D97706" },
  ]},
];

const DOS = [
  "Use Barlow Condensed 800 Italic for all top-level display headlines (h1 and above).",
  "Always pair a Barlow headline with Inter body copy. Never pair Barlow + Caveat as headline/body.",
  "Use Inter 700 for all UI component titles (modals, cards, buttons) — never Barlow below 20px.",
  "Maintain 1.25× minimum size ratio between adjacent typographic levels (Major Third scale).",
  "Cap line-length at 65–72 characters for body text. Use max-w of 65ch in CSS.",
  "Use Caveat exclusively for: pull quotes, personal notes, annotations, 'handwritten' asides.",
  "Set letter-spacing to ≥2px for ALL CAPS text. Uppercase without tracking is illegible.",
  "Use 4px grid: all font sizes, line-heights, margins and padding must be divisible by 4.",
  "Set minimum font size at 12px for captions. 10px only for pill labels with high contrast.",
];

const DONTS = [
  "Never use Barlow Condensed for body paragraphs (anything over 2 lines of prose).",
  "Never use Caveat for: prices, dates/times, email addresses, phone numbers, legal text.",
  "Never use JetBrains Mono for any sentence-length text. Max usage: 30-character metadata strings.",
  "Never stack two Barlow sizes within 8px of each other without a clear hierarchy separation.",
  "Never use font-weight 400 (Regular) for Barlow Condensed below 24px — it disappears.",
  "Never remove letter-spacing from UPPERCASE text in overline/label tokens.",
  "Never exceed 80ch line-length for any body text. 72ch is the hard maximum for newsletters.",
  "Never use Caveat below 16px — it loses legibility.",
  "Never mix more than 3 font families in a single view.",
];

function TokenRow({ t }: { t: TypeToken }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="border-b border-[#F1F2F4] last:border-0">
      <button onClick={() => setExpanded(!expanded)} className="w-full text-left py-4 flex items-start gap-4 hover:bg-[#FAFAF8] px-3 rounded-xl transition-colors">
        <div className="flex-1 min-w-0">
          <p style={{ fontFamily: `${t.family}, sans-serif`, fontWeight: t.weight, fontStyle: t.style, fontSize: Math.min(t.sizePx, 40), lineHeight: Math.min(t.lineHeightPx, 48) / Math.min(t.sizePx, 40), letterSpacing: t.letterSpacingPx, textTransform: t.transform || "none", color: t.hex, wordBreak: "break-word" }}>{t.sample}</p>
          <div className="flex flex-wrap items-center gap-3 mt-2">
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#EEF2F8] text-[#1C2E5E]">{t.token}</span>
            <span className="text-[10px] text-[#9BA3B0]">{t.family} · {t.weightLabel} · {t.sizePx}px</span>
          </div>
        </div>
        <span className="text-[#CBD0D8] text-xs mt-1 shrink-0">{expanded ? "▲" : "▼"}</span>
      </button>
      {expanded && (
        <div className="mx-3 mb-4 rounded-xl bg-[#FAFAF8] border border-[#E8E6E0] p-4 grid sm:grid-cols-2 gap-4 text-xs">
          <div>
            <p className="font-bold text-[#374151] mb-2 uppercase tracking-widest text-[10px]">Engineering Spec</p>
            <table className="w-full text-[11px]"><tbody>
              {[["Token",t.token],["Family",t.family],["Stack",t.familyStack],["Weight",`${t.weight} (${t.weightLabel})`],["Style",t.style],["Size (px)",`${t.sizePx}px`],["Size (rem)",t.sizeRem],["Line-height",`${t.lineHeightPx}px (${t.lineHeightRatio})`],["Letter-spacing",`${t.letterSpacingPx} / ${t.letterSpacingEm}`],["Para spacing",`${t.paragraphSpacingPx}px`],["Max width",t.maxWidthCh?`${t.maxWidthCh}ch`:"No constraint"],["Transform",t.transform||"none"],["Color token",t.color],["Color hex",t.hex]].map(([k,v])=>(
                <tr key={k as string}><td className="text-[#9BA3B0] pr-3 py-0.5 font-semibold w-28">{k}</td><td className="text-[#374151] font-mono">{v}</td></tr>
              ))}
            </tbody></table>
          </div>
          <div>
            <p className="font-bold text-[#374151] mb-2 uppercase tracking-widest text-[10px]">Approved Usage</p>
            <ul className="space-y-1.5">{t.usage.map((u)=>(<li key={u} className="flex items-start gap-2 text-[11px] text-[#4B5563]"><Check size={11} className="text-green-500 shrink-0 mt-0.5" />{u}</li>))}</ul>
            <div className="mt-3 p-2.5 rounded-lg bg-[#0D1829]">
              <p className="text-[9px] text-[#4A66A0] mb-1 uppercase tracking-widest">CSS</p>
              <pre className="text-[10px] text-[#8FA5C8] whitespace-pre-wrap leading-relaxed">{`font-family: ${t.familyStack};\nfont-size: ${t.sizeRem};\nfont-weight: ${t.weight};\nfont-style: ${t.style};\nline-height: ${t.lineHeightPx/t.sizePx};\nletter-spacing: ${t.letterSpacingEm};${t.maxWidthCh?`\nmax-width: ${t.maxWidthCh}ch;"`:""}`}</pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export function TypographySystem() {
  const [activeTab, setActiveTab] = useState<"scale"|"elements"|"rules">("scale");
  return (
    <div className="space-y-8">
      <div>
        <p className="text-[10px] font-bold uppercase tracking-widest text-[#9BA3B0] mb-1">Typography Engineering</p>
        <h3 style={{ fontFamily: "Barlow Condensed, sans-serif", color: "#1C2E5E", fontSize: "28px", fontWeight: 700 }}>Full Type System · BOTS FIRED</h3>
        <div className="mt-2 flex flex-wrap gap-3 text-xs">
          {["4px base grid","16px root","Major Third scale (1.25×)","4 families","17 tokens","65–72ch max measure"].map((t)=>(
            <span key={t} className="px-2.5 py-1 rounded-full bg-[#EEF2F8] text-[#1C2E5E] font-semibold text-[10px]">{t}</span>
          ))}
        </div>
      </div>
      <div className="flex gap-2 flex-wrap">
        {(["scale","elements","rules"] as const).map((id)=>(
          <button key={id} onClick={()=>setActiveTab(id)} className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${activeTab===id?"bg-[#1C2E5E] text-white":"border border-[#E8E6E0] text-[#6B7280]"}`}>
            {id==="scale"?"Type Scale":id==="elements"?"Element Map":"Dos & Don'ts"}
          </button>
        ))}
      </div>
      {activeTab==="scale" && (
        <motion.div initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{duration:0.3}}>
          <div className="overflow-x-auto rounded-2xl border border-[#E8E6E0] mb-6">
            <table className="w-full text-xs min-w-[700px]">
              <thead><tr className="bg-[#1C2E5E] text-[9px] font-bold text-[#8FA5C8] uppercase tracking-widest">{["Token","Family","Weight","Size px","Size rem","Line-height","Letter-spacing","Max-width"].map((h)=>(<th key={h} className="px-3 py-3 text-left">{h}</th>))}</tr></thead>
              <tbody>{TYPE_SCALE.map((t,i)=>(<tr key={t.token} className={`border-t border-[#F1F2F4] ${i%2===0?"bg-white":"bg-[#FAFAF8]"}`}><td className="px-3 py-2"><span className="font-bold text-[9px] text-[#1C2E5E] px-2 py-0.5 rounded-full bg-[#EEF2F8]">{t.token}</span></td><td className="px-3 py-2 font-medium text-[#374151]">{t.family}</td><td className="px-3 py-2 text-[#6B7280]">{t.weight}</td><td className="px-3 py-2 font-bold text-[#0D1829]">{t.sizePx}</td><td className="px-3 py-2 text-[#6B7280] font-mono">{t.sizeRem}</td><td className="px-3 py-2 text-[#6B7280] font-mono">{t.lineHeightRatio}</td><td className="px-3 py-2 text-[#6B7280] font-mono">{t.letterSpacingPx}</td><td className="px-3 py-2 text-[#6B7280]">{t.maxWidthCh?`${t.maxWidthCh}ch`:"—"}</td></tr>))}</tbody>
            </table>
          </div>
          <div className="bg-white rounded-2xl border border-[#E8E6E0]">
            <div className="px-4 py-3 bg-[#FAFAF8] rounded-t-2xl"><p className="text-[10px] font-bold uppercase tracking-widest text-[#9BA3B0]">Click any token to see full spec + CSS</p></div>
            {TYPE_SCALE.map((t)=><TokenRow key={t.token} t={t} />)}
          </div>
        </motion.div>
      )}
      {activeTab==="elements" && (
        <motion.div initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{duration:0.3}} className="space-y-4">
          {ELEMENT_MAP.map((item)=>(
            <div key={item.element} className="bg-white rounded-2xl border border-[#E8E6E0] overflow-hidden">
              <div className="bg-[#EEF2F8] px-4 py-3"><p style={{fontFamily:"Barlow Condensed, sans-serif",fontWeight:700,fontSize:"16px",color:"#1C2E5E"}}>{item.element}</p></div>
              <table className="w-full text-xs"><thead><tr className="bg-[#FAFAF8] text-[9px] font-bold text-[#9BA3B0] uppercase tracking-widest">{["Element role","Token","Exact spec",""].map((h)=>(<th key={h} className="px-4 py-2 text-left">{h}</th>))}</tr></thead>
                <tbody>{item.parts.map((p)=>(<tr key={p.role} className="border-t border-[#F1F2F4]"><td className="px-4 py-2.5 font-semibold text-[#374151]">{p.role}</td><td className="px-4 py-2.5"><span className="px-1.5 py-0.5 rounded-full bg-[#EEF2F8] text-[#1C2E5E] text-[9px] font-bold">{p.token}</span></td><td className="px-4 py-2.5 text-[#9BA3B0] font-mono text-[10px]">{p.spec}</td><td className="px-2 py-2.5"><div className="w-3 h-3 rounded-full border border-[#E8E6E0]" style={{backgroundColor:p.color}} /></td></tr>))}</tbody>
              </table>
            </div>
          ))}
        </motion.div>
      )}
      {activeTab==="rules" && (
        <motion.div initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{duration:0.3}}>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl border border-green-200 overflow-hidden">
              <div className="bg-green-50 px-5 py-3 flex items-center gap-2"><Check size={16} className="text-green-600" /><p className="font-bold text-green-800">Typography — DOs</p></div>
              <ul className="divide-y divide-[#F1F2F4]">{DOS.map((rule,i)=>(<li key={i} className="px-5 py-3 flex items-start gap-3 text-xs text-[#374151]"><span className="text-green-500 shrink-0 font-bold text-[10px] mt-0.5">{String(i+1).padStart(2,"0")}</span>{rule}</li>))}</ul>
            </div>
            <div className="bg-white rounded-2xl border border-red-200 overflow-hidden">
              <div className="bg-red-50 px-5 py-3 flex items-center gap-2"><X size={16} className="text-red-600" /><p className="font-bold text-red-800">Typography — DON'Ts</p></div>
              <ul className="divide-y divide-[#F1F2F4]">{DONTS.map((rule,i)=>(<li key={i} className="px-5 py-3 flex items-start gap-3 text-xs text-[#374151]"><span className="text-red-400 shrink-0 font-bold text-[10px] mt-0.5">{String(i+1).padStart(2,"0")}</span>{rule}</li>))}</ul>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}