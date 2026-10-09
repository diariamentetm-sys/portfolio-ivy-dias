import { Navigate, useLocation } from "react-router-dom";
import { localizePath, readPreferredLocale } from "./localeRouting";

/** Sends unprefixed legacy URLs to the preferred locale prefix. */
export function LegacyLocaleRedirect() {
  const location = useLocation();
  const locale = readPreferredLocale();
  const target = localizePath(
    locale,
    `${location.pathname}${location.search}${location.hash}`,
  );
  return <Navigate to={target} replace />;
}

export function RootLocaleRedirect() {
  const locale = readPreferredLocale();
  return <Navigate to={`/${locale}`} replace />;
}
