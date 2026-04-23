import React from "react";

interface HandwrittenNoteProps {
  children: React.ReactNode;
  rotate?: number;
  color?: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  highlight?: boolean;
}

const sizes = { sm: "text-lg", md: "text-2xl", lg: "text-3xl", xl: "text-4xl" };

export function HandwrittenNote({ children, rotate = -1.5, color = "#D97706", size = "md", className = "", highlight = false }: HandwrittenNoteProps) {
  return (
    <span className={`inline-block ${sizes[size]} ${className}`} style={{ fontFamily: "Caveat, cursive", fontWeight: 600, color, transform: `rotate(${rotate}deg)`, display: "inline-block", ...(highlight ? { background: `linear-gradient(105deg, transparent 10%, #FEF3C7 10%, #FEF3C7 90%, transparent 90%)`, padding: "0 4px" } : {}) }}>
      {children}
    </span>
  );
}

export function HandwrittenCallout({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`inline-block relative ${className}`} style={{ fontFamily: "Caveat, cursive", fontWeight: 500, fontSize: "1.25rem", color: "#D97706", transform: "rotate(-1deg)", lineHeight: 1.4 }}>
      <span style={{ position: "relative" }}>
        {children}
        <svg viewBox="0 0 200 12" fill="none" style={{ position: "absolute", bottom: "-6px", left: 0, width: "100%", height: "12px" }}>
          <path d="M2 8 Q50 2 100 8 Q150 14 198 6" stroke="#F5A030" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        </svg>
      </span>
    </div>
  );
}