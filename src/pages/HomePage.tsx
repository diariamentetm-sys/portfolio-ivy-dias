import { FormEvent, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { QuotesCarousel } from "../components/cases/QuotesCarousel";
import { Footer } from "../components/layout/Footer";
import { Navbar } from "../components/layout/Navbar";
import { SpecialtyStack } from "../components/home/SpecialtyStack";
import { SeoHead } from "../components/seo/SeoHead";
import { PostItTag } from "../components/ui/PostItTag";
import { Reveal } from "../components/ui/Reveal";
import { useContent } from "../content/ContentContext";
import { casePostItStyles } from "../data/portfolio";
import {
  resolveWorkCategory,
  WORK_CATEGORIES,
  type WorkCategoryFilter,
} from "../data/workCategories";
import { useLocale } from "../i18n/LocaleContext";
import { sendContactMessage } from "../lib/sendContact";
import { homePageSeo } from "../seo/pageMeta";
import { buildPersonWebsiteJsonLd } from "../seo/siteConfig";

const heroTagStyles = [
  { tone: "post-it-yellow", rotate: "-rotate-2" },
  { tone: "post-it-blue", rotate: "rotate-2" },
  { tone: "post-it-coral", rotate: "-rotate-1" },
] as const;

const heroStatStyles = [
  { tone: "post-it-mint", rotate: "rotate-1" },
  { tone: "post-it-lavender", rotate: "-rotate-2" },
  { tone: "post-it-peach", rotate: "rotate-2" },
] as const;

const contactTagStyles = [
  { tone: "post-it-yellow", rotate: "-rotate-2" },
  { tone: "post-it-mint", rotate: "rotate-2" },
  { tone: "post-it-blue", rotate: "-rotate-1" },
  { tone: "post-it-coral", rotate: "rotate-1" },
] as const;

export function HomePage() {
  const { locale, t } = useLocale();
  const { content } = useContent();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [formError, setFormError] = useState("");
  const [workFilter, setWorkFilter] = useState<WorkCategoryFilter>("all");

  const hero = content.heroCopy[locale];
  const specialties = t.specialties.items;
  const testimonials = t.testimonials.items;
  const timeline = t.timeline.items;

  const workCases = useMemo(() => {
    const publishedSlugs = new Set(
      content.projects.filter((project) => project.published).map((project) => project.slug),
    );
    const custom = content.projects
      .filter((project) => project.published)
      .map((project) => {
        const copy = project[locale];
        return {
          id: project.slug,
          n: project.n,
          kicker: copy.kicker,
          subtitle: copy.subtitle,
          title: `${copy.title}${copy.titleAccent ?? ""}`.trim(),
          description: copy.description,
          path: `/cases/${project.slug}`,
          category: resolveWorkCategory(project.slug, project.category),
        };
      })
      .sort((a, b) => a.n.localeCompare(b.n, undefined, { numeric: true }));
    const legacy = t.work.cases
      .filter((item) => !publishedSlugs.has(item.id))
      .map((item) => ({
        ...item,
        category: resolveWorkCategory(item.id),
      }));
    return [...custom, ...legacy];
  }, [content.projects, locale, t.work.cases]);

  const filteredWorkCases = useMemo(() => {
    if (workFilter === "all") return workCases;
    return workCases.filter((item) => item.category === workFilter);
  }, [workCases, workFilter]);

  const workFilters: { id: WorkCategoryFilter; label: string }[] = [
    { id: "all", label: t.work.filterAll },
    ...WORK_CATEGORIES.map((id) => ({
      id,
      label: t.work.categories[id],
    })),
  ];

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (status === "loading") return;

    setStatus("loading");
    setFormError("");

    const result = await sendContactMessage({
      name: name.trim(),
      email: email.trim(),
      message: message.trim(),
      locale,
    });

    if (!result.ok) {
      setStatus("error");
      setFormError(result.error);
      return;
    }

    setStatus("success");
  }

  return (
    <div className="bg-neutral-50 relative">
      <SeoHead
        title={homePageSeo[locale].title}
        description={homePageSeo[locale].description}
        path="/"
        image={homePageSeo[locale].ogImage ?? content.heroImage}
        type="website"
        locale={locale}
        jsonLd={buildPersonWebsiteJsonLd({
          locale,
          title: homePageSeo[locale].title,
          description: homePageSeo[locale].description,
        })}
      />
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-neutral-950 focus:px-4 focus:py-2 focus:text-sm focus:text-white"
      >
        {locale === "en" ? "Skip to content" : "Ir para o conteúdo"}
      </a>
      <Navbar />

      <main id="conteudo">
      <header
        id="top"
        className="relative isolate overflow-hidden border-b border-neutral-200"
      >
        <div className="pointer-events-none absolute inset-y-0 right-0 w-full md:w-[58%] lg:w-[52%]">
          <img
            src={content.heroImage}
            alt={t.hero.imageAlt}
            width={1600}
            height={1200}
            className="h-full w-full object-cover object-[center_18%] scale-x-[-1] opacity-90 md:opacity-100"
            loading="eager"
            fetchPriority="high"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-neutral-50 via-neutral-50/85 to-neutral-50/20 md:from-neutral-50 md:via-neutral-50/70 md:to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-50 via-transparent to-neutral-50/40 md:hidden" />
        </div>

        <div className="relative z-10 px-5 md:px-16 pt-24 md:pt-28 pb-20 md:pb-28 max-w-7xl mx-auto">
          <Reveal className="max-w-xl lg:max-w-2xl">
            <div className="flex flex-wrap gap-2.5 mb-7">
              {t.hero.tags.map((tag, index) => (
                <span
                  key={tag}
                  className={`post-it post-it-tag ${heroTagStyles[index]?.tone ?? "post-it-yellow"} ${heroTagStyles[index]?.rotate ?? "rotate-1"}`}
                >
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="hero-h1">
              {hero.titleBefore}{" "}
              <span className="text-accent">{hero.titleAccent}</span>
            </h1>
            <p className="mt-8 max-w-xl body-lg">{hero.subtitle}</p>
            <div className="mt-10 flex flex-wrap gap-3.5">
              <a href="#trabalhos" className="btn-primary">
                {t.hero.ctaWork}
              </a>
              <a href="#contato" className="btn-secondary">
                {t.hero.ctaContact}
              </a>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <p className="text-sm font-semibold text-neutral-950">
                Ivy Dias de Campos
              </p>
              <span className="text-neutral-300" aria-hidden>
                ·
              </span>
              <p className="eyebrow normal-case tracking-normal">{t.hero.role}</p>
              <span className="post-it post-it-tag post-it-mint rotate-2 whitespace-nowrap">
                {t.hero.location}
              </span>
            </div>
          </Reveal>

          <Reveal
            delay={200}
            className="mt-14 md:mt-20 flex flex-wrap gap-4 md:gap-6 items-stretch border-t border-neutral-200/80 pt-8"
          >
            {t.hero.stats.map((stat, index) => (
              <div
                key={stat.label}
                className={`post-it post-it-stat ${heroStatStyles[index]?.tone ?? "post-it-mint"} ${heroStatStyles[index]?.rotate ?? "rotate-1"}`}
              >
                <div className="stat-value">{stat.value}</div>
                <div className="text-xs text-neutral-700 mt-1.5">{stat.label}</div>
              </div>
            ))}
          </Reveal>
        </div>
      </header>

      <section id="sobre" className="section-narrative bg-white">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 md:gap-20 items-start">
          <Reveal>
            <p className="eyebrow mb-5 text-accent">{t.about.eyebrow}</p>
            <h2 className="section-h2">{t.about.title}</h2>
            <div className="mt-10 flex flex-wrap gap-2.5">
              {t.about.languages.map((lang, index) => (
                <span
                  key={lang}
                  className={index === 0 ? "chip-filled" : "chip"}
                >
                  {lang}
                </span>
              ))}
            </div>
          </Reveal>
          <Reveal delay={100} className="body-md md:text-lg">
            <p>{t.about.p1}</p>
            <p className="mt-5">{t.about.p2}</p>
            <div className="mt-9 pt-7 border-t border-neutral-200">
              <p className="eyebrow mb-3 text-accent">{t.about.brandsLabel}</p>
              <p className="text-sm leading-loose text-neutral-500">
                {t.about.brands}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="especialidades" className="section-narrative overflow-visible">
        <div className="max-w-7xl mx-auto overflow-visible">
          <Reveal className="max-w-3xl">
            <p className="eyebrow mb-5">{t.specialties.eyebrow}</p>
            <h2 className="section-h2">{t.specialties.title}</h2>
            <p className="mt-5 body-md max-w-2xl">{t.specialties.intro}</p>
          </Reveal>
          <SpecialtyStack items={specialties} />
        </div>
      </section>

      <section id="trabalhos" className="section-narrative bg-white">
        <div className="max-w-7xl mx-auto">
          <Reveal className="flex flex-wrap gap-5 items-end justify-between">
            <div className="max-w-3xl">
              <p className="eyebrow mb-5">{t.work.eyebrow}</p>
              <h2 className="section-h2">{t.work.title}</h2>
              <p className="mt-5 body-md max-w-2xl">{t.work.intro}</p>
            </div>
            <p className="eyebrow">
              {String(filteredWorkCases.length).padStart(2, "0")}{" "}
              {locale === "en" ? "cases" : "casos"}
            </p>
          </Reveal>

          <Reveal className="mt-8 md:mt-10">
            <div
              role="tablist"
              aria-label={locale === "en" ? "Filter work by discipline" : "Filtrar trabalhos por disciplina"}
              className="flex flex-wrap gap-2.5 md:gap-3"
            >
              {workFilters.map((filter, index) => {
                const active = workFilter === filter.id;
                const tone = casePostItStyles[index % casePostItStyles.length];
                return (
                  <button
                    key={filter.id}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setWorkFilter(filter.id)}
                    className={`post-it post-it-tag transition-[transform,opacity] duration-200 ${tone.tone} ${
                      active
                        ? `${tone.tagRotate} opacity-100`
                        : "opacity-40 hover:opacity-70"
                    }`}
                  >
                    {filter.label}
                  </button>
                );
              })}
            </div>
          </Reveal>

          <div className="mt-10 md:mt-12 grid sm:grid-cols-2 gap-5 md:gap-6">
            {filteredWorkCases.map((item, index) => {
              const accent = casePostItStyles[index % casePostItStyles.length];
              return (
                <Reveal key={item.id} delay={index * 60} className="h-full">
                  <Link to={item.path} className="group block h-full">
                    <article className="case-card flex h-full flex-col p-6 md:p-8 group-hover:-translate-y-1">
                      <span
                        aria-hidden
                        className={`case-card-accent ${accent.tone}`}
                      />
                      <div className="flex flex-wrap gap-3 items-center mb-4">
                        <span className="text-4xl md:text-5xl font-extrabold leading-none text-neutral-200">
                          {item.n}
                        </span>
                        <div className="flex flex-col gap-2 min-w-0">
                          <span
                            className={`post-it post-it-tag w-fit ${accent.tone} ${accent.tagRotate}`}
                          >
                            {item.kicker}
                          </span>
                          <p className="text-xs text-neutral-500">{item.subtitle}</p>
                        </div>
                      </div>
                      <h3 className="text-xl md:text-2xl font-bold tracking-tight text-neutral-950 text-balance">
                        {item.title}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-neutral-500 text-pretty line-clamp-3 flex-1">
                        {item.description}
                      </p>
                      <span className="inline-flex mt-6 btn-primary text-sm px-5 py-2.5 w-fit">
                        {t.work.cta}
                      </span>
                    </article>
                  </Link>
                </Reveal>
              );
            })}
          </div>

          <Reveal className="mt-6 md:mt-8 rounded-card p-8 md:p-14 section-inverted">
            <div className="mb-5">
              <span className="eyebrow text-white/50">{t.work.industryEyebrow}</span>
            </div>
            <h3 className="text-3xl md:text-4xl font-bold leading-tight max-w-lg text-white">
              {t.work.industryTitle}
            </h3>
            <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {t.work.industries.map((group) => (
                <div key={group.label}>
                  <p className="eyebrow text-accent mb-2">{group.label}</p>
                  <p className="text-sm leading-relaxed text-white/70">
                    {group.brands}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section id="depoimentos" className="section-narrative !py-0">
        <div className="max-w-7xl mx-auto px-5 md:px-8 pt-16 md:pt-24 pb-8">
          <Reveal className="max-w-3xl">
            <p className="eyebrow mb-5">{t.testimonials.eyebrow}</p>
            <h2 className="section-h2">{t.testimonials.title}</h2>
            <p className="mt-5 body-md">{t.testimonials.intro}</p>
          </Reveal>
        </div>

        <QuotesCarousel
          label={t.testimonials.carouselLabel}
          quotes={testimonials.map((item) => ({
            text: item.quote,
            name: item.name,
            role: item.role,
          }))}
          prevLabel={t.testimonials.prevLabel}
          nextLabel={t.testimonials.nextLabel}
        />

        <div className="max-w-7xl mx-auto px-5 md:px-8 pb-16 md:pb-24 pt-8">
          <Reveal>
            <a
              href="https://www.linkedin.com/in/ivydiasdecampos"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost text-sm"
            >
              {t.testimonials.linkedinCta}
            </a>
          </Reveal>
        </div>
      </section>

      <section id="trajetoria" className="section-narrative bg-white">
        <div className="max-w-3xl mx-auto">
          <Reveal className="mb-14">
            <p className="eyebrow mb-5">{t.timeline.eyebrow}</p>
            <h2 className="section-h2">{t.timeline.title}</h2>
          </Reveal>
          {timeline.map((item, index) => (
            <Reveal key={item.company} delay={index * 50}>
              <div className="grid grid-cols-[minmax(100px,150px)_1fr] gap-4 md:gap-10 py-6 border-t border-neutral-200 items-start">
                <div className="pt-0.5">
                  <PostItTag index={index} className="w-fit max-w-full whitespace-normal text-left leading-snug">
                    {item.period}
                  </PostItTag>
                </div>
                <div>
                  <div className="flex flex-wrap items-baseline gap-2.5">
                    <h3 className="text-lg md:text-xl font-semibold text-neutral-950">
                      {item.company}
                    </h3>
                    <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                    <span className="text-sm text-neutral-500">{item.role}</span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-neutral-500 text-pretty">
                    {item.scope}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="contato" className="section-inverted py-20 md:py-32">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 md:gap-20 items-start">
          <Reveal>
            <div className="flex flex-wrap items-end gap-6 mb-8">
              <div className="relative">
                <img
                  src={content.contactPhoto}
                  alt={t.contact.photoAlt}
                  className="w-28 h-28 md:w-36 md:h-36 rounded-full object-cover object-[center_18%] border-4 border-white/20 shadow-[0_8px_30px_rgba(0,0,0,0.35)]"
                />
                <span className="post-it post-it-tag post-it-yellow rotate-3 absolute -bottom-2 -right-3">
                  CX
                </span>
              </div>
              <div className="flex flex-wrap gap-2.5 pb-2">
                {t.contact.tags.map((tag, index) => (
                  <span
                    key={tag}
                    className={`post-it post-it-tag ${contactTagStyles[index]?.tone ?? "post-it-mint"} ${contactTagStyles[index]?.rotate ?? "rotate-1"}`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <p className="eyebrow mb-5 text-white/50">{t.contact.eyebrow}</p>
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-extrabold leading-none tracking-tight text-white text-balance">
              {t.contact.title}
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-white/70 max-w-md text-pretty">
              {t.contact.subtitle}
            </p>
            <div className="mt-9 flex flex-col gap-3.5">
              {[
                {
                  href: "mailto:ivy.dias.de.campos@gmail.com",
                  label: "ivy.dias.de.campos@gmail.com",
                },
                {
                  href: "https://wa.me/351961954617",
                  label: "WhatsApp / +351 961 954 617",
                },
                {
                  href: "https://www.linkedin.com/in/ivydiasdecampos",
                  label: "LinkedIn / in/ivydiasdecampos",
                },
                {
                  href: "https://www.behance.com/ivydc",
                  label: "Behance / ivydc",
                },
              ].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    link.href.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                  className="flex items-center gap-3 text-base text-white/80 hover:text-white transition-colors"
                >
                  <span className="font-mono text-xs text-accent">→</span>
                  {link.label}
                </a>
              ))}
            </div>
          </Reveal>

          <Reveal delay={100}>
            {status === "success" ? (
              <div className="card p-10 text-center">
                <div className="text-5xl font-extrabold text-accent">✓</div>
                <h3 className="mt-4 text-3xl font-bold text-neutral-950">
                  {t.contact.successTitle}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-neutral-500">
                  {t.contact.successBody.replace(
                    "{name}",
                    name.trim() || (locale === "en" ? "soon" : "até já"),
                  )}
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="card p-7 md:p-10 flex flex-col gap-5 relative overflow-visible"
              >
                <PostItTag index={0} className="absolute -top-3 right-6">
                  {locale === "en" ? "Let's talk" : "Vamos falar"}
                </PostItTag>
                {[
                  {
                    id: "name",
                    label: t.contact.formName,
                    type: "text",
                    value: name,
                    onChange: setName,
                    placeholder: t.contact.namePlaceholder,
                  },
                  {
                    id: "email",
                    label: t.contact.formEmail,
                    type: "email",
                    value: email,
                    onChange: setEmail,
                    placeholder: t.contact.emailPlaceholder,
                  },
                ].map((field) => (
                  <label key={field.id} className="flex flex-col gap-2">
                    <span className="eyebrow">{field.label}</span>
                    <input
                      required
                      type={field.type}
                      value={field.value}
                      onChange={(event) => field.onChange(event.target.value)}
                      placeholder={field.placeholder}
                      className="input-field"
                    />
                  </label>
                ))}
                <label className="flex flex-col gap-2">
                  <span className="eyebrow">{t.contact.formMessage}</span>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                    placeholder={t.contact.messagePlaceholder}
                    className="input-field resize-y leading-relaxed"
                  />
                </label>
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="btn-primary mt-1 disabled:opacity-70"
                >
                  {status === "loading"
                    ? t.contact.submitting
                    : t.contact.submit}
                </button>
                {status === "error" && (
                  <p className="text-sm text-error text-center">
                    {t.contact.formError}
                    {formError ? ` (${formError})` : ""}
                  </p>
                )}
                <p className="text-xs text-center text-neutral-500 leading-relaxed">
                  {t.contact.formHint}
                </p>
              </form>
            )}
          </Reveal>
        </div>
        <Footer inverted />
      </section>
      </main>
    </div>
  );
}
