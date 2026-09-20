import type { Locale } from "../i18n/types";
import { mergeSeedProjects, seedProjects } from "../data/seedProjects";
import type { WorkCategory } from "../data/workCategories";
import {
  type BlogPost,
  seedBlogPosts,
  sortBlogPostsNewestFirst,
  normalizeBlogPost,
  LEGACY_PLACEHOLDER_BLOG_IDS,
} from "./blog";

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
    images?: { src: string; alt?: string }[];
  }[];
};

export type ManagedProject = {
  id: string;
  slug: string;
  n: string;
  published: boolean;
  category?: WorkCategory;
  overviewImage?: string;
  en: ProjectLocaleContent;
  pt: ProjectLocaleContent;
};

export type SiteContent = {
  heroImage: string;
  contactPhoto: string;
  heroCopy: Record<Locale, LocalizedHero>;
  projects: ManagedProject[];
  blogPosts: BlogPost[];
};

export type { BlogPost, BlogPostLocaleContent, BlogPostStatus } from "./blog";
export {
  createEmptyBlogPost,
  getBlogPostCopy,
  getRelatedBlogPosts,
  isBlogPostPublic,
  slugifyBlogTitle,
  sortBlogPostsNewestFirst,
  formatBlogDate,
  blogBodyParagraphs,
  normalizeBlogPost,
  readLikedPostIds,
  writeLikedPostIds,
  blogViewSessionKey,
} from "./blog";

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
        images: [],
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
    category: "ux-ui",
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
  heroImage: "/images/ivy-hero-glass-board.png",
  contactPhoto: "/images/ivy-contact-portrait.jpg",
  heroCopy: {
    en: {
      titleBefore: "Hi, I'm Ivy DC.\nI connect brands to",
      titleAccent: "real digital experiences.",
      subtitle:
        "For over 20 years I've turned business complexity into experiences that create real value — leading strategic CX Design, Service Design and User Research projects.",
    },
    pt: {
      titleBefore: "Olá, eu sou a Ivy DC,\ne conecto marcas a",
      titleAccent: "experiências digitais reais.",
      subtitle:
        "Há mais de 20 anos transformo complexidade de negócio em experiências que geram valor real — atuando como liderança técnica em projetos estratégicos de CX Design, Service Design e User Research.",
    },
  },
  projects: seedProjects,
  blogPosts: seedBlogPosts,
};

const LEGACY_HERO_MARKERS = [
  "ivy-hero-workshop-v2",
  "ivy-hero-workshop.png",
  "ivy-hero-workshop.",
] as const;

/** Maps known legacy hero assets to the current glass-board photo. */
export function resolveHeroImage(url: string | undefined | null): string {
  if (!url) return defaultSiteContent.heroImage;
  if (url.includes("ivy-hero-glass-board")) return url;
  if (
    LEGACY_HERO_MARKERS.some((marker) => url.includes(marker)) ||
    (url.includes("/images/ivy-hero") && !url.includes("glass-board"))
  ) {
    return defaultSiteContent.heroImage;
  }
  return url;
}

/** Maps known legacy contact portraits to the current headshot. */
export function resolveContactPhoto(url: string | undefined | null): string {
  if (!url) return defaultSiteContent.contactPhoto;
  if (url.includes("ivy-contact-portrait")) return url;
  if (
    url.includes("ivy-dias-hero") ||
    url.includes("1784659658227-ff292a89") ||
    url.includes("contact/1784659658227")
  ) {
    return defaultSiteContent.contactPhoto;
  }
  return url;
}

export function mergeBlogPosts(existing: BlogPost[] | undefined): BlogPost[] {
  const legacyIds = new Set<string>(LEGACY_PLACEHOLDER_BLOG_IDS);
  const current = (existing ?? [])
    .map(normalizeBlogPost)
    .filter((post) => !legacyIds.has(post.id));

  if (current.length === 0) {
    return structuredClone(seedBlogPosts);
  }

  const byId = new Map(current.map((post) => [post.id, post]));
  for (const seed of seedBlogPosts) {
    const present = byId.get(seed.id);
    if (!present) {
      byId.set(seed.id, normalizeBlogPost(seed));
      continue;
    }
    byId.set(seed.id, {
      ...normalizeBlogPost(seed),
      ...present,
      views: Math.max(present.views, seed.views),
      likes: Math.max(present.likes, seed.likes),
      // Keep the published seed article text authoritative until Admin edits win later.
      slug: seed.slug,
      tags: seed.tags.length ? seed.tags : present.tags,
      pt: seed.pt,
      en: {
        title: seed.en.title || present.en.title,
        excerpt: seed.en.excerpt || present.en.excerpt,
        body: seed.en.body,
      },
    });
  }

  return sortBlogPostsNewestFirst([...byId.values()].map(normalizeBlogPost));
}

export function normalizeSiteContent(content: SiteContent): SiteContent {
  const heroCopy = { ...content.heroCopy };

  for (const locale of ["en", "pt"] as const) {
    const current = heroCopy[locale];
    const defaults = defaultSiteContent.heroCopy[locale];
    if (!current) {
      heroCopy[locale] = structuredClone(defaults);
      continue;
    }

    const before = current.titleBefore ?? "";
    const needsBreak =
      !before.includes("\n") &&
      (/I connect brands to$/i.test(before.trim()) ||
        /e conecto marcas a$/i.test(before.trim()));

    heroCopy[locale] = {
      ...defaults,
      ...current,
      titleBefore: needsBreak ? defaults.titleBefore : before,
      titleAccent: current.titleAccent || defaults.titleAccent,
      subtitle: current.subtitle || defaults.subtitle,
    };
  }

  return {
    ...content,
    heroImage: resolveHeroImage(content.heroImage),
    contactPhoto: resolveContactPhoto(content.contactPhoto),
    heroCopy,
    blogPosts: mergeBlogPosts(content.blogPosts),
  };
}

export function loadSiteContent(): SiteContent {
  try {
    const raw = localStorage.getItem(CONTENT_STORAGE_KEY);
    if (!raw) return structuredClone(defaultSiteContent);
    const parsed = JSON.parse(raw) as Partial<SiteContent>;
    return normalizeSiteContent({
      ...structuredClone(defaultSiteContent),
      ...parsed,
      heroImage: parsed.heroImage ?? defaultSiteContent.heroImage,
      heroCopy: {
        ...defaultSiteContent.heroCopy,
        ...(parsed.heroCopy ?? {}),
      },
      projects: mergeSeedProjects(parsed.projects ?? []).projects,
      blogPosts: mergeBlogPosts(parsed.blogPosts),
    });
  } catch {
    return structuredClone(defaultSiteContent);
  }
}

export function saveSiteContent(content: SiteContent) {
  localStorage.setItem(CONTENT_STORAGE_KEY, JSON.stringify(content));
}
