import {
  BulletList,
  CaseImage,
  CaseQuote,
  CaseSection,
} from "../components/cases/CaseBlocks";
import { CaseStudyLayout } from "../components/layout/CaseStudyLayout";
import { postItTone } from "../components/ui/PostItTag";
import { cashlogData } from "../data/caseStudies";
import { caseStudies } from "../data/portfolio";

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
  const config = caseStudies.cashlog;

  return (
    <CaseStudyLayout config={config}>
      <CaseSection
        number="01"
        kicker="Contexto · Kick off"
        title="O Desafio Raízen"
      >
        <p className="max-w-3xl body-md">
          A Raízen necessitava de uma solução eficiente para a{" "}
          <strong className="text-neutral-950 font-semibold">
            aprovação de demandas de linhas de investimento
          </strong>{" "}
          abrangendo diversas áreas de atuação: Varejo, Aviação, LD&T e B2B. A
          resposta foi a criação do{" "}
          <strong className="text-neutral-950 font-semibold">Cashlog</strong>, uma interface que
          utiliza machine learning para otimizar a tomada de decisões — acessada
          por 8 perfis, de operadores a diretores, com painel administrativo para
          gestão das configurações.
        </p>
        <div className="mt-7 flex flex-wrap gap-6 md:gap-12 pt-5 border-t border-neutral-200">
          {[
            ["Áreas", "Varejo · Aviação · LD&T · B2B"],
            ["Perfis", "8 tipos de usuários"],
            ["Diferencial", "Machine learning integrado"],
          ].map(([label, value]) => (
            <div key={label}>
              <p className="eyebrow mb-1.5">{label}</p>
              <p className="text-[15px] text-neutral-950">{value}</p>
            </div>
          ))}
        </div>
      </CaseSection>

      <CaseSection
        number="02"
        kicker="Discovery · 15 entrevistas"
        title="Pesquisa e Imersão"
      >
        <p className="max-w-3xl body-md">
          Realizei pesquisas qualitativas com 15 profissionais representando os
          diferentes perfis de usuários da plataforma. As entrevistas e sessões
          de observação nos ajudaram a entender profundamente suas necessidades,
          frustrações e expectativas no fluxo atual de aprovação de demandas.
        </p>
        <p className="mt-7 eyebrow mb-4">8 perfis de usuários identificados</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {cashlogData.perfis.map((perfil, index) => (
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
            alt="Imersão com stakeholders Raízen durante o discovery do Cashlog"
          />
        </div>
      </CaseSection>

      <CaseSection
        number="03"
        kicker="Discovery · Definição"
        title="Definição e Síntese"
      >
        <p className="max-w-3xl body-md">
          Com base nos insights coletados, redefinimos o escopo inicial do
          projeto, identificando claramente os problemas a resolver. O
          mapeamento de fluxos revelou{" "}
          <strong className="text-neutral-950 font-semibold">
            gargalos críticos na comunicação entre as áreas de Varejo e Aviação
          </strong>
          , o que nos permitiu unificar os critérios de priorização no
          algoritmo de machine learning.
        </p>
        <div className="mt-6 card-ui p-7">
          <p className="eyebrow mb-4 text-accent">Principais descobertas</p>
          <BulletList items={cashlogData.descobertas} />
        </div>
      </CaseSection>

      <CaseSection
        number="04"
        kicker="Delivery · Ideação"
        title="Ideação e Co-criação"
      >
        <p className="max-w-3xl body-md">
          Sessões de brainstorming, design sprint e co-criação com a equipe
          técnica e de produto da Raízen resultaram em três diretrizes centrais
          de design, além de um userflow completo — do login à aprovação de
          demanda (PEP).
        </p>
        <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {cashlogData.diretrizes.map((item) => (
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
        <ImageGrid label="Wireframes do fluxo" images={cashlogData.wireframes} />
      </CaseSection>

      <CaseSection
        number="05"
        kicker="Delivery · Prototipação"
        title="Prototipação de Alta Fidelidade"
      >
        <p className="max-w-3xl body-md">
          Fluxos em alta fidelidade, sistema de design e handoff. O dashboard
          reúne indicadores de solicitações em aprovação, holding e aprovadas,
          gráficos de dispêndio x plano e a rede de colaboradores — dando
          visibilidade completa do pipeline de investimento.
        </p>
        <p className="mt-6 eyebrow mb-3.5">Paleta do produto</p>
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
          label="Telas em alta fidelidade"
          images={cashlogData.uiScreens}
          stacked
        />
      </CaseSection>

      <CaseQuote quote={cashlogData.quote} />
    </CaseStudyLayout>
  );
}
