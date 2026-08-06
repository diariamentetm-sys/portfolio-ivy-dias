import { useState } from "react";
import { theme } from "../../tokens/theme";
import { Card } from "./Card";

export interface BarChartPoint {
  label: string;
  /** Altura relativa 0–100 da barra Real (magenta). */
  real: number;
  /** Altura relativa 0–100 da barra Total aprovado (amarelo). */
  approved: number;
  realLabel?: string;
  approvedLabel?: string;
}

export interface BarChartProps {
  title?: string;
  points: BarChartPoint[];
  realLegend?: string;
  approvedLegend?: string;
}

/**
 * @description Barras verticais agrupadas — Real (magenta) × Total aprovado (amarelo).
 * @variant —
 * @uses Card
 * @usedBy Foundations/Charts
 * @tokens theme.colors.chart.real, approved | theme.colors.text.* | theme.colors.border.default | theme.radius.sm | theme.spacing.* | theme.fontSize.xs, sm
 * @snowflake
 */
export function BarChart({
  title = "Real X Total Aprovado",
  points,
  realLegend = "Real",
  approvedLegend = "Total aprovado",
}: BarChartProps) {
  const [active, setActive] = useState<number | null>(null);

  return (
    <Card variant="default" padding={5}>
      <div
        className="flex items-center justify-between"
        style={{ gap: theme.spacing[3], marginBottom: theme.spacing[3] }}
      >
        <h3
          style={{
            margin: 0,
            fontFamily: theme.fontFamily.sans,
            fontSize: theme.fontSize.sm,
            fontWeight: 600,
            color: theme.colors.text.default,
          }}
        >
          {title}
        </h3>
        <div
          className="flex items-center"
          style={{
            gap: theme.spacing[4],
            fontFamily: theme.fontFamily.sans,
            fontSize: theme.fontSize.xs,
            color: theme.colors.text.muted,
            flexShrink: 0,
          }}
        >
          <LegendDot color={theme.colors.chart.real} label={realLegend} />
          <LegendDot color={theme.colors.chart.approved} label={approvedLegend} />
        </div>
      </div>

      <div
        className="grid"
        style={{
          gridTemplateColumns: `repeat(${points.length}, 1fr)`,
          alignItems: "end",
          gap: theme.spacing[2],
          height: 160,
        }}
      >
        {points.map((point, i) => {
          const isActive = active === i;
          const dimmed = active !== null && !isActive;
          return (
            <button
              key={point.label}
              type="button"
              onClick={() => setActive(isActive ? null : i)}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 4,
                alignItems: "center",
                justifyContent: "flex-end",
                height: "100%",
                border: "none",
                background: "transparent",
                cursor: "pointer",
                padding: 0,
                position: "relative",
              }}
            >
              <div
                className="flex"
                style={{
                  gap: 3,
                  alignItems: "flex-end",
                  height: "100%",
                  justifyContent: "center",
                  width: "100%",
                }}
              >
                <div
                  style={{
                    width: 12,
                    height: `${Math.max(4, Math.min(100, point.real))}%`,
                    borderRadius: theme.radius.sm,
                    backgroundColor: theme.colors.chart.real,
                    opacity: dimmed ? 0.35 : 1,
                    transform: isActive ? "scaleY(1.06)" : "scaleY(1)",
                    transformOrigin: "bottom",
                    transition: "opacity .2s ease, transform .22s ease",
                  }}
                />
                <div
                  style={{
                    width: 12,
                    height: `${Math.max(4, Math.min(100, point.approved))}%`,
                    borderRadius: theme.radius.sm,
                    backgroundColor: theme.colors.chart.approved,
                    opacity: dimmed ? 0.35 : 1,
                    transform: isActive ? "scaleY(1.06)" : "scaleY(1)",
                    transformOrigin: "bottom",
                    transition: "opacity .2s ease, transform .22s ease",
                  }}
                />
              </div>
              <span
                style={{
                  fontFamily: theme.fontFamily.sans,
                  fontSize: theme.fontSize.xs,
                  color: isActive ? theme.colors.text.default : theme.colors.text.muted,
                  fontWeight: isActive ? 600 : 400,
                }}
              >
                {point.label}
              </span>
              {isActive ? (
                <div
                  style={{
                    position: "absolute",
                    bottom: "94%",
                    left: "50%",
                    transform: "translateX(-50%)",
                    backgroundColor: theme.colors.background.inverse,
                    color: theme.colors.text.inverse,
                    fontFamily: theme.fontFamily.sans,
                    fontSize: theme.fontSize.xs,
                    lineHeight: 1.35,
                    padding: "5px 8px",
                    borderRadius: theme.radius.sm,
                    whiteSpace: "nowrap",
                    zIndex: 2,
                    pointerEvents: "none",
                  }}
                >
                  <div style={{ color: theme.colors.chart.real }}>
                    Real {point.realLabel ?? `${point.real}`}
                  </div>
                  <div style={{ color: theme.colors.chart.approved }}>
                    Aprov. {point.approvedLabel ?? `${point.approved}`}
                  </div>
                </div>
              ) : null}
            </button>
          );
        })}
      </div>
    </Card>
  );
}

function LegendDot({ color, label }: { color: string; label: string }) {
  return (
    <span className="flex items-center" style={{ gap: 6 }}>
      <span
        aria-hidden
        style={{
          width: 8,
          height: 8,
          borderRadius: "50%",
          backgroundColor: color,
          display: "inline-block",
        }}
      />
      {label}
    </span>
  );
}
