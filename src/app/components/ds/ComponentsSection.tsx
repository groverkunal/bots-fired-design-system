import { useReducedMotionPreference } from "../shared/useReducedMotionPreference";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { BFLogoSVG, BFPhotoLogo } from "./BFLogoSVG";
import { HandwrittenNote } from "../shared/HandwrittenNote";
import { AnimatedSection } from "../shared/AnimatedSection";
import { X, Bell, Flame, ChevronLeft, ChevronRight, Upload, Check, Loader2 } from "lucide-react";

/* ── COUNTDOWN TIMER ── */
function CountdownTimer() {
  const reducedMotion = useReducedMotionPreference();
  const [paused, setPaused] = useState(false);
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
    if (paused) return;
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [paused]);

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <div className="space-y-6"><button type="button" aria-pressed={paused} onClick={() => setPaused(!paused)}>{paused ? "Resume countdown example" : "Pause countdown example"}</button>
      {/* Variant 1 — Full branded */}
      <div className="bg-[#0D1829] rounded-3xl p-7">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-[10px] font-bold text-[#8FA5C8] uppercase tracking-widest">Next Issue Drops In</p>
            <p style={{ fontFamily: "Barlow Condensed, sans-serif", fontSize: "20px", fontWeight: 700, color: "#EEF2F8" }}>
              The Executive AI Brief #053
            </p>
          </div>
          <BFLogoSVG variant="icon" theme="white" width={50} />
        </div>
        <div data-countdown-values="true" className="grid grid-cols-4 gap-3">
          {[["d", timeLeft.d], ["h", timeLeft.h], ["m", timeLeft.m], ["s", timeLeft.s]].map(([unit, val]) => (
            <div key={unit as string} className="bg-[#162244] rounded-2xl p-3 text-center">
              <p style={{ fontFamily: "Barlow Condensed, sans-serif", fontSize: "36px", fontWeight: 800, color: "#EEF2F8", lineHeight: 1 }}>
                {pad(val as number)}
              </p>
              <p className="text-[10px] text-[#8FA5C8] uppercase mt-1">{unit}</p>
            </div>
          ))}
        </div>
        {/* Logo fill progress */}
        <div className="mt-5">
          <div className="flex justify-between text-[10px] text-[#8FA5C8] mb-1.5">
            <span>Weekly progress</span>
            <span>{Math.round(100 - progress)}% until next issue</span>
          </div>
          <div className="h-2 bg-[#162244] rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ background: "linear-gradient(90deg, #4A66A0, #E8541A)" }}
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: reducedMotion ? 0 : .3, ease: "easeOut" }}
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
        <p className="text-xs font-bold text-[#D03010] uppercase tracking-widest mb-3">Half-Day Intensive · London</p>
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
        <p style={{ fontFamily: "Caveat, cursive", fontSize: "16px", color: "#D03010" }}>
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
              <span key={unit as string} className="text-xs font-bold text-[#D03010]">
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
  const reducedMotion = useReducedMotionPreference();
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const completionRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => { if (intervalRef.current) clearInterval(intervalRef.current); if (completionRef.current) clearTimeout(completionRef.current); }, []);
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
        completionRef.current = setTimeout(() => setState("done"), reducedMotion ? 0 : 250);
      } else {
        setProgress(p);
      }
    }, 200);
    intervalRef.current = id;
  };

  const reset = () => { setState("idle"); setProgress(0); };

  return (
    <div className="space-y-5">
      {/* Main logo fill variant */}
      <div className="bg-white rounded-3xl border border-[#E8E6E0] p-7 flex flex-col items-center gap-5">
        <p className="text-xs font-semibold text-[#9BA3B0] uppercase tracking-widest">Logo Fill Upload Progress</p>

        {/* SVG Logo with clip-path fill */}
        <div className="relative">
          <svg aria-hidden="true" focusable="false" width="200" height="100" viewBox="0 0 340 80" fill="none">
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
              style={{ transition: reducedMotion ? "none" : "y 0.3s ease, height 0.3s ease" }}
            />
          </svg>
        </div>

        {/* Progress bar */}
        <div className="w-full" role="progressbar" aria-label="Example upload progress" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(progress)} aria-busy={state === "uploading"}>
          <div className="flex justify-between text-xs text-[#9BA3B0] mb-1.5">
            <span>{state === "done" ? "Complete!" : state === "uploading" ? "Uploading…" : "Ready"}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="h-2 bg-[#F1F2F4] rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ background: "linear-gradient(90deg, #1C2E5E, #E8541A, #F5A030)" }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: reducedMotion ? 0 : .2 }}
            />
          </div>
        </div>

        <p role="status">{state === "done" ? "Example upload complete. No file was sent." : state === "uploading" ? "Example upload started." : ""}</p>
        <div className="flex gap-3">
          <button type="button" aria-disabled={state === "uploading"} aria-busy={state === "uploading"} onClick={() => { if(state === 'uploading') return; if(state === 'done') reset(); else startUpload(); }} className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#1C2E5E] text-white text-sm font-semibold">
            {state === 'uploading' ? <><Loader2 size={14} aria-hidden="true" className="animate-spin"/> Uploading…</> : state === 'done' ? <><Check size={14} aria-hidden="true"/> Done — Reset</> : <><Upload size={14} aria-hidden="true"/> Start Upload</>}
          </button>
        </div>
      </div>

      {/* Pill progress variants */}
      <div className="grid sm:grid-cols-2 gap-4">
        {[
          { label: "Newsletter Delivery", pct: 78, color: "#1C2E5E" },
          { label: "Training Materials", pct: 45, color: "#E8541A" },
          { label: "Podcast Export", pct: 92, color: "#D03010" },
          { label: "Report Generation", pct: 23, color: "#4A66A0" },
        ].map(({ label, pct, color }) => (
          <div key={label} className="bg-white rounded-2xl border border-[#E8E6E0] p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ backgroundColor: color + "18" }}>
                <span style={{ fontFamily: "Barlow Condensed, sans-serif", fontSize: "14px", fontWeight: 700, fontStyle: "normal", color: "#1C2E5E" }}>{pct}%</span>
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
                transition={{ duration: reducedMotion ? 0 : .3, ease: [0.22, 1, 0.36, 1] }}
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
  const reducedMotion = useReducedMotionPreference();
  const card = flashCards[current];
  const select = (index: number) => { setFlipped(false); setCurrent((index + flashCards.length) % flashCards.length); };
  return <section aria-label="AI flashcard example" className="legacy-flashcards">
    <p role="status">Card {current + 1} of {flashCards.length}</p>
    <button type="button" className={`flashcard-toggle ${flipped ? 'answer-face' : 'question-face'}`} aria-expanded={flipped} aria-controls="flashcard-answer" aria-label={`${flipped ? 'Show question' : 'Reveal answer'}: ${card.q}`} onClick={() => setFlipped(!flipped)}>
      <span className="flashcard-category">{card.tag}</span>
      <span className="flashcard-question">{card.q}</span>
      <span>{flipped ? 'Show question' : 'Reveal answer'}</span>
    </button>
    <div id="flashcard-answer" hidden={!flipped} className="flashcard-answer" data-reduced-motion={Boolean(reducedMotion)}><p>{card.a}</p></div>
    <div role="group" aria-label="Choose a flashcard" className="flashcard-navigation">
      <button type="button" aria-label="Previous flashcard" onClick={() => select(current - 1)}><ChevronLeft size={20} aria-hidden="true"/></button>
      {flashCards.map((item,index) => <button key={item.q} type="button" aria-label={`Flashcard ${index + 1}`} aria-pressed={index === current} onClick={() => select(index)}><span aria-hidden="true">{index + 1}</span></button>)}
      <button type="button" aria-label="Next flashcard" onClick={() => select(current + 1)}><ChevronRight size={20} aria-hidden="true"/></button>
    </div>
  </section>;
}

/* ── PHONE POPUP ── */
function PhonePopup() {
  const [show, setShow] = useState(false);
  const [type, setType] = useState<"push" | "toast" | "modal">("push");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const closeNotice = () => { setShow(false); trigger.current?.focus(); };
  const open = () => { setError(""); if(type === 'modal') dialog.current?.showModal(); else setShow(true); };
  return <section aria-label="Phone notification examples" className="legacy-phone-example">
    <div role="group" aria-label="Phone notification variant" className="legacy-variant-controls">{(['push','toast','modal'] as const).map(t=><button type="button" key={t} aria-pressed={type===t} onClick={()=>{setShow(false);setType(t)}}>{t}</button>)}</div>
    <div className="legacy-phone-screen">
      <div aria-hidden="true" className="legacy-phone-decoration"><span>9:41</span><BFLogoSVG variant="wordmark" theme="white" width={160}/><div className="grid grid-cols-4 gap-3">{Array.from({length:12},(_,i)=><span key={i} className="legacy-app-tile"/>)}</div></div>
      {show&&<aside className={`legacy-phone-notice ${type==='toast'?'legacy-toast':''}`} aria-label="Example phone notification"><p role="status">{type==='toast'?'Subscription example shown.':'Example issue notification shown.'}</p><p>Illustrative preview only. No subscription or message was sent.</p><button type="button" onClick={closeNotice} aria-label="Dismiss phone notification">Dismiss <X size={16} aria-hidden="true"/></button></aside>}
    </div>
    <button type="button" ref={trigger} onClick={open}>Trigger {type==='push'?'Notification':type==='toast'?'Toast':'Modal'}</button>
    <dialog ref={dialog} aria-labelledby="phone-modal-title" onClose={()=>trigger.current?.focus()} className="legacy-example-dialog">
      <h2 id="phone-modal-title">Example subscription form</h2><p>Local demonstration only. Nothing is submitted.</p>
      <form noValidate onSubmit={event=>{event.preventDefault();const field=event.currentTarget.elements.namedItem('example-email') as HTMLInputElement;if(!email.trim()||!field.validity.valid){setError('Error: enter a valid email address.');field.focus();return}dialog.current?.close();setEmail('');}}>
        <label htmlFor="phone-email">Email for this example</label><input id="phone-email" name="example-email" type="email" autoComplete="email" inputMode="email" value={email} onChange={e=>setEmail(e.target.value)} aria-invalid={Boolean(error)} aria-describedby="phone-email-help phone-email-error"/>
        <p id="phone-email-help">Use an example address; no data leaves this page.</p><p id="phone-email-error" role="alert" className="legacy-field-error">{error}</p><button type="submit">Complete example</button>
      </form><button type="button" onClick={()=>dialog.current?.close()}>Close subscription example</button>
    </dialog>
  </section>;
}

function MacNotification() {
  const [show, setShow] = useState(false);
  const [variant, setVariant] = useState<"banner"|"alert">('banner');
  const dialog=useRef<HTMLDialogElement>(null);
  const trigger=useRef<HTMLButtonElement>(null);
  const closeNotice=()=>{setShow(false);trigger.current?.focus()};
  return <section aria-label="Desktop notification examples" className="legacy-mac-example">
    <div role="group" aria-label="Desktop notification variant" className="legacy-variant-controls">{(['banner','alert'] as const).map(t=><button type="button" key={t} aria-pressed={variant===t} onClick={()=>{setShow(false);setVariant(t)}}>{t}</button>)}</div>
    <div className="legacy-desktop-screen"><div aria-hidden="true" className="legacy-desktop-bar"><span/><span/><span/></div>{show&&<aside className="legacy-desktop-notice" aria-label="Example desktop notification"><p role="status">Example issue notification</p><p>Illustrative content only.</p><button type="button" onClick={closeNotice}>Dismiss desktop notification</button></aside>}</div>
    <button type="button" ref={trigger} onClick={()=>{if(variant==='alert')dialog.current?.showModal();else setShow(true)}}>Show Mac {variant==='banner'?'Banner':'Alert'}</button>
    <dialog ref={dialog} aria-labelledby="mac-alert-title" onClose={()=>trigger.current?.focus()} className="legacy-example-dialog"><h2 id="mac-alert-title">Example desktop alert</h2><p>No live episode or notification is being announced.</p><button type="button" onClick={()=>dialog.current?.close()}>Close desktop alert</button></dialog>
  </section>;
}

export function ComponentsSection() {
  return (
    <div id="components" className="space-y-16 legacy-controls">
      <aside role="note" className="sample-notice">Illustrative samples only. Every persona, testimonial, metric, affiliation, award, date and event in these examples is placeholder content, not a verified BotsFired claim. Replace and review before production use.</aside>
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
