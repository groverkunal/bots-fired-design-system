import React from "react";
import { motion } from "motion/react";
import { Linkedin, Twitter, Youtube, ArrowRight, BookOpen, Mic, GraduationCap, Award } from "lucide-react";
import { HandwrittenNote } from "../components/shared/HandwrittenNote";
import { AnimatedSection, StaggerContainer, StaggerItem } from "../components/shared/AnimatedSection";
import { AIFrameworkDiagram } from "../components/shared/AIFrameworkDiagram";

const speakerImg = "https://images.unsplash.com/photo-1758691736821-f1a600c0c3f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxleGVjdXRpdmUlMjBzcGVha2luZyUyMGNvbmZlcmVuY2UlMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzc2OTA1NzEwfDA&ixlib=rb-4.1.0&q=80&w=1080";
const aiImg = "https://images.unsplash.com/photo-1770169272345-9636d5ef2681?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBSSUyMHRlY2hub2xvZ3klMjBhYnN0cmFjdCUyMG5ldXJhbCUyMG5ldHdvcmt8ZW58MXx8fHwxNzc2OTA1NzEwfDA&ixlib=rb-4.1.0&q=80&w=1080";

const approach = [
  {
    num: "01",
    title: "Executives First",
    desc: "Every piece of content is designed specifically for people with serious decisions to make and very little time to waste. No entry-level explanation. No vendor agenda.",
  },
  {
    num: "02",
    title: "Signal Over Noise",
    desc: "I spend 40+ hours a week reading, researching, and synthesising AI developments so you don't have to. You get the 1% that actually matters for your role.",
  },
  {
    num: "03",
    title: "Practical, Not Academic",
    desc: "Every concept connects to a real decision, a real team, a real business challenge. The question I ask of everything: 'what does a senior leader actually do with this?'",
  },
  {
    num: "04",
    title: "Relentlessly Honest",
    desc: "AI is over-hyped and under-governed. I'll tell you when the emperor has no clothes — and when the technology is genuinely transformative. You can trust what you read here.",
  },
];

const mediaItems = [
  { outlet: "Financial Times", title: "Why boards need AI education, not AI consultants", date: "Mar 2026" },
  { outlet: "Harvard Business Review", title: "The C-Suite AI Literacy Gap", date: "Jan 2026" },
  { outlet: "The Economist", title: "Quoted on AI governance in financial services", date: "Nov 2025" },
  { outlet: "BBC Radio 4 Today", title: "AI in the boardroom: a practical guide", date: "Oct 2025" },
  { outlet: "Fortune", title: "50 Voices Shaping AI in Business — 2025", date: "Sep 2025" },
];

const facts = [
  { val: "15+", label: "Years in tech", note: "before AI was cool" },
  { val: "2,400+", label: "Execs trained", note: "and still learning from them" },
  { val: "5", label: "Continents", note: "taught in" },
  { val: "1", label: "Mission", note: "AI clarity for the people who decide" },
];

export function AboutPage() {
  return (
    <div className="min-h-screen bg-[#FAFAF8] pt-24">
      {/* Hero */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EEF2F8] text-[#1C2E5E] text-xs font-semibold uppercase tracking-widest mb-6">
              About BOTS FIRED
            </span>
            <h1 style={{ color: "#0D1829" }} className="mb-3">
              Making AI<br />Make Sense
              <br />
              <span style={{ color: "#1C2E5E", fontStyle: "italic" }}>for Leaders.</span>
            </h1>
            <HandwrittenNote size="lg" rotate={-1.5} className="block mb-6">
              No PhD required, I promise.
            </HandwrittenNote>
            <p className="text-[#6B7280] leading-relaxed mb-6">
              BOTS FIRED exists because there's a dangerous gap between what AI can do 
              and what executive teams understand about it. Decisions are being made — 
              about investment, governance, talent, and strategy — by leaders who are 
              working with incomplete, often misleading, information.
            </p>
            <p className="text-[#6B7280] leading-relaxed mb-8">
              My mission is simple: close that gap. Through a weekly newsletter, 
              a bi-weekly podcast, and immersive executive education, I help the people 
              who make consequential decisions feel genuinely confident about AI.
            </p>
            <div className="flex items-center gap-3">
              {[Linkedin, Twitter, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-xl border border-[#E8E6E0] flex items-center justify-center text-[#9BA3B0] hover:border-[#1C2E5E] hover:text-[#1C2E5E] transition-colors"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="relative"
          >
            <div className="rounded-3xl overflow-hidden aspect-[4/3] shadow-2xl">
              <img src={speakerImg} alt="Speaking at conference" className="w-full h-full object-cover" />
            </div>

            {/* Floating note */}
            <div
              className="absolute -bottom-5 -right-4 bg-white rounded-2xl shadow-xl px-5 py-4 max-w-[220px]"
              style={{ transform: "rotate(1.5deg)" }}
            >
              <p style={{ fontFamily: "Caveat, cursive", fontSize: "17px", color: "#D97706", lineHeight: 1.4 }}>
                "I think about AI the way I think about a great CFO — useful, powerful, but needing governance."
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Stats */}
      <AnimatedSection className="py-16 px-6 bg-white border-y border-[#E8E6E0]">
        <div className="max-w-6xl mx-auto">
          <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {facts.map(({ val, label, note }) => (
              <StaggerItem key={label} className="text-center">
                <p style={{ fontFamily: "Barlow Condensed, sans-serif", fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 800, color: "#1C2E5E", lineHeight: 1 }}>
                  {val}
                </p>
                <p className="text-sm font-semibold text-[#374151] mt-1">{label}</p>
                <p style={{ fontFamily: "Caveat, cursive", fontSize: "15px", color: "#D97706" }}>{note}</p>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </AnimatedSection>

      <div className="max-w-6xl mx-auto px-6">
        {/* My Approach */}
        <section className="py-20">
          <AnimatedSection className="mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#9BA3B0] mb-2">The Philosophy</p>
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
              <h2 style={{ color: "#0D1829" }}>How I Teach<br />AI to Leaders</h2>
              <HandwrittenNote size="md" rotate={1.5}>
                Built from experience, not theory
              </HandwrittenNote>
            </div>
          </AnimatedSection>

          <StaggerContainer className="grid gap-6 sm:grid-cols-2">
            {approach.map(({ num, title, desc }) => (
              <StaggerItem key={num}>
                <div className="bg-white rounded-2xl border border-[#E8E6E0] p-7 h-full hover:shadow-md transition-shadow duration-300">
                  <div className="flex items-start gap-4">
                    <p
                      style={{
                        fontFamily: "Barlow Condensed, sans-serif",
                        fontSize: "40px",
                        fontWeight: 800,
                        color: "#EEF2F8",
                        lineHeight: 1,
                        flexShrink: 0,
                      }}
                    >
                      {num}
                    </p>
                    <div>
                      <h4 style={{ color: "#1C2E5E", fontSize: "18px" }} className="mb-2">{title}</h4>
                      <p className="text-sm text-[#6B7280] leading-relaxed">{desc}</p>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </section>

        {/* The Framework I Teach */}
        <section className="py-4 pb-20">
          <AnimatedSection className="mb-10">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#9BA3B0] mb-2">The Core Framework</p>
            <h2 style={{ color: "#0D1829" }}>The AI Clarity Journey</h2>
            <p className="text-[#6B7280] mt-2 max-w-xl">
              This four-stage framework underpins everything I teach. Every newsletter, 
              podcast episode, and training session is mapped to one of these stages.
            </p>
          </AnimatedSection>
          <AIFrameworkDiagram />
        </section>

        {/* Media */}
        <AnimatedSection className="py-4 pb-20">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-[#9BA3B0] mb-2">In the Press</p>
              <h2 style={{ color: "#0D1829" }}>Media &amp; Speaking</h2>
            </div>
            <HandwrittenNote size="md" rotate={-1}>
              Yes, I enjoy public speaking
            </HandwrittenNote>
          </div>

          <div className="space-y-3">
            {mediaItems.map((m) => (
              <div key={m.title} className="group bg-white rounded-2xl border border-[#E8E6E0] px-6 py-4 flex items-center gap-4 hover:shadow-md hover:border-[#D0DAE8] transition-all duration-300 cursor-pointer">
                <div className="w-28 shrink-0">
                  <p className="text-xs font-bold text-[#1C2E5E]">{m.outlet}</p>
                  <p className="text-[10px] text-[#9BA3B0] mt-0.5">{m.date}</p>
                </div>
                <p className="flex-1 text-sm font-medium text-[#374151] group-hover:text-[#1C2E5E] transition-colors">
                  {m.title}
                </p>
                <ArrowRight size={14} className="shrink-0 text-[#CBD0D8] group-hover:text-[#1C2E5E] group-hover:translate-x-1 transition-all" />
              </div>
            ))}
          </div>
        </AnimatedSection>

        {/* Offering summary */}
        <AnimatedSection className="pb-20">
          <div className="bg-[#1C2E5E] rounded-3xl p-8 md:p-10">
            <div className="text-center mb-10">
              <HandwrittenNote size="lg" color="#F5A030" rotate={-1} className="block mb-2">
                Three ways to work together
              </HandwrittenNote>
              <h2 style={{ color: "#EEF2F8" }}>Everything BOTS FIRED Offers</h2>
            </div>
            <StaggerContainer className="grid gap-4 md:grid-cols-3">
              {[
                { icon: BookOpen, title: "Newsletter", desc: "The Executive AI Brief. Every Monday. Free.", to: "/newsletter", cta: "Subscribe" },
                { icon: Mic, title: "Podcast", desc: "The Boardroom AI. Bi-weekly conversations. Free.", to: "/podcast", cta: "Listen" },
                { icon: GraduationCap, title: "Training", desc: "From board briefings to 4-week cohorts.", to: "/training", cta: "Enquire" },
              ].map(({ icon: Icon, title, desc, to, cta }) => (
                <StaggerItem key={title}>
                  <div className="bg-[#162244] rounded-2xl p-6 h-full flex flex-col gap-4 hover:bg-[#0D1829] transition-colors">
                    <div className="w-10 h-10 rounded-xl bg-[#1C2E5E] flex items-center justify-center">
                      <Icon size={18} className="text-[#F5A030]" />
                    </div>
                    <div>
                      <h4 style={{ fontFamily: "Barlow Condensed, sans-serif", color: "#EEF2F8", fontSize: "20px" }}>{title}</h4>
                      <p className="text-sm text-[#8FA5C8] mt-1">{desc}</p>
                    </div>
                    <a href={to} className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#F5A030] hover:gap-2.5 transition-all mt-auto">
                      {cta} <ArrowRight size={13} />
                    </a>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}
