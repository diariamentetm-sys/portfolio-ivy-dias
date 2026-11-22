import { Link } from "react-router-dom";
import { SeoHead } from "../../components/seo/SeoHead";
import { useContent } from "../../content/ContentContext";
import {
  claroCaseDataContent,
  claroPageContent,
} from "../../data/casePagesContent";
import { claroData } from "../../data/caseStudies";
import { resolveCaseStudyConfig } from "../../data/seedProjects";
import { useLocale } from "../../i18n/LocaleContext";
import { useLocalizedPath } from "../../i18n/useLocalizedPath";
import {
  getManagedProject,
  getSectionImages,
  mapManagedOrFallback,
} from "../../utils/projectMedia";
import { CaseHero } from "../components/CaseHero";
import { EditorialSection } from "../components/EditorialSection";
import { EvidenceGrid } from "../components/EvidenceGrid";
import { projectVisuals } from "../data/projectVisuals";
import { v2Theme } from "../tokens/theme";
import "../tokens/tokens.css";

const theme = projectVisuals.find((item) => item.slug === "claro");

/**
 * @description Fase D pilot — Claro editorial case on solid stage color.
 */
export function V2ClaroPage() {
  const { locale } = useLocale();
  const lp = useLocalizedPath();
  const { content } = useContent();
  const config = resolveCaseStudyConfig("claro", locale, content.projects);
  const page = claroPageContent[locale];
  const caseData = claroCaseDataContent[locale];
  const project = getManagedProject(content.projects, "claro");
  const cardImages = getSectionImages(project, locale, 5);
  const cards = mapManagedOrFallback(
    cardImages,
    claroData.cards.map((card, index) => ({
      src: card.src,
      alt: caseData.cardAlts[index],
    })),
  );

  const stageColor = theme?.themeColor ?? v2Theme.colors.cyan;
  const closeLabel = locale === "en" ? "Close" : "Fechar";
  const next = projectVisuals.find((item) => item.slug === "cashlog");

  return (
    <div className="v2-root" style={{ background: stageColor }}>
      <SeoHead
        title={`${config.title}${config.titleAccent ?? ""} | v2 preview | Ivy DC`}
        description={config.subtitle}
        path="/v2/cases/claro"
        locale={locale}
        robots="noindex, nofollow"
      />

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
        <span style={{ fontSize: 13, opacity: 0.7 }}>{config.breadcrumb}</span>
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
          {closeLabel}
        </Link>
      </div>

      <main>
        <CaseHero
          name="claro"
          kicker={config.kicker}
          subtitle={config.subtitle}
          meta={config.meta}
        />

        <EditorialSection
          number="00"
          title={locale === "en" ? "About the project" : "Sobre o projeto"}
        >
          {config.about.map((paragraph) => (
            <p key={paragraph.slice(0, 32)} style={{ margin: "0 0 1rem" }}>
              {paragraph}
            </p>
          ))}
        </EditorialSection>

        <EditorialSection number="01" title={page.sections.s01.title}>
          <p style={{ marginTop: 0 }}>{page.sections.s01.body}</p>
          <ul style={{ paddingLeft: "1.1rem", margin: "1rem 0 0" }}>
            {caseData.funil.map((item) => (
              <li key={item.s} style={{ marginBottom: 8 }}>
                <strong>{item.s}</strong> — {item.n} · {item.d}
              </li>
            ))}
          </ul>
          <p style={{ marginTop: "1rem", fontSize: 14 }}>
            {caseData.perfis.join(" · ")}
          </p>
        </EditorialSection>

        <EditorialSection number="02" title={page.sections.s02.title}>
          <p style={{ marginTop: 0 }}>{page.sections.s02.body}</p>
          <p style={{ fontSize: 14 }}>
            <strong>{page.sections.s02.macroLabel}</strong>
            <br />
            {caseData.macro.join(" · ")}
          </p>
          <p style={{ fontSize: 14 }}>
            <strong>{page.sections.s02.compLabel}</strong>
            <br />
            {caseData.comp.join(" · ")}
          </p>
        </EditorialSection>

        <EditorialSection number="03" title={page.sections.s03.title}>
          <p style={{ marginTop: 0, fontWeight: 600 }}>
            {page.sections.s03.groupTitles.premissas}
          </p>
          <ul style={{ paddingLeft: "1.1rem" }}>
            {caseData.premissas.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p style={{ fontWeight: 600 }}>
            {page.sections.s03.groupTitles.restricoes}
          </p>
          <ul style={{ paddingLeft: "1.1rem" }}>
            {caseData.restricoes.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p style={{ fontWeight: 600 }}>
            {page.sections.s03.groupTitles.riscos}
          </p>
          <ul style={{ paddingLeft: "1.1rem" }}>
            {caseData.riscos.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </EditorialSection>

        <EditorialSection number="04" title={page.sections.s04.title}>
          <p style={{ marginTop: 0 }}>{page.sections.s04.body}</p>
        </EditorialSection>

        <EditorialSection number="05" title={page.sections.s05.title}>
          <p style={{ marginTop: 0 }}>
            <strong>{page.sections.s05.productGoalLabel}</strong>
            <br />
            {page.sections.s05.productGoal}
          </p>
          <p>
            <strong>{page.sections.s05.expectedResultsLabel}</strong>
          </p>
          <ul style={{ paddingLeft: "1.1rem" }}>
            {caseData.resultados.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p style={{ fontSize: 14 }}>
            <strong>{page.sections.s05.validationMetricsLabel}</strong>
            <br />
            {caseData.metricas.join(" · ")}
          </p>
        </EditorialSection>

        <EditorialSection number="06" title={page.sections.s06.title}>
          <p style={{ marginTop: 0 }}>{page.sections.s06.body}</p>
          <p>
            <strong>{page.sections.s06.jointWorkTitle}</strong>
            <br />
            {page.sections.s06.jointWorkBody}
          </p>
          <p>{page.sections.s06.cardsReadyBody}</p>
          <EvidenceGrid
            label={page.sections.s06.cardArchLabel}
            items={[
              {
                src: claroData.reqImg,
                alt: caseData.reqImgAlt,
                span: "2x1",
              },
            ]}
          />
          <EvidenceGrid
            label={page.sections.s06.finalSetLabel}
            items={cards.slice(0, 4).map((card) => ({
              src: card.src,
              alt: card.alt,
            }))}
          />
        </EditorialSection>

        <blockquote
          style={{
            margin: "0 auto",
            padding: "var(--v2-space-5) var(--v2-gutter) var(--v2-space-6)",
            maxWidth: 800,
            fontFamily: "var(--v2-font-display)",
            fontSize: "clamp(1.5rem, 4vw, 2.25rem)",
            fontWeight: 800,
            lineHeight: 1.2,
          }}
        >
          {caseData.quote}
        </blockquote>
      </main>

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
          to={lp("/v2#work")}
          style={{
            fontWeight: 600,
            minHeight: 44,
            display: "inline-flex",
            alignItems: "center",
          }}
        >
          ← {locale === "en" ? "Gallery" : "Galeria"}
        </Link>
        {next ? (
          <Link
            to={lp(`/cases/${next.slug}`)}
            style={{
              fontWeight: 600,
              minHeight: 44,
              display: "inline-flex",
              alignItems: "center",
            }}
          >
            {next.displayName} →
          </Link>
        ) : null}
      </nav>
    </div>
  );
}
