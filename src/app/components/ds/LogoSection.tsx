import React, { useState } from "react";
import { motion } from "motion/react";
import { Download, Copy, Check } from "lucide-react";
import { BFLogoSVG, BFPhotoLogo, BFPhotoLogo2, HolidayLogo } from "./BFLogoSVG";
import { HandwrittenNote } from "../shared/HandwrittenNote";
import { AnimatedSection, StaggerContainer, StaggerItem } from "../shared/AnimatedSection";

function SectionTitle({ label, title, note }: { label: string; title: string; note?: string }) {
  return (
    <div className="mb-8">
      <p className="text-xs font-semibold uppercase tracking-widest text-[#9BA3B0] mb-1">{label}</p>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <h3 style={{ fontFamily: "Barlow Condensed, sans-serif", color: "#1C2E5E", fontSize: "28px", fontWeight: 700 }}>{title}</h3>
        {note && <HandwrittenNote size="sm" rotate={-1}>{note}</HandwrittenNote>}
      </div>
    </div>
  );
}

function LogoCard({ title, bg, children, dark = false, note }: {
  title: string; bg: string; children: React.ReactNode; dark?: boolean; note?: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <div
        className="rounded-2xl flex items-center justify-center p-8 min-h-[120px] border"
        style={{ backgroundColor: bg, borderColor: dark ? "#2A4080" : "#E8E6E0" }}
      >
        {children}
      </div>
      <p className="text-xs font-semibold text-center" style={{ color: dark ? "#1C2E5E" : "#6B7280" }}>{title}</p>
      {note && <p className="text-[10px] text-center text-[#9BA3B0]">{note}</p>}
    </div>
  );
}

/* ── Clear Space Guide ── */
function ClearSpaceGuide() {
  return (
    <div className="bg-[#FAFAF8] rounded-2xl border-2 border-dashed border-[#D0DAE8] p-8 flex items-center justify-center">
      <svg width="360" viewBox="0 0 360 140" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Clear space zone */}
        <rect x="20" y="10" width="320" height="120" rx="4" fill="#EEF2F8" stroke="#8FA5C8" strokeWidth="1" strokeDasharray="6 3" />
        {/* Logo area */}
        <rect x="60" y="30" width="240" height="80" rx="4" fill="white" stroke="#D0DAE8" strokeWidth="1" />
        {/* X marks for spacing */}
        {/* Top spacing annotation */}
        <line x1="180" y1="10" x2="180" y2="30" stroke="#E8541A" strokeWidth="1.5" />
        <text x="185" y="22" fontFamily="Inter,sans-serif" fontSize="10" fill="#E8541A">1× logo-height clear</text>
        {/* Bottom */}
        <line x1="180" y1="110" x2="180" y2="130" stroke="#E8541A" strokeWidth="1.5" />
        {/* Left */}
        <line x1="20" y1="70" x2="60" y2="70" stroke="#E8541A" strokeWidth="1.5" />
        {/* Right */}
        <line x1="300" y1="70" x2="340" y2="70" stroke="#E8541A" strokeWidth="1.5" />
        {/* Logo placeholder */}
        <text x="180" y="72" textAnchor="middle" dominantBaseline="middle" fontFamily="Barlow Condensed, sans-serif" fontWeight="800" fontStyle="italic" fontSize="26" fill="#1C2E5E">BOTS</text>
        <text x="180" y="95" textAnchor="middle" dominantBaseline="middle" fontFamily="Barlow Condensed, sans-serif" fontWeight="800" fontStyle="italic" fontSize="14" fill="#E8541A">⚡ FIRED · AI FOR LEADERS</text>
        {/* Corner measurement lines */}
        <rect x="60" y="30" width="20" height="20" fill="none" stroke="#8FA5C8" strokeWidth="0.7" />
        <rect x="280" y="30" width="20" height="20" fill="none" stroke="#8FA5C8" strokeWidth="0.7" />
        <rect x="60" y="90" width="20" height="20" fill="none" stroke="#8FA5C8" strokeWidth="0.7" />
        <rect x="280" y="90" width="20" height="20" fill="none" stroke="#8FA5C8" strokeWidth="0.7" />
        {/* Annotation text */}
        <text x="20" y="140" fontFamily="Caveat, cursive" fontSize="13" fill="#D97706">min clear space = ½ × flame height on all sides</text>
      </svg>
    </div>
  );
}

/* ── Minimum Size Guide ── */
function MinSizeGuide() {
  const sizes = [
    { label: "Favicon", w: 16, text: "16px" },
    { label: "Mobile Icon", w: 32, text: "32px" },
    { label: "App Bar", w: 64, text: "64px" },
    { label: "Email Sig.", w: 96, text: "96px" },
    { label: "Min Print", w: 128, text: "25mm" },
  ];
  return (
    <div className="bg-white rounded-2xl border border-[#E8E6E0] p-6">
      <p className="text-xs font-semibold uppercase tracking-widest text-[#9BA3B0] mb-4">Minimum Sizes</p>
      <div className="flex items-end gap-6 flex-wrap">
        {sizes.map(({ label, w, text }) => (
          <div key={label} className="flex flex-col items-center gap-2">
            <div
              className="rounded bg-[#1C2E5E] flex items-center justify-center"
              style={{ width: Math.max(w, 16), height: Math.max(w, 16) }}
            >
              <span style={{ fontFamily: "Barlow Condensed, sans-serif", fontWeight: 800, fontStyle: "italic", color: "#E8541A", fontSize: Math.max(w * 0.35, 6) }}>BF</span>
            </div>
            <div className="text-center">
              <p className="text-[10px] font-semibold text-[#374151]">{text}</p>
              <p className="text-[9px] text-[#9BA3B0]">{label}</p>
            </div>
          </div>
        ))}
      </div>
      <p className="mt-4 text-xs text-[#9BA3B0]">
        <span style={{ fontFamily: "Caveat, cursive", fontSize: "15px", color: "#D97706" }}>Rule: </span>
        Never display the full wordmark below 120px wide. Use icon-only below 48px.
      </p>
    </div>
  );
}

/* ── Signature / Footnote Templates ── */
function SignatureTemplates() {
  const sigs = [
    {
      label: "Email Signature — Full",
      content: (
        <div className="font-sans text-sm bg-white p-5 rounded-xl border border-[#E8E6E0]" style={{ fontFamily: "Inter, sans-serif" }}>
          <div className="flex gap-4 items-start">
            <div className="w-12 h-12 rounded-xl bg-[#1C2E5E] flex items-center justify-center shrink-0">
              <span style={{ fontFamily: "Barlow Condensed, sans-serif", fontWeight: 800, fontStyle: "italic", color: "#E8541A", fontSize: "16px" }}>BF</span>
            </div>
            <div className="border-l-2 border-[#E8541A] pl-4">
              <p className="font-bold text-[#1C2E5E]">Your Name</p>
              <p className="text-[#6B7280] text-xs">Founder & AI Educator, BOTS FIRED</p>
              <div className="mt-1 flex flex-col gap-0.5 text-xs text-[#9BA3B0]">
                <span>📧 name@botsfired.com</span>
                <span>🔗 linkedin.com/in/yourname</span>
              </div>
              <div className="mt-2 pt-2 border-t border-[#F4F3EF] flex items-center gap-2">
                <BFLogoSVG variant="wordmark" theme="color" width={120} />
                <span className="text-[10px] text-[#9BA3B0]">AI Clarity for Leaders</span>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      label: "Email Signature — Compact",
      content: (
        <div className="bg-white p-4 rounded-xl border border-[#E8E6E0]" style={{ fontFamily: "Inter, sans-serif" }}>
          <div className="flex items-center gap-3">
            <BFLogoSVG variant="icon" theme="color" width={80} />
            <div className="border-l border-[#E8E6E0] pl-3 text-xs">
              <p className="font-bold text-[#1C2E5E]">Your Name · BOTS FIRED</p>
              <p className="text-[#9BA3B0]">name@botsfired.com · AI for C-Suite</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      label: "Footnote — With Logo",
      content: (
        <div className="bg-white p-4 rounded-xl border border-[#E8E6E0]">
          <div className="border-t border-[#E8E6E0] pt-3 flex items-center justify-between">
            <p className="text-[10px] text-[#9BA3B0]">© 2026 BOTS FIRED. All rights reserved. For C-Suite Executives only.</p>
            <BFLogoSVG variant="icon" theme="color" width={60} />
          </div>
        </div>
      ),
    },
    {
      label: "Footnote — Minimal, No Logo",
      content: (
        <div className="bg-white p-4 rounded-xl border border-[#E8E6E0]">
          <div className="border-t border-[#E8E6E0] pt-3 flex items-center justify-between">
            <p className="text-[10px] text-[#9BA3B0]">© 2026 BOTS FIRED · botsfired.com · Unsubscribe</p>
            <p style={{ fontFamily: "Caveat, cursive", fontSize: "13px", color: "#D97706" }}>AI for Leaders.</p>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {sigs.map(({ label, content }) => (
        <div key={label} className="space-y-2">
          <p className="text-xs font-semibold text-[#6B7280] uppercase tracking-wide">{label}</p>
          {content}
        </div>
      ))}
    </div>
  );
}

export function LogoSection() {
  const [copied, setCopied] = useState(false);

  const copyHex = (hex: string) => {
    navigator.clipboard.writeText(hex).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const usaHolidays = ["new-year", "valentines", "july4", "halloween", "thanksgiving", "christmas"];
  const indiaHolidays = ["diwali", "holi", "republic-day", "india-independence", "navratri", "pongal"];

  return (
    <div id="logos" className="space-y-16">
      {/* ── Brand Assets (imported) ── */}
      <AnimatedSection>
        <SectionTitle label="Brand Assets" title="Logo System" note="The official marks" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <LogoCard title="Primary Logo" bg="#FFFFFF"><BFPhotoLogo height={50} /></LogoCard>
          <LogoCard title="Alt Mark" bg="#FFFFFF"><BFPhotoLogo2 height={50} /></LogoCard>
          <LogoCard title="On Dark Background" bg="#0D1829" dark><BFPhotoLogo height={50} white /></LogoCard>
          <LogoCard title="On Navy Background" bg="#1C2E5E" dark><BFPhotoLogo height={50} white /></LogoCard>
        </div>
      </AnimatedSection>

      {/* ── SVG Logo Variants ── */}
      <AnimatedSection>
        <SectionTitle label="Logo Variants" title="All Configurations" note="Use the right one for context" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <LogoCard title="Full Logo — Color" bg="#FAFAF8"><BFLogoSVG variant="full" theme="color" width={260} /></LogoCard>
          <LogoCard title="Full Logo — Dark Background" bg="#0D1829" dark><BFLogoSVG variant="full" theme="white" width={260} /></LogoCard>
          <LogoCard title="Stacked — Color" bg="#FAFAF8"><BFLogoSVG variant="stacked" theme="color" width={200} /></LogoCard>
          <LogoCard title="Stacked — Dark" bg="#1C2E5E" dark><BFLogoSVG variant="stacked" theme="white" width={200} /></LogoCard>
          <LogoCard title="Wordmark Only" bg="#FFFFFF"><BFLogoSVG variant="wordmark" theme="color" width={240} /></LogoCard>
          <LogoCard title="Wordmark — Mono" bg="#FAFAF8"><BFLogoSVG variant="wordmark" theme="mono" width={240} /></LogoCard>
          <LogoCard title="Icon Mark — Color" bg="#FFFFFF"><BFLogoSVG variant="icon" theme="color" width={200} /></LogoCard>
          <LogoCard title="Icon Mark — Outline" bg="#FAFAF8"><BFLogoSVG variant="icon" theme="outline" width={200} /></LogoCard>
        </div>
      </AnimatedSection>

      {/* ── Sketch & Art Styles ── */}
      <AnimatedSection>
        <SectionTitle label="Art Styles" title="Sketch & Line Variations" note="For editorial & creative use" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <LogoCard title="Pencil Sketch" bg="#FFFEF5" note="Rough / hand-drawn"><BFLogoSVG variant="full" theme="sketch" width={200} /></LogoCard>
          <LogoCard title="Line Art / Outline" bg="#FAFAF8" note="Emboss / watermark use"><BFLogoSVG variant="icon" theme="outline" width={180} /></LogoCard>
          <LogoCard title="Grayscale" bg="#FFFFFF" note="B&W print"><BFLogoSVG variant="full" theme="mono" width={200} /></LogoCard>
          <LogoCard title="White / Knockout" bg="#374151" dark note="For photography overlays"><BFLogoSVG variant="full" theme="white" width={200} /></LogoCard>
        </div>
        <div className="mt-3 px-4 py-3 rounded-xl bg-[#FFF8EC] border border-[#F5A030]/30">
          <p className="text-xs text-[#92400E]">
            <span style={{ fontFamily: "Caveat, cursive", fontSize: "15px" }}>Guidance: </span>
            Use sketch only for editorial / article imagery. Never use sketch for digital UI. Outline/line-art approved for watermarks and embossed stationery only.
          </p>
        </div>
      </AnimatedSection>

      {/* ── Clear Space & Minimum Size ── */}
      <AnimatedSection>
        <SectionTitle label="Usage Rules" title="Clear Space & Minimum Size" />
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#9BA3B0] mb-3">Clear Space Guide</p>
            <ClearSpaceGuide />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#9BA3B0] mb-3">Minimum Sizes</p>
            <MinSizeGuide />
          </div>
        </div>
      </AnimatedSection>

      {/* ── Signature & Footnote ── */}
      <AnimatedSection>
        <SectionTitle label="Application" title="Email Signatures & Footnotes" note="Always consistent" />
        <SignatureTemplates />
      </AnimatedSection>

      {/* ── USA Holiday Logos ── */}
      <AnimatedSection>
        <SectionTitle label="Holiday Editions — USA" title="American Holiday Logos" note="Swap in for seasonal content" />
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {usaHolidays.map((h) => (
            <HolidayLogo key={h} holiday={h} width={280} />
          ))}
        </div>
      </AnimatedSection>

      {/* ── India Holiday Logos ── */}
      <AnimatedSection>
        <SectionTitle label="Holiday Editions — India" title="Indian Festival Logos" note="Culturally calibrated" />
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {indiaHolidays.map((h) => (
            <HolidayLogo key={h} holiday={h} width={280} />
          ))}
        </div>
        <div className="mt-4 p-4 rounded-xl bg-[#EEF2F8] border border-[#D0DAE8] text-xs text-[#374151]">
          <span style={{ fontFamily: "Caveat, cursive", fontSize: "15px", color: "#D97706" }}>Note: </span>
          Holiday editions should be used for social media, newsletter headers, and email banners only. Never replace the primary brand mark in UI or print with a holiday variant.
        </div>
      </AnimatedSection>

      {/* ── Don'ts ── */}
      <AnimatedSection>
        <SectionTitle label="Don'ts" title="What Never to Do" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Don't stretch", style: { transform: "scaleX(1.5)", transformOrigin: "center" } },
            { label: "Don't rotate", style: { transform: "rotate(25deg)" } },
            { label: "Don't add effects", style: { filter: "blur(1px) contrast(2) saturate(3)" } },
            { label: "Don't use low contrast", bg: "#D0D0D0" },
          ].map(({ label, style, bg }, i) => (
            <div key={i} className="space-y-2">
              <div className="rounded-2xl border-2 border-red-200 bg-red-50 flex items-center justify-center p-6 min-h-[100px] relative overflow-hidden">
                <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-red-500 flex items-center justify-center">
                  <span className="text-white text-xs">✕</span>
                </div>
                <div style={style}>
                  <BFLogoSVG variant="icon" theme={bg ? "mono" : "color"} width={80} />
                </div>
              </div>
              <p className="text-xs text-center text-red-600 font-semibold">{label}</p>
            </div>
          ))}
        </div>
      </AnimatedSection>
    </div>
  );
}
