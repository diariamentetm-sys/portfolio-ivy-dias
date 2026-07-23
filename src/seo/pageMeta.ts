import type { Locale } from "../i18n/types";
import type { CaseStudyId } from "../data/casePagesContent";

export type PageSeoCopy = {
  title: string;
  description: string;
  ogImage?: string;
  robots?: string;
  related?: { label: string; path: string }[];
};

const TITLE_SUFFIX = " | Ivy DC";

/** Ensures brand presence without duplicating "Ivy DC" in the title. */
export function withIvyDcTitle(title: string) {
  const trimmed = title.trim();
  if (/\bIvy DC\b/i.test(trimmed)) {
    return trimmed;
  }
  return `${trimmed}${TITLE_SUFFIX}`;
}

export const homePageSeo: Record<Locale, PageSeoCopy> = {
  pt: {
    title: "Ivy DC | Customer Experience Specialist | UX & Service Design",
    description:
      "Portfólio de Ivy Dias de Campos: 20+ anos em CX, Service Design e User Research. Cases reais com TSE, Claro, Polícia Federal, TrustHub e fintechs B2B.",
    ogImage: "/images/ivy-hero-workshop-v2.png",
  },
  en: {
    title: "Ivy DC | Customer Experience Specialist | UX & Service Design",
    description:
      "Portfolio of Ivy Dias de Campos: 20+ years in CX, Service Design and User Research. Real cases with TSE, Claro, Federal Police, TrustHub and B2B fintechs.",
    ogImage: "/images/ivy-hero-workshop-v2.png",
  },
};

/**
 * Curated, non-generic on-page SEO per case.
 * Titles target ~50–60 chars ending with " | Ivy DC".
 * Descriptions target ~150–160 chars for CTR.
 */
export const casePageSeo: Record<
  Locale,
  Record<CaseStudyId, PageSeoCopy>
> = {
  pt: {
    cashlog: {
      title: "Cashlog Raízen | UX & Machine Learning | Ivy DC",
      description:
        "Case UX/UI do Cashlog (Raízen): plataforma de demandas de investimento com machine learning, pesquisa com 15 profissionais e 8 perfis de usuário distintos.",
      related: [
        { label: "BBNK — banking as a service", path: "/cases/bbnk" },
        { label: "TrustHub — conta digital PME", path: "/cases/trusthub" },
      ],
    },
    claro: {
      title: "Claro Empresas | Customer Experience | Ivy DC",
      description:
        "Discovery e Service Design dos cards de vendas Claro AMX: regras de negócio, arquitetura de informação e DesignOps para operação comercial em vários países.",
      related: [
        { label: "Testes A/B Claro — CRO", path: "/cases/abtest" },
        { label: "e-Título TSE — onboarding", path: "/cases/etitulo" },
      ],
    },
    abtest: {
      title: "Claro A/B Tests | CRO & Experimentação | Ivy DC",
      description:
        "Case de CRO na Claro: testes A/B data-driven para elevar conversão, validar hipóteses de produto e evoluir a experiência digital com experimentação contínua.",
      related: [
        { label: "Cards Claro AMX", path: "/cases/claro" },
        { label: "Cashlog Raízen — UX/UI", path: "/cases/cashlog" },
      ],
    },
    etitulo: {
      title: "e-Título TSE | Service Design & A11y | Ivy DC",
      description:
        "Redesenho do onboarding do e-Título (TSE): Service Design com acessibilidade, inclusão digital e jornada completa do eleitor desde o primeiro acesso ao app.",
      related: [
        { label: "Polícia Federal — workshop", path: "/cases/policia-federal" },
        { label: "Cards Claro AMX", path: "/cases/claro" },
      ],
    },
    bbnk: {
      title: "BBNK | UX Case Study | Ivy DC",
      description:
        "Estudo de caso BBNK: plataforma white-label de banking as a service com UX/UI minimalista, protótipo navegável e entrega ágil de produtos bancários digitais.",
      related: [
        { label: "TrustHub — fintech PME", path: "/cases/trusthub" },
        { label: "Cashlog Raízen", path: "/cases/cashlog" },
      ],
    },
    trusthub: {
      title: "TrustHub | UX Case Study | Ivy DC",
      description:
        "TrustHub Conta Pag Digital: arquitetura da informação e interface web para PME — landing, transferências, favorecidos e navegação clara e consistente.",
      ogImage: "/images/trusthub-overview.jpg",
      related: [
        { label: "BBNK — banking as a service", path: "/cases/bbnk" },
        {
          label: "Polícia Federal — Design de Serviço",
          path: "/cases/policia-federal",
        },
      ],
    },
    "policia-federal": {
      title: "Polícia Federal | Service Design Workshop | Ivy DC",
      description:
        "Workshop de padronização de computadores da Polícia Federal: facilitação, jornadas AS IS/TO BE, How Might We e backlog priorizado de melhorias de serviço.",
      ogImage: "/images/policia-federal-overview.png",
      related: [
        {
          label: "Gerenciador de riscos com AI — Petrobras",
          path: "/cases/gerenciador-de-riscos-com-ai",
        },
        { label: "e-Título TSE — Service Design", path: "/cases/etitulo" },
      ],
    },
    "gerenciador-de-riscos-com-ai": {
      title: "Gerenciador de riscos com AI | Petrobras | Ivy DC",
      description:
        "Case Petrobras: Gerenciador de riscos com AI — discovery em 5 torres, Product Canvas, blueprint TO-BE conversacional e validação com CES 6,2.",
      robots: "noindex, nofollow",
      related: [
        {
          label: "Polícia Federal — Design de Serviço",
          path: "/cases/policia-federal",
        },
        { label: "e-Título TSE — Service Design", path: "/cases/etitulo" },
        { label: "Cards Claro AMX", path: "/cases/claro" },
      ],
    },
  },
  en: {
    cashlog: {
      title: "Cashlog Raízen | UX & Machine Learning | Ivy DC",
      description:
        "Cashlog (Raízen) UX/UI case: investment-demand platform powered by machine learning, research with 15 professionals and 8 distinct user profiles.",
      related: [
        { label: "BBNK — banking as a service", path: "/cases/bbnk" },
        { label: "TrustHub — SME digital account", path: "/cases/trusthub" },
      ],
    },
    claro: {
      title: "Claro Empresas | Customer Experience | Ivy DC",
      description:
        "Service Design discovery for Claro AMX sales cards: business rules, information architecture and DesignOps for multi-country commercial operations.",
      related: [
        { label: "Claro A/B tests — CRO", path: "/cases/abtest" },
        { label: "e-Título TSE — onboarding", path: "/cases/etitulo" },
      ],
    },
    abtest: {
      title: "Claro A/B Tests | CRO & Experimentation | Ivy DC",
      description:
        "CRO case at Claro: data-driven A/B tests to lift conversion, validate product hypotheses and evolve the digital experience through experimentation.",
      related: [
        { label: "Claro AMX Cards", path: "/cases/claro" },
        { label: "Cashlog Raízen — UX/UI", path: "/cases/cashlog" },
      ],
    },
    etitulo: {
      title: "e-Título TSE | Service Design & A11y | Ivy DC",
      description:
        "e-Título (TSE) onboarding redesign: Service Design focused on accessibility, digital inclusion and the voter journey from the very first app touch.",
      related: [
        {
          label: "Federal Police — workshop",
          path: "/cases/policia-federal",
        },
        { label: "Claro AMX Cards", path: "/cases/claro" },
      ],
    },
    bbnk: {
      title: "BBNK | UX Case Study | Ivy DC",
      description:
        "BBNK UX case study: white-label banking-as-a-service platform with minimalist UX/UI, a navigable prototype and fast delivery of digital banking products.",
      related: [
        { label: "TrustHub — SME fintech", path: "/cases/trusthub" },
        { label: "Cashlog Raízen", path: "/cases/cashlog" },
      ],
    },
    trusthub: {
      title: "TrustHub | UX Case Study | Ivy DC",
      description:
        "TrustHub Conta Pag Digital: information architecture and web UI for SMEs — landing, transfers, recipients and clear, consistent product navigation.",
      ogImage: "/images/trusthub-overview.jpg",
      related: [
        { label: "BBNK — banking as a service", path: "/cases/bbnk" },
        {
          label: "Federal Police — Service Design",
          path: "/cases/policia-federal",
        },
      ],
    },
    "policia-federal": {
      title: "Federal Police | Service Design Workshop | Ivy DC",
      description:
        "Federal Police computer-standardization workshop: facilitation, AS-IS/TO-BE journeys, How Might We prompts and a prioritized Service Design backlog.",
      ogImage: "/images/policia-federal-overview.png",
      related: [
        {
          label: "Risk Manager with AI — Petrobras",
          path: "/cases/gerenciador-de-riscos-com-ai",
        },
        { label: "e-Título TSE — Service Design", path: "/cases/etitulo" },
      ],
    },
    "gerenciador-de-riscos-com-ai": {
      title: "Risk Manager with AI | Petrobras | Ivy DC",
      description:
        "Petrobras case: Risk Manager with AI — discovery across 5 towers, Product Canvas, conversational TO-BE blueprint and CES 6.2 validation.",
      robots: "noindex, nofollow",
      related: [
        {
          label: "Federal Police — Service Design",
          path: "/cases/policia-federal",
        },
        { label: "e-Título TSE — Service Design", path: "/cases/etitulo" },
        { label: "Claro AMX Cards", path: "/cases/claro" },
      ],
    },
  },
};

export function getCasePageSeo(
  id: string,
  locale: Locale,
): PageSeoCopy | undefined {
  const byLocale = casePageSeo[locale];
  if (id in byLocale) {
    return byLocale[id as CaseStudyId];
  }
  return undefined;
}
