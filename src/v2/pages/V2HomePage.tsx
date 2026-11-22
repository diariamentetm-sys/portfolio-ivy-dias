import { useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { SeoHead } from "../../components/seo/SeoHead";
import { useLocale } from "../../i18n/LocaleContext";
import { useLocalizedPath } from "../../i18n/useLocalizedPath";
import { ProjectStage, type StageItem } from "../components/ProjectStage";
import { ScrollIndicator } from "../components/ScrollIndicator";
import { SiteHeader } from "../components/SiteHeader";
import { projectVisuals } from "../data/projectVisuals";
import { saveStageSession } from "../motion/stageSession";
import { v2Theme } from "../tokens/theme";
import "../tokens/tokens.css";

const V2_FONTS_ID = "v2-fonts";
const V2_FONTS_HREF =
  "https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@800&family=Space+Grotesk:wght@400;500;600&display=swap";

/**
 * @description v2 home — Fase C: full published gallery on the morph stage.
 */
export function V2HomePage() {
  const { locale } = useLocale();
  const lp = useLocalizedPath();

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
          title: "Ivy DC v2 | Project stage (preview)",
          description:
            "Isolated redesign preview: scroll morph across published cases. Not indexed.",
          roles: "Service Designer · Product Discovery · CX Designer",
          scroll: "Scroll",
          explore: "Explore case",
          back: "Back to live site",
          h1: "Ivy DC",
          brandSummary: "From Post-it to Pixel",
          reducedMotion: "Reduced motion: static stages (morph disabled)",
          allProjects: "All published cases",
        }
      : {
          title: "Ivy DC v2 | Palco de projetos (preview)",
          description:
            "Preview isolado: morph no scroll por todos os cases publicados. Sem indexação.",
          roles: "Service Designer · Product Discovery · CX Designer",
          scroll: "Scroll",
          explore: "Explorar case",
          back: "Voltar ao site atual",
          h1: "Ivy DC",
          brandSummary: "From Post-it to Pixel",
          reducedMotion: "Movimento reduzido: stages estáticos (morph desligado)",
          allProjects: "Todos os cases publicados",
        };

  const stages: StageItem[] = useMemo(() => {
    const projects = [...projectVisuals]
      .sort((a, b) => a.order - b.order)
      .map(
        (project) =>
          ({
            id: project.slug,
            text: project.displayName,
            ink: v2Theme.colors.ink,
            stageColor: project.themeColor,
            summary: project.summary,
            slug: project.slug,
          }) satisfies StageItem,
      );

    return [
      {
        id: "brand",
        text: "ivy dc",
        ink: v2Theme.colors.ink,
        stageColor: v2Theme.colors.canvas,
        summary: copy.brandSummary,
      },
      ...projects,
    ];
  }, [copy.brandSummary]);

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
            background: v2Theme.colors.canvas,
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

        <ProjectStage
          stages={stages}
          exploreLabel={copy.explore}
          reducedMotionLabel={copy.reducedMotion}
        />

        <section
          style={{
            padding: "var(--v2-space-5) var(--v2-gutter) var(--v2-space-6)",
            background: v2Theme.colors.canvas,
            borderTop: "1px solid color-mix(in srgb, var(--v2-ink) 10%, transparent)",
          }}
        >
          <h2
            style={{
              margin: "0 0 var(--v2-space-3)",
              fontSize: 13,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              fontWeight: 600,
            }}
          >
            {copy.allProjects}
          </h2>
          <ul
            style={{
              margin: 0,
              padding: 0,
              listStyle: "none",
              display: "grid",
              gap: 8,
            }}
          >
            {projectVisuals.map((project, index) => (
              <li key={project.slug}>
                <Link
                  to={lp(`/cases/${project.slug}`)}
                  onClick={() =>
                    saveStageSession({
                      scrollY: window.scrollY,
                      activeIndex: index + 1,
                    })
                  }
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
          background: v2Theme.colors.canvas,
        }}
      >
        <Link to={lp("/")} style={{ fontWeight: 500 }}>
          ← {copy.back}
        </Link>
      </footer>
    </div>
  );
}
