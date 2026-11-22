import { useEffect } from "react";
import { Link } from "react-router-dom";
import { SeoHead } from "../../components/seo/SeoHead";
import { useLocale } from "../../i18n/LocaleContext";
import { useLocalizedPath } from "../../i18n/useLocalizedPath";
import { PixelWordmark } from "../components/PixelWordmark";
import { ScrollIndicator } from "../components/ScrollIndicator";
import { SiteHeader } from "../components/SiteHeader";
import { projectVisuals } from "../data/projectVisuals";
import "../tokens/tokens.css";

const V2_FONTS_ID = "v2-fonts";
const V2_FONTS_HREF =
  "https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@800&family=Space+Grotesk:wght@400;500;600&display=swap";

/**
 * @description v2 home — Fase A: tokens, header, static monumental wordmark.
 * Morphing ships in Fase B; this page is noindex until release.
 */
export function V2HomePage() {
  const { locale } = useLocale();
  const lp = useLocalizedPath();
  const firstProject = projectVisuals[0];

  useEffect(() => {
    if (document.getElementById(V2_FONTS_ID)) return;
    const link = document.createElement("link");
    link.id = V2_FONTS_ID;
    link.rel = "stylesheet";
    link.href = V2_FONTS_HREF;
    document.head.appendChild(link);
  }, []);

  const copy =
    locale === "en"
      ? {
          title: "Ivy DC v2 | Post-it to Pixel (preview)",
          description:
            "Isolated redesign preview: monumental pixel wordmark and project stage. Not indexed.",
          roles: "Service Designer · Product Discovery · CX Designer",
          scroll: "Scroll",
          stageNote: "Project stage (motion in next phase)",
          explore: "Explore case",
          back: "Back to live site",
          h1: "Ivy DC",
        }
      : {
          title: "Ivy DC v2 | Post-it to Pixel (preview)",
          description:
            "Preview isolado do redesign: wordmark pixelado monumental e palco de projetos. Sem indexação.",
          roles: "Service Designer · Product Discovery · CX Designer",
          scroll: "Scroll",
          stageNote: "Palco de projetos (motion na próxima fase)",
          explore: "Explorar case",
          back: "Voltar ao site atual",
          h1: "Ivy DC",
        };

  return (
    <div className="v2-root">
      <SeoHead
        title={copy.title}
        description={copy.description}
        path="/v2"
        locale={locale}
        robots="noindex, nofollow"
      />
      <SiteHeader />

      <main>
        <section
          aria-label={copy.h1}
          style={{
            minHeight: "calc(100svh - 64px)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "var(--v2-space-5) var(--v2-gutter) var(--v2-space-4)",
            gap: "var(--v2-space-4)",
            textAlign: "center",
          }}
        >
          <h1
            style={{
              position: "absolute",
              width: 1,
              height: 1,
              padding: 0,
              margin: -1,
              overflow: "hidden",
              clip: "rect(0,0,0,0)",
              whiteSpace: "nowrap",
              border: 0,
            }}
          >
            {copy.h1}
          </h1>

          <PixelWordmark text="ivy dc" label="ivy dc" maxWidth="min(90vw, 1100px)" />

          <p
            style={{
              margin: 0,
              fontSize: "clamp(14px, 2.2vw, 18px)",
              fontWeight: 500,
              letterSpacing: "0.01em",
              maxWidth: "36rem",
            }}
          >
            {copy.roles}
          </p>

          <ScrollIndicator label={copy.scroll} targetId="work" />
        </section>

        <section
          id="work"
          style={{
            minHeight: "70svh",
            padding: "var(--v2-space-5) var(--v2-gutter) var(--v2-space-6)",
            borderTop: "1px solid color-mix(in srgb, var(--v2-ink) 10%, transparent)",
          }}
        >
          <p
            style={{
              margin: "0 0 var(--v2-space-4)",
              fontSize: 13,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              opacity: 0.65,
            }}
          >
            {copy.stageNote}
          </p>

          {/* Fase A: static first-name placeholder — morph comes in Fase B */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "var(--v2-space-3)",
              maxWidth: 960,
            }}
          >
            <PixelWordmark
              text={firstProject.displayName}
              label={firstProject.displayName}
              maxWidth="min(88vw, 920px)"
              ink={firstProject.themeColor}
            />
            <p style={{ margin: 0, maxWidth: "40ch", fontSize: 16 }}>
              {firstProject.summary}
            </p>
            <Link
              to={lp(`/cases/${firstProject.slug}`)}
              style={{
                display: "inline-flex",
                alignItems: "center",
                minHeight: 44,
                fontWeight: 600,
                fontSize: 15,
                borderBottom: "2px solid currentColor",
              }}
            >
              {copy.explore} →
            </Link>
          </div>

          {/* Semantic list for progressive enhancement / reduced-motion path */}
          <ul
            style={{
              marginTop: "var(--v2-space-5)",
              padding: 0,
              listStyle: "none",
              display: "grid",
              gap: 8,
            }}
          >
            {projectVisuals.map((project) => (
              <li key={project.slug}>
                <Link
                  to={lp(`/cases/${project.slug}`)}
                  style={{
                    display: "inline-flex",
                    minHeight: 44,
                    alignItems: "center",
                    fontSize: 14,
                  }}
                >
                  <span
                    aria-hidden="true"
                    style={{
                      width: 10,
                      height: 10,
                      marginRight: 10,
                      background: project.themeColor,
                    }}
                  />
                  {project.displayName}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </main>

      <footer
        style={{
          padding: "var(--v2-space-4) var(--v2-gutter)",
          borderTop: "1px solid color-mix(in srgb, var(--v2-ink) 10%, transparent)",
          fontSize: 14,
        }}
      >
        <Link to={lp("/")} style={{ fontWeight: 500 }}>
          ← {copy.back}
        </Link>
      </footer>
    </div>
  );
}
