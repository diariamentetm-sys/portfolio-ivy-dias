import { useState } from "react";
import { theme } from "../../tokens/theme";
import { Card } from "./Card";

export interface LineChartPoint {
  label: string;
  /** Valor formatado no tooltip (ex. "30.256,598"). */
  valueLabel: string;
  /** 0–1 no eixo X. */
  x: number;
  /** 0–1 no eixo Y (0 = topo). Real acumulado. */
  y: number;
  /** 0–1 no eixo Y do Plano (linha pontilhada). */
  planY: number;
}

export interface LineChartProps {
  title?: string;
  points: LineChartPoint[];
  yTicks?: string[];
  planLegend?: string;
  realLegend?: string;
  defaultIndex?: number;
}

/**
 * @description Linha Dupla — Plano (pontilhado) × Real Acumulado (magenta sólido).
 * @variant —
 * @uses Card
 * @usedBy Foundations/Charts
 * @tokens theme.colors.chart.plan, real, grid | theme.colors.text.* | theme.spacing.* | theme.radius.sm | theme.fontSize.xs, sm
 * @snowflake
 */
export function LineChart({
  title = "Dispêndio X Plano Mensal",
  points,
  yTicks = ["30M", "20M", "10M", "0"],
  planLegend = "Plano",
  realLegend = "Real Acumulado",
  defaultIndex = 2,
}: LineChartProps) {
  const [index, setIndex] = useState(defaultIndex);
  const active = points[Math.min(index, points.length - 1)];

  const planPoints = points.map((p) => `${p.x * 100},${p.planY * 100}`).join(" ");
  const realPoints = points.map((p) => `${p.x * 100},${p.y * 100}`).join(" ");

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
          <LegendDot color={theme.colors.chart.plan} label={planLegend} />
          <LegendDot color={theme.colors.chart.real} label={realLegend} />
        </div>
      </div>

      <div className="flex" style={{ gap: theme.spacing[2] }}>
        <div
          className="flex flex-col justify-between"
          style={{
            fontFamily: theme.fontFamily.sans,
            fontSize: 10,
            color: theme.colors.text.muted,
            paddingBottom: 18,
            width: 28,
          }}
        >
          {yTicks.map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>

        <div style={{ flex: 1, position: "relative", height: 168 }}>
          <svg
            viewBox="0 0 100 100"
            width="100%"
            height="100%"
            preserveAspectRatio="none"
            aria-hidden
          >
            {[0.25, 0.5, 0.75].map((y) => (
              <line
                key={y}
                x1={0}
                x2={100}
                y1={y * 100}
                y2={y * 100}
                stroke={theme.colors.chart.grid}
                strokeWidth={0.4}
              />
            ))}
            <polyline
              fill="none"
              stroke={theme.colors.chart.plan}
              strokeWidth={1.2}
              strokeDasharray="2.5 2.5"
              vectorEffect="non-scaling-stroke"
              points={planPoints}
            />
            <polyline
              fill="none"
              stroke={theme.colors.chart.real}
              strokeWidth={2}
              vectorEffect="non-scaling-stroke"
              points={realPoints}
            />
          </svg>

          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "grid",
              gridTemplateColumns: `repeat(${points.length}, 1fr)`,
            }}
          >
            {points.map((point, i) => (
              <button
                key={point.label}
                type="button"
                aria-label={`${point.label} ${point.valueLabel}`}
                aria-pressed={index === i}
                onClick={() => setIndex(i)}
                style={{
                  border: "none",
                  background:
                    index === i ? theme.colors.surface.kpiLilacWash : "transparent",
                  cursor: "pointer",
                  padding: 0,
                }}
              />
            ))}
          </div>

          {active ? (
            <div
              style={{
                position: "absolute",
                left: `${active.x * 100}%`,
                top: `${active.y * 100}%`,
                transform: "translate(-50%, calc(-100% - 10px))",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 4,
                pointerEvents: "none",
                zIndex: 2,
              }}
            >
              <div
                style={{
                  fontFamily: theme.fontFamily.sans,
                  backgroundColor: theme.colors.chart.real,
                  color: theme.colors.text.inverse,
                  fontSize: theme.fontSize.xs,
                  padding: "3px 7px",
                  borderRadius: theme.radius.sm,
                  whiteSpace: "nowrap",
                  boxShadow: theme.shadow.sm,
                }}
              >
                {active.valueLabel}
              </div>
              <div
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  backgroundColor: theme.colors.chart.real,
                  border: `2px solid ${theme.colors.surface.default}`,
                }}
              />
            </div>
          ) : null}

          <div
            className="flex justify-between"
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              bottom: -2,
              fontFamily: theme.fontFamily.sans,
              fontSize: theme.fontSize.xs,
              color: theme.colors.text.muted,
            }}
          >
            {points.map((p) => (
              <span key={p.label}>{p.label}</span>
            ))}
          </div>
        </div>
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
