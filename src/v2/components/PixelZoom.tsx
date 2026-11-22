import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type PixelZoomProps = {
  color: string;
  to: string;
  origin?: { x: number; y: number };
  onDone?: () => void;
};

/**
 * @description Expands a square from a pixel origin until it fills the viewport, then navigates.
 */
export function PixelZoom({ color, to, origin, onDone }: PixelZoomProps) {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setExpanded(true));
    const timer = window.setTimeout(() => {
      navigate(to);
      onDone?.();
    }, 720);
    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(timer);
    };
  }, [navigate, onDone, to]);

  const x = origin?.x ?? window.innerWidth / 2;
  const y = origin?.y ?? window.innerHeight / 2;

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
          transition: "width 700ms cubic-bezier(.77,0,.18,1), height 700ms cubic-bezier(.77,0,.18,1), margin 700ms cubic-bezier(.77,0,.18,1)",
        }}
      />
    </div>
  );
}
