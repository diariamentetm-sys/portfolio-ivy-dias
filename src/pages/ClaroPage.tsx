import {
  BulletList,
  CaseImage,
  CaseQuote,
  CaseSection,
  RuleBarChart,
} from "../components/cases/CaseBlocks";
import { CaseStudyLayout } from "../components/layout/CaseStudyLayout";
import { PostItTag } from "../components/ui/PostItTag";
import {
  caseStudyConfigs,
  claroCaseDataContent,
  claroPageContent,
} from "../data/casePagesContent";
import { claroData } from "../data/caseStudies";
import { useLocale } from "../i18n/LocaleContext";

export function ClaroPage() {
  const { locale } = useLocale();
  const config = caseStudyConfigs[locale].claro;
  const page = claroPageContent[locale];
  const caseData = claroCaseDataContent[locale];

  const cards = claroData.cards.map((card, index) => ({
    src: card.src,
    alt: caseData.cardAlts[index],
  }));

  return (
    <CaseStudyLayout config={config}>
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
        <div className="grid md:grid-cols-3 gap-4">
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
          ].map((group) => (
            <div key={group.title} className="card-ui p-6">
              <p className="eyebrow mb-3.5 text-accent">{group.title}</p>
              <BulletList items={group.items} />
            </div>
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
        <div className="card-ui p-7 bg-white">
          <p className="eyebrow mb-3">{page.sections.s05.productGoalLabel}</p>
          <p className="text-lg leading-relaxed text-neutral-950 text-pretty">
            {page.sections.s05.productGoal}
          </p>
        </div>
        <div className="mt-4 grid md:grid-cols-2 gap-4">
          <div className="card-ui p-6 bg-white">
            <p className="eyebrow mb-3.5 text-accent">
              {page.sections.s05.expectedResultsLabel}
            </p>
            <BulletList items={caseData.resultados} />
          </div>
          <div className="card-ui p-6 bg-white">
            <p className="eyebrow mb-3.5 text-accent">
              {page.sections.s05.validationMetricsLabel}
            </p>
            <div className="flex flex-wrap gap-2.5">
              {caseData.metricas.map((metrica, index) => (
                <PostItTag key={metrica} index={index}>
                  {metrica}
                </PostItTag>
              ))}
            </div>
          </div>
        </div>
      </CaseSection>

      <CaseSection
        number="06"
        kicker={page.sections.s06.kicker}
        title={page.sections.s06.title}
      >
        <p className="max-w-3xl body-md">{page.sections.s06.body}</p>
        <div className="mt-6 grid sm:grid-cols-2 gap-4">
          <div className="card-ui p-6">
            <p className="text-base font-semibold text-neutral-950 mb-2">
              {page.sections.s06.jointWorkTitle}
            </p>
            <p className="text-sm leading-relaxed text-neutral-500">
              {page.sections.s06.jointWorkBody}
            </p>
          </div>
          <div className="card p-6 bg-neutral-950 text-white">
            <p className="text-4xl font-extrabold leading-none text-accent">8</p>
            <p className="mt-2 text-sm leading-relaxed text-white/70">
              {page.sections.s06.cardsReadyBody}
            </p>
          </div>
        </div>
        <div className="mt-8">
          <p className="eyebrow mb-3.5">{page.sections.s06.cardArchLabel}</p>
          <CaseImage src={claroData.reqImg} alt={caseData.reqImgAlt} />
        </div>
        <div className="mt-8">
          <p className="eyebrow mb-3.5">{page.sections.s06.finalSetLabel}</p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
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
