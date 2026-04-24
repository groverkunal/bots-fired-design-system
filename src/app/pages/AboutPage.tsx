import React from "react";
import { motion } from "motion/react";
import { ArrowRight, Linkedin, Twitter, Mail } from "lucide-react";
import { Link } from "react-router";
import { HandwrittenNote } from "../components/shared/HandwrittenNote";
import { AnimatedSection, StaggerContainer, StaggerItem } from "../components/shared/AnimatedSection";

const values = [
  { title: "Clarity over complexity", desc: "We strip away jargon so leaders can focus on decisions, not definitions. If a 12-year-old can't follow it, we rewrite it.", icon: "💡" },
  { title: "Practice over theory", desc: "Every session, every newsletter, every conversation is anchored in what's real, actionable, and relevant to people who run organisations.", icon: "🔧" },
  { title: "Respect for your time", desc: "You're busy. We pack maximum signal into minimum time. No padding, no filler, no 45-slide decks.", icon: "⏱️" },
  { title: "Intellectual honesty", desc: "We won't hype AI beyond its capabilities, and we won't ignore its risks. Our job is your clarity — not our credibility.", icon: "🎯" },
];

const mediaItems = [
  { outlet: "Financial Times", quote: "The go-to AI education resource for serious executives.", date: "March 2026" },
  { outlet: "Harvard Business Review", quote: "BOTS FIRED has cracked the code on making AI strategy accessible to boardrooms.", date: "January 2026" },
  { outlet: "The Economist", quote: "Where C-suite leaders turn when they need to understand AI without the Silicon Valley spin.", date: "November 2025" },
];

const founderImg = "https://images.unsplash.com/photo-1580489944761-15a19d654956?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBleGVjdXRpdmUlMjBwb3J0cmFpdCUyMGNvbmZpZGVudHxlbnwxfHx8fDE3NzY5MDU3MTZ8MA&ixlib=rb-4.1.0&q=80&w=600";

export function AboutPage() {
  return (
    <div className="min-h-screen bg-[#FAFAF8] pt-24">
      {/* HEADER */}
      <div className="bg-white border-b border-[#E8E6E0]">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EEF2F8] text-[#1C2E5E] text-xs font-semibold uppercase tracking-widest mb-4">About</span>
            <h1 style={{ color: "#0D1829" }}>AI Clarity for<br />the People Who Decide</h1>
            <HandwrittenNote size="lg" rotate={-1} className="mt-3 block">no hype, no jargon, just signal</HandwrittenNote>
          </motion.div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16 space-y-24">
        {/* MISSION */}
        <AnimatedSection>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-[#9BA3B0] mb-3">Our Mission</p>
              <h2 style={{ color: "#0D1829" }} className="mb-6">We exist to close<br />the executive AI gap.</h2>
              <p className="text-[#6B7280] leading-relaxed mb-4">There's a widening gap between how fast AI is moving and how fast the leaders responsible for organisations are learning about it. That gap is dangerous.</p>
              <p className="text-[#6B7280] leading-relaxed mb-4">Boards are making decisions about AI without sufficient understanding. Management teams are deploying AI without proper governance. Organisations are either over-investing in hype or under-investing in opportunity.</p>
              <p className="text-[#6B7280] leading-relaxed">BOTS FIRED exists to close that gap — with honest, practical, senior-focused AI education.</p>
            </div>
            <div className="bg-[#1C2E5E] rounded-3xl p-8 text-center">
              <p style={{ fontFamily: "Barlow Condensed, sans-serif", fontSize: "72px", fontWeight: 800, color: "#EEF2F8", lineHeight: 1 }}>2,400+</p>
              <p className="text-[#8FA5C8] mt-2">Senior leaders trained since 2024</p>
              <div className="mt-6 pt-6 border-t border-[#2A4080] grid grid-cols-3 gap-4">
                {[{ v: "94%", l: "Would recommend" }, { v: "52", l: "Newsletter issues" }, { v: "48", l: "Podcast episodes" }].map(({ v, l }) => (
                  <div key={l}>
                    <p style={{ fontFamily: "Barlow Condensed, sans-serif", fontSize: "28px", fontWeight: 800, color: "#F5A030", lineHeight: 1 }}>{v}</p>
                    <p className="text-[10px] text-[#4A66A0] mt-1">{l}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* FOUNDER */}
        <AnimatedSection>
          <p className="text-xs font-semibold uppercase tracking-widest text-[#9BA3B0] mb-8">The Founder</p>
          <div className="grid md:grid-cols-3 gap-10 items-start">
            <div className="md:col-span-1">
              <div className="rounded-2xl overflow-hidden aspect-[3/4] shadow-xl mb-4">
                <img src={founderImg} alt="Founder portrait" className="w-full h-full object-cover" />
              </div>
              <h3 style={{ color: "#1C2E5E" }} className="mb-1">Kunal Grover</h3>
              <p className="text-sm text-[#9BA3B0] mb-4">Founder & Lead Educator, BOTS FIRED</p>
              <div className="flex gap-3">
                {[Linkedin, Twitter, Mail].map((Icon, i) => (
                  <button key={i} className="w-9 h-9 rounded-xl bg-[#EEF2F8] flex items-center justify-center hover:bg-[#1C2E5E] hover:text-white text-[#1C2E5E] transition-all duration-200">
                    <Icon size={15} />
                  </button>
                ))}
              </div>
            </div>
            <div className="md:col-span-2 space-y-4">
              <HandwrittenNote size="lg" rotate={1} color="#D97706">the story behind BOTS FIRED</HandwrittenNote>
              <p className="text-[#374151] leading-relaxed">I spent fifteen years advising boards and leadership teams on technology strategy. And for the last few years, I kept having the same conversation — senior leaders who were smart, experienced, and responsible, but genuinely uncertain about AI.</p>
              <p className="text-[#374151] leading-relaxed">Not because they weren't capable of understanding it. But because everything available was either too technical, too breathless, or too biased towards selling something.</p>
              <p className="text-[#374151] leading-relaxed">BOTS FIRED started as a newsletter. I wrote what I wished existed — honest, clear, jargon-free analysis of AI for people who actually lead organisations. 2,400 subscribers later, it became a training business, a podcast, and a movement of executives who take AI seriously without taking the hype at face value.</p>
              <div className="bg-[#EEF2F8] rounded-2xl p-5 border-l-4 border-[#1C2E5E]">
                <p style={{ fontFamily: "Caveat, cursive", fontSize: "20px", color: "#1C2E5E", lineHeight: 1.4 }}>"My only goal is that when you leave one of our sessions, you feel genuinely clearer. Not more confused. Not sold to. Just clearer."</p>
                <p className="text-xs text-[#9BA3B0] mt-2 font-medium">— Kunal Grover</p>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* VALUES */}
        <AnimatedSection>
          <p className="text-xs font-semibold uppercase tracking-widest text-[#9BA3B0] mb-3">How We Work</p>
          <h2 style={{ color: "#0D1829" }} className="mb-8">Our Approach</h2>
          <StaggerContainer className="grid sm:grid-cols-2 gap-5">
            {values.map((v) => (
              <StaggerItem key={v.title}>
                <div className="bg-white rounded-2xl border border-[#E8E6E0] p-6 h-full hover:shadow-md hover:border-[#D0DAE8] transition-all duration-300">
                  <div className="text-3xl mb-4">{v.icon}</div>
                  <h4 className="font-bold text-[#1C2E5E] mb-2">{v.title}</h4>
                  <p className="text-sm text-[#6B7280] leading-relaxed">{v.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </AnimatedSection>

        {/* MEDIA */}
        <AnimatedSection>
          <p className="text-xs font-semibold uppercase tracking-widest text-[#9BA3B0] mb-3">In the Press</p>
          <h2 style={{ color: "#0D1829" }} className="mb-8">What They Say</h2>
          <StaggerContainer className="grid md:grid-cols-3 gap-5">
            {mediaItems.map((m) => (
              <StaggerItem key={m.outlet}>
                <div className="bg-white rounded-2xl border border-[#E8E6E0] p-6 h-full">
                  <p style={{ fontFamily: "Barlow Condensed, sans-serif", fontSize: "18px", fontWeight: 700, color: "#1C2E5E" }}>{m.outlet}</p>
                  <p className="text-xs text-[#9BA3B0] mb-4">{m.date}</p>
                  <p className="text-[#374151] leading-relaxed text-sm italic">"{m.quote}"</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </AnimatedSection>

        {/* CTA */}
        <AnimatedSection className="text-center">
          <h2 style={{ color: "#0D1829" }} className="mb-3">Ready to Get Started?</h2>
          <HandwrittenNote size="md" rotate={-1} className="mb-6 block">pick whichever works for you</HandwrittenNote>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/newsletter" className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#1C2E5E] text-white font-semibold hover:bg-[#162244] transition-colors">
              Read the Newsletter <ArrowRight size={16} />
            </Link>
            <Link to="/training" className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl border-2 border-[#E8E6E0] bg-white text-[#1C2E5E] font-semibold hover:border-[#1C2E5E] transition-colors">
              Explore Training
            </Link>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}
