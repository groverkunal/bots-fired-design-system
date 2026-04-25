import React, { useState } from "react";
import { motion } from "motion/react";
import { Play, Pause, Mic, Clock, Users, ExternalLink, Headphones } from "lucide-react";
import { HandwrittenNote } from "../components/shared/HandwrittenNote";
import { AnimatedSection, StaggerContainer, StaggerItem } from "../components/shared/AnimatedSection";
import { TopicClusterDiagram } from "../components/shared/AIFrameworkDiagram";

const podcastImg = "https://images.unsplash.com/photo-1774853114355-1ac941f85397?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb2RjYXN0JTIwbWljcm9waG9uZSUyMHN0dWRpbyUyMG1pbmltYWx8ZW58MXx8fHwxNzc2OTA1NzEwfDA&ixlib=rb-4.1.0&q=80&w=1080";

const episodes = [
  { ep: 48, title: "AI Governance: What Boards Get Wrong", guest: "Former Director, UK Financial Conduct Authority", duration: "41 min", topic: "Governance", excerpt: "We explore why most boards are asking the wrong questions about AI oversight, and what a genuinely AI-literate board looks like in 2026.", date: "Apr 18, 2026" },
  { ep: 47, title: "Building an AI-Ready Culture Before the Tools Arrive", guest: "Chief People Officer, Shell", duration: "38 min", topic: "Talent", excerpt: "Culture is the iceberg beneath the AI transformation ship. Here's how HR leaders can prepare the organisation before any model is deployed.", date: "Apr 4, 2026" },
  { ep: 46, title: "When AI Makes the Decision", guest: "Professor of AI Ethics, University of Oxford", duration: "52 min", topic: "Ethics", excerpt: "From credit scoring to medical triage — what's the ethical framework that should govern algorithmic decision-making at executive level?", date: "Mar 21, 2026" },
  { ep: 45, title: "The CEO's First 100 Days with AI", guest: "CEO, Global Logistics Company", duration: "44 min", topic: "Leadership", excerpt: "A candid conversation about what it's actually like to lead an AI transformation from the top — the wins, the political realities, and the surprises.", date: "Mar 7, 2026" },
  { ep: 44, title: "AI and the CFO: Making the Numbers Work", guest: "CFO, FTSE 100 Retailer", duration: "36 min", topic: "Finance", excerpt: "How do you build a business case for AI investment that actually passes the CFO test? A finance leader's inside perspective.", date: "Feb 21, 2026" },
  { ep: 43, title: "Regulating Intelligence: The View from Brussels", guest: "EU AI Policy Lead", duration: "48 min", topic: "Regulatory", excerpt: "The EU AI Act is reshaping global AI strategy. An inside view of how the regulation was written — and what boards need to know now.", date: "Feb 7, 2026" },
];

const platforms = [
  { name: "Spotify",    color: "#1DB954", href: "#" },
  { name: "Apple Podcasts", color: "#D56AFF", href: "#" },
  { name: "YouTube",   color: "#E8541A", href: "#" },
  { name: "Google Podcasts", color: "#4A66A0", href: "#" },
];

const topicColors: Record<string, string> = {
  Governance: "#EEF2F8",
  Talent: "#FDF4FF",
  Ethics: "#FEF3C7",
  Leadership: "#FFF8EC",
  Finance: "#F0FDF4",
  Regulatory: "#FFF1F2",
};

export function PodcastPage() {
  const [playing, setPlaying] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-[#FAFAF8] pt-24">
      {/* Dark hero */}
      <div className="bg-[#0D1829]">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#162244] text-[#8FA5C8] text-xs font-semibold uppercase tracking-widest mb-4">
                <Mic size={11} />
                Bi-Weekly Podcast
              </span>
              <h1 style={{ color: "#EEF2F8" }}>
                The Boardroom AI
              </h1>
              <HandwrittenNote size="lg" color="#F5A030" rotate={-1.5} className="mt-2 block mb-5">
                Conversations that change decisions
              </HandwrittenNote>
              <p className="text-[#8FA5C8] leading-relaxed mb-8 max-w-md">
                Every two weeks, an honest conversation with someone at the intersection of AI and executive leadership. 
                No hype. No jargon. Senior-level signal only.
              </p>

              <div className="flex flex-wrap gap-3">
                {platforms.map(({ name, color, href }) => (
                  <a
                    key={name}
                    href={href}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-[#1C2E5E] text-sm text-[#D0DAE8] hover:border-[#4A66A0] hover:text-white transition-colors"
                  >
                    <Headphones size={13} style={{ color }} />
                    {name}
                  </a>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.15 }}>
              <div className="relative rounded-3xl overflow-hidden aspect-[4/3]">
                <img src={podcastImg} alt="Podcast microphone" className="w-full h-full object-cover opacity-70" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D1829]/90 via-[#0D1829]/30 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-xs text-[#4A66A0] font-semibold uppercase tracking-widest mb-1">Now Playing</p>
                  <p className="text-[#EEF2F8] font-semibold text-sm leading-snug">
                    AI Governance: What Boards Get Wrong
                  </p>
                  <p className="text-[#8FA5C8] text-xs mt-1">Ep. 48 · 41 min</p>
                  <div className="mt-3 flex items-center gap-3">
                    <button
                      onClick={() => setPlaying(playing === 48 ? null : 48)}
                      className="w-10 h-10 rounded-full bg-[#E8541A] flex items-center justify-center hover:bg-[#D03010] transition-colors"
                    >
                      {playing === 48 ? <Pause size={16} className="text-white" /> : <Play size={16} className="text-white" fill="white" />}
                    </button>
                    <div className="flex-1 h-1 bg-[#162244] rounded-full">
                      <div className="h-full w-[35%] bg-[#E8541A] rounded-full" />
                    </div>
                    <span className="text-xs text-[#4A66A0]">41:00</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-6 mt-12 pt-12 border-t border-[#162244]">
            {[
              { val: "48", label: "Episodes" },
              { val: "2 wks", label: "Cadence" },
              { val: "12k+", label: "Monthly Listeners" },
            ].map(({ val, label }) => (
              <div key={label} className="text-center">
                <p style={{ fontFamily: "Barlow Condensed, sans-serif", fontSize: "36px", fontWeight: 800, color: "#EEF2F8", lineHeight: 1 }}>{val}</p>
                <p className="text-xs text-[#4A66A0] mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Topic cluster diagram */}
        <AnimatedSection className="mb-16">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#9BA3B0] mb-3">What We Cover</p>
          <div className="flex flex-col md:flex-row md:items-center gap-8">
            <div className="md:w-64 shrink-0">
              <h2 style={{ color: "#0D1829" }} className="mb-3">Topics We Explore</h2>
              <HandwrittenNote size="sm" rotate={-1.5} className="block mb-3">
                Always through an exec lens
              </HandwrittenNote>
              <p className="text-sm text-[#6B7280]">
                Every episode maps back to the question every executive is asking: 
                "What does this mean for how I lead?"
              </p>
            </div>
            <div className="flex-1">
              <TopicClusterDiagram />
            </div>
          </div>
        </AnimatedSection>

        {/* Episode list */}
        <AnimatedSection className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#9BA3B0] mb-4">All Episodes</p>
          <h2 style={{ color: "#0D1829" }}>Latest Episodes</h2>
        </AnimatedSection>

        <StaggerContainer className="space-y-4">
          {episodes.map((ep) => (
            <StaggerItem key={ep.ep}>
              <div className="bg-white rounded-2xl border border-[#E8E6E0] p-6 hover:shadow-lg hover:border-[#D0DAE8] transition-all duration-300">
                <div className="flex flex-col sm:flex-row sm:items-start gap-5">
                  {/* Play button */}
                  <button
                    onClick={() => setPlaying(playing === ep.ep ? null : ep.ep)}
                    className="shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-200"
                    style={{
                      backgroundColor: playing === ep.ep ? "#E8541A" : topicColors[ep.topic] || "#EEF2F8",
                    }}
                  >
                    {playing === ep.ep
                      ? <Pause size={18} className="text-white" />
                      : <Play size={18} style={{ color: "#1C2E5E" }} />
                    }
                  </button>

                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="text-xs font-semibold text-[#9BA3B0]" style={{ fontFamily: "JetBrains Mono, monospace" }}>Ep. {ep.ep}</span>
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-full text-[#1C2E5E]" style={{ backgroundColor: topicColors[ep.topic] }}>
                        {ep.topic}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-[#9BA3B0]">
                        <Clock size={10} /> {ep.duration}
                      </span>
                      <span className="text-xs text-[#9BA3B0]">{ep.date}</span>
                    </div>

                    <h4 className="font-bold text-[#0D1829] leading-snug mb-1">{ep.title}</h4>

                    <div className="flex items-center gap-1.5 mb-2">
                      <Users size={12} className="text-[#9BA3B0]" />
                      <p className="text-xs text-[#9BA3B0]">{ep.guest}</p>
                    </div>

                    <p className="text-sm text-[#6B7280] leading-relaxed">{ep.excerpt}</p>

                    {/* Progress bar when playing */}
                    {playing === ep.ep && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="mt-4"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-xs text-[#9BA3B0]">0:00</span>
                          <div className="flex-1 h-1.5 bg-[#F1F2F4] rounded-full relative overflow-hidden">
                            <motion.div
                              className="h-full bg-[#E8541A] rounded-full"
                              initial={{ width: "0%" }}
                              animate={{ width: "35%" }}
                              transition={{ duration: 1, ease: "easeOut" }}
                            />
                          </div>
                          <span className="text-xs text-[#9BA3B0]">{ep.duration}</span>
                        </div>
                      </motion.div>
                    )}
                  </div>

                  <a href="#" className="shrink-0 p-2 rounded-xl text-[#9BA3B0] hover:text-[#1C2E5E] hover:bg-[#EEF2F8] transition-colors">
                    <ExternalLink size={16} />
                  </a>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Guest CTA */}
        <AnimatedSection className="mt-16">
          <div className="bg-[#EEF2F8] rounded-3xl p-8 md:p-10 flex flex-col md:flex-row md:items-center gap-6">
            <div className="flex-1">
              <HandwrittenNote size="md" rotate={-1} className="block mb-2">
                Want to be a guest?
              </HandwrittenNote>
              <h3 style={{ fontFamily: "Barlow Condensed, sans-serif", color: "#1C2E5E", fontSize: "24px" }}>
                We interview senior leaders who are navigating AI transformation.
              </h3>
              <p className="text-sm text-[#6B7280] mt-2">
                If you're a C-suite executive, board director, or leading academic with a real-world perspective on AI leadership, we'd love to talk.
              </p>
            </div>
            <a
              href="mailto:podcast@botsfired.com"
              className="shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#1C2E5E] text-white font-semibold hover:bg-[#162244] transition-colors"
            >
              <Mic size={16} />
              Pitch to Appear
            </a>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}
