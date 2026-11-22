import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { useLocale } from "../../i18n/LocaleContext";
import { useLocalizedPath } from "../../i18n/useLocalizedPath";
import { projectVisuals } from "../data/projectVisuals";
import { v2Theme } from "../tokens/theme";

type V2CaseChromeProps = {
  slug: string;
  breadcrumb: string;
  stageColor: string;
  children: ReactNode;
};

/**
 * @description Shared v2 case chrome: sticky close, gallery/next links.
 */
export function V2CaseChrome({
  slug,
  breadcrumb,
  stageColor,
  children,
}: V2CaseChromeProps) {
  const { locale } = useLocale();
  const lp = useLocalizedPath();
  const ordered = [...projectVisuals].sort((a, b) => a.order - b.order);
  const index = ordered.findIndex((item) => item.slug === slug);
  const prev = index > 0 ? ordered[index - 1] : null;
  const next = index >= 0 && index < ordered.length - 1 ? ordered[index + 1] : null;

  return (
    <div className="v2-root" style={{ background: stageColor }}>
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 30,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 12,
          padding: "var(--v2-space-3) var(--v2-gutter)",
          background: `color-mix(in srgb, ${stageColor} 88%, transparent)`,
          backdropFilter: "blur(8px)",
        }}
      >
        <Link
          to={lp("/v2")}
          style={{
            fontWeight: 600,
            fontSize: 14,
            minHeight: 44,
            display: "inline-flex",
            alignItems: "center",
          }}
        >
          ivy.dc
        </Link>
        <span style={{ fontSize: 13, opacity: 0.7 }}>{breadcrumb}</span>
        <Link
          to={lp("/v2#work")}
          style={{
            fontWeight: 600,
            fontSize: 14,
            minHeight: 44,
            display: "inline-flex",
            alignItems: "center",
          }}
        >
          {locale === "en" ? "Close" : "Fechar"}
        </Link>
      </div>

      {children}

      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: 16,
          padding: "var(--v2-space-4) var(--v2-gutter) var(--v2-space-5)",
          borderTop: `1px solid color-mix(in srgb, ${v2Theme.colors.ink} 18%, transparent)`,
          maxWidth: 1200,
          margin: "0 auto",
        }}
        aria-label={locale === "en" ? "Case navigation" : "Navegação do case"}
      >
        <Link
          to={prev ? lp(`/v2/cases/${prev.slug}`) : lp("/v2#work")}
          style={{
            fontWeight: 600,
            minHeight: 44,
            display: "inline-flex",
            alignItems: "center",
          }}
        >
          ← {prev ? prev.displayName : locale === "en" ? "Gallery" : "Galeria"}
        </Link>
        {next ? (
          <Link
            to={lp(`/v2/cases/${next.slug}`)}
            style={{
              fontWeight: 600,
              minHeight: 44,
              display: "inline-flex",
              alignItems: "center",
            }}
          >
            {next.displayName} →
          </Link>
        ) : (
          <Link
            to={lp("/v2#work")}
            style={{
              fontWeight: 600,
              minHeight: 44,
              display: "inline-flex",
              alignItems: "center",
            }}
          >
            {locale === "en" ? "Gallery" : "Galeria"} →
          </Link>
        )}
      </nav>
    </div>
  );
}
