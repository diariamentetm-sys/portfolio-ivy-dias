import type {
  CasePreview,
  CaseStudyConfig,
  Specialty,
  Step,
  Testimonial,
  TimelineItem,
} from "../types/portfolio";
import { claroData, etituloData } from "./caseStudies";

export const navLinks = [
  { href: "#sobre", label: "Sobre" },
  { href: "#especialidades", label: "Especialidades" },
  { href: "#trabalhos", label: "Trabalhos" },
  { href: "#depoimentos", label: "Depoimentos" },
  { href: "#trajetoria", label: "Trajetória" },
  { href: "#contato", label: "Contato" },
] as const;

export const specialties: Specialty[] = [
  {
    num: "01",
    title: "CX Strategy & Service Design",
    desc: "Desenho o serviço inteiro, não só a tela: conecto pontos de contato, backstage e negócio numa jornada coerente.",
  },
  {
    num: "02",
    title: "User Research",
    desc: "Transformo escuta e evidência em decisões de design — do campo à síntese acionável.",
  },
  {
    num: "03",
    title: "Jornadas & mapeamento de serviços",
    desc: "Mapeio o as-is, exponho onde a experiência quebra e desenho o to-be com clareza.",
  },
  {
    num: "04",
    title: "Design de interface (UX/UI)",
    desc: "Interfaces intuitivas para quem opera e robustas para quem decide.",
  },
  {
    num: "05",
    title: "Facilitação de workshops",
    desc: "Conduzo Design Sprints e Lean Inceptions que alinham times numerosos em torno de decisões claras.",
  },
  {
    num: "06",
    title: "Liderança técnica & squads de design",
    desc: "Lidero squads com direção, consistência e cuidado com as pessoas do time.",
  },
];

export const specialtyPostItStyles = [
  { tone: "post-it-yellow", rotate: "-rotate-2", offset: "md:mt-5" },
  { tone: "post-it-blue", rotate: "rotate-3", offset: "md:-mt-2" },
  { tone: "post-it-coral", rotate: "-rotate-1", offset: "md:mt-10" },
  { tone: "post-it-mint", rotate: "rotate-2", offset: "md:mt-2" },
  { tone: "post-it-lavender", rotate: "-rotate-3", offset: "md:mt-7" },
  { tone: "post-it-peach", rotate: "rotate-1", offset: "md:-mt-1" },
] as const;

export const heroPostItTags = [
  { label: "CX Strategy", tone: "post-it-yellow", rotate: "-rotate-2" },
  { label: "Service Design", tone: "post-it-blue", rotate: "rotate-2" },
  { label: "User Research", tone: "post-it-coral", rotate: "-rotate-1" },
] as const;

export const heroStatPostIts = [
  {
    value: "20+",
    label: "anos de experiência",
    tone: "post-it-mint",
    rotate: "rotate-1",
  },
  {
    value: "30+",
    label: "marcas atendidas",
    tone: "post-it-lavender",
    rotate: "-rotate-2",
  },
  {
    value: "3",
    label: "idiomas de trabalho",
    tone: "post-it-peach",
    rotate: "rotate-2",
  },
] as const;

export const casePostItStyles = [
  { tone: "post-it-yellow", tagRotate: "-rotate-1" },
  { tone: "post-it-blue", tagRotate: "rotate-1" },
  { tone: "post-it-coral", tagRotate: "-rotate-1" },
  { tone: "post-it-lavender", tagRotate: "rotate-1" },
] as const;

export const cashlogSteps: Step[] = [
  { n: "01", label: "Desafio Raízen" },
  { n: "02", label: "Pesquisa e imersão" },
  { n: "03", label: "Definição e síntese" },
  { n: "04", label: "Ideação e co-criação" },
  { n: "05", label: "Prototipação alta fidelidade" },
];

export const claroSteps: Step[] = [
  { n: "01", label: "Contexto e alinhamento" },
  { n: "02", label: "Objetivos e cenários de uso" },
  { n: "03", label: "Promessas, restrições e riscos" },
  { n: "04", label: "Diagrama de alto nível" },
  { n: "05", label: "MVP de cenários" },
  { n: "06", label: "Co-criação com o e-commerce" },
];

export const timeline: TimelineItem[] = [
  {
    period: "2022–2026",
    company: "Claro Brasil",
    role: "Líder de Pilar → Especialista CX CoE",
    scope:
      "Liderança de jornadas e serviços e atuação no Centro de Excelência de CX do Portal Claro.com.br.",
  },
  {
    period: "2022",
    company: "Stix",
    role: "Coordenadora CX / UX",
    scope:
      "Coordenação de experiência e design no programa de fidelidade e coalizão.",
  },
  {
    period: "2021",
    company: "Banco Pan & Genial",
    role: "Senior Product Designer",
    scope:
      "Design de produto para serviços financeiros e plataformas de investimento.",
  },
  {
    period: "2019–2021",
    company: "Banco BV",
    role: "Consultora UX/UI",
    scope: "Pesquisa, jornadas e interface para produtos digitais do banco.",
  },
  {
    period: "2018–2019",
    company: "MJV Technology & Innovation",
    role: "Consultora de Inovação",
    scope:
      "Consultoria de inovação e UX — inclui o case Cashlog (Raízen).",
  },
  {
    period: "2007–2019",
    company: "DC Creative",
    role: "Especialista CX / UX",
    scope:
      "12 anos liderando projetos de CX, branding e direção de arte para múltiplas indústrias.",
  },
];

export const casePreviews: CasePreview[] = [
  {
    id: "cashlog",
    n: "01",
    kicker: "Raízen · Fintech B2B",
    subtitle: "Consultora de Inovação / UX · MJV Technology",
    title: "Cashlog",
    description:
      "Plataforma de gestão financeira para a operação de postos: precisava ser simples para colaboradores operacionais e robusta o suficiente para as decisões estratégicas de diretores em múltiplas áreas de negócio.",
    accent: "#EC2A86",
    path: "/cases/cashlog",
    ctaColor: "bg-accent",
  },
  {
    id: "claro",
    n: "02",
    kicker: "Claro AMX · Service Design",
    subtitle: "CX na Claro · CoE CX / Portal Claro.com.br",
    title: "Cards de oferta no e-commerce",
    description:
      "Arquitetura de informação e regras de negócio para os cards de planos e combos do e-commerce da Claro, conduzido dentro de um time multidisciplinar — do desenho ao desenvolvimento.",
    accent: "#EC2A86",
    path: "/cases/claro",
    ctaColor: "bg-accent",
  },
  {
    id: "abtest",
    n: "03",
    kicker: "Claro · CRO / Experimentação",
    subtitle: "Raciocínio orientado a dados e resultado de negócio",
    title: "Testes A/B orientados a dados",
    description:
      "Dois experimentos que provam a hipótese com métrica de negócio — não só entrega visual, mas decisão validada em produção.",
    accent: "#EC2A86",
    path: "/cases/abtest",
    ctaColor: "bg-accent",
  },
  {
    id: "etitulo",
    n: "04",
    kicker: "TSE · Serviço público digital",
    subtitle: "CX aplicado a cidadania e acessibilidade",
    title: "Onboarding do e-Título",
    description:
      "Redesenho do onboarding do serviço de identificação digital do eleitor — tratado como ecossistema, não apenas como interface.",
    accent: "#EC2A86",
    path: "/cases/etitulo",
    ctaColor: "bg-accent",
  },
];

export const caseStudies: Record<string, CaseStudyConfig> = {
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
    meta: claroData.meta,
    about: claroData.about,
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
    headerStats: etituloData.headerStats,
    next: { label: "Ver: Cashlog (Raízen) →", path: "/cases/cashlog" },
  },
};

export const industryProof = [
  {
    label: "Bancos & Investimentos",
    brands: "Santander · Bradesco · Itaú · Banco BV · Banco Pan · Genial",
  },
  {
    label: "Energia & Varejo",
    brands: "Raízen · Ale Combustíveis · Ultracargo · Stix",
  },
  {
    label: "Telecom & Seguros",
    brands: "Claro · Vivo · SulAmérica",
  },
  {
    label: "Setor público",
    brands: "TSE · Polícia Federal · Petrobras · Sebrae",
  },
];

export const testimonials: Testimonial[] = [
  {
    name: "Vinicius Braconi",
    role: "Head of Product, Payments | Fintech & Payment Infrastructure",
    featured: true,
    quote:
      "A Ivy é a minha referência em design de produto. Dedicada, inconformada e com total foco e empatia no usuário. Além de ter me ensinado muito sobre design e produto, me ensinou a ser uma pessoa melhor. Qualquer pessoa que tiver a oportunidade de trabalhar com um profissional igual a Ivy Dias, pode se considerar uma pessoa privilegiada.",
  },
  {
    name: "Juliane Portela Santana",
    role: "Marketing Coordinator",
    quote:
      "Excelente diretora de arte — criativa, rápida e comprometida com a qualidade. Pensa na usabilidade, passa ótimos briefings aos desenvolvedores e contribui com ideias que elevam planejamentos e entregas para grandes clientes.",
  },
  {
    name: "Thiago de Souza",
    role: "Full-Stack Architect · AI-driven Builder",
    quote:
      "I worked with Ivy at Inter.net and Vorttex on several client projects. Insightful professional, highly competent art director — her work exceeds expectations. I highly recommend.",
  },
  {
    name: "João Dalben",
    role: "Diretor Comercial de TI",
    quote:
      "Linha criativa sensacional: entende as necessidades do cliente e transforma em arte. A partir de ideias simples, inova e entrega trabalho de alto nível, sempre no prazo. Recomendo com certeza!",
  },
];
