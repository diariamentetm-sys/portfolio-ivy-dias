/** Semantic theme for v2 (values mirror tokens.css). */
export const v2Theme = {
  colors: {
    canvas: "#F3F0E8",
    ink: "#222222",
    yellow: "#FFE32B",
    pink: "#FF58A4",
    cyan: "#45CDE2",
    lime: "#C8E66B",
  },
  spacing: {
    1: 4,
    2: 8,
    3: 16,
    4: 24,
    5: 48,
    6: 96,
  },
  pixelGap: 1,
  radius: 0,
  nav: {
    about: "#FFE32B",
    work: "#FF58A4",
    journal: "#45CDE2",
    contact: "#C8E66B",
  },
} as const;

export type V2Theme = typeof v2Theme;
