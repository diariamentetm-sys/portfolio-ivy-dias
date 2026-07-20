import { Link, Navigate, useParams } from "react-router-dom";
import { CaseImage, CaseSection } from "../components/cases/CaseBlocks";
import { Footer } from "../components/layout/Footer";
import { PostItTag } from "../components/ui/PostItTag";
import { useContent } from "../content/ContentContext";
import { useLocale } from "../i18n/LocaleContext";

export function DynamicCasePage() {
  const { slug } = useParams();
  const { locale, t } = useLocale();
  const { content } = useContent();

  const project = content.projects.find(
    (item) => item.slug === slug && item.published,
  );

  if (!project) {
    return <Navigate to="/" replace />;
  }

  const copy = project[locale];

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-950">
      <div className="sticky top-0 z-40 flex items-center justify-between px-5 md:px-16 py-4 backdrop-blur-md bg-neutral-50/90 border-b border-neutral-200">
        <Link
          to="/#trabalhos"
          className="text-sm font-semibold text-neutral-950 hover:text-accent transition-colors"
        >
          {t.caseChrome.back}
        </Link>
        <div className="eyebrow hidden sm:block">{copy.breadcrumb}</div>
      </div>

      <header className="max-w-5xl mx-auto px-5 md:px-16 pt-16 md:pt-24 pb-10">
        <p className="eyebrow mb-6 text-accent">{copy.caseKicker}</p>
        <h1 className="display-h1 max-w-4xl">
          {copy.title}
          {copy.titleAccent ? (
            <span className="text-accent">{copy.titleAccent}</span>
          ) : null}
        </h1>
        <p className="mt-6 max-w-2xl body-lg">{copy.description}</p>
        <div className="mt-6 flex flex-wrap gap-2.5">
          {copy.tags.map((tag, index) => (
            <PostItTag key={tag} index={index}>
              {tag}
            </PostItTag>
          ))}
        </div>
      </header>

      <section className="max-w-5xl mx-auto px-5 md:px-16 pb-12 grid md:grid-cols-2 gap-8 md:gap-16">
        <div className="grid grid-cols-2 gap-px bg-neutral-200 border border-neutral-200 rounded-ui overflow-hidden self-start shadow-card">
          {copy.meta.map((item) => (
            <div key={item.k} className="bg-white p-5">
              <div className="eyebrow mb-1.5">{item.k}</div>
              <div className="text-sm font-medium text-neutral-950">{item.v}</div>
            </div>
          ))}
        </div>
        <div>
          <div className="eyebrow mb-4 text-accent">{t.caseChrome.aboutProject}</div>
          {copy.about.map((paragraph) => (
            <p key={paragraph.slice(0, 24)} className="body-md mb-4 last:mb-0">
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      {project.overviewImage ? (
        <section className="max-w-5xl mx-auto px-5 md:px-16 pb-4">
          <img
            src={project.overviewImage}
            alt={copy.title}
            className="block h-auto w-full rounded-2xl shadow-card bg-white"
          />
        </section>
      ) : null}

      {copy.sections.map((section) => (
        <CaseSection
          key={`${section.number}-${section.title}`}
          number={section.number}
          kicker={section.kicker}
          title={section.title}
        >
          <p className="max-w-3xl body-md whitespace-pre-line">{section.body}</p>
          {section.images?.length ? (
            <div
              className={
                section.images.length > 1
                  ? "mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
                  : "mt-6"
              }
            >
              {section.images.map((image) => (
                <CaseImage
                  key={image.src}
                  src={image.src}
                  alt={image.alt ?? section.title}
                />
              ))}
            </div>
          ) : null}
        </CaseSection>
      ))}

      <div className="max-w-5xl mx-auto px-5 md:px-16 py-12 flex flex-wrap gap-3 border-t border-neutral-200">
        <Link to="/#trabalhos" className="btn-ghost">
          {t.caseChrome.allWork}
        </Link>
      </div>

      <div className="border-t border-neutral-200">
        <Footer />
      </div>
    </div>
  );
}
