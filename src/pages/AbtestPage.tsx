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
  return (
    <div className="card overflow-hidden rounded-2xl">
      <div className="grid md:grid-cols-2">
        {imageFirst && (
          <CaseImage
            src={image}
            alt={imageAlt}
            className="!rounded-none shadow-none min-h-[280px] object-cover h-full md:rounded-none"
          />
        )}
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
        {!imageFirst && (
          <CaseImage
            src={image}
            alt={imageAlt}
            className="!rounded-none shadow-none min-h-[280px] object-cover h-full"
          />
        )}
      </div>
    </div>
  );
}

export function AbtestPage() {
  const { locale } = useLocale();
  const { content } = useContent();
  const config = resolveCaseStudyConfig("abtest", locale, content.projects);
  const page = abtestPageContent[locale];
  const caseData = abtestCaseDataContent[locale];

  const tests = abtestData.tests.map((test, index) => ({
    ...caseData.tests[index],
    image: test.image,
    imageFirst: test.imageFirst,
  }));

  return (
    <CaseStudyLayout config={config}>
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
