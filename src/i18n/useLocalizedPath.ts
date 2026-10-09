import { useCallback } from "react";
import { useLocale } from "./LocaleContext";
import { localizePath } from "./localeRouting";

/** Prefix the current locale onto an internal path. */
export function useLocalizedPath() {
  const { locale } = useLocale();
  return useCallback((path: string) => localizePath(locale, path), [locale]);
}
