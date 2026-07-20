import { CaseBlockSection, CaseImage } from "../components/cases/CaseBlocks";
import { CaseStudyLayout } from "../components/layout/CaseStudyLayout";
import { PostItTag, postItTone } from "../components/ui/PostItTag";
import {
  caseStudyConfigs,
  etituloCaseDataContent,
  etituloPageContent,
} from "../data/casePagesContent";
import { etituloData } from "../data/caseStudies";
import { useLocale } from "../i18n/LocaleContext";

export function EtituloPage() {
  const { locale } = useLocale();
  const config = caseStudyConfigs[locale].etitulo;
  const page = etituloPageContent[locale];
  const caseData = etituloCaseDataContent[locale];

  const personas = etituloData.personas.map((persona, index) => ({
    ...caseData.personas[index],
    img: persona.img,
  }));

  return (
    <CaseStudyLayout config={config}>
      <section className="max-w-5xl mx-auto px-5 md:px-16 pb-4">
        <CaseImage
          src={etituloData.overviewImg}
          alt={caseData.overviewImgAlt}
          fill
          aspect="aspect-[2528/1328]"
          priority
        />
      </section>

      <CaseBlockSection
        label={page.sections.s01.label}
        title={page.sections.s01.title}
      >
        <div className="grid md:grid-cols-2 gap-8 md:gap-14">
          <div>
            <p className="body-md">{page.sections.s01.body}</p>
            <div className="mt-6 grid grid-cols-2 gap-5">
              {page.sections.s01.metaLabels.map((item) => (
                <div key={item.k}>
                  <p className="eyebrow mb-1.5">{item.k}</p>
                  <p className="text-[15px] font-medium text-neutral-950">{item.v}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="card p-7 bg-neutral-950 text-white">
            <p className="eyebrow mb-4 text-white/50">
              {page.sections.s01.impactLabel}
            </p>
            <div className="flex flex-col gap-4">
              {caseData.impacto.map((item) => (
                <div
                  key={item.n}
                  className="grid grid-cols-[26px_1fr] gap-3 items-start"
                >
                  <span className="font-mono text-xs text-accent">{item.n}</span>
                  <span className="text-sm leading-relaxed text-white/80">
                    {item.t}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CaseBlockSection>

      <CaseBlockSection
        label={page.sections.s02.label}
        title={page.sections.s02.title}
      >
        <div className="divide-y divide-neutral-200">
          {[
            [page.sections.s02.problemLabel, page.sections.s02.problemText],
            [page.sections.s02.objectiveLabel, page.sections.s02.objectiveText],
            [page.sections.s02.proposalLabel, page.sections.s02.proposalText],
          ].map(([label, text]) => (
            <div
              key={label}
              className="grid md:grid-cols-[minmax(120px,180px)_1fr] gap-4 md:gap-10 py-6 first:pt-0"
            >
              <div className="text-lg font-semibold text-neutral-950">{label}</div>
              <p className="body-md">{text}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 p-8 md:p-11 rounded-card bg-neutral-950">
          <p className="eyebrow mb-4 text-white/50">
            {page.sections.s02.whoFeelsLabel}
          </p>
          <p className="text-2xl md:text-4xl font-bold leading-tight text-white max-w-2xl text-pretty">
            {page.sections.s02.whoFeelsQuote}
          </p>
        </div>
      </CaseBlockSection>

      <CaseBlockSection
        label={page.sections.s03.label}
        title={page.sections.s03.title}
      >
        <div className="grid md:grid-cols-2 gap-4">
          {caseData.fases.map((fase) => (
            <div key={fase.n} className="card p-7">
              <div className="flex items-baseline gap-2.5">
                <span className="font-mono text-xs text-accent">{fase.n}</span>
                <h3 className="text-xl font-semibold text-neutral-950">{fase.t}</h3>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-neutral-500">{fase.d}</p>
              <div className="mt-4 pt-4 border-t border-neutral-200 flex flex-wrap gap-2.5">
                {fase.m.map((method, methodIndex) => (
                  <PostItTag key={method} index={methodIndex}>
                    {method}
                  </PostItTag>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CaseBlockSection>

      <CaseBlockSection
        label={page.sections.s04.label}
        title={page.sections.s04.title}
      >
        <p className="max-w-2xl body-md mb-8">{page.sections.s04.intro}</p>
        <div className="grid md:grid-cols-3 gap-4">
          {personas.map((persona, index) => (
            <div key={persona.nome} className="card overflow-hidden rounded-2xl">
              {persona.img && (
                <CaseImage
                  src={persona.img}
                  alt={persona.imgAlt ?? persona.nome}
                  className="!rounded-none shadow-none border-b border-neutral-200"
                />
              )}
              <div className="p-7">
                <h3 className="text-xl font-semibold text-neutral-950">
                  {persona.nome}
                </h3>
                <p className="mt-1 text-sm text-neutral-500">{persona.meta}</p>
                <div className="mt-3.5 flex flex-wrap gap-2.5">
                  {persona.tags.map((tag, tagIndex) => (
                    <PostItTag key={tag} index={tagIndex + index}>
                      {tag}
                    </PostItTag>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-neutral-200">
                  <p className="eyebrow mb-1.5 text-accent">
                    {page.sections.s04.motivationLabel}
                  </p>
                  <p className="text-sm leading-relaxed text-neutral-500">
                    {persona.mot}
                  </p>
                </div>
                <div className="mt-3.5">
                  <p className="eyebrow mb-1.5 text-accent">
                    {page.sections.s04.objectiveLabel}
                  </p>
                  <p className="text-sm leading-relaxed text-neutral-500">
                    {persona.obj}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CaseBlockSection>

      <section className="section-inverted py-16 md:py-28">
        <div className="max-w-5xl mx-auto">
          <p className="eyebrow mb-6 text-white/50">{page.sections.s05.label}</p>
          <blockquote className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-[1.08] text-white max-w-lg text-balance">
            “{page.sections.s05.quote}
            <span className="text-accent">{page.sections.s05.quoteAccent}</span>
            {page.sections.s05.quoteEnd}”
          </blockquote>
          <p className="mt-6 max-w-2xl body-md text-white/70">
            {page.sections.s05.body}
          </p>
        </div>
      </section>

      <CaseBlockSection
        label={page.sections.s06.label}
        title={page.sections.s06.title}
      >
        <div className="grid md:grid-cols-2 gap-x-10">
          {caseData.pains.map((pain) => (
            <div
              key={pain.n}
              className="grid grid-cols-[34px_1fr] gap-3.5 py-5 border-t border-neutral-200"
            >
              <span className="font-mono text-xs text-neutral-500">{pain.n}</span>
              <div>
                <p className="eyebrow mb-2 text-accent">{pain.t}</p>
                <p className="body-md text-neutral-950">{pain.d}</p>
              </div>
            </div>
          ))}
        </div>
      </CaseBlockSection>

      <CaseBlockSection
        label={page.sections.s07.label}
        title={page.sections.s07.title}
      >
        <p className="max-w-2xl body-md mb-8">{page.sections.s07.intro}</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3.5">
          {caseData.steps.map((step, index) => (
            <div
              key={step.n}
              className="relative overflow-hidden rounded-lg border border-neutral-200 bg-white p-5"
            >
              <span
                aria-hidden
                className={`case-card-accent ${postItTone(index)}`}
              />
              <div className="w-8 h-8 rounded-ui bg-accent text-white flex items-center justify-center font-mono text-xs font-bold">
                {step.n}
              </div>
              <h3 className="mt-3.5 text-base font-semibold text-neutral-950">
                {step.t}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-neutral-500">
                {step.d}
              </p>
            </div>
          ))}
        </div>
      </CaseBlockSection>

      <CaseBlockSection
        label={page.sections.s08.label}
        title={page.sections.s08.title}
      >
        <p className="max-w-2xl body-md mb-8">{page.sections.s08.intro}</p>
        <div className="grid md:grid-cols-2 gap-4">
          {caseData.oportunidades.map((item, index) => (
            <div key={item.n} className="card p-7">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl font-extrabold leading-none text-neutral-200">
                  {item.n}
                </span>
                <PostItTag index={index}>{item.tag}</PostItTag>
              </div>
              <h3 className="text-lg font-semibold text-neutral-950">{item.t}</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-neutral-500">
                {item.d}
              </p>
            </div>
          ))}
        </div>
      </CaseBlockSection>

      <section className="section-inverted py-20 md:py-32">
        <div className="max-w-5xl mx-auto">
          <p className="eyebrow mb-6 text-white/50">
            {page.sections.closing.kicker}
          </p>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-none tracking-tight text-white max-w-lg">
            {page.sections.closing.titleBefore}
            <span className="text-accent">{page.sections.closing.titleAccent}</span>
          </h2>
        </div>
      </section>
    </CaseStudyLayout>
  );
}
