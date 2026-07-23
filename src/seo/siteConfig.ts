export const SITE_ORIGIN = "https://ivydc.cx";
export const SITE_NAME = "Ivy Dias de Campos";
export const SITE_BRAND = "Ivy DC";
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

export function buildPersonWebsiteJsonLd(input: {
  locale: "pt" | "en";
  title: string;
  description: string;
}) {
  const inLanguage = input.locale === "pt" ? "pt-BR" : "en";
  return [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: SITE_BRAND,
      alternateName: SITE_NAME,
      url: SITE_ORIGIN,
      description: input.description,
      inLanguage,
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
      alternateName: SITE_BRAND,
      url: SITE_ORIGIN,
      jobTitle:
        input.locale === "pt"
          ? "Estrategista e Designer de Customer Experience"
          : "Customer Experience Strategist & Designer",
      description: input.description,
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
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: input.title,
      description: input.description,
      url: SITE_ORIGIN,
      isPartOf: { "@type": "WebSite", url: SITE_ORIGIN },
      about: { "@type": "Person", name: SITE_NAME },
      inLanguage,
    },
  ];
}

export function buildCaseJsonLd(input: {
  title: string;
  description: string;
  path: string;
  image?: string;
  datePublished?: string;
  locale?: "pt" | "en";
}) {
  const url = absoluteUrl(input.path);
  const inLanguage = input.locale === "en" ? "en" : "pt-BR";

  return [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: input.title,
      description: input.description,
      url,
      isPartOf: { "@type": "WebSite", url: SITE_ORIGIN },
      about: { "@type": "Person", name: SITE_NAME },
      inLanguage,
      primaryImageOfPage: absoluteImageUrl(input.image),
    },
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
      ...(input.datePublished ? { datePublished: input.datePublished } : {}),
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
          name: input.title.replace(/\s*\|\s*Ivy DC\s*$/i, "").trim(),
          item: url,
        },
      ],
    },
  ];
}
