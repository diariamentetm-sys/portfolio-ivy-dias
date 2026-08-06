import { theme } from "../../tokens/theme";
import { Card, CardHeader } from "./Card";

export type DonutTone = "segmentA" | "segmentB" | "segmentC" | "segmentD";

export interface DonutSlice {
  label: string;
  /** Percentual 0–100. */
  value: number;
  tone?: DonutTone;
}

export interface DonutChartProps {
  title?: string;
  slices: DonutSlice[];
  size?: number;
  thickness?: number;
}

const toneColor: Record<DonutTone, string> = {
  segmentA: theme.colors.chart.segmentA,
  segmentB: theme.colors.chart.segmentB,
  segmentC: theme.colors.chart.segmentC,
  segmentD: theme.colors.chart.segmentD,
};

const DEFAULT_TONES: DonutTone[] = ["segmentA", "segmentB", "segmentC", "segmentD"];

function polar(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

function arcPath(
  cx: number,
  cy: number,
  r: number,
  startAngle: number,
  endAngle: number,
) {
  const start = polar(cx, cy, r, endAngle);
  const end = polar(cx, cy, r, startAngle);
  const large = endAngle - startAngle > 180 ? 1 : 0;
  return `M ${start.x} ${start.y} A ${r} ${r} 0 ${large} 0 ${end.x} ${end.y}`;
}

/**
 * @description Donut + legenda — Estados mais demandados (dashboard).
 * @variant —
 * @uses Card | CardHeader
 * @usedBy Foundations/Charts
 * @tokens theme.colors.chart.segmentA|B|C|D | theme.colors.text.* | theme.spacing.* | theme.fontSize.xs, sm
 * @snowflake
 */
export function DonutChart({
  title = "Estados mais demandados",
  slices,
  size = 140,
  thickness = 22,
}: DonutChartProps) {
  const cx = size / 2;
  const cy = size / 2;
  const r = size / 2 - thickness / 2;
  const total = slices.reduce((sum, s) => sum + s.value, 0) || 1;

  let angle = 0;
  const arcs = slices.map((slice, i) => {
    const sweep = (slice.value / total) * 360;
    const start = angle;
    const end = angle + sweep;
    angle = end;
    const tone = slice.tone ?? DEFAULT_TONES[i % DEFAULT_TONES.length];
    return {
      ...slice,
      tone,
      d: arcPath(cx, cy, r, start, end - 0.01),
    };
  });

  return (
    <Card variant="default" padding={5}>
      <CardHeader title={title} />
      <div
        className="flex items-center"
        style={{ gap: theme.spacing[6], marginTop: theme.spacing[2] }}
      >
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden>
          {arcs.map((arc) => (
            <path
              key={arc.label}
              d={arc.d}
              fill="none"
              stroke={toneColor[arc.tone]}
              strokeWidth={thickness}
              strokeLinecap="butt"
            />
          ))}
        </svg>

        <ul
          style={{
            listStyle: "none",
            margin: 0,
            padding: 0,
            display: "flex",
            flexDirection: "column",
            gap: theme.spacing[3],
            fontFamily: theme.fontFamily.sans,
            fontSize: theme.fontSize.xs,
            color: theme.colors.text.default,
            minWidth: 0,
            flex: 1,
          }}
        >
          {arcs.map((arc) => (
            <li
              key={arc.label}
              className="flex items-center justify-between"
              style={{ gap: theme.spacing[3] }}
            >
              <span className="flex items-center" style={{ gap: 8, minWidth: 0 }}>
                <span
                  aria-hidden
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    backgroundColor: toneColor[arc.tone],
                    flexShrink: 0,
                  }}
                />
                <span
                  style={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {arc.label}
                </span>
              </span>
              <span style={{ color: theme.colors.text.muted, flexShrink: 0 }}>
                {arc.value.toFixed(1)}%
              </span>
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
}
