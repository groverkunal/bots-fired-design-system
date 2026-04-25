import React, { useState } from "react";
import { motion } from "motion/react";
import { BFLogoSVG, BFPhotoLogo } from "./BFLogoSVG";
import { HandwrittenNote } from "../shared/HandwrittenNote";
import { AnimatedSection, StaggerContainer, StaggerItem } from "../shared/AnimatedSection";
import { Linkedin, Twitter, Instagram, Mail, MapPin, Phone, Globe, Star, ArrowRight } from "lucide-react";

const avatar = "https://images.unsplash.com/photo-1771898343647-bd979ad8cca5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBoZWFkc2hvdCUyMGV4ZWN1dGl2ZSUyMHBvcnRyYWl0fGVufDF8fHx8MTc3NjkwNjQwNnww&ixlib=rb-4.1.0&q=80&w=400";

function SectionTitle({ label, title, note }: { label: string; title: string; note?: string }) {
  return (
    <div className="mb-6">
      <p className="text-xs font-semibold uppercase tracking-widest text-[#9BA3B0] mb-1">{label}</p>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <h3 style={{ fontFamily: "Barlow Condensed, sans-serif", color: "#1C2E5E", fontSize: "28px", fontWeight: 700 }}>{title}</h3>
        {note && <HandwrittenNote size="sm" rotate={-1}>{note}</HandwrittenNote>}
      </div>
    </div>
  );
}

/* ── PROFILE CARDS (4 styles) ── */
function ProfileCards() {
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {/* Style 1: Executive Card */}
      <div className="bg-white rounded-3xl border border-[#E8E6E0] overflow-hidden shadow-sm">
        <div className="h-20 bg-[#1C2E5E] relative">
          <div className="absolute bottom-0 right-6">
            <BFLogoSVG variant="icon" theme="white" width={60} />
          </div>
        </div>
        <div className="px-6 pb-6 -mt-8">
          <div className="w-16 h-16 rounded-2xl overflow-hidden border-4 border-white shadow-lg">
            <img src={avatar} alt="Profile" className="w-full h-full object-cover" />
          </div>
          <div className="mt-3">
            <p style={{ fontFamily: "Barlow Condensed, sans-serif", fontSize: "22px", fontWeight: 700, color: "#0D1829" }}>Alexandra Chen</p>
            <p className="text-xs font-semibold text-[#E8541A] uppercase tracking-wider">Chief AI Strategy Officer</p>
            <p className="text-xs text-[#9BA3B0] mt-0.5">Global Financial Holdings · London</p>
          </div>
          <p className="text-xs text-[#6B7280] mt-3 leading-relaxed">
            Board-level AI advisor with 20 years leading digital transformation across FTSE 100 and Fortune 500 organisations.
          </p>
          <div className="flex items-center gap-2 mt-3">
            {[Linkedin, Twitter, Globe].map((Icon, i) => (
              <div key={i} className="w-7 h-7 rounded-lg bg-[#EEF2F8] flex items-center justify-center">
                <Icon size={13} className="text-[#1C2E5E]" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Style 2: Minimal Horizontal */}
      <div className="bg-[#FAFAF8] rounded-3xl border border-[#E8E6E0] p-6">
        <div className="flex gap-4 items-start">
          <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0">
            <img src={avatar} alt="Profile" className="w-full h-full object-cover" />
          </div>
          <div className="flex-1">
            <p style={{ fontFamily: "Barlow Condensed, sans-serif", fontSize: "20px", fontWeight: 700, color: "#0D1829" }}>David Okafor</p>
            <p className="text-xs text-[#E8541A] font-semibold">CEO · BOTS FIRED</p>
            <p className="text-xs text-[#9BA3B0] mt-1">AI Educator for C-Suite | Newsletter Author | Podcast Host</p>
            <div className="mt-3 pt-3 border-t border-[#E8E6E0] flex items-center justify-between">
              <div className="flex gap-1.5">
                {["AI Strategy","Governance","Leadership"].map((tag) => (
                  <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-[#EEF2F8] text-[#1C2E5E] font-semibold">{tag}</span>
                ))}
              </div>
              <BFLogoSVG variant="icon" theme="color" width={50} />
            </div>
          </div>
        </div>
      </div>

      {/* Style 3: Dark Premium */}
      <div className="bg-[#0D1829] rounded-3xl p-6">
        <div className="flex flex-col items-center text-center gap-4">
          <div className="relative">
            <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-[#E8541A]">
              <img src={avatar} alt="Profile" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-[#E8541A] flex items-center justify-center">
              <span className="text-white text-[10px] font-bold">AI</span>
            </div>
          </div>
          <div>
            <p style={{ fontFamily: "Barlow Condensed, sans-serif", fontSize: "22px", fontWeight: 700, color: "#EEF2F8" }}>Priya Mehta</p>
            <p className="text-xs text-[#F5A030] font-semibold mt-0.5">Board Director · AI Governance Lead</p>
            <p style={{ fontFamily: "Caveat, cursive", fontSize: "14px", color: "#8FA5C8", marginTop: "4px" }}>
              "Making AI comprehensible for decision-makers"
            </p>
          </div>
          <div className="flex gap-3">
            {[Linkedin, Twitter, Mail].map((Icon, i) => (
              <div key={i} className="w-8 h-8 rounded-xl bg-[#162244] flex items-center justify-center">
                <Icon size={13} className="text-[#8FA5C8]" />
              </div>
            ))}
          </div>
          <div className="w-full border-t border-[#162244] pt-3">
            <BFLogoSVG variant="full" theme="white" width={160} />
          </div>
        </div>
      </div>

      {/* Style 4: Handwritten Accent */}
      <div className="bg-white rounded-3xl border-2 border-[#F5A030]/30 p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-24 h-24 bg-[#FFF8EC] rounded-bl-3xl flex items-center justify-center">
          <BFLogoSVG variant="icon" theme="color" width={70} />
        </div>
        <div className="flex gap-4 items-start pr-20">
          <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0">
            <img src={avatar} alt="Profile" className="w-full h-full object-cover" />
          </div>
          <div>
            <p style={{ fontFamily: "Barlow Condensed, sans-serif", fontSize: "20px", fontWeight: 700, color: "#0D1829" }}>James Whitfield</p>
            <p className="text-xs font-semibold text-[#6B7280]">Chief Technology Officer</p>
          </div>
        </div>
        <p style={{ fontFamily: "Caveat, cursive", fontSize: "17px", color: "#D97706", transform: "rotate(-1deg)", marginTop: "12px", display: "block" }}>
          "I read BOTS FIRED every Monday without fail"
        </p>
        <div className="mt-3 flex items-center gap-2 text-xs text-[#9BA3B0]">
          <MapPin size={11} /> London, UK ·
          <Globe size={11} /> FTSE 100 company
        </div>
        <div className="mt-3 flex">
          {[1,2,3,4,5].map((s) => <Star key={s} size={13} className="text-[#F5A030]" fill="#F5A030" />)}
          <span className="text-xs text-[#9BA3B0] ml-2">BOTS FIRED Subscriber</span>
        </div>
      </div>
    </div>
  );
}

/* ── RESUME / EXECUTIVE PROFILE (4 styles) ── */
function ResumeTemplates() {
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {/* Style 1: Full Resume Header */}
      <div className="bg-white rounded-3xl border border-[#E8E6E0] overflow-hidden">
        <div className="bg-[#1C2E5E] px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-xl overflow-hidden border-2 border-[#4A66A0]">
              <img src={avatar} alt="" className="w-full h-full object-cover" />
            </div>
            <div>
              <p style={{ fontFamily: "Barlow Condensed, sans-serif", fontSize: "24px", fontWeight: 800, color: "#EEF2F8" }}>ALEX MORGAN</p>
              <p className="text-xs font-semibold text-[#F5A030] uppercase tracking-wider">Chief AI Officer · Board Advisor</p>
              <div className="flex items-center gap-3 mt-1 text-[10px] text-[#8FA5C8]">
                <span>📧 alex@company.com</span>
                <span>🔗 linkedin.com/in/alex</span>
              </div>
            </div>
          </div>
          <BFLogoSVG variant="icon" theme="white" width={50} />
        </div>
        <div className="px-6 py-4 space-y-3">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#9BA3B0] mb-1.5">Summary</p>
            <p className="text-xs text-[#6B7280] leading-relaxed">20-year career leading digital and AI transformation for FTSE 100 and global financial institutions. Board-level AI governance expert.</p>
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#9BA3B0] mb-1.5">Current Role</p>
            <div className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-[#E8541A] mt-1.5 shrink-0" />
              <div>
                <p className="text-xs font-semibold text-[#1C2E5E]">Chief AI Officer · GlobalBank</p>
                <p className="text-[10px] text-[#9BA3B0]">2022 – Present · London, UK</p>
              </div>
            </div>
          </div>
          <div className="pt-2 border-t border-[#F4F3EF] flex items-center justify-between">
            <p className="text-[10px] text-[#9BA3B0]">Prepared with AI literacy support from</p>
            <BFLogoSVG variant="wordmark" theme="color" width={100} />
          </div>
        </div>
      </div>

      {/* Style 2: Minimal clean */}
      <div className="bg-[#FAFAF8] rounded-3xl border border-[#E8E6E0] p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-xl overflow-hidden">
                <img src={avatar} alt="" className="w-full h-full object-cover" />
              </div>
              <div>
                <p style={{ fontFamily: "Barlow Condensed, sans-serif", fontSize: "20px", fontWeight: 700, color: "#0D1829" }}>SARAH OKONKWO</p>
                <p className="text-xs text-[#E8541A] font-semibold">Non-Executive Director</p>
              </div>
            </div>
          </div>
        </div>
        <div className="space-y-2">
          {["FTSE 100 Board Director","AI Governance Specialist","Former McKinsey Partner"].map((item) => (
            <div key={item} className="flex items-center gap-2">
              <div className="w-1 h-1 rounded-full bg-[#E8541A]" />
              <p className="text-xs text-[#6B7280]">{item}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 pt-3 border-t border-[#E8E6E0]">
          <p style={{ fontFamily: "Caveat, cursive", fontSize: "15px", color: "#D97706" }}>
            BOTS FIRED AI Education Alumni · Cohort 12
          </p>
        </div>
      </div>

      {/* Style 3: Printed Note style */}
      <div className="bg-[#FFFEF5] rounded-3xl border border-[#F5A030]/30 p-6" style={{ backgroundImage: "repeating-linear-gradient(transparent, transparent 27px, #E8E6E0 28px)" }}>
        <div className="flex items-center justify-between mb-4">
          <BFPhotoLogo height={32} />
          <span className="text-[10px] text-[#9BA3B0]">Executive Profile · Confidential</span>
        </div>
        <div className="space-y-1">
          <p style={{ fontFamily: "Barlow Condensed, sans-serif", fontSize: "26px", fontWeight: 800, color: "#1C2E5E" }}>MARCUS STEINBERG</p>
          <p className="text-xs font-semibold text-[#6B7280]">Group CEO · Technology Holdings PLC</p>
          <p style={{ fontFamily: "Caveat, cursive", fontSize: "17px", color: "#D97706" }}>
            "Leading AI transformation at scale since 2019"
          </p>
          <div className="pt-3 text-xs text-[#9BA3B0] space-y-1">
            <div className="flex items-center gap-2"><Mail size={10} /> marcus@techholdings.com</div>
            <div className="flex items-center gap-2"><Phone size={10} /> Available for board appointments</div>
            <div className="flex items-center gap-2"><MapPin size={10} /> London · Singapore · New York</div>
          </div>
        </div>
      </div>

      {/* Style 4: AI-badge style */}
      <div className="bg-[#1C2E5E] rounded-3xl p-6">
        <div className="flex items-start justify-between mb-4">
          <BFLogoSVG variant="stacked" theme="white" width={80} />
          <div className="text-right">
            <span className="text-[10px] font-bold px-2 py-1 rounded-full text-[#F5A030]" style={{ backgroundColor: "#162244" }}>
              AI CERTIFIED LEADER
            </span>
          </div>
        </div>
        <div className="mt-2">
          <div className="w-12 h-12 rounded-xl overflow-hidden border-2 border-[#4A66A0] mb-3">
            <img src={avatar} alt="" className="w-full h-full object-cover" />
          </div>
          <p style={{ fontFamily: "Barlow Condensed, sans-serif", fontSize: "24px", fontWeight: 800, color: "#EEF2F8" }}>DR. NINA OSEI</p>
          <p className="text-xs text-[#F5A030] font-semibold mt-0.5">Chief Digital Officer · Academic Trustee</p>
          <div className="mt-3 grid grid-cols-2 gap-2">
            {["Cohort Programme","Newsletter","Podcast Guest","Board Advisory"].map((badge) => (
              <div key={badge} className="text-[9px] px-2 py-1 rounded-lg text-center text-[#8FA5C8] border border-[#2A4080]">{badge}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── SOCIAL MEDIA TEMPLATES ── */
function SocialTemplates() {
  const posts = [
    {
      platform: "LinkedIn Post",
      w: "100%",
      content: (
        <div className="bg-white rounded-2xl border border-[#E8E6E0] overflow-hidden text-sm">
          <div className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-9 h-9 rounded-full overflow-hidden">
                <img src={avatar} alt="" className="w-full h-full object-cover" />
              </div>
              <div>
                <p className="text-xs font-bold text-[#0D1829]">BOTS FIRED</p>
                <p className="text-[10px] text-[#9BA3B0]">AI Education · 12,400 followers</p>
              </div>
            </div>
            <div className="bg-[#EEF2F8] rounded-xl p-4 mb-3">
              <p className="text-xs font-bold text-[#1C2E5E] mb-1">This week in the Executive AI Brief:</p>
              <p className="text-xs text-[#374151] leading-relaxed">"Your board isn't asking the wrong questions about AI. They're asking no questions at all. Here's how to change that." 🔥</p>
              <p style={{ fontFamily: "Caveat, cursive", fontSize: "14px", color: "#D97706", marginTop: "8px" }}>— Issue #052</p>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex gap-2 text-[10px] text-[#9BA3B0]">
                <span>👍 842</span><span>💬 67</span><span>↗ 234</span>
              </div>
              <BFLogoSVG variant="icon" theme="color" width={40} />
            </div>
          </div>
        </div>
      ),
    },
    {
      platform: "Twitter/X Thread",
      content: (
        <div className="bg-white rounded-2xl border border-[#E8E6E0] overflow-hidden">
          <div className="p-4 space-y-3">
            {[
              "Thread: Why most AI pilots fail — and it's not the technology 🧵 (1/5)",
              "1/ The #1 reason AI pilots fail: governance gaps. Not the model. Not the data. The *leadership* decision around who owns the output.",
              "2/ CEOs who succeed with AI ask ONE question before launch: 'Who is accountable when this is wrong?' Can your team answer it?",
            ].map((tweet, i) => (
              <div key={i} className="flex gap-2">
                <div className="w-8 h-8 rounded-full overflow-hidden shrink-0">
                  <img src={avatar} alt="" className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-[#0D1829]">BOTS FIRED <span className="text-[#9BA3B0] font-normal">@botsfired</span></p>
                  <p className="text-xs text-[#374151] mt-0.5 leading-relaxed">{tweet}</p>
                  {i === 0 && <div className="flex gap-3 mt-1 text-[9px] text-[#9BA3B0]"><span>💬 45</span><span>🔁 128</span><span>❤️ 891</span></div>}
                </div>
              </div>
            ))}
          </div>
          <div className="border-t border-[#E8E6E0] px-4 py-2 flex justify-end">
            <BFLogoSVG variant="wordmark" theme="color" width={100} />
          </div>
        </div>
      ),
    },
    {
      platform: "Instagram Square (1:1)",
      content: (
        <div className="aspect-square rounded-2xl overflow-hidden bg-[#1C2E5E] flex flex-col items-center justify-center gap-4 p-6 relative">
          <div className="absolute top-4 right-4">
            <BFLogoSVG variant="icon" theme="white" width={40} />
          </div>
          <p style={{ fontFamily: "Barlow Condensed, sans-serif", fontSize: "32px", fontWeight: 800, color: "#EEF2F8", textAlign: "center", lineHeight: 1.1 }}>
            "AI won't replace executives who understand it."
          </p>
          <p style={{ fontFamily: "Caveat, cursive", fontSize: "18px", color: "#F5A030", transform: "rotate(-1deg)" }}>
            — BOTS FIRED Newsletter
          </p>
          <div className="absolute bottom-4 left-0 right-0 flex justify-center">
            <p className="text-[10px] text-[#4A66A0]">@botsfired · #AILeadership #CsuiteAI</p>
          </div>
        </div>
      ),
    },
    {
      platform: "Instagram Story (9:16)",
      content: (
        <div className="rounded-2xl overflow-hidden bg-gradient-to-b from-[#0D1829] to-[#1C2E5E] flex flex-col p-5 gap-3" style={{ aspectRatio: "9/16", maxHeight: "320px" }}>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-[#E8541A] flex items-center justify-center">
              <span style={{ fontFamily: "Barlow Condensed, sans-serif", fontSize: "10px", fontWeight: 800, color: "#fff" }}>BF</span>
            </div>
            <p className="text-[11px] text-[#8FA5C8] font-semibold">botsfired</p>
          </div>
          <div className="flex-1 flex flex-col justify-center gap-3">
            <p className="text-[10px] font-bold text-[#4A66A0] uppercase tracking-widest">This Week's Insight</p>
            <p style={{ fontFamily: "Barlow Condensed, sans-serif", fontSize: "22px", fontWeight: 800, color: "#EEF2F8", lineHeight: 1.15 }}>
              The Board's AI Duty
            </p>
            <p className="text-xs text-[#8FA5C8] leading-relaxed">Issue #051 · 7 min read · Every Monday</p>
            <div className="bg-[#162244] rounded-xl p-3">
              <p className="text-xs text-[#D0DAE8] leading-relaxed">"Boards have fiduciary responsibility for how AI is governed. Are you asking the right questions?"</p>
            </div>
          </div>
          <div className="text-center">
            <p className="text-[10px] text-[#4A66A0] mb-1">Swipe up to read</p>
            <BFLogoSVG variant="full" theme="white" width={120} />
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="grid gap-5 sm:grid-cols-2">
      {posts.map(({ platform, content }) => (
        <div key={platform} className="space-y-2">
          <p className="text-xs font-semibold text-[#6B7280] uppercase tracking-wide">{platform}</p>
          {content}
        </div>
      ))}
    </div>
  );
}

/* ── NEWSLETTER HEADERS ── */
function NewsletterHeaders() {
  return (
    <div className="space-y-5">
      {/* Style 1 */}
      <div className="rounded-2xl overflow-hidden border border-[#E8E6E0]">
        <div className="bg-[#1C2E5E] px-8 py-5 flex items-center justify-between">
          <BFLogoSVG variant="full" theme="white" width={180} />
          <div className="text-right">
            <p className="text-xs text-[#8FA5C8]">Issue #052 · Apr 21, 2026</p>
            <p style={{ fontFamily: "Caveat, cursive", fontSize: "14px", color: "#F5A030" }}>Every Monday</p>
          </div>
        </div>
        <div className="bg-white px-8 py-4">
          <p className="text-[10px] font-bold text-[#9BA3B0] uppercase tracking-widest mb-1">This Week</p>
          <h4 style={{ fontFamily: "Barlow Condensed, sans-serif", fontSize: "22px", color: "#0D1829", fontWeight: 700 }}>Why Your AI Pilot Failed (And What to Do Next)</h4>
        </div>
      </div>

      {/* Style 2 — Warm/minimal */}
      <div className="rounded-2xl overflow-hidden border border-[#F5A030]/30">
        <div className="bg-[#FFF8EC] px-8 py-5">
          <div className="flex items-center justify-between mb-3">
            <BFPhotoLogo height={36} />
            <span className="text-xs text-[#9BA3B0]">The Executive AI Brief</span>
          </div>
          <div className="border-l-4 border-[#E8541A] pl-4">
            <p style={{ fontFamily: "Caveat, cursive", fontSize: "20px", color: "#D97706" }}>Hello, Leader 👋</p>
            <p className="text-xs text-[#6B7280] mt-1">Welcome to this week's AI clarity. Let's get into it.</p>
          </div>
        </div>
      </div>

      {/* Style 3 — Dark editorial */}
      <div className="rounded-2xl overflow-hidden">
        <div className="bg-[#0D1829] px-8 py-6 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <p className="text-[10px] font-bold text-[#4A66A0] uppercase tracking-widest">BOTS FIRED · WEEKLY</p>
            <p className="text-[10px] text-[#4A66A0]">Issue #052 · Apr 21</p>
          </div>
          <p style={{ fontFamily: "Barlow Condensed, sans-serif", fontSize: "30px", fontWeight: 800, color: "#EEF2F8", lineHeight: 1.1 }}>
            The Executive AI Brief
          </p>
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-[#162244]" />
            <BFLogoSVG variant="icon" theme="white" width={40} />
            <div className="flex-1 h-px bg-[#162244]" />
          </div>
        </div>
      </div>

      {/* Style 4 — Print-friendly */}
      <div className="rounded-2xl overflow-hidden border border-[#E8E6E0] bg-white px-8 py-5">
        <div className="flex items-center justify-between border-b-2 border-[#E8541A] pb-4">
          <BFLogoSVG variant="wordmark" theme="color" width={160} />
          <div className="text-right text-xs text-[#9BA3B0]">
            <p>Vol. 2 · Issue 52</p>
            <p>Monday, April 21, 2026</p>
          </div>
        </div>
        <div className="pt-3 flex items-center gap-3">
          <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#EEF2F8] text-[#1C2E5E]">Strategy</span>
          <p className="text-xs text-[#9BA3B0]">6 minute read</p>
        </div>
      </div>
    </div>
  );
}

/* ── BLOG HEADERS (4 styles) ── */
function BlogHeaders() {
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      {/* Style 1 */}
      <div className="bg-white rounded-2xl border border-[#E8E6E0] overflow-hidden">
        <div className="h-24 bg-[#EEF2F8] flex items-center justify-center">
          <p style={{ fontFamily: "Barlow Condensed, sans-serif", fontWeight: 800, fontStyle: "italic", fontSize: "18px", color: "#CBD0D8" }}>COVER IMAGE</p>
        </div>
        <div className="p-5">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#EEF2F8] text-[#1C2E5E]">Governance</span>
            <span className="text-[10px] text-[#9BA3B0]">Apr 21, 2026 · 6 min</span>
          </div>
          <h4 style={{ fontFamily: "Barlow Condensed, sans-serif", fontSize: "20px", fontWeight: 700, color: "#0D1829" }}>The Board's AI Duty</h4>
          <div className="mt-3 flex items-center gap-2">
            <div className="w-6 h-6 rounded-full overflow-hidden"><img src={avatar} alt="" className="w-full h-full object-cover" /></div>
            <p className="text-[10px] text-[#6B7280]">By BOTS FIRED · <span className="text-[#E8541A]">botsfired.com</span></p>
          </div>
        </div>
      </div>

      {/* Style 2 — Dark hero */}
      <div className="bg-[#0D1829] rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-3">
          <BFLogoSVG variant="icon" theme="white" width={36} />
          <p className="text-[10px] text-[#4A66A0] font-semibold uppercase tracking-widest">BOTS FIRED Blog</p>
        </div>
        <h4 style={{ fontFamily: "Barlow Condensed, sans-serif", fontSize: "22px", fontWeight: 700, color: "#EEF2F8", lineHeight: 1.2 }}>
          ROI or Risk? How to Frame AI for Your CFO
        </h4>
        <p style={{ fontFamily: "Caveat, cursive", fontSize: "15px", color: "#F5A030", marginTop: "8px" }}>
          The language that gets AI funded →
        </p>
      </div>

      {/* Style 3 — Handwritten accent */}
      <div className="bg-[#FFFEF5] rounded-2xl border border-[#F5A030]/20 p-5" style={{ backgroundImage: "repeating-linear-gradient(transparent, transparent 27px, #E8E6E0 28px)" }}>
        <BFPhotoLogo height={28} />
        <div className="mt-4">
          <p style={{ fontFamily: "Caveat, cursive", fontSize: "13px", color: "#D97706" }}>From the desk of BOTS FIRED</p>
          <h4 style={{ fontFamily: "Barlow Condensed, sans-serif", fontSize: "20px", fontWeight: 700, color: "#1C2E5E", marginTop: "4px" }}>
            AI Talent: Build, Buy, or Partner?
          </h4>
          <p className="text-[10px] text-[#9BA3B0] mt-1">Mar 24 · 5 min read</p>
        </div>
      </div>

      {/* Style 4 — Magazine */}
      <div className="bg-white rounded-2xl border border-[#E8E6E0] p-5">
        <div className="border-l-4 border-[#E8541A] pl-4 mb-3">
          <p className="text-[10px] font-bold text-[#E8541A] uppercase tracking-widest">DEEP DIVE</p>
          <h4 style={{ fontFamily: "Barlow Condensed, sans-serif", fontSize: "20px", fontWeight: 700, color: "#0D1829" }}>
            When the Algorithm Decides
          </h4>
        </div>
        <p className="text-xs text-[#6B7280] leading-relaxed">From credit scoring to medical triage — what's the ethical framework for algorithmic decisions?</p>
        <div className="flex items-center justify-between mt-3">
          <span className="text-[10px] text-[#9BA3B0]">8 min · Ethics</span>
          <BFLogoSVG variant="icon" theme="color" width={36} />
        </div>
      </div>
    </div>
  );
}

/* ── INVITATION CARDS (4 styles) ── */
function InvitationCards() {
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      {/* Style 1: Formal */}
      <div className="bg-white rounded-3xl border border-[#E8E6E0] p-6 text-center shadow-sm">
        <div className="flex justify-center mb-3"><BFLogoSVG variant="stacked" theme="color" width={100} /></div>
        <p className="text-[10px] text-[#9BA3B0] uppercase tracking-widest mb-2">Cordially Invites You To</p>
        <h4 style={{ fontFamily: "Barlow Condensed, sans-serif", fontSize: "22px", fontWeight: 700, color: "#0D1829" }}>
          AI Leadership: Board Masterclass
        </h4>
        <p style={{ fontFamily: "Caveat, cursive", fontSize: "17px", color: "#D97706", transform: "rotate(-1deg)", display: "block", marginTop: "8px" }}>
          An exclusive evening session
        </p>
        <div className="mt-4 grid grid-cols-2 gap-3 text-xs text-[#6B7280]">
          <div className="bg-[#FAFAF8] rounded-xl p-3">
            <p className="font-bold text-[#1C2E5E]">📅 May 14, 2026</p>
            <p>6:00 PM GMT</p>
          </div>
          <div className="bg-[#FAFAF8] rounded-xl p-3">
            <p className="font-bold text-[#1C2E5E]">📍 The Shard, London</p>
            <p>Level 31</p>
          </div>
        </div>
        <button className="mt-4 w-full py-2.5 rounded-xl bg-[#1C2E5E] text-white text-xs font-semibold">RSVP Now</button>
      </div>

      {/* Style 2: Dark premium */}
      <div className="bg-[#0D1829] rounded-3xl p-6 text-center">
        <BFLogoSVG variant="icon" theme="white" width={60} />
        <div className="my-3 flex items-center gap-2">
          <div className="flex-1 h-px bg-[#162244]" />
          <p className="text-[10px] text-[#4A66A0] uppercase tracking-widest">You're Invited</p>
          <div className="flex-1 h-px bg-[#162244]" />
        </div>
        <p style={{ fontFamily: "Barlow Condensed, sans-serif", fontSize: "24px", fontWeight: 700, color: "#EEF2F8" }}>
          The Boardroom AI<br />Live Recording
        </p>
        <p style={{ fontFamily: "Caveat, cursive", fontSize: "16px", color: "#F5A030", marginTop: "8px" }}>Join us for a live podcast taping!</p>
        <div className="mt-4 space-y-2 text-xs text-[#8FA5C8]">
          <p>📅 June 3, 2026 · 7:30 PM</p>
          <p>📍 Canary Wharf, London</p>
          <p>🎫 Limited to 80 seats</p>
        </div>
        <button className="mt-4 w-full py-2.5 rounded-xl bg-[#E8541A] text-white text-xs font-semibold hover:bg-[#D03010] transition-colors">Claim Your Seat</button>
      </div>

      {/* Style 3: Warm/handwritten */}
      <div className="bg-[#FFF8EC] rounded-3xl border-2 border-[#F5A030]/40 p-6">
        <div className="flex items-center gap-3 mb-4">
          <BFPhotoLogo height={28} />
          <p style={{ fontFamily: "Caveat, cursive", fontSize: "16px", color: "#D97706" }}>warmly invites you</p>
        </div>
        <p style={{ fontFamily: "Barlow Condensed, sans-serif", fontSize: "22px", fontWeight: 700, color: "#1C2E5E" }}>
          4-Week Executive AI Cohort
        </p>
        <p className="text-xs text-[#6B7280] mt-2 leading-relaxed">
          A curated group of 20 senior leaders exploring AI strategy, governance, and leadership together.
        </p>
        <p style={{ fontFamily: "Caveat, cursive", fontSize: "15px", color: "#D97706", marginTop: "12px" }}>
          Starts May 19 — only 8 spots remain!
        </p>
        <div className="mt-4 flex gap-2">
          <button className="flex-1 py-2 rounded-xl bg-[#1C2E5E] text-white text-xs font-semibold">Apply Now</button>
          <button className="px-3 py-2 rounded-xl border border-[#E8E6E0] text-xs text-[#6B7280]">Learn More</button>
        </div>
      </div>

      {/* Style 4: Minimal/print */}
      <div className="bg-white rounded-3xl border border-[#E8E6E0] p-6">
        <div className="border-b-2 border-[#E8541A] pb-4 mb-4 flex items-center justify-between">
          <BFLogoSVG variant="wordmark" theme="color" width={130} />
          <span className="text-[10px] text-[#9BA3B0]">Private Event</span>
        </div>
        <p className="text-[10px] font-bold text-[#9BA3B0] uppercase tracking-widest mb-2">Annual Executive AI Forum</p>
        <h4 style={{ fontFamily: "Barlow Condensed, sans-serif", fontSize: "24px", fontWeight: 700, color: "#0D1829" }}>
          AI &amp; Board Governance Summit 2026
        </h4>
        <div className="mt-3 grid grid-cols-3 gap-2 text-[10px]">
          <div>
            <p className="font-bold text-[#1C2E5E]">Date</p>
            <p className="text-[#6B7280]">Oct 2, 2026</p>
          </div>
          <div>
            <p className="font-bold text-[#1C2E5E]">Venue</p>
            <p className="text-[#6B7280]">Four Seasons, Dubai</p>
          </div>
          <div>
            <p className="font-bold text-[#1C2E5E]">Dress</p>
            <p className="text-[#6B7280]">Business Formal</p>
          </div>
        </div>
        <p style={{ fontFamily: "Caveat, cursive", fontSize: "13px", color: "#D97706", marginTop: "12px" }}>RSVP by September 15 · Space strictly limited</p>
      </div>
    </div>
  );
}

/* ── ANNOUNCEMENTS (4 styles) ── */
function Announcements() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {[
        {
          type: "New Episode",
          headline: "Episode 49 is Live!",
          sub: "AI & Board Governance with Sir John Morgan",
          color: "#0D1829", textColor: "#EEF2F8", accent: "#F5A030", dark: true,
        },
        {
          type: "Newsletter",
          headline: "Issue #052 Now Available",
          sub: "Why Your AI Pilot Failed — 6 min read",
          color: "#EEF2F8", textColor: "#1C2E5E", accent: "#E8541A",
        },
        {
          type: "New Programme",
          headline: "The 4-Week Cohort Opens!",
          sub: "June 23 intake — 12 spots available",
          color: "#FFF8EC", textColor: "#92400E", accent: "#D97706",
        },
        {
          type: "Achievement",
          headline: "2,400 Execs Trained 🎉",
          sub: "Thank you to our extraordinary community",
          color: "#1C2E5E", textColor: "#EEF2F8", accent: "#F5A030", dark: true,
        },
      ].map(({ type, headline, sub, color, textColor, accent, dark }) => (
        <div key={type} className="rounded-2xl p-5 border" style={{ backgroundColor: color, borderColor: dark ? "#2A4080" : "#E8E6E0" }}>
          <div className="flex items-start justify-between gap-3">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: accent }}>{type}</span>
              <h4 style={{ fontFamily: "Barlow Condensed, sans-serif", fontSize: "20px", fontWeight: 700, color: textColor, lineHeight: 1.2, marginTop: "4px" }}>
                {headline}
              </h4>
              <p className="text-xs mt-1" style={{ color: dark ? "#8FA5C8" : "#6B7280" }}>{sub}</p>
              <p style={{ fontFamily: "Caveat, cursive", fontSize: "14px", color: accent, marginTop: "6px" }}>
                Read more →
              </p>
            </div>
            <BFLogoSVG variant="icon" theme={dark ? "white" : "color"} width={50} />
          </div>
        </div>
      ))}
    </div>
  );
}

/* ── PRINTED NOTES STATIONERY ── */
function PrintedNotes() {
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      {/* Style 1: Letterhead */}
      <div className="bg-white rounded-2xl border border-[#E8E6E0] overflow-hidden shadow-sm">
        <div className="border-b-4 border-[#E8541A] px-6 py-4 flex items-center justify-between">
          <BFPhotoLogo height={32} />
          <div className="text-right text-[10px] text-[#9BA3B0]">
            <p>botsfired.com</p>
            <p>AI for Leaders</p>
          </div>
        </div>
        <div className="px-6 py-5" style={{ backgroundImage: "repeating-linear-gradient(transparent, transparent 27px, #F1F2F4 28px)", minHeight: "120px" }}>
          <p style={{ fontFamily: "Caveat, cursive", fontSize: "16px", color: "#D97706" }}>Handwritten notes go here...</p>
          <p style={{ fontFamily: "Caveat, cursive", fontSize: "14px", color: "#9BA3B0", marginTop: "28px" }}>Your personal message in brand context</p>
        </div>
        <div className="border-t border-[#E8E6E0] px-6 py-2 flex justify-between items-center">
          <p className="text-[9px] text-[#9BA3B0]">BOTS FIRED · AI Clarity for Leaders · botsfired.com</p>
          <BFLogoSVG variant="icon" theme="color" width={28} />
        </div>
      </div>

      {/* Style 2: Dark notepaper */}
      <div className="bg-[#1C2E5E] rounded-2xl overflow-hidden">
        <div className="px-6 py-4 flex items-center justify-between border-b border-[#2A4080]">
          <BFLogoSVG variant="wordmark" theme="white" width={130} />
          <span style={{ fontFamily: "Caveat, cursive", fontSize: "14px", color: "#F5A030" }}>Personal Note</span>
        </div>
        <div className="px-6 py-5" style={{ minHeight: "100px" }}>
          <p style={{ fontFamily: "Caveat, cursive", fontSize: "17px", color: "#D0DAE8", lineHeight: 1.7 }}>
            Dear Leader,<br />
            Thank you for joining our community of AI-curious executives...
          </p>
        </div>
        <div className="border-t border-[#2A4080] px-6 py-2">
          <p className="text-[9px] text-[#4A66A0]">© 2026 BOTS FIRED · Confidential</p>
        </div>
      </div>

      {/* Style 3: Gift card / thank you */}
      <div className="bg-[#FFF8EC] rounded-2xl border-2 border-[#F5A030]/30 p-5 text-center">
        <BFLogoSVG variant="stacked" theme="color" width={80} />
        <div className="my-3 border-t border-b border-[#F5A030]/20 py-3">
          <p style={{ fontFamily: "Caveat, cursive", fontSize: "22px", color: "#D97706", transform: "rotate(-1deg)", display: "inline-block" }}>
            Thank you for being part<br />of our leadership community!
          </p>
        </div>
        <p className="text-[10px] text-[#9BA3B0]">BOTS FIRED · AI for Leaders · botsfired.com</p>
      </div>

      {/* Style 4: Post-it / quick note */}
      <div className="relative rounded-2xl bg-[#FEF3C7] p-5" style={{ boxShadow: "3px 3px 10px rgba(0,0,0,0.1)" }}>
        <div className="flex items-center justify-between mb-3">
          <BFLogoSVG variant="icon" theme="color" width={35} />
          <span style={{ fontFamily: "Caveat, cursive", fontSize: "12px", color: "#D97706" }}>Quick Note</span>
        </div>
        <p style={{ fontFamily: "Caveat, cursive", fontSize: "18px", color: "#1C2E5E", lineHeight: 1.6 }}>
          "Board meeting prep:<br />✓ Review AI brief #052<br />✓ Listen to Ep. 48<br />✓ Share with ExCo"
        </p>
        <p className="absolute bottom-3 right-4 text-[9px] text-[#9BA3B0]">botsfired.com</p>
      </div>
    </div>
  );
}

export function TemplatesSection() {
  const [activeTab, setActiveTab] = useState("profiles");
  const tabs = [
    { id: "profiles", label: "Profiles" },
    { id: "resumes", label: "Resume / Exec Profile" },
    { id: "social", label: "Social Media" },
    { id: "newsletter", label: "Newsletter" },
    { id: "blog", label: "Blog" },
    { id: "invitations", label: "Invitations" },
    { id: "announcements", label: "Announcements" },
    { id: "print", label: "Print & Notes" },
  ];

  return (
    <div id="templates" className="space-y-8">
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-[#9BA3B0] mb-1">Design Templates</p>
        <h3 style={{ fontFamily: "Barlow Condensed, sans-serif", color: "#1C2E5E", fontSize: "28px", fontWeight: 700 }}>
          Usage Templates &amp; Mockups
        </h3>
        <HandwrittenNote size="sm" rotate={-1} className="mt-1">4 samples of each — pick your style</HandwrittenNote>
      </div>

      {/* Tab navigation */}
      <div className="flex flex-wrap gap-2">
        {tabs.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 ${
              activeTab === id
                ? "bg-[#1C2E5E] text-white"
                : "bg-white border border-[#E8E6E0] text-[#6B7280] hover:text-[#1C2E5E] hover:border-[#1C2E5E]"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <motion.div key={activeTab} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        {activeTab === "profiles"      && <ProfileCards />}
        {activeTab === "resumes"       && <ResumeTemplates />}
        {activeTab === "social"        && <SocialTemplates />}
        {activeTab === "newsletter"    && <NewsletterHeaders />}
        {activeTab === "blog"          && <BlogHeaders />}
        {activeTab === "invitations"   && <InvitationCards />}
        {activeTab === "announcements" && <Announcements />}
        {activeTab === "print"         && <PrintedNotes />}
      </motion.div>
    </div>
  );
}
