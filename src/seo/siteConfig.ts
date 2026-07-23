export const SITE_ORIGIN = "https://ivydc.cx";
export const SITE_NAME = "Ivy Dias de Campos";
export const DEFAULT_OG_IMAGE = `${SITE_ORIGIN}/images/ivy-hero-workshop-v2.png`;
export const TWITTER_HANDLE = "@ivydc";

export type SeoPageConfig = {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: "website" | "article" | "profile";
  robots?: string;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
};

export function absoluteUrl(path: string) {
  if (path.startsWith("http")) return path;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_ORIGIN}${normalized === "/" ? "/" : normalized}`;
}

export function absoluteImageUrl(src?: string) {
  if (!src?.trim()) return DEFAULT_OG_IMAGE;
  if (src.startsWith("http")) return src;
  return absoluteUrl(src.startsWith("/") ? src : `/${src}`);
}

export const homeSeoByLocale = {
  pt: {
    title: "Ivy Dias de Campos — Estrategista & Designer de CX",
    description:
      "Portfólio de Ivy Dias de Campos: mais de 20 anos em Customer Experience, Service Design e User Research. Cases com TSE, Claro, Polícia Federal, TrustHub e mais.",
  },
  en: {
    title: "Ivy Dias de Campos — CX Strategist & Designer",
    description:
      "Portfolio of Ivy Dias de Campos: 20+ years in Customer Experience, Service Design and User Research. Case studies with TSE, Claro, Federal Police, TrustHub and more.",
  },
} as const;

export function buildPersonWebsiteJsonLd(locale: "pt" | "en") {
  const copy = homeSeoByLocale[locale];
  return [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: SITE_NAME,
      url: SITE_ORIGIN,
      description: copy.description,
      inLanguage: locale === "pt" ? "pt-BR" : "en",
      publisher: {
        "@type": "Person",
        name: SITE_NAME,
        url: SITE_ORIGIN,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "Person",
      name: SITE_NAME,
      url: SITE_ORIGIN,
      jobTitle:
        locale === "pt"
          ? "Estrategista e Designer de Customer Experience"
          : "Customer Experience Strategist & Designer",
      description: copy.description,
      image: DEFAULT_OG_IMAGE,
      address: {
        "@type": "PostalAddress",
        addressCountry: "PT",
      },
      knowsAbout: [
        "Customer Experience",
        "Service Design",
        "User Research",
        "UX Design",
        "Design Strategy",
      ],
    },
  ];
}

export function buildCaseJsonLd(input: {
  title: string;
  description: string;
  path: string;
  image?: string;
  datePublished?: string;
}) {
  const url = absoluteUrl(input.path);
  return [
    {
      "@context": "https://schema.org",
      "@type": "CreativeWork",
      name: input.title,
      description: input.description,
      url,
      image: absoluteImageUrl(input.image),
      author: {
        "@type": "Person",
        name: SITE_NAME,
        url: SITE_ORIGIN,
      },
      creator: {
        "@type": "Person",
        name: SITE_NAME,
        url: SITE_ORIGIN,
      },
      inLanguage: ["pt-BR", "en"],
      ...(input.datePublished
        ? { datePublished: input.datePublished }
        : {}),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: SITE_ORIGIN,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Work",
          item: `${SITE_ORIGIN}/#trabalhos`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: input.title,
          item: url,
        },
      ],
    },
  ];
}
