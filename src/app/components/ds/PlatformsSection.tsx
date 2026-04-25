import React, { useState } from "react";
import { motion } from "motion/react";
import { BFLogoSVG } from "./BFLogoSVG";
import { HandwrittenNote } from "../shared/HandwrittenNote";
import { AnimatedSection, StaggerContainer, StaggerItem } from "../shared/AnimatedSection";
import { Wifi, Battery, Signal } from "lucide-react";

/* ── APP ICON GRID ── */
function AppIcons() {
  const sizes = [
    { px: 16, label: "16px · Favicon" },
    { px: 32, label: "32px · Browser Tab" },
    { px: 48, label: "48px · Taskbar" },
    { px: 60, label: "60px · iOS Spotlight" },
    { px: 76, label: "76px · iPad" },
    { px: 120, label: "120px · iPhone @2x" },
    { px: 152, label: "152px · iPad @2x" },
    { px: 180, label: "180px · iPhone @3x" },
    { px: 192, label: "192px · Android" },
    { px: 512, label: "512px · App Store" },
  ];

  return (
    <div className="space-y-6">
      {/* Icon design variants */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { name: "Primary", bg: "#1C2E5E", round: "rounded-2xl" },
          { name: "Fire Gradient", bg: "linear-gradient(135deg, #1C2E5E 0%, #E8541A 100%)", round: "rounded-2xl" },
          { name: "Warm Gold", bg: "linear-gradient(135deg, #D97706 0%, #E8541A 100%)", round: "rounded-2xl" },
          { name: "Light / Tonal", bg: "#EEF2F8", round: "rounded-2xl", lightText: true },
          { name: "iOS Circle", bg: "#1C2E5E", round: "rounded-full" },
          { name: "macOS Continuous", bg: "linear-gradient(135deg, #0D1829 0%, #1C2E5E 60%, #E8541A 100%)", round: "rounded-3xl" },
        ].map(({ name, bg, round, lightText }) => (
          <div key={name} className="flex flex-col items-center gap-2">
            <div
              className={`w-16 h-16 ${round} flex items-center justify-center shadow-lg`}
              style={{ background: bg }}
            >
              <span
                style={{
                  fontFamily: "Barlow Condensed, sans-serif",
                  fontWeight: 800,
                  fontStyle: "italic",
                  fontSize: "22px",
                  color: lightText ? "#1C2E5E" : "#FFFFFF",
                  lineHeight: 1,
                }}
              >
                BF
              </span>
            </div>
            <p className="text-[10px] text-center text-[#9BA3B0] font-medium">{name}</p>
          </div>
        ))}
      </div>

      {/* Size grid */}
      <div>
        <p className="text-xs font-semibold text-[#9BA3B0] uppercase tracking-widest mb-3">Required Sizes</p>
        <div className="flex items-end gap-4 flex-wrap">
          {sizes.slice(0, 7).map(({ px, label }) => (
            <div key={px} className="flex flex-col items-center gap-1.5">
              <div
                className="rounded-xl flex items-center justify-center bg-[#1C2E5E] shadow-md"
                style={{ width: Math.min(px, 96), height: Math.min(px, 96) }}
              >
                <span
                  style={{
                    fontFamily: "Barlow Condensed, sans-serif",
                    fontWeight: 800,
                    fontStyle: "italic",
                    color: "#E8541A",
                    fontSize: Math.max(Math.min(px, 96) * 0.38, 8),
                  }}
                >
                  {px <= 32 ? "BF" : "BF"}
                </span>
              </div>
              <p className="text-[9px] text-[#9BA3B0] text-center max-w-[64px]">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── MOBILE APP SCREENS ── */
function MobileAppScreens() {
  const [screen, setScreen] = useState<"home" | "newsletter" | "podcast" | "profile">("home");

  const screens: Record<string, React.ReactNode> = {
    home: (
      <div className="flex flex-col h-full bg-[#FAFAF8]">
        {/* Status bar */}
        <div className="flex items-center justify-between px-4 pt-2 pb-1 bg-white">
          <span className="text-[9px] font-bold text-[#0D1829]">9:41</span>
          <div className="flex gap-1 items-center">
            <Signal size={10} className="text-[#0D1829]" />
            <Wifi size={10} className="text-[#0D1829]" />
            <Battery size={10} className="text-[#0D1829]" />
          </div>
        </div>
        {/* Nav */}
        <div className="bg-white px-4 py-2 flex items-center justify-between border-b border-[#E8E6E0]">
          <BFLogoSVG variant="wordmark" theme="color" width={70} />
          <div className="w-5 h-5 rounded-full overflow-hidden bg-[#EEF2F8]">
            <div className="w-full h-full flex items-center justify-center text-[8px] font-bold text-[#1C2E5E]">AC</div>
          </div>
        </div>
        {/* Hero */}
        <div className="bg-[#1C2E5E] px-4 py-4">
          <p style={{ fontFamily: "Caveat, cursive", fontSize: "12px", color: "#F5A030" }}>This week's brief</p>
          <p style={{ fontFamily: "Barlow Condensed, sans-serif", fontSize: "16px", fontWeight: 700, color: "#EEF2F8", lineHeight: 1.2 }}>
            Why Your AI Pilot Failed
          </p>
          <p className="text-[9px] text-[#8FA5C8] mt-1">Issue #052 · 6 min read</p>
        </div>
        {/* Cards */}
        <div className="flex-1 px-3 py-3 space-y-2 overflow-hidden">
          {[
            { emoji: "📧", label: "Newsletter", sub: "#052 Available", color: "#EEF2F8" },
            { emoji: "🎙", label: "Podcast", sub: "Ep. 48 is Live", color: "#FFF8EC" },
            { emoji: "🎓", label: "Training", sub: "4 spots left", color: "#F0F4FF" },
          ].map(({ emoji, label, sub, color }) => (
            <div key={label} className="flex items-center gap-2.5 rounded-xl p-2.5" style={{ backgroundColor: color }}>
              <span className="text-base">{emoji}</span>
              <div>
                <p className="text-[10px] font-bold text-[#1C2E5E]">{label}</p>
                <p className="text-[9px] text-[#9BA3B0]">{sub}</p>
              </div>
            </div>
          ))}
        </div>
        {/* Bottom nav */}
        <div className="bg-white border-t border-[#E8E6E0] px-2 py-2 flex justify-around">
          {[["🏠", "Home"], ["📧", "Brief"], ["🎙", "Podcast"], ["🎓", "Train"]].map(([emoji, label]) => (
            <div key={label as string} className="flex flex-col items-center gap-0.5">
              <span className="text-sm">{emoji}</span>
              <p className="text-[8px] text-[#9BA3B0]">{label}</p>
            </div>
          ))}
        </div>
      </div>
    ),
    newsletter: (
      <div className="flex flex-col h-full bg-white">
        <div className="bg-[#1C2E5E] px-4 py-3">
          <p style={{ fontFamily: "Barlow Condensed, sans-serif", fontSize: "14px", fontWeight: 700, color: "#EEF2F8" }}>The Executive AI Brief</p>
          <p className="text-[9px] text-[#8FA5C8]">52 issues · Monday mornings</p>
        </div>
        <div className="flex-1 px-3 py-3 space-y-2.5 overflow-hidden">
          {[
            { n: "#052", title: "Why Your AI Pilot Failed", tag: "Strategy" },
            { n: "#051", title: "The Board's AI Duty", tag: "Governance" },
            { n: "#050", title: "ROI or Risk?", tag: "Finance" },
          ].map(({ n, title, tag }) => (
            <div key={n} className="border border-[#E8E6E0] rounded-xl p-2.5">
              <div className="flex items-center gap-1.5 mb-1">
                <span className="text-[8px] font-bold px-1.5 py-0.5 rounded-full bg-[#EEF2F8] text-[#1C2E5E]">{tag}</span>
                <span className="text-[8px] text-[#9BA3B0]">{n}</span>
              </div>
              <p className="text-[10px] font-bold text-[#0D1829]">{title}</p>
            </div>
          ))}
        </div>
        <div className="px-3 py-2 border-t border-[#E8E6E0] bg-white">
          <div className="flex items-center gap-2 bg-[#EEF2F8] rounded-xl px-3 py-2">
            <span className="text-[9px] text-[#9BA3B0]">your@email.com</span>
            <div className="ml-auto w-6 h-6 rounded-lg bg-[#1C2E5E] flex items-center justify-center">
              <span className="text-white text-[8px]">✓</span>
            </div>
          </div>
        </div>
      </div>
    ),
    podcast: (
      <div className="flex flex-col h-full bg-[#0D1829]">
        <div className="px-4 py-3 border-b border-[#162244]">
          <p style={{ fontFamily: "Barlow Condensed, sans-serif", fontSize: "14px", fontWeight: 700, color: "#EEF2F8" }}>The Boardroom AI</p>
        </div>
        <div className="flex-1 px-3 py-3 space-y-2 overflow-hidden">
          {[
            { ep: "48", title: "AI Governance: What Boards Get Wrong", dur: "41m" },
            { ep: "47", title: "Building an AI-Ready Culture", dur: "38m" },
          ].map(({ ep, title, dur }) => (
            <div key={ep} className="bg-[#162244] rounded-xl p-2.5 flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-[#E8541A]/20 flex items-center justify-center shrink-0">
                <span className="text-[#E8541A] text-sm">▶</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[9px] font-bold text-[#EEF2F8] leading-snug truncate">{title}</p>
                <p className="text-[8px] text-[#4A66A0]">Ep. {ep} · {dur}</p>
              </div>
            </div>
          ))}
        </div>
        {/* Mini player */}
        <div className="bg-[#162244] px-3 py-2 border-t border-[#1C2E5E]">
          <p className="text-[9px] font-bold text-[#EEF2F8] truncate">AI Governance: What Boards Get Wrong</p>
          <div className="flex items-center gap-2 mt-1">
            <div className="flex-1 h-0.5 bg-[#1C2E5E] rounded-full">
              <div className="h-full w-1/3 bg-[#E8541A] rounded-full" />
            </div>
            <span className="text-[8px] text-[#4A66A0]">41m</span>
          </div>
          <div className="flex justify-center gap-4 mt-1.5">
            {["⏮", "⏸", "⏭"].map((btn) => <button key={btn} className="text-[#8FA5C8] text-sm">{btn}</button>)}
          </div>
        </div>
      </div>
    ),
    profile: (
      <div className="flex flex-col h-full bg-[#FAFAF8]">
        <div className="bg-[#1C2E5E] px-4 py-5 flex flex-col items-center gap-2">
          <div className="w-14 h-14 rounded-full bg-[#E8541A] flex items-center justify-center border-2 border-[#F5A030]">
            <span className="text-white font-bold text-lg">AC</span>
          </div>
          <p style={{ fontFamily: "Barlow Condensed, sans-serif", fontSize: "14px", fontWeight: 700, color: "#EEF2F8" }}>Alex Chen</p>
          <p className="text-[9px] text-[#8FA5C8]">Chief AI Officer</p>
          <span className="text-[8px] px-2 py-0.5 rounded-full text-[#F5A030]" style={{ backgroundColor: "#162244" }}>AI CERTIFIED LEADER</span>
        </div>
        <div className="flex-1 px-3 py-3 space-y-2">
          {[
            { label: "Newsletter Streak", val: "52 issues", emoji: "🔥" },
            { label: "Podcasts Listened", val: "31 eps", emoji: "🎙" },
            { label: "Training Completed", val: "Half-Day", emoji: "🎓" },
          ].map(({ label, val, emoji }) => (
            <div key={label} className="flex items-center justify-between bg-white rounded-xl p-2.5 border border-[#E8E6E0]">
              <div className="flex items-center gap-2">
                <span className="text-sm">{emoji}</span>
                <p className="text-[9px] font-semibold text-[#374151]">{label}</p>
              </div>
              <span className="text-[9px] font-bold text-[#1C2E5E]">{val}</span>
            </div>
          ))}
        </div>
        <div className="px-3 py-2 border-t border-[#E8E6E0]">
          <BFLogoSVG variant="wordmark" theme="color" width={100} />
        </div>
      </div>
    ),
  };

  return (
    <div className="flex flex-col items-center gap-5">
      <div className="flex gap-2 flex-wrap justify-center">
        {(["home", "newsletter", "podcast", "profile"] as const).map((s) => (
          <button key={s} onClick={() => setScreen(s)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all capitalize ${screen === s ? "bg-[#1C2E5E] text-white" : "border border-[#E8E6E0] text-[#6B7280]"}`}>
            {s}
          </button>
        ))}
      </div>
      {/* Phone shell */}
      <div className="relative" style={{ width: "220px" }}>
        <div className="rounded-[38px] overflow-hidden border-4 border-[#222] bg-[#111] shadow-2xl" style={{ height: "440px" }}>
          {/* Dynamic Island */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-20 h-5 bg-black rounded-full z-10" />
          <div className="h-full">
            <motion.div key={screen} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.25 }} className="h-full">
              {screens[screen]}
            </motion.div>
          </div>
        </div>
        {/* Side buttons */}
        <div className="absolute left-0 top-20 w-1 h-6 bg-[#444] rounded-r" />
        <div className="absolute left-0 top-30 w-1 h-10 bg-[#444] rounded-r" />
        <div className="absolute right-0 top-24 w-1 h-14 bg-[#444] rounded-l" />
      </div>
      <p className="text-xs text-[#9BA3B0]">BOTS FIRED Mobile App · iOS/Android</p>
    </div>
  );
}

/* ── HUD / AR GLASSES DISPLAY ── */
function HUDDisplay() {
  const [mode, setMode] = useState<"hud" | "glasses">("hud");
  const [ticker, setTicker] = useState(0);

  const insights = [
    "🔥 New issue: Why AI Pilots Fail",
    "📊 AI adoption up 34% YoY in FTSE 100",
    "🎙 Ep.48: AI Governance — 41 min",
    "⚡ Training: 4 spots left in June cohort",
    "💡 Governance tip: Who owns AI output accountability?",
  ];

  React.useEffect(() => {
    const id = setInterval(() => setTicker((t) => (t + 1) % insights.length), 3000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        {(["hud", "glasses"] as const).map((m) => (
          <button key={m} onClick={() => setMode(m)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold capitalize transition-all ${mode === m ? "bg-[#1C2E5E] text-white" : "border border-[#E8E6E0] text-[#6B7280]"}`}>
            {m === "hud" ? "🚗 Auto HUD" : "🥽 AR Glasses"}
          </button>
        ))}
      </div>

      {mode === "hud" && (
        <div className="relative bg-[#050A12] rounded-3xl overflow-hidden" style={{ aspectRatio: "16/7" }}>
          {/* HUD background */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-full h-full opacity-20" style={{
              background: "radial-gradient(ellipse at center, #1C2E5E 0%, transparent 70%)",
            }} />
          </div>

          {/* Curved windshield overlay */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 600 200" preserveAspectRatio="none">
            <path d="M0 200 Q300 0 600 200Z" fill="#0A1828" opacity="0.3" />
          </svg>

          {/* Left panel: Logo + speed */}
          <div className="absolute left-8 top-1/2 -translate-y-1/2 flex flex-col gap-2">
            <div className="flex items-center gap-2 opacity-90">
              <div className="w-8 h-8 rounded-xl bg-[#E8541A]/80 flex items-center justify-center backdrop-blur">
                <span style={{ fontFamily: "Barlow Condensed, sans-serif", fontWeight: 800, fontStyle: "italic", fontSize: "11px", color: "#fff" }}>BF</span>
              </div>
              <div>
                <p style={{ fontFamily: "Barlow Condensed, sans-serif", fontSize: "10px", fontWeight: 700, color: "#EEF2F8", letterSpacing: 1 }}>BOTS FIRED</p>
                <p className="text-[7px] text-[#4A66A0] uppercase tracking-widest">AI BRIEF ACTIVE</p>
              </div>
            </div>
            <div>
              <p style={{ fontFamily: "Barlow Condensed, sans-serif", fontSize: "28px", fontWeight: 800, color: "#EEF2F8", lineHeight: 1 }}>72</p>
              <p className="text-[7px] text-[#4A66A0]">mph</p>
            </div>
          </div>

          {/* Center: Scrolling insight */}
          <div className="absolute top-3 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1">
            <div className="h-0.5 w-12 bg-[#E8541A]/60 rounded-full" />
            <motion.div
              key={ticker}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="text-center px-4"
            >
              <p style={{ fontFamily: "Barlow Condensed, sans-serif", fontSize: "11px", fontWeight: 700, color: "#EEF2F8" }}>AI BRIEF</p>
              <p className="text-[9px] text-[#8FA5C8] max-w-[200px]">{insights[ticker]}</p>
            </motion.div>
          </div>

          {/* Right panel: Time + nav */}
          <div className="absolute right-8 top-1/2 -translate-y-1/2 text-right">
            <p style={{ fontFamily: "Barlow Condensed, sans-serif", fontSize: "24px", fontWeight: 700, color: "#EEF2F8" }}>9:41</p>
            <p className="text-[7px] text-[#4A66A0] uppercase">Navigation On</p>
            <div className="mt-2 flex flex-col gap-0.5">
              <div className="flex items-center gap-1 justify-end">
                <div className="w-8 h-0.5 rounded-full bg-[#4A66A0]" />
                <p className="text-[7px] text-[#4A66A0]">0.3mi turn</p>
              </div>
            </div>
          </div>

          {/* Bottom HUD line */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-32 h-px bg-[#1C2E5E]/60 rounded-full" />

          {/* Ambient glow */}
          <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-[#050A12] to-transparent" />
        </div>
      )}

      {mode === "glasses" && (
        <div className="relative bg-[#000] rounded-3xl overflow-hidden" style={{ aspectRatio: "16/9" }}>
          {/* Real world blur simulation */}
          <div className="absolute inset-0 bg-[#0a1020] opacity-90" />
          <div className="absolute inset-0 flex items-center justify-center opacity-20">
            <div className="w-40 h-20 border-2 border-white/20 rounded-xl" />
          </div>

          {/* AR overlay elements */}
          {/* Top left: BOTS FIRED badge */}
          <div className="absolute top-4 left-5 flex items-center gap-2 bg-[#1C2E5E]/80 backdrop-blur rounded-xl px-3 py-2 border border-[#2A4080]/50">
            <div className="w-5 h-5 rounded-lg bg-[#E8541A] flex items-center justify-center">
              <span style={{ fontFamily: "Barlow Condensed, sans-serif", fontWeight: 800, fontStyle: "italic", fontSize: "8px", color: "#fff" }}>BF</span>
            </div>
            <div>
              <p style={{ fontFamily: "Barlow Condensed, sans-serif", fontSize: "9px", fontWeight: 700, color: "#EEF2F8" }}>BOTS FIRED</p>
              <p className="text-[7px] text-[#4A66A0]">AI ASSISTANT ACTIVE</p>
            </div>
          </div>

          {/* Right side: Floating card */}
          <div className="absolute right-4 top-1/2 -translate-y-1/2 w-36 bg-[#0D1829]/85 backdrop-blur rounded-2xl p-3 border border-[#1C2E5E]/50">
            <p className="text-[7px] text-[#4A66A0] uppercase tracking-widest mb-1">Today's Brief</p>
            <p style={{ fontFamily: "Barlow Condensed, sans-serif", fontSize: "10px", fontWeight: 700, color: "#EEF2F8", lineHeight: 1.3 }}>
              Why AI Pilots Fail
            </p>
            <div className="mt-2 flex items-center gap-1">
              <div className="flex-1 h-0.5 bg-[#162244] rounded-full">
                <div className="h-full w-2/5 bg-[#E8541A] rounded-full" />
              </div>
              <span className="text-[7px] text-[#4A66A0]">40%</span>
            </div>
            <p style={{ fontFamily: "Caveat, cursive", fontSize: "9px", color: "#F5A030", marginTop: "4px" }}>Tap to continue reading</p>
          </div>

          {/* Bottom center: scrolling ticker */}
          <div className="absolute bottom-3 left-0 right-0 flex justify-center">
            <div className="bg-[#0D1829]/80 backdrop-blur rounded-xl px-4 py-1.5 border border-[#1C2E5E]/30">
              <motion.p
                key={ticker}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-[8px] text-[#8FA5C8]"
              >
                {insights[ticker]}
              </motion.p>
            </div>
          </div>

          {/* Targeting reticle */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="w-6 h-6 relative opacity-40">
              <div className="absolute top-0 left-1/2 w-px h-2 bg-[#E8541A]" />
              <div className="absolute bottom-0 left-1/2 w-px h-2 bg-[#E8541A]" />
              <div className="absolute left-0 top-1/2 h-px w-2 bg-[#E8541A]" />
              <div className="absolute right-0 top-1/2 h-px w-2 bg-[#E8541A]" />
              <div className="absolute inset-1 rounded-full border border-[#E8541A]/50" />
            </div>
          </div>
        </div>
      )}

      <div className="bg-[#EEF2F8] rounded-2xl p-4 text-xs text-[#374151]">
        <p className="font-semibold text-[#1C2E5E] mb-1">Design Guidance for {mode === "hud" ? "Automotive HUD" : "AR/AI Glasses"}</p>
        {mode === "hud" ? (
          <ul className="space-y-1 text-[#6B7280]">
            <li>• Use white/light text only — never dark text on dark background</li>
            <li>• Minimum font size: 12pt for readability at 1m distance</li>
            <li>• Brand mark must be &lt;15% screen area — don't obstruct driving view</li>
            <li>• No animations while vehicle is in motion — use static indicators</li>
            <li>• 3-second content rotation maximum for AI brief ticker</li>
          </ul>
        ) : (
          <ul className="space-y-1 text-[#6B7280]">
            <li>• Use frosted glass / backdrop-blur for all brand panels</li>
            <li>• AR content must be anchored — no floating text mid-vision</li>
            <li>• Brand mark: icon-only (BF) — never full wordmark in glasses view</li>
            <li>• Voice-first interaction: tap or voice command to expand</li>
            <li>• Maximum 3 concurrent AR elements on screen at once</li>
          </ul>
        )}
      </div>
    </div>
  );
}

/* ── SOCIAL PROFILE IMAGES ── */
function ProfileImages() {
  const platforms = [
    { name: "LinkedIn", size: "400×400", shape: "rounded-lg" },
    { name: "Twitter/X", size: "400×400", shape: "rounded-full" },
    { name: "Instagram", size: "110×110", shape: "rounded-full" },
    { name: "YouTube", size: "800×800", shape: "rounded-full" },
    { name: "WhatsApp", size: "640×640", shape: "rounded-full" },
    { name: "Slack", size: "512×512", shape: "rounded-xl" },
  ];

  return (
    <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
      {platforms.map(({ name, size, shape }) => (
        <div key={name} className="flex flex-col items-center gap-2">
          <div className={`w-14 h-14 ${shape} bg-[#1C2E5E] flex items-center justify-center shadow-lg`}>
            <div className="flex flex-col items-center">
              <span style={{ fontFamily: "Barlow Condensed, sans-serif", fontWeight: 800, fontStyle: "italic", fontSize: "16px", color: "#E8541A", lineHeight: 1 }}>BF</span>
              <div className="w-4 h-0.5 bg-[#E8541A] rounded-full mt-0.5" />
            </div>
          </div>
          <div className="text-center">
            <p className="text-[9px] font-semibold text-[#374151]">{name}</p>
            <p className="text-[8px] text-[#9BA3B0]">{size}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export function PlatformsSection() {
  return (
    <div id="platforms" className="space-y-16">
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-[#9BA3B0] mb-1">Platform Specifications</p>
        <h3 style={{ fontFamily: "Barlow Condensed, sans-serif", color: "#1C2E5E", fontSize: "28px", fontWeight: 700 }}>
          Every Surface, Every Context
        </h3>
        <HandwrittenNote size="sm" rotate={-1} className="mt-1">from phone to windshield</HandwrittenNote>
      </div>

      <AnimatedSection>
        <p className="text-xs font-semibold uppercase tracking-widest text-[#9BA3B0] mb-5">App Icons · All Required Sizes</p>
        <AppIcons />
      </AnimatedSection>

      <AnimatedSection>
        <p className="text-xs font-semibold uppercase tracking-widest text-[#9BA3B0] mb-5">Social Profile Images</p>
        <ProfileImages />
      </AnimatedSection>

      <div className="grid lg:grid-cols-2 gap-12">
        <AnimatedSection>
          <p className="text-xs font-semibold uppercase tracking-widest text-[#9BA3B0] mb-5">Mobile App · Live Preview</p>
          <MobileAppScreens />
        </AnimatedSection>
        <AnimatedSection>
          <p className="text-xs font-semibold uppercase tracking-widest text-[#9BA3B0] mb-5">HUD &amp; AR Glasses Display</p>
          <HUDDisplay />
        </AnimatedSection>
      </div>

      {/* Mobile-specific guidance */}
      <AnimatedSection>
        <div className="bg-[#0D1829] rounded-3xl p-7">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#4A66A0] mb-3">Mobile App Specificities</p>
          <div className="grid sm:grid-cols-2 gap-6 text-sm text-[#8FA5C8]">
            {[
              { title: "Touch targets", rules: ["Min 44×44px for all tappable elements", "Bottom nav items: 60px height minimum", "Floating action button: 56px diameter"] },
              { title: "Typography scaling", rules: ["Body: min 16px (never less)", "Headlines: Dynamic Type compatible", "Captions: 12px min — accessible"] },
              { title: "Navigation", rules: ["Tab bar max 5 items", "Back button always accessible", "No more than 3 levels deep"] },
              { title: "Brand in app", rules: ["Logo: top-left in header, 32px height", "Fire orange for primary CTAs only", "Handwritten font: callouts only"] },
            ].map(({ title, rules }) => (
              <div key={title}>
                <p className="font-bold text-[#EEF2F8] mb-2">{title}</p>
                <ul className="space-y-1">
                  {rules.map((r) => (
                    <li key={r} className="flex items-start gap-2 text-xs">
                      <div className="w-1 h-1 rounded-full bg-[#E8541A] mt-1.5 shrink-0" />
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
}
