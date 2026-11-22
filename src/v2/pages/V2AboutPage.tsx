import { Link } from "react-router-dom";
import { SeoHead } from "../../components/seo/SeoHead";
import { useLocale } from "../../i18n/LocaleContext";
import { useLocalizedPath } from "../../i18n/useLocalizedPath";
import { SiteHeader } from "../components/SiteHeader";
import { v2Theme } from "../tokens/theme";
import "../tokens/tokens.css";

/**
 * @description v2 About — system chrome, display type (not pixel) for titles.
 */
export function V2AboutPage() {
  const { locale, t } = useLocale();
  const lp = useLocalizedPath();

  const copy =
    locale === "en"
      ? {
          title: "About | Ivy DC v2 (preview)",
          description: "About Ivy Dias — isolated v2 preview, not indexed.",
          back: "Back to v2 home",
        }
      : {
          title: "Sobre | Ivy DC v2 (preview)",
          description: "Sobre Ivy Dias — preview v2 isolado, sem indexação.",
          back: "Voltar à home v2",
        };

  return (
    <div className="v2-root">
      <SeoHead
        title={copy.title}
        description={copy.description}
        path="/v2/about"
        locale={locale}
        robots="noindex, nofollow"
      />
      <SiteHeader />
      <main style={{ padding: "var(--v2-space-6) var(--v2-gutter)", maxWidth: 720 }}>
        <p
          style={{
            margin: "0 0 var(--v2-space-3)",
            fontSize: 13,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            opacity: 0.65,
          }}
        >
          {t.nav.about}
        </p>
        <h1
          style={{
            margin: "0 0 var(--v2-space-4)",
            fontFamily: "var(--v2-font-display)",
            fontWeight: 800,
            fontSize: "clamp(2rem, 6vw, 3.5rem)",
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
            color: v2Theme.colors.ink,
          }}
        >
          {t.about.title}
        </h1>
        <div style={{ fontSize: 17, lineHeight: 1.65 }}>
          <p style={{ margin: "0 0 1.1rem" }}>{t.about.p1}</p>
          <p style={{ margin: "0 0 1.1rem" }}>{t.about.p2}</p>
          <p style={{ margin: "0 0 0.5rem", fontWeight: 600 }}>{t.about.brandsLabel}</p>
          <p style={{ margin: "0 0 1.1rem", fontSize: 15 }}>{t.about.brands}</p>
          <ul style={{ margin: 0, paddingLeft: "1.1rem" }}>
            {t.about.languages.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <p style={{ marginTop: "var(--v2-space-5)" }}>
          <Link to={lp("/v2")} style={{ fontWeight: 600 }}>
            ← {copy.back}
          </Link>
        </p>
      </main>
    </div>
  );
}
