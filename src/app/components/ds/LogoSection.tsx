import React, { useState } from "react";
import { motion } from "motion/react";
import { Check, Copy } from "lucide-react";
import { BFLogoSVG, BFPhotoLogo, BFPhotoLogo2, HolidayLogo } from "./BFLogoSVG";
import { HandwrittenNote } from "../shared/HandwrittenNote";
import { AnimatedSection, StaggerContainer, StaggerItem } from "../shared/AnimatedSection";

type Variant = "full" | "icon" | "wordmark" | "stacked";
type Theme = "color" | "mono" | "white" | "dark" | "sketch" | "outline";

const VARIANTS: Variant[] = ["full", "icon", "wordmark", "stacked"];
const THEMES: Theme[] = ["color", "mono", "white", "dark", "sketch", "outline"];
const THEME_BG: Record<Theme, string> = { color: "#FAFAF8", mono: "#FAFAF8", white: "#1C2E5E", dark: "#FAFAF8", sketch: "#FAFAF8", outline: "#FAFAF8" };

const US_HOLIDAYS = ["new-year", "valentines", "july4", "halloween", "thanksgiving", "christmas"] as const;
const IN_HOLIDAYS = ["diwali", "holi", "republic-day", "india-independence", "navratri", "pongal"] as const;

const DONTS = [
  { label: "Don't stretch or distort", desc: "Always scale proportionally." },
  { label: "Don't use on busy backgrounds", desc: "Ensure minimum contrast ratio of 3:1." },
  { label: "Don't change the brand colours", desc: "Use only the 6 approved theme variants." },
  { label: "Don't add effects", desc: "No drop shadows, glows, or gradients on the logo." },
];

const EMAIL_SIGNATURES = [
  { style: "Minimal", html: `<table><tr><td><strong style="color:#1C2E5E;font-family:sans-serif">BOTS FIRED</strong></td></tr><tr><td style="color:#6B7280;font-size:12px;font-family:sans-serif">AI Education for Executives</td></tr></table>` },
  { style: "Full", html: `<table><tr><td><strong style="color:#1C2E5E;font-family:sans-serif;font-size:18px">BOTS FIRED</strong><br/><span style="color:#E8541A;font-size:12px;font-family:sans-serif">AI Education for Executives</span><br/><br/><span style="color:#6B7280;font-size:12px;font-family:sans-serif">[Your Name] · [Title]<br/>[email] · botsfired.com</span></td></tr></table>` },
  { style: "Dark", html: `<table style="background:#1C2E5E;padding:12px;border-radius:8px"><tr><td><strong style="color:#FFFFFF;font-family:sans-serif">BOTS FIRED</strong><br/><span style="color:#8FA5C8;font-size:12px;font-family:sans-serif">AI Education for Executives</span></td></tr></table>` },
  { style: "Orange accent", html: `<table style="border-left:4px solid #E8541A;padding-left:12px"><tr><td><strong style="color:#1C2E5E;font-family:sans-serif">BOTS FIRED</strong><br/><span style="color:#6B7280;font-size:12px;font-family:sans-serif">[Your Name] · [Title] · botsfired.com</span></td></tr></table>` },
];

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button onClick={() => { navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#EEF2F8] text-[#1C2E5E] hover:bg-[#D0DAE8] transition-colors">
      {copied ? <><Check size={12} />Copied!</> : <><Copy size={12} />Copy HTML</>}
    </button>
  );
}

export function LogoSection() {
  const [activeTheme, setActiveTheme] = useState<Theme>("color");
  const [activeVariant, setActiveVariant] = useState<Variant>("full");

  return (
    <section className="space-y-20">
      {/* Photo logos */}
      <AnimatedSection>
        <h3 style={{ fontFamily: "Barlow Condensed, sans-serif", color: "#1C2E5E", fontSize: "24px", fontWeight: 700 }} className="mb-2">Brand Assets</h3>
        <p className="text-sm text-[#6B7280] mb-6">Profile photos and avatar versions for social and digital use.</p>
        <div className="flex flex-wrap gap-8 items-end">
          <div className="text-center">
            <BFPhotoLogo width={120} className="mx-auto mb-2" />
            <p className="text-xs text-[#9BA3B0]">Circle (social)</p>
          </div>
          <div className="text-center">
            <BFPhotoLogo2 width={120} className="mx-auto mb-2" />
            <p className="text-xs text-[#9BA3B0]">Square (app icon)</p>
          </div>
          <div className="text-center">
            <BFPhotoLogo width={60} className="mx-auto mb-2" />
            <p className="text-xs text-[#9BA3B0]">60px</p>
          </div>
          <div className="text-center">
            <BFPhotoLogo width={40} className="mx-auto mb-2" />
            <p className="text-xs text-[#9BA3B0]">40px</p>
          </div>
        </div>
      </AnimatedSection>

      {/* SVG variants */}
      <AnimatedSection>
        <h3 style={{ fontFamily: "Barlow Condensed, sans-serif", color: "#1C2E5E", fontSize: "24px", fontWeight: 700 }} className="mb-2">SVG Logo Variants</h3>
        <div className="flex flex-wrap gap-2 mb-4">
          {VARIANTS.map((v) => (
            <button key={v} onClick={() => setActiveVariant(v)} className={`px-3 py-1.5 rounded-xl text-xs font-semibold capitalize transition-all ${activeVariant === v ? "bg-[#1C2E5E] text-white" : "bg-[#EEF2F8] text-[#1C2E5E] hover:bg-[#D0DAE8]"}`}>{v}</button>
          ))}
        </div>
        <div className="flex flex-wrap gap-2 mb-6">
          {THEMES.map((t) => (
            <button key={t} onClick={() => setActiveTheme(t)} className={`px-3 py-1.5 rounded-xl text-xs font-semibold capitalize transition-all ${activeTheme === t ? "bg-[#E8541A] text-white" : "bg-[#EEF2F8] text-[#1C2E5E] hover:bg-[#D0DAE8]"}`}>{t}</button>
          ))}
        </div>
        <motion.div key={activeTheme + activeVariant} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="rounded-2xl border border-[#E8E6E0] p-8 flex flex-wrap gap-8 items-center justify-center" style={{ backgroundColor: THEME_BG[activeTheme] }}>
          {[240, 160, 80, 40].map((w) => (
            <div key={w} className="text-center">
              <BFLogoSVG variant={activeVariant} theme={activeTheme} width={w} />
              <p className="text-xs mt-2" style={{ color: activeTheme === "white" ? "#8FA5C8" : "#9BA3B0" }}>{w}px</p>
            </div>
          ))}
        </motion.div>
      </AnimatedSection>

      {/* Clear space */}
      <AnimatedSection>
        <h3 style={{ fontFamily: "Barlow Condensed, sans-serif", color: "#1C2E5E", fontSize: "24px", fontWeight: 700 }} className="mb-2">Clear Space</h3>
        <p className="text-sm text-[#6B7280] mb-6">Maintain a minimum clear space equal to the height of the "B" in BOTS FIRED around all edges of the logo.</p>
        <div className="bg-white rounded-2xl border border-[#E8E6E0] p-8 flex items-center justify-center">
          <svg width="280" height="180" viewBox="0 0 280 180" fill="none">
            <rect x="10" y="10" width="260" height="160" rx="8" fill="#F9FAFB" stroke="#E8E6E0" strokeWidth="1" strokeDasharray="4 3" />
            <rect x="40" y="40" width="200" height="100" rx="4" fill="#EEF2F8" />
            <text x="140" y="96" textAnchor="middle" dominantBaseline="middle" fontFamily="Barlow Condensed, sans-serif" fontWeight="800" fontSize="28" fill="#1C2E5E">BOTS FIRED</text>
            <line x1="40" y1="15" x2="40" y2="35" stroke="#E8541A" strokeWidth="1" />
            <line x1="240" y1="15" x2="240" y2="35" stroke="#E8541A" strokeWidth="1" />
            <line x1="40" y1="25" x2="240" y2="25" stroke="#E8541A" strokeWidth="1" markerEnd="url(#arr)" />
            <text x="140" y="22" textAnchor="middle" fontSize="9" fill="#E8541A" fontFamily="sans-serif">min 1× icon width each side</text>
            <defs><marker id="arr" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto"><path d="M0 0 L6 3 L0 6 Z" fill="#E8541A" /></marker></defs>
          </svg>
        </div>
      </AnimatedSection>

      {/* Email signatures */}
      <AnimatedSection>
        <h3 style={{ fontFamily: "Barlow Condensed, sans-serif", color: "#1C2E5E", fontSize: "24px", fontWeight: 700 }} className="mb-6">Email Signatures</h3>
        <StaggerContainer className="grid sm:grid-cols-2 gap-4">
          {EMAIL_SIGNATURES.map((sig) => (
            <StaggerItem key={sig.style}>
              <div className="bg-white rounded-2xl border border-[#E8E6E0] p-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-[#9BA3B0]">{sig.style}</span>
                  <CopyButton text={sig.html} />
                </div>
                <div className="bg-[#FAFAF8] rounded-xl p-4 border border-[#E8E6E0]" dangerouslySetInnerHTML={{ __html: sig.html }} />
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </AnimatedSection>

      {/* Holiday logos */}
      <AnimatedSection>
        <h3 style={{ fontFamily: "Barlow Condensed, sans-serif", color: "#1C2E5E", fontSize: "24px", fontWeight: 700 }} className="mb-2">USA Holiday Logos</h3>
        <div className="flex flex-wrap gap-4 mb-12">
          {US_HOLIDAYS.map((h) => (
            <div key={h} className="text-center">
              <HolidayLogo holiday={h} width={160} />
              <p className="text-xs text-[#9BA3B0] mt-2 capitalize">{h.replace(/-/g, " ")}</p>
            </div>
          ))}
        </div>
        <h3 style={{ fontFamily: "Barlow Condensed, sans-serif", color: "#1C2E5E", fontSize: "24px", fontWeight: 700 }} className="mb-2">India Holiday Logos</h3>
        <div className="flex flex-wrap gap-4">
          {IN_HOLIDAYS.map((h) => (
            <div key={h} className="text-center">
              <HolidayLogo holiday={h} width={160} />
              <p className="text-xs text-[#9BA3B0] mt-2 capitalize">{h.replace(/-/g, " ")}</p>
            </div>
          ))}
        </div>
      </AnimatedSection>

      {/* Don'ts */}
      <AnimatedSection>
        <h3 style={{ fontFamily: "Barlow Condensed, sans-serif", color: "#1C2E5E", fontSize: "24px", fontWeight: 700 }} className="mb-6">Logo Don'ts</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          {DONTS.map((d) => (
            <div key={d.label} className="bg-red-50 border border-red-200 rounded-2xl p-5 flex gap-3">
              <div className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-white text-xs font-bold">✕</span>
              </div>
              <div>
                <p className="font-semibold text-red-700 text-sm">{d.label}</p>
                <p className="text-xs text-red-600 mt-0.5">{d.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </AnimatedSection>
    </section>
  );
}
