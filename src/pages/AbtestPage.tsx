import { CaseImage } from "../components/cases/CaseBlocks";
import { CaseStudyLayout } from "../components/layout/CaseStudyLayout";
import {
  abtestCaseDataContent,
  abtestPageContent,
  caseStudyConfigs,
} from "../data/casePagesContent";
import { abtestData } from "../data/caseStudies";
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
          <p className="eyebrow mb-4 text-accent">{label}</p>
          <h2 className="text-2xl md:text-3xl font-bold leading-snug text-neutral-950">
            {title}
          </h2>
          <div className="mt-6 flex flex-col gap-3.5">
            {[
              [detailLabels.duration, duration],
              [detailLabels.device, device],
              [detailLabels.metric, metric],
            ].map(([key, value]) => (
              <div key={key} className="flex gap-3.5 text-sm text-neutral-500">
                <span className="eyebrow min-w-[110px]">{key}</span>
                {value}
              </div>
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
  const config = caseStudyConfigs[locale].abtest;
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

        <div className="mt-10 p-8 md:p-12 rounded-card bg-neutral-950">
          <p className="text-2xl md:text-4xl font-bold leading-snug text-white max-w-xl text-pretty">
            {caseData.closingQuote}
          </p>
        </div>
      </section>
    </CaseStudyLayout>
  );
}
