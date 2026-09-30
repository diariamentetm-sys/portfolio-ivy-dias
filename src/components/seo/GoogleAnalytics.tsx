import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID?.toString().trim();

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

function ensureGtag() {
  if (!GA_MEASUREMENT_ID || typeof window === "undefined") return false;
  if (typeof window.gtag === "function") return true;

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer?.push(args);
  };
  window.gtag("js", new Date());
  window.gtag("config", GA_MEASUREMENT_ID, { send_page_view: false });

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);
  return true;
}

/** Loads GA4 when VITE_GA_MEASUREMENT_ID is set and tracks SPA route changes. */
export function GoogleAnalytics() {
  const location = useLocation();

  useEffect(() => {
    if (!ensureGtag() || !GA_MEASUREMENT_ID || !window.gtag) return;

    const pagePath = `${location.pathname}${location.search}`;
    window.gtag("event", "page_view", {
      page_path: pagePath,
      page_title: document.title,
      page_location: window.location.href,
    });
  }, [location.pathname, location.search]);

  return null;
}
