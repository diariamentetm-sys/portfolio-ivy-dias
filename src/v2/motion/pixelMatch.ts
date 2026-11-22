import type { LayoutCell } from "../glyphs/wordLayout";

export type MatchedPixel = {
  from: LayoutCell | null;
  to: LayoutCell | null;
};

/**
 * Greedy nearest-neighbor matching between two layouts.
 * Deterministic; runs off the animation frame path.
 */
export function matchPixels(
  fromCells: LayoutCell[],
  toCells: LayoutCell[],
): MatchedPixel[] {
  const remaining = toCells.map((cell, index) => ({ cell, index }));
  const usedTo = new Set<number>();
  const pairs: MatchedPixel[] = [];

  const sortedFrom = [...fromCells].sort((a, b) => a.y - b.y || a.x - b.x);

  for (const from of sortedFrom) {
    let best: { index: number; dist: number } | null = null;
    for (const candidate of remaining) {
      if (usedTo.has(candidate.index)) continue;
      const dx = candidate.cell.x - from.x;
      const dy = candidate.cell.y - from.y;
      const dist = dx * dx + dy * dy;
      if (!best || dist < best.dist) {
        best = { index: candidate.index, dist };
      }
    }
    if (best) {
      usedTo.add(best.index);
      pairs.push({ from, to: toCells[best.index] });
    } else {
      pairs.push({ from, to: null });
    }
  }

  for (const candidate of remaining) {
    if (usedTo.has(candidate.index)) continue;
    pairs.push({ from: null, to: candidate.cell });
  }

  return pairs;
}

export function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export function lerpColor(a: string, b: string, t: number) {
  const pa = parseHex(a);
  const pb = parseHex(b);
  if (!pa || !pb) return t < 0.5 ? a : b;
  const r = Math.round(lerp(pa.r, pb.r, t));
  const g = Math.round(lerp(pa.g, pb.g, t));
  const bl = Math.round(lerp(pa.b, pb.b, t));
  return `#${toHex(r)}${toHex(g)}${toHex(bl)}`;
}

function parseHex(value: string) {
  const hex = value.replace("#", "");
  if (hex.length !== 6) return null;
  return {
    r: Number.parseInt(hex.slice(0, 2), 16),
    g: Number.parseInt(hex.slice(2, 4), 16),
    b: Number.parseInt(hex.slice(4, 6), 16),
  };
}

function toHex(n: number) {
  return n.toString(16).padStart(2, "0");
}

/** Smoothstep for morph easing within a segment. */
export function smoothstep(t: number) {
  const x = Math.min(Math.max(t, 0), 1);
  return x * x * (3 - 2 * x);
}
