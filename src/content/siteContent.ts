import type { Locale } from "../i18n/types";

export const CONTENT_STORAGE_KEY = "ivy-portfolio-content-v1";
export const ADMIN_SESSION_KEY = "ivy-portfolio-admin-session";

export type LocalizedHero = {
  titleBefore: string;
  titleAccent: string;
  subtitle: string;
};

export type ProjectLocaleContent = {
  kicker: string;
  subtitle: string;
  title: string;
  titleAccent?: string;
  description: string;
  breadcrumb: string;
  caseKicker: string;
  tags: string[];
  meta: { k: string; v: string }[];
  about: string[];
  sections: {
    number: string;
    kicker: string;
    title: string;
    body: string;
  }[];
};

export type ManagedProject = {
  id: string;
  slug: string;
  n: string;
  published: boolean;
  overviewImage?: string;
  en: ProjectLocaleContent;
  pt: ProjectLocaleContent;
};

export type SiteContent = {
  heroImage: string;
  contactPhoto: string;
  heroCopy: Record<Locale, LocalizedHero>;
  projects: ManagedProject[];
};

export function emptyProjectLocale(): ProjectLocaleContent {
  return {
    kicker: "",
    subtitle: "",
    title: "",
    titleAccent: "",
    description: "",
    breadcrumb: "",
    caseKicker: "Case study",
    tags: [],
    meta: [
      { k: "Role", v: "" },
      { k: "Client", v: "" },
      { k: "Context", v: "" },
      { k: "Period", v: "" },
    ],
    about: [""],
    sections: [
      {
        number: "01",
        kicker: "Context",
        title: "Challenge",
        body: "",
      },
    ],
  };
}

export function createEmptyProject(): ManagedProject {
  const id =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : `project-${Date.now()}`;
  return {
    id,
    slug: `project-${Date.now()}`,
    n: "05",
    published: false,
    overviewImage: "",
    en: {
      ...emptyProjectLocale(),
      caseKicker: "Case study · CX",
      meta: [
        { k: "Role", v: "" },
        { k: "Client", v: "" },
        { k: "Context", v: "" },
        { k: "Period", v: "" },
      ],
    },
    pt: {
      ...emptyProjectLocale(),
      caseKicker: "Estudo de caso · CX",
      meta: [
        { k: "Papel", v: "" },
        { k: "Cliente", v: "" },
        { k: "Contexto", v: "" },
        { k: "Período", v: "" },
      ],
    },
  };
}

export const defaultSiteContent: SiteContent = {
  heroImage: "/images/ivy-hero-workshop-v2.png",
  contactPhoto: "/images/ivy-dias-hero.png",
  heroCopy: {
    en: {
      titleBefore: "Hi, I'm Ivy — I connect brands to",
      titleAccent: "real digital experiences.",
      subtitle:
        "For over 20 years I've turned business complexity into experiences that create real value — leading strategic CX Design, Service Design and User Research projects.",
    },
    pt: {
      titleBefore: "Olá, eu sou a Ivy, e conecto marcas a",
      titleAccent: "experiências digitais reais.",
      subtitle:
        "Há mais de 20 anos transformo complexidade de negócio em experiências que geram valor real — atuando como liderança técnica em projetos estratégicos de CX Design, Service Design e User Research.",
    },
  },
  projects: [],
};

export function loadSiteContent(): SiteContent {
  try {
    const raw = localStorage.getItem(CONTENT_STORAGE_KEY);
    if (!raw) return structuredClone(defaultSiteContent);
    const parsed = JSON.parse(raw) as Partial<SiteContent>;
    return {
      ...structuredClone(defaultSiteContent),
      ...parsed,
      heroCopy: {
        ...defaultSiteContent.heroCopy,
        ...(parsed.heroCopy ?? {}),
      },
      projects: parsed.projects ?? [],
    };
  } catch {
    return structuredClone(defaultSiteContent);
  }
}

export function saveSiteContent(content: SiteContent) {
  localStorage.setItem(CONTENT_STORAGE_KEY, JSON.stringify(content));
}
