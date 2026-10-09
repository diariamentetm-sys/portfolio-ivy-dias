import { useLayoutEffect } from "react";
import { Navigate, Outlet, useLocation, useParams } from "react-router-dom";
import { useLocale } from "./LocaleContext";
import { isLocale, localizePath } from "./localeRouting";

/** Syncs `:locale` route param with LocaleContext and renders nested pages. */
export function LocaleLayout() {
  const { locale: localeParam } = useParams();
  const { locale, setLocale } = useLocale();
  const location = useLocation();

  useLayoutEffect(() => {
    if (isLocale(localeParam) && localeParam !== locale) {
      setLocale(localeParam);
    }
  }, [localeParam, locale, setLocale]);

  if (!isLocale(localeParam)) {
    return (
      <Navigate
        to={localizePath("pt", `${location.pathname}${location.search}${location.hash}`)}
        replace
      />
    );
  }

  return <Outlet />;
}
