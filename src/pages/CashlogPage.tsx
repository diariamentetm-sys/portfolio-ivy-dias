import {
  BulletList,
  CaseImage,
  CaseQuote,
  CaseSection,
} from "../components/cases/CaseBlocks";
import { CaseStudyLayout } from "../components/layout/CaseStudyLayout";
import { postItTone } from "../components/ui/PostItTag";
import {
  caseStudyConfigs,
  cashlogCaseDataContent,
  cashlogPageContent,
} from "../data/casePagesContent";
import { cashlogData } from "../data/caseStudies";
import { useLocale } from "../i18n/LocaleContext";

function ImageGrid({
  label,
  images,
  stacked = false,
}: {
  label: string;
  images: { src: string; alt: string }[];
  stacked?: boolean;
}) {
  return (
    <div className="mt-6">
      <p className="eyebrow mb-3.5">{label}</p>
      <div className={stacked ? "flex flex-col gap-5" : "grid sm:grid-cols-2 gap-4"}>
        {images.map((image) => (
          <CaseImage key={image.src} src={image.src} alt={image.alt} />
        ))}
      </div>
    </div>
  );
}

export function CashlogPage() {
  const { locale } = useLocale();
  const config = caseStudyConfigs[locale].cashlog;
  const page = cashlogPageContent[locale];
  const caseData = cashlogCaseDataContent[locale];

  const wireframes = cashlogData.wireframes.map((image, index) => ({
    src: image.src,
    alt: caseData.wireframeAlts[index],
  }));

  const uiScreens = cashlogData.uiScreens.map((image, index) => ({
    src: image.src,
    alt: caseData.uiScreenAlts[index],
  }));

  return (
    <CaseStudyLayout config={config}>
      <CaseSection
        number="01"
        kicker={page.sections.s01.kicker}
        title={page.sections.s01.title}
      >
        <p className="max-w-3xl body-md">{page.sections.s01.body}</p>
        <div className="mt-7 flex flex-wrap gap-6 md:gap-12 pt-5 border-t border-neutral-200">
          {page.sections.s01.stats.map((stat) => (
            <div key={stat.label}>
              <p className="eyebrow mb-1.5">{stat.label}</p>
              <p className="text-[15px] text-neutral-950">{stat.value}</p>
            </div>
          ))}
        </div>
      </CaseSection>

      <CaseSection
        number="02"
        kicker={page.sections.s02.kicker}
        title={page.sections.s02.title}
      >
        <p className="max-w-3xl body-md">{page.sections.s02.body}</p>
        <p className="mt-7 eyebrow mb-4">{page.sections.s02.profilesLabel}</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {caseData.perfis.map((perfil, index) => (
            <div
              key={perfil.t}
              className="relative overflow-hidden rounded-lg border border-neutral-200 bg-white p-5"
            >
              <span
                aria-hidden
                className={`case-card-accent ${postItTone(index)}`}
              />
              <div className="text-base font-semibold text-neutral-950">
                {perfil.t}
              </div>
              <div className="mt-1 text-sm text-neutral-500">{perfil.d}</div>
            </div>
          ))}
        </div>
        <div className="mt-6">
          <CaseImage
            src={cashlogData.researchImg}
            alt={caseData.researchImgAlt}
          />
        </div>
      </CaseSection>

      <CaseSection
        number="03"
        kicker={page.sections.s03.kicker}
        title={page.sections.s03.title}
      >
        <p className="max-w-3xl body-md">{page.sections.s03.body}</p>
        <div className="mt-6 card-ui p-7">
          <p className="eyebrow mb-4 text-accent">
            {page.sections.s03.discoveriesLabel}
          </p>
          <BulletList items={caseData.descobertas} />
        </div>
      </CaseSection>

      <CaseSection
        number="04"
        kicker={page.sections.s04.kicker}
        title={page.sections.s04.title}
      >
        <p className="max-w-3xl body-md">{page.sections.s04.body}</p>
        <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {caseData.diretrizes.map((item) => (
            <div
              key={item.n}
              className="p-6 rounded-card bg-neutral-950 text-white"
            >
              <div className="text-4xl font-extrabold leading-none text-accent">
                {item.n}
              </div>
              <p className="mt-3.5 text-[15px] leading-snug font-medium text-white/90">
                {item.d}
              </p>
            </div>
          ))}
        </div>
        <ImageGrid
          label={page.sections.s04.wireframesLabel}
          images={wireframes}
        />
      </CaseSection>

      <CaseSection
        number="05"
        kicker={page.sections.s05.kicker}
        title={page.sections.s05.title}
      >
        <p className="max-w-3xl body-md">{page.sections.s05.body}</p>
        <p className="mt-6 eyebrow mb-3.5">{page.sections.s05.paletteLabel}</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {cashlogData.palette.map((color) => (
            <div key={color.hex}>
              <div
                className="h-24 rounded-ui border border-neutral-200"
                style={{ backgroundColor: color.hex }}
              />
              <p className="mt-2.5 font-mono text-xs text-neutral-950">{color.hex}</p>
              <p className="text-xs text-neutral-500">{color.name}</p>
            </div>
          ))}
        </div>
        <ImageGrid
          label={page.sections.s05.uiScreensLabel}
          images={uiScreens}
          stacked
        />
      </CaseSection>

      <CaseQuote quote={caseData.quote} />
    </CaseStudyLayout>
  );
}
