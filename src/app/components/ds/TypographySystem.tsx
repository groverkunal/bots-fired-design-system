import { useReducedMotionPreference } from "../shared/useReducedMotionPreference";
import React, { useState } from "react";
import { motion } from "motion/react";
import { Check, X } from "lucide-react";

/* ═══════════════════════════════════════════════════════════════════
   BOTS FIRED · TYPOGRAPHY ENGINEERING SPECIFICATION
   Base spacing unit: 4px. Typography can interpolate between accessible endpoints.
   Root font-size: 16px (1rem = 16px)
   Scale: existing display specimens plus explicit reading-role floors
═══════════════════════════════════════════════════════════════════ */

import { TYPE_SCALE, type TypeToken } from "./typeTokens";

const ELEMENT_MAP = [
  { element: "Homepage Hero", parts: [
    { role: "Eyebrow kicker", token: "overline", spec: "Inter 700 · 14px · 24px lh · 2.5px ls · UPPERCASE", color: "#E8541A" },
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
  "Use a clear heading hierarchy; these role tokens do not form a uniform geometric scale.",
  "Cap line-length at 65–72 characters for body text. Use max-w of 65ch in CSS.",
  "Use Caveat exclusively for: pull quotes, personal notes, annotations, 'handwritten' asides.",
  "Set letter-spacing to ≥2px for ALL CAPS text. Uppercase without tracking is illegible.",
  "Use the 4px grid for spacing endpoints; fluid font sizes and letter spacing need not be divisible by four.",
  "Use 14px or larger for UI labels and metadata; reserve 12px for limited caption/legal text.",
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
  "Use the four documented families intentionally; monospace is optional for code.",
];

function TokenRow({ t }: { t: TypeToken }) {
  return (
    <details id={`type-row-${t.token}`} className="border-b border-[#F1F2F4] last:border-0">
      <summary aria-label={`Inspect ${t.token} specification`} className="w-full text-left py-4 flex items-start gap-4 hover:bg-[#FAFAF8] px-3 rounded-xl transition-colors">
        <div className="flex-1 min-w-0">
          <p style={{ fontFamily: `${t.family}, sans-serif`, fontWeight: t.weight, fontStyle: t.style, fontSize: Math.min(t.sizePx, 40), lineHeight: Math.min(t.lineHeightPx, 48) / Math.min(t.sizePx, 40), letterSpacing: t.letterSpacingPx, textTransform: t.transform || "none", color: t.hex, wordBreak: "break-word" }}>{t.sample}</p>
          <div className="flex flex-wrap items-center gap-3 mt-2">
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#EEF2F8] text-[#1C2E5E]">{t.token}</span>
            <span className="text-[10px] text-[#9BA3B0]">{t.family} · {t.weightLabel} · {t.sizePx}px</span>
          </div>
        </div>
        <span aria-hidden="true" className="type-disclosure-indicator text-[#CBD0D8] text-xs mt-1 shrink-0">▼</span>
      </summary>

        <div id={`type-spec-${t.token}`} className="mx-3 mb-4 rounded-xl bg-[#FAFAF8] border border-[#E8E6E0] p-4 grid sm:grid-cols-2 gap-4 text-xs">
          <div>
            <p className="font-bold text-[#374151] mb-2 uppercase tracking-widest text-[10px]">Engineering Spec</p>
            <table className="w-full text-[11px]"><tbody>
              {[["Token",t.token],["Family",t.family],["Stack",t.familyStack],["Weight",`${t.weight} (${t.weightLabel})`],["Style",t.style],["Size (px)",`${t.sizePx}px`],["Size (rem)",t.sizeRem],["Line-height",`${t.lineHeightPx}px (${t.lineHeightRatio})`],["Letter-spacing",`${t.letterSpacingPx} / ${t.letterSpacingEm}`],["Para spacing",`${t.paragraphSpacingPx}px`],["Max width",t.maxWidthCh?`${t.maxWidthCh}ch`:"No constraint"],["Transform",t.transform||"none"],["Color token",t.color],["Color hex",t.hex]].map(([k,v])=>(
                <tr key={k as string}><td className="text-[#9BA3B0] pr-3 py-0.5 font-semibold w-28">{k}</td><td className="text-[#374151] font-mono">{v}</td></tr>
              ))}
            </tbody></table>
          </div>
          <div>
            <p className="font-bold text-[#374151] mb-2 uppercase tracking-widest text-[10px]">Suggested Usage</p>
            <ul className="space-y-1.5">{t.usage.map((u)=>(<li key={u} className="flex items-start gap-2 text-[11px] text-[#4B5563]"><Check size={11} className="text-green-700 shrink-0 mt-0.5" />{u}</li>))}</ul>
            <div className="mt-3 p-2.5 rounded-lg bg-[#0D1829]">
              <p className="text-[9px] text-[#8FA5C8] mb-1 uppercase tracking-widest">CSS</p>
              <pre className="text-[10px] text-[#8FA5C8] whitespace-pre-wrap leading-relaxed">{`font-family: ${t.familyStack};\nfont-size: ${t.sizeRem};\nfont-weight: ${t.weight};\nfont-style: ${t.style};\nline-height: ${t.lineHeightPx/t.sizePx};\nletter-spacing: ${t.letterSpacingEm};${t.maxWidthCh?`\nmax-width: ${t.maxWidthCh}ch;`:""}`}</pre>
            </div>
          </div>
        </div>

    </details>
  );
}

export function TypographySystem() {
  const reducedMotion = useReducedMotionPreference();
  const [activeTab, setActiveTab] = useState<"scale"|"elements"|"rules">("scale");
  return (
    <div className="space-y-8 legacy-type-reference">
      <div>
        <p className="text-[10px] font-bold uppercase tracking-widest text-[#9BA3B0] mb-1">Typography Engineering</p>
        <h3 style={{ fontFamily: "Barlow Condensed, sans-serif", color: "#1C2E5E", fontSize: "28px", fontWeight: 700 }}>Full Type System · BOTS FIRED</h3>
        <div className="mt-2 flex flex-wrap gap-3 text-xs">
          {["4px base grid","16px root","Existing role-based scale","4 families","17 tokens","65–72ch max measure"].map((t)=>(
            <span key={t} className="px-2.5 py-1 rounded-full bg-[#EEF2F8] text-[#1C2E5E] font-semibold text-[10px]">{t}</span>
          ))}
        </div>
      </div>
      <div role="group" aria-label="Typography reference sections" className="flex gap-2 flex-wrap">
        {(["scale","elements","rules"] as const).map((id)=>(
          <button key={id} aria-pressed={activeTab===id} onClick={()=>setActiveTab(id)} className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${activeTab===id?"bg-[#1C2E5E] text-white":"border border-[#E8E6E0] text-[#6B7280]"}`}>
            {id==="scale"?"Type Scale":id==="elements"?"Element Map":"Dos & Don'ts"}
          </button>
        ))}
      </div>
      {activeTab==="scale" && (
        <motion.div initial={reducedMotion ? false : {opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{duration:reducedMotion ? 0 : .3}}>
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
        <motion.div initial={reducedMotion ? false : {opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{duration:reducedMotion ? 0 : .3}} className="space-y-4">
          {ELEMENT_MAP.map((item)=>(
            <div key={item.element} className="bg-white rounded-2xl border border-[#E8E6E0] overflow-hidden">
              <div className="bg-[#EEF2F8] px-4 py-3"><p style={{fontFamily:"Barlow Condensed, sans-serif",fontWeight:700,fontSize:"20px",color:"#1C2E5E"}}>{item.element}</p></div>
              <table className="w-full text-xs"><thead><tr className="bg-[#FAFAF8] text-[9px] font-bold text-[#9BA3B0] uppercase tracking-widest">{["Element role","Token","Exact spec",""].map((h)=>(<th key={h} className="px-4 py-2 text-left">{h}</th>))}</tr></thead>
                <tbody>{item.parts.map((p)=>(<tr key={p.role} className="border-t border-[#F1F2F4]"><td className="px-4 py-2.5 font-semibold text-[#374151]">{p.role}</td><td className="px-4 py-2.5"><span className="px-1.5 py-0.5 rounded-full bg-[#EEF2F8] text-[#1C2E5E] text-[9px] font-bold">{p.token}</span></td><td className="px-4 py-2.5 text-[#9BA3B0] font-mono text-[10px]">{p.spec}</td><td className="px-2 py-2.5"><div className="w-3 h-3 rounded-full border border-[#E8E6E0]" style={{backgroundColor:p.color}} /></td></tr>))}</tbody>
              </table>
            </div>
          ))}
        </motion.div>
      )}
      {activeTab==="rules" && (
        <motion.div initial={reducedMotion ? false : {opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{duration:reducedMotion ? 0 : .3}}>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl border border-green-200 overflow-hidden">
              <div className="bg-green-50 px-5 py-3 flex items-center gap-2"><Check size={16} className="text-green-600" /><p className="font-bold text-green-800">Typography — DOs</p></div>
              <ul className="divide-y divide-[#F1F2F4]">{DOS.map((rule,i)=>(<li key={i} className="px-5 py-3 flex items-start gap-3 text-xs text-[#374151]"><span className="text-green-700 shrink-0 font-bold text-[10px] mt-0.5">{String(i+1).padStart(2,"0")}</span>{rule}</li>))}</ul>
            </div>
            <div className="bg-white rounded-2xl border border-red-200 overflow-hidden">
              <div className="bg-red-50 px-5 py-3 flex items-center gap-2"><X size={16} className="text-red-600" /><p className="font-bold text-red-800">Typography — DON'Ts</p></div>
              <ul className="divide-y divide-[#F1F2F4]">{DONTS.map((rule,i)=>(<li key={i} className="px-5 py-3 flex items-start gap-3 text-xs text-[#374151]"><span className="text-red-700 shrink-0 font-bold text-[10px] mt-0.5">{String(i+1).padStart(2,"0")}</span>{rule}</li>))}</ul>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}