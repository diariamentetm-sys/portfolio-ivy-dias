import {
  I_DOT_COLOR_KEY,
  normalizeWordmarkText,
  PIXEL_GLYPHS,
  type PixelMatrix,
} from "./pixelMatrix";
import { v2Theme } from "../tokens/theme";

export type LayoutCell = {
  x: number;
  y: number;
  fill: string;
};

export type WordLayout = {
  cells: LayoutCell[];
  width: number;
  height: number;
};

function cellsForGlyph(
  matrix: PixelMatrix,
  originX: number,
  char: string,
  ink: string,
): LayoutCell[] {
  const cells: LayoutCell[] = [];
  matrix.forEach((row, rowIndex) => {
    row.forEach((bit, colIndex) => {
      if (!bit) return;
      const isIDot = char === "i" && rowIndex === 0;
      cells.push({
        x: originX + colIndex,
        y: rowIndex,
        fill: isIDot ? v2Theme.colors[I_DOT_COLOR_KEY] : ink,
      });
    });
  });
  return cells;
}

/** Grid coordinates for a wordmark string (shared by static SVG and morph). */
export function layoutWord(text: string, ink: string): WordLayout {
  const normalized = normalizeWordmarkText(text);
  const letterGap = 1;
  let cursorX = 0;
  let maxY = 0;
  const cells: LayoutCell[] = [];

  [...normalized].forEach((char) => {
    const glyph = PIXEL_GLYPHS[char];
    if (!glyph) return;
    const width = glyph[0]?.length ?? 0;
    maxY = Math.max(maxY, glyph.length);
    cells.push(...cellsForGlyph(glyph, cursorX, char, ink));
    cursorX += width + letterGap;
  });

  return {
    cells,
    width: Math.max(cursorX - letterGap, 1),
    height: maxY,
  };
}

/** Center layout in a shared grid box (max width/height across stages). */
export function centerLayout(
  layout: WordLayout,
  boxW: number,
  boxH: number,
): LayoutCell[] {
  const ox = Math.floor((boxW - layout.width) / 2);
  const oy = Math.floor((boxH - layout.height) / 2);
  return layout.cells.map((cell) => ({
    ...cell,
    x: cell.x + ox,
    y: cell.y + oy,
  }));
}
