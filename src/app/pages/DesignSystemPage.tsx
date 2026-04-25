import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Palette, Layout, Cpu, Monitor, Type, Droplets, FlaskConical, ChevronRight } from "lucide-react";
import { LogoSection } from "../components/ds/LogoSection";
import { TemplatesSection } from "../components/ds/TemplatesSection";
import { ComponentsSection } from "../components/ds/ComponentsSection";
import { PlatformsSection } from "../components/ds/PlatformsSection";
import { TypographySystem } from "../components/ds/TypographySystem";
import { ColorSystem } from "../components/ds/ColorSystem";
import { VerificationTests } from "../components/ds/VerificationTests";
import { BFLogoSVG } from "../components/ds/BFLogoSVG";
import { HandwrittenNote } from "../components/shared/HandwrittenNote";

const sections = [
  { id: "logos",       label: "Logo System",    icon: Palette,      color: "#1C2E5E" },
  { id: "typography",  label: "Typography",      icon: Type,         color: "#0D1829" },
  { id: "color",       label: "Colour System",   icon: Droplets,     color: "#E8541A" },
  { id: "templates",   label: "Templates",       icon: Layout,       color: "#D97706" },
  { id: "components",  label: "UI Components",   icon: Cpu,          color: "#4A66A0" },
  { id: "platforms",   label: "Platforms",       icon: Monitor,      color: "#2A4080" },
  { id: "verify",      label: "Spec Tests",      icon: FlaskConical, color: "#166534" },
];

const colorTokens = [
  { name: "Navy 500", hex: "#1C2E5E", role: "Primary / Brand" },
  { name: "Navy 800", hex: "#0D1829", role: "Deep / Background" },
  { name: "Fire 500", hex: "#E8541A", role: "Accent / CTA" },
  { name: "Gold 400", hex: "#F5A030", role: "Highlight / AI" },
  { name: "Amber",    hex: "#D97706", role: "Handwritten / Notes" },
  { name: "Warm 50",  hex: "#FAFAF8", role: "Page Background" },
  { name: "Ink 500",  hex: "#6B7280", role: "Body Text" },
  { name: "Warm 200", hex: "#E8E6E0", role: "Borders" },
];

const typeSamples = [
  { label: "Display H1", family: "Barlow Condensed", weight: "800", style: "italic", size: "clamp(2.5rem,6vw,4rem)", text: "AI Clarity for Leaders" },
  { label: "Display H2", family: "Barlow Condensed", weight: "700", style: "normal", size: "clamp(1.8rem,4vw,3rem)", text: "The Boardroom AI" },
  { label: "Body",       family: "Inter",            weight: "400", style: "normal", size: "1rem",                  text: "Weekly insights for C-suite executives navigating AI transformation." },
  { label: "Handwritten",family: "Caveat",           weight: "600", style: "normal", size: "1.5rem",               text: "No jargon. Just signal. Free forever." },
  { label: "Mono",       family: "JetBrains Mono",  weight: "500", style: "normal", size: "0.875rem",             text: "ISSUE #052 · GOVERNANCE · 6 MIN" },
];

function ColorPalette() {
  const [copied, setCopied] = useState<string | null>(null);
  const copy = (hex: string) => { navigator.clipboard.writeText(hex); setCopied(hex); setTimeout(() => setCopied(null), 1500); };
  return (
    <div className="grid grid-cols-4 sm:grid-cols-8 gap-3">
      {colorTokens.map(({ name, hex, role }) => (
        <button key={hex} onClick={() => copy(hex)} className="group flex flex-col gap-2 text-left">
          <div className="aspect-square rounded-2xl border border-black/5 group-hover:scale-105 transition-transform shadow-sm" style={{ backgroundColor: hex }} />
          <div>
            <p className="text-[9px] font-bold text-[#374151]">{name}</p>
            <p className="text-[9px] text-[#9BA3B0]">{hex}</p>
            <p className="text-[8px] text-[#CBD0D8]">{role}</p>
            {copied === hex && <p className="text-[9px] text-green-500 font-bold">Copied!</p>}
          </div>
        </button>
      ))}
    </div>
  );
}

function TypographyScale() {
  return (
    <div className="space-y-5">
      {typeSamples.map(({ label, family, weight, style, size, text }) => (
        <div key={label} className="border-b border-[#F1F2F4] pb-5 last:border-0">
          <div className="flex items-center gap-3 mb-1.5">
            <span className="text-[9px] font-bold uppercase tracking-widest text-[#9BA3B0]">{label}</span>
            <span className="text-[9px] text-[#CBD0D8]">{family} · {weight} · {style}</span>
          </div>
          <p style={{ fontFamily: `${family}, sans-serif`, fontWeight: weight, fontStyle: style, fontSize: size, color: "#1C2E5E", lineHeight: 1.15 }}>{text}</p>
        </div>
      ))}
    </div>
  );
}

export function DesignSystemPage() {
  const [active, setActive] = useState("logos");

  return (
    <div className="min-h-screen bg-[#FAFAF8] pt-16">
      <div className="bg-[#0D1829] border-b border-[#162244]">
        <div className="max-w-7xl mx-auto px-6 py-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#162244] text-[#8FA5C8] text-[10px] font-semibold uppercase tracking-widest mb-3">
                  <Palette size={10} /> Design System v2.0
                </span>
                <div className="mb-1"><BFLogoSVG variant="wordmark" theme="white" width={170} /></div>
                <h2 style={{ fontFamily: "Barlow Condensed, sans-serif", fontSize: "clamp(1.5rem,3vw,2.2rem)", fontWeight: 600, color: "#4A66A0" }}>Brand &amp; Design System</h2>
                <HandwrittenNote size="md" color="#F5A030" rotate={-1} className="mt-2 block">Complete. Consistent. Built for Leaders.</HandwrittenNote>
              </div>
              <div className="flex flex-wrap gap-3 text-xs text-[#4A66A0]">
                {[["Logo System","12 variants + 12 holidays"],["Templates","8 categories, 4+ samples each"],["Components","5 interactive UI components"],["Platforms","HUD + App + Glasses"]].map(([label, sub]) => (
                  <div key={label as string} className="bg-[#162244] rounded-xl px-3 py-2">
                    <p className="font-bold text-[#EEF2F8] text-xs">{label}</p>
                    <p className="text-[9px]">{sub}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="py-12 space-y-10 border-b border-[#E8E6E0]">
          <div><p className="text-xs font-semibold uppercase tracking-widest text-[#9BA3B0] mb-4">Brand Colours</p><ColorPalette /></div>
          <div><p className="text-xs font-semibold uppercase tracking-widest text-[#9BA3B0] mb-4">Type Scale</p><TypographyScale /></div>
        </div>
        <div className="py-6">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {sections.map(({ id, label, icon: Icon, color }) => (
              <button key={id} onClick={() => setActive(id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl whitespace-nowrap text-sm font-semibold transition-all duration-200 shrink-0 ${
                  active === id ? "text-white shadow-md" : "bg-white border border-[#E8E6E0] text-[#6B7280] hover:text-[#374151]"
                }`}
                style={active === id ? { backgroundColor: color } : {}}>
                <Icon size={15} />{label}{active === id && <ChevronRight size={12} />}
              </button>
            ))}
          </div>
        </div>
        <div className="pb-24">
          <AnimatePresence mode="wait">
            <motion.div key={active} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}>
              {active === "logos"      && <LogoSection />}
              {active === "typography" && <TypographySystem />}
              {active === "color"      && <ColorSystem />}
              {active === "templates"  && <TemplatesSection />}
              {active === "components" && <ComponentsSection />}
              {active === "platforms"  && <PlatformsSection />}
              {active === "verify"     && <VerificationTests />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
