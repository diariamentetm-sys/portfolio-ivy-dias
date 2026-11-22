import { useEffect, useId, useRef, useState } from "react";
import { v2Motion } from "../motion/timings";

export type EvidenceItem = {
  src: string;
  alt: string;
  caption?: string;
  span?: "1x1" | "2x1" | "1x2" | "2x2";
};

type EvidenceGridProps = {
  items: EvidenceItem[];
  label?: string;
};

/**
 * @description Small bento of real evidence — short zoom lightbox, Escape + focus return.
 */
export function EvidenceGrid({ items, label }: EvidenceGridProps) {
  const [active, setActive] = useState<EvidenceItem | null>(null);
  const [open, setOpen] = useState(false);
  const titleId = useId();
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const closeRef = useRef<HTMLButtonElement | null>(null);

  const close = () => {
    setOpen(false);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.setTimeout(
      () => {
        setActive(null);
        triggerRef.current?.focus();
      },
      reduced ? 0 : v2Motion.mediaZoomMs,
    );
  };

  useEffect(() => {
    if (!active) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const frame = window.requestAnimationFrame(() => setOpen(true));
    const focusTimer = window.setTimeout(
      () => closeRef.current?.focus(),
      reduced ? 0 : 40,
    );

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(focusTimer);
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
    // intentionally re-run only when dialog opens for a given item
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  if (items.length === 0) return null;

  const duration = v2Motion.mediaZoomMs;

  return (
    <div style={{ marginTop: "var(--v2-space-4)" }}>
      {label ? (
        <p
          style={{
            margin: "0 0 12px",
            fontSize: 12,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            opacity: 0.65,
          }}
        >
          {label}
        </p>
      ) : null}
      <ul
        style={{
          listStyle: "none",
          margin: 0,
          padding: 0,
          display: "grid",
          gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
          gap: 10,
        }}
      >
        {items.map((item) => (
          <li
            key={item.src}
            style={{
              gridColumn: item.span === "2x1" || item.span === "2x2" ? "span 2" : "span 1",
            }}
          >
            <button
              type="button"
              ref={(node) => {
                if (active?.src === item.src) triggerRef.current = node;
              }}
              onClick={(event) => {
                triggerRef.current = event.currentTarget;
                setOpen(false);
                setActive(item);
              }}
              style={{
                display: "block",
                width: "100%",
                padding: 0,
                border: "1px solid color-mix(in srgb, var(--v2-ink) 20%, transparent)",
                background: "color-mix(in srgb, #fff 35%, transparent)",
                cursor: "zoom-in",
                minHeight: 44,
              }}
            >
              <img
                src={item.src}
                alt={item.alt}
                loading="lazy"
                style={{
                  display: "block",
                  width: "100%",
                  height: "auto",
                  objectFit: "contain",
                }}
              />
            </button>
            {item.caption ? (
              <p style={{ margin: "6px 0 0", fontSize: 12, opacity: 0.7 }}>
                {item.caption}
              </p>
            ) : null}
          </li>
        ))}
      </ul>

      {active ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 80,
            background: open ? "rgba(0,0,0,0.72)" : "rgba(0,0,0,0)",
            display: "grid",
            placeItems: "center",
            padding: 24,
            transition: `background ${duration}ms ${v2Motion.easeSoft}`,
          }}
          onClick={close}
        >
          <button
            ref={closeRef}
            type="button"
            onClick={close}
            style={{
              position: "absolute",
              top: 16,
              right: 16,
              minHeight: 44,
              minWidth: 44,
              background: "#fff",
              border: "none",
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            Esc
          </button>
          <figure
            style={{
              margin: 0,
              maxWidth: "min(960px, 100%)",
              opacity: open ? 1 : 0,
              transform: open ? "scale(1)" : "scale(0.92)",
              transition: `opacity ${duration}ms ${v2Motion.easeSoft}, transform ${duration}ms ${v2Motion.easeImmersive}`,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              id={titleId}
              src={active.src}
              alt={active.alt}
              style={{
                width: "100%",
                height: "auto",
                objectFit: "contain",
                background: "#fff",
              }}
            />
            <figcaption style={{ color: "#fff", marginTop: 8, fontSize: 14 }}>
              {active.caption ?? active.alt}
            </figcaption>
          </figure>
        </div>
      ) : null}
    </div>
  );
}
