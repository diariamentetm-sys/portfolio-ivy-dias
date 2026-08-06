/**
 * Primitivos Cashlog — valores da fonte real:
 * `styles/tokens.css` + `tailwind.cashlog.config.js` + hex do CSS legado
 * documentados em design-system.md (Fase 1).
 *
 * Nomenclatura: família → peso (ex.: purple.500).
 * Semântica fica em theme.ts (nunca hex lá).
 */
export const primitives = {
  colors: {
    purple: {
      50: "var(--cashlog-pink-wash)",
      100: "var(--cashlog-pink-light)",
      300: "#9F639F",
      500: "var(--cashlog-purple)",
      600: "var(--cashlog-purple-mid)",
    },
    magenta: {
      300: "var(--cashlog-magenta-soft)",
      500: "var(--cashlog-magenta)",
    },
    yellow: {
      300: "var(--cashlog-yellow-pale)",
      500: "var(--cashlog-yellow)",
      600: "var(--cashlog-yellow-gold)",
    },
    gray: {
      0: "var(--cashlog-canvas)",
      50: "#F7F9FB",
      100: "var(--cashlog-surface)",
      200: "var(--cashlog-border)",
      250: "var(--cashlog-border-soft)",
      300: "#CBCED4",
      400: "#D9D9D9",
      500: "var(--cashlog-muted)",
      600: "#525252",
      800: "#1C1C1C",
      900: "#000000",
      950: "var(--cashlog-ink)",
    },
    red: {
      500: "var(--cashlog-danger)",
    },
    blue: {
      200: "#A8C5DA",
      300: "#B1E3FF",
      400: "#95A4FC",
    },
    green: {
      300: "#BAEDBD",
      400: "#A1E3CB",
    },
  },
  spacing: {
    1: "var(--space-1)",
    2: "var(--space-2)",
    3: "var(--space-3)",
    4: "var(--space-4)",
    5: "var(--space-5)",
    6: "var(--space-6)",
    8: "var(--space-8)",
    10: "var(--space-10)",
    12: "var(--space-12)",
  },
  fontSize: {
    xs: "var(--text-xs)",
    sm: "var(--text-sm)",
    base: "var(--text-base)",
    lg: "var(--text-lg)",
    xl: "var(--text-xl)",
    "2xl": "var(--text-2xl)",
    "3xl": "var(--text-3xl)",
  },
  fontFamily: {
    sans: "var(--font-sans)",
  },
  borderRadius: {
    sm: "var(--radius-sm)",
    md: "var(--radius-md)",
    lg: "var(--radius-lg)",
    xl: "var(--radius-xl)",
  },
  /**
   * Elevação rara no Cashlog — dashboard é flat (sem sombra em cards).
   * Reservado a FAB / tooltip pontual, nunca a Card/MetricCard.
   */
  boxShadow: {
    none: "none",
    sm: "0 2px 8px rgba(250, 8, 251, 0.28)",
    md: "0 8px 24px rgba(116, 0, 117, 0.28)",
  },
} as const;

export type Primitives = typeof primitives;
