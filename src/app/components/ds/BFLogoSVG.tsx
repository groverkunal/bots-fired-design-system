import React from "react";
import logo1 from "figma:asset/Gemini_Generated_Image_8us1f28us1f28us1.png";
import logo2 from "figma:asset/Gemini_Generated_Image_8w18gl8w18gl8w18.png";

/* ─────────────────────────────────────────────
   Reusable BOTS FIRED Logo SVG — all variants
   variant: "full" | "icon" | "wordmark" | "stacked"
   theme:   "color" | "mono" | "white" | "dark" | "sketch" | "outline"
───────────────────────────────────────────── */

export const BF_NAVY   = "#1C2E5E";
export const BF_FIRE   = "#E8541A";
export const BF_AMBER  = "#D97706";
export const BF_GOLD   = "#F5A030";
export const BF_WHITE  = "#FFFFFF";

interface BFLogoSVGProps {
  variant?: "full" | "icon" | "wordmark" | "stacked";
  theme?: "color" | "mono" | "white" | "dark" | "sketch" | "outline";
  width?: number;
  className?: string;
}

/* ── Flame path (scalable at 0,0 64×80 canvas) ── */
function FlamePath({ theme = "color" }: { theme?: string }) {
  const outer = theme === "white" ? "#FFFFFF" : theme === "mono" ? "#333" : theme === "outline" ? "none" : BF_FIRE;
  const inner = theme === "white" ? "rgba(255,255,255,0.6)" : theme === "mono" ? "#666" : theme === "outline" ? "none" : BF_GOLD;
  const stroke = (theme === "sketch" || theme === "outline") ? (theme === "white" ? "#fff" : BF_FIRE) : "none";
  const sw = (theme === "sketch" || theme === "outline") ? "2.5" : "0";

  return (
    <g>
      {/* Outer flame */}
      <path
        d="M32 72 C32 72 8 56 14 34 C18 20 28 12 28 12 C28 12 24 24 32 30 C32 30 36 8 48 2 C48 2 42 24 52 36 C60 46 56 62 48 70 C44 64 40 60 32 72Z"
        fill={outer}
        stroke={stroke}
        strokeWidth={sw}
        strokeLinejoin="round"
      />
      {/* Inner flame */}
      <path
        d="M32 70 C32 70 20 56 26 44 C29 36 34 30 34 30 C34 30 31 40 36 44 C40 34 46 50 40 62 C38 58 36 56 32 70Z"
        fill={inner}
        stroke={theme === "sketch" ? BF_AMBER : "none"}
        strokeWidth={theme === "sketch" ? "1.5" : "0"}
      />
      {/* Sparkles */}
      {(theme !== "outline") && (
        <>
          <circle cx="54" cy="14" r="4" fill={theme === "white" ? "rgba(255,255,255,0.8)" : BF_GOLD} />
          <circle cx="10" cy="40" r="2.5" fill={theme === "white" ? "rgba(255,255,255,0.6)" : BF_AMBER} />
          <circle cx="58" cy="50" r="2" fill={theme === "white" ? "rgba(255,255,255,0.5)" : BF_GOLD} />
          {/* 4-pointed star sparkle */}
          <path d="M54 14 L56 10 L58 14 L56 18Z" fill={theme === "white" ? "#fff" : "#FBBF24"} transform="rotate(45 56 14)" opacity="0.7" />
        </>
      )}
    </g>
  );
}

/* ── Tight separator flame for BOTS [fire] FIRED lockup ── */
function SeparatorFlame({ theme = "color" }: { theme?: string }) {
  const outer = theme === "white" ? "#FFFFFF" : theme === "mono" ? "#333" : theme === "outline" ? "none" : BF_FIRE;
  const inner = theme === "white" ? "rgba(255,255,255,0.6)" : theme === "mono" ? "#666" : theme === "outline" ? "none" : BF_GOLD;
  const starA = theme === "white" ? "#FFFFFF" : theme === "mono" ? "#555" : BF_GOLD;
  const starB = theme === "white" ? "rgba(255,255,255,0.8)" : theme === "mono" ? "#777" : BF_AMBER;
  const stroke = (theme === "sketch" || theme === "outline") ? (theme === "white" ? "#fff" : BF_FIRE) : "none";
  const sw = (theme === "sketch" || theme === "outline") ? "2.2" : "0";

  return (
    <g>
      <path
        d="M32 72 C32 72 8 56 14 34 C18 20 28 12 28 12 C28 12 24 24 32 30 C32 30 36 8 48 2 C48 2 42 24 52 36 C60 46 56 62 48 70 C44 64 40 60 32 72Z"
        fill={outer}
        stroke={stroke}
        strokeWidth={sw}
        strokeLinejoin="round"
      />
      <path
        d="M32 70 C32 70 20 56 26 44 C29 36 34 30 34 30 C34 30 31 40 36 44 C40 34 46 50 40 62 C38 58 36 56 32 70Z"
        fill={inner}
        stroke={theme === "sketch" ? BF_AMBER : "none"}
        strokeWidth={theme === "sketch" ? "1.3" : "0"}
      />
      {/* Exactly two stars */}
      <path d="M56 14 L58 10 L60 14 L58 18 Z" fill={starA} transform="rotate(45 58 14)" opacity="0.95" />
      <path d="M52 30 L53.2 27.6 L55.6 30 L53.2 32.4 Z" fill={starB} transform="rotate(45 53.2 30)" opacity="0.95" />
    </g>
  );
}

/* ── Sketch filter ── */
function SketchFilter({ id }: { id: string }) {
  return (
    <filter id={id} x="-5%" y="-5%" width="110%" height="110%">
      <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="4" seed="2" result="noise" />
      <feDisplacementMap in="SourceGraphic" in2="noise" scale="3" xChannelSelector="R" yChannelSelector="G" result="displaced" />
      <feGaussianBlur in="displaced" stdDeviation="0.3" />
    </filter>
  );
}

export function BFLogoSVG({ variant = "full", theme = "color", width = 280, className = "" }: BFLogoSVGProps) {
  const filterId = `sketch-${Math.random().toString(36).slice(2, 7)}`;
  const navy   = theme === "white" ? "#FFFFFF" : theme === "mono" ? "#1a1a1a" : BF_NAVY;
  const fire   = theme === "white" ? "rgba(255,255,255,0.85)" : theme === "mono" ? "#555" : BF_FIRE;
  const amber  = theme === "white" ? "rgba(255,255,255,0.7)" : theme === "mono" ? "#888" : BF_AMBER;
  const filterAttr = theme === "sketch" ? `url(#${filterId})` : undefined;

  if (variant === "icon") {
    return (
      <svg width={width * 0.35} viewBox="0 0 64 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} filter={filterAttr}>
        {theme === "sketch" && <SketchFilter id={filterId} />}
        <FlamePath theme={theme} />
      </svg>
    );
  }

  if (variant === "stacked") {
    return (
      <svg width={width * 0.6} viewBox="0 0 160 140" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} filter={filterAttr}>
        {theme === "sketch" && <SketchFilter id={filterId} />}
        <g transform="translate(48, 0)">
          <FlamePath theme={theme} />
        </g>
        <text x="80" y="108" textAnchor="middle" fontFamily="Barlow Condensed, sans-serif" fontWeight="800" fontStyle="italic" fontSize="36" fill={navy} letterSpacing="2">BOTS</text>
        <text x="80" y="136" textAnchor="middle" fontFamily="Barlow Condensed, sans-serif" fontWeight="800" fontStyle="italic" fontSize="36" fill={fire} letterSpacing="2">FIRED</text>
      </svg>
    );
  }

  if (variant === "wordmark") {
    return (
      <svg width={width * 0.8} viewBox="0 0 320 56" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} filter={filterAttr}>
        {theme === "sketch" && <SketchFilter id={filterId} />}
        <text x="0" y="44" fontFamily="Barlow Condensed, sans-serif" fontWeight="700" fontStyle="italic" fontSize="52" fill={navy} letterSpacing="1.2">BOTS</text>
        <g transform="translate(114, -2) scale(0.58)">
          <SeparatorFlame theme={theme} />
        </g>
        <text x="168" y="44" fontFamily="Barlow Condensed, sans-serif" fontWeight="700" fontStyle="italic" fontSize="52" fill={navy} letterSpacing="1.2">FIRED</text>
      </svg>
    );
  }

  /* full / default */
  return (
    <svg width={width} viewBox="0 0 360 86" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} filter={filterAttr}>
      {theme === "sketch" && <SketchFilter id={filterId} />}
      {/* Tight BOTS [fire] FIRED lockup */}
      <text x="12" y="42" fontFamily="Barlow Condensed, sans-serif" fontWeight="700" fontStyle="italic" fontSize="44" fill={navy} letterSpacing="1.4">BOTS</text>
      <g transform="translate(108, 0) scale(0.56)">
        <SeparatorFlame theme={theme} />
      </g>
      <text x="166" y="42" fontFamily="Barlow Condensed, sans-serif" fontWeight="700" fontStyle="italic" fontSize="44" fill={navy} letterSpacing="1.4">FIRED</text>
      {/* Tagline */}
      <text x="12" y="70" fontFamily="Inter, sans-serif" fontWeight="400" fontSize="12" fill={amber} letterSpacing="3">AI FOR LEADERS</text>
    </svg>
  );
}

/* ─── Imported photo logo (actual brand asset) ─── */
export function BFPhotoLogo({ height = 40, white = false, className = "" }: { height?: number; white?: boolean; className?: string }) {
  return (
    <img
      src={logo1}
      alt="BOTS FIRED"
      style={{
        height,
        filter: white ? "brightness(0) invert(1)" : undefined,
      }}
      className={className}
    />
  );
}

export function BFPhotoLogo2({ height = 40, white = false, className = "" }: { height?: number; white?: boolean; className?: string }) {
  return (
    <img
      src={logo2}
      alt="BOTS FIRED"
      style={{
        height,
        filter: white ? "brightness(0) invert(1)" : undefined,
      }}
      className={className}
    />
  );
}

/* ─── Holiday Logo Overlay ─── */
interface HolidayLogoProps {
  holiday: string;
  width?: number;
}

const holidayConfigs: Record<string, {
  bg: string; overlay: React.ReactNode; label: string; textColor: string;
}> = {
  "new-year": {
    bg: "#0a0a2e",
    textColor: "#FFD700",
    label: "New Year",
    overlay: (
      <g>
        {/* Fireworks */}
        {[[80, 10], [160, 5], [250, 12], [310, 8]].map(([x, y], i) => (
          <g key={i} transform={`translate(${x},${y})`}>
            {[0,45,90,135,180,225,270,315].map((angle, j) => (
              <line key={j} x1="0" y1="0" x2={Math.cos(angle * Math.PI / 180) * 12} y2={Math.sin(angle * Math.PI / 180) * 12}
                stroke={["#FFD700","#FF6B6B","#4ECDC4","#FFE66D"][j % 4]} strokeWidth="1.5" strokeLinecap="round" />
            ))}
            <circle cx="0" cy="0" r="2.5" fill="#FFD700" />
          </g>
        ))}
        <text x="160" y="88" textAnchor="middle" fontFamily="Caveat, cursive" fontWeight="700" fontSize="14" fill="#FFD700" letterSpacing="2">Happy New Year 2026!</text>
      </g>
    ),
  },
  "valentines": {
    bg: "#FFF0F3",
    textColor: "#E63946",
    label: "Valentine's Day",
    overlay: (
      <g>
        {[[20,8],[300,6],[50,70],[280,68],[160,4]].map(([x, y], i) => (
          <g key={i} transform={`translate(${x},${y}) scale(${0.6 + i * 0.1})`}>
            <path d="M0 4 C0 2 2 0 4 0 C6 0 8 2 8 4 C8 6 4 10 0 14 C-4 10 -8 6 -8 4 C-8 2 -6 0 -4 0 C-2 0 0 2 0 4Z" fill="#E63946" opacity="0.7" />
          </g>
        ))}
        <text x="160" y="88" textAnchor="middle" fontFamily="Caveat, cursive" fontWeight="700" fontSize="14" fill="#E63946">Happy Valentine's Day ♥</text>
      </g>
    ),
  },
  "july4": {
    bg: "#0A1628",
    textColor: "#E8541A",
    label: "4th of July",
    overlay: (
      <g>
        {/* Stars */}
        {[[30,8],[80,4],[130,10],[200,6],[250,8],[300,5]].map(([x, y], i) => (
          <g key={i} transform={`translate(${x},${y})`}>
            <path d="M0-6L1.4-2H6L2.4 1 3.8 5 0 2.5-3.8 5-2.4 1-6-2H-1.4Z" fill={["#E8541A","#FFFFFF","#1C3A7A"][i % 3]} transform="scale(0.8)" />
          </g>
        ))}
        {/* Red/white/blue stripes hint */}
        <rect x="0" y="76" width="113" height="4" fill="#B22234" opacity="0.5" rx="2" />
        <rect x="113" y="76" width="114" height="4" fill="#FFFFFF" opacity="0.5" rx="2" />
        <rect x="227" y="76" width="113" height="4" fill="#3C3B6E" opacity="0.5" rx="2" />
        <text x="160" y="90" textAnchor="middle" fontFamily="Caveat, cursive" fontWeight="700" fontSize="13" fill="#FFD700">Happy Independence Day 🇺🇸</text>
      </g>
    ),
  },
  "halloween": {
    bg: "#1A0A00",
    textColor: "#F5A030",
    label: "Halloween",
    overlay: (
      <g>
        {/* Moon */}
        <circle cx="310" cy="12" r="14" fill="#FFD700" opacity="0.9" />
        <circle cx="318" cy="8" r="12" fill="#1A0A00" />
        {/* Spiderweb */}
        <g transform="translate(20,0)" opacity="0.6">
          {[0,60,120,180,240,300].map((a, i) => (
            <line key={i} x1="0" y1="0" x2={Math.cos(a*Math.PI/180)*22} y2={Math.sin(a*Math.PI/180)*22} stroke="#aaa" strokeWidth="0.7" />
          ))}
          {[8,15,22].map((r, i) => (
            <circle key={i} cx="0" cy="0" r={r} fill="none" stroke="#aaa" strokeWidth="0.5" />
          ))}
        </g>
        <text x="160" y="88" textAnchor="middle" fontFamily="Caveat, cursive" fontWeight="700" fontSize="14" fill="#F5A030">🎃 Spooky AI Season!</text>
      </g>
    ),
  },
  "thanksgiving": {
    bg: "#FFF8ED",
    textColor: "#8B4513",
    label: "Thanksgiving",
    overlay: (
      <g>
        {/* Autumn leaves */}
        {[[25,8,"#D2691E"],[50,4,"#CD853F"],[280,6,"#A0522D"],[305,10,"#8B4513"],[160,3,"#DEB887"]].map(([x, y, c], i) => (
          <ellipse key={i} cx={x as number} cy={y as number} rx="7" ry="4" fill={c as string} opacity="0.8" transform={`rotate(${i*30} ${x} ${y})`} />
        ))}
        <text x="160" y="88" textAnchor="middle" fontFamily="Caveat, cursive" fontWeight="700" fontSize="14" fill="#8B4513">Grateful for great leadership 🦃</text>
      </g>
    ),
  },
  "christmas": {
    bg: "#0A1F0A",
    textColor: "#FFD700",
    label: "Christmas",
    overlay: (
      <g>
        {/* Snowflakes */}
        {[[30,8],[90,5],[160,4],[230,7],[295,5]].map(([x, y], i) => (
          <g key={i} transform={`translate(${x},${y})`}>
            {[0,60,120].map((a, j) => (
              <line key={j} x1={Math.cos(a*Math.PI/180)*8} y1={Math.sin(a*Math.PI/180)*8} x2={Math.cos((a+180)*Math.PI/180)*8} y2={Math.sin((a+180)*Math.PI/180)*8} stroke="white" strokeWidth="1.2" strokeLinecap="round" opacity="0.8" />
            ))}
          </g>
        ))}
        {/* Holly berries */}
        <circle cx="295" cy="30" r="3" fill="#C41E3A" />
        <circle cx="302" cy="27" r="3" fill="#C41E3A" />
        <text x="160" y="88" textAnchor="middle" fontFamily="Caveat, cursive" fontWeight="700" fontSize="14" fill="#FFD700">Season's Greetings 🎄</text>
      </g>
    ),
  },
  "diwali": {
    bg: "#1A0D00",
    textColor: "#FFD700",
    label: "Diwali",
    overlay: (
      <g>
        {/* Diyas */}
        {[[30,62],[80,65],[130,62],[195,65],[250,62],[305,65]].map(([x, y], i) => (
          <g key={i} transform={`translate(${x},${y})`}>
            {/* Flame */}
            <ellipse cx="0" cy="-10" rx="3" ry="6" fill="#FFD700" opacity="0.9" />
            <ellipse cx="0" cy="-8" rx="1.5" ry="3" fill="#FF6B00" opacity="0.8" />
            {/* Diya bowl */}
            <path d="M-8 0 Q0-5 8 0 Q8 5 0 6 Q-8 5 -8 0Z" fill="#C65C00" />
            <ellipse cx="0" cy="0" rx="8" ry="3" fill="#D97706" opacity="0.6" />
          </g>
        ))}
        {/* Gold sparkles */}
        {[[50,20],[160,15],[270,22]].map(([x, y], i) => (
          <g key={i}>
            <circle cx={x as number} cy={y as number} r="2" fill="#FFD700" opacity="0.8" />
            <line x1={x as number} y1={(y as number) - 6} x2={x as number} y2={(y as number) + 6} stroke="#FFD700" strokeWidth="0.8" opacity="0.5" />
            <line x1={(x as number) - 6} y1={y as number} x2={(x as number) + 6} y2={y as number} stroke="#FFD700" strokeWidth="0.8" opacity="0.5" />
          </g>
        ))}
        <text x="160" y="88" textAnchor="middle" fontFamily="Caveat, cursive" fontWeight="700" fontSize="14" fill="#FFD700">Happy Diwali! दीपावली मुबारक ✨</text>
      </g>
    ),
  },
  "holi": {
    bg: "#FFF5FF",
    textColor: "#7B2D8B",
    label: "Holi",
    overlay: (
      <g>
        {/* Color splashes */}
        {[
          [20, 10, "#FF6B6B", 18],
          [70, 5, "#4ECDC4", 14],
          [130, 12, "#FFE66D", 20],
          [200, 8, "#A8E6CF", 15],
          [255, 6, "#FF8B94", 16],
          [310, 10, "#9B59B6", 14],
        ].map(([x, y, c, r], i) => (
          <ellipse key={i} cx={x as number} cy={y as number} rx={r as number} ry={(r as number) * 0.6} fill={c as string} opacity="0.55" transform={`rotate(${i * 20} ${x} ${y})`} />
        ))}
        <text x="160" y="88" textAnchor="middle" fontFamily="Caveat, cursive" fontWeight="700" fontSize="14" fill="#7B2D8B">Happy Holi! होली की शुभकामनाएँ 🌈</text>
      </g>
    ),
  },
  "republic-day": {
    bg: "#FFFFFF",
    textColor: "#FF9933",
    label: "Republic Day (India)",
    overlay: (
      <g>
        {/* Tricolor stripes */}
        <rect x="0" y="0" width="340" height="5" fill="#FF9933" opacity="0.7" />
        <rect x="0" y="5" width="340" height="5" fill="#FFFFFF" opacity="0.7" />
        <rect x="0" y="10" width="340" height="5" fill="#138808" opacity="0.7" />
        {/* Ashoka wheel */}
        <g transform="translate(320, 30)">
          {Array.from({ length: 24 }).map((_, i) => (
            <line key={i} x1="0" y1="-14" x2="0" y2="14" stroke="#000080" strokeWidth="0.7" opacity="0.7" transform={`rotate(${i * 15})`} />
          ))}
          <circle cx="0" cy="0" r="14" fill="none" stroke="#000080" strokeWidth="1.2" opacity="0.7" />
          <circle cx="0" cy="0" r="3" fill="#000080" opacity="0.7" />
        </g>
        <text x="155" y="88" textAnchor="middle" fontFamily="Caveat, cursive" fontWeight="700" fontSize="13" fill="#000080">Jai Hind! Republic Day 🇮🇳 Jan 26</text>
      </g>
    ),
  },
  "india-independence": {
    bg: "#F0FFF0",
    textColor: "#138808",
    label: "India Independence Day",
    overlay: (
      <g>
        <rect x="0" y="0" width="340" height="6" fill="#FF9933" opacity="0.6" />
        <rect x="0" y="6" width="340" height="6" fill="#FFFFFF" opacity="0.8" />
        <rect x="0" y="12" width="340" height="6" fill="#138808" opacity="0.6" />
        {/* Kites */}
        {[[40, 40],[160, 30],[280, 42]].map(([x, y], i) => (
          <g key={i} transform={`translate(${x},${y})`}>
            <path d="M0-12L8 0L0 12L-8 0Z" fill={["#FF9933","#138808","#FF9933"][i]} opacity="0.7" />
            <line x1="0" y1="12" x2="5" y2="28" stroke="#888" strokeWidth="0.6" />
          </g>
        ))}
        <text x="155" y="88" textAnchor="middle" fontFamily="Caveat, cursive" fontWeight="700" fontSize="13" fill="#138808">Happy Independence Day! 🇮🇳 Aug 15</text>
      </g>
    ),
  },
  "navratri": {
    bg: "#FF6B35",
    textColor: "#FFD700",
    label: "Navratri",
    overlay: (
      <g>
        {/* Garba dots */}
        {[
          ["#FFD700", 30, 12], ["#FF1493", 80, 8], ["#00CED1", 130, 12],
          ["#FFD700", 210, 10], ["#FF1493", 260, 8], ["#00CED1", 300, 12],
        ].map(([c, x, y], i) => (
          <g key={i}>
            <circle cx={x as number} cy={y as number} r="6" fill={c as string} opacity="0.8" />
            <circle cx={(x as number)} cy={y as number} r="3" fill="white" opacity="0.5" />
          </g>
        ))}
        <text x="160" y="88" textAnchor="middle" fontFamily="Caveat, cursive" fontWeight="700" fontSize="14" fill="#FFD700">Navratri Celebrations! 🪔 Garba Time!</text>
      </g>
    ),
  },
  "pongal": {
    bg: "#FFF8DC",
    textColor: "#8B4513",
    label: "Pongal",
    overlay: (
      <g>
        {/* Sugarcane */}
        {[[20, 0], [28, 0], [300, 0], [308, 0]].map(([x], i) => (
          <line key={i} x1={x} y1="0" x2={x} y2="80" stroke="#228B22" strokeWidth="3" opacity="0.4" />
        ))}
        {/* Pongal pot */}
        <g transform="translate(155, 30)">
          <ellipse cx="0" cy="0" rx="12" ry="8" fill="#C65C00" />
          <rect x="-10" y="0" width="20" height="20" fill="#CD853F" rx="2" />
          <ellipse cx="0" cy="20" rx="11" ry="5" fill="#A0522D" />
          {/* Milk overflow */}
          <ellipse cx="0" cy="-2" rx="10" ry="4" fill="white" opacity="0.7" />
        </g>
        <text x="160" y="88" textAnchor="middle" fontFamily="Caveat, cursive" fontWeight="700" fontSize="14" fill="#8B4513">Happy Pongal! பொங்கல் வாழ்த்துக்கள் 🌾</text>
      </g>
    ),
  },
};

export function HolidayLogo({ holiday, width = 340 }: HolidayLogoProps) {
  const config = holidayConfigs[holiday];
  if (!config) return null;

  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className="rounded-2xl overflow-hidden relative"
        style={{ background: config.bg, width, padding: "12px 12px 4px" }}
      >
        <svg width={width - 24} viewBox="0 0 340 96" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Main logo */}
          <FlamePath theme="color" />
          <text x="72" y="36" fontFamily="Barlow Condensed, sans-serif" fontWeight="800" fontStyle="italic" fontSize="38" fill={BF_NAVY} letterSpacing="2">BOTS</text>
          <circle cx="198" cy="26" r="3" fill={BF_AMBER} />
          <text x="208" y="36" fontFamily="Barlow Condensed, sans-serif" fontWeight="800" fontStyle="italic" fontSize="38" fill={BF_FIRE} letterSpacing="2">FIRED</text>
          <text x="72" y="56" fontFamily="Inter, sans-serif" fontWeight="400" fontSize="11" fill={BF_AMBER} letterSpacing="3">AI FOR LEADERS</text>
          {/* Holiday overlay */}
          {config.overlay}
        </svg>
      </div>
      <span className="text-xs font-semibold text-center" style={{ color: "#6B7280" }}>{config.label}</span>
    </div>
  );
}
