import React from "react";
import { motion } from "motion/react";

const stages = [
  { id: 1, label: "Awareness", sub: "Know what AI is — and isn't", color: "#EEF2F8", border: "#D0DAE8", text: "#1C2E5E", dot: "#4A66A0", note: "Most execs start here" },
  { id: 2, label: "Strategy", sub: "Map AI to your business model", color: "#F0F4FF", border: "#8FA5C8", text: "#1C2E5E", dot: "#2A4080", note: "The critical gap" },
  { id: 3, label: "Implementation", sub: "Govern, deploy & measure impact", color: "#FFF8EC", border: "#F5A030", text: "#92400E", dot: "#F5A030", note: "Where ROI is born" },
  { id: 4, label: "AI Leadership", sub: "Lead the AI-enabled organisation", color: "#1C2E5E", border: "#1C2E5E", text: "#FFFFFF", dot: "#F5A030", note: "The goal ✓" },
];

export function AIFrameworkDiagram() {
  return (
    <div className="w-full">
      <div className="hidden md:flex items-stretch gap-0 relative">
        {stages.map((stage, i) => (
          <React.Fragment key={stage.id}>
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }} className="flex-1 relative">
              <div className="h-full rounded-2xl border-2 p-6 flex flex-col gap-3 hover:shadow-lg transition-shadow duration-300" style={{ backgroundColor: stage.color, borderColor: stage.border }}>
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold" style={{ backgroundColor: stage.dot, color: "#fff" }}>{stage.id}</div>
                </div>
                <div>
                  <p className="font-bold text-base leading-tight" style={{ fontFamily: "Barlow Condensed, sans-serif", color: stage.text, fontSize: "20px" }}>{stage.label}</p>
                  <p className="text-sm mt-1 leading-snug" style={{ color: stage.id === 4 ? "#D0DAE8" : "#6B7280" }}>{stage.sub}</p>
                </div>
                <div className="mt-auto">
                  <span style={{ fontFamily: "Caveat, cursive", fontSize: "15px", color: stage.id === 4 ? "#F5A030" : "#D97706", transform: "rotate(-1deg)", display: "inline-block" }}>{stage.note}</span>
                </div>
              </div>
            </motion.div>
            {i < stages.length - 1 && (
              <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.3, delay: i * 0.15 + 0.3 }} className="flex items-center px-1 shrink-0 z-10">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="#CBD0D8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </motion.div>
            )}
          </React.Fragment>
        ))}
      </div>
      <div className="md:hidden space-y-3">
        {stages.map((stage, i) => (
          <motion.div key={stage.id} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: i * 0.1 }}>
            <div className="rounded-2xl border-2 p-5 flex gap-4 items-start" style={{ backgroundColor: stage.color, borderColor: stage.border }}>
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0 mt-0.5" style={{ backgroundColor: stage.dot, color: "#fff" }}>{stage.id}</div>
              <div>
                <p className="font-bold" style={{ fontFamily: "Barlow Condensed, sans-serif", color: stage.text, fontSize: "18px" }}>{stage.label}</p>
                <p className="text-sm" style={{ color: stage.id === 4 ? "#D0DAE8" : "#6B7280" }}>{stage.sub}</p>
                <span style={{ fontFamily: "Caveat, cursive", fontSize: "14px", color: stage.id === 4 ? "#F5A030" : "#D97706" }}>{stage.note}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

const programs = [
  { title: "Board Briefing", duration: "3 Hours", audience: "Board Members", color: "#EEF2F8", border: "#8FA5C8", tag: "Entry point" },
  { title: "Half-Day Intensive", duration: "4 Hours", audience: "C-Suite Executives", color: "#FFF8EC", border: "#F5A030", tag: "Most popular" },
  { title: "Full-Day Workshop", duration: "8 Hours", audience: "Senior Leadership", color: "#F0F4FF", border: "#4A66A0", tag: "Comprehensive" },
  { title: "4-Week Cohort", duration: "Weekly Live Sessions", audience: "Executive Teams", color: "#1C2E5E", border: "#1C2E5E", tag: "Deepest impact", dark: true },
];

export function TrainingPathwayDiagram() {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {programs.map((p: any, i) => (
        <motion.div key={p.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.12 }}
          className="relative rounded-2xl border-2 p-5 flex flex-col gap-3" style={{ backgroundColor: p.color, borderColor: p.border }}>
          {i < programs.length - 1 && <div className="hidden lg:block absolute top-1/2 -right-4 w-4 h-0.5" style={{ backgroundColor: p.border }} />}
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full self-start" style={{ backgroundColor: p.dark ? "#162244" : "#fff", color: p.dark ? "#F5A030" : "#6B7280", border: `1px solid ${p.border}` }}>{p.tag}</span>
          <div>
            <p className="font-bold leading-tight" style={{ fontFamily: "Barlow Condensed, sans-serif", fontSize: "20px", color: p.dark ? "#EEF2F8" : "#1C2E5E" }}>{p.title}</p>
            <p className="text-sm mt-1" style={{ color: p.dark ? "#8FA5C8" : "#6B7280" }}>{p.duration}</p>
          </div>
          <p style={{ fontFamily: "Caveat, cursive", fontSize: "15px", color: p.dark ? "#F5A030" : "#D97706" }}>For {p.audience}</p>
          <div className="mt-auto">
            <div className="flex gap-1">
              {Array.from({ length: 4 }).map((_, j) => (
                <div key={j} className="h-1 flex-1 rounded-full" style={{ backgroundColor: j <= i ? p.border : (p.dark ? "#162244" : "#E8E6E0") }} />
              ))}
            </div>
            <p className="text-[10px] mt-1" style={{ color: p.dark ? "#4A66A0" : "#9BA3B0" }}>Depth level {i + 1}/4</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export function TopicClusterDiagram() {
  const topics = [
    { label: "AI Strategy", x: 50, y: 50, r: 52, main: true },
    { label: "Governance", x: 18, y: 22, r: 36 },
    { label: "Automation ROI", x: 82, y: 20, r: 38 },
    { label: "Ethics & Risk", x: 15, y: 68, r: 34 },
    { label: "AI Talent", x: 85, y: 68, r: 34 },
    { label: "Future of Work", x: 50, y: 88, r: 30 },
  ];
  return (
    <div className="relative w-full" style={{ paddingBottom: "60%" }}>
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 240" fill="none">
        {topics.slice(1).map((t, i) => (
          <motion.line key={i} x1={topics[0].x * 4} y1={topics[0].y * 2.4} x2={t.x * 4} y2={t.y * 2.4} stroke="#D0DAE8" strokeWidth="1.5" strokeDasharray="4 3"
            initial={{ pathLength: 0, opacity: 0 }} whileInView={{ pathLength: 1, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: i * 0.1 }} />
        ))}
        {topics.map((t, i) => (
          <motion.g key={t.label} initial={{ scale: 0, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.1, type: "spring" }} style={{ transformOrigin: `${t.x * 4}px ${t.y * 2.4}px` }}>
            <circle cx={t.x * 4} cy={t.y * 2.4} r={t.r} fill={t.main ? "#1C2E5E" : "#F4F3EF"} stroke={t.main ? "#1C2E5E" : "#D0DAE8"} strokeWidth={t.main ? 0 : 1.5} />
            <text x={t.x * 4} y={t.y * 2.4} textAnchor="middle" dominantBaseline="middle" fill={t.main ? "#FFFFFF" : "#1C2E5E"} fontSize={t.main ? "12" : "10"} fontFamily="Inter, sans-serif" fontWeight={t.main ? "600" : "500"}>
              {t.label.split(" ").map((word, wi) => (
                <tspan key={wi} x={t.x * 4} dy={wi === 0 ? (t.label.includes(" ") ? "-7" : "0") : "14"}>{word}</tspan>
              ))}
            </text>
          </motion.g>
        ))}
      </svg>
    </div>
  );
}
