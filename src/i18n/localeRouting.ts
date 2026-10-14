import type { Locale } from "./types";

export const LOCALES = ["pt", "en"] as const;
export const LOCALE_PREFIX_RE = /^\/(pt|en)(?=\/|$)/;

export function isLocale(value: string | undefined | null): value is Locale {
  return value === "pt" || value === "en";
}

/** Prefer stored locale, otherwise Portuguese (x-default). */
export function readPreferredLocale(): Locale {
  try {
    const stored = localStorage.getItem("ivy-portfolio-locale");
    if (isLocale(stored)) return stored;
  } catch {
    /* ignore */
  }
  return "pt";
}

/**
 * Build a locale-prefixed path.
 * Examples:
 *  localizePath("pt", "/") -> "/pt"
 *  localizePath("en", "/cases/cashlog") -> "/en/cases/cashlog"
 *  localizePath("pt", "/#trabalhos") -> "/pt#trabalhos"
 *  localizePath("pt", "/entre-jornadas?tag=cx") -> "/pt/entre-jornadas?tag=cx"
 */
export function localizePath(locale: Locale, path: string): string {
  if (!path) return `/${locale}`;
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  if (path.startsWith("#")) return `/${locale}${path}`;
  if (path.startsWith("?")) return `/${locale}${path}`;

  const hashIndex = path.indexOf("#");
  const beforeHash = hashIndex >= 0 ? path.slice(0, hashIndex) : path;
  const hash = hashIndex >= 0 ? path.slice(hashIndex) : "";

  const queryIndex = beforeHash.indexOf("?");
  const pathname = queryIndex >= 0 ? beforeHash.slice(0, queryIndex) : beforeHash;
  const search = queryIndex >= 0 ? beforeHash.slice(queryIndex) : "";

  let clean = pathname.replace(LOCALE_PREFIX_RE, "") || "/";
  if (!clean.startsWith("/")) clean = `/${clean}`;
  clean = clean.replace(/\/+$/, "") || "/";

  if (clean === "/") return `/${locale}${search}${hash}`;
  return `/${locale}${clean}${search}${hash}`;
}

export function stripLocalePrefix(pathname: string): string {
  const stripped = pathname.replace(LOCALE_PREFIX_RE, "");
  return stripped === "" ? "/" : stripped;
}

export function swapLocaleInPath(pathname: string, nextLocale: Locale): string {
  return localizePath(nextLocale, stripLocalePrefix(pathname));
}

export function getLocaleFromPathname(pathname: string): Locale | null {
  const match = pathname.match(LOCALE_PREFIX_RE);
  if (!match) return null;
  return isLocale(match[1]) ? match[1] : null;
}
