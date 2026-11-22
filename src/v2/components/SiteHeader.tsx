import { Link } from "react-router-dom";
import { useLocale } from "../../i18n/LocaleContext";
import { useLocalizedPath } from "../../i18n/useLocalizedPath";
import { v2Theme } from "../tokens/theme";

const navItems = [
  { key: "about" as const, href: "/#sobre", accent: v2Theme.nav.about },
  { key: "work" as const, href: "/v2#work", accent: v2Theme.nav.work },
  {
    key: "journal" as const,
    href: "/entre-jornadas",
    accent: v2Theme.nav.journal,
    route: true,
  },
  { key: "contact" as const, href: "/#contato", accent: v2Theme.nav.contact },
] as const;

type SiteHeaderProps = {
  brandHref?: string;
};

/**
 * @description Compact v2 header: brand + About / Work / Journal / Contact.
 */
export function SiteHeader({ brandHref = "/v2" }: SiteHeaderProps) {
  const { locale, t } = useLocale();
  const lp = useLocalizedPath();

  const labels = {
    about: t.nav.about,
    work: t.nav.work,
    journal: t.nav.blog,
    contact: t.nav.contact,
  };

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 40,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "var(--v2-space-3)",
        padding: "var(--v2-space-3) var(--v2-gutter)",
        background: "color-mix(in srgb, var(--v2-canvas) 92%, transparent)",
        backdropFilter: "blur(8px)",
        borderBottom: "1px solid color-mix(in srgb, var(--v2-ink) 8%, transparent)",
      }}
    >
      <Link
        to={lp(brandHref)}
        style={{
          fontFamily: "var(--v2-font-body)",
          fontWeight: 600,
          fontSize: "14px",
          letterSpacing: "0.02em",
        }}
      >
        ivy.dc
      </Link>

      <nav aria-label={locale === "en" ? "Primary" : "Principal"}>
        <ul
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "flex-end",
            gap: "clamp(12px, 2vw, 28px)",
            listStyle: "none",
            margin: 0,
            padding: 0,
          }}
        >
          {navItems.map((item) => {
            const label = labels[item.key];
            const to = "route" in item && item.route ? lp(item.href) : lp(item.href);
            return (
              <li key={item.key}>
                <Link
                  to={to}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    fontSize: 14,
                    fontWeight: 500,
                    minHeight: 44,
                  }}
                >
                  <span
                    aria-hidden="true"
                    style={{
                      width: 8,
                      height: 8,
                      background: item.accent,
                      flexShrink: 0,
                    }}
                  />
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
