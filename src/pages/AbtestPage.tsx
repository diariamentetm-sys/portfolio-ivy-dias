import { CaseImage } from "../components/cases/CaseBlocks";
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

type TestDetailProps = AbTestBlock & {
  detailLabels: { duration: string; device: string; metric: string };
};

function TestDetail({
  label,
  title,
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
      <PostItTag index={0} className="mb-4">
        {label}
      </PostItTag>
      <h2 className="text-2xl md:text-3xl font-bold leading-snug text-neutral-950">
        {title}
      </h2>
      <div className="mt-6 flex flex-wrap gap-2.5">
        {[
          [detailLabels.duration, duration],
          [detailLabels.device, device],
          [detailLabels.metric, metric],
        ].map(([key, value], index) => (
          <PostItTag key={key} index={index + 1}>
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

      <section className="max-w-5xl mx-auto px-5 md:px-16 pb-12 md:pb-16 space-y-6">
        {tests.map((test) => (
          <TestDetail
            key={test.label}
            {...test}
            detailLabels={page.testDetailLabels}
          />
        ))}

        <PostItNote index={2} className="mt-10 p-8 md:p-12">
          <p className="text-2xl md:text-4xl font-bold leading-snug text-neutral-950 max-w-xl text-pretty">
            {caseData.closingQuote}
          </p>
        </PostItNote>
      </section>
    </CaseStudyLayout>
  );
}
