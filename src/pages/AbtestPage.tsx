import { CaseImage, CaseSection } from "../components/cases/CaseBlocks";
import { CaseStudyLayout } from "../components/layout/CaseStudyLayout";
import { PostItNote, PostItTag } from "../components/ui/PostItTag";
import { useContent } from "../content/ContentContext";
import {
  abtestCaseDataContent,
  abtestPageContent,
} from "../data/casePagesContent";
import { abtestData } from "../data/caseStudies";
import { resolveCaseStudyConfig } from "../data/seedProjects";
import { useLocale } from "../i18n/LocaleContext";
import {
  getManagedProject,
  getSectionImages,
  pickManagedSrc,
  resolveOverviewSrc,
} from "../utils/projectMedia";

import type { AbTestBlock } from "../types/cases";

type TestDetailProps = Pick<
  AbTestBlock,
  "duration" | "device" | "metric" | "result" | "resultLabel" | "image" | "imageAlt" | "imageFirst"
> & {
  detailLabels: { duration: string; device: string; metric: string };
};

function TestDetail({
  duration,
  device,
  metric,
  result,
  resultLabel,
  image,
  imageAlt,
  imageFirst,
  detailLabels,
}: TestDetailProps) {
  const imageBlock = (
    <CaseImage
      src={image}
      alt={imageAlt}
      className="!rounded-none shadow-none w-full"
    />
  );

  const contentBlock = (
    <div className="p-8 md:p-12">
      <div className="flex flex-wrap gap-2.5">
        {[
          [detailLabels.duration, duration],
          [detailLabels.device, device],
          [detailLabels.metric, metric],
        ].map(([key, value], index) => (
          <PostItTag key={key} index={index}>
            {`${key}: ${value}`}
          </PostItTag>
        ))}
      </div>
      <div className="mt-8 flex items-baseline gap-3">
        <span className="text-6xl md:text-8xl font-extrabold leading-[0.85] text-accent">
          {result}
        </span>
        <span className="text-[15px] text-neutral-500 leading-snug">
          {resultLabel}
        </span>
      </div>
    </div>
  );

  return (
    <div className="card overflow-hidden rounded-2xl flex flex-col">
      {imageFirst ? (
        <>
          {imageBlock}
          {contentBlock}
        </>
      ) : (
        <>
          {contentBlock}
          {imageBlock}
        </>
      )}
    </div>
  );
}

export function AbtestPage() {
  const { locale } = useLocale();
  const { content } = useContent();
  const config = resolveCaseStudyConfig("abtest", locale, content.projects);
  const page = abtestPageContent[locale];
  const caseData = abtestCaseDataContent[locale];
  const project = getManagedProject(content.projects, "abtest");
  const overviewSrc = resolveOverviewSrc(project);

  const tests = abtestData.tests.map((test, index) => {
    const sectionImages = getSectionImages(project, locale, index);
    return {
      ...caseData.tests[index],
      image: pickManagedSrc(sectionImages, 0, test.image),
      imageFirst: test.imageFirst,
    };
  });
  const showOverview = Boolean(
    overviewSrc && !tests.some((test) => test.image === overviewSrc),
  );

  return (
    <CaseStudyLayout config={config}>
      {showOverview ? (
        <section className="max-w-5xl mx-auto px-5 md:px-16 pb-4">
          <CaseImage
            src={overviewSrc}
            alt={`${config.title}${config.titleAccent ?? ""}`}
            fill
            priority
          />
        </section>
      ) : null}

      {tests.map((test, index) => (
        <CaseSection
          key={test.label}
          number={String(index + 1).padStart(2, "0")}
          kicker={test.label}
          title={test.title}
        >
          <TestDetail {...test} detailLabels={page.testDetailLabels} />
        </CaseSection>
      ))}

      <section className="section-narrative">
        <div className="max-w-5xl mx-auto">
          <PostItNote index={2} className="p-8 md:p-12">
            <p className="text-2xl md:text-4xl font-bold leading-snug text-neutral-950 max-w-xl text-pretty">
              {caseData.closingQuote}
            </p>
          </PostItNote>
        </div>
      </section>
    </CaseStudyLayout>
  );
}
