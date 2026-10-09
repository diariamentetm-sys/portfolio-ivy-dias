import { useEffect, useId, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useLocale } from "../../i18n/LocaleContext";
import {
  getLocaleFromPathname,
  localizePath,
  swapLocaleInPath,
} from "../../i18n/localeRouting";
import { useLocalizedPath } from "../../i18n/useLocalizedPath";
import type { Locale } from "../../i18n/types";

const navItems = [
  { href: "/#sobre", key: "about" as const },
  { href: "/#especialidades", key: "specialties" as const },
  { href: "/#trabalhos", key: "work" as const },
  { href: "/entre-jornadas", key: "blog" as const, route: true },
  { href: "/#trajetoria", key: "timeline" as const },
  { href: "/#contato", key: "contact" as const },
] as const;

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      className="block"
    >
      {open ? (
        <path
          d="M4 4l12 12M16 4L4 16"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
        />
      ) : (
        <>
          <path
            d="M3 5h14"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
          />
          <path
            d="M3 10h14"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
          />
          <path
            d="M3 15h14"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
          />
        </>
      )}
    </svg>
  );
}

export function Navbar() {
  const { locale, setLocale, t } = useLocale();
  const { pathname, search, hash } = useLocation();
  const navigate = useNavigate();
  const lp = useLocalizedPath();
  const localeInPath = getLocaleFromPathname(pathname);
  const isHome =
    pathname === `/${locale}` ||
    pathname === `/${locale}/` ||
    pathname === "/pt" ||
    pathname === "/en";
  const [menuOpen, setMenuOpen] = useState(false);
  const menuId = useId();

  const resolveHref = (href: string) => {
    const localized = lp(href);
    if (isHome && href.startsWith("/#")) {
      return href.slice(1); // "#sobre" on the localized home
    }
    return localized;
  };

  const switchLocale = (next: Locale) => {
    setLocale(next);
    const basePath = localeInPath
      ? swapLocaleInPath(pathname, next)
      : localizePath(next, pathname);
    navigate(`${basePath}${search}${hash}`);
  };

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  const linkClass =
    "text-neutral-500 hover:text-neutral-950 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 border-b border-neutral-200 backdrop-blur-md bg-neutral-50/90"
      aria-label={locale === "en" ? "Primary" : "Principal"}
    >
      <div className="flex items-center justify-between px-5 md:px-16 py-5">
        <Link
          to={lp("/")}
          className="inline-flex items-center shrink-0"
          aria-label="Ivy DC - CX — Home"
          onClick={() => setMenuOpen(false)}
        >
          <img
            src="/images/ivy-dc-cx-logo.png"
            alt="Ivy DC - CX"
            width={120}
            height={36}
            className="block h-8 md:h-9 w-auto"
            decoding="async"
          />
        </Link>

        <div className="flex items-center gap-2 sm:gap-3 md:gap-6 text-sm font-medium">
          <div className="hidden lg:flex items-center gap-6">
            {navItems
              .filter((link) => link.key !== "contact")
              .map((link) =>
                "route" in link && link.route ? (
                  <Link
                    key={link.href}
                    to={lp(link.href)}
                    className={linkClass}
                  >
                    {t.nav[link.key]}
                  </Link>
                ) : (
                  <a
                    key={link.href}
                    href={resolveHref(link.href)}
                    className={linkClass}
                  >
                    {t.nav[link.key]}
                  </a>
                ),
              )}
          </div>

          <div
            className="flex items-center gap-0.5 rounded-full border border-neutral-200 bg-white p-0.5"
            role="group"
            aria-label={locale === "en" ? "Language" : "Idioma"}
          >
            <button
              type="button"
              onClick={() => switchLocale("en")}
              className={`px-1.5 py-0.5 rounded-full text-[10px] leading-none font-semibold tracking-wide transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
                locale === "en"
                  ? "bg-neutral-950 text-white"
                  : "text-neutral-500 hover:text-neutral-950"
              }`}
              aria-pressed={locale === "en"}
              aria-label="English"
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => switchLocale("pt")}
              className={`px-1.5 py-0.5 rounded-full text-[10px] leading-none font-semibold tracking-wide transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
                locale === "pt"
                  ? "bg-neutral-950 text-white"
                  : "text-neutral-500 hover:text-neutral-950"
              }`}
              aria-pressed={locale === "pt"}
              aria-label="Português"
            >
              PT
            </button>
          </div>

          <a
            href={isHome ? "#contato" : lp("/#contato")}
            className="hidden sm:inline-flex btn-primary px-4 py-2 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            onClick={() => setMenuOpen(false)}
          >
            {t.nav.contact}
          </a>

          <button
            type="button"
            className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-950 transition-colors hover:border-accent hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            aria-expanded={menuOpen}
            aria-controls={menuId}
            aria-label={
              menuOpen
                ? locale === "en"
                  ? "Close menu"
                  : "Fechar menu"
                : locale === "en"
                  ? "Open menu"
                  : "Abrir menu"
            }
            onClick={() => setMenuOpen((open) => !open)}
          >
            <MenuIcon open={menuOpen} />
          </button>
        </div>
      </div>

      <div
        id={menuId}
        className={`lg:hidden overflow-hidden border-t border-neutral-200 bg-neutral-50/98 transition-[max-height,opacity] duration-300 ease-out ${
          menuOpen
            ? "max-h-[28rem] opacity-100"
            : "max-h-0 opacity-0 border-t-0 pointer-events-none"
        }`}
        aria-hidden={!menuOpen}
      >
        <ul className="flex flex-col px-5 md:px-16 py-4 gap-1">
          {navItems.map((link) => (
            <li key={link.href}>
              {"route" in link && link.route ? (
                <Link
                  to={lp(link.href)}
                  tabIndex={menuOpen ? 0 : -1}
                  className="block rounded-xl px-3 py-3 text-base font-semibold text-neutral-950 hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                  onClick={() => setMenuOpen(false)}
                >
                  {t.nav[link.key]}
                </Link>
              ) : (
                <a
                  href={resolveHref(link.href)}
                  tabIndex={menuOpen ? 0 : -1}
                  className="block rounded-xl px-3 py-3 text-base font-semibold text-neutral-950 hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                  onClick={() => setMenuOpen(false)}
                >
                  {t.nav[link.key]}
                </a>
              )}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
