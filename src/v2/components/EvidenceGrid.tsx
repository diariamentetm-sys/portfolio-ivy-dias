import { useId, useState } from "react";

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
 * @description Small bento of real evidence — object-fit contain for diagrams.
 */
export function EvidenceGrid({ items, label }: EvidenceGridProps) {
  const [active, setActive] = useState<EvidenceItem | null>(null);
  const titleId = useId();

  if (items.length === 0) return null;

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
              onClick={() => setActive(item)}
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
            background: "rgba(0,0,0,0.72)",
            display: "grid",
            placeItems: "center",
            padding: 24,
          }}
          onClick={() => setActive(null)}
          onKeyDown={(event) => {
            if (event.key === "Escape") setActive(null);
          }}
        >
          <button
            type="button"
            onClick={() => setActive(null)}
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
          <figure style={{ margin: 0, maxWidth: "min(960px, 100%)" }} onClick={(e) => e.stopPropagation()}>
            <img
              id={titleId}
              src={active.src}
              alt={active.alt}
              style={{ width: "100%", height: "auto", objectFit: "contain", background: "#fff" }}
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
