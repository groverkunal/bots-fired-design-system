import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { BFLogoSVG, BFPhotoLogo } from "./BFLogoSVG";
import { HandwrittenNote } from "../shared/HandwrittenNote";
import { AnimatedSection } from "../shared/AnimatedSection";
import { X, Bell, Flame, ChevronLeft, ChevronRight, Upload, Check, Loader2 } from "lucide-react";

/* ── COUNTDOWN TIMER ── */
function CountdownTimer() {
  const getNext = () => {
    const now = new Date();
    const next = new Date();
    next.setDate(now.getDate() + ((1 - now.getDay() + 7) % 7 || 7)); // next Monday
    next.setHours(6, 0, 0, 0);
    return next;
  };

  const [timeLeft, setTimeLeft] = useState({ d: 0, h: 0, m: 0, s: 0 });
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const tick = () => {
      const now = new Date().getTime();
      const target = getNext().getTime();
      const total = 7 * 24 * 3600 * 1000;
      const diff = target - now;
      const elapsed = total - diff;
      setProgress(Math.min((elapsed / total) * 100, 100));
      setTimeLeft({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff % 86400000) / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <div className="space-y-6">
      {/* Variant 1 — Full branded */}
      <div className="bg-[#0D1829] rounded-3xl p-7">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-[10px] font-bold text-[#4A66A0] uppercase tracking-widest">Next Issue Drops In</p>
            <p style={{ fontFamily: "Barlow Condensed, sans-serif", fontSize: "18px", fontWeight: 700, color: "#EEF2F8" }}>
              The Executive AI Brief #053
            </p>
          </div>
          <BFLogoSVG variant="icon" theme="white" width={50} />
        </div>
        <div className="grid grid-cols-4 gap-3">
          {[["d", timeLeft.d], ["h", timeLeft.h], ["m", timeLeft.m], ["s", timeLeft.s]].map(([unit, val]) => (
            <div key={unit as string} className="bg-[#162244] rounded-2xl p-3 text-center">
              <p style={{ fontFamily: "Barlow Condensed, sans-serif", fontSize: "36px", fontWeight: 800, color: "#EEF2F8", lineHeight: 1 }}>
                {pad(val as number)}
              </p>
              <p className="text-[10px] text-[#4A66A0] uppercase mt-1">{unit}</p>
            </div>
          ))}
        </div>
        {/* Logo fill progress */}
        <div className="mt-5">
          <div className="flex justify-between text-[10px] text-[#4A66A0] mb-1.5">
            <span>Weekly progress</span>
            <span>{Math.round(100 - progress)}% until next issue</span>
          </div>
          <div className="h-2 bg-[#162244] rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ background: "linear-gradient(90deg, #4A66A0, #E8541A)" }}
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />
          </div>
        </div>
        <div className="mt-4 text-center">
          <p style={{ fontFamily: "Caveat, cursive", fontSize: "15px", color: "#F5A030" }}>
            Subscribed? You'll get it first. 🔥
          </p>
        </div>
      </div>

      {/* Variant 2 — Training countdown */}
      <div className="bg-[#FFF8EC] rounded-3xl border-2 border-[#F5A030]/40 p-6">
        <p className="text-xs font-bold text-[#D97706] uppercase tracking-widest mb-3">Half-Day Intensive · London</p>
        <div className="flex items-center gap-3 mb-4">
          <div className="grid grid-cols-4 gap-2 flex-1">
            {[["d", timeLeft.d], ["h", timeLeft.h], ["m", timeLeft.m], ["s", timeLeft.s]].map(([unit, val]) => (
              <div key={unit as string} className="bg-white rounded-xl p-2.5 text-center border border-[#F5A030]/30">
                <p style={{ fontFamily: "Barlow Condensed, sans-serif", fontSize: "28px", fontWeight: 800, color: "#1C2E5E", lineHeight: 1 }}>
                  {pad(val as number)}
                </p>
                <p className="text-[9px] text-[#9BA3B0] uppercase">{unit}</p>
              </div>
            ))}
          </div>
          <BFPhotoLogo height={40} />
        </div>
        <p style={{ fontFamily: "Caveat, cursive", fontSize: "16px", color: "#D97706" }}>
          Only 4 spots left — don't miss it!
        </p>
        <button className="mt-3 w-full py-2.5 rounded-xl bg-[#1C2E5E] text-white text-xs font-semibold">Reserve Your Spot</button>
      </div>

      {/* Variant 3 — Minimal pill */}
      <div className="bg-white rounded-2xl border border-[#E8E6E0] p-4 flex items-center justify-between gap-4">
        <BFLogoSVG variant="icon" theme="color" width={44} />
        <div className="flex-1">
          <p className="text-xs font-semibold text-[#1C2E5E]">Cohort Enrolment Closes</p>
          <div className="flex gap-2 mt-1">
            {[["d", timeLeft.d], ["h", timeLeft.h], ["m", timeLeft.m]].map(([unit, val]) => (
              <span key={unit as string} className="text-xs font-bold text-[#E8541A]">
                {pad(val as number)}<span className="text-[#9BA3B0] font-normal">{unit}</span>
              </span>
            ))}
          </div>
        </div>
        <button className="px-3 py-2 rounded-xl bg-[#E8541A] text-white text-xs font-semibold whitespace-nowrap">Apply Now</button>
      </div>
    </div>
  );
}

/* ── LOGO FILL UPLOAD PROGRESS ── */
function LogoFillProgress() {
  const [progress, setProgress] = useState(0);
  const [state, setState] = useState<"idle" | "uploading" | "done">("idle");

  const startUpload = () => {
    setState("uploading");
    setProgress(0);
    let p = 0;
    const id = setInterval(() => {
      p += Math.random() * 8 + 2;
      if (p >= 100) {
        setProgress(100);
        clearInterval(id);
        setTimeout(() => setState("done"), 400);
      } else {
        setProgress(p);
      }
    }, 200);
  };

  const reset = () => { setState("idle"); setProgress(0); };

  return (
    <div className="space-y-5">
      {/* Main logo fill variant */}
      <div className="bg-white rounded-3xl border border-[#E8E6E0] p-7 flex flex-col items-center gap-5">
        <p className="text-xs font-semibold text-[#9BA3B0] uppercase tracking-widest">Logo Fill Upload Progress</p>

        {/* SVG Logo with clip-path fill */}
        <div className="relative">
          <svg width="200" height="100" viewBox="0 0 340 80" fill="none">
            <defs>
              <clipPath id="logo-clip">
                <path d="M32 72 C32 72 8 56 14 34 C18 20 28 12 28 12 C28 12 24 24 32 30 C32 30 36 8 48 2 C48 2 42 24 52 36 C60 46 56 62 48 70 C44 64 40 60 32 72Z" />
                <rect x="70" y="0" width="280" height="80" />
              </clipPath>
              <linearGradient id="fill-grad" x1="0" y1="80" x2="0" y2="0">
                <stop offset="0%" stopColor="#E8541A" />
                <stop offset="50%" stopColor="#F5A030" />
                <stop offset="100%" stopColor="#1C2E5E" />
              </linearGradient>
            </defs>
            {/* Ghost logo */}
            <g opacity="0.12">
              <path d="M32 72 C32 72 8 56 14 34 C18 20 28 12 28 12 C28 12 24 24 32 30 C32 30 36 8 48 2 C48 2 42 24 52 36 C60 46 56 62 48 70 C44 64 40 60 32 72Z" fill="#1C2E5E" />
              <text x="72" y="36" fontFamily="Barlow Condensed" fontWeight="800" fontStyle="italic" fontSize="38" fill="#1C2E5E" letterSpacing="2">BOTS</text>
              <text x="208" y="36" fontFamily="Barlow Condensed" fontWeight="800" fontStyle="italic" fontSize="38" fill="#1C2E5E" letterSpacing="2">FIRED</text>
              <text x="72" y="58" fontFamily="Inter" fontSize="12" fill="#1C2E5E" letterSpacing="3">AI FOR LEADERS</text>
            </g>
            {/* Fill layer */}
            <rect
              x="0"
              y={80 - (progress / 100) * 80}
              width="340"
              height={(progress / 100) * 80}
              fill="url(#fill-grad)"
              clipPath="url(#logo-clip)"
              style={{ transition: "y 0.3s ease, height 0.3s ease" }}
            />
          </svg>
        </div>

        {/* Progress bar */}
        <div className="w-full">
          <div className="flex justify-between text-xs text-[#9BA3B0] mb-1.5">
            <span>{state === "done" ? "Complete!" : state === "uploading" ? "Uploading…" : "Ready"}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="h-2 bg-[#F1F2F4] rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ background: "linear-gradient(90deg, #1C2E5E, #E8541A, #F5A030)" }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.2 }}
            />
          </div>
        </div>

        <div className="flex gap-3">
          {state !== "uploading" && (
            <button
              onClick={state === "done" ? reset : startUpload}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#1C2E5E] text-white text-sm font-semibold"
            >
              {state === "done" ? <><Check size={14} /> Done — Reset</> : <><Upload size={14} /> Start Upload</>}
            </button>
          )}
          {state === "uploading" && (
            <button disabled className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#E8E6E0] text-[#9BA3B0] text-sm font-semibold">
              <Loader2 size={14} className="animate-spin" /> Uploading…
            </button>
          )}
        </div>
      </div>

      {/* Pill progress variants */}
      <div className="grid sm:grid-cols-2 gap-4">
        {[
          { label: "Newsletter Delivery", pct: 78, color: "#1C2E5E" },
          { label: "Training Materials", pct: 45, color: "#E8541A" },
          { label: "Podcast Export", pct: 92, color: "#D97706" },
          { label: "Report Generation", pct: 23, color: "#4A66A0" },
        ].map(({ label, pct, color }) => (
          <div key={label} className="bg-white rounded-2xl border border-[#E8E6E0] p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ backgroundColor: color + "18" }}>
                <span style={{ fontFamily: "Barlow Condensed, sans-serif", fontSize: "10px", fontWeight: 800, fontStyle: "italic", color }}>{pct}%</span>
              </div>
              <p className="text-xs font-semibold text-[#374151]">{label}</p>
            </div>
            <div className="h-1.5 bg-[#F1F2F4] rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ backgroundColor: color }}
                initial={{ width: "0%" }}
                whileInView={{ width: `${pct}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── FLASH CARDS ── */
const flashCards = [
  { q: "What does LLM stand for?", a: "Large Language Model — a type of AI trained on vast text data to generate, summarise, and analyse language.", tag: "Fundamentals" },
  { q: "What is the AI Act?", a: "The EU's comprehensive AI regulation, classifying AI by risk level and imposing obligations on developers and deployers.", tag: "Regulatory" },
  { q: "What is AI governance?", a: "The framework of policies, processes, and oversight mechanisms that ensure AI systems are used responsibly, ethically, and in line with strategy.", tag: "Governance" },
  { q: "Define 'hallucination' in AI", a: "When an AI model generates plausible-sounding but factually incorrect or fabricated information — a key risk in enterprise deployments.", tag: "Fundamentals" },
  { q: "What is a foundation model?", a: "A large, pre-trained AI model (like GPT, Claude, or Gemini) that can be fine-tuned or prompted for many different tasks.", tag: "Strategy" },
  { q: "What is AI-assisted decision-making?", a: "Using AI outputs to inform (but not replace) human decisions — the most common and legally safest approach in regulated industries.", tag: "Leadership" },
];

function FlashCards() {
  const [current, setCurrent] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const next = () => { setFlipped(false); setTimeout(() => setCurrent((c) => (c + 1) % flashCards.length), 200); };
  const prev = () => { setFlipped(false); setTimeout(() => setCurrent((c) => (c - 1 + flashCards.length) % flashCards.length), 200); };

  const card = flashCards[current];

  return (
    <div className="flex flex-col items-center gap-5">
      <p className="text-xs text-[#9BA3B0]">Tap card to reveal answer · {current + 1}/{flashCards.length}</p>
      <div className="w-full max-w-sm" style={{ perspective: "1000px", height: "220px" }}>
        <motion.div
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
          style={{ width: "100%", height: "100%", position: "relative", transformStyle: "preserve-3d" }}
          onClick={() => setFlipped(!flipped)}
          className="cursor-pointer"
        >
          {/* Front */}
          <div
            className="absolute inset-0 rounded-3xl bg-[#1C2E5E] flex flex-col items-center justify-center gap-4 p-6 text-center"
            style={{ backfaceVisibility: "hidden" }}
          >
            <div className="absolute top-4 right-4">
              <BFLogoSVG variant="icon" theme="white" width={36} />
            </div>
            <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full text-[#F5A030]" style={{ backgroundColor: "#162244" }}>
              {card.tag}
            </span>
            <p style={{ fontFamily: "Barlow Condensed, sans-serif", fontSize: "20px", fontWeight: 700, color: "#EEF2F8", lineHeight: 1.3 }}>
              {card.q}
            </p>
            <p style={{ fontFamily: "Caveat, cursive", fontSize: "14px", color: "#8FA5C8" }}>Tap to reveal →</p>
          </div>
          {/* Back */}
          <div
            className="absolute inset-0 rounded-3xl bg-[#FFF8EC] border-2 border-[#F5A030]/40 flex flex-col items-center justify-center gap-3 p-6 text-center"
            style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
          >
            <div className="absolute top-4 right-4">
              <BFLogoSVG variant="icon" theme="color" width={36} />
            </div>
            <div className="absolute top-3 left-4">
              <Check size={16} className="text-green-500" />
            </div>
            <p className="text-sm text-[#374151] leading-relaxed">{card.a}</p>
            <p style={{ fontFamily: "Caveat, cursive", fontSize: "13px", color: "#D97706" }}>— BOTS FIRED AI Brief</p>
          </div>
        </motion.div>
      </div>
      <div className="flex items-center gap-4">
        <button onClick={prev} className="w-9 h-9 rounded-full border border-[#E8E6E0] flex items-center justify-center text-[#6B7280] hover:border-[#1C2E5E] hover:text-[#1C2E5E] transition-colors">
          <ChevronLeft size={16} />
        </button>
        <div className="flex gap-1.5">
          {flashCards.map((_, i) => (
            <button key={i} onClick={() => { setFlipped(false); setCurrent(i); }}
              className="w-1.5 h-1.5 rounded-full transition-all" style={{ backgroundColor: i === current ? "#E8541A" : "#E8E6E0" }} />
          ))}
        </div>
        <button onClick={next} className="w-9 h-9 rounded-full border border-[#E8E6E0] flex items-center justify-center text-[#6B7280] hover:border-[#1C2E5E] hover:text-[#1C2E5E] transition-colors">
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}

/* ── PHONE POPUP ── */
function PhonePopup() {
  const [show, setShow] = useState(false);
  const [type, setType] = useState<"push" | "toast" | "modal">("push");

  return (
    <div className="flex flex-col items-center gap-5">
      <div className="flex gap-2">
        {(["push", "toast", "modal"] as const).map((t) => (
          <button key={t} onClick={() => setType(t)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${type === t ? "bg-[#1C2E5E] text-white" : "border border-[#E8E6E0] text-[#6B7280]"}`}>
            {t}
          </button>
        ))}
      </div>

      {/* Phone mockup */}
      <div className="relative" style={{ width: "200px", height: "380px" }}>
        {/* Phone frame */}
        <div className="absolute inset-0 rounded-[32px] bg-[#111] border-4 border-[#333] overflow-hidden shadow-2xl">
          {/* Status bar */}
          <div className="h-8 bg-[#111] flex items-center justify-between px-5 pt-1">
            <span className="text-white text-[10px] font-medium">9:41</span>
            <div className="w-16 h-4 bg-[#111] rounded-full" />
            <div className="flex gap-1">
              <div className="w-3 h-1.5 bg-white rounded-sm opacity-80" />
              <div className="w-1 h-1.5 bg-white rounded-sm opacity-60" />
            </div>
          </div>
          {/* Home screen */}
          <div className="flex-1 bg-gradient-to-b from-[#1a2540] to-[#0d1829] px-3 pt-2 pb-4 h-full">
            <p className="text-[9px] text-[#8FA5C8] text-center mb-3">BOTS FIRED</p>
            <div className="grid grid-cols-4 gap-2">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="aspect-square rounded-xl" style={{ backgroundColor: i === 0 ? "#1C2E5E" : "#162244" }}>
                  {i === 0 && <div className="w-full h-full flex items-center justify-center">
                    <span style={{ fontFamily: "Barlow Condensed, sans-serif", fontSize: "10px", fontWeight: 800, fontStyle: "italic", color: "#E8541A" }}>BF</span>
                  </div>}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Push notification */}
        <AnimatePresence>
          {show && type === "push" && (
            <motion.div
              initial={{ y: -80, opacity: 0 }}
              animate={{ y: 8, opacity: 1 }}
              exit={{ y: -80, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="absolute top-8 left-2 right-2 bg-white/95 backdrop-blur rounded-2xl shadow-xl overflow-hidden"
              style={{ zIndex: 10 }}
            >
              <div className="p-3 flex items-start gap-2">
                <div className="w-8 h-8 rounded-xl bg-[#1C2E5E] flex items-center justify-center shrink-0">
                  <span style={{ fontSize: "12px", fontWeight: 800, fontStyle: "italic", color: "#E8541A", fontFamily: "Barlow Condensed, sans-serif" }}>BF</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-[10px] font-bold text-[#0D1829]">BOTS FIRED 🔥</p>
                    <p className="text-[9px] text-[#9BA3B0]">now</p>
                  </div>
                  <p className="text-[10px] text-[#374151] mt-0.5">Issue #052 is here! Your Monday AI brief just dropped.</p>
                </div>
              </div>
            </motion.div>
          )}

          {show && type === "toast" && (
            <motion.div
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: -50, opacity: 1 }}
              exit={{ y: 60, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="absolute bottom-20 left-4 right-4 bg-[#1C2E5E] rounded-2xl shadow-xl"
              style={{ zIndex: 10 }}
            >
              <div className="p-3 flex items-center gap-2">
                <span className="text-lg">🔥</span>
                <div className="flex-1">
                  <p className="text-[10px] font-bold text-white">Subscribed!</p>
                  <p className="text-[9px] text-[#8FA5C8]">First issue lands Monday</p>
                </div>
                <button onClick={() => setShow(false)}><X size={12} className="text-[#4A66A0]" /></button>
              </div>
            </motion.div>
          )}

          {show && type === "modal" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 flex items-end justify-center pb-4 rounded-[32px]"
              style={{ zIndex: 10 }}
            >
              <motion.div
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                exit={{ y: 100 }}
                className="bg-white rounded-3xl mx-2 p-4 w-full"
              >
                <div className="flex flex-col items-center gap-2 text-center">
                  <BFLogoSVG variant="icon" theme="color" width={50} />
                  <p className="text-[11px] font-bold text-[#0D1829]">Join 2,400+ Executives 🎓</p>
                  <p className="text-[9px] text-[#6B7280]">Get AI clarity every Monday. Free.</p>
                  <input className="w-full text-[10px] px-2 py-1.5 rounded-xl border border-[#E8E6E0]" placeholder="email@company.com" />
                  <button onClick={() => setShow(false)} className="w-full py-1.5 rounded-xl bg-[#1C2E5E] text-white text-[10px] font-semibold">Subscribe Free</button>
                  <button onClick={() => setShow(false)} className="text-[9px] text-[#9BA3B0]">Maybe later</button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <button
        onClick={() => { setShow(true); if (type !== "modal") setTimeout(() => setShow(false), 4000); }}
        className="px-4 py-2 rounded-xl bg-[#1C2E5E] text-white text-xs font-semibold"
      >
        Trigger {type === "push" ? "🔔 Notification" : type === "toast" ? "🍞 Toast" : "📋 Modal"}
      </button>
    </div>
  );
}

/* ── MAC NOTIFICATION ── */
function MacNotification() {
  const [show, setShow] = useState(false);
  const [variant, setVariant] = useState<"banner" | "alert">("banner");

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex gap-2">
        {(["banner", "alert"] as const).map((t) => (
          <button key={t} onClick={() => setVariant(t)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${variant === t ? "bg-[#1C2E5E] text-white" : "border border-[#E8E6E0] text-[#6B7280]"}`}>
            {t}
          </button>
        ))}
      </div>

      <div className="relative w-full bg-[#1a1a1a] rounded-2xl overflow-hidden" style={{ height: "200px" }}>
        {/* Mac desktop */}
        <div className="h-6 bg-[#333] flex items-center px-3 gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#E8541A]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#F5A030]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#3C9928]" />
        </div>
        <div className="p-4 grid grid-cols-4 gap-2 opacity-30">
          {Array.from({ length: 8 }).map((_, i) => <div key={i} className="h-12 bg-white/10 rounded-lg" />)}
        </div>

        {/* Banner notification */}
        <AnimatePresence>
          {show && variant === "banner" && (
            <motion.div
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 300, opacity: 0 }}
              transition={{ type: "spring", stiffness: 280, damping: 24 }}
              className="absolute top-8 right-3 bg-white/95 backdrop-blur rounded-2xl shadow-2xl overflow-hidden"
              style={{ width: "220px", zIndex: 10 }}
            >
              <div className="p-3 flex items-start gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#1C2E5E] flex items-center justify-center shrink-0">
                  <span style={{ fontFamily: "Barlow Condensed, sans-serif", fontSize: "12px", fontWeight: 800, fontStyle: "italic", color: "#E8541A" }}>BF</span>
                </div>
                <div>
                  <div className="flex items-center justify-between gap-1">
                    <p className="text-[10px] font-bold text-[#0D1829]">BOTS FIRED</p>
                    <p className="text-[9px] text-[#9BA3B0]">now</p>
                  </div>
                  <p className="text-[10px] font-semibold text-[#374151] mt-0.5">🔥 Issue #052 is live!</p>
                  <p className="text-[9px] text-[#9BA3B0]">Why Your AI Pilot Failed</p>
                </div>
              </div>
              <div className="border-t border-[#E8E6E0] grid grid-cols-2">
                <button className="py-1.5 text-[9px] text-[#1C2E5E] font-semibold hover:bg-[#EEF2F8]">Read Now</button>
                <button onClick={() => setShow(false)} className="py-1.5 text-[9px] text-[#9BA3B0] border-l border-[#E8E6E0] hover:bg-[#F1F2F4]">Dismiss</button>
              </div>
            </motion.div>
          )}

          {show && variant === "alert" && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="absolute inset-6 bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col"
              style={{ zIndex: 10 }}
            >
              <div className="bg-[#1C2E5E] p-3 flex items-center gap-2">
                <BFLogoSVG variant="icon" theme="white" width={30} />
                <p className="text-[11px] font-bold text-white">BOTS FIRED</p>
              </div>
              <div className="flex-1 flex flex-col items-center justify-center gap-2 p-4 text-center">
                <p className="text-2xl">🎉</p>
                <p className="text-[11px] font-bold text-[#1C2E5E]">New Episode Available!</p>
                <p className="text-[9px] text-[#9BA3B0]">The Boardroom AI Ep.49 with Sir John Morgan is now live.</p>
              </div>
              <div className="border-t border-[#E8E6E0] grid grid-cols-2">
                <button className="py-2 text-[10px] text-[#1C2E5E] font-semibold">Listen Now</button>
                <button onClick={() => setShow(false)} className="py-2 text-[10px] text-[#9BA3B0] border-l border-[#E8E6E0]">Later</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <button
        onClick={() => { setShow(true); if (variant === "banner") setTimeout(() => setShow(false), 4000); }}
        className="px-4 py-2 rounded-xl bg-[#1C2E5E] text-white text-xs font-semibold"
      >
        Show Mac {variant === "banner" ? "🖥 Banner" : "⚠️ Alert"}
      </button>
    </div>
  );
}

export function ComponentsSection() {
  return (
    <div id="components" className="space-y-16">
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-[#9BA3B0] mb-1">Interactive UI</p>
        <h3 style={{ fontFamily: "Barlow Condensed, sans-serif", color: "#1C2E5E", fontSize: "28px", fontWeight: 700 }}>
          Brand Components
        </h3>
        <HandwrittenNote size="sm" rotate={-1} className="mt-1">all interactive — try them!</HandwrittenNote>
      </div>

      <AnimatedSection>
        <p className="text-sm font-semibold text-[#374151] mb-4 uppercase tracking-widest text-xs">Countdown Timer</p>
        <CountdownTimer />
      </AnimatedSection>

      <AnimatedSection>
        <p className="text-sm font-semibold text-[#374151] mb-4 uppercase tracking-widest text-xs">Upload / Progress with Logo Fill</p>
        <LogoFillProgress />
      </AnimatedSection>

      <AnimatedSection>
        <p className="text-sm font-semibold text-[#374151] mb-4 uppercase tracking-widest text-xs">AI Flash Cards — Flip to Reveal</p>
        <FlashCards />
      </AnimatedSection>

      <div className="grid md:grid-cols-2 gap-10">
        <AnimatedSection>
          <p className="text-xs font-semibold uppercase tracking-widest text-[#9BA3B0] mb-4">Mobile Popup &amp; Notification</p>
          <PhonePopup />
        </AnimatedSection>
        <AnimatedSection>
          <p className="text-xs font-semibold uppercase tracking-widest text-[#9BA3B0] mb-4">macOS Notification</p>
          <MacNotification />
        </AnimatedSection>
      </div>
    </div>
  );
}
