import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { BFLogoSVG, BFPhotoLogo } from "./BFLogoSVG";
import { HandwrittenNote } from "../shared/HandwrittenNote";
import { AnimatedSection } from "../shared/AnimatedSection";
import { X, Bell, Flame, ChevronLeft, ChevronRight, Check } from "lucide-react";

// ── Countdown Timer ──────────────────────────────────────────────────────────

function useCountdown(target: Date) {
  const [diff, setDiff] = useState(target.getTime() - Date.now());
  useEffect(() => {
    const id = setInterval(() => setDiff(target.getTime() - Date.now()), 1000);
    return () => clearInterval(id);
  }, [target]);
  const total = Math.max(0, diff);
  return {
    days: Math.floor(total / 86400000),
    hours: Math.floor((total % 86400000) / 3600000),
    minutes: Math.floor((total % 3600000) / 60000),
    seconds: Math.floor((total % 60000) / 1000),
  };
}

const TARGET = new Date(Date.now() + 7 * 86400000 + 3 * 3600000 + 42 * 60000);

function CountdownNewsletter() {
  const t = useCountdown(TARGET);
  return (
    <div className="bg-[#1C2E5E] rounded-2xl p-6 text-center">
      <p className="text-xs font-semibold uppercase tracking-widest text-[#4A66A0] mb-1">Next Issue In</p>
      <div className="flex justify-center gap-3 mt-3">
        {[{ v: t.days, l: "Days" }, { v: t.hours, l: "Hrs" }, { v: t.minutes, l: "Min" }, { v: t.seconds, l: "Sec" }].map(({ v, l }) => (
          <div key={l} className="bg-[#162244] rounded-xl px-4 py-3 min-w-[56px]">
            <p style={{ fontFamily: "Barlow Condensed, sans-serif", fontSize: "32px", fontWeight: 800, color: "#EEF2F8", lineHeight: 1 }}>{String(v).padStart(2, "0")}</p>
            <p className="text-[10px] text-[#4A66A0] mt-0.5">{l}</p>
          </div>
        ))}
      </div>
      <p style={{ fontFamily: "Caveat, cursive", fontSize: "15px", color: "#F5A030", marginTop: 12 }}>Issue #053 drops Monday</p>
    </div>
  );
}

function CountdownTraining() {
  const t = useCountdown(TARGET);
  return (
    <div className="bg-white border-2 border-[#E8541A] rounded-2xl p-5">
      <div className="flex items-center gap-3 mb-4">
        <Flame size={18} className="text-[#E8541A]" />
        <p className="font-bold text-[#1C2E5E] text-sm">Half-Day Intensive — 12 May 2026</p>
      </div>
      <div className="flex gap-2">
        {[{ v: t.days, l: "Days" }, { v: t.hours, l: "Hours" }, { v: t.minutes, l: "Minutes" }].map(({ v, l }) => (
          <div key={l} className="flex-1 bg-[#EEF2F8] rounded-xl p-2 text-center">
            <p style={{ fontFamily: "Barlow Condensed, sans-serif", fontSize: "28px", fontWeight: 800, color: "#E8541A", lineHeight: 1 }}>{v}</p>
            <p className="text-[10px] text-[#9BA3B0]">{l}</p>
          </div>
        ))}
      </div>
      <p className="text-xs text-[#9BA3B0] mt-3 text-center">4 seats remaining</p>
    </div>
  );
}

function CountdownMinimal() {
  const t = useCountdown(TARGET);
  return (
    <div className="bg-[#FAFAF8] border border-[#E8E6E0] rounded-2xl p-4 flex items-center gap-4">
      <div style={{ fontFamily: "Barlow Condensed, sans-serif", fontSize: "40px", fontWeight: 800, color: "#1C2E5E", lineHeight: 1, fontVariantNumeric: "tabular-nums" }}>
        {t.days}:{String(t.hours).padStart(2, "0")}:{String(t.minutes).padStart(2, "0")}
      </div>
      <div>
        <p className="text-sm font-semibold text-[#374151]">Next issue</p>
        <p style={{ fontFamily: "Caveat, cursive", fontSize: "13px", color: "#D97706" }}>Subscribe to get it</p>
      </div>
    </div>
  );
}

// ── Logo Fill Progress ────────────────────────────────────────────────────────

function LogoFillProgress({ pct = 72 }: { pct?: number }) {
  const [progress, setProgress] = useState(0);
  useEffect(() => { const id = setTimeout(() => setProgress(pct), 300); return () => clearTimeout(id); }, [pct]);

  return (
    <div className="bg-white border border-[#E8E6E0] rounded-2xl p-6 text-center">
      <p className="text-xs font-semibold uppercase tracking-widest text-[#9BA3B0] mb-4">AI Fluency Score</p>
      <div className="relative inline-block mb-4">
        <svg width="120" height="120" viewBox="0 0 120 120">
          <circle cx="60" cy="60" r="52" fill="none" stroke="#EEF2F8" strokeWidth="12" />
          <motion.circle cx="60" cy="60" r="52" fill="none" stroke="#E8541A" strokeWidth="12" strokeLinecap="round"
            strokeDasharray={`${2 * Math.PI * 52}`} strokeDashoffset={2 * Math.PI * 52 * (1 - progress / 100)}
            transform="rotate(-90 60 60)" initial={{ strokeDashoffset: 2 * Math.PI * 52 }} animate={{ strokeDashoffset: 2 * Math.PI * 52 * (1 - progress / 100) }} transition={{ duration: 1.2, ease: "easeOut" }} />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <BFLogoSVG variant="icon" theme="color" width={36} />
          <motion.p style={{ fontFamily: "Barlow Condensed, sans-serif", fontSize: "22px", fontWeight: 800, color: "#1C2E5E", lineHeight: 1 }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
            {Math.round(progress)}%
          </motion.p>
        </div>
      </div>
      <p className="text-sm text-[#6B7280]">You're in the <strong className="text-[#1C2E5E]">Strategy</strong> stage</p>
    </div>
  );
}

// ── Flash Cards ───────────────────────────────────────────────────────────────

const CARDS = [
  { term: "LLM", front: "Large Language Model", back: "A type of AI trained on vast text datasets to understand and generate human language. GPT-4, Claude, and Gemini are all LLMs." },
  { term: "RAG", front: "Retrieval-Augmented Generation", back: "A technique that enhances LLM responses by searching a database of documents first, reducing hallucinations in enterprise contexts." },
  { term: "Hallucination", front: "AI Hallucination", back: "When an AI confidently generates false information. A key risk for business use — always verify AI outputs against authoritative sources." },
  { term: "Fine-tuning", front: "Fine-tuning", back: "Training a pre-built AI model on your own data to specialise it for your domain, industry, or use case." },
  { term: "Agentic AI", front: "Agentic AI", back: "AI systems that can autonomously plan and execute multi-step tasks — booking meetings, writing reports, running code — without human input at each step." },
  { term: "Prompt", front: "Prompt Engineering", back: "The practice of carefully crafting instructions to AI models to get more accurate, useful outputs. A key skill for knowledge workers." },
];

function FlashCards() {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const prev = () => { setFlipped(false); setIndex((i) => (i - 1 + CARDS.length) % CARDS.length); };
  const next = () => { setFlipped(false); setIndex((i) => (i + 1) % CARDS.length); };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-widest text-[#9BA3B0]">AI Literacy Flash Cards</p>
        <p className="text-xs text-[#9BA3B0]">{index + 1} / {CARDS.length}</p>
      </div>
      <div className="relative cursor-pointer" style={{ perspective: "1000px" }} onClick={() => setFlipped((f) => !f)}>
        <motion.div animate={{ rotateY: flipped ? 180 : 0 }} transition={{ duration: 0.5, type: "spring", stiffness: 120 }} style={{ transformStyle: "preserve-3d", position: "relative", height: "180px" }}>
          {/* Front */}
          <div className="absolute inset-0 bg-[#1C2E5E] rounded-2xl p-6 flex flex-col justify-between" style={{ backfaceVisibility: "hidden" }}>
            <div className="flex items-start justify-between">
              <span className="text-xs font-semibold bg-[#162244] text-[#4A66A0] px-2.5 py-1 rounded-lg">{CARDS[index].term}</span>
              <p style={{ fontFamily: "Caveat, cursive", fontSize: "13px", color: "#F5A030" }}>tap to reveal</p>
            </div>
            <p style={{ fontFamily: "Barlow Condensed, sans-serif", fontSize: "22px", fontWeight: 700, color: "#EEF2F8", lineHeight: 1.3 }}>{CARDS[index].front}</p>
          </div>
          {/* Back */}
          <div className="absolute inset-0 bg-[#EEF2F8] rounded-2xl p-6 flex items-center" style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}>
            <p className="text-sm text-[#374151] leading-relaxed">{CARDS[index].back}</p>
          </div>
        </motion.div>
      </div>
      <div className="flex items-center gap-3">
        <button onClick={prev} className="w-9 h-9 rounded-xl bg-[#EEF2F8] flex items-center justify-center hover:bg-[#D0DAE8] transition-colors"><ChevronLeft size={16} className="text-[#1C2E5E]" /></button>
        <div className="flex-1 flex gap-1.5 justify-center">
          {CARDS.map((_, i) => <div key={i} className="h-1.5 rounded-full transition-all duration-300" style={{ width: i === index ? "24px" : "8px", backgroundColor: i === index ? "#E8541A" : "#E8E6E0" }} />)}
        </div>
        <button onClick={next} className="w-9 h-9 rounded-xl bg-[#EEF2F8] flex items-center justify-center hover:bg-[#D0DAE8] transition-colors"><ChevronRight size={16} className="text-[#1C2E5E]" /></button>
      </div>
    </div>
  );
}

// ── Phone Popup ───────────────────────────────────────────────────────────────

function PhonePopup() {
  const [mode, setMode] = useState<"push" | "toast" | "modal" | null>("push");
  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        {(["push", "toast", "modal"] as const).map((m) => (
          <button key={m} onClick={() => setMode(mode === m ? null : m)} className={`px-3 py-1.5 rounded-xl text-xs font-semibold capitalize transition-all ${mode === m ? "bg-[#1C2E5E] text-white" : "bg-[#EEF2F8] text-[#1C2E5E]"}`}>{m}</button>
        ))}
      </div>
      <div className="bg-[#0D1829] rounded-3xl p-3 relative overflow-hidden" style={{ minHeight: 200 }}>
        {/* Notch */}
        <div className="w-20 h-5 bg-[#1C2E5E] rounded-full mx-auto mb-4" />
        <div className="space-y-2 px-1">
          {[90, 70, 80].map((w, i) => <div key={i} className="h-2 bg-[#162244] rounded" style={{ width: `${w}%` }} />)}
        </div>

        <AnimatePresence>
          {mode === "push" && (
            <motion.div key="push" initial={{ y: -60, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -60, opacity: 0 }}
              className="absolute top-3 left-3 right-3 bg-white/95 rounded-2xl p-3 flex gap-3 shadow-lg backdrop-blur-sm">
              <BFPhotoLogo width={36} />
              <div className="flex-1">
                <p className="text-xs font-bold text-[#1C2E5E]">BOTS FIRED</p>
                <p className="text-xs text-[#6B7280]">Issue #053 is live — AI Governance 101</p>
              </div>
            </motion.div>
          )}
          {mode === "toast" && (
            <motion.div key="toast" initial={{ y: 60, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 60, opacity: 0 }}
              className="absolute bottom-4 left-3 right-3 bg-[#1C2E5E] rounded-2xl px-4 py-3 flex items-center gap-3 shadow-lg">
              <Check size={16} className="text-[#86EFAC] shrink-0" />
              <p className="text-white text-xs font-semibold flex-1">You're subscribed!</p>
              <button className="text-[#4A66A0]"><X size={14} /></button>
            </motion.div>
          )}
          {mode === "modal" && (
            <motion.div key="modal" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
              className="absolute inset-3 bg-white rounded-2xl p-4 flex flex-col items-center justify-center text-center shadow-xl">
              <button className="absolute top-3 right-3" onClick={() => setMode(null)}><X size={14} className="text-[#9BA3B0]" /></button>
              <BFLogoSVG variant="stacked" theme="color" width={80} className="mb-3" />
              <p className="text-xs text-[#1C2E5E] font-bold">Subscribe to the Brief</p>
              <p className="text-[10px] text-[#6B7280] mt-1">Join 2,400+ executives</p>
              <button className="mt-3 px-4 py-2 rounded-xl bg-[#E8541A] text-white text-xs font-bold">Subscribe Free</button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// ── Mac Notification ──────────────────────────────────────────────────────────

function MacNotification() {
  const [show, setShow] = useState(true);
  const [type, setType] = useState<"banner" | "alert">("banner");

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        {(["banner", "alert"] as const).map((t) => (
          <button key={t} onClick={() => { setType(t); setShow(true); }} className={`px-3 py-1.5 rounded-xl text-xs font-semibold capitalize ${type === t ? "bg-[#1C2E5E] text-white" : "bg-[#EEF2F8] text-[#1C2E5E]"}`}>{t}</button>
        ))}
        <button onClick={() => setShow(true)} className="ml-auto px-3 py-1.5 rounded-xl text-xs font-semibold bg-[#EEF2F8] text-[#1C2E5E]">Show</button>
      </div>
      <div className="bg-[#ECECEC] rounded-2xl p-4 relative min-h-[120px] flex items-start">
        <AnimatePresence>
          {show && type === "banner" && (
            <motion.div key="banner" initial={{ x: 200, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: 200, opacity: 0 }}
              className="ml-auto bg-white/90 backdrop-blur rounded-xl shadow-lg p-3 flex gap-3 w-72">
              <BFPhotoLogo width={36} />
              <div className="flex-1">
                <p className="text-xs font-bold text-[#1C2E5E]">BOTS FIRED</p>
                <p className="text-xs text-[#6B7280]">Issue #053 is live</p>
              </div>
              <button onClick={() => setShow(false)}><X size={12} className="text-[#9BA3B0]" /></button>
            </motion.div>
          )}
          {show && type === "alert" && (
            <motion.div key="alert" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }}
              className="mx-auto bg-white/95 backdrop-blur rounded-2xl shadow-2xl p-5 text-center w-56">
              <BFLogoSVG variant="icon" theme="color" width={40} className="mx-auto mb-2" />
              <p className="text-xs font-bold text-[#1C2E5E] mb-1">New Issue Available</p>
              <p className="text-[10px] text-[#6B7280] mb-3">Issue #053 — AI Governance 101</p>
              <div className="flex gap-2">
                <button onClick={() => setShow(false)} className="flex-1 py-1.5 rounded-lg border border-[#E8E6E0] text-[10px] font-semibold text-[#6B7280]">Later</button>
                <button onClick={() => setShow(false)} className="flex-1 py-1.5 rounded-lg bg-[#1C2E5E] text-[10px] font-semibold text-white">Read</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// ── Main Export ───────────────────────────────────────────────────────────────

export function ComponentsSection() {
  return (
    <section className="space-y-16">
      <div>
        <h3 style={{ fontFamily: "Barlow Condensed, sans-serif", color: "#1C2E5E", fontSize: "24px", fontWeight: 700 }} className="mb-2">Countdown Timers</h3>
        <p className="text-sm text-[#6B7280] mb-6">Three countdown variants for newsletter, training, and inline contexts.</p>
        <div className="grid sm:grid-cols-3 gap-4">
          <CountdownNewsletter />
          <CountdownTraining />
          <CountdownMinimal />
        </div>
      </div>

      <div>
        <h3 style={{ fontFamily: "Barlow Condensed, sans-serif", color: "#1C2E5E", fontSize: "24px", fontWeight: 700 }} className="mb-2">Logo Fill Progress</h3>
        <p className="text-sm text-[#6B7280] mb-6">Animated radial progress indicator using the BF icon.</p>
        <div className="flex flex-wrap gap-6">
          <LogoFillProgress pct={72} />
          <LogoFillProgress pct={35} />
          <LogoFillProgress pct={100} />
        </div>
      </div>

      <div>
        <h3 style={{ fontFamily: "Barlow Condensed, sans-serif", color: "#1C2E5E", fontSize: "24px", fontWeight: 700 }} className="mb-2">AI Literacy Flash Cards</h3>
        <p className="text-sm text-[#6B7280] mb-6">6 key AI terms — tap to flip and reveal the definition.</p>
        <div className="max-w-sm">
          <FlashCards />
        </div>
      </div>

      <div>
        <h3 style={{ fontFamily: "Barlow Condensed, sans-serif", color: "#1C2E5E", fontSize: "24px", fontWeight: 700 }} className="mb-2">Mobile Notifications</h3>
        <p className="text-sm text-[#6B7280] mb-6">Push notification, toast, and modal variants for iOS and Mac.</p>
        <div className="grid sm:grid-cols-2 gap-8">
          <div>
            <p className="text-xs font-semibold text-[#9BA3B0] mb-3">iOS Popups</p>
            <PhonePopup />
          </div>
          <div>
            <p className="text-xs font-semibold text-[#9BA3B0] mb-3">macOS Notifications</p>
            <MacNotification />
          </div>
        </div>
      </div>
    </section>
  );
}
