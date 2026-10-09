import { localizePath } from "../i18n/localeRouting";
import type { Locale } from "../i18n/types";

export const SITE_ORIGIN = "https://www.ivydc.cx";
export const SITE_NAME = "Ivy Dias de Campos";
export const SITE_BRAND = "Ivy DC";
export const DEFAULT_OG_IMAGE = `${SITE_ORIGIN}/images/ivy-hero-glass-board.png`;
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
  // Locale homes are /pt and /en (no trailing slash).
  if (normalized === "/") return `${SITE_ORIGIN}/`;
  return `${SITE_ORIGIN}${normalized}`;
}

export function absoluteImageUrl(src?: string) {
  if (!src?.trim()) return DEFAULT_OG_IMAGE;
  if (src.startsWith("http")) return src;
  return absoluteUrl(src.startsWith("/") ? src : `/${src}`);
}

export function buildPersonWebsiteJsonLd(input: {
  locale: Locale;
  title: string;
  description: string;
}) {
  const inLanguage = input.locale === "pt" ? "pt-BR" : "en";
  const homeUrl = absoluteUrl(localizePath(input.locale, "/"));
  return [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: SITE_BRAND,
      alternateName: SITE_NAME,
      url: homeUrl,
      description: input.description,
      inLanguage,
      publisher: {
        "@type": "Person",
        name: SITE_NAME,
        url: homeUrl,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "Person",
      name: SITE_NAME,
      alternateName: SITE_BRAND,
      url: homeUrl,
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
      url: homeUrl,
      isPartOf: { "@type": "WebSite", url: homeUrl },
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
  locale?: Locale;
}) {
  const locale = input.locale ?? "pt";
  const url = absoluteUrl(localizePath(locale, input.path));
  const homeUrl = absoluteUrl(localizePath(locale, "/"));
  const workUrl = absoluteUrl(localizePath(locale, "/#trabalhos"));
  const inLanguage = locale === "en" ? "en" : "pt-BR";

  return [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: input.title,
      description: input.description,
      url,
      isPartOf: { "@type": "WebSite", url: homeUrl },
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
        url: homeUrl,
      },
      creator: {
        "@type": "Person",
        name: SITE_NAME,
        url: homeUrl,
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
          item: homeUrl,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Work",
          item: workUrl,
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
