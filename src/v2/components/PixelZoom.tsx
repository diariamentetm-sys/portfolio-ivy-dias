import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { markCameFromZoom, v2Motion } from "../motion/timings";

type PixelZoomProps = {
  color: string;
  /** Navigate after expand (enter). Omit for exit-only collapse. */
  to?: string;
  origin?: { x: number; y: number };
  /** expand = leave home for case; collapse = return to stage */
  mode?: "expand" | "collapse";
  onDone?: () => void;
};

/**
 * @description Square expands/collapses from a pixel origin; coordinates with real navigation.
 */
export function PixelZoom({
  color,
  to,
  origin,
  mode = "expand",
  onDone,
}: PixelZoomProps) {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(mode === "collapse");
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const duration = reduced ? v2Motion.reducedMaxMs : v2Motion.zoomMs;

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setExpanded(mode === "expand");
    });

    const timer = window.setTimeout(() => {
      if (mode === "expand" && to) {
        markCameFromZoom(color);
        navigate(to);
      }
      onDone?.();
    }, duration);

    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(timer);
    };
  }, [color, duration, mode, navigate, onDone, to]);

  const x = origin?.x ?? (typeof window !== "undefined" ? window.innerWidth / 2 : 0);
  const y = origin?.y ?? (typeof window !== "undefined" ? window.innerHeight / 2 : 0);
  const transition = `width ${duration}ms ${v2Motion.easeImmersive}, height ${duration}ms ${v2Motion.easeImmersive}, margin ${duration}ms ${v2Motion.easeImmersive}`;

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 90,
        pointerEvents: "none",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: x,
          top: y,
          width: expanded ? "300vmax" : 12,
          height: expanded ? "300vmax" : 12,
          marginLeft: expanded ? "-150vmax" : -6,
          marginTop: expanded ? "-150vmax" : -6,
          background: color,
          transition,
        }}
      />
    </div>
  );
}
