import {
  BulletList,
  CaseImage,
  CaseQuote,
  CaseSection,
} from "../components/cases/CaseBlocks";
import { CaseStudyLayout } from "../components/layout/CaseStudyLayout";
import { PostItNote } from "../components/ui/PostItTag";
import { useContent } from "../content/ContentContext";
import {
  cashlogCaseDataContent,
  cashlogPageContent,
} from "../data/casePagesContent";
import { cashlogData } from "../data/caseStudies";
import { resolveCaseStudyConfig } from "../data/seedProjects";
import { useLocale } from "../i18n/LocaleContext";

const statStyles = [
  { tone: "post-it-mint" as const, rotate: "rotate-1" },
  { tone: "post-it-lavender" as const, rotate: "-rotate-2" },
  { tone: "post-it-peach" as const, rotate: "rotate-2" },
];

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
  const { content } = useContent();
  const config = resolveCaseStudyConfig("cashlog", locale, content.projects);
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
        <div className="mt-7 flex flex-wrap gap-4 md:gap-6 items-stretch pt-5 border-t border-neutral-200">
          {page.sections.s01.stats.map((stat, index) => (
            <PostItNote
              key={stat.label}
              index={index}
              stat
              tone={statStyles[index]?.tone}
              className={statStyles[index]?.rotate}
            >
              <div className="text-[15px] font-semibold text-neutral-950">{stat.value}</div>
              <div className="text-xs text-neutral-700 mt-1.5">{stat.label}</div>
            </PostItNote>
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
            <PostItNote key={perfil.t} index={index} compact>
              <div className="text-base font-semibold text-neutral-950">{perfil.t}</div>
              <div className="mt-1 text-sm text-neutral-700">{perfil.d}</div>
            </PostItNote>
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
          {caseData.diretrizes.map((item, index) => (
            <PostItNote key={item.n} index={index} compact>
              <div className="text-3xl font-extrabold leading-none text-neutral-950">
                {item.n}
              </div>
              <p className="mt-3 text-[15px] leading-snug font-medium text-neutral-800">
                {item.d}
              </p>
            </PostItNote>
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
