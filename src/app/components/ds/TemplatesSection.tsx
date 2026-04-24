import React, { useState } from "react";
import { motion } from "motion/react";
import { BFLogoSVG, BFPhotoLogo } from "./BFLogoSVG";
import { HandwrittenNote } from "../shared/HandwrittenNote";
import { AnimatedSection, StaggerContainer, StaggerItem } from "../shared/AnimatedSection";
import { Linkedin, Twitter, Instagram, Mail, MapPin, Phone, Globe, ArrowRight } from "lucide-react";

const TABS = ["Profiles", "Social Media", "Newsletter Headers", "Blog Headers", "Invitations", "Print & Notes"];

function ProfileCard({ style }: { style: string }) {
  const styles: Record<string, React.CSSProperties> = {
    Minimal: { backgroundColor: "#FAFAF8", border: "2px solid #E8E6E0" },
    Executive: { backgroundColor: "#1C2E5E", border: "none" },
    Creative: { backgroundColor: "#0D1829", border: "2px solid #E8541A" },
    Compact: { backgroundColor: "#FFFFFF", border: "2px solid #D0DAE8" },
  };
  const isDark = style === "Executive" || style === "Creative";

  return (
    <div className="rounded-2xl p-6" style={styles[style]}>
      <div className="flex items-start gap-4 mb-4">
        <BFPhotoLogo width={56} />
        <div>
          <p style={{ fontFamily: "Barlow Condensed, sans-serif", fontSize: "20px", fontWeight: 700, color: isDark ? "#EEF2F8" : "#1C2E5E", lineHeight: 1.2 }}>Kunal Grover</p>
          <p style={{ color: isDark ? "#8FA5C8" : "#6B7280", fontSize: "13px" }}>Founder & Lead Educator</p>
          <p style={{ fontFamily: "Caveat, cursive", fontSize: "14px", color: "#E8541A", display: "block" }}>BOTS FIRED</p>
        </div>
      </div>
      <div className="space-y-1.5">
        {[{ icon: Mail, text: "kunal@botsfired.com" }, { icon: Globe, text: "botsfired.com" }, { icon: MapPin, text: "London, UK" }].map(({ icon: Icon, text }) => (
          <div key={text} className="flex items-center gap-2">
            <Icon size={12} style={{ color: isDark ? "#4A66A0" : "#9BA3B0" }} />
            <span style={{ color: isDark ? "#8FA5C8" : "#6B7280", fontSize: "12px" }}>{text}</span>
          </div>
        ))}
      </div>
      {style === "Executive" && (
        <div className="mt-4 pt-4 border-t border-[#2A4080] flex gap-2">
          {[Linkedin, Twitter].map((Icon, i) => (
            <div key={i} className="w-7 h-7 rounded-lg bg-[#162244] flex items-center justify-center">
              <Icon size={13} className="text-[#8FA5C8]" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function SocialCard({ platform }: { platform: string }) {
  const configs: Record<string, { bg: string; accent: string; icon: typeof Linkedin; size: string }> = {
    LinkedIn: { bg: "#0A66C2", accent: "#FFFFFF", icon: Linkedin, size: "1080×1080" },
    Twitter: { bg: "#0D1829", accent: "#8FA5C8", icon: Twitter, size: "1200×675" },
    Instagram: { bg: "linear-gradient(135deg, #833AB4 0%, #E8541A 50%, #FCAF45 100%)", accent: "#FFFFFF", icon: Instagram, size: "1080×1080" },
  };
  const cfg = configs[platform];
  if (!cfg) return null;
  const Icon = cfg.icon;

  return (
    <div className="rounded-2xl overflow-hidden aspect-square relative flex flex-col items-center justify-center p-6" style={{ background: cfg.bg }}>
      <BFLogoSVG variant="stacked" theme="white" width={120} className="mb-4" />
      <p style={{ fontFamily: "Caveat, cursive", fontSize: "18px", color: cfg.accent, textAlign: "center" }}>AI Clarity for the Boardroom</p>
      <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
        <Icon size={14} style={{ color: cfg.accent }} />
      </div>
      <p className="absolute bottom-3 right-3 text-[10px]" style={{ color: cfg.accent + "80" }}>{cfg.size}</p>
    </div>
  );
}

function NewsletterHeader({ variant }: { variant: number }) {
  const headers = [
    <div key={0} className="bg-[#1C2E5E] rounded-2xl p-6 text-center">
      <BFLogoSVG variant="full" theme="white" width={180} className="mx-auto mb-3" />
      <p style={{ fontFamily: "Barlow Condensed, sans-serif", color: "#EEF2F8", fontSize: "18px", fontWeight: 700 }}>The Executive AI Brief</p>
      <p style={{ color: "#8FA5C8", fontSize: "12px" }}>Issue #052 · Apr 21, 2026</p>
    </div>,
    <div key={1} className="bg-[#FAFAF8] border-t-4 border-[#E8541A] rounded-2xl p-6 flex items-center justify-between">
      <BFLogoSVG variant="full" theme="color" width={140} />
      <div className="text-right">
        <p style={{ fontFamily: "Barlow Condensed, sans-serif", color: "#1C2E5E", fontSize: "16px", fontWeight: 700 }}>The Executive AI Brief</p>
        <p style={{ color: "#9BA3B0", fontSize: "11px" }}>Issue #052</p>
      </div>
    </div>,
    <div key={2} className="bg-[#0D1829] rounded-2xl p-6">
      <div className="flex items-center justify-between mb-3">
        <BFLogoSVG variant="icon" theme="white" width={36} />
        <p style={{ fontFamily: "Caveat, cursive", fontSize: "16px", color: "#F5A030" }}>Issue #052</p>
      </div>
      <p style={{ fontFamily: "Barlow Condensed, sans-serif", color: "#EEF2F8", fontSize: "22px", fontWeight: 800, lineHeight: 1.2 }}>Why Your AI Pilot Failed</p>
    </div>,
    <div key={3} className="bg-white border border-[#E8E6E0] rounded-2xl p-6 flex gap-4 items-center">
      <BFLogoSVG variant="icon" theme="color" width={48} />
      <div className="flex-1 border-l border-[#E8E6E0] pl-4">
        <p style={{ fontFamily: "Barlow Condensed, sans-serif", color: "#1C2E5E", fontSize: "14px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>BOTS FIRED · The Executive AI Brief</p>
        <p style={{ color: "#9BA3B0", fontSize: "11px" }}>Every Monday · Free · 2,400+ readers</p>
      </div>
    </div>,
  ];
  return headers[variant] || null;
}

function BlogHeader({ variant }: { variant: number }) {
  const colors = [
    { bg: "#EEF2F8", border: "#D0DAE8", text: "#1C2E5E" },
    { bg: "#1C2E5E", border: "#2A4080", text: "#EEF2F8" },
    { bg: "#FFF8EC", border: "#F5A030", text: "#92400E" },
    { bg: "#0D1829", border: "#162244", text: "#8FA5C8" },
  ];
  const c = colors[variant];
  return (
    <div className="rounded-2xl p-6" style={{ backgroundColor: c.bg, border: `2px solid ${c.border}` }}>
      <div className="flex items-center gap-3 mb-4">
        <BFLogoSVG variant="icon" theme={variant === 0 ? "color" : variant === 2 ? "color" : "white"} width={32} />
        <div style={{ height: 24, width: 1, backgroundColor: c.border }} />
        <p style={{ fontFamily: "Barlow Condensed, sans-serif", color: c.text, fontSize: "13px", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase" }}>BOTS FIRED Blog</p>
      </div>
      <p style={{ fontFamily: "Barlow Condensed, sans-serif", color: c.text, fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)", fontWeight: 800, lineHeight: 1.2 }}>Why Every Board Needs an AI Literacy Plan in 2026</p>
      <p style={{ color: c.text + "99", fontSize: "12px", marginTop: 6 }}>6 min read · Strategy · Apr 24, 2026</p>
    </div>
  );
}

function Invitation({ style }: { style: string }) {
  const configs: Record<string, { bg: string; text: string; accent: string }> = {
    Formal: { bg: "#1C2E5E", text: "#EEF2F8", accent: "#F5A030" },
    Casual: { bg: "#FAFAF8", text: "#1C2E5E", accent: "#E8541A" },
    Event: { bg: "#0D1829", text: "#EEF2F8", accent: "#E8541A" },
    Digital: { bg: "#EEF2F8", text: "#1C2E5E", accent: "#D97706" },
  };
  const c = configs[style];
  return (
    <div className="rounded-2xl p-6" style={{ backgroundColor: c.bg }}>
      <BFLogoSVG variant="full" theme={c.bg === "#FAFAF8" || c.bg === "#EEF2F8" ? "color" : "white"} width={140} className="mb-4" />
      <p style={{ fontFamily: "Barlow Condensed, sans-serif", color: c.text, fontSize: "18px", fontWeight: 700 }}>You're Invited</p>
      <p style={{ fontFamily: "Caveat, cursive", color: c.accent, fontSize: "15px" }}>Executive AI Briefing</p>
      <p style={{ color: c.text + "99", fontSize: "12px", marginTop: 8 }}>12 May 2026 · The Shard, London · 09:00–12:00</p>
    </div>
  );
}

export function TemplatesSection() {
  const [activeTab, setActiveTab] = useState(TABS[0]);

  return (
    <section className="space-y-8">
      <div className="flex flex-wrap gap-2">
        {TABS.map((t) => (
          <button key={t} onClick={() => setActiveTab(t)}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${activeTab === t ? "bg-[#1C2E5E] text-white" : "bg-white border border-[#E8E6E0] text-[#6B7280] hover:border-[#1C2E5E] hover:text-[#1C2E5E]"}`}>
            {t}
          </button>
        ))}
      </div>

      <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        {activeTab === "Profiles" && (
          <div className="grid sm:grid-cols-2 gap-4">
            {["Minimal", "Executive", "Creative", "Compact"].map((s) => (
              <div key={s}>
                <p className="text-xs font-semibold text-[#9BA3B0] mb-2">{s}</p>
                <ProfileCard style={s} />
              </div>
            ))}
          </div>
        )}

        {activeTab === "Social Media" && (
          <div className="grid sm:grid-cols-3 gap-6">
            {["LinkedIn", "Twitter", "Instagram"].map((p) => (
              <div key={p}>
                <p className="text-xs font-semibold text-[#9BA3B0] mb-2">{p}</p>
                <SocialCard platform={p} />
              </div>
            ))}
          </div>
        )}

        {activeTab === "Newsletter Headers" && (
          <div className="grid sm:grid-cols-2 gap-4">
            {[0, 1, 2, 3].map((i) => (
              <div key={i}>
                <p className="text-xs font-semibold text-[#9BA3B0] mb-2">Style {i + 1}</p>
                <NewsletterHeader variant={i} />
              </div>
            ))}
          </div>
        )}

        {activeTab === "Blog Headers" && (
          <div className="grid sm:grid-cols-2 gap-4">
            {[0, 1, 2, 3].map((i) => (
              <div key={i}>
                <p className="text-xs font-semibold text-[#9BA3B0] mb-2">Style {i + 1}</p>
                <BlogHeader variant={i} />
              </div>
            ))}
          </div>
        )}

        {activeTab === "Invitations" && (
          <div className="grid sm:grid-cols-2 gap-4">
            {["Formal", "Casual", "Event", "Digital"].map((s) => (
              <div key={s}>
                <p className="text-xs font-semibold text-[#9BA3B0] mb-2">{s}</p>
                <Invitation style={s} />
              </div>
            ))}
          </div>
        )}

        {activeTab === "Print & Notes" && (
          <div className="grid sm:grid-cols-2 gap-4">
            {/* Letterhead */}
            <div>
              <p className="text-xs font-semibold text-[#9BA3B0] mb-2">Letterhead</p>
              <div className="bg-white border border-[#E8E6E0] rounded-2xl p-6">
                <div className="flex items-center justify-between border-b border-[#E8E6E0] pb-4 mb-4">
                  <BFLogoSVG variant="full" theme="color" width={140} />
                  <div className="text-right text-xs text-[#9BA3B0]">
                    <p>botsfired.com</p><p>hello@botsfired.com</p>
                  </div>
                </div>
                <div className="space-y-2">
                  {[80, 60, 60, 40].map((w, i) => <div key={i} className="h-2 bg-[#EEF2F8] rounded" style={{ width: `${w}%` }} />)}
                </div>
              </div>
            </div>
            {/* Note card */}
            <div>
              <p className="text-xs font-semibold text-[#9BA3B0] mb-2">Note Card</p>
              <div className="bg-[#FFF8EC] border-2 border-[#F5A030] rounded-2xl p-6">
                <BFLogoSVG variant="icon" theme="color" width={32} className="mb-3" />
                <p style={{ fontFamily: "Caveat, cursive", fontSize: "20px", color: "#1C2E5E", lineHeight: 1.4 }}>Thank you for joining us — AI clarity starts here.</p>
                <div className="mt-4 pt-4 border-t border-[#F5A030]/30">
                  <BFLogoSVG variant="wordmark" theme="color" width={100} />
                </div>
              </div>
            </div>
            {/* Business card front */}
            <div>
              <p className="text-xs font-semibold text-[#9BA3B0] mb-2">Business Card (Front)</p>
              <div className="bg-[#1C2E5E] rounded-2xl p-6 aspect-[1.75/1] flex flex-col justify-between">
                <BFLogoSVG variant="full" theme="white" width={120} />
                <div>
                  <p style={{ fontFamily: "Barlow Condensed, sans-serif", color: "#EEF2F8", fontSize: "18px", fontWeight: 700 }}>Kunal Grover</p>
                  <p style={{ color: "#8FA5C8", fontSize: "12px" }}>Founder & Lead Educator</p>
                </div>
              </div>
            </div>
            {/* Business card back */}
            <div>
              <p className="text-xs font-semibold text-[#9BA3B0] mb-2">Business Card (Back)</p>
              <div className="bg-[#E8541A] rounded-2xl p-6 aspect-[1.75/1] flex flex-col justify-between">
                <p style={{ fontFamily: "Caveat, cursive", fontSize: "20px", color: "#FFFFFF", lineHeight: 1.3 }}>AI Clarity for the Boardroom</p>
                <div className="text-xs text-white/70 space-y-0.5">
                  <p>botsfired.com</p><p>hello@botsfired.com</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </section>
  );
}
