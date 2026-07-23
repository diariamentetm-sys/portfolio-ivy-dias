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
import {
  resolveWorkCategory,
  WORK_CATEGORY_BY_SLUG,
} from "./workCategories";

export const SEED_PROJECT_IDS: Record<CaseStudyId, string> = {
  cashlog: "11111111-1111-4111-8111-111111111101",
  claro: "11111111-1111-4111-8111-111111111102",
  abtest: "11111111-1111-4111-8111-111111111103",
  etitulo: "11111111-1111-4111-8111-111111111104",
  bbnk: "11111111-1111-4111-8111-111111111105",
  trusthub: "11111111-1111-4111-8111-111111111106",
  "policia-federal": "11111111-1111-4111-8111-111111111107",
  "gerenciador-de-riscos-com-ai": "11111111-1111-4111-8111-111111111108",
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
        images: [{ src: cashlogData.researchImg }],
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
        images: cashlogData.wireframes.map(({ src, alt }) => ({ src, alt })),
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
        images: cashlogData.uiScreens.map(({ src, alt }) => ({ src, alt })),
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
        images: [{ src: claroData.overviewImg }],
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
        images: claroData.cards.map(({ src, alt }) => ({ src, alt })),
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
      images: [
        {
          src: abtestData.tests[index].image,
          alt: abtestData.tests[index].imageAlt,
        },
      ],
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
        images: [{ src: etituloData.overviewImg }],
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
        images: etituloData.personas.map(({ img, imgAlt }) => ({
          src: img,
          alt: imgAlt,
        })),
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

function buildBbnkLocale(locale: Locale): ProjectLocaleContent {
  const config = caseStudyConfigs[locale].bbnk;
  const preview = workPreviewByLocale[locale].find((item) => item.id === "bbnk")!;

  const sections =
    locale === "pt"
      ? [
          {
            number: "01",
            kicker: "01 / 04 · Visão geral",
            title: "Banking as a Service com entregas rápidas",
            body: "BBNK — O BANK, plataforma digital integrada de banking as a service e white label, com entregas rápidas de produtos bancários.",
          },
          {
            number: "02",
            kicker: "02 / 04 · Proposta de valor",
            title: "Gestão financeira intuitiva e integrada",
            body: "Com o BBNK, buscamos entregar gestão financeira de forma intuitiva, personalizada e integrada aos seus negócios e dia a dia. Focados no seu sucesso, criamos o seu banco e o seu futuro, de forma simples e rápida.",
          },
          {
            number: "03",
            kicker: "03 / 04 · Conceito visual",
            title: "Minimalista, vibrante e clean",
            body: "O conceito visual apresenta-se de forma minimalista, com cores vibrantes e um layout clean. Com uma interface intuitiva, a navegação é fácil e dinâmica, permitindo ao usuário realizar suas operações de forma rápida e segura, com o objetivo final de economizar tempo.",
          },
          {
            number: "04",
            kicker: "04 / 04 · Protótipo navegável",
            title: "Explore a experiência BBNK",
            body: "Interaja com o protótipo — desktop e fluxos da conta.",
          },
        ]
      : [
          {
            number: "01",
            kicker: "01 / 04 · Overview",
            title: "Banking as a Service with fast delivery",
            body: "BBNK — THE BANK, an integrated digital banking-as-a-service and white-label platform built for rapid delivery of banking products.",
          },
          {
            number: "02",
            kicker: "02 / 04 · Value proposition",
            title: "Intuitive, personalized financial management",
            body: "With BBNK, we deliver financial management that feels intuitive, personalized, and integrated into everyday business. Focused on your success, we create your bank — and your future — simply and quickly.",
          },
          {
            number: "03",
            kicker: "03 / 04 · Visual concept",
            title: "Minimal, vibrant, and clean",
            body: "The visual concept is minimal, with vibrant accents and a clean layout. An intuitive interface keeps navigation easy and dynamic, so users can complete operations quickly and securely — saving time at every step.",
          },
          {
            number: "04",
            kicker: "04 / 04 · Navigable prototype",
            title: "Explore the BBNK experience",
            body: "Interact with the prototype — account flows and desktop UI.",
          },
        ];

  return {
    kicker: preview.kicker,
    subtitle: preview.subtitle,
    title: config.title,
    titleAccent: config.titleAccent,
    description: preview.description,
    breadcrumb: config.breadcrumb,
    caseKicker: config.kicker,
    tags: config.tags,
    meta: config.meta,
    about: config.about,
    sections,
  };
}

function buildTrusthubLocale(locale: Locale): ProjectLocaleContent {
  const config = caseStudyConfigs[locale].trusthub;
  const preview = workPreviewByLocale[locale].find((item) => item.id === "trusthub")!;

  const sections =
    locale === "pt"
      ? [
          {
            number: "01",
            kicker: "Visão geral",
            title: "Conta digital para pequenas empresas",
            body: "A TrustHub reúne as principais funcionalidades de uma conta digital em uma única plataforma, oferecendo uma experiência simples e intuitiva para a gestão financeira de pequenas empresas. O projeto contemplou o desenvolvimento da landing page institucional e da interface da plataforma, abrangendo funcionalidades como pagamentos, depósitos, transferências, extratos consolidados e área de suporte, com foco em uma navegação organizada, consistente e de fácil utilização.",
            images: [
              {
                src: "/images/trusthub-overview.jpg",
                alt: "TrustHub — Conta Pag Digital",
              },
            ],
          },
          {
            number: "02",
            kicker: "Interface",
            title: "Transferências na Conta Pag Digital",
            body: "Telas da área de transferências — histórico de movimentações e gestão de favorecidos — com navegação clara e leitura rápida dos dados financeiros.",
            images: [
              {
                src: "/images/trusthub-transferencias.png",
                alt: "TrustHub — Minhas Transferências",
              },
              {
                src: "/images/trusthub-favorecidos.png",
                alt: "TrustHub — Favorecidos",
              },
            ],
          },
          {
            number: "03",
            kicker: "Desafio",
            title: "Desafio",
            body: "Meu desafio foi transformar processos financeiros em uma experiência digital simples, intuitiva e acessível, organizando diferentes funcionalidades em uma interface capaz de proporcionar mais clareza e agilidade na rotina das pequenas empresas.",
          },
        ]
      : [
          {
            number: "01",
            kicker: "Overview",
            title: "A digital account for small businesses",
            body: "TrustHub brings the core features of a digital account into a single platform, offering a simple and intuitive experience for small-business financial management. The project covered the institutional landing page and the platform interface — payments, deposits, transfers, consolidated statements, and support — with organized, consistent, easy-to-use navigation.",
            images: [
              {
                src: "/images/trusthub-overview.jpg",
                alt: "TrustHub — Conta Pag Digital",
              },
            ],
          },
          {
            number: "02",
            kicker: "Interface",
            title: "Transfers in Conta Pag Digital",
            body: "Screens from the transfers area — transaction history and recipient management — with clear navigation and fast scanning of financial data.",
            images: [
              {
                src: "/images/trusthub-transferencias.png",
                alt: "TrustHub — My Transfers",
              },
              {
                src: "/images/trusthub-favorecidos.png",
                alt: "TrustHub — Recipients",
              },
            ],
          },
          {
            number: "03",
            kicker: "Challenge",
            title: "Challenge",
            body: "My challenge was to turn financial processes into a simple, intuitive, accessible digital experience — organizing many features in an interface that brings more clarity and agility to small-business routines.",
          },
        ];

  return {
    kicker: preview.kicker,
    subtitle: preview.subtitle,
    title: config.title,
    titleAccent: config.titleAccent,
    description: preview.description,
    breadcrumb: config.breadcrumb,
    caseKicker: config.kicker,
    tags: config.tags,
    meta: config.meta,
    about: config.about,
    sections,
  };
}

function buildPoliciaFederalLocale(locale: Locale): ProjectLocaleContent {
  const config = caseStudyConfigs[locale]["policia-federal"];
  const preview = workPreviewByLocale[locale].find(
    (item) => item.id === "policia-federal",
  )!;

  const sections =
    locale === "pt"
      ? [
          {
            number: "01",
            kicker: "Visão geral",
            title: "Padronização nacional de computadores",
            body: "O Workshop de Padronização de Computadores reuniu representantes da Polícia Federal de diversas regiões do Brasil para revisar o processo de disponibilização de equipamentos e construir uma proposta de padronização nacional. O encontro combinou facilitação, roteirização e Design de Serviço para transformar conhecimento operacional disperso em um modelo compartilhado, mais eficiente e aderente às diferentes realidades da instituição.",
            images: [
              {
                src: "/images/policia-federal-overview.png",
                alt: "Workshop de Padronização de Computadores — Polícia Federal",
              },
            ],
          },
          {
            number: "02",
            kicker: "Desafio",
            title: "Desafio",
            body: "Meu desafio foi conduzir especialistas de diferentes regiões a responderem, juntos: como podemos melhorar o modelo atual de disponibilização de computadores da Polícia Federal? — convertendo fricções operacionais em um processo padronizado, eficiente e alinhado às múltiplas realidades da instituição.",
          },
          {
            number: "03",
            kicker: "Discovery",
            title: "Alinhamento do desafio e jornada AS IS",
            body: "A primeira etapa consistiu no alinhamento coletivo do desafio e no entendimento do cenário atual. Em seguida, mapeamos a jornada AS IS em três frentes críticas: recebimento de equipamentos, distribuição e renovação. Especialistas compartilharam o funcionamento real do processo — com suas variações regionais e exceções do dia a dia — enquanto os demais participantes registravam dificuldades, gargalos e oportunidades. O Discovery não buscou apenas descrever o fluxo oficial, mas revelar como a disponibilização de computadores acontecia na prática.",
          },
          {
            number: "04",
            kicker: "Oportunidades",
            title: "Do problema à pergunta How Might We",
            body: "Com o AS IS consolidado, usamos a dinâmica How Might We (Como Podemos?) para converter problemas em oportunidades de inovação. As fricções do processo viraram perguntas abertas: como justificar equipamentos de maior custo quando a necessidade for real; como flexibilizar a MOC sem perder controle; quais critérios devem orientar a distribuição; como identificar a real necessidade do usuário a partir de função, competências e requisitos de TI; como definir cenários de uso com mais clareza; e em que condições a obrigatoriedade de determinados equipamentos deixa de fazer sentido. A dinâmica deslocou o grupo do diagnóstico para o espaço de solução, sem perder o rigor institucional.",
          },
          {
            number: "05",
            kicker: "Solução",
            title: "Jornada TO BE em dois fluxos estruturantes",
            body: "Após consolidar os insights do Discovery, conduzimos uma sessão colaborativa de Design de Serviços para desenhar a jornada futura (TO BE). Estruturamos dois grandes fluxos: recebimento e distribuição de computadores, e renovação dos equipamentos. Neles passaram a constar responsabilidades claras entre áreas, comunicação estruturada com o usuário, padronização da distribuição, formulários para novas necessidades, recolhimento do equipamento antigo e alinhamento explícito com a MOC. A solução não foi um fluxograma isolado — foi um acordo operacional construído em conjunto.",
          },
          {
            number: "06",
            kicker: "Resultado",
            title: "Consenso operacional e modelo compartilhado",
            body: "O workshop resultou em alinhamento entre diferentes áreas da Polícia Federal, consolidação da jornada futura, definição de um modelo padronizado de disponibilização, backlog de melhorias e uma visão compartilhada do processo. O principal valor não foi apenas desenhar um fluxo: foi criar consenso entre especialistas e transformar conhecimento operacional tácito em um processo estruturado, legível e acionável para a instituição.",
          },
          {
            number: "07",
            kicker: "Próximos passos",
            title: "Backlog para evolução contínua",
            body: "As oportunidades registradas no workshop formaram o backlog do projeto: gestão do ciclo de vida dos equipamentos, critérios de substituição, gestão patrimonial, reaproveitamento de ativos, aumento da vida útil e classificação para reutilização, manutenção ou descarte. Esses temas mantêm o desenho TO BE vivo — como uma agenda de evolução, e não como um entregável estático.",
          },
        ]
      : [
          {
            number: "01",
            kicker: "Overview",
            title: "National computer standardization",
            body: "The Computer Standardization Workshop brought together Federal Police representatives from regions across Brazil to review how equipment is made available and to build a national standardization proposal. Facilitation, workshop scripting, and Service Design turned scattered operational knowledge into a shared model — more efficient and better aligned with the institution’s diverse realities.",
            images: [
              {
                src: "/images/policia-federal-overview.png",
                alt: "Computer Standardization Workshop — Federal Police",
              },
            ],
          },
          {
            number: "02",
            kicker: "Challenge",
            title: "Challenge",
            body: "My challenge was to guide specialists from different regions to answer, together: how might we improve the Federal Police’s current model for making computers available? — turning operational friction into a standardized, efficient process that fits the institution’s many realities.",
          },
          {
            number: "03",
            kicker: "Discovery",
            title: "Challenge alignment and the AS-IS journey",
            body: "We began by aligning on the challenge and building a shared view of the current scenario. Then we mapped the AS-IS journey across three critical fronts: receiving equipment, distribution, and renewal. Specialists described how the process actually worked — including regional variations and day-to-day exceptions — while other participants captured pain points and opportunities. Discovery was not about the official flow alone; it revealed how computer provisioning happened in practice.",
          },
          {
            number: "04",
            kicker: "Opportunities",
            title: "From problems to How Might We questions",
            body: "With the AS-IS map in place, we used How Might We to turn problems into innovation opportunities. Process friction became open questions: how to justify higher-cost equipment when the need is real; how to make the MOC more flexible without losing control; which criteria should guide distribution; how to identify users’ real needs from role, skills, and IT requirements; how to define usage scenarios more clearly; and when mandatory equipment rules stop making sense. The exercise moved the group from diagnosis into solution space — without losing institutional rigor.",
          },
          {
            number: "05",
            kicker: "Solution",
            title: "TO-BE journey in two structuring flows",
            body: "After consolidating Discovery insights, we ran a collaborative Service Design session to shape the future (TO-BE) journey. We structured two major flows: receiving and distributing computers, and renewing equipment. They incorporated clear cross-area responsibilities, structured user communication, standardized distribution, forms for new needs, collection of old equipment, and explicit alignment with the MOC. The solution was not an isolated flowchart — it was an operational agreement built together.",
          },
          {
            number: "06",
            kicker: "Outcome",
            title: "Operational consensus and a shared model",
            body: "The workshop produced alignment across Federal Police areas, a consolidated future journey, a standardized provisioning model, an improvement backlog, and a shared process vision. The main value was not only drawing a flow: it was building consensus among specialists and turning tacit operational knowledge into a structured, readable, actionable process for the institution.",
          },
          {
            number: "07",
            kicker: "Next steps",
            title: "A backlog for continuous evolution",
            body: "Opportunities captured in the workshop became the project backlog: equipment lifecycle management, replacement criteria, asset management, equipment reuse, longer asset lifespan, and classification for reuse, maintenance, or disposal. These themes keep the TO-BE design alive — as an evolution agenda, not a static deliverable.",
          },
        ];

  return {
    kicker: preview.kicker,
    subtitle: preview.subtitle,
    title: config.title,
    titleAccent: config.titleAccent,
    description: preview.description,
    breadcrumb: config.breadcrumb,
    caseKicker: config.kicker,
    tags: config.tags,
    meta: config.meta,
    about: config.about,
    sections,
  };
}

function buildRiskaiLocale(locale: Locale): ProjectLocaleContent {
  const config = caseStudyConfigs[locale]["gerenciador-de-riscos-com-ai"];
  const preview = workPreviewByLocale[locale].find(
    (item) => item.id === "gerenciador-de-riscos-com-ai",
  )!;

  const sections =
    locale === "pt"
      ? [
          {
            number: "01",
            kicker: "Desafio",
            title: "Cinco torres, um processo fragmentado",
            body: "A Petrobras gerencia riscos em cinco frentes — GIR, Projetos, Estocásticos, Operacional e Crédito — com informação espalhada e retrabalho constante. O Gerenciador de riscos com AI nasceu para unificar essa gestão em uma experiência ágil, integrada e inteligente.",
          },
          {
            number: "02",
            kicker: "Discovery",
            title: "Imersão, definição, ideação, validação e melhoria contínua",
            body: "Discovery estruturado com entrevistas nas cinco torres, 15 personas, Lean Inception, Product Canvas, blueprint TO-BE conversacional e validação qualitativa com CES médio 6,2.",
          },
          {
            number: "03",
            kicker: "Solução",
            title: "Assistente conversacional com RAG",
            body: "Interface conversacional integrada a SAP, normativos e bases RAG — mesma cadência de interação para inspeções, Beacon/EPSC, CSB/ANP e Marsh, com síntese técnica e CTAs de validação.",
          },
          {
            number: "04",
            kicker: "Roadmap",
            title: "Sete ondas e três fases estratégicas",
            body: "De 80 funcionalidades a 21 épicos priorizados e um roadmap contínuo com 60+ épicos — do MVP operacional à visão futura com decisão assistida por IA.",
          },
        ]
      : [
          {
            number: "01",
            kicker: "Challenge",
            title: "Five towers, one fragmented process",
            body: "Petrobras manages risk across five fronts — GIR, Projects, Stochastic, Operational and Credit — with scattered information and constant rework. Risk Manager with AI was built to unify that management into an agile, integrated and intelligent experience.",
          },
          {
            number: "02",
            kicker: "Discovery",
            title: "Immersion, definition, ideation, validation and continuous improvement",
            body: "Structured discovery with interviews across five towers, 15 personas, Lean Inception, Product Canvas, conversational TO-BE blueprint and qualitative validation with average CES 6.2.",
          },
          {
            number: "03",
            kicker: "Solution",
            title: "Conversational assistant with RAG",
            body: "Conversational UI integrated with SAP, standards and RAG bases — the same interaction cadence for inspections, Beacon/EPSC, CSB/ANP and Marsh, with technical synthesis and validation CTAs.",
          },
          {
            number: "04",
            kicker: "Roadmap",
            title: "Seven waves and three strategic phases",
            body: "From 80 features to 21 prioritized epics and a continuous roadmap with 60+ epics — from the operational MVP to a future vision with AI-assisted decisions.",
          },
        ];

  return {
    kicker: preview.kicker,
    subtitle: preview.subtitle,
    title: config.title,
    titleAccent: config.titleAccent,
    description: preview.description,
    breadcrumb: config.breadcrumb,
    caseKicker: config.kicker,
    tags: config.tags,
    meta: config.meta,
    about: config.about,
    sections,
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
    category: WORK_CATEGORY_BY_SLUG[id] ?? "ux-ui",
    overviewImage,
    pt: buildLocale("pt"),
    en: buildLocale("en"),
  };
}

export const seedProjects: ManagedProject[] = [
  buildSeedProject("gerenciador-de-riscos-com-ai", "01", "", buildRiskaiLocale),
  buildSeedProject("cashlog", "02", cashlogData.researchImg, buildCashlogLocale),
  buildSeedProject("claro", "03", claroData.overviewImg, buildClaroLocale),
  buildSeedProject("abtest", "04", abtestData.tests[0].image, buildAbtestLocale),
  buildSeedProject("etitulo", "05", etituloData.overviewImg, buildEtituloLocale),
  buildSeedProject("bbnk", "06", "", buildBbnkLocale),
  buildSeedProject(
    "trusthub",
    "07",
    "/images/trusthub-overview.jpg",
    buildTrusthubLocale,
  ),
  buildSeedProject(
    "policia-federal",
    "08",
    "/images/policia-federal-overview.png",
    buildPoliciaFederalLocale,
  ),
];

function sectionNeedsImages(
  section: ProjectLocaleContent["sections"][number],
) {
  return !section.images?.length;
}

function enrichProjectFromSeed(
  project: ManagedProject,
  seed: ManagedProject,
): { project: ManagedProject; enriched: boolean } {
  let enriched = false;
  const locales: Locale[] = ["en", "pt"];
  let updated: ManagedProject = { ...project };

  if (!updated.category && seed.category) {
    updated = { ...updated, category: seed.category };
    enriched = true;
  } else if (!updated.category) {
    updated = {
      ...updated,
      category: resolveWorkCategory(updated.slug),
    };
    enriched = true;
  }

  for (const locale of locales) {
    const copy = updated[locale];
    const seedCopy = seed[locale];
    const sections = copy.sections.map((section, index) => {
      const seedSection = seedCopy.sections[index];
      if (!seedSection?.images?.length || !sectionNeedsImages(section)) {
        return section;
      }
      enriched = true;
      return { ...section, images: seedSection.images };
    });
    updated = { ...updated, [locale]: { ...copy, sections } };
  }

  return { project: updated, enriched };
}

export function mergeSeedProjects(projects: ManagedProject[]) {
  const result = [...projects];
  let addedCount = 0;

  for (const seed of seedProjects) {
    const existingIndex = result.findIndex((project) => project.slug === seed.slug);

    if (existingIndex === -1) {
      result.push(seed);
      addedCount++;
      continue;
    }

    const { project: enrichedProject, enriched } = enrichProjectFromSeed(
      result[existingIndex],
      seed,
    );

    if (enriched) {
      result[existingIndex] = enrichedProject;
      addedCount++;
    }
  }

  return { projects: result, addedCount };
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
