import type { ReactNode } from "react";

type EditorialSectionProps = {
  number?: string;
  title: string;
  children: ReactNode;
};

/**
 * @description 12-col editorial block: chapter title left, prose right.
 */
export function EditorialSection({
  number,
  title,
  children,
}: EditorialSectionProps) {
  return (
    <section className="v2-editorial">
      <div className="v2-editorial__title">
        {number ? (
          <p
            style={{
              margin: "0 0 8px",
              fontSize: 12,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              opacity: 0.6,
            }}
          >
            {number}
          </p>
        ) : null}
        <h2
          style={{
            margin: 0,
            fontFamily: "var(--v2-font-display)",
            fontWeight: 800,
            fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
          }}
        >
          {title}
        </h2>
      </div>
      <div
        className="v2-editorial__body"
        style={{
          fontSize: 17,
          lineHeight: 1.65,
          maxWidth: "40rem",
        }}
      >
        {children}
      </div>
    </section>
  );
}
