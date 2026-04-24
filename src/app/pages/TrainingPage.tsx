import React, { useState } from "react";
import { motion } from "motion/react";
import { ArrowRight, Check, Calendar, Users, Clock, MapPin, Video } from "lucide-react";
import { HandwrittenNote } from "../components/shared/HandwrittenNote";
import { AnimatedSection, StaggerContainer, StaggerItem } from "../components/shared/AnimatedSection";
import { TrainingPathwayDiagram } from "../components/shared/AIFrameworkDiagram";

const programs = [
  {
    id: "board-briefing",
    title: "Board Briefing",
    subtitle: "AI Essentials for Directors",
    duration: "3 Hours",
    format: "In-person or virtual",
    groupSize: "6–20 participants",
    price: "£4,500",
    tag: "Entry point",
    color: "#EEF2F8",
    border: "#8FA5C8",
    accent: "#1C2E5E",
    dark: false,
    outcomes: ["Understand what AI is — and what it genuinely can't do", "Identify AI risks and governance obligations for boards", "Ask the right questions of your management team", "Leave with a board-level AI agenda template"],
    ideal: "Non-executive directors, board chairs, and trustees who need fluency without technical depth.",
  },
  {
    id: "half-day",
    title: "Half-Day Intensive",
    subtitle: "AI Strategy for Executives",
    duration: "4 Hours",
    format: "In-person or virtual",
    groupSize: "8–16 participants",
    price: "£6,500",
    tag: "Most popular",
    color: "#FFF8EC",
    border: "#F5A030",
    accent: "#D97706",
    dark: false,
    outcomes: ["Map AI opportunities to your business model", "Evaluate build vs buy vs partner decisions", "Design a governance structure for AI initiatives", "Create a 90-day AI strategy roadmap"],
    ideal: "C-suite executives, MDs, and senior VPs building their first AI strategy.",
  },
  {
    id: "full-day",
    title: "Full-Day Workshop",
    subtitle: "AI Leadership Deep Dive",
    duration: "8 Hours",
    format: "In-person preferred",
    groupSize: "10–20 participants",
    price: "£12,000",
    tag: "Comprehensive",
    color: "#F0F4FF",
    border: "#4A66A0",
    accent: "#2A4080",
    dark: false,
    outcomes: ["Full AI literacy programme across all key domains", "Live case studies from your sector", "Hands-on AI tool demonstrations", "Customised governance framework for your organisation", "Team alignment workshop"],
    ideal: "Full leadership teams who want aligned, organisation-wide AI understanding.",
  },
  {
    id: "cohort",
    title: "4-Week Cohort",
    subtitle: "Executive AI Mastery",
    duration: "4 × 2hr live sessions",
    format: "Virtual (cohort of peers)",
    groupSize: "12–18 executives",
    price: "£2,800 pp",
    tag: "Deepest impact",
    color: "#1C2E5E",
    border: "#2A4080",
    accent: "#F5A030",
    dark: true,
    outcomes: ["Complete AI strategy development for your organisation", "Weekly accountability and peer learning", "1:1 coaching session included", "Ongoing access to resource library", "Certificate of completion"],
    ideal: "Individual senior leaders who want structured, peer-learning over four weeks.",
  },
];

const upcomingDates = [
  { program: "Half-Day Intensive", date: "12 May 2026", location: "London", spots: 4, format: "In-person" },
  { program: "4-Week Cohort", date: "19 May 2026", location: "Virtual", spots: 6, format: "Virtual" },
  { program: "Board Briefing", date: "3 Jun 2026", location: "Manchester", spots: 8, format: "In-person" },
  { program: "Full-Day Workshop", date: "10 Jun 2026", location: "Virtual", spots: 5, format: "Virtual" },
];

export function TrainingPage() {
  const [activeProgram, setActiveProgram] = useState("half-day");
  const [formData, setFormData] = useState({ name: "", email: "", org: "", program: "Half-Day Intensive" });
  const [submitted, setSubmitted] = useState(false);

  const selected = programs.find((p) => p.id === activeProgram) || programs[1];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#FAFAF8] pt-24">
      {/* HERO */}
      <div className="bg-white border-b border-[#E8E6E0]">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EEF2F8] text-[#1C2E5E] text-xs font-semibold uppercase tracking-widest mb-4">
              Executive Training
            </span>
            <div className="grid md:grid-cols-2 gap-8 items-end">
              <div>
                <h1 style={{ color: "#0D1829" }}>AI Mastery<br />Programmes</h1>
                <HandwrittenNote size="md" rotate={-1.5} className="mt-3 block">built for people who lead, not code</HandwrittenNote>
              </div>
              <p className="text-[#6B7280] text-lg leading-relaxed">From 3-hour board briefings to 4-week cohort programmes — practical, facilitated learning for senior leaders who need to make AI decisions with confidence.</p>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* PATHWAY */}
        <AnimatedSection className="mb-20">
          <div className="mb-8">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#9BA3B0] mb-2">The Progression</p>
            <h2 style={{ color: "#0D1829" }}>Find Your Right Programme</h2>
          </div>
          <TrainingPathwayDiagram />
        </AnimatedSection>

        {/* PROGRAMME SELECTOR */}
        <AnimatedSection className="mb-20">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#9BA3B0] mb-4">Programme Detail</p>
          <div className="flex flex-wrap gap-2 mb-8">
            {programs.map((p) => (
              <button key={p.id} onClick={() => setActiveProgram(p.id)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${activeProgram === p.id ? "bg-[#1C2E5E] text-white" : "bg-white border border-[#E8E6E0] text-[#6B7280] hover:border-[#1C2E5E]"}`}>
                {p.title}
              </button>
            ))}
          </div>
          <motion.div key={selected.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}
            className="rounded-3xl border-2 p-8 md:p-10" style={{ backgroundColor: selected.color, borderColor: selected.border }}>
            <div className="grid md:grid-cols-2 gap-10">
              <div>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full mb-3 inline-block" style={{ backgroundColor: selected.dark ? "#162244" : "#fff", color: selected.dark ? "#F5A030" : "#6B7280", border: `1px solid ${selected.border}` }}>{selected.tag}</span>
                <h2 style={{ fontFamily: "Barlow Condensed, sans-serif", color: selected.dark ? "#EEF2F8" : "#1C2E5E", fontSize: "clamp(1.8rem, 3vw, 2.5rem)", fontWeight: 800 }}>{selected.title}</h2>
                <p style={{ color: selected.dark ? "#8FA5C8" : "#6B7280" }} className="text-lg mt-1 mb-6">{selected.subtitle}</p>
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {[
                    { icon: Clock, label: selected.duration },
                    { icon: Users, label: selected.groupSize },
                    { icon: selected.format.includes("Virtual") ? Video : MapPin, label: selected.format },
                  ].map(({ icon: Icon, label }) => (
                    <div key={label} className="flex items-center gap-2">
                      <Icon size={14} style={{ color: selected.accent }} />
                      <span className="text-sm" style={{ color: selected.dark ? "#D0DAE8" : "#374151" }}>{label}</span>
                    </div>
                  ))}
                </div>
                <p style={{ fontFamily: "Barlow Condensed, sans-serif", fontSize: "32px", fontWeight: 800, color: selected.accent, lineHeight: 1 }}>{selected.price}</p>
                <p className="text-xs mt-1" style={{ color: selected.dark ? "#4A66A0" : "#9BA3B0" }}>per session / per person where noted</p>
                <p className="text-sm mt-4 leading-relaxed" style={{ color: selected.dark ? "#8FA5C8" : "#6B7280" }}><strong style={{ color: selected.dark ? "#D0DAE8" : "#374151" }}>Ideal for: </strong>{selected.ideal}</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: selected.dark ? "#4A66A0" : "#9BA3B0" }}>What You'll Leave With</p>
                <ul className="space-y-3">
                  {selected.outcomes.map((o) => (
                    <li key={o} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5" style={{ backgroundColor: selected.accent }}>
                        <Check size={11} className="text-white" />
                      </div>
                      <span className="text-sm leading-snug" style={{ color: selected.dark ? "#D0DAE8" : "#374151" }}>{o}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </AnimatedSection>

        {/* UPCOMING DATES */}
        <AnimatedSection className="mb-20">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#9BA3B0] mb-2">Upcoming Dates</p>
          <h2 style={{ color: "#0D1829" }} className="mb-8">Available Sessions</h2>
          <StaggerContainer className="grid sm:grid-cols-2 gap-4">
            {upcomingDates.map((d) => (
              <StaggerItem key={d.date + d.program}>
                <div className="bg-white rounded-2xl border border-[#E8E6E0] p-5 hover:shadow-md hover:border-[#D0DAE8] transition-all duration-300">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-bold text-[#1C2E5E] mb-1">{d.program}</p>
                      <div className="flex items-center gap-3 text-sm text-[#6B7280]">
                        <span className="flex items-center gap-1"><Calendar size={12} />{d.date}</span>
                        <span className="flex items-center gap-1">{d.format === "Virtual" ? <Video size={12} /> : <MapPin size={12} />}{d.location}</span>
                      </div>
                    </div>
                    <span className="shrink-0 text-xs font-semibold px-2.5 py-1 rounded-full bg-[#F0FDF4] text-[#166534]">{d.spots} spots left</span>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </AnimatedSection>

        {/* ENQUIRY FORM */}
        <AnimatedSection>
          <div className="bg-[#1C2E5E] rounded-3xl p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-12 items-start">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-[#4A66A0] mb-3">Get in Touch</p>
                <h2 className="text-[#EEF2F8] mb-3">Enquire About Training</h2>
                <HandwrittenNote size="md" color="#F5A030" rotate={1.5} className="mb-6 block">we respond within 24 hours</HandwrittenNote>
                <p className="text-[#8FA5C8] leading-relaxed">All programmes can be customised for your organisation, industry, and leadership level. We also offer private group sessions for boards and leadership teams.</p>
              </div>
              {submitted ? (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-[#162244] rounded-2xl p-8 text-center">
                  <div className="w-12 h-12 rounded-full bg-[#E8541A]/20 flex items-center justify-center mx-auto mb-4">
                    <Check size={24} className="text-[#E8541A]" />
                  </div>
                  <p style={{ fontFamily: "Barlow Condensed, sans-serif", fontSize: "24px", color: "#EEF2F8" }}>Enquiry Sent!</p>
                  <p className="text-[#8FA5C8] text-sm mt-2">We'll be in touch within 24 hours.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {[
                    { key: "name", label: "Full Name", type: "text", placeholder: "Your name" },
                    { key: "email", label: "Work Email", type: "email", placeholder: "your@company.com" },
                    { key: "org", label: "Organisation", type: "text", placeholder: "Company name" },
                  ].map(({ key, label, type, placeholder }) => (
                    <div key={key}>
                      <label className="block text-xs font-semibold text-[#8FA5C8] mb-1.5">{label}</label>
                      <input type={type} required placeholder={placeholder}
                        value={(formData as any)[key]} onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#162244] border border-[#2A4080] text-white placeholder:text-[#4A66A0] outline-none focus:border-[#8FA5C8] transition-colors text-sm" />
                    </div>
                  ))}
                  <div>
                    <label className="block text-xs font-semibold text-[#8FA5C8] mb-1.5">Interested Programme</label>
                    <select value={formData.program} onChange={(e) => setFormData({ ...formData, program: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#162244] border border-[#2A4080] text-white outline-none focus:border-[#8FA5C8] transition-colors text-sm">
                      {programs.map((p) => <option key={p.id} value={p.title}>{p.title}</option>)}
                    </select>
                  </div>
                  <button type="submit" className="w-full px-5 py-3.5 rounded-2xl bg-[#E8541A] text-white font-semibold hover:bg-[#D03010] transition-colors flex items-center justify-center gap-2">
                    Send Enquiry <ArrowRight size={16} />
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
