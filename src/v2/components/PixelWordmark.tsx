import {
  I_DOT_COLOR_KEY,
  normalizeWordmarkText,
  PIXEL_GLYPHS,
  type PixelMatrix,
} from "../glyphs/pixelMatrix";
import { v2Theme } from "../tokens/theme";

type PixelWordmarkProps = {
  text: string;
  /** Accessible name when the visual is decorative. */
  label?: string;
  className?: string;
  /** Max width as CSS length; glyph scale fits inside. */
  maxWidth?: string;
  ink?: string;
};

type PixelCell = {
  key: string;
  x: number;
  y: number;
  fill: string;
};

function cellsForGlyph(
  matrix: PixelMatrix,
  originX: number,
  charIndex: number,
  char: string,
  ink: string,
): PixelCell[] {
  const cells: PixelCell[] = [];
  matrix.forEach((row, rowIndex) => {
    row.forEach((bit, colIndex) => {
      if (!bit) return;
      const isIDot = char === "i" && rowIndex === 0;
      cells.push({
        key: `${charIndex}-${rowIndex}-${colIndex}`,
        x: originX + colIndex,
        y: rowIndex,
        fill: isIDot ? v2Theme.colors[I_DOT_COLOR_KEY] : ink,
      });
    });
  });
  return cells;
}

function layoutWord(text: string, ink: string) {
  const normalized = normalizeWordmarkText(text);
  const letterGap = 1;
  let cursorX = 0;
  let maxY = 0;
  const cells: PixelCell[] = [];

  [...normalized].forEach((char, charIndex) => {
    const glyph = PIXEL_GLYPHS[char];
    if (!glyph) return;
    const width = glyph[0]?.length ?? 0;
    const height = glyph.length;
    maxY = Math.max(maxY, height);
    cells.push(...cellsForGlyph(glyph, cursorX, charIndex, char, ink));
    cursorX += width + letterGap;
  });

  const width = Math.max(cursorX - letterGap, 1);
  return { cells, width, height: maxY };
}

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
        {layout.cells.map((cell) => (
          <rect
            key={cell.key}
            x={cell.x * (unit + gapPx)}
            y={cell.y * (unit + gapPx)}
            width={unit}
            height={unit}
            fill={cell.fill}
            data-pixel-id={cell.key}
          />
        ))}
      </svg>
    </div>
  );
}
