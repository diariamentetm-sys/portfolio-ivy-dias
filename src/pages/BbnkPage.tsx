import { CaseBlockSection } from "../components/cases/CaseBlocks";
import { CaseEmbed } from "../components/cases/CaseEmbed";
import { CaseStudyLayout } from "../components/layout/CaseStudyLayout";
import { useContent } from "../content/ContentContext";
import { resolveCaseStudyConfig } from "../data/seedProjects";
import { useLocale } from "../i18n/LocaleContext";

/** Bump whenever the pocket embed is rebuilt — forces a fresh iframe shell. */
const EMBED_SRC = "/embeds/bbnk/index.html?v=fix-20260721-2148";

const pageCopy = {
  pt: {
    overviewLabel: "01 / 04 · Visão geral",
    overviewTitle: "Banking as a Service com entregas rápidas",
    overviewBody:
      "BBNK — O BANK, plataforma digital integrada de banking as a service e white label, com entregas rápidas de produtos bancários.",
    valueLabel: "02 / 04 · Proposta de valor",
    valueTitle: "Gestão financeira intuitiva e integrada",
    valueBody:
      "Com o BBNK, buscamos entregar gestão financeira de forma intuitiva, personalizada e integrada aos seus negócios e dia a dia. Focados no seu sucesso, criamos o seu banco e o seu futuro, de forma simples e rápida.",
    visualLabel: "03 / 04 · Conceito visual",
    visualTitle: "Minimalista, vibrante e clean",
    visualBody:
      "O conceito visual apresenta-se de forma minimalista, com cores vibrantes e um layout clean. Com uma interface intuitiva, a navegação é fácil e dinâmica, permitindo ao usuário realizar suas operações de forma rápida e segura.",
    protoLabel: "04 / 04 · Protótipo navegável",
    protoTitle: "Explore a experiência BBNK",
    protoBody: "Interaja com o protótipo abaixo — desktop e fluxos da conta.",
  },
  en: {
    overviewLabel: "01 / 04 · Overview",
    overviewTitle: "Banking as a Service with fast delivery",
    overviewBody:
      "BBNK — O BANK, an integrated digital banking-as-a-service and white-label platform with fast delivery of banking products.",
    valueLabel: "02 / 04 · Value proposition",
    valueTitle: "Intuitive, integrated financial management",
    valueBody:
      "With BBNK, we aim to deliver financial management in an intuitive, personalized way, integrated into business and daily life — building your bank and your future, simply and quickly.",
    visualLabel: "03 / 04 · Visual concept",
    visualTitle: "Minimal, vibrant, and clean",
    visualBody:
      "The visual concept is minimalist, with vibrant colors and a clean layout. An intuitive interface keeps navigation easy and dynamic so users can complete operations quickly and securely.",
    protoLabel: "04 / 04 · Navigable prototype",
    protoTitle: "Explore the BBNK experience",
    protoBody: "Interact with the prototype below — desktop and account flows.",
  },
} as const;

export function BbnkPage() {
  const { locale } = useLocale();
  const { content } = useContent();
  const copy = pageCopy[locale];
  const config = resolveCaseStudyConfig("bbnk", locale, content.projects);

  return (
    <CaseStudyLayout config={config}>
      <CaseBlockSection label={copy.overviewLabel} title={copy.overviewTitle}>
        <p className="max-w-3xl body-md">{copy.overviewBody}</p>
      </CaseBlockSection>
      <CaseBlockSection label={copy.valueLabel} title={copy.valueTitle}>
        <p className="max-w-3xl body-md">{copy.valueBody}</p>
      </CaseBlockSection>
      <CaseBlockSection label={copy.visualLabel} title={copy.visualTitle}>
        <p className="max-w-3xl body-md">{copy.visualBody}</p>
      </CaseBlockSection>
      <CaseBlockSection label={copy.protoLabel} title={copy.protoTitle}>
        <p className="max-w-3xl body-md mb-8">{copy.protoBody}</p>
        <CaseEmbed
          src={EMBED_SRC}
          title="BBNK — protótipo navegável"
          heightClassName="aspect-[1366/768] h-auto min-h-0"
        />
      </CaseBlockSection>
    </CaseStudyLayout>
  );
}
