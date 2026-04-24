import React from "react";

export const BF_NAVY  = "#1C3068";
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

function getTextColor(theme: LogoTheme) {
  switch (theme) {
    case "white":   return "#FFFFFF";
    case "dark":    return BF_DARK;
    case "mono":    return "#374151";
    case "sketch":
    case "outline": return BF_NAVY;
    default:        return BF_NAVY;
  }
}

// Flame + sparkles icon — matches the actual BOTS FIRED logo mark
function FlameIcon({ size = 48, theme = "color" as LogoTheme }) {
  const isWhite = theme === "white";
  const isMono  = theme === "mono" || theme === "dark";

  const flameA = isMono ? "#374151" : isWhite ? "#FFFFFF" : "#E8541A";
  const flameB = isMono ? "#6B7280" : isWhite ? "#FFFFFF" : "#F5A030";
  const star   = isMono ? "#9BA3B0" : isWhite ? "#FFFFFF" : "#F5A030";

  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="flameGrad" x1="14" y1="40" x2="32" y2="8" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={flameA} />
          <stop offset="100%" stopColor={flameB} />
        </linearGradient>
      </defs>
      {/* Main flame body */}
      <path d="M22 38C22 38 12 32 14 22C14 22 11 26 12 30C12 30 8 24 12 16C12 16 10 20 12 22C12 22 14 12 22 8C22 8 19 14 22 18C22 18 20 10 26 6C26 6 24 14 28 16C28 16 30 10 34 12C34 12 30 16 30 20C30 20 34 16 36 18C36 18 34 24 30 26C30 26 32 28 30 32C30 32 26 28 24 30C24 30 26 34 22 38Z"
        fill="url(#flameGrad)" />
      {/* Inner flame highlight */}
      <path d="M22 34C22 34 16 29 18 23C18 23 17 26 18 28C18 28 16 24 18 20C18 20 20 22 20 26C20 26 21 22 24 20C24 20 22 24 24 26C24 26 26 22 28 24C28 24 27 28 25 30C25 30 26 32 24 34C24 34 23 31 22 34Z"
        fill={flameB} opacity="0.5" />
      {/* Sparkle star top-right (large) */}
      <path d="M36 8L37 12L41 13L37 14L36 18L35 14L31 13L35 12Z" fill={star} />
      {/* Sparkle star middle-right (small) */}
      <path d="M41 18L42 20L44 21L42 22L41 24L40 22L38 21L40 20Z" fill={star} />
      {/* Sparkle star bottom-right (tiny) */}
      <path d="M38 28L38.8 30L41 30.8L38.8 31.5L38 33.5L37.2 31.5L35 30.8L37.2 30Z" fill={star} />
    </svg>
  );
}

// The full wordmark using SVG text — matches bold italic condensed style
function WordmarkText({ color, width }: { color: string; width: number }) {
  // Scale factor: viewBox is 520 × 80
  return (
    <svg width={width} height={Math.round(width * 80 / 520)} viewBox="0 0 520 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <text
        x="0" y="70"
        fontFamily="'Barlow Condensed', 'Exo 2', 'Rajdhani', Impact, sans-serif"
        fontWeight="800"
        fontStyle="italic"
        fontSize="80"
        fill={color}
        letterSpacing="-2"
      >
        BOTS FIRED
      </text>
    </svg>
  );
}

// Full horizontal lock-up with flame on right (matching actual logo)
export function BFLogoSVG({ variant = "full", theme = "color", width = 300, className = "" }: BFLogoSVGProps) {
  const textColor = getTextColor(theme);

  if (variant === "icon") {
    return (
      <span className={className} style={{ display: "inline-flex" }}>
        <FlameIcon size={width} theme={theme} />
      </span>
    );
  }

  if (variant === "wordmark") {
    return (
      <span className={className} style={{ display: "inline-flex" }}>
        <WordmarkText color={textColor} width={width} />
      </span>
    );
  }

  if (variant === "stacked") {
    const iconSize = Math.round(width * 0.4);
    return (
      <div className={className} style={{ display: "inline-flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
        <FlameIcon size={iconSize} theme={theme} />
        <WordmarkText color={textColor} width={width} />
      </div>
    );
  }

  // "full" — wordmark + flame overlaid on right edge (exact logo layout)
  const textW = Math.round(width * 0.88);
  const iconSize = Math.round(width * 0.22);
  return (
    <div className={className} style={{ display: "inline-flex", alignItems: "center", position: "relative", width }}>
      <WordmarkText color={textColor} width={textW} />
      <div style={{ position: "absolute", right: 0, top: "50%", transform: "translate(10%, -60%)" }}>
        <FlameIcon size={iconSize} theme={theme} />
      </div>
    </div>
  );
}

// Circle avatar / profile image version
export function BFPhotoLogo({ width = 120, className = "" }: { width?: number; className?: string }) {
  return (
    <div className={className} style={{
      width, height: width, borderRadius: "50%",
      background: `linear-gradient(135deg, ${BF_NAVY} 0%, #0D1829 100%)`,
      display: "flex", alignItems: "center", justifyContent: "center",
    }}>
      <FlameIcon size={Math.round(width * 0.55)} theme="white" />
    </div>
  );
}

// Square app-icon version
export function BFPhotoLogo2({ width = 120, className = "" }: { width?: number; className?: string }) {
  return (
    <div className={className} style={{
      width, height: width, borderRadius: Math.round(width * 0.2),
      background: `linear-gradient(135deg, ${BF_NAVY} 0%, #0D1829 100%)`,
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 4,
    }}>
      <FlameIcon size={Math.round(width * 0.4)} theme="white" />
      <svg width={Math.round(width * 0.7)} height={Math.round(width * 0.14)} viewBox="0 0 70 14" fill="none">
        <text x="35" y="12" textAnchor="middle" fontFamily="'Barlow Condensed', Impact, sans-serif" fontWeight="800" fontStyle="italic" fontSize="13" fill="#FFFFFF">BOTS FIRED</text>
      </svg>
    </div>
  );
}

type Holiday = "new-year" | "valentines" | "july4" | "halloween" | "thanksgiving" | "christmas" | "diwali" | "holi" | "republic-day" | "india-independence" | "navratri" | "pongal";

const holidayConfigs: Record<Holiday, { bg: string; accent: string; label: string; emoji: string }> = {
  "new-year":           { bg: "#0D1829", accent: "#F5A030", label: "Happy New Year",     emoji: "🎆" },
  "valentines":         { bg: "#9F1239", accent: "#FFC0CB", label: "Happy Valentine's",  emoji: "❤️" },
  "july4":              { bg: "#1C3068", accent: "#E8541A", label: "Independence Day",    emoji: "🇺🇸" },
  "halloween":          { bg: "#1C0A00", accent: "#F5A030", label: "Happy Halloween",     emoji: "🎃" },
  "thanksgiving":       { bg: "#7C2D12", accent: "#FED7AA", label: "Happy Thanksgiving",  emoji: "🦃" },
  "christmas":          { bg: "#14532D", accent: "#FEF08A", label: "Merry Christmas",     emoji: "🎄" },
  "diwali":             { bg: "#1C0A00", accent: "#F5A030", label: "Happy Diwali",        emoji: "🪔" },
  "holi":               { bg: "#FAFAF8", accent: "#E8541A", label: "Happy Holi",          emoji: "🌈" },
  "republic-day":       { bg: "#FF6600", accent: "#FFFFFF", label: "Republic Day",        emoji: "🇮🇳" },
  "india-independence": { bg: "#138808", accent: "#FFFFFF", label: "Independence Day",    emoji: "🇮🇳" },
  "navratri":           { bg: "#7C3AED", accent: "#FDE68A", label: "Happy Navratri",      emoji: "🪷" },
  "pongal":             { bg: "#78350F", accent: "#FDE68A", label: "Happy Pongal",        emoji: "🌾" },
};

export function HolidayLogo({ holiday, width = 240, className = "" }: { holiday: Holiday; width?: number; className?: string }) {
  const cfg = holidayConfigs[holiday];
  const h = Math.round(width * 0.5);
  return (
    <div className={className} style={{
      width, height: h, borderRadius: 14, backgroundColor: cfg.bg,
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      gap: 4, padding: 12, overflow: "hidden", position: "relative",
    }}>
      <div style={{ position: "absolute", top: 8, right: 10, fontSize: Math.round(width * 0.1) }}>{cfg.emoji}</div>
      <BFLogoSVG variant="full" theme="white" width={Math.round(width * 0.75)} />
      <p style={{ fontFamily: "Caveat, cursive", fontSize: Math.round(width * 0.075), color: cfg.accent, margin: 0 }}>{cfg.label}</p>
    </div>
  );
}
