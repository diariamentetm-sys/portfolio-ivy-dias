import { Link, useLocation } from "react-router-dom";
import { useLocale } from "../../i18n/LocaleContext";

const navItems = [
  { href: "/#sobre", key: "about" as const },
  { href: "/#especialidades", key: "specialties" as const },
  { href: "/#trabalhos", key: "work" as const },
  { href: "/#depoimentos", key: "testimonials" as const },
  { href: "/#trajetoria", key: "timeline" as const },
] as const;

export function Navbar() {
  const { locale, setLocale, t } = useLocale();
  const { pathname } = useLocation();
  const isHome = pathname === "/";

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 md:px-16 py-5 backdrop-blur-md bg-neutral-50/90 border-b border-neutral-200"
      aria-label={locale === "en" ? "Primary" : "Principal"}
    >
      <Link to="/" className="inline-flex items-center shrink-0" aria-label="Ivy DC - CX — Home">
        <img
          src="/images/ivy-dc-cx-logo.png"
          alt="Ivy DC - CX"
          width={120}
          height={36}
          className="block h-8 md:h-9 w-auto"
          decoding="async"
        />
      </Link>
      <div className="flex items-center gap-3 md:gap-6 text-sm font-medium">
        {navItems.map((link) => (
          <a
            key={link.href}
            href={isHome ? link.href.replace(/^\//, "") : link.href}
            className="hidden sm:inline text-neutral-500 hover:text-neutral-950 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            {t.nav[link.key]}
          </a>
        ))}
        <div
          className="flex items-center gap-1 rounded-full border border-neutral-200 bg-white p-1"
          role="group"
          aria-label={locale === "en" ? "Language" : "Idioma"}
        >
          <button
            type="button"
            onClick={() => setLocale("en")}
            className={`px-2.5 py-1 rounded-full text-xs font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
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
            onClick={() => setLocale("pt")}
            className={`px-2.5 py-1 rounded-full text-xs font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
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
          href={isHome ? "#contato" : "/#contato"}
          className="btn-primary px-4 py-2 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          {t.nav.contact}
        </a>
      </div>
    </nav>
  );
}
