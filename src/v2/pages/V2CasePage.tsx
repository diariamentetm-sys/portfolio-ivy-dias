import { Navigate, useParams } from "react-router-dom";
import { SeoHead } from "../../components/seo/SeoHead";
import { useContent } from "../../content/ContentContext";
import { useLocale } from "../../i18n/LocaleContext";
import { useLocalizedPath } from "../../i18n/useLocalizedPath";
import { getCasePageSeo } from "../../seo/pageMeta";
import { CaseHero } from "../components/CaseHero";
import { EditorialSection } from "../components/EditorialSection";
import { EvidenceGrid } from "../components/EvidenceGrid";
import { V2CaseChrome } from "../components/V2CaseChrome";
import { projectVisuals } from "../data/projectVisuals";
import { V2ClaroPage } from "./V2ClaroPage";
import "../tokens/tokens.css";

/**
 * @description Generic v2 editorial case — reuses published project content.
 */
export function V2CasePage() {
  const { slug } = useParams();
  const { locale, t } = useLocale();
  const lp = useLocalizedPath();
  const { content } = useContent();

  if (slug === "claro") {
    return <V2ClaroPage />;
  }

  const project = content.projects.find(
    (item) => item.slug === slug && item.published,
  );
  const visual = projectVisuals.find((item) => item.slug === slug);

  if (!project || !visual) {
    return <Navigate to={lp("/v2")} replace />;
  }

  const copy = project[locale];
  const pageSeo = getCasePageSeo(project.slug, locale);
  const fullTitle =
    pageSeo?.title ?? `${copy.title}${copy.titleAccent ?? ""}`.trim();
  const description =
    pageSeo?.description ??
    copy.about.find((paragraph) => paragraph.trim().length > 40)?.trim() ??
    copy.description;

  const evidence = [
    ...(project.overviewImage
      ? [
          {
            src: project.overviewImage,
            alt:
              locale === "en"
                ? `${visual.displayName} overview`
                : `Visão geral — ${visual.displayName}`,
            span: "2x1" as const,
          },
        ]
      : []),
    ...copy.sections.flatMap((section) =>
      (section.images ?? []).map((image) => ({
        src: image.src,
        alt: image.alt || section.title,
      })),
    ),
  ].slice(0, 6);

  return (
    <V2CaseChrome
      slug={project.slug}
      breadcrumb={copy.breadcrumb}
      stageColor={visual.themeColor}
    >
      <SeoHead
        title={`${fullTitle} | v2 preview | Ivy DC`}
        description={description}
        path={`/v2/cases/${project.slug}`}
        locale={locale}
        robots="noindex, nofollow"
        image={project.overviewImage || undefined}
      />

      <main>
        <CaseHero
          name={visual.displayName}
          kicker={copy.caseKicker}
          subtitle={copy.description}
          meta={copy.meta}
        />

        <EditorialSection number="00" title={t.caseChrome.aboutProject}>
          {copy.about.map((paragraph) => (
            <p key={paragraph.slice(0, 32)} style={{ margin: "0 0 1rem" }}>
              {paragraph}
            </p>
          ))}
          <p style={{ fontSize: 14, opacity: 0.8 }}>{copy.tags.join(" · ")}</p>
        </EditorialSection>

        {copy.sections.map((section) => (
          <EditorialSection
            key={`${section.number}-${section.title}`}
            number={section.number}
            title={section.title}
          >
            <p style={{ marginTop: 0, whiteSpace: "pre-line" }}>{section.body}</p>
            {section.images?.length ? (
              <EvidenceGrid
                items={section.images.map((image) => ({
                  src: image.src,
                  alt: image.alt || section.title,
                }))}
              />
            ) : null}
          </EditorialSection>
        ))}

        {evidence.length > 0 && copy.sections.every((s) => !s.images?.length) ? (
          <EditorialSection
            number="—"
            title={locale === "en" ? "Evidence" : "Evidências"}
          >
            <EvidenceGrid items={evidence} />
          </EditorialSection>
        ) : null}
      </main>
    </V2CaseChrome>
  );
}
