import type { Locale } from "../i18n/types";

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

/** Split body into paragraphs (blank line = new paragraph). */
export function blogBodyParagraphs(body: string) {
  return body
    .replace(/\r\n/g, "\n")
    .split(/\n{2,}/)
    .map((part) => part.trim())
    .filter(Boolean);
}

const SEED_NOW = "2026-09-19T12:00:00.000Z";

/** Starter post so the section is not empty on first open. */
export const seedBlogPosts: BlogPost[] = [
  {
    id: "11111111-1111-4111-8111-111111111201",
    slug: "entre-jornadas-o-que-e-cx-na-pratica",
    status: "published",
    publishedAt: SEED_NOW,
    scheduledAt: null,
    coverImage: "",
    tags: ["CX", "Produto digital"],
    views: 0,
    likes: 0,
    createdAt: SEED_NOW,
    updatedAt: SEED_NOW,
    pt: {
      title: "O que é CX na prática — e por que não é só “deixar bonito”",
      excerpt:
        "Customer Experience é o desenho das jornadas reais entre pessoas, processos e produtos. Um ponto de partida para a série Entre Jornadas.",
      body: `CX não começa na interface. Começa na pergunta: qual problema de negócio e de pessoa estamos resolvendo juntos?

Quando falamos de construção de produtos digitais, a experiência é o resultado de decisões de pesquisa, serviço, priorização e entrega — não só de telas.

Neste espaço, Entre Jornadas, vou compartilhar reflexões, métodos e aprendizados de projetos reais: do discovery ao experimento em produção.

Se você lidera produto, design ou operação, o objetivo é o mesmo: reduzir fricção, criar valor mensurável e manter as pessoas no centro sem perder o olhar de negócio.`,
    },
    en: {
      title: "What CX looks like in practice — and why it isn’t just “making it pretty”",
      excerpt:
        "Customer Experience is the design of real journeys across people, processes, and products. A starting point for the Entre Jornadas series.",
      body: `CX doesn’t start with the interface. It starts with a question: which business and human problem are we solving together?

When we talk about building digital products, experience is the outcome of research, service design, prioritization, and delivery decisions — not screens alone.

In Entre Jornadas I’ll share reflections, methods, and lessons from real projects: from discovery to experiments in production.

If you lead product, design, or operations, the goal is the same: reduce friction, create measurable value, and keep people at the center without losing the business lens.`,
    },
  },
  {
    id: "11111111-1111-4111-8111-111111111202",
    slug: "discovery-antes-da-interface",
    status: "published",
    publishedAt: "2026-09-12T12:00:00.000Z",
    scheduledAt: null,
    coverImage: "",
    tags: ["CX", "Discovery", "Pesquisa"],
    views: 0,
    likes: 0,
    createdAt: "2026-09-12T12:00:00.000Z",
    updatedAt: "2026-09-12T12:00:00.000Z",
    pt: {
      title: "Discovery antes da interface: o que alinhar com produto e negócio",
      excerpt:
        "Antes de desenhar telas, alinhe problema, hipóteses e critérios de sucesso com quem decide e quem opera.",
      body: `Um discovery bem conduzido reduz retrabalho. Ele não é um ritual burocrático — é o momento em que produto, design e negócio negociam o que vale a pena construir.

Comece pelo problema observável: onde a jornada quebra, para quem, e com qual impacto. Só depois discuta soluções.

Documente hipóteses testáveis e o que seria evidência suficiente para seguir, pausar ou pivotar. Isso transforma opinião em decisão compartilhada.

Quando a interface entra cedo demais, o time discute detalhes estéticos enquanto o problema ainda está confuso. Inverta a ordem: clareza primeiro, pixels depois.`,
    },
    en: {
      title: "Discovery before the interface: what to align with product and business",
      excerpt:
        "Before designing screens, align on the problem, hypotheses, and success criteria with decision-makers and operators.",
      body: `Good discovery reduces rework. It isn’t bureaucracy — it’s where product, design, and business negotiate what is worth building.

Start with the observable problem: where the journey breaks, for whom, and with what impact. Only then discuss solutions.

Document testable hypotheses and what evidence would be enough to proceed, pause, or pivot. That turns opinion into shared decision-making.

When the interface arrives too early, teams debate aesthetics while the problem is still unclear. Flip the order: clarity first, pixels later.`,
    },
  },
];
