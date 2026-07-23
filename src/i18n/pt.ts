import type { Dictionary } from "./types";

export const pt: Dictionary = {
  nav: {
    about: "Sobre",
    specialties: "Especialidades",
    work: "Trabalhos",
    testimonials: "Depoimentos",
    timeline: "Trajetória",
    contact: "Contato",
  },
  hero: {
    tags: ["CX Strategy", "Service Design", "User Research"],
    titleBefore: "Olá, eu sou a Ivy, e conecto marcas a",
    titleAccent: "experiências digitais reais.",
    subtitle:
      "Há mais de 20 anos transformo complexidade de negócio em experiências que geram valor real — atuando como liderança técnica em projetos estratégicos de CX Design, Service Design e User Research.",
    ctaWork: "Ver trabalhos selecionados →",
    ctaContact: "Entrar em contato",
    role: "Estrategista & Designer de CX",
    location: "Portugal · remoto",
    stats: [
      { value: "20+", label: "anos de experiência" },
      { value: "30+", label: "marcas atendidas" },
      { value: "3", label: "idiomas de trabalho" },
    ],
    imageAlt:
      "Ivy Dias em workshop de service design, apontando para um mapa de jornada com post-its",
  },
  about: {
    eyebrow: "(01) Sobre",
    title: "Transformo complexidade em experiências que geram valor real.",
    p1: "Sou estrategista e designer de Customer Experience com mais de duas décadas dedicadas a produtos, serviços e marcas digitais.",
    p2: "Atuo como liderança técnica em projetos estratégicos, unindo visão sistêmica, profundidade de design e a capacidade de dialogar com stakeholders de perfis muito diferentes.",
    brandsLabel: "Marcas com quem colaborei",
    brands:
      "Petrobras · TSE · Claro · Stix · Banco Pan · Genial Investimentos · BV · Santander · Bradesco · Itaú · SulAmérica · Unilever · Ale Combustíveis · Raízen · Ultracargo · Pernod Ricard · Sebrae · Polícia Federal",
    languages: [
      "Português — nativo",
      "English — B1",
      "Italiano — A2",
    ],
  },
  specialties: {
    eyebrow: "(02) Como eu trabalho",
    title: "Frentes de atuação, não uma lista de skills.",
    intro:
      "Síntese do que conduzo em projetos reais de CX e service design.",
    items: [
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
    ],
  },
  work: {
    eyebrow: "(03) Trabalhos selecionados",
    title: "Cases em profundidade do desafio ao resultado.",
    intro:
      "Estudos de casos que representam a versatilidade e o olhar 360 que aplico no meu trabalho",
    countLabel: "04 casos",
    cta: "Ver estudo de caso completo →",
    filterAll: "Todos",
    categories: {
      "service-design": "Service Design",
      "continuous-improvement": "Melhoria Contínua",
      "ux-ui": "UX — UI",
    },
    industryEyebrow: "Trajetória multi-indústria · prova social",
    industryTitle:
      "Adaptação a diferentes modelos de negócio e stakeholders.",
    industries: [
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
    ],
    cases: [
      {
        id: "cashlog",
        n: "01",
        kicker: "Raízen · Fintech B2B",
        subtitle: "Consultora de Inovação / UX · MJV Technology",
        title: "Cashlog",
        description:
          "Plataforma de gestão financeira para a operação de postos: precisava ser simples para colaboradores operacionais e robusta o suficiente para as decisões estratégicas de diretores em múltiplas áreas de negócio.",
        path: "/cases/cashlog",
      },
      {
        id: "claro",
        n: "02",
        kicker: "Claro AMX · Service Design",
        subtitle: "CX na Claro · CoE CX / Portal Claro.com.br",
        title: "Cards de oferta no e-commerce",
        description:
          "Arquitetura de informação e regras de negócio para os cards de planos e combos do e-commerce da Claro, conduzido dentro de um time multidisciplinar — do desenho ao desenvolvimento.",
        path: "/cases/claro",
      },
      {
        id: "abtest",
        n: "03",
        kicker: "Claro · CRO / Experimentação",
        subtitle: "Raciocínio orientado a dados e resultado de negócio",
        title: "Testes A/B orientados a dados",
        description:
          "Dois experimentos que provam a hipótese com métrica de negócio — não só entrega visual, mas decisão validada em produção.",
        path: "/cases/abtest",
      },
      {
        id: "etitulo",
        n: "04",
        kicker: "TSE · Serviço público digital",
        subtitle: "CX aplicado a cidadania e acessibilidade",
        title: "Onboarding do e-Título",
        description:
          "Redesenho do onboarding do serviço de identificação digital do eleitor — tratado como ecossistema, não apenas como interface.",
        path: "/cases/etitulo",
      },
      {
        id: "bbnk",
        n: "05",
        kicker: "BBNK · Banking as a Service",
        subtitle: "Consultora de inovação, UX, UI · 2018 — 2019",
        title: "Banco BBNK",
        description:
          "Plataforma digital integrada de banking as a service e white label, com entregas rápidas de produtos bancários e uma experiência minimalista e navegável.",
        path: "/cases/bbnk",
      },
      {
        id: "trusthub",
        n: "06",
        kicker: "TrustHub · Conta digital PME",
        subtitle: "UX/UI Designer · Tritone · 2017 — 2018",
        title: "TrustHub",
        description:
          "Conta 100% digital para simplificar a gestão financeira de pequenas empresas — arquitetura da informação e interface web claras, modernas e intuitivas.",
        path: "/cases/trusthub",
      },
      {
        id: "policia-federal",
        n: "07",
        kicker: "Polícia Federal · Design de Serviço",
        subtitle: "Roteirização · Facilitação · Design de Serviço · 2019",
        title: "Padronização de Computadores",
        description:
          "Workshop nacional para revisar a disponibilização de computadores da Polícia Federal — do AS IS ao TO BE, com consenso entre regiões e backlog de evolução.",
        path: "/cases/policia-federal",
      },
    ],
  },
  testimonials: {
    eyebrow: "(04) Depoimentos",
    title: "O que colegas e parceiros dizem sobre trabalhar comigo.",
    intro:
      "Recomendações recebidas no LinkedIn ao longo de mais de duas décadas de colaboração em produto, design e tecnologia.",
    linkedinCta: "Ver recomendações no LinkedIn →",
    items: [
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
    ],
  },
  timeline: {
    eyebrow: "(05) Trajetória",
    title: "Os marcos que moldaram minha prática de CX.",
    items: [
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
    ],
  },
  contact: {
    eyebrow: "(06) Contato",
    title: "Vamos conversar sobre seu projeto de CX?",
    subtitle:
      "Disponível para projetos remotos e internacionais, a partir de Portugal. Conte-me o desafio — respondo pessoalmente.",
    tags: ["Remoto", "CX Strategy", "Workshops", "Portugal"],
    photoAlt: "Retrato de Ivy Dias de Campos",
    formName: "Nome",
    formEmail: "Email",
    formMessage: "Mensagem",
    namePlaceholder: "Como posso te chamar?",
    emailPlaceholder: "seu@email.com",
    messagePlaceholder: "Conte-me sobre o desafio de CX...",
    submit: "Enviar mensagem",
    submitting: "Enviando…",
    formHint:
      "Sua mensagem vai direto para ivy.dias.de.campos@gmail.com. Eu respondo pessoalmente.",
    formError:
      "Não foi possível enviar. Tente de novo ou escreva direto no email.",
    successTitle: "Mensagem enviada!",
    successBody:
      "Obrigada pelo contato. Retorno em breve pelo email informado.",
  },
  footer: {
    role: "Estrategista & Designer de CX · Portugal",
  },
  caseChrome: {
    back: "← Voltar aos trabalhos",
    allWork: "← Todos os trabalhos",
    aboutProject: "Sobre o projeto",
    alsoSee: "Veja também",
  },
  admin: {
    title: "Admin do portfólio",
    loginTitle: "Acesso admin",
    password: "Senha",
    login: "Entrar",
    logout: "Sair",
    heroTab: "Hero",
    projectsTab: "Projetos",
    contactTab: "Foto de contato",
    save: "Salvar alterações",
    saving: "Salvando…",
    saved: "Salvo no Supabase",
    saveError: "Não foi possível salvar. Tente de novo.",
    uploadImage: "Enviar imagem",
    uploading: "Enviando…",
    imageUrl: "Ou cole a URL da imagem",
    heroImage: "Imagem do hero",
    contactImage: "Foto de contato",
    addProject: "Adicionar projeto",
    deleteProject: "Excluir",
    publish: "Publicar",
    unpublish: "Despublicar",
    editEn: "Inglês",
    editPt: "Português",
  },
};
