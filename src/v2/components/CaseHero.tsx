import { PixelWordmark } from "./PixelWordmark";
import { v2Theme } from "../tokens/theme";

type CaseHeroProps = {
  name: string;
  subtitle: string;
  meta: { k: string; v: string }[];
  kicker?: string;
};

/**
 * @description Case hero with pixel client name on the solid stage color.
 */
export function CaseHero({ name, subtitle, meta, kicker }: CaseHeroProps) {
  return (
    <header
      style={{
        padding: "var(--v2-space-6) var(--v2-gutter) var(--v2-space-5)",
        display: "flex",
        flexDirection: "column",
        gap: "var(--v2-space-4)",
        maxWidth: 1200,
        margin: "0 auto",
      }}
    >
      {kicker ? (
        <p
          style={{
            margin: 0,
            fontSize: 13,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            opacity: 0.7,
          }}
        >
          {kicker}
        </p>
      ) : null}
      <PixelWordmark text={name} label={name} maxWidth="min(92vw, 920px)" />
      <p
        style={{
          margin: 0,
          maxWidth: "42rem",
          fontSize: "clamp(18px, 2.4vw, 22px)",
          lineHeight: 1.45,
          fontWeight: 500,
        }}
      >
        {subtitle}
      </p>
      <dl
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
          gap: "var(--v2-space-3)",
          margin: 0,
          paddingTop: "var(--v2-space-3)",
          borderTop: `1px solid color-mix(in srgb, ${v2Theme.colors.ink} 18%, transparent)`,
        }}
      >
        {meta.map((item) => (
          <div key={item.k}>
            <dt
              style={{
                margin: 0,
                fontSize: 11,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                opacity: 0.65,
              }}
            >
              {item.k}
            </dt>
            <dd style={{ margin: "4px 0 0", fontSize: 14, fontWeight: 500 }}>
              {item.v}
            </dd>
          </div>
        ))}
      </dl>
    </header>
  );
}
