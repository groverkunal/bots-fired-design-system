import React from "react";

export const BF_NAVY  = "#1C2E5E";
export const BF_FIRE  = "#E8541A";
export const BF_AMBER = "#D97706";
export const BF_GOLD  = "#F5A030";
export const BF_WHITE = "#FFFFFF";
export const BF_DARK  = "#0D1829";
export const BF_CREAM = "#FAFAF8";

type LogoVariant = "full" | "icon" | "wordmark" | "stacked";
type LogoTheme = "color" | "mono" | "white" | "dark" | "sketch" | "outline";

interface BFLogoSVGProps {
  variant?: LogoVariant;
  theme?: LogoTheme;
  width?: number;
  className?: string;
}

function getColors(theme: LogoTheme) {
  switch (theme) {
    case "white":   return { flame: "#FFFFFF", bot: "#FFFFFF", text: "#FFFFFF", stroke: "none" };
    case "dark":    return { flame: BF_DARK, bot: BF_DARK, text: BF_DARK, stroke: "none" };
    case "mono":    return { flame: "#374151", bot: "#374151", text: "#374151", stroke: "none" };
    case "sketch":  return { flame: "none", bot: "none", text: BF_NAVY, stroke: BF_NAVY };
    case "outline": return { flame: "none", bot: "none", text: BF_NAVY, stroke: BF_FIRE };
    default:        return { flame: BF_FIRE, bot: BF_NAVY, text: BF_NAVY, stroke: "none" };
  }
}

// The BF icon: a stylised robot face with a flame on top
function BFIcon({ colors, size = 40 }: { colors: ReturnType<typeof getColors>; size?: number }) {
  const isSketch = colors.stroke !== "none" && colors.flame === "none";
  const botFill = isSketch ? "none" : colors.bot;
  const flameFill = isSketch ? "none" : colors.flame;
  const strokeColor = isSketch ? colors.stroke : "none";
  const sw = isSketch ? 2 : 0;

  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Flame */}
      <path d="M20 2C20 2 14 10 16 16C16 16 13 14 14 10C14 10 10 16 12 22C12 22 10 20 11 17C11 17 8 23 12 27C12 27 14 24 17 24C17 24 16 29 20 30C24 29 23 24 23 24C26 24 28 27 28 27C32 23 29 17 29 17C30 20 28 22 28 22C30 16 26 10 26 10C27 14 24 16 24 16C26 10 20 2 20 2Z"
        fill={flameFill} stroke={strokeColor} strokeWidth={sw} strokeLinejoin="round" />
      {/* Robot body */}
      <rect x="10" y="22" width="20" height="14" rx="4" fill={botFill} stroke={strokeColor} strokeWidth={sw} />
      {/* Eyes */}
      <rect x="13" y="26" width="5" height="4" rx="1.5" fill={isSketch ? "none" : "#FFFFFF"} stroke={isSketch ? strokeColor : "none"} strokeWidth={sw} />
      <rect x="22" y="26" width="5" height="4" rx="1.5" fill={isSketch ? "none" : "#FFFFFF"} stroke={isSketch ? strokeColor : "none"} strokeWidth={sw} />
      {/* Mouth */}
      <rect x="15" y="32" width="10" height="2" rx="1" fill={isSketch ? "none" : "#FFFFFF"} stroke={isSketch ? strokeColor : "none"} strokeWidth={sw} />
    </svg>
  );
}

export function BFLogoSVG({ variant = "full", theme = "color", width = 160, className = "" }: BFLogoSVGProps) {
  const colors = getColors(theme);
  const iconSize = variant === "icon" ? width : Math.round(width * 0.22);

  if (variant === "icon") {
    return (
      <span className={className} style={{ display: "inline-flex" }}>
        <BFIcon colors={colors} size={iconSize} />
      </span>
    );
  }

  if (variant === "wordmark") {
    return (
      <svg width={width} height={Math.round(width * 0.22)} viewBox="0 0 240 40" fill="none" className={className}>
        <text x="0" y="32" fontFamily="Barlow Condensed, sans-serif" fontWeight="800" fontSize="36" fill={colors.text}>BOTS FIRED</text>
      </svg>
    );
  }

  if (variant === "stacked") {
    return (
      <div className={className} style={{ display: "inline-flex", flexDirection: "column", alignItems: "center", gap: 6, width }}>
        <BFIcon colors={colors} size={Math.round(width * 0.45)} />
        <svg width={width} height={Math.round(width * 0.18)} viewBox="0 0 160 28" fill="none">
          <text x="80" y="22" textAnchor="middle" fontFamily="Barlow Condensed, sans-serif" fontWeight="800" fontSize="26" fill={colors.text}>BOTS FIRED</text>
        </svg>
      </div>
    );
  }

  // full — horizontal lock-up
  return (
    <div className={className} style={{ display: "inline-flex", alignItems: "center", gap: Math.round(width * 0.06), width }}>
      <BFIcon colors={colors} size={iconSize} />
      <svg width={Math.round(width * 0.72)} height={iconSize} viewBox="0 0 116 40" fill="none">
        <text x="0" y="28" fontFamily="Barlow Condensed, sans-serif" fontWeight="800" fontSize="28" fill={colors.text}>BOTS FIRED</text>
        <text x="1" y="38" fontFamily="Inter, sans-serif" fontWeight="500" fontSize="9" letterSpacing="2" fill={theme === "white" ? "#FFFFFF99" : "#9BA3B0"}>AI EDUCATION</text>
      </svg>
    </div>
  );
}

// Placeholder components for photo logos (actual images from Figma Make are not available here)
export function BFPhotoLogo({ width = 120, className = "" }: { width?: number; className?: string }) {
  return (
    <div className={className} style={{ width, height: width, borderRadius: "50%", backgroundColor: BF_NAVY, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <BFLogoSVG variant="icon" theme="white" width={Math.round(width * 0.6)} />
    </div>
  );
}

export function BFPhotoLogo2({ width = 120, className = "" }: { width?: number; className?: string }) {
  return (
    <div className={className} style={{ width, height: width, borderRadius: 16, background: `linear-gradient(135deg, ${BF_NAVY} 0%, ${BF_DARK} 100%)`, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <BFLogoSVG variant="stacked" theme="white" width={Math.round(width * 0.75)} />
    </div>
  );
}

type Holiday = "new-year" | "valentines" | "july4" | "halloween" | "thanksgiving" | "christmas" | "diwali" | "holi" | "republic-day" | "india-independence" | "navratri" | "pongal";

const holidayConfigs: Record<Holiday, { bg: string; accent: string; label: string; emoji: string }> = {
  "new-year":           { bg: "#0D1829", accent: "#F5A030", label: "Happy New Year", emoji: "🎆" },
  "valentines":         { bg: "#9F1239", accent: "#FFC0CB", label: "Happy Valentine's", emoji: "❤️" },
  "july4":              { bg: "#1C2E5E", accent: "#E8541A", label: "Independence Day", emoji: "🇺🇸" },
  "halloween":          { bg: "#1C0A00", accent: "#F5A030", label: "Happy Halloween", emoji: "🎃" },
  "thanksgiving":       { bg: "#7C2D12", accent: "#FED7AA", label: "Happy Thanksgiving", emoji: "🦃" },
  "christmas":          { bg: "#14532D", accent: "#FEF08A", label: "Merry Christmas", emoji: "🎄" },
  "diwali":             { bg: "#1C0A00", accent: "#F5A030", label: "Happy Diwali", emoji: "🪔" },
  "holi":               { bg: "#FAFAF8", accent: "#E8541A", label: "Happy Holi", emoji: "🌈" },
  "republic-day":       { bg: "#FF6600", accent: "#FFFFFF", label: "Republic Day", emoji: "🇮🇳" },
  "india-independence": { bg: "#138808", accent: "#FFFFFF", label: "Independence Day", emoji: "🇮🇳" },
  "navratri":           { bg: "#7C3AED", accent: "#FDE68A", label: "Happy Navratri", emoji: "🪷" },
  "pongal":             { bg: "#78350F", accent: "#FDE68A", label: "Happy Pongal", emoji: "🌾" },
};

export function HolidayLogo({ holiday, width = 200, className = "" }: { holiday: Holiday; width?: number; className?: string }) {
  const cfg = holidayConfigs[holiday];
  return (
    <div className={className} style={{ width, height: Math.round(width * 0.56), borderRadius: 16, backgroundColor: cfg.bg, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 6, padding: 12, overflow: "hidden", position: "relative" }}>
      <div style={{ position: "absolute", top: 8, right: 12, fontSize: Math.round(width * 0.14) }}>{cfg.emoji}</div>
      <BFLogoSVG variant="icon" theme="white" width={Math.round(width * 0.25)} />
      <svg width={Math.round(width * 0.65)} height={Math.round(width * 0.13)} viewBox="0 0 130 26" fill="none">
        <text x="65" y="20" textAnchor="middle" fontFamily="Barlow Condensed, sans-serif" fontWeight="800" fontSize="22" fill="#FFFFFF">BOTS FIRED</text>
      </svg>
      <p style={{ fontFamily: "Caveat, cursive", fontSize: Math.round(width * 0.085), color: cfg.accent, margin: 0 }}>{cfg.label}</p>
    </div>
  );
}
