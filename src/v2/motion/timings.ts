/** Proposed timings from MOTION_SYSTEM — validate on device. */
export const v2Motion = {
  easeImmersive: "cubic-bezier(.77, 0, .18, 1)",
  easeSoft: "cubic-bezier(.33, 1, .68, 1)",
  zoomMs: 700,
  contentEnterDelayMs: 480,
  contentEnterMs: 220,
  hoverMs: 150,
  legendFadeMs: 160,
  introMs: 780,
  mediaZoomMs: 240,
  caseCrossfadeMs: 280,
  reducedMaxMs: 150,
} as const;

export const V2_FROM_ZOOM_KEY = "ivydc-v2-from-zoom";
export const V2_EXIT_ZOOM_KEY = "ivydc-v2-exit-zoom";

export function markCameFromZoom(color: string) {
  try {
    sessionStorage.setItem(V2_FROM_ZOOM_KEY, color);
  } catch {
    // ignore
  }
}

export function consumeCameFromZoom(): string | null {
  try {
    const value = sessionStorage.getItem(V2_FROM_ZOOM_KEY);
    if (value) sessionStorage.removeItem(V2_FROM_ZOOM_KEY);
    return value;
  } catch {
    return null;
  }
}

export function markExitZoom(color: string) {
  try {
    sessionStorage.setItem(V2_EXIT_ZOOM_KEY, JSON.stringify({ color, at: Date.now() }));
  } catch {
    // ignore
  }
}

export function consumeExitZoom(maxAgeMs = 8000): string | null {
  try {
    const raw = sessionStorage.getItem(V2_EXIT_ZOOM_KEY);
    if (!raw) return null;
    sessionStorage.removeItem(V2_EXIT_ZOOM_KEY);
    const parsed = JSON.parse(raw) as { color?: string; at?: number };
    if (!parsed?.color || typeof parsed.at !== "number") return null;
    if (Date.now() - parsed.at > maxAgeMs) return null;
    return parsed.color;
  } catch {
    return null;
  }
}
