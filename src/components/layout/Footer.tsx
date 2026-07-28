import { useLocale } from "../../i18n/LocaleContext";

export function Footer({ inverted = false }: { inverted?: boolean }) {
  const year = new Date().getFullYear();
  const { t } = useLocale();

  return (
    <footer
      className={`px-5 md:px-16 py-8 max-w-7xl mx-auto flex flex-wrap gap-4 items-center justify-between ${
        inverted ? "text-white/70" : "border-t border-neutral-200 text-neutral-500"
      }`}
    >
      <div className="flex items-center">
        <img
          src="/images/ivy-dc-logo-white.png"
          alt="IvyDC"
          width={140}
          height={40}
          className={`block h-8 md:h-9 w-auto ${inverted ? "" : "invert"}`}
          decoding="async"
        />
      </div>
      <div className="text-sm">
        {t.footer.role} · © {year}
      </div>
    </footer>
  );
}
