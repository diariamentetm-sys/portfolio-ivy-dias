import type { Dictionary } from "./types";

export const en: Dictionary = {
  nav: {
    about: "About",
    specialties: "Specialties",
    work: "Work",
    testimonials: "Testimonials",
    timeline: "Timeline",
    contact: "Contact",
  },
  hero: {
    tags: ["CX Strategy", "Service Design", "User Research"],
    titleBefore: "Hi, I'm Ivy — I connect brands to",
    titleAccent: "real digital experiences.",
    subtitle:
      "For over 20 years I've turned business complexity into experiences that create real value — leading strategic CX Design, Service Design and User Research projects.",
    ctaWork: "View selected work →",
    ctaContact: "Get in touch",
    role: "CX Strategist & Designer",
    location: "Portugal · remote",
    stats: [
      { value: "20+", label: "years of experience" },
      { value: "30+", label: "brands served" },
      { value: "3", label: "working languages" },
    ],
    imageAlt:
      "Ivy Dias in a service design workshop, pointing to a journey map of sticky notes",
  },
  about: {
    eyebrow: "(01) About",
    title: "I turn complexity into experiences that create real value.",
    p1: "I'm a Customer Experience strategist and designer with more than two decades dedicated to products, services and digital brands.",
    p2: "I act as technical lead on strategic projects, combining systems thinking, design depth and the ability to work with stakeholders of very different profiles.",
    brandsLabel: "Brands I've collaborated with",
    brands:
      "Petrobras · TSE · Claro · Stix · Banco Pan · Genial Investimentos · BV · Santander · Bradesco · Itaú · SulAmérica · Unilever · Ale Combustíveis · Raízen · Ultracargo · Pernod Ricard · Sebrae · Polícia Federal",
    languages: [
      "Portuguese — native",
      "English — B1",
      "Italian — A2",
    ],
  },
  specialties: {
    eyebrow: "(02) How I work",
    title: "Areas of practice, not a skills checklist.",
    intro:
      "A synthesis of what I lead in real CX and service design projects.",
    items: [
      {
        num: "01",
        title: "CX Strategy & Service Design",
        desc: "I design the whole service, not just the screen: connecting touchpoints, backstage and business into a coherent journey.",
      },
      {
        num: "02",
        title: "User Research",
        desc: "I turn listening and evidence into design decisions — from the field to actionable synthesis.",
      },
      {
        num: "03",
        title: "Journeys & service mapping",
        desc: "I map the as-is, expose where the experience breaks and design the to-be with clarity.",
      },
      {
        num: "04",
        title: "Interface design (UX/UI)",
        desc: "Interfaces that feel intuitive for operators and robust for decision-makers.",
      },
      {
        num: "05",
        title: "Workshop facilitation",
        desc: "I lead Design Sprints and Lean Inceptions that align large teams around clear decisions.",
      },
      {
        num: "06",
        title: "Technical leadership & design squads",
        desc: "I lead design squads with direction, consistency and care for the people on the team.",
      },
    ],
  },
  work: {
    eyebrow: "(03) Selected work",
    title: "Case studies in depth from challenge to outcome.",
    intro:
      "Case studies that show the versatility and 360° perspective I bring to my work",
    countLabel: "04 cases",
    cta: "View full case study →",
    filterAll: "All",
    categories: {
      "service-design": "Service Design",
      "continuous-improvement": "Continuous Improvement",
      "ux-ui": "UX — UI",
    },
    industryEyebrow: "Multi-industry path · social proof",
    industryTitle:
      "Adaptation across different business models and stakeholders.",
    industries: [
      {
        label: "Banking & Investments",
        brands: "Santander · Bradesco · Itaú · Banco BV · Banco Pan · Genial",
      },
      {
        label: "Energy & Retail",
        brands: "Raízen · Ale Combustíveis · Ultracargo · Stix",
      },
      {
        label: "Telecom & Insurance",
        brands: "Claro · Vivo · SulAmérica",
      },
      {
        label: "Public sector",
        brands: "TSE · Polícia Federal · Petrobras · Sebrae",
      },
    ],
    cases: [
      {
        id: "cashlog",
        n: "01",
        kicker: "Raízen · B2B Fintech",
        subtitle: "Innovation / UX Consultant · MJV Technology",
        title: "Cashlog",
        description:
          "Financial management platform for fuel-station operations: simple enough for frontline staff and robust enough for directors' strategic decisions across multiple business areas.",
        path: "/cases/cashlog",
      },
      {
        id: "claro",
        n: "02",
        kicker: "Claro AMX · Service Design",
        subtitle: "CX at Claro · CX CoE / Portal Claro.com.br",
        title: "Offer cards in e-commerce",
        description:
          "Information architecture and business rules for plan and combo cards in Claro's e-commerce, led inside a multidisciplinary team — from design to development.",
        path: "/cases/claro",
      },
      {
        id: "abtest",
        n: "03",
        kicker: "Claro · CRO / Experimentation",
        subtitle: "Data-driven reasoning and business outcomes",
        title: "Data-oriented A/B tests",
        description:
          "Two experiments that prove the hypothesis with a business metric — not just a visual delivery, but a decision validated in production.",
        path: "/cases/abtest",
      },
      {
        id: "etitulo",
        n: "04",
        kicker: "TSE · Public digital service",
        subtitle: "CX applied to citizenship and accessibility",
        title: "e-Título onboarding",
        description:
          "Redesign of the digital voter ID onboarding — treated as an ecosystem, not only as an interface.",
        path: "/cases/etitulo",
      },
      {
        id: "bbnk",
        n: "05",
        kicker: "BBNK · Banking as a Service",
        subtitle: "Innovation, UX & UI consultant · 2018 — 2019",
        title: "BBNK Bank",
        description:
          "Integrated digital banking-as-a-service and white-label platform for rapid banking product delivery, with a minimal, navigable experience.",
        path: "/cases/bbnk",
      },
      {
        id: "trusthub",
        n: "06",
        kicker: "TrustHub · SME digital account",
        subtitle: "UX/UI Designer · Tritone · 2017 — 2018",
        title: "TrustHub",
        description:
          "A fully digital account to simplify financial management for small businesses — clear, modern information architecture and web interface design.",
        path: "/cases/trusthub",
      },
      {
        id: "policia-federal",
        n: "07",
        kicker: "Federal Police · Service Design",
        subtitle: "Scripting · Facilitation · Service Design · 2019",
        title: "Computer Standardization",
        description:
          "National workshop to review how the Federal Police makes computers available — from AS-IS to TO-BE, with cross-region consensus and an evolution backlog.",
        path: "/cases/policia-federal",
      },
    ],
  },
  testimonials: {
    eyebrow: "(04) Testimonials",
    title: "What colleagues and partners say about working with me.",
    intro:
      "LinkedIn recommendations gathered across more than two decades of collaboration in product, design and technology.",
    linkedinCta: "See recommendations on LinkedIn →",
    items: [
      {
        name: "Vinicius Braconi",
        role: "Head of Product, Payments | Fintech & Payment Infrastructure",
        featured: true,
        quote:
          "Ivy is my reference in product design. Dedicated, restless and fully focused on user empathy. Beyond teaching me a lot about design and product, she taught me to be a better person. Anyone who gets the chance to work with a professional like Ivy Dias can consider themselves privileged.",
      },
      {
        name: "Juliane Portela Santana",
        role: "Marketing Coordinator",
        quote:
          "An excellent art director — creative, fast and committed to quality. She thinks about usability, gives great briefs to developers and contributes ideas that elevate planning and delivery for major clients.",
      },
      {
        name: "Thiago de Souza",
        role: "Full-Stack Architect · AI-driven Builder",
        quote:
          "I worked with Ivy at Inter.net and Vorttex on several client projects. Insightful professional, highly competent art director — her work exceeds expectations. I highly recommend.",
      },
      {
        name: "João Dalben",
        role: "IT Commercial Director",
        quote:
          "A sensational creative line: she understands client needs and turns them into art. From simple ideas she innovates and delivers high-level work, always on time. I highly recommend!",
      },
    ],
  },
  timeline: {
    eyebrow: "(05) Timeline",
    title: "The milestones that shaped my CX practice.",
    items: [
      {
        period: "2022–2026",
        company: "Claro Brasil",
        role: "Pillar Lead → CX CoE Specialist",
        scope:
          "Journey and service leadership plus work in the CX Center of Excellence for Portal Claro.com.br.",
      },
      {
        period: "2022",
        company: "Stix",
        role: "CX / UX Coordinator",
        scope:
          "Experience and design coordination in the loyalty and coalition program.",
      },
      {
        period: "2021",
        company: "Banco Pan & Genial",
        role: "Senior Product Designer",
        scope:
          "Product design for financial services and investment platforms.",
      },
      {
        period: "2019–2021",
        company: "Banco BV",
        role: "UX/UI Consultant",
        scope: "Research, journeys and interface for the bank's digital products.",
      },
      {
        period: "2018–2019",
        company: "MJV Technology & Innovation",
        role: "Innovation Consultant",
        scope: "Innovation and UX consulting — including the Cashlog case (Raízen).",
      },
      {
        period: "2007–2019",
        company: "DC Creative",
        role: "CX / UX Specialist",
        scope:
          "12 years leading CX, branding and art direction projects across multiple industries.",
      },
    ],
  },
  contact: {
    eyebrow: "(06) Contact",
    title: "Shall we talk about your CX project?",
    subtitle:
      "Available for remote and international projects from Portugal. Tell me about the challenge — I reply personally.",
    tags: ["Remote", "CX Strategy", "Workshops", "Portugal"],
    photoAlt: "Portrait of Ivy Dias de Campos",
    formName: "Name",
    formEmail: "Email",
    formMessage: "Message",
    namePlaceholder: "What should I call you?",
    emailPlaceholder: "you@email.com",
    messagePlaceholder: "Tell me about the CX challenge...",
    submit: "Send message",
    submitting: "Sending…",
    formHint:
      "Your message is sent directly to ivy.dias.de.campos@gmail.com. I reply personally.",
    formError: "Couldn't send the message. Please try again or email me directly.",
    successTitle: "Message sent!",
    successBody: "Thanks for reaching out. I'll get back soon via the email you shared.",
  },
  footer: {
    role: "CX Strategist & Designer · Portugal",
  },
  caseChrome: {
    back: "← Back to work",
    allWork: "← All work",
    aboutProject: "About the project",
    alsoSee: "Also see",
  },
  admin: {
    title: "Portfolio admin",
    loginTitle: "Admin access",
    password: "Password",
    login: "Sign in",
    logout: "Sign out",
    heroTab: "Hero",
    projectsTab: "Projects",
    contactTab: "Contact photo",
    save: "Save changes",
    saving: "Saving…",
    saved: "Saved to Supabase",
    saveError: "Could not save. Try again.",
    uploadImage: "Upload image",
    uploading: "Uploading…",
    imageUrl: "Or paste image URL",
    heroImage: "Hero image",
    contactImage: "Contact photo",
    addProject: "Add project",
    deleteProject: "Delete",
    publish: "Publish",
    unpublish: "Unpublish",
    editEn: "English",
    editPt: "Portuguese",
  },
};
