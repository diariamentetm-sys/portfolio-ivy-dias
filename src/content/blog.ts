import type { Locale } from "../i18n/types";
import projetoAtrasadoEn from "./posts/projeto-atrasado-problema-nao-era-cronograma.en.md?raw";
import projetoAtrasadoPt from "./posts/projeto-atrasado-problema-nao-era-cronograma.pt.md?raw";

export type BlogPostStatus = "draft" | "published";

export type BlogPostLocaleContent = {
  title: string;
  excerpt: string;
  body: string;
};

export type BlogPost = {
  id: string;
  slug: string;
  status: BlogPostStatus;
  /** ISO date — used for listing order and SEO datePublished */
  publishedAt: string | null;
  /** ISO date — when set in the future, post stays hidden until then (automation-ready) */
  scheduledAt: string | null;
  coverImage: string;
  tags: string[];
  views: number;
  likes: number;
  en: BlogPostLocaleContent;
  pt: BlogPostLocaleContent;
  createdAt: string;
  updatedAt: string;
};

export function emptyBlogLocale(): BlogPostLocaleContent {
  return {
    title: "",
    excerpt: "",
    body: "",
  };
}

export function createEmptyBlogPost(): BlogPost {
  const now = new Date().toISOString();
  const id =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : `post-${Date.now()}`;

  return {
    id,
    slug: `rascunho-${Date.now()}`,
    status: "draft",
    publishedAt: null,
    scheduledAt: null,
    coverImage: "",
    tags: ["CX"],
    views: 0,
    likes: 0,
    en: emptyBlogLocale(),
    pt: emptyBlogLocale(),
    createdAt: now,
    updatedAt: now,
  };
}

export function normalizeBlogPost(post: BlogPost): BlogPost {
  return {
    ...post,
    views: Math.max(0, Number(post.views) || 0),
    likes: Math.max(0, Number(post.likes) || 0),
    tags: post.tags ?? [],
    coverImage: post.coverImage ?? "",
    scheduledAt: post.scheduledAt ?? null,
    publishedAt: post.publishedAt ?? null,
  };
}

export const BLOG_LIKED_STORAGE_KEY = "ivy-blog-liked-ids";

export function readLikedPostIds(): Set<string> {
  try {
    const raw = localStorage.getItem(BLOG_LIKED_STORAGE_KEY);
    if (!raw) return new Set();
    const parsed = JSON.parse(raw) as string[];
    return new Set(Array.isArray(parsed) ? parsed : []);
  } catch {
    return new Set();
  }
}

export function writeLikedPostIds(ids: Set<string>) {
  localStorage.setItem(BLOG_LIKED_STORAGE_KEY, JSON.stringify([...ids]));
}

export function blogViewSessionKey(postId: string) {
  return `ivy-blog-viewed-${postId}`;
}

export function slugifyBlogTitle(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

/** Public visibility: published and not scheduled in the future. */
export function isBlogPostPublic(post: BlogPost, now = new Date()) {
  if (post.status !== "published") return false;
  if (post.scheduledAt) {
    const scheduled = new Date(post.scheduledAt);
    if (!Number.isNaN(scheduled.getTime()) && scheduled > now) return false;
  }
  return true;
}

export function getBlogPostCopy(post: BlogPost, locale: Locale) {
  const primary = post[locale];
  const fallback = locale === "pt" ? post.en : post.pt;
  return {
    title: primary.title.trim() || fallback.title.trim(),
    excerpt: primary.excerpt.trim() || fallback.excerpt.trim(),
    body: primary.body.trim() || fallback.body.trim(),
  };
}

export function sortBlogPostsNewestFirst(posts: BlogPost[]) {
  return [...posts].sort((a, b) => {
    const aTime = Date.parse(a.publishedAt || a.updatedAt || a.createdAt);
    const bTime = Date.parse(b.publishedAt || b.updatedAt || b.createdAt);
    return bTime - aTime;
  });
}

export function formatBlogDate(iso: string | null, locale: Locale) {
  if (!iso) return "";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat(locale === "pt" ? "pt-BR" : "en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

export function getRelatedBlogPosts(
  posts: BlogPost[],
  current: BlogPost,
  limit = 2,
) {
  const currentTags = new Set(
    current.tags.map((tag) => tag.trim().toLowerCase()).filter(Boolean),
  );

  const scored = posts
    .filter((post) => post.id !== current.id && isBlogPostPublic(post))
    .map((post) => {
      const shared = post.tags.reduce((count, tag) => {
        return currentTags.has(tag.trim().toLowerCase()) ? count + 1 : count;
      }, 0);
      const time = Date.parse(
        post.publishedAt || post.updatedAt || post.createdAt,
      );
      return { post, shared, time: Number.isNaN(time) ? 0 : time };
    })
    .sort((a, b) => {
      if (b.shared !== a.shared) return b.shared - a.shared;
      return b.time - a.time;
    });

  return scored.slice(0, limit).map((item) => item.post);
}

/** Split body into paragraphs (blank line = new paragraph). Kept for Admin previews. */
export function blogBodyParagraphs(body: string) {
  return body
    .replace(/\r\n/g, "\n")
    .split(/\n{2,}/)
    .map((part) => part.trim())
    .filter(Boolean);
}

const SEED_NOW = "2026-09-20T12:00:00.000Z";

/** Placeholder posts replaced by the first real Entre Jornadas article. */
export const LEGACY_PLACEHOLDER_BLOG_IDS = [
  "11111111-1111-4111-8111-111111111201",
  "11111111-1111-4111-8111-111111111202",
] as const;

/** First published article for Entre Jornadas. */
export const seedBlogPosts: BlogPost[] = [
  {
    id: "11111111-1111-4111-8111-111111111301",
    slug: "projeto-atrasado-problema-nao-era-cronograma",
    status: "published",
    publishedAt: SEED_NOW,
    scheduledAt: null,
    coverImage: "",
    tags: [
      "Product Discovery",
      "Governança",
      "Stakeholders",
      "Lean Inception",
    ],
    views: 0,
    likes: 0,
    createdAt: SEED_NOW,
    updatedAt: SEED_NOW,
    pt: {
      title: "O projeto estava atrasado, mas o problema não era o cronograma",
      excerpt:
        "A história de um discovery de inteligência artificial que tinha cronograma, método e um time excelente. Só esqueceram de combinar com a organização.",
      body: projetoAtrasadoPt.trim(),
    },
    en: {
      title: "The project was late, but the problem wasn’t the schedule",
      excerpt:
        "The story of an AI discovery that had a timeline, a method, and a strong team — and still stumbled on what the organization never agreed to.",
      body: projetoAtrasadoEn.trim(),
    },
  },
];
