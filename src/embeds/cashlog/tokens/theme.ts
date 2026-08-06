import { primitives } from "./tokens.primitives";

/**
 * Tokens semânticos Cashlog.
 * REGRA: zero hex — só referências a primitives.*
 */
export const theme = {
  colors: {
    background: {
      default: primitives.colors.gray[0],
      subtle: primitives.colors.gray[50],
      muted: primitives.colors.gray[100],
      inverse: primitives.colors.gray[950],
      brand: primitives.colors.purple[500],
    },
    text: {
      default: primitives.colors.gray[950],
      muted: primitives.colors.gray[500],
      subtle: primitives.colors.gray[600],
      inverse: primitives.colors.gray[0],
      brand: primitives.colors.purple[500],
      link: primitives.colors.magenta[500],
    },
    brand: {
      primary: primitives.colors.purple[500],
      primaryHover: primitives.colors.purple[600],
      primaryPressed: primitives.colors.purple[600],
      primarySubtle: primitives.colors.purple[100],
      accent: primitives.colors.magenta[500],
      accentSoft: primitives.colors.magenta[300],
    },
    feedback: {
      success: primitives.colors.green[400],
      successSubtle: primitives.colors.green[300],
      warning: primitives.colors.yellow[500],
      warningSubtle: primitives.colors.yellow[300],
      error: primitives.colors.red[500],
      errorSubtle: primitives.colors.magenta[300],
      info: primitives.colors.blue[400],
      infoSubtle: primitives.colors.blue[300],
    },
    border: {
      default: primitives.colors.gray[200],
      subtle: primitives.colors.gray[250],
      strong: primitives.colors.gray[300],
      brand: primitives.colors.purple[500],
      focus: primitives.colors.magenta[500],
    },
    surface: {
      default: primitives.colors.gray[0],
      raised: primitives.colors.gray[50],
      overlay: primitives.colors.gray[100],
      /** KPI pastel lilac — dashboard cards 1 e 3 */
      kpiLilac: primitives.colors.purple[100],
      /** KPI pastel yellow — dashboard cards 2 e 4 */
      kpiYellow: primitives.colors.yellow[300],
      kpiLilacWash: primitives.colors.purple[50],
    },
    /** Séries do dashboard (linha, barras, donut) — não feedback genérico */
    chart: {
      real: primitives.colors.magenta[500],
      plan: primitives.colors.gray[800],
      planSoft: primitives.colors.magenta[300],
      approved: primitives.colors.yellow[600],
      segmentA: primitives.colors.gray[800],
      segmentB: primitives.colors.yellow[600],
      segmentC: primitives.colors.magenta[500],
      segmentD: primitives.colors.purple[100],
      grid: primitives.colors.gray[200],
    },
  },
  spacing: primitives.spacing,
  fontSize: primitives.fontSize,
  fontFamily: primitives.fontFamily,
  radius: primitives.borderRadius,
  shadow: primitives.boxShadow,
} as const;

export type Theme = typeof theme;
