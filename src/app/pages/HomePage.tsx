import React, { useState } from "react";
import { Link } from "react-router";
import { motion } from "motion/react";
import { ArrowRight, Flame, BookOpen, Mic, GraduationCap, ChevronRight, Play } from "lucide-react";
import { HandwrittenNote, HandwrittenCallout } from "../components/shared/HandwrittenNote";
import { AnimatedSection, StaggerContainer, StaggerItem } from "../components/shared/AnimatedSection";
import { AIFrameworkDiagram } from "../components/shared/AIFrameworkDiagram";
import { ImageWithFallback } from "./components/figma/ImageWithFallback";

const speakerImg   = "https://images.unsplash.com/photo-1758691736821-f1a600c0c3f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxleGVjdXRpdmUlMjBzcGVha2luZyUyMGNvbmZlcmVuY2UlMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzc2OTA1NzEwfDA&ixlib=rb-4.1.0&q=80&w=1080";
const trainingImg  = "https://images.unsplash.com/photo-1565946590329-fc70903f0ba0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3Jwb3JhdGUlMjB0cmFpbmluZyUyMHdvcmtzaG9wJTIwc2VuaW9yJTIwZXhlY3V0aXZlc3xlbnwxfHx8fDE3NzY5MDU3MTR8MA&ixlib=rb-4.1.0&q=80&w=1080";
const podcastImg   = "https://images.unsplash.com/photo-1774853114355-1ac941f85397?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb2RjYXN0JTIwbWljcm9waG9uZSUyMHN0dWRpbyUyMG1pbmltYWx8ZW58MXx8fHwxNzc2OTA1NzEwfDA&ixlib=rb-4.1.0&q=80&w=1080";

const stats = [
  { value: "2,400+", label: "Executives Trained", note: "and growing fast" },
  { value: "52",     label: "Newsletter Issues",   note: "every single week" },
  { value: "48",     label: "Podcast Episodes",    note: "real conversations" },
  { value: "94%",    label: "Recommend to Peers",  note: "speaks for itself" },
];

const testimonials = [
  {
    quote: "The clearest explanation of AI strategy I've heard outside of a PhD programme. Every board member needs this.",
    name: "Sarah M.",
    title: "Chair, FTSE 250 Company",
    initial: "S",
  },
  {
    quote: "BOTS FIRED cut through six months of AI confusion in one afternoon. We left with an actual plan.",
    name: "David K.",
    title: "CEO, Global Financial Services",
    initial: "D",
  },
  {
    quote: "Finally — AI education that respects that I'm a busy executive, not a computer science student.",
    name: "Priya R.",
    title: "Chief Strategy Officer, Tech Sector",
    initial: "P",
  },
];

const latestIssues = [
  {
    number: "#052",
    title: "Why Your AI Pilot Failed (And What to Do Next)",
    teaser: "Most enterprise AI pilots stall not because of the technology — but because of governance gaps that no-one wants to talk about in the boardroom.",
    tag: "Strategy",
    date: "Apr 21, 2026",
    readTime: "6 min read",
  },
  {
    number: "#051",
    title: "The Board's AI Duty: What Every Director Should Know",
    teaser: "AI isn't just a management agenda item anymore. Boards have fiduciary responsibility for how their organisations adopt and govern AI systems.",
    tag: "Governance",
    date: "Apr 14, 2026",
    readTime: "7 min read",
  },
  {
    number: "#050",
    title: "ROI or Risk? How to Frame AI for Your CFO",
    teaser: "The language you use to present AI investments to the finance function will determine whether your initiative gets funded or shelved.",
    tag: "Finance",
    date: "Apr 7, 2026",
    readTime: "5 min read",
  },
];

const episodes = [
  { number: "Ep. 48", title: "AI Governance: What Boards Get Wrong", guest: "Former FCA Director", duration: "41 min" },
  { number: "Ep. 47", title: "Building an AI-Ready Culture", guest: "Chief People Officer, Shell", duration: "38 min" },
  { number: "Ep. 46", title: "When AI Makes the Decision", guest: "AI Ethics Professor, Oxford", duration: "52 min" },
];

export function HomePage() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) { setSubscribed(true); setEmail(""); }
  };

  return (
    <div className="min-h-screen bg-[#FAFAF8]">

      {/* ── HERO ── */}
      <section className="pt-32 pb-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#EEF2F8] text-[#1C2E5E] text-xs font-semibold uppercase tracking-widest mb-6">
                  <Flame size={12} className="text-[#E8541A]" />
                  AI Education for Executives
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="mb-4"
                style={{ color: "#0D1829" }}
              >
                AI Clarity
                <br />
                for the{" "}
                <span style={{ color: "#1C2E5E", fontStyle: "italic" }}>Boardroom.</span>
              </motion.h1>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.25 }}
                className="mb-6"
              >
                <HandwrittenNote size="lg" rotate={-2} color="#D97706">
                  No jargon. No hype. Just signal.
                </HandwrittenNote>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-[#6B7280] text-lg max-w-md mb-10"
              >
                Weekly insights, deep conversations, and hands-on training 
                that give C-suite leaders and board members the AI fluency 
                to make decisions with confidence.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex flex-wrap gap-3"
              >
                <Link
                  to="/newsletter"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#1C2E5E] text-white font-semibold hover:bg-[#162244] transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  Read the Newsletter
                  <ArrowRight size={16} />
                </Link>
                <Link
                  to="/training"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl border-2 border-[#E8E6E0] bg-white text-[#1C2E5E] font-semibold hover:border-[#1C2E5E] transition-all duration-200"
                >
                  Explore Training
                </Link>
              </motion.div>
            </div>

            {/* Hero image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="rounded-3xl overflow-hidden aspect-[4/3] shadow-2xl">
                <img
                  src={speakerImg}
                  alt="Executive speaking at conference"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D1829]/40 to-transparent" />
              </div>

              {/* Floating handwritten annotation */}
              <div
                className="absolute -bottom-4 -left-6 bg-white rounded-2xl shadow-xl px-5 py-4 max-w-[180px]"
                style={{ transform: "rotate(-2deg)" }}
              >
                <p style={{ fontFamily: "Caveat, cursive", fontSize: "18px", color: "#D97706", lineHeight: 1.3 }}>
                  "This changed how our board thinks about AI"
                </p>
                <p className="text-[10px] text-[#9BA3B0] mt-1 font-medium">— Board Chair, FTSE 100</p>
              </div>

              {/* Stats badge */}
              <div className="absolute -top-4 -right-4 bg-[#1C2E5E] text-white rounded-2xl shadow-xl px-4 py-3">
                <p style={{ fontFamily: "Barlow Condensed, sans-serif", fontSize: "28px", fontWeight: 800, lineHeight: 1 }}>
                  2,400+
                </p>
                <p className="text-[11px] text-[#8FA5C8]">Executives Trained</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <AnimatedSection className="py-16 px-6 bg-white border-y border-[#E8E6E0]">
        <div className="max-w-6xl mx-auto">
          <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map(({ value, label, note }) => (
              <StaggerItem key={label} className="text-center">
                <p
                  style={{
                    fontFamily: "Barlow Condensed, sans-serif",
                    fontSize: "clamp(2rem, 4vw, 3rem)",
                    fontWeight: 800,
                    color: "#1C2E5E",
                    lineHeight: 1,
                  }}
                >
                  {value}
                </p>
                <p className="text-sm font-semibold text-[#374151] mt-1">{label}</p>
                <p style={{ fontFamily: "Caveat, cursive", fontSize: "15px", color: "#D97706" }}>{note}</p>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </AnimatedSection>

      {/* ── THREE PILLARS ── */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#9BA3B0] mb-3">What We Offer</p>
            <h2 style={{ color: "#0D1829" }}>Three Ways to Build<br />Your AI Fluency</h2>
          </AnimatedSection>

          <StaggerContainer className="grid gap-6 md:grid-cols-3">
            {[
              {
                icon: BookOpen,
                title: "Weekly Newsletter",
                label: "The Executive AI Brief",
                desc: "52 issues per year. Every Monday morning, a clear-eyed briefing on what matters in AI — and what it means for your decisions, your board, and your organisation.",
                to: "/newsletter",
                cta: "Read the latest issue",
                note: "Free forever",
                color: "#EEF2F8",
                border: "#D0DAE8",
                accent: "#2A4080",
              },
              {
                icon: Mic,
                title: "Podcast",
                label: "The Boardroom AI",
                desc: "Bi-weekly conversations with the CEOs, academics, regulators, and technologists shaping how AI intersects with business leadership and governance.",
                to: "/podcast",
                cta: "Listen now",
                note: "New episode every 2 weeks",
                color: "#FFF8EC",
                border: "#F5A030",
                accent: "#D97706",
              },
              {
                icon: GraduationCap,
                title: "Executive Training",
                label: "AI Mastery Programs",
                desc: "From 3-hour board briefings to 4-week cohort programmes — practical, facilitated learning designed for senior leaders who don't have time for theory.",
                to: "/training",
                cta: "View programmes",
                note: "In-person & virtual",
                color: "#1C2E5E",
                border: "#1C2E5E",
                accent: "#F5A030",
                dark: true,
              },
            ].map(({ icon: Icon, title, label, desc, to, cta, note, color, border, accent, dark }) => (
              <StaggerItem key={title}>
                <div
                  className="h-full rounded-3xl border-2 p-8 flex flex-col gap-5 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                  style={{ backgroundColor: color, borderColor: border }}
                >
                  <div>
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4"
                      style={{ backgroundColor: dark ? "#162244" : "#fff", border: `1.5px solid ${border}` }}
                    >
                      <Icon size={22} style={{ color: accent }} />
                    </div>
                    <p
                      className="text-xs font-semibold uppercase tracking-widest mb-1"
                      style={{ color: dark ? "#8FA5C8" : "#9BA3B0" }}
                    >
                      {title}
                    </p>
                    <h3
                      style={{
                        fontFamily: "Barlow Condensed, sans-serif",
                        color: dark ? "#EEF2F8" : "#1C2E5E",
                        fontSize: "22px",
                        fontWeight: 700,
                      }}
                    >
                      {label}
                    </h3>
                  </div>

                  <p className="text-sm leading-relaxed flex-1" style={{ color: dark ? "#8FA5C8" : "#6B7280" }}>
                    {desc}
                  </p>

                  <div>
                    <p
                      className="mb-3"
                      style={{ fontFamily: "Caveat, cursive", fontSize: "16px", color: accent }}
                    >
                      {note}
                    </p>
                    <Link
                      to={to}
                      className="inline-flex items-center gap-2 text-sm font-semibold group"
                      style={{ color: dark ? "#F5A030" : "#1C2E5E" }}
                    >
                      {cta}
                      <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ── AI FRAMEWORK DIAGRAM ── */}
      <section className="py-24 px-6 bg-white border-y border-[#E8E6E0]">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection className="mb-12">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-[#9BA3B0] mb-3">The Framework</p>
                <h2 style={{ color: "#0D1829" }}>The Executive AI<br />Clarity Journey</h2>
                <p className="text-[#6B7280] mt-3 max-w-md">
                  Every executive who works with us moves through four stages — from confusion to confident leadership.
                </p>
              </div>
              <HandwrittenNote size="lg" rotate={2} className="shrink-0">
                Where are you today?
              </HandwrittenNote>
            </div>
          </AnimatedSection>

          <AIFrameworkDiagram />

          <AnimatedSection delay={0.4} className="mt-10 text-center">
            <Link
              to="/training"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#1C2E5E] text-white font-semibold hover:bg-[#162244] transition-colors"
            >
              Find your starting point
              <ArrowRight size={16} />
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* ── NEWSLETTER PREVIEW ── */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-[#9BA3B0] mb-2">The Executive AI Brief</p>
              <h2 style={{ color: "#0D1829" }}>Latest Issues</h2>
            </div>
            <Link
              to="/newsletter"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#1C2E5E] hover:gap-3 transition-all"
            >
              View all 52 issues <ChevronRight size={16} />
            </Link>
          </AnimatedSection>

          <StaggerContainer className="space-y-4">
            {latestIssues.map((issue) => (
              <StaggerItem key={issue.number}>
                <div className="group bg-white rounded-2xl border border-[#E8E6E0] p-6 hover:shadow-md hover:border-[#D0DAE8] transition-all duration-300 cursor-pointer">
                  <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                    <div className="shrink-0">
                      <span
                        className="text-xs font-semibold text-[#9BA3B0]"
                        style={{ fontFamily: "JetBrains Mono, monospace" }}
                      >
                        {issue.number}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#EEF2F8] text-[#1C2E5E]">
                          {issue.tag}
                        </span>
                        <span className="text-xs text-[#9BA3B0]">{issue.date}</span>
                        <span className="text-xs text-[#9BA3B0]">· {issue.readTime}</span>
                      </div>
                      <h4 className="font-bold text-[#0D1829] group-hover:text-[#1C2E5E] transition-colors mb-2">
                        {issue.title}
                      </h4>
                      <p className="text-sm text-[#6B7280] leading-relaxed line-clamp-2">{issue.teaser}</p>
                    </div>
                    <ArrowRight
                      size={18}
                      className="shrink-0 text-[#CBD0D8] group-hover:text-[#1C2E5E] group-hover:translate-x-1 transition-all duration-200 mt-1"
                    />
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ── PODCAST ── */}
      <section className="py-24 px-6 bg-[#0D1829]">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection direction="left">
              <p className="text-xs font-semibold uppercase tracking-widest text-[#4A66A0] mb-3">The Boardroom AI</p>
              <h2 className="text-[#EEF2F8] mb-4">Conversations That<br />Change Minds</h2>
              <HandwrittenNote size="md" color="#F5A030" rotate={1.5} className="mb-6">
                48 episodes of pure signal
              </HandwrittenNote>
              <p className="text-[#8FA5C8] leading-relaxed mb-8">
                Every two weeks, a conversation with someone who's at the intersection of AI and business leadership. 
                No hype. No vendor pitches. Just honest, senior-level conversation.
              </p>
              <Link
                to="/podcast"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#E8541A] text-white font-semibold hover:bg-[#D03010] transition-colors"
              >
                <Play size={16} fill="white" />
                Listen to the Podcast
              </Link>
            </AnimatedSection>

            <AnimatedSection direction="right" className="space-y-3">
              {episodes.map((ep, i) => (
                <motion.div
                  key={ep.number}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12 }}
                  className="bg-[#162244] rounded-2xl p-5 flex gap-4 items-center hover:bg-[#1C2E5E] transition-colors cursor-pointer group"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#E8541A]/15 flex items-center justify-center shrink-0 group-hover:bg-[#E8541A]/25 transition-colors">
                    <Play size={16} className="text-[#E8541A]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] text-[#4A66A0] font-semibold mb-0.5">{ep.number}</p>
                    <p className="text-sm font-semibold text-[#EEF2F8] leading-snug">{ep.title}</p>
                    <p className="text-xs text-[#4A66A0] mt-0.5">with {ep.guest}</p>
                  </div>
                  <span className="shrink-0 text-xs text-[#4A66A0]">{ep.duration}</span>
                </motion.div>
              ))}
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-24 px-6 bg-white border-y border-[#E8E6E0]">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#9BA3B0] mb-3">From the Boardroom</p>
            <h2 style={{ color: "#0D1829" }}>What Executives Say</h2>
          </AnimatedSection>

          <StaggerContainer className="grid gap-6 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <StaggerItem key={t.name}>
                <div className="h-full bg-[#FAFAF8] rounded-3xl border border-[#E8E6E0] p-7 flex flex-col gap-5 hover:shadow-lg transition-shadow duration-300">
                  {/* Quote mark */}
                  <div
                    style={{
                      fontFamily: "Barlow Condensed, sans-serif",
                      fontSize: "60px",
                      color: "#EEF2F8",
                      lineHeight: 0.8,
                      fontWeight: 800,
                    }}
                  >
                    "
                  </div>
                  <p className="text-[#374151] leading-relaxed text-sm flex-1 -mt-4">
                    {t.quote}
                  </p>
                  {/* Handwritten underline */}
                  <div style={{ fontFamily: "Caveat, cursive", fontSize: "13px", color: "#D97706", transform: "rotate(-0.5deg)" }}>
                    — highly recommended
                  </div>
                  <div className="flex items-center gap-3 pt-2 border-t border-[#E8E6E0]">
                    <div className="w-9 h-9 rounded-full bg-[#1C2E5E] flex items-center justify-center text-white text-sm font-bold">
                      {t.initial}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#1C2E5E]">{t.name}</p>
                      <p className="text-xs text-[#9BA3B0]">{t.title}</p>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ── NEWSLETTER SUBSCRIBE ── */}
      <section className="py-24 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <AnimatedSection>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#9BA3B0] mb-3">Join 2,400+ Executives</p>
            <h2 style={{ color: "#0D1829" }} className="mb-3">
              Start Every Monday<br />Smarter About AI
            </h2>
            <HandwrittenNote size="md" rotate={1} className="mb-6 block">
              Free. No spam. Unsubscribe anytime.
            </HandwrittenNote>
            <p className="text-[#6B7280] mb-8">
              The Executive AI Brief lands in your inbox every Monday. 
              Clear, concise, and built for leaders who don't have time to sift through the noise.
            </p>

            {subscribed ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-[#F0FDF4] border-2 border-[#86EFAC] rounded-2xl p-6"
              >
                <p style={{ fontFamily: "Barlow Condensed, sans-serif", fontSize: "24px", color: "#166534" }}>
                  You're in!
                </p>
                <p className="text-sm text-[#15803D] mt-1">Check your inbox for your first issue next Monday.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="flex-1 px-5 py-3.5 rounded-2xl border-2 border-[#E8E6E0] bg-white text-[#0D1829] placeholder:text-[#CBD0D8] outline-none focus:border-[#1C2E5E] transition-colors text-base"
                />
                <button
                  type="submit"
                  className="px-6 py-3.5 rounded-2xl bg-[#1C2E5E] text-white font-semibold hover:bg-[#162244] transition-colors shadow-md hover:shadow-lg whitespace-nowrap"
                >
                  Subscribe Free
                </button>
              </form>
            )}
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
