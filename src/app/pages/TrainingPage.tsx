import React, { useState } from "react";
import { motion } from "motion/react";
import { Check, ArrowRight, Calendar, Users, Globe, MapPin, GraduationCap, Flame } from "lucide-react";
import { HandwrittenNote } from "../components/shared/HandwrittenNote";
import { AnimatedSection, StaggerContainer, StaggerItem } from "../components/shared/AnimatedSection";
import { TrainingPathwayDiagram } from "../components/shared/AIFrameworkDiagram";

const trainingImg = "https://images.unsplash.com/photo-1565946590329-fc70903f0ba0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3Jwb3JhdGUlMjB0cmFpbmluZyUyMHdvcmtzaG9wJTIwc2VuaW9yJTIwZXhlY3V0aXZlc3xlbnwxfHx8fDE3NzY5MDU3MTR8MA&ixlib=rb-4.1.0&q=80&w=1080";

const programs = [
  {
    id: "board",
    title: "Board Briefing",
    tagline: "AI literacy for non-executives",
    duration: "3 Hours",
    format: "In-person",
    group: "4–16 participants",
    price: "From £3,500",
    audience: "Non-executive directors, Board Chairs, Trustees",
    outcomes: [
      "Understand what AI can and cannot do",
      "Ask the right questions of your management team",
      "Know your governance obligations around AI",
      "Assess AI risk in board decisions",
    ],
    note: "Most popular starting point",
    color: "#EEF2F8",
    border: "#D0DAE8",
    accent: "#1C2E5E",
    dark: false,
  },
  {
    id: "intensive",
    title: "Half-Day Intensive",
    tagline: "Strategic AI for senior leaders",
    duration: "4 Hours",
    format: "In-person or Virtual",
    group: "6–20 participants",
    price: "From £5,500",
    audience: "C-suite executives, General Counsel, Chief Officers",
    outcomes: [
      "Build a clear AI strategic framework",
      "Identify your highest-value AI use cases",
      "Understand AI talent and build/buy decisions",
      "Navigate vendor selection without being sold to",
    ],
    note: "Best ROI for executive time",
    color: "#FFF8EC",
    border: "#F5A030",
    accent: "#D97706",
    dark: false,
    featured: true,
  },
  {
    id: "workshop",
    title: "Full-Day Workshop",
    tagline: "Deep-dive AI strategy session",
    duration: "8 Hours",
    format: "In-person",
    group: "8–24 participants",
    price: "From £9,500",
    audience: "Senior Leadership Teams, ExCo + Extended Leadership",
    outcomes: [
      "Complete AI readiness assessment for your business",
      "Co-create your 18-month AI roadmap",
      "Develop your AI ethics framework",
      "Build internal AI advocacy and momentum",
    ],
    note: "For transformational change",
    color: "#F0F4FF",
    border: "#8FA5C8",
    accent: "#2A4080",
    dark: false,
  },
  {
    id: "cohort",
    title: "4-Week Cohort",
    tagline: "The flagship executive programme",
    duration: "4 × 90-min live sessions + async",
    format: "Virtual (live + recorded)",
    group: "12–30 participants",
    price: "From £1,200 / person",
    audience: "Executive teams across multiple organisations",
    outcomes: [
      "Complete the AI Clarity Journey (all 4 stages)",
      "Peer learning with executives across sectors",
      "Build a personal AI leadership playbook",
      "Access to alumni community and resource library",
    ],
    note: "Deepest, most lasting impact",
    color: "#1C2E5E",
    border: "#1C2E5E",
    accent: "#F5A030",
    dark: true,
  },
];

const upcomingDates = [
  { program: "Half-Day Intensive", date: "May 14, 2026", location: "London", format: "In-person", spots: 4 },
  { program: "4-Week Cohort", date: "May 19 – Jun 9, 2026", location: "Virtual", format: "Live Online", spots: 8 },
  { program: "Half-Day Intensive", date: "Jun 3, 2026", location: "Singapore", format: "In-person", spots: 6 },
  { program: "Board Briefing", date: "Jun 11, 2026", location: "London", format: "In-person", spots: 2 },
  { program: "4-Week Cohort", date: "Jun 23 – Jul 14, 2026", location: "Virtual", format: "Live Online", spots: 12 },
];

const clientLogos = ["Goldman Sachs", "Deloitte", "HSBC", "Unilever", "NHS", "Rolls-Royce"];

export function TrainingPage() {
  const [active, setActive] = useState("intensive");
  const [formState, setFormState] = useState({ name: "", email: "", org: "", interest: "Half-Day Intensive" });
  const [submitted, setSubmitted] = useState(false);

  const activeProgram = programs.find((p) => p.id === active)!;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#FAFAF8] pt-24">
      {/* Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={trainingImg} alt="Training" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-[#0D1829]/85" />
        </div>
        <div className="relative max-w-6xl mx-auto px-6 py-20">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#162244] text-[#8FA5C8] text-xs font-semibold uppercase tracking-widest mb-4">
              <GraduationCap size={11} />
              Executive Education
            </span>
            <h1 style={{ color: "#EEF2F8" }} className="mb-2">AI Mastery for<br />Senior Leaders</h1>
            <HandwrittenNote size="lg" color="#F5A030" rotate={-1} className="block mb-5">
              Practical. Engaging. Immediately useful.
            </HandwrittenNote>
            <p className="text-[#8FA5C8] max-w-lg leading-relaxed">
              Four programme formats designed around how senior executives actually learn — 
              in focused sessions, with real peers, on real business challenges.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Client logos */}
        <AnimatedSection className="mb-16">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#9BA3B0] text-center mb-6">
            Trusted by senior leaders at
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6">
            {clientLogos.map((org) => (
              <div key={org} className="px-5 py-2.5 rounded-xl border border-[#E8E6E0] bg-white">
                <p className="text-sm font-semibold text-[#9BA3B0]">{org}</p>
              </div>
            ))}
          </div>
        </AnimatedSection>

        {/* Programme Pathway Diagram */}
        <AnimatedSection className="mb-16">
          <div className="mb-8">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#9BA3B0] mb-2">The Learning Pathway</p>
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
              <h2 style={{ color: "#0D1829" }}>Choose Your<br />Programme</h2>
              <HandwrittenNote size="md" rotate={2}>
                No experience needed
              </HandwrittenNote>
            </div>
            <p className="text-[#6B7280] mt-2 max-w-md">
              All programmes are self-contained — you don't need to complete them in order. 
              We'll recommend the right starting point for your context.
            </p>
          </div>
          <TrainingPathwayDiagram />
        </AnimatedSection>

        {/* Programme detail cards */}
        <AnimatedSection className="mb-16">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#9BA3B0] mb-6">Programme Details</p>

          {/* Tab selector */}
          <div className="flex flex-wrap gap-2 mb-8 bg-[#F4F3EF] p-1.5 rounded-2xl w-fit">
            {programs.map((p) => (
              <button
                key={p.id}
                onClick={() => setActive(p.id)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  active === p.id
                    ? "bg-[#1C2E5E] text-white shadow-sm"
                    : "text-[#6B7280] hover:text-[#374151]"
                }`}
              >
                {p.title}
              </button>
            ))}
          </div>

          {/* Detail panel */}
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
          >
            <div className="grid md:grid-cols-3 gap-6">
              {/* Main info */}
              <div
                className="md:col-span-2 rounded-3xl border-2 p-8"
                style={{ backgroundColor: activeProgram.color, borderColor: activeProgram.border }}
              >
                {activeProgram.featured && (
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold mb-4 bg-white" style={{ color: "#D97706" }}>
                    <Flame size={11} /> Most Popular
                  </div>
                )}

                <p
                  className="text-xs font-semibold uppercase tracking-widest mb-1"
                  style={{ color: activeProgram.dark ? "#8FA5C8" : "#9BA3B0" }}
                >
                  {activeProgram.tagline}
                </p>
                <h2
                  style={{
                    fontFamily: "Barlow Condensed, sans-serif",
                    color: activeProgram.dark ? "#EEF2F8" : "#0D1829",
                    fontSize: "clamp(1.8rem, 3vw, 2.5rem)",
                  }}
                >
                  {activeProgram.title}
                </h2>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-5 mb-6">
                  {[
                    { icon: Calendar, label: "Duration", val: activeProgram.duration },
                    { icon: Globe, label: "Format", val: activeProgram.format },
                    { icon: Users, label: "Group Size", val: activeProgram.group },
                  ].map(({ icon: Icon, label, val }) => (
                    <div key={label}>
                      <div className="flex items-center gap-1.5 mb-1">
                        <Icon size={13} style={{ color: activeProgram.dark ? "#4A66A0" : "#9BA3B0" }} />
                        <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: activeProgram.dark ? "#4A66A0" : "#9BA3B0" }}>
                          {label}
                        </p>
                      </div>
                      <p className="text-sm font-semibold" style={{ color: activeProgram.dark ? "#D0DAE8" : "#374151" }}>
                        {val}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mb-5">
                  <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: activeProgram.dark ? "#4A66A0" : "#9BA3B0" }}>
                    Ideal For
                  </p>
                  <p className="text-sm" style={{ color: activeProgram.dark ? "#8FA5C8" : "#6B7280" }}>
                    {activeProgram.audience}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: activeProgram.dark ? "#4A66A0" : "#9BA3B0" }}>
                    What You'll Walk Away With
                  </p>
                  <div className="space-y-2">
                    {activeProgram.outcomes.map((o) => (
                      <div key={o} className="flex items-start gap-2.5">
                        <div
                          className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                          style={{ backgroundColor: activeProgram.accent + "22" }}
                        >
                          <Check size={11} style={{ color: activeProgram.accent }} />
                        </div>
                        <p className="text-sm" style={{ color: activeProgram.dark ? "#8FA5C8" : "#374151" }}>{o}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <p
                  className="mt-6"
                  style={{ fontFamily: "Caveat, cursive", fontSize: "18px", color: activeProgram.accent }}
                >
                  {activeProgram.note}
                </p>
              </div>

              {/* Pricing sidebar */}
              <div className="space-y-4">
                <div className="bg-white rounded-3xl border border-[#E8E6E0] p-6">
                  <p className="text-xs font-semibold uppercase tracking-widest text-[#9BA3B0] mb-1">Investment</p>
                  <p
                    style={{ fontFamily: "Barlow Condensed, sans-serif", fontSize: "28px", color: "#1C2E5E", fontWeight: 800, lineHeight: 1 }}
                  >
                    {activeProgram.price}
                  </p>
                  <p className="text-xs text-[#9BA3B0] mt-1">Per session, per organisation</p>
                  <p style={{ fontFamily: "Caveat, cursive", fontSize: "14px", color: "#D97706", marginTop: "8px" }}>
                    Custom pricing for enterprise
                  </p>
                  <a
                    href="#enquire"
                    className="mt-4 block w-full text-center px-4 py-3 rounded-2xl bg-[#1C2E5E] text-white text-sm font-semibold hover:bg-[#162244] transition-colors"
                  >
                    Enquire Now
                  </a>
                </div>

                <div className="bg-[#EEF2F8] rounded-3xl p-5">
                  <p className="text-xs font-semibold uppercase tracking-widest text-[#9BA3B0] mb-3">Upcoming Dates</p>
                  <div className="space-y-3">
                    {upcomingDates
                      .filter((d) => d.program === activeProgram.title)
                      .slice(0, 3)
                      .map((d) => (
                        <div key={d.date} className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#E8541A] shrink-0 mt-1.5" />
                          <div>
                            <p className="text-xs font-semibold text-[#1C2E5E]">{d.date}</p>
                            <div className="flex items-center gap-1.5 mt-0.5">
                              {d.format === "In-person" ? <MapPin size={10} className="text-[#9BA3B0]" /> : <Globe size={10} className="text-[#9BA3B0]" />}
                              <p className="text-[10px] text-[#9BA3B0]">{d.location} · {d.spots} spots left</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    {upcomingDates.filter((d) => d.program === activeProgram.title).length === 0 && (
                      <p className="text-xs text-[#9BA3B0]">Bespoke dates — contact us to schedule.</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatedSection>

        {/* Enquiry form (inline — no popup) */}
        <AnimatedSection id="enquire" className="mb-8">
          <div className="bg-white rounded-3xl border border-[#E8E6E0] p-8 md:p-10">
            <div className="grid md:grid-cols-2 gap-10 items-start">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-[#9BA3B0] mb-2">Get in Touch</p>
                <h2 style={{ color: "#0D1829" }}>Enquire About<br />Training</h2>
                <HandwrittenNote size="md" rotate={-1.5} className="block mt-2 mb-4">
                  We respond within 24 hours
                </HandwrittenNote>
                <p className="text-[#6B7280] text-sm leading-relaxed">
                  Tell us about your team and we'll recommend the right programme. 
                  We also design bespoke sessions for organisations with specific needs.
                </p>
              </div>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center gap-3 py-12"
                >
                  <div className="w-16 h-16 rounded-full bg-[#F0FDF4] flex items-center justify-center">
                    <Check size={28} className="text-[#22C55E]" />
                  </div>
                  <p style={{ fontFamily: "Barlow Condensed, sans-serif", fontSize: "24px", color: "#1C2E5E" }}>
                    Enquiry received!
                  </p>
                  <p className="text-sm text-[#9BA3B0] text-center">We'll be in touch within 24 hours.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#374151] mb-1.5 uppercase tracking-wider">Name</label>
                      <input
                        required
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        placeholder="Jane Smith"
                        className="w-full px-4 py-3 rounded-xl border border-[#E8E6E0] bg-[#FAFAF8] text-[#0D1829] outline-none focus:border-[#1C2E5E] transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#374151] mb-1.5 uppercase tracking-wider">Work Email</label>
                      <input
                        type="email"
                        required
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        placeholder="jane@company.com"
                        className="w-full px-4 py-3 rounded-xl border border-[#E8E6E0] bg-[#FAFAF8] text-[#0D1829] outline-none focus:border-[#1C2E5E] transition-colors"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#374151] mb-1.5 uppercase tracking-wider">Organisation</label>
                    <input
                      value={formState.org}
                      onChange={(e) => setFormState({ ...formState, org: e.target.value })}
                      placeholder="Company name"
                      className="w-full px-4 py-3 rounded-xl border border-[#E8E6E0] bg-[#FAFAF8] text-[#0D1829] outline-none focus:border-[#1C2E5E] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#374151] mb-1.5 uppercase tracking-wider">Programme Interest</label>
                    <select
                      value={formState.interest}
                      onChange={(e) => setFormState({ ...formState, interest: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-[#E8E6E0] bg-[#FAFAF8] text-[#0D1829] outline-none focus:border-[#1C2E5E] transition-colors appearance-none"
                    >
                      <option>Board Briefing</option>
                      <option>Half-Day Intensive</option>
                      <option>Full-Day Workshop</option>
                      <option>4-Week Cohort</option>
                      <option>Bespoke / Not Sure Yet</option>
                    </select>
                  </div>
                  <button
                    type="submit"
                    className="w-full px-6 py-3.5 rounded-2xl bg-[#1C2E5E] text-white font-semibold hover:bg-[#162244] transition-colors flex items-center justify-center gap-2"
                  >
                    Send Enquiry
                    <ArrowRight size={16} />
                  </button>
                </form>
              )}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}
