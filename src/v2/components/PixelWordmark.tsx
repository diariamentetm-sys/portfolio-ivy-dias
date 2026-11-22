import { layoutWord } from "../glyphs/wordLayout";
import { v2Theme } from "../tokens/theme";

type PixelWordmarkProps = {
  text: string;
  label?: string;
  className?: string;
  maxWidth?: string;
  ink?: string;
};

/**
 * @description Monumental name built from 1:1 squares (not a pixel font face).
 */
export function PixelWordmark({
  text,
  label,
  className = "",
  maxWidth = "90%",
  ink = v2Theme.colors.ink,
}: PixelWordmarkProps) {
  const layout = layoutWord(text, ink);
  const unit = 10;
  const gapPx = v2Theme.pixelGap;
  const svgW = layout.width * unit + Math.max(layout.width - 1, 0) * gapPx;
  const svgH = layout.height * unit + Math.max(layout.height - 1, 0) * gapPx;

  return (
    <div className={className} style={{ width: maxWidth, maxWidth: "100%" }}>
      <svg
        viewBox={`0 0 ${svgW} ${svgH}`}
        width="100%"
        height="auto"
        role="img"
        aria-label={label ?? text}
        focusable="false"
      >
        <title>{label ?? text}</title>
        {layout.cells.map((cell, index) => (
          <rect
            key={`${cell.x}-${cell.y}-${index}`}
            x={cell.x * (unit + gapPx)}
            y={cell.y * (unit + gapPx)}
            width={unit}
            height={unit}
            fill={cell.fill}
          />
        ))}
      </svg>
    </div>
  );
}
