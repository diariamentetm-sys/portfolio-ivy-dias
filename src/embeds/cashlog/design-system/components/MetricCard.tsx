import type { CSSProperties } from "react";
import { theme } from "../../tokens/theme";

export type MetricFill = "lilac" | "yellow";

export interface MetricCardProps {
  label: string;
  value: string;
  /** Ex.: "+11.01%" */
  trend?: string;
  /** Pontos 0–1 para mini sparkline (direita do valor). */
  sparkline?: number[];
  fill?: MetricFill;
}

const fillBg: Record<MetricFill, string> = {
  lilac: theme.colors.surface.kpiLilac,
  yellow: theme.colors.surface.kpiYellow,
};

function Sparkline({ points }: { points: number[] }) {
  if (points.length < 2) return null;
  const w = 48;
  const h = 22;
  const min = Math.min(...points);
  const max = Math.max(...points);
  const range = max - min || 1;
  const coords = points
    .map((p, i) => {
      const x = (i / (points.length - 1)) * w;
      const y = h - ((p - min) / range) * (h - 2) - 1;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <svg
      width={w}
      height={h}
      viewBox={`0 0 ${w} ${h}`}
      aria-hidden
      style={{ flexShrink: 0 }}
    >
      <polyline
        fill="none"
        stroke={theme.colors.chart.real}
        strokeWidth={1.5}
        strokeLinejoin="round"
        strokeLinecap="round"
        points={coords}
      />
    </svg>
  );
}

/**
 * @description KPI flat do dashboard — fill pastel, valor, trend e sparkline.
 * @variant lilac | yellow
 * @uses —
 * @usedBy Foundations/Charts | dashboard
 * @tokens theme.colors.surface.kpiLilac, kpiYellow | theme.colors.text.* | theme.colors.chart.real | theme.radius.md | theme.spacing.* | theme.fontSize.*
 * @snowflake
 */
export function MetricCard({
  label,
  value,
  trend,
  sparkline = [0.2, 0.35, 0.28, 0.55, 0.48, 0.72, 0.9],
  fill = "lilac",
}: MetricCardProps) {
  const root: CSSProperties = {
    backgroundColor: fillBg[fill],
    borderRadius: theme.radius.md,
    padding: `${theme.spacing[4]} ${theme.spacing[3]}`,
    minHeight: 88,
    boxShadow: theme.shadow.none,
    border: "none",
  };

  return (
    <div style={root}>
      <div
        style={{
          fontFamily: theme.fontFamily.sans,
          fontSize: theme.fontSize.xs,
          fontWeight: 400,
          color: theme.colors.text.muted,
        }}
      >
        {label}
      </div>
      <div
        className="flex items-end"
        style={{
          marginTop: theme.spacing[3],
          gap: theme.spacing[2],
          justifyContent: "space-between",
        }}
      >
        <div className="flex items-baseline" style={{ gap: theme.spacing[2] }}>
          <span
            style={{
              fontFamily: theme.fontFamily.sans,
              fontSize: theme.fontSize["3xl"],
              fontWeight: 600,
              lineHeight: 1,
              color: theme.colors.text.default,
            }}
          >
            {value}
          </span>
          {trend ? (
            <span
              style={{
                fontFamily: theme.fontFamily.sans,
                fontSize: theme.fontSize.xs,
                fontWeight: 500,
                color: theme.colors.text.muted,
              }}
            >
              {trend}
            </span>
          ) : null}
        </div>
        <Sparkline points={sparkline} />
      </div>
    </div>
  );
}
