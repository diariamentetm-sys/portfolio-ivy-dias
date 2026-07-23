import { CaseBlockSection, CaseQuote } from "../components/cases/CaseBlocks";
import { CaseStudyLayout } from "../components/layout/CaseStudyLayout";
import { useContent } from "../content/ContentContext";
import { resolveCaseStudyConfig } from "../data/seedProjects";
import { useLocale } from "../i18n/LocaleContext";
import {
  getManagedProject,
  getSectionImages,
  resolveOverviewSrc,
} from "../utils/projectMedia";

const OVERVIEW_FALLBACK = "/images/trusthub-overview.jpg";
const OVERVIEW_CACHE_BUST = "v=20260722hq2";

const PLATFORM_SCREENS = [
  {
    src: "/images/trusthub-transferencias.png",
    altPt: "TrustHub — Minhas Transferências",
    altEn: "TrustHub — My Transfers",
  },
  {
    src: "/images/trusthub-favorecidos.png",
    altPt: "TrustHub — Favorecidos",
    altEn: "TrustHub — Recipients",
  },
] as const;

/** Prefer the high-res local asset; CMS may still point at the old low-res PNG. */
function resolveTrusthubOverviewSrc(src: string) {
  const trimmed = src.trim();
  if (
    !trimmed ||
    trimmed.includes("trusthub-overview.png") ||
    /\/images\/trusthub-overview(\?|$)/.test(trimmed)
  ) {
    return `${OVERVIEW_FALLBACK}?${OVERVIEW_CACHE_BUST}`;
  }
  if (trimmed.includes("trusthub-overview.jpg")) {
    const [path] = trimmed.split("?");
    return `${path}?${OVERVIEW_CACHE_BUST}`;
  }
  return trimmed;
}

const pageCopy = {
  pt: {
    overviewLabel: "Visão geral",
    overviewTitle: "Conta digital para pequenas empresas",
    overviewBody:
      "A TrustHub reúne as principais funcionalidades de uma conta digital em uma única plataforma, oferecendo uma experiência simples e intuitiva para a gestão financeira de pequenas empresas. O projeto contemplou o desenvolvimento da landing page institucional e da interface da plataforma, abrangendo funcionalidades como pagamentos, depósitos, transferências, extratos consolidados e área de suporte, com foco em uma navegação organizada, consistente e de fácil utilização.",
    uiLabel: "Interface",
    uiTitle: "Transferências na Conta Pag Digital",
    uiBody:
      "Telas da área de transferências — histórico de movimentações e gestão de favorecidos — com navegação clara e leitura rápida dos dados financeiros.",
    challengeLabel: "Desafio",
    challenge:
      "Meu desafio foi transformar processos financeiros em uma experiência digital simples, intuitiva e acessível, organizando diferentes funcionalidades em uma interface capaz de proporcionar mais clareza e agilidade na rotina das pequenas empresas.",
  },
  en: {
    overviewLabel: "Overview",
    overviewTitle: "A digital account for small businesses",
    overviewBody:
      "TrustHub brings the core features of a digital account into a single platform, offering a simple and intuitive experience for small-business financial management. The project covered the institutional landing page and the platform interface — payments, deposits, transfers, consolidated statements, and support — with organized, consistent, easy-to-use navigation.",
    uiLabel: "Interface",
    uiTitle: "Transfers in Conta Pag Digital",
    uiBody:
      "Screens from the transfers area — transaction history and recipient management — with clear navigation and fast scanning of financial data.",
    challengeLabel: "Challenge",
    challenge:
      "My challenge was to turn financial processes into a simple, intuitive, accessible digital experience — organizing many features in an interface that brings more clarity and agility to small-business routines.",
  },
} as const;

export function TrusthubPage() {
  const { locale } = useLocale();
  const { content } = useContent();
  const copy = pageCopy[locale];
  const config = resolveCaseStudyConfig("trusthub", locale, content.projects);
  const project = getManagedProject(content.projects, "trusthub");
  const overviewSrc = resolveOverviewSrc(project, OVERVIEW_FALLBACK);
  const overviewImages = getSectionImages(project, locale, 0);

  const heroSrc = resolveTrusthubOverviewSrc(
    overviewSrc || overviewImages[0]?.src?.trim() || OVERVIEW_FALLBACK,
  );

  return (
    <CaseStudyLayout config={config}>
      <CaseBlockSection number="01" label={copy.overviewLabel} title={copy.overviewTitle}>
        <p className="max-w-3xl body-md">{copy.overviewBody}</p>
        {heroSrc ? (
          <div className="mt-8">
            <img
              src={heroSrc}
              alt={`${config.title}${config.titleAccent ?? ""}`}
              className="block h-auto w-full rounded-2xl shadow-card bg-white"
              loading="eager"
              decoding="async"
            />
          </div>
        ) : null}
      </CaseBlockSection>

      <CaseBlockSection number="02" label={copy.uiLabel} title={copy.uiTitle}>
        <p className="max-w-3xl body-md">{copy.uiBody}</p>
        <div className="mt-8 flex flex-col gap-6">
          {PLATFORM_SCREENS.map((screen) => (
            <img
              key={screen.src}
              src={screen.src}
              alt={locale === "pt" ? screen.altPt : screen.altEn}
              className="block h-auto w-full rounded-2xl shadow-card bg-white"
              loading="lazy"
              decoding="async"
            />
          ))}
        </div>
      </CaseBlockSection>

      <CaseQuote
        label={copy.challengeLabel}
        quote={copy.challenge}
        maxWidth="max-w-3xl"
      />
    </CaseStudyLayout>
  );
}
