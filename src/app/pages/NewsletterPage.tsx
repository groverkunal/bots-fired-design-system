import React, { useState } from "react";
import { motion } from "motion/react";
import { ArrowRight, Search, Flame, BookOpen, Clock } from "lucide-react";
import { HandwrittenNote } from "../components/shared/HandwrittenNote";
import { AnimatedSection, StaggerContainer, StaggerItem } from "../components/shared/AnimatedSection";

const issues = [
  { num: "#052", title: "Why Your AI Pilot Failed (And What to Do Next)", tag: "Strategy", date: "Apr 21, 2026", readTime: "6 min", teaser: "Most enterprise AI pilots stall not because of the technology — but because of governance gaps that no-one wants to talk about in the boardroom.", featured: true },
  { num: "#051", title: "The Board's AI Duty: What Every Director Should Know", tag: "Governance", date: "Apr 14, 2026", readTime: "7 min", teaser: "AI isn't just a management agenda item anymore. Boards have fiduciary responsibility for how their organisations adopt and govern AI systems." },
  { num: "#050", title: "ROI or Risk? How to Frame AI for Your CFO", tag: "Finance", date: "Apr 7, 2026", readTime: "5 min", teaser: "The language you use to present AI investments to the finance function will determine whether your initiative gets funded or shelved." },
  { num: "#049", title: "The 5 Questions Every CEO Should Ask Their AI Team", tag: "Leadership", date: "Mar 31, 2026", readTime: "6 min", teaser: "After working with hundreds of executive teams, these are the five questions that separate AI-literate leaders from those who are flying blind." },
  { num: "#048", title: "AI Talent: Build, Buy, or Partner?", tag: "Talent", date: "Mar 24, 2026", readTime: "5 min", teaser: "The talent question is one of the most misunderstood in enterprise AI. Most organisations are solving the wrong problem." },
  { num: "#047", title: "When the Algorithm Decides: AI in High-Stakes Decisions", tag: "Ethics", date: "Mar 17, 2026", readTime: "8 min", teaser: "Credit decisions, hiring, loan approvals, medical triage — AI is making consequential calls. Here's what boards need to know." },
  { num: "#046", title: "The Executive's Guide to Generative AI (No PhD Required)", tag: "Fundamentals", date: "Mar 10, 2026", readTime: "7 min", teaser: "A plain-English explanation of what large language models actually do — and what they definitely can't." },
  { num: "#045", title: "AI Regulation: What's Coming and How to Prepare", tag: "Regulatory", date: "Mar 3, 2026", readTime: "6 min", teaser: "The EU AI Act is already shaping strategy. The UK is watching closely. What does the regulatory horizon mean for your organisation?" },
];

const tags = ["All", "Strategy", "Governance", "Finance", "Leadership", "Ethics", "Talent", "Regulatory", "Fundamentals"];
const tagColors: Record<string, string> = { Strategy: "#EEF2F8", Governance: "#F0F4FF", Finance: "#F0FDF4", Leadership: "#FFF8EC", Ethics: "#FEF3C7", Talent: "#FDF4FF", Regulatory: "#FFF1F2", Fundamentals: "#F0FDFA" };

export function NewsletterPage() {
  const [activeTag, setActiveTag] = useState("All");
  const [query, setQuery] = useState("");
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const filtered = issues.filter((i) => {
    const matchTag = activeTag === "All" || i.tag === activeTag;
    const matchQ = !query || i.title.toLowerCase().includes(query.toLowerCase());
    return matchTag && matchQ;
  });

  const featured = issues[0];

  return (
    <div className="min-h-screen bg-[#FAFAF8] pt-24">
      <div className="bg-white border-b border-[#E8E6E0]">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EEF2F8] text-[#1C2E5E] text-xs font-semibold uppercase tracking-widest mb-4">
              <BookOpen size={11} />Weekly Newsletter
            </span>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
              <div>
                <h1 style={{ color: "#0D1829" }}>The Executive<br />AI Brief</h1>
                <HandwrittenNote size="md" rotate={-1} className="mt-2 block">Every Monday. Clear. Useful. Free.</HandwrittenNote>
              </div>
              <div className="text-right">
                <p style={{ fontFamily: "Barlow Condensed, sans-serif", fontSize: "40px", fontWeight: 800, color: "#1C2E5E", lineHeight: 1 }}>52</p>
                <p className="text-sm text-[#9BA3B0]">issues and counting</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16">
        {!subscribed ? (
          <AnimatedSection className="mb-16 bg-[#1C2E5E] rounded-3xl p-8 md:p-10">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <p style={{ fontFamily: "Caveat, cursive", fontSize: "20px", color: "#F5A030", transform: "rotate(-1deg)", display: "inline-block" }}>Join 2,400+ senior leaders →</p>
                <h3 style={{ fontFamily: "Barlow Condensed, sans-serif", color: "#EEF2F8", fontSize: "28px", fontWeight: 700 }} className="mt-1">Get AI Clarity Every Monday</h3>
                <p className="text-[#8FA5C8] text-sm mt-2">No jargon. No hype. Just what you need to lead in an AI-shaped world.</p>
              </div>
              <form onSubmit={(e) => { e.preventDefault(); if (email) setSubscribed(true); }} className="flex flex-col gap-3">
                <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your.name@company.com"
                  className="px-5 py-3.5 rounded-2xl bg-[#162244] border border-[#2A4080] text-white placeholder:text-[#4A66A0] outline-none focus:border-[#8FA5C8] transition-colors" />
                <button type="submit" className="px-5 py-3.5 rounded-2xl bg-[#E8541A] text-white font-semibold hover:bg-[#D03010] transition-colors flex items-center justify-center gap-2">
                  <Flame size={16} />Subscribe Free
                </button>
              </form>
            </div>
          </AnimatedSection>
        ) : (
          <AnimatedSection className="mb-16 bg-[#F0FDF4] border-2 border-[#86EFAC] rounded-3xl p-8 text-center">
            <p style={{ fontFamily: "Barlow Condensed, sans-serif", fontSize: "28px", color: "#166534" }}>You're on the list!</p>
            <p className="text-[#15803D] mt-1 text-sm">Your first issue lands next Monday. Check your inbox.</p>
          </AnimatedSection>
        )}

        <AnimatedSection className="mb-12">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#9BA3B0] mb-4">Latest Issue</p>
          <div className="bg-white rounded-3xl border-2 border-[#D0DAE8] p-8 md:p-10 hover:shadow-xl transition-shadow duration-300 cursor-pointer group">
            <div className="flex flex-col md:flex-row md:items-start gap-6">
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full text-[#1C2E5E]" style={{ backgroundColor: tagColors[featured.tag] }}>{featured.tag}</span>
                  <span className="text-xs text-[#9BA3B0]" style={{ fontFamily: "JetBrains Mono, monospace" }}>{featured.num}</span>
                  <span className="text-xs text-[#9BA3B0]">{featured.date}</span>
                  <span className="flex items-center gap-1 text-xs text-[#9BA3B0]"><Clock size={11} /> {featured.readTime}</span>
                </div>
                <h2 style={{ color: "#0D1829", fontSize: "clamp(1.4rem, 3vw, 2rem)" }} className="mb-3 group-hover:text-[#1C2E5E] transition-colors">{featured.title}</h2>
                <p className="text-[#6B7280] leading-relaxed">{featured.teaser}</p>
                <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-[#1C2E5E]">
                  Read full issue <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection className="mb-8">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex flex-wrap gap-2">
              {tags.map((t) => (
                <button key={t} onClick={() => setActiveTag(t)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 ${activeTag === t ? "bg-[#1C2E5E] text-white" : "bg-white border border-[#E8E6E0] text-[#6B7280] hover:border-[#1C2E5E] hover:text-[#1C2E5E]"}`}>
                  {t}
                </button>
              ))}
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9BA3B0]" size={14} />
              <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search issues…"
                className="pl-9 pr-4 py-2 rounded-xl border border-[#E8E6E0] bg-white text-sm text-[#0D1829] outline-none focus:border-[#1C2E5E] transition-colors w-48" />
            </div>
          </div>
        </AnimatedSection>

        <StaggerContainer className="space-y-3">
          {filtered.slice(1).map((issue) => (
            <StaggerItem key={issue.num}>
              <div className="group bg-white rounded-2xl border border-[#E8E6E0] p-5 hover:shadow-md hover:border-[#D0DAE8] transition-all duration-300 cursor-pointer flex items-start gap-4">
                <div className="shrink-0 w-16 text-center">
                  <p style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "12px", color: "#9BA3B0" }}>{issue.num}</p>
                  <p className="text-[10px] text-[#CBD0D8] mt-0.5">{issue.readTime}</p>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1.5">
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full text-[#1C2E5E]" style={{ backgroundColor: tagColors[issue.tag] || "#EEF2F8" }}>{issue.tag}</span>
                    <span className="text-xs text-[#9BA3B0]">{issue.date}</span>
                  </div>
                  <h4 className="font-bold text-[#0D1829] group-hover:text-[#1C2E5E] transition-colors leading-snug mb-1">{issue.title}</h4>
                  <p className="text-xs text-[#9BA3B0] leading-relaxed line-clamp-1">{issue.teaser}</p>
                </div>
                <ArrowRight size={16} className="shrink-0 text-[#CBD0D8] group-hover:text-[#1C2E5E] group-hover:translate-x-1 transition-all mt-1" />
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </div>
  );
}
