import { useEffect, useState } from "react";
import { consumeCameFromZoom, v2Motion } from "../motion/timings";

/**
 * Case content enter: delayed fade when arriving via pixel zoom.
 */
export function useCaseEnter() {
  const [visible, setVisible] = useState(false);
  const [fromZoom, setFromZoom] = useState(false);

  useEffect(() => {
    const color = consumeCameFromZoom();
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setFromZoom(Boolean(color));

    if (!color || reduced) {
      setVisible(true);
      return;
    }

    const show = window.setTimeout(
      () => setVisible(true),
      v2Motion.contentEnterDelayMs,
    );
    return () => window.clearTimeout(show);
  }, []);

  return {
    fromZoom,
    style: {
      opacity: visible ? 1 : 0,
      transform: visible ? "none" : "translateY(8px)",
      transition: `opacity ${v2Motion.contentEnterMs}ms ${v2Motion.easeSoft}, transform ${v2Motion.contentEnterMs}ms ${v2Motion.easeSoft}`,
    } as const,
  };
}
