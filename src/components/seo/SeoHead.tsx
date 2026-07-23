import { useEffect } from "react";
import {
  absoluteImageUrl,
  absoluteUrl,
  SITE_NAME,
  TWITTER_HANDLE,
  type SeoPageConfig,
} from "../../seo/siteConfig";

const MANAGED_META = [
  "description",
  "robots",
  "og:title",
  "og:description",
  "og:url",
  "og:type",
  "og:image",
  "og:site_name",
  "og:locale",
  "twitter:card",
  "twitter:title",
  "twitter:description",
  "twitter:image",
  "twitter:site",
] as const;

function upsertMeta(attr: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(
    `meta[${attr}="${key}"]`,
  );
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function upsertLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

function upsertJsonLd(id: string, data: unknown) {
  let el = document.getElementById(id) as HTMLScriptElement | null;
  if (!el) {
    el = document.createElement("script");
    el.id = id;
    el.type = "application/ld+json";
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(data);
}

type SeoHeadProps = SeoPageConfig & {
  locale?: "pt" | "en";
};

/** Updates document head for the active route (SPA-friendly SEO). */
export function SeoHead({
  title,
  description,
  path,
  image,
  type = "website",
  robots = "index, follow",
  jsonLd,
  locale = "pt",
}: SeoHeadProps) {
  useEffect(() => {
    const url = absoluteUrl(path);
    const imageUrl = absoluteImageUrl(image);
    const fullTitle = title.includes(SITE_NAME) ? title : `${title} · ${SITE_NAME}`;

    document.title = fullTitle;

    upsertMeta("name", "description", description);
    upsertMeta("name", "robots", robots);
    upsertMeta("property", "og:title", fullTitle);
    upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:url", url);
    upsertMeta("property", "og:type", type);
    upsertMeta("property", "og:image", imageUrl);
    upsertMeta("property", "og:site_name", SITE_NAME);
    upsertMeta(
      "property",
      "og:locale",
      locale === "pt" ? "pt_BR" : "en_US",
    );
    upsertMeta("name", "twitter:card", "summary_large_image");
    upsertMeta("name", "twitter:title", fullTitle);
    upsertMeta("name", "twitter:description", description);
    upsertMeta("name", "twitter:image", imageUrl);
    upsertMeta("name", "twitter:site", TWITTER_HANDLE);

    upsertLink("canonical", url);

    if (jsonLd) {
      upsertJsonLd("seo-json-ld", Array.isArray(jsonLd) ? jsonLd : [jsonLd]);
    }

    return () => {
      // Keep last page tags; next route will overwrite. Remove JSON-LD if none provided next.
    };
  }, [title, description, path, image, type, robots, jsonLd, locale]);

  return null;
}

/** Ensures default head tags exist even before React hydrates a route. */
export function ensureBaselineHeadTags() {
  for (const key of MANAGED_META) {
    const attr = key.startsWith("og:") ? "property" : "name";
    if (!document.head.querySelector(`meta[${attr}="${key}"]`)) {
      const el = document.createElement("meta");
      el.setAttribute(attr, key);
      document.head.appendChild(el);
    }
  }
}
