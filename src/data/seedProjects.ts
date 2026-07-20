import type { Locale } from "../i18n/types";
import { en } from "../i18n/en";
import { pt } from "../i18n/pt";
import type {
  ManagedProject,
  ProjectLocaleContent,
} from "../content/siteContent";
import type { CaseStudyConfig } from "../types/portfolio";
import {
  abtestCaseDataContent,
  abtestPageContent,
  caseStudyConfigs,
  cashlogPageContent,
  claroPageContent,
  etituloPageContent,
  type CaseStudyId,
} from "./casePagesContent";
import { abtestData, cashlogData, claroData, etituloData } from "./caseStudies";

export const SEED_PROJECT_IDS: Record<CaseStudyId, string> = {
  cashlog: "11111111-1111-4111-8111-111111111101",
  claro: "11111111-1111-4111-8111-111111111102",
  abtest: "11111111-1111-4111-8111-111111111103",
  etitulo: "11111111-1111-4111-8111-111111111104",
};

const workPreviewByLocale = {
  pt: pt.work.cases,
  en: en.work.cases,
} as const;

function joinParagraphs(parts: string[]) {
  return parts.filter(Boolean).join("\n\n");
}

function buildCashlogLocale(locale: Locale): ProjectLocaleContent {
  const config = caseStudyConfigs[locale].cashlog;
  const preview = workPreviewByLocale[locale].find((item) => item.id === "cashlog")!;
  const page = cashlogPageContent[locale].sections;
  const statsLine = page.s01.stats
    .map((stat) => `${stat.label}: ${stat.value}`)
    .join("\n");

  return {
    kicker: preview.kicker,
    subtitle: preview.subtitle,
    title: config.title,
    titleAccent: config.titleAccent,
    description: config.subtitle,
    breadcrumb: config.breadcrumb,
    caseKicker: config.kicker,
    tags: config.tags,
    meta: config.meta,
    about: config.about,
    sections: [
      {
        number: "01",
        kicker: page.s01.kicker,
        title: page.s01.title,
        body: joinParagraphs([page.s01.body, statsLine]),
      },
      {
        number: "02",
        kicker: page.s02.kicker,
        title: page.s02.title,
        body: joinParagraphs([page.s02.body, page.s02.profilesLabel]),
      },
      {
        number: "03",
        kicker: page.s03.kicker,
        title: page.s03.title,
        body: joinParagraphs([page.s03.body, page.s03.discoveriesLabel]),
      },
      {
        number: "04",
        kicker: page.s04.kicker,
        title: page.s04.title,
        body: joinParagraphs([page.s04.body, page.s04.wireframesLabel]),
      },
      {
        number: "05",
        kicker: page.s05.kicker,
        title: page.s05.title,
        body: joinParagraphs([
          page.s05.body,
          page.s05.paletteLabel,
          page.s05.uiScreensLabel,
        ]),
      },
    ],
  };
}

function buildClaroLocale(locale: Locale): ProjectLocaleContent {
  const config = caseStudyConfigs[locale].claro;
  const preview = workPreviewByLocale[locale].find((item) => item.id === "claro")!;
  const page = claroPageContent[locale].sections;

  return {
    kicker: preview.kicker,
    subtitle: preview.subtitle,
    title: config.title,
    titleAccent: config.titleAccent,
    description: config.subtitle,
    breadcrumb: config.breadcrumb,
    caseKicker: config.kicker,
    tags: config.tags,
    meta: config.meta,
    about: config.about,
    sections: [
      {
        number: "01",
        kicker: page.s01.kicker,
        title: page.s01.title,
        body: joinParagraphs([page.s01.body, page.s01.funilLabel]),
      },
      {
        number: "02",
        kicker: page.s02.kicker,
        title: page.s02.title,
        body: joinParagraphs([
          page.s02.body,
          page.s02.macroLabel,
          page.s02.compLabel,
        ]),
      },
      {
        number: "03",
        kicker: page.s03.kicker,
        title: page.s03.title,
        body: joinParagraphs([
          page.s03.groupTitles.premissas,
          page.s03.groupTitles.restricoes,
          page.s03.groupTitles.riscos,
        ]),
      },
      {
        number: "04",
        kicker: page.s04.kicker,
        title: page.s04.title,
        body: joinParagraphs([
          page.s04.body,
          page.s04.regrasLabels.primary,
          page.s04.regrasLabels.secondary,
          page.s04.regrasLabels.tertiary,
        ]),
      },
      {
        number: "05",
        kicker: page.s05.kicker,
        title: page.s05.title,
        body: joinParagraphs([
          page.s05.productGoalLabel,
          page.s05.productGoal,
          page.s05.expectedResultsLabel,
          page.s05.validationMetricsLabel,
        ]),
      },
      {
        number: "06",
        kicker: page.s06.kicker,
        title: page.s06.title,
        body: joinParagraphs([
          page.s06.body,
          page.s06.jointWorkTitle,
          page.s06.jointWorkBody,
          page.s06.cardsReadyBody,
          page.s06.cardArchLabel,
          page.s06.finalSetLabel,
        ]),
      },
    ],
  };
}

function buildAbtestLocale(locale: Locale): ProjectLocaleContent {
  const config = caseStudyConfigs[locale].abtest;
  const preview = workPreviewByLocale[locale].find((item) => item.id === "abtest")!;
  const tests = abtestCaseDataContent[locale].tests;
  const labels = abtestPageContent[locale].testDetailLabels;

  return {
    kicker: preview.kicker,
    subtitle: preview.subtitle,
    title: config.title,
    titleAccent: config.titleAccent,
    description: config.subtitle,
    breadcrumb: config.breadcrumb,
    caseKicker: config.kicker,
    tags: config.tags,
    meta: config.meta,
    about: config.about,
    sections: tests.map((test, index) => ({
      number: String(index + 1).padStart(2, "0"),
      kicker: test.label,
      title: test.title,
      body: joinParagraphs([
        `${labels.duration}: ${test.duration}`,
        `${labels.device}: ${test.device}`,
        `${labels.metric}: ${test.metric}`,
        `${test.result} ${test.resultLabel}`,
      ]),
    })),
  };
}

function buildEtituloLocale(locale: Locale): ProjectLocaleContent {
  const config = caseStudyConfigs[locale].etitulo;
  const preview = workPreviewByLocale[locale].find((item) => item.id === "etitulo")!;
  const page = etituloPageContent[locale].sections;

  return {
    kicker: preview.kicker,
    subtitle: preview.subtitle,
    title: config.title,
    titleAccent: config.titleAccent,
    description: config.subtitle,
    breadcrumb: config.breadcrumb,
    caseKicker: config.kicker,
    tags: config.tags,
    meta: config.meta,
    about: config.about,
    sections: [
      {
        number: "01",
        kicker: page.s01.label,
        title: page.s01.title,
        body: page.s01.body,
      },
      {
        number: "02",
        kicker: page.s02.label,
        title: page.s02.title,
        body: joinParagraphs([
          `${page.s02.problemLabel}: ${page.s02.problemText}`,
          `${page.s02.objectiveLabel}: ${page.s02.objectiveText}`,
          `${page.s02.proposalLabel}: ${page.s02.proposalText}`,
          `${page.s02.whoFeelsLabel}: ${page.s02.whoFeelsQuote}`,
        ]),
      },
      {
        number: "03",
        kicker: page.s03.label,
        title: page.s03.title,
        body: "",
      },
      {
        number: "04",
        kicker: page.s04.label,
        title: page.s04.title,
        body: page.s04.intro,
      },
      {
        number: "05",
        kicker: page.s05.label,
        title: `${page.s05.quote}${page.s05.quoteAccent}${page.s05.quoteEnd}`,
        body: page.s05.body,
      },
      {
        number: "06",
        kicker: page.s06.label,
        title: page.s06.title,
        body: "",
      },
      {
        number: "07",
        kicker: page.s07.label,
        title: page.s07.title,
        body: page.s07.intro,
      },
      {
        number: "08",
        kicker: page.s08.label,
        title: page.s08.title,
        body: page.s08.intro,
      },
    ],
  };
}

function buildSeedProject(
  id: CaseStudyId,
  n: string,
  overviewImage: string,
  buildLocale: (locale: Locale) => ProjectLocaleContent,
): ManagedProject {
  return {
    id: SEED_PROJECT_IDS[id],
    slug: id,
    n,
    published: true,
    overviewImage,
    pt: buildLocale("pt"),
    en: buildLocale("en"),
  };
}

export const seedProjects: ManagedProject[] = [
  buildSeedProject("cashlog", "01", cashlogData.researchImg, buildCashlogLocale),
  buildSeedProject("claro", "02", claroData.overviewImg, buildClaroLocale),
  buildSeedProject("abtest", "03", abtestData.tests[0].image, buildAbtestLocale),
  buildSeedProject("etitulo", "04", etituloData.overviewImg, buildEtituloLocale),
];

export function mergeSeedProjects(projects: ManagedProject[]) {
  const existingSlugs = new Set(projects.map((project) => project.slug));
  const missing = seedProjects.filter((seed) => !existingSlugs.has(seed.slug));
  return {
    projects: missing.length ? [...projects, ...missing] : projects,
    addedCount: missing.length,
  };
}

export function managedProjectToCaseStudyConfig(
  project: ManagedProject,
  locale: Locale,
  id: CaseStudyId,
): CaseStudyConfig {
  const copy = project[locale];
  const fallback = caseStudyConfigs[locale][id];

  return {
    id: project.slug,
    path: `/cases/${project.slug}`,
    accent: fallback.accent,
    breadcrumb: copy.breadcrumb,
    kicker: copy.caseKicker,
    title: copy.title,
    titleAccent: copy.titleAccent,
    subtitle: copy.description,
    tags: copy.tags,
    meta: copy.meta,
    about: copy.about,
    headerStats: fallback.headerStats,
    next: fallback.next,
  };
}

export function resolveCaseStudyConfig(
  id: CaseStudyId,
  locale: Locale,
  projects: ManagedProject[],
): CaseStudyConfig {
  const project = projects.find((item) => item.slug === id);
  if (project) {
    return managedProjectToCaseStudyConfig(project, locale, id);
  }
  return caseStudyConfigs[locale][id];
}
