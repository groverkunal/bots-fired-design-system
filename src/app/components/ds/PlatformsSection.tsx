import React, { useState } from "react";
import { motion } from "motion/react";
import { BFLogoSVG, BFPhotoLogo, BFPhotoLogo2 } from "./BFLogoSVG";
import { HandwrittenNote } from "../shared/HandwrittenNote";
import { AnimatedSection } from "../shared/AnimatedSection";
import { Wifi, Battery, Signal, Bell, Home, Search, User, BookOpen, Mic } from "lucide-react";

// ── App Icons ─────────────────────────────────────────────────────────────────

const APP_ICON_STYLES = [
  { label: "Navy solid", bg: "#1C2E5E", theme: "white" as const },
  { label: "Fire gradient", bg: "linear-gradient(135deg, #E8541A 0%, #D97706 100%)", theme: "white" as const },
  { label: "Dark", bg: "#0D1829", theme: "white" as const },
  { label: "Light", bg: "#FAFAF8", theme: "color" as const },
  { label: "Amber", bg: "linear-gradient(135deg, #D97706 0%, #F5A030 100%)", theme: "white" as const },
  { label: "Outline", bg: "#FFFFFF", theme: "outline" as const },
];

const ICON_SIZES = [512, 256, 128, 64, 32, 16];

function AppIconGrid() {
  const [active, setActive] = useState(0);
  const style = APP_ICON_STYLES[active];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-3">
        {APP_ICON_STYLES.map((s, i) => (
          <button key={s.label} onClick={() => setActive(i)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${active === i ? "ring-2 ring-[#E8541A] ring-offset-2" : ""}`}
            style={{ background: s.bg, color: "#fff", textShadow: s.bg === "#FAFAF8" || s.bg === "#FFFFFF" ? "none" : "0 1px 2px rgba(0,0,0,0.4)", border: "1px solid #E8E6E0" }}>
            {s.label}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap gap-6 items-end">
        {ICON_SIZES.map((size) => {
          const displaySize = Math.min(size, 96);
          return (
            <div key={size} className="text-center">
              <motion.div key={active} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3 }}
                style={{ width: displaySize, height: displaySize, borderRadius: Math.round(displaySize * 0.2225), background: style.bg, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 16px rgba(0,0,0,0.15)" }}>
                <BFLogoSVG variant="icon" theme={style.theme} width={Math.round(displaySize * 0.6)} />
              </motion.div>
              <p className="text-[10px] text-[#9BA3B0] mt-1.5">{size}px</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── Social Profile Images ─────────────────────────────────────────────────────

const PLATFORMS = [
  { name: "LinkedIn", shape: "circle", size: 400, bg: "#1C2E5E" },
  { name: "Twitter/X", shape: "circle", size: 400, bg: "#0D1829" },
  { name: "Instagram", shape: "circle", size: 320, bg: "linear-gradient(135deg, #833AB4 0%, #E8541A 100%)" },
  { name: "Facebook", shape: "square", size: 180, bg: "#1C2E5E" },
  { name: "YouTube", shape: "square", size: 800, bg: "#E8541A" },
  { name: "Newsletter", shape: "square", size: 600, bg: "#FAFAF8" },
];

function SocialProfiles() {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
      {PLATFORMS.map((p) => {
        const displaySize = 72;
        const radius = p.shape === "circle" ? "50%" : Math.round(displaySize * 0.18);
        const isLight = p.bg === "#FAFAF8" || p.bg === "#FFFFFF";
        return (
          <div key={p.name} className="text-center">
            <div style={{ width: displaySize, height: displaySize, borderRadius: radius, background: p.bg, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto", boxShadow: "0 2px 8px rgba(0,0,0,0.1)", border: isLight ? "2px solid #E8E6E0" : "none" }}>
              <BFLogoSVG variant="icon" theme={isLight ? "color" : "white"} width={Math.round(displaySize * 0.55)} />
            </div>
            <p className="text-[10px] text-[#9BA3B0] mt-1.5">{p.name}</p>
            <p className="text-[9px] text-[#CBD0D8]">{p.size}px</p>
          </div>
        );
      })}
    </div>
  );
}

// ── Mobile App Screens ────────────────────────────────────────────────────────

const SCREENS = ["Home", "Newsletter", "Podcast", "Profile"] as const;
type Screen = typeof SCREENS[number];

function MobileStatusBar({ dark = false }) {
  return (
    <div className="flex items-center justify-between px-4 py-2 text-[10px]" style={{ color: dark ? "#8FA5C8" : "#9BA3B0" }}>
      <span style={{ fontFamily: "JetBrains Mono, monospace" }}>9:41</span>
      <div className="flex items-center gap-1">
        <Signal size={10} /><Wifi size={10} /><Battery size={10} />
      </div>
    </div>
  );
}

function PhoneFrame({ screen }: { screen: Screen }) {
  return (
    <div className="rounded-3xl overflow-hidden border-4 border-[#0D1829] shadow-2xl" style={{ width: 180, backgroundColor: screen === "Home" ? "#1C2E5E" : "#FAFAF8" }}>
      <MobileStatusBar dark={screen === "Home" || screen === "Podcast"} />

      {screen === "Home" && (
        <div className="px-3 pb-4">
          <BFLogoSVG variant="full" theme="white" width={120} className="mb-4" />
          <p style={{ fontFamily: "Barlow Condensed, sans-serif", color: "#EEF2F8", fontSize: "20px", fontWeight: 800, lineHeight: 1.2 }} className="mb-1">AI Clarity for<br />the Boardroom</p>
          <p style={{ fontFamily: "Caveat, cursive", color: "#F5A030", fontSize: "13px" }}>No jargon. Just signal.</p>
          <div className="mt-4 space-y-2">
            {["Newsletter", "Podcast", "Training"].map((item) => (
              <div key={item} className="bg-[#162244] rounded-xl px-3 py-2 flex items-center justify-between">
                <span style={{ color: "#EEF2F8", fontSize: "11px", fontWeight: 600 }}>{item}</span>
                <span className="text-[#4A66A0] text-xs">›</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {screen === "Newsletter" && (
        <div className="px-3 pb-4">
          <p style={{ fontFamily: "Barlow Condensed, sans-serif", color: "#1C2E5E", fontSize: "16px", fontWeight: 800 }} className="mb-3">The AI Brief</p>
          <div className="space-y-2">
            {["#052", "#051", "#050"].map((n, i) => (
              <div key={n} className="bg-white border border-[#E8E6E0] rounded-xl p-2.5">
                <p style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "9px", color: "#9BA3B0" }}>{n}</p>
                <div className="space-y-1 mt-1">
                  <div className="h-1.5 bg-[#EEF2F8] rounded" style={{ width: `${85 - i * 10}%` }} />
                  <div className="h-1.5 bg-[#EEF2F8] rounded" style={{ width: `${70 - i * 5}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {screen === "Podcast" && (
        <div className="px-3 pb-4" style={{ backgroundColor: "#0D1829" }}>
          <p style={{ fontFamily: "Barlow Condensed, sans-serif", color: "#EEF2F8", fontSize: "16px", fontWeight: 800 }} className="mb-3">The Boardroom AI</p>
          <div className="bg-[#1C2E5E] rounded-2xl p-3 text-center mb-3">
            <BFLogoSVG variant="icon" theme="white" width={40} className="mx-auto mb-2" />
            <p style={{ color: "#EEF2F8", fontSize: "10px", fontWeight: 600 }}>Ep. 48 — AI Governance</p>
            <div className="mt-2 flex gap-1 justify-center">
              {["‹‹", "▶", "»"].map((c) => (
                <button key={c} className="w-7 h-7 rounded-full bg-[#E8541A] text-white text-xs flex items-center justify-center">{c}</button>
              ))}
            </div>
          </div>
        </div>
      )}

      {screen === "Profile" && (
        <div className="px-3 pb-4">
          <div className="text-center mb-3">
            <BFPhotoLogo width={48} className="mx-auto mb-2" />
            <p style={{ fontFamily: "Barlow Condensed, sans-serif", color: "#1C2E5E", fontSize: "14px", fontWeight: 700 }}>Kunal Grover</p>
            <p style={{ color: "#9BA3B0", fontSize: "10px" }}>Member since 2024</p>
          </div>
          <div className="space-y-1.5">
            {["52 issues read", "8 episodes played", "1 training completed"].map((stat) => (
              <div key={stat} className="bg-white border border-[#E8E6E0] rounded-xl px-3 py-2">
                <p style={{ color: "#374151", fontSize: "10px" }}>{stat}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Bottom nav */}
      <div className="flex justify-around py-2 border-t" style={{ borderColor: screen === "Podcast" ? "#162244" : "#E8E6E0", backgroundColor: screen === "Podcast" ? "#0D1829" : "#FFFFFF" }}>
        {[Home, BookOpen, Mic, User].map((Icon, i) => {
          const active = (screen === "Home" && i === 0) || (screen === "Newsletter" && i === 1) || (screen === "Podcast" && i === 2) || (screen === "Profile" && i === 3);
          return (
            <div key={i} className="flex items-center justify-center w-8 h-8">
              <Icon size={16} style={{ color: active ? "#E8541A" : (screen === "Podcast" ? "#4A66A0" : "#9BA3B0") }} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── HUD / AR Display ──────────────────────────────────────────────────────────

function HUDDisplay({ mode }: { mode: "minimal" | "full" }) {
  return (
    <div className="bg-black/80 backdrop-blur rounded-2xl p-5 relative overflow-hidden border border-[#1C2E5E]/40" style={{ minHeight: 160 }}>
      {/* Scan lines effect */}
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(28,46,94,0.05) 3px, rgba(28,46,94,0.05) 4px)" }} />
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-3">
          <BFLogoSVG variant="full" theme="white" width={100} />
          <div className="text-right">
            <p style={{ fontFamily: "JetBrains Mono, monospace", color: "#E8541A", fontSize: "11px" }}>● LIVE</p>
            <p style={{ fontFamily: "JetBrains Mono, monospace", color: "#4A66A0", fontSize: "10px" }}>09:41 GMT</p>
          </div>
        </div>
        {mode === "full" && (
          <div className="grid grid-cols-3 gap-2 mt-3">
            {[{ l: "AI Index", v: "72.4", u: "↑1.2" }, { l: "Sentiment", v: "Bullish", u: "Exec" }, { l: "Issue", v: "#053", u: "Live" }].map(({ l, v, u }) => (
              <div key={l} className="bg-[#1C2E5E]/40 rounded-lg p-2 border border-[#1C2E5E]/60">
                <p style={{ fontFamily: "JetBrains Mono, monospace", color: "#4A66A0", fontSize: "8px" }}>{l}</p>
                <p style={{ fontFamily: "Barlow Condensed, sans-serif", color: "#EEF2F8", fontSize: "16px", fontWeight: 700, lineHeight: 1 }}>{v}</p>
                <p style={{ color: "#86EFAC", fontSize: "8px" }}>{u}</p>
              </div>
            ))}
          </div>
        )}
        {mode === "minimal" && (
          <p style={{ fontFamily: "Caveat, cursive", color: "#F5A030", fontSize: "16px" }}>AI Clarity HUD — Issue #053 live</p>
        )}
      </div>
    </div>
  );
}

// ── Main Export ───────────────────────────────────────────────────────────────

export function PlatformsSection() {
  const [activeScreen, setActiveScreen] = useState<Screen>("Home");

  return (
    <section className="space-y-20">
      <AnimatedSection>
        <h3 style={{ fontFamily: "Barlow Condensed, sans-serif", color: "#1C2E5E", fontSize: "24px", fontWeight: 700 }} className="mb-2">App Icons</h3>
        <p className="text-sm text-[#6B7280] mb-6">6 icon design variants across all required sizes from 16px to 512px.</p>
        <AppIconGrid />
      </AnimatedSection>

      <AnimatedSection>
        <h3 style={{ fontFamily: "Barlow Condensed, sans-serif", color: "#1C2E5E", fontSize: "24px", fontWeight: 700 }} className="mb-2">Social Profile Images</h3>
        <p className="text-sm text-[#6B7280] mb-6">Platform-specific profile images for all major social channels.</p>
        <SocialProfiles />
      </AnimatedSection>

      <AnimatedSection>
        <h3 style={{ fontFamily: "Barlow Condensed, sans-serif", color: "#1C2E5E", fontSize: "24px", fontWeight: 700 }} className="mb-2">Mobile App</h3>
        <p className="text-sm text-[#6B7280] mb-6">Four key screens of the BOTS FIRED mobile app.</p>
        <div className="flex flex-wrap gap-3 mb-6">
          {SCREENS.map((s) => (
            <button key={s} onClick={() => setActiveScreen(s)} className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${activeScreen === s ? "bg-[#1C2E5E] text-white" : "bg-[#EEF2F8] text-[#1C2E5E]"}`}>{s}</button>
          ))}
        </div>
        <motion.div key={activeScreen} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-center">
          <PhoneFrame screen={activeScreen} />
        </motion.div>
      </AnimatedSection>

      <AnimatedSection>
        <h3 style={{ fontFamily: "Barlow Condensed, sans-serif", color: "#1C2E5E", fontSize: "24px", fontWeight: 700 }} className="mb-2">HUD & AR Glasses Display</h3>
        <p className="text-sm text-[#6B7280] mb-6">How the BOTS FIRED brand looks in heads-up display contexts.</p>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <p className="text-xs font-semibold text-[#9BA3B0] mb-2">Minimal HUD</p>
            <HUDDisplay mode="minimal" />
          </div>
          <div>
            <p className="text-xs font-semibold text-[#9BA3B0] mb-2">Full Dashboard HUD</p>
            <HUDDisplay mode="full" />
          </div>
        </div>
      </AnimatedSection>
    </section>
  );
}
