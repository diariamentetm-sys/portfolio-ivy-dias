import type { Locale } from "../i18n/types";
import blueprintsB2bEn from "./posts/17-blueprints-b2b-em-2-meses.en.md?raw";
import blueprintsB2bPt from "./posts/17-blueprints-b2b-em-2-meses.pt.md?raw";
import comoEuFariaProdutoCxEn from "./posts/como-eu-faria-produto-e-cx-morarem-na-mesma-casa.en.md?raw";
import comoEuFariaProdutoCxPt from "./posts/como-eu-faria-produto-e-cx-morarem-na-mesma-casa.pt.md?raw";
import comoMostreiCxEn from "./posts/como-mostrei-o-que-era-cx.en.md?raw";
import comoMostreiCxPt from "./posts/como-mostrei-o-que-era-cx.pt.md?raw";
import pequenasRealidadesEn from "./posts/pequenas-realidades-impossiveis-nos-dias-de-hoje.en.md?raw";
import pequenasRealidadesPt from "./posts/pequenas-realidades-impossiveis-nos-dias-de-hoje.pt.md?raw";
import porQueProdutosNaoGostaDeCxEn from "./posts/por-que-a-area-de-produtos-nao-gosta-de-cx.en.md?raw";
import porQueProdutosNaoGostaDeCxPt from "./posts/por-que-a-area-de-produtos-nao-gosta-de-cx.pt.md?raw";
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

export function slugifyBlogTag(tag: string) {
  return slugifyBlogTitle(tag);
}

export function blogPostHasTag(post: BlogPost, tagSlug: string) {
  const needle = slugifyBlogTag(tagSlug);
  if (!needle) return false;
  return post.tags.some((tag) => slugifyBlogTag(tag) === needle);
}

export function collectBlogTags(posts: BlogPost[]) {
  const bySlug = new Map<string, string>();
  for (const post of posts) {
    for (const tag of post.tags) {
      const slug = slugifyBlogTag(tag);
      if (slug && !bySlug.has(slug)) bySlug.set(slug, tag);
    }
  }
  return [...bySlug.entries()]
    .map(([slug, label]) => ({ slug, label }))
    .sort((a, b) => a.label.localeCompare(b.label, "pt"));
}

export function blogTagPath(tag: string) {
  return `/entre-jornadas?tag=${encodeURIComponent(slugifyBlogTag(tag))}`;
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
const SEED_CX_STORY = "2026-09-30T12:00:00.000Z";
const SEED_PHEBO = "2026-10-07T12:00:00.000Z";
const SEED_CX_VS_PRODUCT = "2026-10-14T12:00:00.000Z";
const SEED_CX_SAME_HOUSE = "2026-10-21T12:00:00.000Z";
const SEED_BLUEPRINTS_B2B = "2026-10-28T12:00:00.000Z";

/** Placeholder posts replaced by the first real Entre Jornadas article. */
export const LEGACY_PLACEHOLDER_BLOG_IDS = [
  "11111111-1111-4111-8111-111111111201",
  "11111111-1111-4111-8111-111111111202",
] as const;

/** Published articles for Entre Jornadas. */
export const seedBlogPosts: BlogPost[] = [
  {
    id: "11111111-1111-4111-8111-111111111306",
    slug: "17-blueprints-b2b-em-2-meses",
    status: "published",
    publishedAt: SEED_BLUEPRINTS_B2B,
    scheduledAt: null,
    coverImage: "",
    tags: [
      "Service Design",
      "Service Blueprint",
      "B2B",
      "IA",
      "Contact Center",
    ],
    views: 0,
    likes: 0,
    createdAt: SEED_BLUEPRINTS_B2B,
    updatedAt: SEED_BLUEPRINTS_B2B,
    pt: {
      title: "Teatro dos Cinco Blueprints",
      excerpt:
        "Prometeram 5 Service Blueprints. Saíram 17 em 2 meses: Service Design, pesquisa e IA num prazo impossível de contact center B2B.",
      body: blueprintsB2bPt.trim(),
    },
    en: {
      title: "Theater of the Five Blueprints",
      excerpt:
        "They promised 5 Service Blueprints. We delivered 17 in 2 months: Service Design, research, and AI on an impossible B2B contact center deadline.",
      body: blueprintsB2bEn.trim(),
    },
  },
  {
    id: "11111111-1111-4111-8111-111111111305",
    slug: "como-eu-faria-produto-e-cx-morarem-na-mesma-casa",
    status: "published",
    publishedAt: SEED_CX_SAME_HOUSE,
    scheduledAt: null,
    coverImage: "",
    tags: ["CX", "Produtos", "UX", "Organizações"],
    views: 0,
    likes: 0,
    createdAt: SEED_CX_SAME_HOUSE,
    updatedAt: SEED_CX_SAME_HOUSE,
    pt: {
      title: "Como eu faria Produto e CX morarem na mesma casa",
      excerpt:
        "Uma metáfora do encanador para imaginar CX e UX dentro dos produtos, com governança transversal e sem mirante distante.",
      body: comoEuFariaProdutoCxPt.trim(),
    },
    en: {
      title: "How I’d make Product and CX live in the same house",
      excerpt:
        "A plumber metaphor for imagining CX and UX inside products, with transversal governance and no distant lookout.",
      body: comoEuFariaProdutoCxEn.trim(),
    },
  },
  {
    id: "11111111-1111-4111-8111-111111111304",
    slug: "por-que-a-area-de-produtos-nao-gosta-de-cx",
    status: "published",
    publishedAt: SEED_CX_VS_PRODUCT,
    scheduledAt: null,
    coverImage: "",
    tags: ["CX", "Produtos", "Organizações", "Voz do cliente"],
    views: 0,
    likes: 0,
    createdAt: SEED_CX_VS_PRODUCT,
    updatedAt: SEED_CX_VS_PRODUCT,
    pt: {
      title: "Por que a área de Produtos não gosta de CX?",
      excerpt:
        "Observações de quem vivenciou o atrito entre CX e Produtos: backlog, política interna e até onde a voz do cliente pode circular.",
      body: porQueProdutosNaoGostaDeCxPt.trim(),
    },
    en: {
      title: "Why doesn’t the Product area like CX?",
      excerpt:
        "Notes from living the friction between CX and Product: backlog ownership, internal politics, and how far the customer’s voice is allowed to travel.",
      body: porQueProdutosNaoGostaDeCxEn.trim(),
    },
  },
  {
    id: "11111111-1111-4111-8111-111111111303",
    slug: "pequenas-realidades-impossiveis-nos-dias-de-hoje",
    status: "published",
    publishedAt: SEED_PHEBO,
    scheduledAt: null,
    coverImage: "",
    tags: ["UX", "Wireframe", "Memória", "Carreira"],
    views: 0,
    likes: 0,
    createdAt: SEED_PHEBO,
    updatedAt: SEED_PHEBO,
    pt: {
      title: "Pequenas realidades impossíveis nos dias de hoje",
      excerpt:
        "Uma lembrança de 2011 que ainda pergunta se certos encontros de trabalho cabem no mundo de hoje.",
      body: pequenasRealidadesPt.trim(),
    },
    en: {
      title: "Small impossible realities these days",
      excerpt:
        "A 2011 memory that still asks whether some ways of working can exist today.",
      body: pequenasRealidadesEn.trim(),
    },
  },
  {
    id: "11111111-1111-4111-8111-111111111302",
    slug: "como-mostrei-o-que-era-cx",
    status: "published",
    publishedAt: SEED_CX_STORY,
    scheduledAt: null,
    coverImage: "",
    tags: ["CX", "Pesquisa", "Portal", "Operação"],
    views: 0,
    likes: 0,
    createdAt: SEED_CX_STORY,
    updatedAt: SEED_CX_STORY,
    pt: {
      title:
        "Como mostrei o trabalho de CX num lugar onde ninguém sabia bem se isso era pra comer ou passar no cabelo.",
      excerpt:
        "Cheguei como CX num portal de telecom sem território definido. Mapeamento, pesquisa e rotina com o time foram o caminho para conquistar espaço e voz para o cliente.",
      body: comoMostreiCxPt.trim(),
    },
    en: {
      title:
        "How I showed what CX was in a place where nobody knew if it was something to eat or put in your hair",
      excerpt:
        "I arrived as CX on a telecom portal with no defined territory. Mapping, research, and routines with the team were how I earned space and a voice for the customer.",
      body: comoMostreiCxEn.trim(),
    },
  },
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
        "The story of an AI discovery that had a timeline, a method, and a strong team, and still stumbled on what the organization never agreed to.",
      body: projetoAtrasadoEn.trim(),
    },
  },
];
