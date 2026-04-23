import React, { useState } from "react";
import { motion } from "motion/react";
import { Check, X } from "lucide-react";

/* ═══════════════════════════════════════════════════════════════════
   BOTS FIRED · COLOR ENGINEERING SPECIFICATION
   Primary reference: WCAG 2.1 AA (4.5:1 normal text, 3:1 large text)
   Target: WCAG AAA wherever possible (7:1 normal text)
═══════════════════════════════════════════════════════════════════ */

function relativeLuminance(hex: string): number {
  const r = parseInt(hex.slice(1,3),16)/255;
  const g = parseInt(hex.slice(3,5),16)/255;
  const b = parseInt(hex.slice(5,7),16)/255;
  const lin = (c: number) => c<=0.04045?c/12.92:Math.pow((c+0.055)/1.055,2.4);
  return 0.2126*lin(r)+0.7152*lin(g)+0.0722*lin(b);
}
function contrastRatio(a: string,b: string): number {
  const L1=relativeLuminance(a),L2=relativeLuminance(b);
  return (Math.max(L1,L2)+0.05)/(Math.min(L1,L2)+0.05);
}
function wcagRating(ratio: number,isLargeText=false): {label:string;ok:boolean;level:"AAA"|"AA"|"AA-large"|"FAIL"} {
  if(ratio>=7) return {label:"AAA",ok:true,level:"AAA"};
  if(ratio>=4.5) return {label:"AA",ok:true,level:"AA"};
  if(ratio>=3&&isLargeText) return {label:"AA (large)",ok:true,level:"AA-large"};
  return {label:"FAIL",ok:false,level:"FAIL"};
}

const FIRE_SCALE = [
  { step:"Spark 100",  hex:"#FFF3E0", temperature:"Warm glow",            role:"Background tint for fire-accented sections, toast bg",    textOn:"#92400E", note:"So light it reads as white-adjacent. Use to warm a layout, not as a focal point.",          usage:["Section tint bg","Toast/snackbar bg","Warm card fill"] },
  { step:"Spark 200",  hex:"#FFD166", temperature:"Bright spark",         role:"Sparkle effects, decorative accents, secondary highlights", textOn:"#92400E", note:"Use only for decorative/illustrative elements. Never for UI components or typography.",  usage:["Logo sparkle detail","Star/sparkle SVG fills","Animated accent dots"] },
  { step:"Ember 300",  hex:"#F8BF60", temperature:"Glowing ember top",     role:"Gradient midpoint, SVG flame inner",                    textOn:"#7C3500", note:"Gradient use only. Not standalone for text or solid UI elements.",                     usage:["Flame SVG gradient","Progress bar gradient end"] },
  { step:"Gold 400",   hex:"#F5A030", temperature:"Deep amber glow",       role:"Primary accent for AI/insight elements, hover states",   textOn:"#0D1829", note:"The 'intelligence' colour. Use to signal insight, expertise, and attention.",            usage:["Handwritten note accent","AI feature callout","Star ratings","Logo sparkle primary"] },
  { step:"Amber 500",  hex:"#D97706", temperature:"Amber combustion",      role:"Caveat font colour, annotation text, date/labels",       textOn:"#0D1829", note:"The handwritten-text token. Darker than Gold 400 — passes AA on white backgrounds.",     usage:["Caveat handwritten text (PRIMARY)","Annotation labels","Date stamps in editorial"] },
  { step:"Fire 500",   hex:"#E8541A", temperature:"THE FLAME · Core brand fire", role:"PRIMARY ACCENT: CTAs, overlines, kickers, icon fills", textOn:"#FFFFFF", note:"🔥 THE MOST IMPORTANT COLOUR. Every fire metaphor in the brand lives here. Max 1 Fire 500 element per 400px screen height.", usage:["All CTA buttons (primary)","Section kicker/overline text","Logo flame fill","Podcast play button"] },
  { step:"Heat 600",   hex:"#C93E0E", temperature:"Deep fire core",        role:"Fire hover state, pressed states, error contexts",       textOn:"#FFFFFF", note:"Only used on interaction states or to deepen Fire 500 in gradient contexts.",            usage:["CTA button hover/pressed","Error state (not destructive red)","Dark fire badge bg"] },
  { step:"Ember Dark 700", hex:"#A32E08", temperature:"Smoldering char",  role:"Fire on dark backgrounds — for contrast compliance",     textOn:"#FFFFFF", note:"Required when Fire 500 doesn't pass contrast on a background.",                          usage:["Fire-coloured text on Navy 800 bg","Gradient terminus (dark)"] },
  { step:"Char 800",   hex:"#7A1F03", temperature:"Charcoal fire",         role:"Deep ember — print/dark contexts only",                  textOn:"#FFFFFF", note:"Reserved for print and extreme dark contexts. Not used in digital UI.",                  usage:["Print version of fire accent","Dark mode fire text on light"] },
];

const NAVY_SCALE = [
  { step:"Navy 50",  hex:"#EEF2F8", role:"Card fills, active nav bg, tag backgrounds",                         usage:["Card bg","Active nav pill","Chip/badge bg"] },
  { step:"Navy 100", hex:"#D0DAE8", role:"Borders on dark content, subtle separator lines",                     usage:["Border on dark cards","HR elements","Dividers"] },
  { step:"Navy 200", hex:"#8FA5C8", role:"Placeholder text on dark bg, secondary icon fill",                   usage:["Dark-bg placeholder text","Secondary icons on dark"] },
  { step:"Navy 300", hex:"#4A66A0", role:"Subtitle text on dark bg, label text color",                         usage:["Metadata on dark cards","Label token text"] },
  { step:"Navy 400", hex:"#2A4080", role:"Strong text on dark bg, pressed nav on dark",                        usage:["Section text on mid-navy bg","Strong secondary text on dark"] },
  { step:"Navy 500", hex:"#1C2E5E", role:"PRIMARY BRAND NAVY — headlines, logo, primary text on light",       usage:["All display headlines","Logo wordmark","Nav link active","Primary text on light bg"] },
  { step:"Navy 600", hex:"#162244", role:"Card backgrounds on dark layouts, pressed states",                    usage:["Dark card bg","Pressed button state","Podcast card bg"] },
  { step:"Navy 700", hex:"#111C36", role:"H1–H3 on white for max readability",                                 usage:["Article body headings","H2/H3 heading color (light bg)"] },
  { step:"Navy 800", hex:"#0D1829", role:"PRIMARY DARK SURFACE — page-level dark backgrounds",                 usage:["Dark section/page bg","Podcast hero bg","Dark modal bg"] },
  { step:"Navy 900", hex:"#09101C", role:"Maximum depth — almost black, for extreme contrast",                  usage:["Drop shadow color","Border on dark sections"] },
];

const NEUTRAL_SCALE = [
  { step:"Warm 50",  hex:"#FAFAF8", role:"Page background — the default page surface" },
  { step:"Warm 100", hex:"#F4F3EF", role:"Secondary sections, input backgrounds" },
  { step:"Warm 200", hex:"#E8E6E0", role:"Card borders, dividers on light bg" },
  { step:"Warm 300", hex:"#D4D0C8", role:"Disabled borders, medium dividers" },
  { step:"Ink 400",  hex:"#9BA3B0", role:"Placeholder text, caption color, metadata" },
  { step:"Ink 500",  hex:"#6B7280", role:"Secondary body text, card descriptions" },
  { step:"Ink 600",  hex:"#4B5563", role:"Primary body text (articles, newsletters)" },
  { step:"Ink 700",  hex:"#374151", role:"Strong secondary text, list items" },
  { step:"Ink 800",  hex:"#1F2937", role:"Near-black text, max contrast on light" },
];

const APPROVED_PAIRS = [
  { fg:"#FFFFFF", bg:"#1C2E5E", label:"White on Navy 500",        use:"Primary CTA, nav headers, card headers" },
  { fg:"#FFFFFF", bg:"#0D1829", label:"White on Navy 800",        use:"Dark sections, podcast bg, HUD" },
  { fg:"#FFFFFF", bg:"#E8541A", label:"White on Fire 500",        use:"Fire CTA buttons, overline chips on dark" },
  { fg:"#1C2E5E", bg:"#EEF2F8", label:"Navy 500 on Navy 50",      use:"Tag pills, active nav, chips on light" },
  { fg:"#0D1829", bg:"#FFFFFF", label:"Navy 800 on White",        use:"Blog headings H1–H4, card titles" },
  { fg:"#E8541A", bg:"#FFFFFF", label:"Fire 500 on White",        use:"Overlines, kickers, link text (large)" },
  { fg:"#D97706", bg:"#0D1829", label:"Amber on Navy 800",        use:"Handwritten Caveat on dark surfaces" },
  { fg:"#F5A030", bg:"#0D1829", label:"Gold on Navy 800",         use:"Sparkle highlights, AI callouts on dark" },
  { fg:"#4B5563", bg:"#FFFFFF", label:"Ink 600 on White",         use:"All body text on white card backgrounds" },
  { fg:"#6B7280", bg:"#FFFFFF", label:"Ink 500 on White",         use:"Secondary text, descriptions on white" },
  { fg:"#EEF2F8", bg:"#1C2E5E", label:"Navy 50 on Navy 500",      use:"Subtitle text on dark cards" },
  { fg:"#8FA5C8", bg:"#0D1829", label:"Navy 200 on Navy 800",     use:"Secondary text on darkest bg" },
  { fg:"#F5A030", bg:"#1C2E5E", label:"Gold on Navy 500",         use:"Logo sparkles, feature badges on navy card" },
];

const FORBIDDEN_PAIRS = [
  { fg:"#F5A030", bg:"#FFFFFF", reason:"Gold on white: ~2.9:1 — FAILS AA for normal text. Gold is for dark surfaces only." },
  { fg:"#D97706", bg:"#FAFAF8", reason:"Amber on Warm 50: ~3.1:1 — marginal and FAILS AA for body text." },
  { fg:"#E8541A", bg:"#FFF8EC", reason:"Fire 500 on Fire 50: ~2.8:1 — fails completely. Never use fire on a warm tint." },
  { fg:"#E8541A", bg:"#F5A030", reason:"Fire on Gold: related hues, nearly zero contrast. Adjacent analogous = illegible." },
  { fg:"#1C2E5E", bg:"#4A66A0", reason:"Navy 500 on Navy 300: ~2.1:1 — insufficient contrast." },
  { fg:"#8FA5C8", bg:"#EEF2F8", reason:"Navy 200 on Navy 50: ~1.8:1 — nearly invisible." },
  { fg:"#9BA3B0", bg:"#FFFFFF", reason:"Ink 400 on White: ~2.85:1 — passes only for decorative. Never for readable text." },
  { fg:"#FFFFFF", bg:"#F5A030", reason:"White on Gold 400: ~2.9:1 — fails AA. White only on Navy and Fire." },
];

const HARMONY_RULES = [
  { name:"Primary Brand Combo",         colors:["#1C2E5E","#E8541A","#F5A030"],                                  description:"The core trinity. Navy (trust/authority) + Fire (action/energy) + Gold (insight/intelligence).",              rule:"Navy dominates (60%), Fire accents (30%), Gold highlights (10%).",             gradient:undefined },
  { name:"Dark Prestige",               colors:["#0D1829","#162244","#E8541A","#F5A030","#D97706"],              description:"Full dark palette with fire accent. Premium sections, podcast hero, training.",                               rule:"Black navy dominates. Fire/Gold emerge like flame from darkness.",             gradient:undefined },
  { name:"Editorial Light",             colors:["#FAFAF8","#FFFFFF","#E8E6E0","#0D1829","#4B5563"],             description:"Clean reading surface. Fire only for overlines and links, not backgrounds.",                                rule:"Warm neutrals + ink. Fire appears only in text (overlines, kickers).",         gradient:undefined },
  { name:"Navy + Fire Gradient",        colors:["#1C2E5E","#E8541A","#F5A030"],                                  description:"The brand gradient. Used in progress fills, upload animations, logo fill effects.",                           rule:"Always left-to-right: Navy → Fire → Gold. Never reverse. Angle: 90° (linear) or 135° (diagonal).", gradient:"linear-gradient(90deg, #1C2E5E 0%, #E8541A 65%, #F5A030 100%)" },
  { name:"Fire Temperature Gradient",   colors:["#7A1F03","#A32E08","#C93E0E","#E8541A","#F5A030","#F8BF60","#FFD166"], description:"The full flame scale — logo flame SVG, animation fill effects, progress indicators.",                      rule:"Dark char at bottom, bright spark at top. Mimics actual fire physics. Bottom-to-top always.", gradient:"linear-gradient(0deg, #7A1F03 0%, #E8541A 50%, #FFD166 100%)" },
];

const COLOR_DOS = [
  "Use Navy 500 (#1C2E5E) as the primary brand anchor in every layout — never remove it entirely from a page.",
  "Fire 500 (#E8541A) is the ONLY colour for primary CTAs and interactive overlines — keep it consistent.",
  "Always pair fire colours with navy or near-black backgrounds to maintain contrast and visual drama.",
  "Use the 60/30/10 ratio: Navy 60%, Fire 30%, Gold 10% in any brand-coloured layout.",
  "For dark surfaces, use Gold 400 (#F5A030) or Amber 500 (#D97706) for Caveat/handwritten text.",
  "Verify every text-on-background combination with WCAG calculation before shipping.",
  "Use Navy 50 (#EEF2F8) for chip/tag backgrounds on white — creates subtle hierarchy without Fire.",
  "The brand gradient (Navy → Fire → Gold) is only used for progress, fills, and dynamic UI.",
  "On dark surfaces: use Navy 200 (#8FA5C8) for secondary text, Navy 300 (#4A66A0) for tertiary.",
  "In print: substitute digital Fire 500 with Pantone 166 C and Navy 500 with Pantone 2768 C.",
  "For error states, use Heat 600 (#C93E0E) — not red (#EF4444) which clashes with the fire palette.",
];

const COLOR_DONTS = [
  "NEVER place Gold 400 (#F5A030) on white backgrounds for text — it fails WCAG AA at 2.9:1.",
  "NEVER use Fire 500 on Fire 50 background — same hue family, no contrast (~2.8:1).",
  "NEVER stack two fire-family colours as fill + text — adjacent analogous hues create zero contrast.",
  "NEVER use Amber (#D97706) for body copy on Warm 50 (#FAFAF8) — fails WCAG AA for normal text.",
  "NEVER use a pure #FF0000 red — it conflicts with Fire 500 and is not in the palette.",
  "NEVER use Navy 200 on Navy 50 — values are too close (1.8:1 contrast).",
  "NEVER use white text on Gold 400 — fails WCAG (2.9:1). White is only for Navy and Fire backgrounds.",
  "NEVER replace Navy 500 with a generic dark colour (#333, #444) — the brand depends on the specific navy hue.",
  "NEVER use more than 3 colours from the fire scale in a single component.",
  "NEVER use gradients on text (text-gradient / -webkit-background-clip) for body copy — accessibility risk.",
  "NEVER tint or adjust the hex values of core brand colours. Palette is fixed — no lightening, no opacity hacks.",
];

function ContrastBadge({ ratio, isLarge=false }: { ratio: number; isLarge?: boolean }) {
  const r = wcagRating(ratio,isLarge);
  const color = r.level==="AAA"?"#166534":r.level==="AA"||r.level==="AA-large"?"#92400E":"#991B1B";
  const bg = r.level==="AAA"?"#F0FDF4":r.level==="AA"||r.level==="AA-large"?"#FFFBEB":"#FEF2F2";
  return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold" style={{backgroundColor:bg,color}}>{r.ok?<Check size={9}/>:<X size={9}/>}{r.label} · {ratio.toFixed(2)}:1</span>;
}

export function ColorSystem() {
  const [activeTab, setActiveTab] = useState<"fire"|"navy"|"neutral"|"matrix"|"harmony"|"rules">("fire");
  const TABS = [{id:"fire" as const,label:"🔥 Fire Scale"},{id:"navy" as const,label:"Navy Palette"},{id:"neutral" as const,label:"Neutrals"},{id:"matrix" as const,label:"Contrast Matrix"},{id:"harmony" as const,label:"Harmony Rules"},{id:"rules" as const,label:"Dos & Don'ts"}];

  return (
    <div className="space-y-8">
      <div>
        <p className="text-[10px] font-bold uppercase tracking-widest text-[#9BA3B0] mb-1">Color Engineering</p>
        <h3 style={{fontFamily:"Barlow Condensed, sans-serif",color:"#1C2E5E",fontSize:"28px",fontWeight:700}}>Full Colour System · BOTS FIRED</h3>
        <div className="mt-2 flex flex-wrap gap-2">{["WCAG 2.1 AA minimum","AAA target","9-step Fire Temperature Scale","10-step Navy Palette","9-step Neutral/Ink","6 harmony rules"].map((t)=>(<span key={t} className="px-2.5 py-1 rounded-full bg-[#EEF2F8] text-[#1C2E5E] font-semibold text-[10px]">{t}</span>))}</div>
      </div>
      <div className="flex gap-2 flex-wrap">{TABS.map(({id,label})=>(<button key={id} onClick={()=>setActiveTab(id)} className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${activeTab===id?"bg-[#1C2E5E] text-white":"border border-[#E8E6E0] text-[#6B7280]"}`}>{label}</button>))}</div>

      {activeTab==="fire" && (
        <motion.div initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{duration:0.3}}>
          <div className="mb-4 px-4 py-3 rounded-xl bg-[#FFF3E0] border border-[#F5A030]/30">
            <p className="text-xs text-[#92400E]"><span style={{fontFamily:"Caveat, cursive",fontSize:"16px"}}>The Fire Scale: </span>9 steps from Warm Spark to Charcoal. Fire 500 (#E8541A) is the hero — THE brand colour. Use all other steps as supporting cast only.</p>
          </div>
          <div className="space-y-0 rounded-2xl overflow-hidden border border-[#E8E6E0]">
            {FIRE_SCALE.map((f)=>{
              const onBlack=contrastRatio(f.hex,"#0D1829"),onWhite=contrastRatio(f.hex,"#FFFFFF");
              return (<div key={f.step} className="flex items-stretch" style={{backgroundColor:f.hex}}>
                <div className="w-24 shrink-0 flex flex-col items-center justify-center py-4 px-2"><div className="w-8 h-8 rounded-xl border-2 border-white/30" style={{backgroundColor:f.hex}}/><p className="text-[8px] font-bold mt-1 text-center" style={{color:f.textOn}}>{f.hex}</p></div>
                <div className="flex-1 bg-white border-l border-[#F1F2F4] px-4 py-3">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div><div className="flex items-center gap-2"><p className="text-xs font-bold text-[#0D1829]">{f.step}</p>{f.step==="Fire 500"&&<span className="text-[9px] px-2 py-0.5 rounded-full bg-[#E8541A] text-white font-bold">HERO</span>}</div><p style={{fontFamily:"Caveat, cursive",fontSize:"13px",color:"#D97706"}}>{f.temperature}</p><p className="text-[10px] text-[#6B7280] mt-0.5">{f.role}</p></div>
                    <div className="flex flex-wrap gap-1.5"><ContrastBadge ratio={onWhite}/><span className="text-[9px] text-[#9BA3B0]">on white</span><ContrastBadge ratio={onBlack}/><span className="text-[9px] text-[#9BA3B0]">on navy 800</span></div>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-1">{f.usage.map((u)=>(<span key={u} className="text-[9px] px-1.5 py-0.5 rounded bg-[#F1F2F4] text-[#6B7280]">{u}</span>))}</div>
                  <p className="text-[10px] text-[#9BA3B0] mt-1.5 italic">{f.note}</p>
                </div>
              </div>);
            })}
          </div>
        </motion.div>
      )}

      {activeTab==="navy" && (
        <motion.div initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{duration:0.3}}>
          <div className="space-y-2">
            {NAVY_SCALE.map((n)=>{
              const ratioOnWhite=contrastRatio(n.hex,"#FFFFFF");
              const textColor=relativeLuminance(n.hex)>0.3?"#0D1829":"#FFFFFF";
              return (<div key={n.step} className="flex items-stretch rounded-xl overflow-hidden border border-[#E8E6E0]">
                <div className="w-20 shrink-0 flex flex-col items-center justify-center py-3" style={{backgroundColor:n.hex}}><p className="text-[8px] font-bold" style={{color:textColor}}>{n.hex}</p></div>
                <div className="flex-1 bg-white px-4 py-2.5">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div><p className="text-xs font-bold text-[#0D1829]">{n.step}</p><p className="text-[10px] text-[#6B7280]">{n.role}</p></div>
                    <ContrastBadge ratio={ratioOnWhite}/>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-1">{n.usage.map((u)=>(<span key={u} className="text-[9px] px-1.5 py-0.5 rounded bg-[#EEF2F8] text-[#1C2E5E]">{u}</span>))}</div>
                </div>
              </div>);
            })}
          </div>
        </motion.div>
      )}

      {activeTab==="neutral" && (
        <motion.div initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{duration:0.3}}>
          <div className="space-y-2">
            {NEUTRAL_SCALE.map((n)=>{
              const textColor=relativeLuminance(n.hex)>0.3?"#0D1829":"#FFFFFF";
              return (<div key={n.step} className="flex items-stretch rounded-xl overflow-hidden border border-[#E8E6E0]">
                <div className="w-20 shrink-0 flex flex-col items-center justify-center py-3" style={{backgroundColor:n.hex}}><p className="text-[8px] font-bold" style={{color:textColor}}>{n.hex}</p></div>
                <div className="flex-1 bg-white px-4 py-2.5"><p className="text-xs font-bold text-[#0D1829]">{n.step}</p><p className="text-[10px] text-[#6B7280]">{n.role}</p></div>
              </div>);
            })}
          </div>
        </motion.div>
      )}

      {activeTab==="matrix" && (
        <motion.div initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{duration:0.3}}>
          <p className="text-xs text-[#6B7280] mb-4">Approved pairings (WCAG verified). Every combination below is pre-approved for use in BOTS FIRED digital products.</p>
          <div className="grid sm:grid-cols-2 gap-3 mb-8">
            {APPROVED_PAIRS.map((p)=>{
              const ratio=contrastRatio(p.fg,p.bg);
              return (<div key={p.label} className="rounded-xl border border-[#E8E6E0] overflow-hidden">
                <div className="px-4 py-4 flex flex-col gap-1" style={{backgroundColor:p.bg}}>
                  <p style={{fontFamily:"Barlow Condensed, sans-serif",fontWeight:700,fontSize:"18px",color:p.fg}}>BOTS FIRED Headline</p>
                  <p style={{fontFamily:"Inter, sans-serif",fontWeight:400,fontSize:"13px",color:p.fg,opacity:0.85}}>Body text on this combination.</p>
                </div>
                <div className="bg-white px-4 py-2.5">
                  <p className="text-[10px] font-bold text-[#374151]">{p.label}</p>
                  <p className="text-[9px] text-[#9BA3B0] mt-0.5">{p.use}</p>
                  <ContrastBadge ratio={ratio}/>
                </div>
              </div>);
            })}
          </div>
          <p className="text-xs font-bold text-red-700 mb-3 uppercase tracking-widest">⛔️ Forbidden Pairs — never use these</p>
          <div className="space-y-3">
            {FORBIDDEN_PAIRS.map((p)=>{
              const ratio=contrastRatio(p.fg,p.bg);
              return (<div key={p.reason} className="rounded-xl border-2 border-red-200 overflow-hidden">
                <div className="px-4 py-3 flex items-center justify-between" style={{backgroundColor:p.bg}}>
                  <p style={{fontFamily:"Barlow Condensed, sans-serif",fontWeight:700,fontSize:"16px",color:p.fg}}>This text fails</p>
                  <span className="text-[10px] font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded-full">{ratio.toFixed(2)}:1 FAIL</span>
                </div>
                <div className="bg-white px-4 py-2.5"><p className="text-[10px] text-red-700">{p.reason}</p></div>
              </div>);
            })}
          </div>
        </motion.div>
      )}

      {activeTab==="harmony" && (
        <motion.div initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{duration:0.3}} className="space-y-5">
          {HARMONY_RULES.map((h)=>(
            <div key={h.name} className="bg-white rounded-2xl border border-[#E8E6E0] overflow-hidden">
              <div className="px-5 py-4">
                <p className="text-xs font-bold text-[#0D1829]">{h.name}</p>
                <p className="text-[11px] text-[#6B7280] mt-1">{h.description}</p>
                <div className="flex gap-2 mt-3">{h.colors.map((c)=>(<div key={c} className="flex flex-col items-center gap-1"><div className="w-10 h-10 rounded-xl border border-black/10" style={{backgroundColor:c}}/><p className="text-[8px] font-mono text-[#9BA3B0]">{c}</p></div>))}</div>
                {h.gradient&&<div className="mt-3 h-6 rounded-xl" style={{background:h.gradient}}/>}
                <div className="mt-3 px-3 py-2 rounded-xl bg-[#EEF2F8] text-[10px] text-[#1C2E5E]"><span style={{fontFamily:"Caveat, cursive",fontSize:"14px"}}>Rule: </span>{h.rule}</div>
              </div>
            </div>
          ))}
        </motion.div>
      )}

      {activeTab==="rules" && (
        <motion.div initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{duration:0.3}}>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl border border-green-200 overflow-hidden">
              <div className="bg-green-50 px-5 py-3 flex items-center gap-2"><Check size={16} className="text-green-600"/><p className="font-bold text-green-800">Colour — DOs</p></div>
              <ul className="divide-y divide-[#F1F2F4]">{COLOR_DOS.map((rule,i)=>(<li key={i} className="px-5 py-3 flex items-start gap-3 text-xs text-[#374151]"><span className="text-green-500 shrink-0 font-bold text-[10px] mt-0.5">{String(i+1).padStart(2,"0")}</span>{rule}</li>))}</ul>
            </div>
            <div className="bg-white rounded-2xl border border-red-200 overflow-hidden">
              <div className="bg-red-50 px-5 py-3 flex items-center gap-2"><X size={16} className="text-red-600"/><p className="font-bold text-red-800">Colour — DON'Ts</p></div>
              <ul className="divide-y divide-[#F1F2F4]">{COLOR_DONTS.map((rule,i)=>(<li key={i} className="px-5 py-3 flex items-start gap-3 text-xs text-[#374151]"><span className="text-red-400 shrink-0 font-bold text-[10px] mt-0.5">{String(i+1).padStart(2,"0")}</span>{rule}</li>))}</ul>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}