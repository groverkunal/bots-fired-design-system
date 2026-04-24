import React, { useState } from "react";
import { motion } from "motion/react";
import { Play, Pause, Mic, ArrowRight, Clock, ExternalLink } from "lucide-react";
import { HandwrittenNote } from "../components/shared/HandwrittenNote";
import { AnimatedSection, StaggerContainer, StaggerItem } from "../components/shared/AnimatedSection";
import { TopicClusterDiagram } from "../components/shared/AIFrameworkDiagram";

const episodes = [
  { num: 48, title: "AI Governance: What Boards Get Wrong", guest: "Former FCA Director", role: "Financial Conduct Authority", duration: "41 min", tag: "Governance", date: "Apr 15, 2026", summary: "Why most boards treat AI governance as a compliance checkbox — and the costly mistakes that follow." },
  { num: 47, title: "Building an AI-Ready Culture", guest: "Sarah Chen", role: "Chief People Officer, Shell", duration: "38 min", tag: "Culture", date: "Apr 1, 2026", summary: "Practical steps for preparing your organisation's people for an AI-augmented workplace." },
  { num: 46, title: "When AI Makes the Decision", guest: "Prof. James Aldridge", role: "AI Ethics, University of Oxford", duration: "52 min", tag: "Ethics", date: "Mar 18, 2026", summary: "The philosophical and legal implications when algorithms make consequential choices." },
  { num: 45, title: "The CFO's Guide to AI ROI", guest: "Anita Sharma", role: "CFO, Unilever", duration: "44 min", tag: "Finance", date: "Mar 4, 2026", summary: "How to build the business case, track returns, and avoid the vanity metrics trap." },
  { num: 44, title: "AI in the Boardroom: A Director's View", guest: "Marcus Webb", role: "Non-Executive Director", duration: "36 min", tag: "Governance", date: "Feb 19, 2026", summary: "What every NED needs to know to fulfil their oversight responsibilities in the AI era." },
  { num: 43, title: "Regulating AI: The View from Brussels", guest: "Dr. Lena Fischer", role: "EU AI Policy Advisor", duration: "48 min", tag: "Regulatory", date: "Feb 5, 2026", summary: "Inside the EU AI Act — what organisations must do to stay compliant and competitive." },
];

const platforms = [
  { name: "Apple Podcasts", color: "#FC3C44", icon: "🎵" },
  { name: "Spotify", color: "#1DB954", icon: "🎧" },
  { name: "Google Podcasts", color: "#4285F4", icon: "🎙️" },
  { name: "Amazon Music", color: "#FF9900", icon: "📻" },
];

const tagColors: Record<string, string> = { Governance: "#EEF2F8", Culture: "#F0FDF4", Ethics: "#FEF3C7", Finance: "#F0F4FF", Regulatory: "#FFF1F2" };

export function PodcastPage() {
  const [playing, setPlaying] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-[#FAFAF8] pt-24">
      {/* HERO */}
      <div className="bg-[#0D1829] border-b border-[#162244]">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#162244] text-[#8FA5C8] text-xs font-semibold uppercase tracking-widest mb-6">
              <Mic size={11} />Podcast
            </span>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-[#EEF2F8] mb-4">The Boardroom AI</h1>
                <HandwrittenNote size="lg" color="#F5A030" rotate={-1.5} className="mb-6 block">48 episodes of real conversations</HandwrittenNote>
                <p className="text-[#8FA5C8] text-lg leading-relaxed mb-8">Bi-weekly conversations with the executives, academics, and regulators shaping how AI intersects with business leadership. No hype. No vendor pitches.</p>
                <div className="flex flex-wrap gap-3">
                  {platforms.map((p) => (
                    <button key={p.name} className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all hover:scale-105" style={{ backgroundColor: p.color + "20", color: p.color, border: `1px solid ${p.color}40` }}>
                      <span>{p.icon}</span>{p.name}
                    </button>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[{ value: "48", label: "Episodes" }, { value: "2wk", label: "Cadence" }, { value: "42min", label: "Avg Length" }, { value: "94%", label: "5-Star Reviews" }].map(({ value, label }) => (
                  <div key={label} className="bg-[#162244] rounded-2xl p-5 text-center">
                    <p style={{ fontFamily: "Barlow Condensed, sans-serif", fontSize: "36px", fontWeight: 800, color: "#EEF2F8", lineHeight: 1 }}>{value}</p>
                    <p className="text-xs text-[#4A66A0] mt-1 font-medium">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* TOPIC MAP */}
        <AnimatedSection className="mb-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-[#9BA3B0] mb-2">What We Cover</p>
              <h2 style={{ color: "#0D1829" }}>Topics That Matter<br />to Senior Leaders</h2>
            </div>
            <HandwrittenNote size="md" rotate={1.5}>everything connects to strategy</HandwrittenNote>
          </div>
          <div className="bg-white rounded-3xl border border-[#E8E6E0] p-8">
            <TopicClusterDiagram />
          </div>
        </AnimatedSection>

        {/* EPISODES */}
        <AnimatedSection className="mb-4">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#9BA3B0] mb-2">All Episodes</p>
          <h2 style={{ color: "#0D1829" }} className="mb-8">Latest Conversations</h2>
        </AnimatedSection>

        <StaggerContainer className="space-y-4">
          {episodes.map((ep, i) => (
            <StaggerItem key={ep.num}>
              <div className="bg-white rounded-2xl border border-[#E8E6E0] p-6 hover:shadow-md hover:border-[#D0DAE8] transition-all duration-300">
                <div className="flex gap-5 items-start">
                  <button onClick={() => setPlaying(playing === ep.num ? null : ep.num)}
                    className="shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-105"
                    style={{ backgroundColor: playing === ep.num ? "#E8541A" : "#EEF2F8" }}>
                    {playing === ep.num
                      ? <Pause size={18} className="text-white" fill="white" />
                      : <Play size={18} className="text-[#1C2E5E]" />}
                  </button>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="text-[10px] font-bold text-[#9BA3B0]" style={{ fontFamily: "JetBrains Mono, monospace" }}>EP. {ep.num}</span>
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-full text-[#1C2E5E]" style={{ backgroundColor: tagColors[ep.tag] || "#EEF2F8" }}>{ep.tag}</span>
                      <span className="text-xs text-[#9BA3B0]">{ep.date}</span>
                      <span className="flex items-center gap-1 text-xs text-[#9BA3B0]"><Clock size={10} />{ep.duration}</span>
                    </div>
                    <h4 className="font-bold text-[#0D1829] mb-1 leading-snug">{ep.title}</h4>
                    <p className="text-sm text-[#6B7280] mb-2">{ep.summary}</p>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-[#1C2E5E] flex items-center justify-center text-white text-[10px] font-bold">{ep.guest[0]}</div>
                      <div>
                        <span className="text-xs font-semibold text-[#374151]">{ep.guest}</span>
                        <span className="text-xs text-[#9BA3B0]"> · {ep.role}</span>
                      </div>
                    </div>
                  </div>
                  <ExternalLink size={16} className="shrink-0 text-[#CBD0D8] hover:text-[#1C2E5E] transition-colors cursor-pointer mt-1" />
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* GUEST CTA */}
        <AnimatedSection className="mt-20 bg-[#1C2E5E] rounded-3xl p-10 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#4A66A0] mb-3">Be a Guest</p>
          <h2 className="text-[#EEF2F8] mb-3">Have a Perspective Worth Sharing?</h2>
          <HandwrittenNote size="md" color="#F5A030" rotate={-1} className="mb-6 block">we'd love to hear from you</HandwrittenNote>
          <p className="text-[#8FA5C8] mb-8 max-w-md mx-auto">We're looking for senior leaders, academics, and practitioners with genuine insight into AI's role in business and governance.</p>
          <button className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#E8541A] text-white font-semibold hover:bg-[#D03010] transition-colors">
            Pitch an Appearance <ArrowRight size={16} />
          </button>
        </AnimatedSection>
      </div>
    </div>
  );
}
