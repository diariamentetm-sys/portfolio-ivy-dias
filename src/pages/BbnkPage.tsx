import { CaseBlockSection, CaseImage } from "../components/cases/CaseBlocks";
import { CaseEmbed } from "../components/cases/CaseEmbed";
import { CaseStudyLayout } from "../components/layout/CaseStudyLayout";
import { useContent } from "../content/ContentContext";
import { resolveCaseStudyConfig } from "../data/seedProjects";
import { useLocale } from "../i18n/LocaleContext";
import {
  getManagedProject,
  getSectionImages,
} from "../utils/projectMedia";

/** Bump whenever the pocket embed is rebuilt — forces a fresh iframe shell. */
const EMBED_SRC = "/embeds/bbnk/index.html?v=20260728w";

/** Case board — project introduction (bbnk-4 case board). */
const INTRO_SRC = "/uploads/bbnk/bbnk-intro.png";

/** UI mockup for Visão geral / Banking as a Service section. */
const VISAO_GERAL_SRC = "/uploads/bbnk/bbnk-visao-geral.png?v=20260728u";

const pageCopy = {
  pt: {
    overviewLabel: "01 / 03 · Visão geral",
    overviewTitle: "Banking as a Service com entregas rápidas",
    overviewBody:
      "Com o BBNK, buscamos entregar gestão financeira de forma intuitiva, personalizada e integrada aos seus negócios e dia a dia. Focados no seu sucesso, criamos o seu banco e o seu futuro, de forma simples e rápida.",
    visualLabel: "02 / 03 · Conceito visual",
    visualTitle: "Minimalista, vibrante e clean",
    visualBody:
      "O conceito visual apresenta-se de forma minimalista, com cores vibrantes e um layout clean. Com uma interface intuitiva, a navegação é fácil e dinâmica, permitindo ao usuário realizar suas operações de forma rápida e segura.",
    protoLabel: "03 / 03 · Protótipo navegável",
    protoTitle: "Explore a experiência BBNK",
    protoBody: "Interaja com o protótipo abaixo — layout adaptado para mobile e desktop.",
  },
  en: {
    overviewLabel: "01 / 03 · Overview",
    overviewTitle: "Banking as a Service with fast delivery",
    overviewBody:
      "With BBNK, we aim to deliver financial management in an intuitive, personalized way, integrated into business and daily life — building your bank and your future, simply and quickly.",
    visualLabel: "02 / 03 · Visual concept",
    visualTitle: "Minimal, vibrant, and clean",
    visualBody:
      "The visual concept is minimalist, with vibrant colors and a clean layout. An intuitive interface keeps navigation easy and dynamic so users can complete operations quickly and securely.",
    protoLabel: "03 / 03 · Navigable prototype",
    protoTitle: "Explore the BBNK experience",
    protoBody: "Interact with the prototype below — responsive layout for mobile and desktop.",
  },
} as const;

function SectionGallery({
  images,
  title,
}: {
  images: { src: string; alt?: string }[];
  title: string;
}) {
  if (!images.length) return null;
  return (
    <div className="mt-6 flex flex-col gap-5">
      {images.map((image) => (
        <CaseImage
          key={image.src}
          src={image.src}
          alt={image.alt?.trim() || title}
        />
      ))}
    </div>
  );
}

export function BbnkPage() {
  const { locale } = useLocale();
  const { content } = useContent();
  const copy = pageCopy[locale];
  const config = resolveCaseStudyConfig("bbnk", locale, content.projects);
  const project = getManagedProject(content.projects, "bbnk");
  const visualImages = getSectionImages(project, locale, 1);
  const protoImages = getSectionImages(project, locale, 2);

  return (
    <CaseStudyLayout config={config} ogImage={INTRO_SRC}>
      <section className="max-w-5xl mx-auto px-5 md:px-16 pb-4">
        <CaseImage
          src={INTRO_SRC}
          alt={`${config.title}${config.titleAccent ?? ""}`}
          priority
        />
      </section>

      <CaseBlockSection label={copy.overviewLabel} title={copy.overviewTitle}>
        <p className="max-w-3xl body-md">{copy.overviewBody}</p>
        <div className="mt-6">
          <CaseImage
            src={VISAO_GERAL_SRC}
            alt={copy.overviewTitle}
            priority
          />
        </div>
      </CaseBlockSection>
      <CaseBlockSection label={copy.visualLabel} title={copy.visualTitle}>
        <p className="max-w-3xl body-md">{copy.visualBody}</p>
        <SectionGallery images={visualImages} title={copy.visualTitle} />
      </CaseBlockSection>
      <CaseBlockSection label={copy.protoLabel} title={copy.protoTitle}>
        <p className="max-w-3xl body-md mb-8">{copy.protoBody}</p>
        <SectionGallery images={protoImages} title={copy.protoTitle} />
        <CaseEmbed
          src={EMBED_SRC}
          title="BBNK — protótipo navegável"
          designWidth={1366}
          designHeight={768}
        />
      </CaseBlockSection>
    </CaseStudyLayout>
  );
}
