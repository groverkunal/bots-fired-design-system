export interface TypeToken {
  token: string; label: string; family: string; familyStack: string;
  weight: number; weightLabel: string; style: "normal" | "italic";
  sizePx: number; sizeRem: string; lineHeightPx: number; lineHeightRatio: string;
  letterSpacingPx: string; letterSpacingEm: string; paragraphSpacingPx: number;
  maxWidthCh: number | null; transform?: "uppercase" | "none";
  usage: string[]; color: string; hex: string; sample: string;
}

import registry from "./typeTokens.json";
export const TYPE_SCALE = registry as TypeToken[];
