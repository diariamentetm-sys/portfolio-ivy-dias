import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import type { CaseStudyConfig } from "../../types/portfolio";
import { useLocale } from "../../i18n/LocaleContext";
import { PostItTag } from "../ui/PostItTag";
import { Footer } from "./Footer";

type CaseStudyLayoutProps = {
  config: CaseStudyConfig;
  children: ReactNode;
};

export function CaseStudyLayout({ config, children }: CaseStudyLayoutProps) {
  const { t } = useLocale();

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-950">
      <div className="sticky top-0 z-40 flex items-center justify-between px-5 md:px-16 py-4 backdrop-blur-md bg-neutral-50/90 border-b border-neutral-200">
        <Link
          to="/#trabalhos"
          className="text-sm font-semibold text-neutral-950 hover:text-accent transition-colors"
        >
          {t.caseChrome.back}
        </Link>
        <div className="eyebrow hidden sm:block">{config.breadcrumb}</div>
      </div>

      <header className="max-w-5xl mx-auto px-5 md:px-16 pt-16 md:pt-24 pb-10">
        <p className="eyebrow mb-6 text-accent">{config.kicker}</p>
        <h1 className="display-h1 max-w-4xl">
          {config.title}
          {config.titleAccent && (
            <span className="text-accent">{config.titleAccent}</span>
          )}
        </h1>
        <p className="mt-6 max-w-2xl body-lg">{config.subtitle}</p>
        <div className="mt-6 flex flex-wrap gap-2.5">
          {config.tags.map((tag, index) => (
            <PostItTag key={tag} index={index}>
              {tag}
            </PostItTag>
          ))}
        </div>
        {config.headerStats && (
          <div className="mt-8 flex flex-wrap gap-6 md:gap-14 pt-7 border-t border-neutral-200">
            {config.headerStats.map((stat) => (
              <div key={stat.label}>
                <div className="stat-value text-accent">{stat.value}</div>
                <div className="text-xs text-neutral-500 mt-1.5">{stat.label}</div>
              </div>
            ))}
          </div>
        )}
      </header>

      <section className="max-w-5xl mx-auto px-5 md:px-16 pb-12 grid md:grid-cols-2 gap-8 md:gap-16">
        <div className="grid grid-cols-2 gap-px bg-neutral-200 border border-neutral-200 rounded-ui overflow-hidden self-start shadow-card">
          {config.meta.map((item) => (
            <div key={item.k} className="bg-white p-5">
              <div className="eyebrow mb-1.5">{item.k}</div>
              <div className="text-sm font-medium text-neutral-950">{item.v}</div>
            </div>
          ))}
        </div>
        <div>
          <div className="eyebrow mb-4 text-accent">{t.caseChrome.aboutProject}</div>
          {config.about.map((paragraph) => (
            <p key={paragraph.slice(0, 24)} className="body-md mb-4 last:mb-0">
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      {children}

      <div className="max-w-5xl mx-auto px-5 md:px-16 py-12 flex flex-wrap gap-3 border-t border-neutral-200">
        <Link to="/#trabalhos" className="btn-ghost">
          {t.caseChrome.allWork}
        </Link>
        {config.next && (
          <Link to={config.next.path} className="btn-primary">
            {config.next.label}
          </Link>
        )}
      </div>

      <div className="border-t border-neutral-200">
        <Footer />
      </div>
    </div>
  );
}
