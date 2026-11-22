import { useState, type ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLocale } from "../../i18n/LocaleContext";
import { useLocalizedPath } from "../../i18n/useLocalizedPath";
import { projectVisuals } from "../data/projectVisuals";
import { useCaseEnter } from "../hooks/useCaseEnter";
import { markExitZoom, v2Motion } from "../motion/timings";
import { v2Theme } from "../tokens/theme";
import { PixelZoom } from "./PixelZoom";

type V2CaseChromeProps = {
  slug: string;
  breadcrumb: string;
  stageColor: string;
  children: ReactNode;
};

/**
 * @description Shared v2 case chrome: sticky close, gallery/next links, enter/exit motion.
 */
export function V2CaseChrome({
  slug,
  breadcrumb,
  stageColor,
  children,
}: V2CaseChromeProps) {
  const { locale } = useLocale();
  const lp = useLocalizedPath();
  const navigate = useNavigate();
  const enter = useCaseEnter();
  const [crossfade, setCrossfade] = useState<{
    color: string;
    to: string;
  } | null>(null);

  const ordered = [...projectVisuals].sort((a, b) => a.order - b.order);
  const index = ordered.findIndex((item) => item.slug === slug);
  const prev = index > 0 ? ordered[index - 1] : null;
  const next = index >= 0 && index < ordered.length - 1 ? ordered[index + 1] : null;

  const goHome = () => {
    markExitZoom(stageColor);
    navigate(lp("/v2#work"));
  };

  const goCase = (targetSlug: string, color: string) => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const to = lp(`/v2/cases/${targetSlug}`);
    if (reduced) {
      navigate(to);
      return;
    }
    setCrossfade({ color, to });
  };

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
          onClick={(event) => {
            event.preventDefault();
            goHome();
          }}
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
          onClick={(event) => {
            event.preventDefault();
            goHome();
          }}
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

      <div style={enter.style}>{children}</div>

      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: 16,
          padding: "var(--v2-space-4) var(--v2-gutter) var(--v2-space-5)",
          borderTop: `1px solid color-mix(in srgb, ${v2Theme.colors.ink} 18%, transparent)`,
          maxWidth: 1200,
          margin: "0 auto",
          opacity: enter.style.opacity,
          transition: `opacity ${v2Motion.contentEnterMs}ms ${v2Motion.easeSoft}`,
        }}
        aria-label={locale === "en" ? "Case navigation" : "Navegação do case"}
      >
        <Link
          to={prev ? lp(`/v2/cases/${prev.slug}`) : lp("/v2#work")}
          onClick={(event) => {
            if (!prev) {
              event.preventDefault();
              goHome();
              return;
            }
            event.preventDefault();
            goCase(prev.slug, prev.themeColor);
          }}
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
            onClick={(event) => {
              event.preventDefault();
              goCase(next.slug, next.themeColor);
            }}
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
            onClick={(event) => {
              event.preventDefault();
              goHome();
            }}
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

      {crossfade ? (
        <PixelZoom
          color={crossfade.color}
          to={crossfade.to}
          mode="expand"
          onDone={() => setCrossfade(null)}
        />
      ) : null}
    </div>
  );
}
