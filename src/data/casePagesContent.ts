import type { Locale } from "../i18n/types";
import type {
  AbTestBlock,
  Fase,
  FunilItem,
  Impacto,
  Oportunidade,
  Pain,
  Persona,
  RuleBar,
  StepItem,
} from "../types/cases";
import type { CaseStudyConfig, MetaItem, ProfileItem, Step } from "../types/portfolio";

export type CaseStudyId =
  | "cashlog"
  | "claro"
  | "abtest"
  | "etitulo"
  | "bbnk"
  | "trusthub"
  | "policia-federal";

// ---------------------------------------------------------------------------
// Case study layout configs (header, meta, about, next)
// ---------------------------------------------------------------------------

export const caseStudyConfigs: Record<
  Locale,
  Record<CaseStudyId, CaseStudyConfig>
> = {
  pt: {
    cashlog: {
      id: "cashlog",
      path: "/cases/cashlog",
      accent: "#EC2A86",
      breadcrumb: "Cashlog · Raízen · 2018",
      kicker: "Estudo de caso · UX/UI Design",
      title: "Cashlog",
      titleAccent: " — Raízen",
      subtitle:
        "Plataforma de gestão de demandas de investimento com machine learning para Varejo, Aviação, LD&T e B2B.",
      tags: ["UX Research", "UI Design", "Machine Learning", "MJV"],
      meta: [
        { k: "Papel", v: "UX / UI Designer" },
        { k: "Empresa", v: "MJV · Consultoria" },
        { k: "Cliente", v: "Raízen" },
        { k: "Período", v: "2018" },
        { k: "Entrevistas", v: "15 profissionais" },
        { k: "Perfis", v: "8 tipos de usuários" },
      ],
      about: [
        "Atuei como consultora de inovação, UX e UI na MJV para o projeto Cashlog da Raízen, uma das maiores empresas do setor energético do Brasil.",
        "O objetivo era projetar uma plataforma que usasse machine learning para otimizar a aprovação de demandas de linhas de investimento, atendendo a 8 perfis distintos de usuários — do colaborador operacional ao diretor — além de um painel administrativo para configuração do sistema.",
      ],
      next: { label: "Próximo: Cards Claro AMX →", path: "/cases/claro" },
    },
    claro: {
      id: "claro",
      path: "/cases/claro",
      accent: "#EC2A86",
      breadcrumb: "Cards AMX Claro · 2023–2024",
      kicker: "Estudo de caso · Service Design",
      title: "Cards ",
      titleAccent: "Claro AMX",
      subtitle:
        "Discovery de regras de negócio e arquitetura de informação para o componente Card de vendas em países AMX.",
      tags: ["Service Design", "DesignOps", "Claro", "AMX"],
      meta: [
        { k: "Papel", v: "Service Designer" },
        { k: "Time", v: "DesignOps · Claro" },
        { k: "Período", v: "2023 – 2024" },
        { k: "Sessões", v: "8 reuniões" },
        { k: "Participantes", v: "12 a 45 pessoas" },
        { k: "Entregável", v: "Redesign dos Cards" },
      ],
      about: [
        "Atuei como service designer no time de DesignOps da Claro na condução do discovery do componente Card de vendas para os países AMX.",
        "O objetivo era consolidar as regras de negócio e a arquitetura de informação que dariam base aos novos modelos de card — um primeiro caminho a ser priorizado dentro de um momento de definição do processo de design.",
      ],
      next: { label: "Próximo: Testes A/B →", path: "/cases/abtest" },
    },
    abtest: {
      id: "abtest",
      path: "/cases/abtest",
      accent: "#EC2A86",
      breadcrumb: "Claro · CRO / Experimentação",
      kicker: "Estudo de caso · CRO / Experimentação",
      title: "Testes A/B ",
      titleAccent: "orientados a dados",
      subtitle:
        "Prova de raciocínio orientado a dados e resultado de negócio mensurável — não só entrega visual, mas hipótese validada em produção, no e-commerce da Claro.",
      tags: ["Testes A/B", "CRO", "Métricas de negócio"],
      meta: [
        { k: "Papel", v: "CX / Experimentação" },
        { k: "Cliente", v: "Claro Brasil" },
        { k: "Contexto", v: "E-commerce · Portal Claro.com.br" },
        { k: "Abordagem", v: "Hipótese + métrica + duração" },
      ],
      about: [
        "Dois experimentos conduzidos com hipóteses claras, duração definida e métricas de negócio — validando decisões em produção, não apenas entregas visuais.",
      ],
      next: { label: "Próximo: e-Título (TSE) →", path: "/cases/etitulo" },
    },
    etitulo: {
      id: "etitulo",
      path: "/cases/etitulo",
      accent: "#EC2A86",
      breadcrumb: "Tribunal Superior Eleitoral · 2026",
      kicker: "Estudo de caso · Service Design",
      title: "Onboarding do ",
      titleAccent: "e-Título",
      subtitle:
        "Service Design aplicado ao aplicativo e-Título do TSE, repensando o acesso à cidadania digital com acessibilidade no centro da experiência.",
      tags: [
        "Service Design",
        "Discovery",
        "Acessibilidade",
        "As-Is / To-Be",
        "UX Research",
      ],
      meta: [
        { k: "Papel", v: "Lead Service Designer" },
        { k: "Cliente", v: "Tribunal Superior Eleitoral" },
        { k: "Contexto", v: "Hitss / Claro Brasil" },
        { k: "Período", v: "2026" },
      ],
      about: [
        "Service Design aplicado ao aplicativo e-Título do TSE, repensando o acesso à cidadania digital com acessibilidade no centro da experiência.",
      ],
      headerStats: [
        { value: "12", label: "etapas no novo onboarding" },
        { value: "3", label: "personas guiando a experiência" },
        { value: "4", label: "fases de Service Design" },
      ],
      next: { label: "Próximo: BBNK →", path: "/cases/bbnk" },
    },
    bbnk: {
      id: "bbnk",
      path: "/cases/bbnk",
      accent: "#EC2A86",
      breadcrumb: "BBNK · 2018 — 2019",
      kicker: "Estudo de caso · UX / UI",
      title: "Banco ",
      titleAccent: "BBNK",
      subtitle:
        "Plataforma digital integrada de banking as a service e white label, com entregas rápidas de produtos bancários.",
      tags: ["UX", "UI", "Inovação", "Fintech", "BaaS"],
      meta: [
        { k: "Papel", v: "Consultora de inovação, UX, UI" },
        { k: "Cliente", v: "BBNK" },
        { k: "Período", v: "2018 — 2019" },
        { k: "Entregável", v: "Produto digital / white label" },
      ],
      about: [
        "BBNK — O BANK, plataforma digital integrada de banking as a service e white label com entregas rápidas de produtos bancários.",
        "Atuei como consultora de inovação, UX e UI no desenho de uma experiência bancária minimalista, com navegação dinâmica e foco em operações rápidas e seguras.",
      ],
      next: { label: "Próximo: TrustHub →", path: "/cases/trusthub" },
    },
    trusthub: {
      id: "trusthub",
      path: "/cases/trusthub",
      accent: "#EC2A86",
      breadcrumb: "TrustHub · Tritone · 2017 — 2018",
      kicker: "Estudo de caso · UX / UI",
      title: "Trust",
      titleAccent: "Hub",
      subtitle:
        "Conta 100% digital para simplificar a gestão financeira de pequenas e médias empresas.",
      tags: ["UX", "UI", "Fintech", "Arquitetura da Informação", "Tritone"],
      meta: [
        { k: "Papel", v: "UX/UI Designer" },
        { k: "Cliente", v: "TrustHub" },
        { k: "Empresa", v: "Tritone" },
        { k: "Período", v: "2017 — 2018" },
        {
          k: "Entregáveis",
          v: "Arquitetura da Informação · Design de Interface Web",
        },
      ],
      about: [
        "Na Tritone, atuei como UX/UI Designer, conduzindo a arquitetura da informação e o design da interface do site institucional e dos fluxos histórico de movimentações e gestão de favorecidos.",
        "A TrustHub é uma plataforma de conta 100% digital desenvolvida para simplificar a gestão financeira de pequenas empresas.",
      ],
      next: {
        label: "Próximo: Polícia Federal →",
        path: "/cases/policia-federal",
      },
    },
    "policia-federal": {
      id: "policia-federal",
      path: "/cases/policia-federal",
      accent: "#EC2A86",
      breadcrumb: "Polícia Federal · 2019",
      kicker: "Estudo de caso · Design de Serviço",
      title: "Polícia ",
      titleAccent: "Federal",
      subtitle:
        "Workshop de padronização nacional de computadores — do AS IS ao TO BE com representantes de diversas regiões do Brasil.",
      tags: [
        "Design de Serviço",
        "Facilitação",
        "Workshop",
        "Jornada AS IS / TO BE",
        "Polícia Federal",
      ],
      meta: [
        { k: "Papel", v: "Roteirização · Facilitação · Design de Serviço" },
        { k: "Cliente", v: "Polícia Federal" },
        { k: "Período", v: "2019" },
        {
          k: "Entregáveis",
          v: "Jornada AS IS · How Might We · Jornada TO BE · Backlog",
        },
      ],
      about: [
        "Atuei na roteirização e facilitação do Workshop de Padronização de Computadores da Polícia Federal, conduzindo o Design de Serviço para alinhar especialistas de diversas regiões em torno de um modelo nacional de disponibilização de equipamentos.",
        "O workshop reuniu representantes da instituição para revisar o processo atual, identificar oportunidades e construir, de forma colaborativa, a jornada futura de recebimento, distribuição e renovação de computadores.",
      ],
      next: { label: "Ver: Cashlog (Raízen) →", path: "/cases/cashlog" },
    },
  },
  en: {
    cashlog: {
      id: "cashlog",
      path: "/cases/cashlog",
      accent: "#EC2A86",
      breadcrumb: "Cashlog · Raízen · 2018",
      kicker: "Case study · UX/UI Design",
      title: "Cashlog",
      titleAccent: " — Raízen",
      subtitle:
        "Investment demand management platform with machine learning for Retail, Aviation, LD&T, and B2B.",
      tags: ["UX Research", "UI Design", "Machine Learning", "MJV"],
      meta: [
        { k: "Role", v: "UX / UI Designer" },
        { k: "Company", v: "MJV · Consulting" },
        { k: "Client", v: "Raízen" },
        { k: "Period", v: "2018" },
        { k: "Interviews", v: "15 professionals" },
        { k: "Profiles", v: "8 user types" },
      ],
      about: [
        "I worked as an innovation, UX, and UI consultant at MJV on the Cashlog project for Raízen, one of Brazil's largest energy companies.",
        "The goal was to design a platform that uses machine learning to optimize investment line demand approval, serving 8 distinct user profiles — from operational staff to directors — plus an admin panel for system configuration.",
      ],
      next: { label: "Next: Claro AMX Cards →", path: "/cases/claro" },
    },
    claro: {
      id: "claro",
      path: "/cases/claro",
      accent: "#EC2A86",
      breadcrumb: "Claro AMX Cards · 2023–2024",
      kicker: "Case study · Service Design",
      title: "Claro AMX ",
      titleAccent: "Cards",
      subtitle:
        "Business rules discovery and information architecture for the sales Card component across AMX countries.",
      tags: ["Service Design", "DesignOps", "Claro", "AMX"],
      meta: [
        { k: "Role", v: "Service Designer" },
        { k: "Team", v: "DesignOps · Claro" },
        { k: "Period", v: "2023 – 2024" },
        { k: "Sessions", v: "8 meetings" },
        { k: "Participants", v: "12 to 45 people" },
        { k: "Deliverable", v: "Card redesign" },
      ],
      about: [
        "I worked as a service designer on Claro's DesignOps team, leading discovery for the sales Card component across AMX countries.",
        "The goal was to consolidate the business rules and information architecture that would underpin the new card models — a first path to prioritize during a pivotal moment in defining the design process.",
      ],
      next: { label: "Next: A/B Tests →", path: "/cases/abtest" },
    },
    abtest: {
      id: "abtest",
      path: "/cases/abtest",
      accent: "#EC2A86",
      breadcrumb: "Claro · CRO / Experimentation",
      kicker: "Case study · CRO / Experimentation",
      title: "Data-driven ",
      titleAccent: "A/B tests",
      subtitle:
        "Evidence of data-driven thinking and measurable business outcomes — not just visual delivery, but hypotheses validated in production on Claro's e-commerce.",
      tags: ["A/B Testing", "CRO", "Business metrics"],
      meta: [
        { k: "Role", v: "CX / Experimentation" },
        { k: "Client", v: "Claro Brasil" },
        { k: "Context", v: "E-commerce · Claro.com.br portal" },
        { k: "Approach", v: "Hypothesis + metric + duration" },
      ],
      about: [
        "Two experiments run with clear hypotheses, defined duration, and business metrics — validating decisions in production, not just visual deliverables.",
      ],
      next: { label: "Next: e-Título (TSE) →", path: "/cases/etitulo" },
    },
    etitulo: {
      id: "etitulo",
      path: "/cases/etitulo",
      accent: "#EC2A86",
      breadcrumb: "Superior Electoral Court · 2026",
      kicker: "Case study · Service Design",
      title: "e-Título ",
      titleAccent: "onboarding",
      subtitle:
        "Service Design applied to the TSE e-Título app, rethinking access to digital citizenship with accessibility at the center of the experience.",
      tags: [
        "Service Design",
        "Discovery",
        "Accessibility",
        "As-Is / To-Be",
        "UX Research",
      ],
      meta: [
        { k: "Role", v: "Lead Service Designer" },
        { k: "Client", v: "Superior Electoral Court (TSE)" },
        { k: "Context", v: "Hitss / Claro Brasil" },
        { k: "Period", v: "2026" },
      ],
      about: [
        "Service Design applied to the TSE e-Título app, rethinking access to digital citizenship with accessibility at the center of the experience.",
      ],
      headerStats: [
        { value: "12", label: "steps in the new onboarding" },
        { value: "3", label: "personas guiding the experience" },
        { value: "4", label: "Service Design phases" },
      ],
      next: { label: "Next: BBNK →", path: "/cases/bbnk" },
    },
    bbnk: {
      id: "bbnk",
      path: "/cases/bbnk",
      accent: "#EC2A86",
      breadcrumb: "BBNK · 2018 — 2019",
      kicker: "Case study · UX / UI",
      title: "BBNK ",
      titleAccent: "Bank",
      subtitle:
        "Integrated digital banking-as-a-service and white-label platform built for rapid delivery of banking products.",
      tags: ["UX", "UI", "Innovation", "Fintech", "BaaS"],
      meta: [
        { k: "Role", v: "Innovation, UX & UI consultant" },
        { k: "Client", v: "BBNK" },
        { k: "Period", v: "2018 — 2019" },
        { k: "Deliverable", v: "Digital product / white label" },
      ],
      about: [
        "BBNK — THE BANK, an integrated digital banking-as-a-service and white-label platform with fast delivery of banking products.",
        "I worked as an innovation, UX, and UI consultant designing a minimal banking experience with dynamic navigation and a focus on fast, secure operations.",
      ],
      next: { label: "Next: TrustHub →", path: "/cases/trusthub" },
    },
    trusthub: {
      id: "trusthub",
      path: "/cases/trusthub",
      accent: "#EC2A86",
      breadcrumb: "TrustHub · Tritone · 2017 — 2018",
      kicker: "Case study · UX / UI",
      title: "Trust",
      titleAccent: "Hub",
      subtitle:
        "A fully digital account built to simplify financial management for small and mid-sized businesses.",
      tags: ["UX", "UI", "Fintech", "Information Architecture", "Tritone"],
      meta: [
        { k: "Role", v: "UX/UI Designer" },
        { k: "Client", v: "TrustHub" },
        { k: "Company", v: "Tritone" },
        { k: "Period", v: "2017 — 2018" },
        {
          k: "Deliverables",
          v: "Information Architecture · Web Interface Design",
        },
      ],
      about: [
        "At Tritone, I worked as UX/UI Designer, leading information architecture and interface design for the institutional site and the transaction history and recipient-management flows.",
        "TrustHub is a fully digital account platform designed to simplify financial management for small businesses.",
      ],
      next: {
        label: "Next: Federal Police →",
        path: "/cases/policia-federal",
      },
    },
    "policia-federal": {
      id: "policia-federal",
      path: "/cases/policia-federal",
      accent: "#EC2A86",
      breadcrumb: "Federal Police · 2019",
      kicker: "Case study · Service Design",
      title: "Federal ",
      titleAccent: "Police",
      subtitle:
        "National computer standardization workshop — from AS-IS to TO-BE with representatives from regions across Brazil.",
      tags: [
        "Service Design",
        "Facilitation",
        "Workshop",
        "AS-IS / TO-BE Journey",
        "Federal Police",
      ],
      meta: [
        { k: "Role", v: "Scripting · Facilitation · Service Design" },
        { k: "Client", v: "Federal Police" },
        { k: "Period", v: "2019" },
        {
          k: "Deliverables",
          v: "AS-IS Journey · How Might We · TO-BE Journey · Backlog",
        },
      ],
      about: [
        "I led scripting and facilitation for the Federal Police Computer Standardization Workshop, using Service Design to align specialists from many regions around a national model for making equipment available.",
        "The workshop brought institutional representatives together to review the current process, identify opportunities, and collaboratively build the future journey for receiving, distributing, and renewing computers.",
      ],
      next: { label: "View: Cashlog (Raízen) →", path: "/cases/cashlog" },
    },
  },
};

// ---------------------------------------------------------------------------
// Sidebar step labels (portfolio.ts)
// ---------------------------------------------------------------------------

export const cashlogStepsContent: Record<Locale, Step[]> = {
  pt: [
    { n: "01", label: "Desafio Raízen" },
    { n: "02", label: "Pesquisa e imersão" },
    { n: "03", label: "Definição e síntese" },
    { n: "04", label: "Ideação e co-criação" },
    { n: "05", label: "Prototipação alta fidelidade" },
  ],
  en: [
    { n: "01", label: "The Raízen challenge" },
    { n: "02", label: "Research and immersion" },
    { n: "03", label: "Definition and synthesis" },
    { n: "04", label: "Ideation and co-creation" },
    { n: "05", label: "High-fidelity prototyping" },
  ],
};

export const claroStepsContent: Record<Locale, Step[]> = {
  pt: [
    { n: "01", label: "Contexto e alinhamento" },
    { n: "02", label: "Objetivos e cenários de uso" },
    { n: "03", label: "Promessas, restrições e riscos" },
    { n: "04", label: "Diagrama de alto nível" },
    { n: "05", label: "MVP de cenários" },
    { n: "06", label: "Co-criação com o e-commerce" },
  ],
  en: [
    { n: "01", label: "Context and initial alignment" },
    { n: "02", label: "Goals and use scenarios" },
    { n: "03", label: "Assumptions, constraints, and risks" },
    { n: "04", label: "Target diagram" },
    { n: "05", label: "Scenario MVP" },
    { n: "06", label: "Co-creation with e-commerce" },
  ],
};

// ---------------------------------------------------------------------------
// caseStudies.ts display strings — Cashlog
// ---------------------------------------------------------------------------

export type CashlogCaseDataContent = {
  perfis: ProfileItem[];
  descobertas: string[];
  diretrizes: { n: string; d: string }[];
  quote: string;
  researchImgAlt: string;
  wireframeAlts: string[];
  uiScreenAlts: string[];
};

export const cashlogCaseDataContent: Record<Locale, CashlogCaseDataContent> = {
  pt: {
    perfis: [
      { t: "Gestor de Finanças", d: "Aprovação financeira" },
      { t: "Gerente de Área", d: "Aprovação técnica" },
      { t: "Gestor de Negócios", d: "Prospecção e alocação" },
      { t: "Analista", d: "Validação de dados" },
      { t: "Priorizador", d: "Fila de demandas" },
      { t: "Colaborador", d: "Entrada de dados" },
      { t: "Administrador", d: "Gestão do sistema" },
      { t: "Coordenador de Área", d: "Planejamento geral" },
    ],
    descobertas: [
      "Processo manual e desconectado entre as áreas",
      "Ausência de critérios unificados de priorização",
      "Falta de visibilidade do status das aprovações",
      "Duplicidade de inputs e retrabalho frequente",
    ],
    diretrizes: [
      {
        n: "01",
        d: "Facilitar o input de dados, tornando mais otimizado o processo de envio de novas demandas.",
      },
      {
        n: "02",
        d: "Otimizar novas solicitações a partir da predição de dados baseados no histórico de pedidos.",
      },
      {
        n: "03",
        d: "Fornecer dados mais analíticos e feedbacks dinâmicos dos status das solicitações.",
      },
    ],
    quote:
      "O projeto Cashlog foi uma oportunidade de aplicar UX em uma complexidade operacional, onde a interface precisava ser ao mesmo tempo intuitiva para colaboradores operacionais e poderosa o suficiente para suportar as decisões estratégicas de diretores em múltiplas áreas de negócio.",
    researchImgAlt:
      "Imersão com stakeholders Raízen durante o discovery do Cashlog",
    wireframeAlts: [
      "Wireframe — criação de demanda no Cashlog",
      "Wireframe — confirmação da demanda no Cashlog",
      "Wireframe — dashboard de gestão financeira",
      "Wireframe — fila do priorizador de demandas",
      "Wireframe — resumo da demanda de investimento",
    ],
    uiScreenAlts: [
      "UI em alta fidelidade — dashboard de gestão financeira Cashlog",
      "UI em alta fidelidade — tela do priorizador Cashlog",
      "UI em alta fidelidade — criação de demanda Cashlog",
    ],
  },
  en: {
    perfis: [
      { t: "Finance Manager", d: "Financial approval" },
      { t: "Area Manager", d: "Technical approval" },
      { t: "Business Manager", d: "Prospecting and allocation" },
      { t: "Analyst", d: "Data validation" },
      { t: "Prioritizer", d: "Demand queue" },
      { t: "Collaborator", d: "Data entry" },
      { t: "Administrator", d: "System management" },
      { t: "Area Coordinator", d: "Overall planning" },
    ],
    descobertas: [
      "Manual, disconnected process across business areas",
      "No unified prioritization criteria",
      "Lack of visibility into approval status",
      "Duplicate inputs and frequent rework",
    ],
    diretrizes: [
      {
        n: "01",
        d: "Streamline data input to make submitting new demands more efficient.",
      },
      {
        n: "02",
        d: "Optimize new requests through data prediction based on order history.",
      },
      {
        n: "03",
        d: "Provide more analytical data and dynamic feedback on request status.",
      },
    ],
    quote:
      "The Cashlog project was an opportunity to apply UX to operational complexity, where the interface needed to be intuitive for operational staff and powerful enough to support strategic decisions by directors across multiple business areas.",
    researchImgAlt:
      "Immersion with Raízen stakeholders during Cashlog discovery",
    wireframeAlts: [
      "Wireframe — demand creation in Cashlog",
      "Wireframe — demand confirmation in Cashlog",
      "Wireframe — financial management dashboard",
      "Wireframe — demand prioritizer queue",
      "Wireframe — investment demand summary",
    ],
    uiScreenAlts: [
      "High-fidelity UI — Cashlog financial management dashboard",
      "High-fidelity UI — Cashlog prioritizer screen",
      "High-fidelity UI — Cashlog demand creation",
    ],
  },
};

// ---------------------------------------------------------------------------
// caseStudies.ts display strings — Claro
// ---------------------------------------------------------------------------

export type ClaroCaseDataContent = {
  perfis: string[];
  funil: FunilItem[];
  macro: string[];
  comp: string[];
  premissas: string[];
  restricoes: string[];
  riscos: string[];
  regrasP: RuleBar[];
  regrasS: RuleBar[];
  regrasT: RuleBar[];
  resultados: string[];
  metricas: string[];
  quote: string;
  reqImgAlt: string;
  cardAlts: string[];
};

export const claroCaseDataContent: Record<Locale, ClaroCaseDataContent> = {
  pt: {
    perfis: [
      "Gerentes de Produto",
      "Squad Leads",
      "Product Managers",
      "Product Owners",
      "Tech Leads",
      "Lead de CX",
      "Product Designers",
    ],
    funil: [
      { s: "Kick Off", n: 42, d: "Abertura e contexto", w: "100%" },
      { s: "Sessão 1", n: 45, d: "Objetivos e premissas", w: "100%" },
      { s: "Sessão 2", n: 29, d: "Diagrama de Alvo + Zen Voting", w: "64%" },
      { s: "Reunião Final", n: 12, d: "Fechamento do ranking", w: "27%" },
    ],
    macro: [
      "Aparelho",
      "Combo PF",
      "Combo PME",
      "Celular",
      "Fixo",
      "Internet",
      "TV / OTT",
      "Acessórios",
    ],
    comp: ["Vitrine / Carrinho", "Preço", "Regras gerais"],
    premissas: [
      "Distinção visual entre os segmentos PME e PF",
      "Acessibilidade e modularidade para todos os cenários de card",
      "Padronização de taxonomia para CTAs, títulos e subtítulos",
      "No e-commerce, o book de marketing determina todos os atributos do produto",
    ],
    restricoes: [
      "Abordagem mobile first",
      "Máximo de um CTA primário por card",
      "Safe área vertical — card não ultrapassa um scroll",
    ],
    riscos: [
      "Falta de padronização na taxonomia de nomes de planos",
      "Limitação dos sistemas SAP e MIND para contemplar todas as informações",
      "Processo ainda manual; ideal seria automatizado para todos os canais",
      "Necessidade de manter engajamento dos times do discovery até o handoff",
    ],
    regrasP: [
      { t: "Preço", v: 16, pct: "100%" },
      { t: "Características e nome do plano", v: 13, pct: "81%" },
      { t: "CTA assinar / comprar / agendar visita", v: 12, pct: "75%" },
      { t: "CTA ver detalhes", v: 8, pct: "50%" },
      { t: "Apps inclusos no plano", v: 6, pct: "38%" },
      { t: "Cupom de desconto", v: 4, pct: "25%" },
    ],
    regrasS: [
      { t: "Detalhes do plano", v: 7, pct: "44%" },
      { t: "Bônus adicional + serviços adicionais", v: 5, pct: "31%" },
    ],
    regrasT: [
      { t: "Serviços adicionais ao plano", v: 5, pct: "31%" },
      { t: "CTA compra em débito automático / boleto", v: 4, pct: "25%" },
      { t: "Informativo de desconto de/por", v: 4, pct: "25%" },
    ],
    resultados: [
      "Jornadas unificadas nos sites e e-commerce",
      "Aderência aos padrões de marca Claro",
      "Engajamento dos times de negócio e design no uso dos componentes",
      "Adoção por parceiros da Claro em suas comunicações online",
    ],
    metricas: [
      "CSAT",
      "CES",
      "TNPS",
      "Taxa de conversão",
      "Taxa de abandono",
      "Produtividade das equipes",
    ],
    quote:
      "Esse projeto ilustra bem o tipo de trabalho que faço como service designer dentro de um time multidisciplinar: conduzir dinâmicas com grupos numerosos e transformar conhecimento disperso sobre regras de negócio em artefatos de decisão que orientam com clareza as etapas seguintes do processo de design.",
    reqImgAlt:
      "Diagrama de requisitos do card por ordem de disposição, com prioridades primárias, secundárias e terciárias",
    cardAlts: [
      "Card Combo PF — 500 Mega com Globoplay e Pós 50 Giga",
      "Card Combo PF — 500 Mega, R$ 189,90/mês",
      "Card Combo PME — 400 Mega para empresas, R$ 119,90/mês",
      "Card Plano celular — 15GB + 5GB de bônus, plano controle",
      "Card Telefone fixo — Ilimitado Brasil total, R$ 30,90/mês",
      "Card TV — 4K Claro tv+ com Paramount+ e Globoplay",
      "Card Aparelho — Samsung Galaxy A54 5G 256GB",
      "Card Acessório — Apple AirPod, R$ 1.529,90",
    ],
  },
  en: {
    perfis: [
      "Product Leads",
      "Squad Leads",
      "Product Managers",
      "Product Owners",
      "Tech Leads",
      "CX Lead",
      "Product Designers",
    ],
    funil: [
      { s: "Kick Off", n: 42, d: "Opening and context", w: "100%" },
      { s: "Session 1", n: 45, d: "Goals and assumptions", w: "100%" },
      { s: "Session 2", n: 29, d: "Target Diagram + Zen Voting", w: "64%" },
      { s: "Final Meeting", n: 12, d: "Ranking closure", w: "27%" },
    ],
    macro: [
      "Device",
      "Consumer Combo",
      "SMB Combo",
      "Mobile",
      "Landline",
      "Internet",
      "TV / OTT",
      "Accessories",
    ],
    comp: ["Showcase / Cart", "Price", "General rules"],
    premissas: [
      "Visual distinction between SMB and consumer segments",
      "Accessibility and modularity for all card scenarios",
      "Standardized taxonomy for CTAs, titles, and subtitles",
      "In e-commerce, the marketing book defines all product attributes",
    ],
    restricoes: [
      "Mobile-first approach",
      "Maximum of one primary CTA per card",
      "Vertical safe area — card must not exceed one scroll",
    ],
    riscos: [
      "Lack of standardization in plan naming taxonomy",
      "SAP and MIND system limitations for displaying all information",
      "Process still manual; ideally automated across all channels",
      "Need to maintain discovery team engagement through handoff",
    ],
    regrasP: [
      { t: "Price", v: 16, pct: "100%" },
      { t: "Plan features and name", v: 13, pct: "81%" },
      { t: "Subscribe / buy / schedule visit CTA", v: 12, pct: "75%" },
      { t: "View details CTA", v: 8, pct: "50%" },
      { t: "Apps included in plan", v: 6, pct: "38%" },
      { t: "Discount coupon", v: 4, pct: "25%" },
    ],
    regrasS: [
      { t: "Plan details", v: 7, pct: "44%" },
      { t: "Additional bonus + add-on services", v: 5, pct: "31%" },
    ],
    regrasT: [
      { t: "Plan add-on services", v: 5, pct: "31%" },
      { t: "Auto-debit / boleto purchase CTA", v: 4, pct: "25%" },
      { t: "From/to discount label", v: 4, pct: "25%" },
    ],
    resultados: [
      "Unified journeys across websites and e-commerce",
      "Adherence to Claro brand standards",
      "Business and design team engagement with components",
      "Adoption by Claro partners in their online communications",
    ],
    metricas: [
      "CSAT",
      "CES",
      "TNPS",
      "Conversion rate",
      "Abandonment rate",
      "Team productivity",
    ],
    quote:
      "This project illustrates the kind of work I do as a service designer within a multidisciplinary team: facilitating sessions with large groups and turning scattered business rule knowledge into decision artifacts that clearly guide the next stages of the design process.",
    reqImgAlt:
      "Card requirements diagram by display order, with primary, secondary, and tertiary priorities",
    cardAlts: [
      "Consumer Combo card — 500 Mbps with Globoplay and 50 GB postpaid",
      "Consumer Combo card — 500 Mbps, R$ 189.90/month",
      "SMB Combo card — 400 Mbps for businesses, R$ 119.90/month",
      "Mobile plan card — 15GB + 5GB bonus, control plan",
      "Landline card — Unlimited Brazil total, R$ 30.90/month",
      "TV card — 4K Claro tv+ with Paramount+ and Globoplay",
      "Device card — Samsung Galaxy A54 5G 256GB",
      "Accessory card — Apple AirPod, R$ 1,529.90",
    ],
  },
};

// ---------------------------------------------------------------------------
// caseStudies.ts display strings — A/B tests
// ---------------------------------------------------------------------------

export type AbtestCaseDataContent = {
  closingQuote: string;
  tests: Omit<AbTestBlock, "image" | "imageFirst">[];
};

export const abtestCaseDataContent: Record<Locale, AbtestCaseDataContent> = {
  pt: {
    closingQuote:
      "Design que se prova no número: cada decisão de interface amarrada a uma hipótese e a uma métrica de negócio.",
    tests: [
      {
        label: "Teste 01 · Hub Claro TV+",
        title:
          "Hipótese: um novo Hub de Claro TV+ gera mais conversão de pedido e engajamento.",
        duration: "30 dias",
        device: "Desktop e mobile",
        metric: "Conclusão de pedido com TV",
        result: "+19%",
        resultLabel: "no número de pedidos com TV",
        imageAlt:
          "Split test do Hub Claro TV+ — original x variante, resultado +19% em pedidos com TV",
      },
      {
        label: "Teste 02 · Página de Atendimento",
        title:
          "Hipótese: uma nova página de Atendimento, criada com base em CSAT e testes A/B, gera mais engajamento.",
        duration: "42 dias",
        device: "Desktop e mobile",
        metric: "Interação com a página",
        result: "+38%",
        resultLabel: "de interação com cards e shortcuts",
        imageAlt:
          "Split test da página de Atendimento da Claro — resultado +38% de interação com cards e shortcuts",
      },
    ],
  },
  en: {
    closingQuote:
      "Design proven by the numbers: every interface decision tied to a hypothesis and a business metric.",
    tests: [
      {
        label: "Test 01 · Claro TV+ Hub",
        title:
          "Hypothesis: a new Claro TV+ Hub drives more order conversion and engagement.",
        duration: "30 days",
        device: "Desktop and mobile",
        metric: "TV order completion",
        result: "+19%",
        resultLabel: "in TV order volume",
        imageAlt:
          "Claro TV+ Hub split test — original vs. variant, +19% result in TV orders",
      },
      {
        label: "Test 02 · Support Page",
        title:
          "Hypothesis: a new Support page, built on CSAT insights and A/B tests, drives more engagement.",
        duration: "42 days",
        device: "Desktop and mobile",
        metric: "Page interaction",
        result: "+38%",
        resultLabel: "interaction with cards and shortcuts",
        imageAlt:
          "Claro Support page split test — +38% interaction with cards and shortcuts",
      },
    ],
  },
};

// ---------------------------------------------------------------------------
// caseStudies.ts display strings — e-Título
// ---------------------------------------------------------------------------

export type EtituloCaseDataContent = {
  overviewImgAlt: string;
  impacto: Impacto[];
  fases: Fase[];
  personas: Persona[];
  pains: Pain[];
  steps: StepItem[];
  oportunidades: Oportunidade[];
};

export const etituloCaseDataContent: Record<Locale, EtituloCaseDataContent> = {
  pt: {
    overviewImgAlt:
      "Capa do case e-Título — TSE · Service Design e redesenho da jornada de onboarding",
    impacto: [
      {
        n: "01",
        t: "Decisões de roadmap mais orientadas à experiência do cidadão",
      },
      {
        n: "02",
        t: "Redução de erros, retrabalho e pressão sobre canais de suporte",
      },
      {
        n: "03",
        t: "Aumento da confiança institucional no serviço digital",
      },
      {
        n: "04",
        t: "Evolução do e-Título como plataforma central da cidadania digital",
      },
    ],
    fases: [
      {
        n: "01",
        t: "Discovery",
        d: "Entender o problema de forma sistêmica, a partir de dados, pessoas e concorrência.",
        m: [
          "Análise competitiva",
          "Pesquisa",
          "Análise Heurística",
          "Comunicação comparada",
        ],
      },
      {
        n: "02",
        t: "Definição",
        d: "Transformar achados dispersos em insights acionáveis para tomada de decisão.",
        m: ["Jornada As-Is", "Personas", "Insights-chave"],
      },
      {
        n: "03",
        t: "Ideação",
        d: "Co-criar a nova jornada com o time multidisciplinar e a Justiça Eleitoral.",
        m: ["Workshops", "Jornada To-Be", "UI Design"],
      },
      {
        n: "04",
        t: "Validação",
        d: "Confrontar as hipóteses com eleitores reais e priorizar melhorias contínuas.",
        m: ["Testes de usabilidade", "Árvores de Oportunidades"],
      },
    ],
    personas: [
      {
        nome: "Antonio Fagundes",
        meta: "75 anos · Aposentado",
        tags: ["Baixa afinidade digital", "Autonomia"],
        mot: "Busca praticidade para resolver pendências eleitorais sem se deslocar até um cartório ou zona eleitoral.",
        obj: "Garantir que consiga realizar tarefas eleitorais sem depender de outras pessoas.",
        imgAlt:
          "Persona Antonio Fagundes — eleitor idoso com baixa afinidade digital",
      },
      {
        nome: "Augusto dos Anjos",
        meta: "58 anos · Deficiência visual",
        tags: ["Mangá", "Artes plásticas", "Leitor de tela"],
        mot: "A ideia de ter um título digital facilita a vida, principalmente quando não quer carregar o título físico.",
        obj: "Usar o e-Título como alternativa acessível ao processo presencial, com funcionalidades adaptadas.",
        imgAlt:
          "Persona Augusto dos Anjos — eleitor com deficiência visual e leitor de tela",
      },
      {
        nome: "Clara Nunes",
        meta: "27 anos · Nativa digital",
        tags: ["Eficiência", "Mobile-first"],
        mot: "Gosta de soluções digitais e eficientes que se integrem bem ao seu cotidiano.",
        obj: "Resolver questões eleitorais digitalmente, sem sair de casa ou enfrentar filas.",
        imgAlt:
          "Persona Clara Nunes — eleitora nativa digital e mobile-first",
      },
    ],
    pains: [
      {
        n: "01",
        t: "Descoberta",
        d: "Dúvidas sobre segurança, confiabilidade e facilidade de uso já na primeira abertura.",
      },
      {
        n: "02",
        t: "Aceite de termos",
        d: "Falta de explicação sobre a necessidade dos aceites regulatórios e de notificações.",
      },
      {
        n: "03",
        t: "Permissões",
        d: "Pedidos de permissão sem contexto geram desconfiança no eleitor.",
      },
      {
        n: "04",
        t: "Cadastro",
        d: "Erros ao digitar os dados e falta de clareza sobre a obrigatoriedade dos campos.",
      },
      {
        n: "05",
        t: "Validação facial",
        d: "Dificuldade na validação biométrica, sobretudo para idosos e menos familiarizados com tecnologia.",
      },
      {
        n: "06",
        t: "Home logada",
        d: "A home não dá prévia das funções; dificuldade de encontrar recursos como a justificativa de ausência.",
      },
    ],
    steps: [
      {
        n: "01",
        t: "Home splash",
        d: "Carrossel explicativo com CTAs de acesso e modal de permissão para notificações.",
      },
      {
        n: "02",
        t: "Personalização",
        d: "Ajusta acessibilidade — contraste e leitor de tela — e configura navegação assistida.",
      },
      {
        n: "03",
        t: "Aceite de termos",
        d: "Lê sobre as funcionalidades e acessa os termos via hiperlinks antes de aceitar.",
      },
      {
        n: "04",
        t: "Dados pessoais",
        d: "Orientações sobre o preenchimento obrigatório e inserção dos dados do cadastro eleitoral.",
      },
      {
        n: "05",
        t: "Validação do dispositivo",
        d: "Explicações sobre a confirmação de identidade enquanto o dispositivo é validado.",
      },
      {
        n: "06",
        t: "Questionário",
        d: "Responde três perguntas pessoais para confirmação de identidade, sem reiniciar o fluxo se errar.",
      },
      {
        n: "07",
        t: "Dicas para selfie",
        d: "Explicações sobre a prova de vida via selfie em vídeo, com acesso à câmera.",
      },
      {
        n: "08",
        t: "Ativação biométrica",
        d: "Validação biométrica por reconhecimento facial; após confirmada, avança.",
      },
      {
        n: "09",
        t: "Cadastro de senha",
        d: "Define e confirma a senha, escolhe permitir ou não a autenticação biométrica.",
      },
      {
        n: "10",
        t: "Preferências",
        d: "Escolhe notificações e preferências de uso e informativos da Justiça Eleitoral.",
      },
      {
        n: "11",
        t: "Conclusão",
        d: "Mensagem de cadastro concluído; escolhe entre tour guiado ou acessar a home.",
      },
      {
        n: "12",
        t: "Home logada",
        d: "Visualização do título, biometria, onde votar, justificativa, perfil e menu de serviços.",
      },
    ],
    oportunidades: [
      {
        n: "01",
        tag: "Impacto rápido",
        t: "Aceites com contexto",
        d: "Explicações claras e contextuais sobre a necessidade e a utilidade dos aceites regulatórios e de notificações.",
      },
      {
        n: "02",
        tag: "Impacto rápido",
        t: "Transparência de limitações",
        d: "Deixar claro quais limitações o eleitor sem biometria cadastrada enfrentará, antes que a ação ocorra.",
      },
      {
        n: "03",
        tag: "Estrutural",
        t: "Acessibilidade por padrão",
        d: "Incorporar configurações de acessibilidade desde o primeiro toque, com múltiplos métodos de validação.",
      },
      {
        n: "04",
        tag: "Governança",
        t: "Árvores de Oportunidades",
        d: "Estruturar uma prática de melhoria contínua, conectando dores mapeadas a oportunidades priorizadas.",
      },
    ],
  },
  en: {
    overviewImgAlt:
      "e-Título case cover — TSE · Service Design and onboarding journey redesign",
    impacto: [
      {
        n: "01",
        t: "Roadmap decisions more aligned with citizen experience",
      },
      {
        n: "02",
        t: "Reduced errors, rework, and pressure on support channels",
      },
      {
        n: "03",
        t: "Increased institutional trust in the digital service",
      },
      {
        n: "04",
        t: "Evolution of e-Título as a central platform for digital citizenship",
      },
    ],
    fases: [
      {
        n: "01",
        t: "Discovery",
        d: "Understand the problem systemically through data, people, and competition.",
        m: [
          "Competitive analysis",
          "Research",
          "Heuristic evaluation",
          "Comparative communication review",
        ],
      },
      {
        n: "02",
        t: "Definition",
        d: "Turn scattered findings into actionable insights for decision-making.",
        m: ["As-Is Journey", "Personas", "Key insights"],
      },
      {
        n: "03",
        t: "Ideation",
        d: "Co-create the new journey with the multidisciplinary team and the Electoral Justice.",
        m: ["Workshops", "To-Be Journey", "UI Design"],
      },
      {
        n: "04",
        t: "Validation",
        d: "Test hypotheses with real voters and prioritize continuous improvements.",
        m: ["Usability testing", "Opportunity Trees"],
      },
    ],
    personas: [
      {
        nome: "Antonio Fagundes",
        meta: "75 years old · Retired",
        tags: ["Low digital affinity", "Autonomy"],
        mot: "Seeks convenience to resolve electoral tasks without traveling to a registry office or polling station.",
        obj: "Ensure he can complete electoral tasks without relying on others.",
        imgAlt:
          "Persona Antonio Fagundes — older voter with low digital affinity",
      },
      {
        nome: "Augusto dos Anjos",
        meta: "58 years old · Visual impairment",
        tags: ["Manga", "Fine arts", "Screen reader"],
        mot: "Having a digital voter ID makes life easier, especially when he prefers not to carry the physical card.",
        obj: "Use e-Título as an accessible alternative to the in-person process, with adapted features.",
        imgAlt:
          "Persona Augusto dos Anjos — voter with visual impairment using a screen reader",
      },
      {
        nome: "Clara Nunes",
        meta: "27 years old · Digital native",
        tags: ["Efficiency", "Mobile-first"],
        mot: "Prefers digital, efficient solutions that fit seamlessly into daily life.",
        obj: "Resolve electoral matters digitally, without leaving home or waiting in line.",
        imgAlt: "Persona Clara Nunes — digital-native, mobile-first voter",
      },
    ],
    pains: [
      {
        n: "01",
        t: "Discovery",
        d: "Questions about security, reliability, and ease of use from the very first launch.",
      },
      {
        n: "02",
        t: "Terms acceptance",
        d: "No explanation of why regulatory and notification consents are required.",
      },
      {
        n: "03",
        t: "Permissions",
        d: "Permission requests without context erode voter trust.",
      },
      {
        n: "04",
        t: "Registration",
        d: "Data entry errors and unclear guidance on which fields are mandatory.",
      },
      {
        n: "05",
        t: "Facial validation",
        d: "Difficulty with biometric validation, especially for older voters and those less familiar with technology.",
      },
      {
        n: "06",
        t: "Logged-in home",
        d: "The home screen doesn't preview available features; hard to find resources like absence justification.",
      },
    ],
    steps: [
      {
        n: "01",
        t: "Splash home",
        d: "Explanatory carousel with access CTAs and a notification permission modal.",
      },
      {
        n: "02",
        t: "Personalization",
        d: "Adjust accessibility — contrast and screen reader — and configure assisted navigation.",
      },
      {
        n: "03",
        t: "Terms acceptance",
        d: "Read about features and access terms via hyperlinks before accepting.",
      },
      {
        n: "04",
        t: "Personal data",
        d: "Guidance on required fields and entry of voter registration data.",
      },
      {
        n: "05",
        t: "Device validation",
        d: "Explanations about identity confirmation while the device is being validated.",
      },
      {
        n: "06",
        t: "Questionnaire",
        d: "Answer three personal questions for identity confirmation without restarting the flow on error.",
      },
      {
        n: "07",
        t: "Selfie tips",
        d: "Guidance on video selfie liveness proof, with camera access.",
      },
      {
        n: "08",
        t: "Biometric activation",
        d: "Biometric validation via facial recognition; proceeds once confirmed.",
      },
      {
        n: "09",
        t: "Password setup",
        d: "Set and confirm password; choose whether to allow biometric authentication.",
      },
      {
        n: "10",
        t: "Preferences",
        d: "Choose notifications, usage preferences, and Electoral Justice updates.",
      },
      {
        n: "11",
        t: "Completion",
        d: "Registration complete message; choose between a guided tour or accessing the home screen.",
      },
      {
        n: "12",
        t: "Logged-in home",
        d: "View voter ID, biometrics, polling place, absence justification, profile, and services menu.",
      },
    ],
    oportunidades: [
      {
        n: "01",
        tag: "Quick impact",
        t: "Consents with context",
        d: "Clear, contextual explanations of why regulatory and notification consents are needed and how they help.",
      },
      {
        n: "02",
        tag: "Quick impact",
        t: "Limitation transparency",
        d: "Make clear what limitations voters without registered biometrics will face before they take action.",
      },
      {
        n: "03",
        tag: "Structural",
        t: "Accessibility by default",
        d: "Build accessibility settings in from the first touch, with multiple identity validation methods.",
      },
      {
        n: "04",
        tag: "Governance",
        t: "Opportunity Trees",
        d: "Establish a continuous improvement practice, connecting mapped pain points to prioritized opportunities.",
      },
    ],
  },
};

// ---------------------------------------------------------------------------
// Page body content — CashlogPage.tsx
// ---------------------------------------------------------------------------

export type CashlogPageContent = {
  sections: {
    s01: {
      kicker: string;
      title: string;
      body: string;
      stats: { label: string; value: string }[];
    };
    s02: {
      kicker: string;
      title: string;
      body: string;
      profilesLabel: string;
    };
    s03: {
      kicker: string;
      title: string;
      body: string;
      discoveriesLabel: string;
    };
    s04: {
      kicker: string;
      title: string;
      body: string;
      wireframesLabel: string;
    };
    s05: {
      kicker: string;
      title: string;
      body: string;
      paletteLabel: string;
      uiScreensLabel: string;
    };
  };
};

export const cashlogPageContent: Record<Locale, CashlogPageContent> = {
  pt: {
    sections: {
      s01: {
        kicker: "Contexto · Kick off",
        title: "O Desafio Raízen",
        body: "A Raízen necessitava de uma solução eficiente para a aprovação de demandas de linhas de investimento abrangendo diversas áreas de atuação: Varejo, Aviação, LD&T e B2B. A resposta foi a criação do Cashlog, uma interface que utiliza machine learning para otimizar a tomada de decisões — acessada por 8 perfis, de operadores a diretores, com painel administrativo para gestão das configurações.",
        stats: [
          { label: "Áreas", value: "Varejo · Aviação · LD&T · B2B" },
          { label: "Perfis", value: "8 tipos de usuários" },
          { label: "Diferencial", value: "Machine learning integrado" },
        ],
      },
      s02: {
        kicker: "Discovery · 15 entrevistas",
        title: "Pesquisa e Imersão",
        body: "Realizei pesquisas qualitativas com 15 profissionais representando os diferentes perfis de usuários da plataforma. As entrevistas e sessões de observação nos ajudaram a entender profundamente suas necessidades, frustrações e expectativas no fluxo atual de aprovação de demandas.",
        profilesLabel: "8 perfis de usuários identificados",
      },
      s03: {
        kicker: "Discovery · Definição",
        title: "Definição e Síntese",
        body: "Com base nos insights coletados, redefinimos o escopo inicial do projeto, identificando claramente os problemas a resolver. O mapeamento de fluxos revelou gargalos críticos na comunicação entre as áreas de Varejo e Aviação, o que nos permitiu unificar os critérios de priorização no algoritmo de machine learning.",
        discoveriesLabel: "Principais descobertas",
      },
      s04: {
        kicker: "Delivery · Ideação",
        title: "Ideação e Co-criação",
        body: "Sessões de brainstorming, design sprint e co-criação com a equipe técnica e de produto da Raízen resultaram em três diretrizes centrais de design, além de um userflow completo — do login à aprovação de demanda (PEP).",
        wireframesLabel: "Wireframes do fluxo",
      },
      s05: {
        kicker: "Delivery · Prototipação",
        title: "Prototipação de Alta Fidelidade",
        body: "Fluxos em alta fidelidade, sistema de design e handoff. O dashboard reúne indicadores de solicitações em aprovação, holding e aprovadas, gráficos de dispêndio x plano e a rede de colaboradores — dando visibilidade completa do pipeline de investimento.",
        paletteLabel: "Paleta do produto",
        uiScreensLabel: "Telas em alta fidelidade",
      },
    },
  },
  en: {
    sections: {
      s01: {
        kicker: "Context · Kick off",
        title: "The Raízen Challenge",
        body: "Raízen needed an efficient solution for approving investment line demands across multiple business areas: Retail, Aviation, LD&T, and B2B. The answer was Cashlog — an interface that uses machine learning to optimize decision-making, accessed by 8 profiles from operators to directors, with an admin panel for configuration management.",
        stats: [
          { label: "Areas", value: "Retail · Aviation · LD&T · B2B" },
          { label: "Profiles", value: "8 user types" },
          { label: "Differentiator", value: "Integrated machine learning" },
        ],
      },
      s02: {
        kicker: "Discovery · 15 interviews",
        title: "Research and Immersion",
        body: "I conducted qualitative research with 15 professionals representing the platform's different user profiles. Interviews and observation sessions helped us deeply understand their needs, frustrations, and expectations in the current demand approval flow.",
        profilesLabel: "8 user profiles identified",
      },
      s03: {
        kicker: "Discovery · Definition",
        title: "Definition and Synthesis",
        body: "Based on the insights gathered, we redefined the project's initial scope, clearly identifying the problems to solve. Flow mapping revealed critical bottlenecks in communication between Retail and Aviation, allowing us to unify prioritization criteria in the machine learning algorithm.",
        discoveriesLabel: "Key findings",
      },
      s04: {
        kicker: "Delivery · Ideation",
        title: "Ideation and Co-creation",
        body: "Brainstorming sessions, design sprints, and co-creation with Raízen's technical and product teams resulted in three core design principles, plus a complete user flow — from login to demand approval (PEP).",
        wireframesLabel: "Flow wireframes",
      },
      s05: {
        kicker: "Delivery · Prototyping",
        title: "High-Fidelity Prototyping",
        body: "High-fidelity flows, design system, and handoff. The dashboard brings together indicators for requests in approval, on hold, and approved, spend vs. plan charts, and the collaborator network — providing full visibility into the investment pipeline.",
        paletteLabel: "Product palette",
        uiScreensLabel: "High-fidelity screens",
      },
    },
  },
};

// ---------------------------------------------------------------------------
// Page body content — ClaroPage.tsx
// ---------------------------------------------------------------------------

export type ClaroPageContent = {
  sections: {
    s01: {
      kicker: string;
      title: string;
      body: string;
      funilLabel: string;
    };
    s02: {
      kicker: string;
      title: string;
      body: string;
      macroLabel: string;
      compLabel: string;
    };
    s03: {
      kicker: string;
      title: string;
      groupTitles: { premissas: string; restricoes: string; riscos: string };
    };
    s04: {
      kicker: string;
      title: string;
      body: string;
      regrasLabels: { primary: string; secondary: string; tertiary: string };
    };
    s05: {
      kicker: string;
      title: string;
      productGoalLabel: string;
      productGoal: string;
      expectedResultsLabel: string;
      validationMetricsLabel: string;
    };
    s06: {
      kicker: string;
      title: string;
      body: string;
      jointWorkTitle: string;
      jointWorkBody: string;
      cardsReadyBody: string;
      cardArchLabel: string;
      finalSetLabel: string;
    };
  };
};

export const claroPageContent: Record<Locale, ClaroPageContent> = {
  pt: {
    sections: {
      s01: {
        kicker: "Kick Off · 42 pessoas",
        title: "Contexto e alinhamento inicial",
        body: "Os especialistas trouxeram o contexto e o histórico da iniciativa — resultados de testes, validações de POC e hipóteses de uso já levantadas — para que todos chegassem às sessões seguintes com o mesmo nível de entendimento.",
        funilLabel: "Funil de participação",
      },
      s02: {
        kicker: "Sessão 1 · 45 participantes",
        title: "Objetivos e cenários de uso",
        body: "O time descreveu os objetivos e cenários dos cards a serem criados. Essa etapa gerou oito macro cenários e três cenários complementares que estruturaram todo o escopo do projeto.",
        macroLabel: "8 macro cenários",
        compLabel: "3 cenários complementares",
      },
      s03: {
        kicker: "Sessão 2 · 29 participantes",
        title: "Premissas, restrições e riscos",
        groupTitles: {
          premissas: "Premissas",
          restricoes: "Restrições",
          riscos: "Riscos",
        },
      },
      s04: {
        kicker: "Sessão 2 · Zen Voting",
        title: "Diagrama de Alvo",
        body: "O time escreveu em post-its as regras de negócio que deveriam compor os novos cards e as posicionou no diagrama, categorizando-as como prioritárias, secundárias ou terciárias. A votação gerou uma hierarquia clara de regras de negócio.",
        regrasLabels: {
          primary: "Regras primárias",
          secondary: "Regras secundárias",
          tertiary: "Regras terciárias",
        },
      },
      s05: {
        kicker: "Reunião final · 12 participantes",
        title: "MVP Canvas",
        productGoalLabel: "Objetivo do produto",
        productGoal:
          "Padronizar todos os cards de venda presentes nas jornadas de sites e e-commerce e reformular a arquitetura de informação em busca de consistência visual, contemplando todas as personas e dispositivos com prioridade mobile first.",
        expectedResultsLabel: "Resultados esperados",
        validationMetricsLabel: "Métricas de validação",
      },
      s06: {
        kicker: "Depois do discovery",
        title: "Co-criação com a esteira de e-commerce",
        body: "Concluída a definição das regras de negócio, avançamos para reuniões de co-criação com designers e contents da esteira de e-commerce da Claro. Foi nesse trabalho conjunto, traduzindo a priorização e a arquitetura de informação em decisões de layout, que chegamos ao resultado final dos cards.",
        jointWorkTitle: "Trabalho conjunto",
        jointWorkBody:
          "Designers da esteira de e-commerce e o time de DesignOps definindo, em conjunto, o formato final do componente.",
        cardsReadyBody:
          "cenários de card prontos para produção, do desenho ao desenvolvimento.",
        cardArchLabel:
          "Arquitetura do card · requisitos por ordem de disposição",
        finalSetLabel:
          "Conjunto final · 8 cards, do desenho ao desenvolvimento",
      },
    },
  },
  en: {
    sections: {
      s01: {
        kicker: "Kick Off · 42 people",
        title: "Context and initial alignment",
        body: "Specialists brought the initiative's context and history — test results, POC validations, and usage hypotheses already mapped — so everyone entered the following sessions with the same level of understanding.",
        funilLabel: "Participation funnel",
      },
      s02: {
        kicker: "Session 1 · 45 participants",
        title: "Goals and use scenarios",
        body: "The team described the goals and scenarios for the cards to be created. This stage produced eight macro scenarios and three complementary scenarios that structured the entire project scope.",
        macroLabel: "8 macro scenarios",
        compLabel: "3 complementary scenarios",
      },
      s03: {
        kicker: "Session 2 · 29 participants",
        title: "Assumptions, constraints, and risks",
        groupTitles: {
          premissas: "Assumptions",
          restricoes: "Constraints",
          riscos: "Risks",
        },
      },
      s04: {
        kicker: "Session 2 · Zen Voting",
        title: "Target Diagram",
        body: "The team wrote business rules for the new cards on post-its and placed them on the diagram, categorizing them as primary, secondary, or tertiary. Voting produced a clear hierarchy of business rules.",
        regrasLabels: {
          primary: "Primary rules",
          secondary: "Secondary rules",
          tertiary: "Tertiary rules",
        },
      },
      s05: {
        kicker: "Final meeting · 12 participants",
        title: "MVP Canvas",
        productGoalLabel: "Product goal",
        productGoal:
          "Standardize all sales cards across website and e-commerce journeys and redesign the information architecture for visual consistency, covering all personas and devices with a mobile-first priority.",
        expectedResultsLabel: "Expected outcomes",
        validationMetricsLabel: "Validation metrics",
      },
      s06: {
        kicker: "After discovery",
        title: "Co-creation with the e-commerce pipeline",
        body: "Once business rules were defined, we moved to co-creation sessions with designers and content specialists on Claro's e-commerce pipeline. It was through this joint work — translating prioritization and information architecture into layout decisions — that we reached the final card outcome.",
        jointWorkTitle: "Joint work",
        jointWorkBody:
          "E-commerce pipeline designers and the DesignOps team jointly defining the component's final format.",
        cardsReadyBody:
          "card scenarios ready for production, from design to development.",
        cardArchLabel: "Card architecture · requirements by display order",
        finalSetLabel: "Final set · 8 cards, from design to development",
      },
    },
  },
};

// ---------------------------------------------------------------------------
// Page body content — AbtestPage.tsx
// ---------------------------------------------------------------------------

export type AbtestPageContent = {
  testDetailLabels: { duration: string; device: string; metric: string };
};

export const abtestPageContent: Record<Locale, AbtestPageContent> = {
  pt: {
    testDetailLabels: { duration: "Duração", device: "Dispositivo", metric: "Métrica" },
  },
  en: {
    testDetailLabels: { duration: "Duration", device: "Device", metric: "Metric" },
  },
};

// ---------------------------------------------------------------------------
// Page body content — EtituloPage.tsx
// ---------------------------------------------------------------------------

export type EtituloPageContent = {
  sections: {
    s01: {
      label: string;
      title: string;
      body: string;
      metaLabels: MetaItem[];
      impactLabel: string;
    };
    s02: {
      label: string;
      title: string;
      problemLabel: string;
      problemText: string;
      objectiveLabel: string;
      objectiveText: string;
      proposalLabel: string;
      proposalText: string;
      whoFeelsLabel: string;
      whoFeelsQuote: string;
    };
    s03: {
      label: string;
      title: string;
    };
    s04: {
      label: string;
      title: string;
      intro: string;
      motivationLabel: string;
      objectiveLabel: string;
    };
    s05: {
      label: string;
      quote: string;
      quoteAccent: string;
      quoteEnd: string;
      body: string;
    };
    s06: {
      label: string;
      title: string;
    };
    s07: {
      label: string;
      title: string;
      intro: string;
    };
    s08: {
      label: string;
      title: string;
      intro: string;
    };
    closing: {
      kicker: string;
      titleBefore: string;
      titleAccent: string;
    };
  };
};

export const etituloPageContent: Record<Locale, EtituloPageContent> = {
  pt: {
    sections: {
      s01: {
        label: "01 / 08 · Visão geral",
        title: "Um serviço tratado como ecossistema, não apenas como interface",
        body: "Atuei como Service Designer responsável pela condução estratégica do projeto, liderando a frente de experiência e articulando um time multidisciplinar, com apoio das disciplinas de UX, Consumer Insights e Comunicação para garantir uma leitura sistêmica da jornada.",
        metaLabels: [
          { k: "Papel", v: "Lead Service Designer" },
          { k: "Contexto", v: "Hitss / Claro Brasil" },
          { k: "Cliente", v: "Tribunal Superior Eleitoral" },
          { k: "Período", v: "2026" },
        ],
        impactLabel: "Impacto estratégico",
      },
      s02: {
        label: "02 / 08 · Entendendo o problema",
        title: "Definição do desafio",
        problemLabel: "Problema",
        problemText:
          "Os problemas não estavam em uma funcionalidade isolada, mas na transição entre etapas, na falta de previsibilidade, na ausência de feedback claro e na dependência excessiva da memória e da compreensão do usuário.",
        objectiveLabel: "Objetivo",
        objectiveText:
          "Redesenhar uma nova jornada de onboarding para o e-Título com acessibilidade como foco central. Mais do que adaptar um fluxo existente, repensar a forma como os eleitores acessam o app, com experiência fluida e inclusiva desde o primeiro toque na tela.",
        proposalLabel: "Proposta",
        proposalText:
          "Criar uma nova jornada de onboarding (To Be) baseada em pesquisa, benchmarking e testes com usuários, incorporando configurações de acessibilidade desde o início, múltiplos métodos de validação de identidade, feedbacks mais claros e uma estrutura de melhoria contínua por meio de Árvores de Oportunidades.",
        whoFeelsLabel: "Quem mais sente",
        whoFeelsQuote:
          "Essas dores afetam de forma mais intensa idosos, pessoas com necessidades especiais e eleitores em situação de urgência nos dias de eleição.",
      },
      s03: {
        label: "03 / 08 · Abordagem do Service Design",
        title: "Quatro fases, uma leitura de ponta a ponta",
      },
      s04: {
        label: "04 / 08 · Personas",
        title: "Para quem estamos projetando",
        intro:
          "Três perfis que sintetizam motivações, contextos e barreiras distintas diante da Justiça Eleitoral digital.",
        motivationLabel: "Motivação",
        objectiveLabel: "Objetivo",
      },
      s05: {
        label: "05 / 08 · Insight-chave",
        quote: "O serviço exigia que o eleitor fosse ",
        quoteAccent: "resiliente",
        quoteEnd: ", quando deveria protegê-lo.",
        body: "A síntese da jornada revelou que os problemas não estavam em uma funcionalidade isolada, mas distribuídos por todo o ecossistema do serviço — do onboarding ao uso recorrente, dos players concorrentes ao suporte e aos processos internos de governança.",
      },
      s06: {
        label: "06 / 08 · Principais dores identificadas",
        title: "Onde a jornada As-Is quebrava",
      },
      s07: {
        label: "07 / 08 · Jornada To Be",
        title: "Um novo onboarding, acessível por padrão",
        intro:
          "Nova jornada de onboarding projetada para acessibilidade, segurança e inclusão digital na Justiça Eleitoral — em 12 etapas.",
      },
      s08: {
        label: "08 / 08 · Melhoria contínua",
        title: "Oportunidades de evolução do serviço",
        intro:
          "A partir das dores e insights, emergiram oportunidades claras — organizadas por horizonte de impacto para orientar o roadmap.",
      },
      closing: {
        kicker: "Novo onboarding e-Título · TSE",
        titleBefore: "Uma jornada projetada para simplificar a ",
        titleAccent: "cidadania digital.",
      },
    },
  },
  en: {
    sections: {
      s01: {
        label: "01 / 08 · Overview",
        title: "A service treated as an ecosystem, not just an interface",
        body: "I served as Lead Service Designer, steering the project's strategic direction, leading the experience workstream, and coordinating a multidisciplinary team — with support from UX, Consumer Insights, and Communications to ensure a systemic reading of the journey.",
        metaLabels: [
          { k: "Role", v: "Lead Service Designer" },
          { k: "Context", v: "Hitss / Claro Brasil" },
          { k: "Client", v: "Superior Electoral Court (TSE)" },
          { k: "Period", v: "2026" },
        ],
        impactLabel: "Strategic impact",
      },
      s02: {
        label: "02 / 08 · Understanding the problem",
        title: "Challenge definition",
        problemLabel: "Problem",
        problemText:
          "The problems weren't in an isolated feature, but in transitions between steps, lack of predictability, absence of clear feedback, and excessive reliance on the user's memory and understanding.",
        objectiveLabel: "Objective",
        objectiveText:
          "Redesign a new onboarding journey for e-Título with accessibility as the central focus. More than adapting an existing flow, rethink how voters access the app — with a fluid, inclusive experience from the very first touch.",
        proposalLabel: "Proposal",
        proposalText:
          "Create a new onboarding journey (To Be) based on research, benchmarking, and user testing — incorporating accessibility settings from the start, multiple identity validation methods, clearer feedback, and a continuous improvement structure through Opportunity Trees.",
        whoFeelsLabel: "Who feels it most",
        whoFeelsQuote:
          "These pain points affect older adults, people with special needs, and voters in urgent situations on election days most intensely.",
      },
      s03: {
        label: "03 / 08 · Service Design approach",
        title: "Four phases, one end-to-end view",
      },
      s04: {
        label: "04 / 08 · Personas",
        title: "Who we're designing for",
        intro:
          "Three profiles that synthesize distinct motivations, contexts, and barriers when facing digital Electoral Justice.",
        motivationLabel: "Motivation",
        objectiveLabel: "Objective",
      },
      s05: {
        label: "05 / 08 · Key insight",
        quote: "The service required voters to be ",
        quoteAccent: "resilient",
        quoteEnd: ", when it should have protected them.",
        body: "Journey synthesis revealed that problems weren't in an isolated feature, but distributed across the entire service ecosystem — from onboarding to recurring use, from competing players to support and internal governance processes.",
      },
      s06: {
        label: "06 / 08 · Key pain points identified",
        title: "Where the As-Is journey broke",
      },
      s07: {
        label: "07 / 08 · To-Be journey",
        title: "A new onboarding, accessible by default",
        intro:
          "New onboarding journey designed for accessibility, security, and digital inclusion in Electoral Justice — in 12 steps.",
      },
      s08: {
        label: "08 / 08 · Continuous improvement",
        title: "Service evolution opportunities",
        intro:
          "From pain points and insights, clear opportunities emerged — organized by impact horizon to guide the roadmap.",
      },
      closing: {
        kicker: "New e-Título onboarding · TSE",
        titleBefore: "A journey designed to simplify ",
        titleAccent: "digital citizenship.",
      },
    },
  },
};
