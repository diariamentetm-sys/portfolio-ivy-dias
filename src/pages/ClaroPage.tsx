import {
  BulletList,
  CaseImage,
  CaseQuote,
  CaseSection,
  RuleBarChart,
} from "../components/cases/CaseBlocks";
import { CaseStudyLayout } from "../components/layout/CaseStudyLayout";
import { PostItNote, PostItTag } from "../components/ui/PostItTag";
import { useContent } from "../content/ContentContext";
import {
  claroCaseDataContent,
  claroPageContent,
} from "../data/casePagesContent";
import { claroData } from "../data/caseStudies";
import { resolveCaseStudyConfig } from "../data/seedProjects";
import { useLocale } from "../i18n/LocaleContext";
import {
  getManagedProject,
  getSectionImages,
  mapManagedOrFallback,
  resolveOverviewSrc,
} from "../utils/projectMedia";

export function ClaroPage() {
  const { locale } = useLocale();
  const { content } = useContent();
  const config = resolveCaseStudyConfig("claro", locale, content.projects);
  const page = claroPageContent[locale];
  const caseData = claroCaseDataContent[locale];
  const project = getManagedProject(content.projects, "claro");
  const coverSrc = resolveOverviewSrc(project, claroData.overviewImg);
  const cardImages = getSectionImages(project, locale, 5);

  const cards = mapManagedOrFallback(
    cardImages,
    claroData.cards.map((card, index) => ({
      src: card.src,
      alt: caseData.cardAlts[index],
    })),
  );

  return (
    <CaseStudyLayout config={config}>
      {coverSrc ? (
        <section className="max-w-5xl mx-auto px-5 md:px-16 pb-4">
          <CaseImage
            src={coverSrc}
            alt={`${config.title}${config.titleAccent ?? ""}`}
            fill
            priority
          />
        </section>
      ) : null}

      <CaseSection
        number="01"
        kicker={page.sections.s01.kicker}
        title={page.sections.s01.title}
      >
        <p className="max-w-3xl body-md">{page.sections.s01.body}</p>
        <div className="mt-6 card-ui p-7">
          <p className="eyebrow mb-4 text-accent">{page.sections.s01.funilLabel}</p>
          <div className="flex flex-col gap-4">
            {caseData.funil.map((item) => (
              <div
                key={item.s}
                className="grid grid-cols-[120px_1fr_auto] gap-4 items-center"
              >
                <div className="text-sm font-medium text-neutral-950">{item.s}</div>
                <div className="h-2 rounded-full bg-neutral-200">
                  <div
                    className="h-2 rounded-full bg-accent"
                    style={{ width: item.w }}
                  />
                </div>
                <div className="text-sm text-neutral-500">
                  <strong className="text-neutral-950 text-base">{item.n}</strong> ·{" "}
                  {item.d}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-5 flex flex-wrap gap-2.5">
          {caseData.perfis.map((perfil, index) => (
            <PostItTag key={perfil} index={index}>
              {perfil}
            </PostItTag>
          ))}
        </div>
      </CaseSection>

      <CaseSection
        number="02"
        kicker={page.sections.s02.kicker}
        title={page.sections.s02.title}
      >
        <p className="max-w-3xl body-md">{page.sections.s02.body}</p>
        <p className="mt-6 eyebrow mb-3">{page.sections.s02.macroLabel}</p>
        <div className="flex flex-wrap gap-2.5">
          {caseData.macro.map((item, index) => (
            <PostItTag key={item} index={index}>
              {item}
            </PostItTag>
          ))}
        </div>
        <p className="mt-5 eyebrow mb-3">{page.sections.s02.compLabel}</p>
        <div className="flex flex-wrap gap-2.5">
          {caseData.comp.map((item, index) => (
            <PostItTag key={item} index={index + 3}>
              {item}
            </PostItTag>
          ))}
        </div>
      </CaseSection>

      <CaseSection
        number="03"
        kicker={page.sections.s03.kicker}
        title={page.sections.s03.title}
      >
        <div className="grid md:grid-cols-3 gap-4 md:gap-6">
          {[
            {
              title: page.sections.s03.groupTitles.premissas,
              items: caseData.premissas,
            },
            {
              title: page.sections.s03.groupTitles.restricoes,
              items: caseData.restricoes,
            },
            {
              title: page.sections.s03.groupTitles.riscos,
              items: caseData.riscos,
            },
          ].map((group, groupIndex) => (
            <PostItNote key={group.title} index={groupIndex}>
              <p className="font-mono text-sm font-medium text-neutral-800/70">
                {String(groupIndex + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-4 text-card-title text-neutral-950">
                {group.title}
              </h3>
              <ul className="mt-3 flex flex-col gap-2.5">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="text-sm leading-relaxed text-neutral-700 text-pretty flex gap-2"
                  >
                    <span className="text-neutral-950/40 shrink-0" aria-hidden>
                      ●
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </PostItNote>
          ))}
        </div>
      </CaseSection>

      <CaseSection
        number="04"
        kicker={page.sections.s04.kicker}
        title={page.sections.s04.title}
      >
        <p className="max-w-3xl body-md">{page.sections.s04.body}</p>
        <div className="mt-6 card-ui p-7 space-y-5">
          <RuleBarChart
            title={page.sections.s04.regrasLabels.primary}
            items={caseData.regrasP}
          />
          <RuleBarChart
            title={page.sections.s04.regrasLabels.secondary}
            items={caseData.regrasS}
          />
          <RuleBarChart
            title={page.sections.s04.regrasLabels.tertiary}
            items={caseData.regrasT}
          />
        </div>
      </CaseSection>

      <CaseSection
        number="05"
        kicker={page.sections.s05.kicker}
        title={page.sections.s05.title}
        inverted
      >
        <PostItNote index={0} className="p-7">
          <PostItTag index={0} className="mb-3">
            {page.sections.s05.productGoalLabel}
          </PostItTag>
          <p className="text-lg leading-relaxed text-neutral-950 text-pretty">
            {page.sections.s05.productGoal}
          </p>
        </PostItNote>
        <div className="mt-4 grid md:grid-cols-2 gap-4">
          <PostItNote index={1} compact>
            <PostItTag index={1} className="mb-3.5">
              {page.sections.s05.expectedResultsLabel}
            </PostItTag>
            <BulletList items={caseData.resultados} />
          </PostItNote>
          <PostItNote index={2} compact>
            <PostItTag index={2} className="mb-3.5">
              {page.sections.s05.validationMetricsLabel}
            </PostItTag>
            <div className="flex flex-wrap gap-2.5">
              {caseData.metricas.map((metrica, index) => (
                <PostItTag key={metrica} index={index + 3}>
                  {metrica}
                </PostItTag>
              ))}
            </div>
          </PostItNote>
        </div>
      </CaseSection>

      <CaseSection
        number="06"
        kicker={page.sections.s06.kicker}
        title={page.sections.s06.title}
      >
        <p className="max-w-3xl body-md">{page.sections.s06.body}</p>
        <div className="mt-6 grid sm:grid-cols-2 gap-4">
          <PostItNote index={3} compact>
            <PostItTag index={4} className="mb-2">
              {page.sections.s06.jointWorkTitle}
            </PostItTag>
            <p className="text-sm leading-relaxed text-neutral-800">
              {page.sections.s06.jointWorkBody}
            </p>
          </PostItNote>
          <PostItNote index={4} compact>
            <p className="text-4xl font-extrabold leading-none text-neutral-950">8</p>
            <p className="mt-2 text-sm leading-relaxed text-neutral-800">
              {page.sections.s06.cardsReadyBody}
            </p>
          </PostItNote>
        </div>
        <div className="mt-8">
          <p className="eyebrow mb-3.5">{page.sections.s06.cardArchLabel}</p>
          <CaseImage src={claroData.reqImg} alt={caseData.reqImgAlt} />
        </div>
        <div className="mt-8">
          <p className="eyebrow mb-3.5">{page.sections.s06.finalSetLabel}</p>
          <div className="flex flex-col gap-5">
            {cards.map((card) => (
              <CaseImage key={card.src} src={card.src} alt={card.alt} />
            ))}
          </div>
        </div>
      </CaseSection>

      <CaseQuote quote={caseData.quote} maxWidth="max-w-2xl" />
    </CaseStudyLayout>
  );
}
