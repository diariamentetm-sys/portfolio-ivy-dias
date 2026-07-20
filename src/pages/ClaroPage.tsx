import {
  BulletList,
  CaseImage,
  CaseQuote,
  CaseSection,
  RuleBarChart,
} from "../components/cases/CaseBlocks";
import { CaseStudyLayout } from "../components/layout/CaseStudyLayout";
import { PostItTag } from "../components/ui/PostItTag";
import { claroData } from "../data/caseStudies";
import { caseStudies } from "../data/portfolio";

export function ClaroPage() {
  const config = caseStudies.claro;

  return (
    <CaseStudyLayout config={config}>
      <CaseSection
        number="01"
        kicker="Kick Off · 42 pessoas"
        title="Contexto e alinhamento inicial"
      >
        <p className="max-w-3xl body-md">
          Os especialistas trouxeram o contexto e o histórico da iniciativa —
          resultados de testes, validações de POC e hipóteses de uso já
          levantadas — para que todos chegassem às sessões seguintes com o mesmo
          nível de entendimento.
        </p>
        <div className="mt-6 card-ui p-7">
          <p className="eyebrow mb-4 text-accent">Funil de participação</p>
          <div className="flex flex-col gap-4">
            {claroData.funil.map((item) => (
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
          {claroData.perfis.map((perfil, index) => (
            <PostItTag key={perfil} index={index}>
              {perfil}
            </PostItTag>
          ))}
        </div>
      </CaseSection>

      <CaseSection
        number="02"
        kicker="Sessão 1 · 45 participantes"
        title="Objetivos e cenários de uso"
      >
        <p className="max-w-3xl body-md">
          O time descreveu os objetivos e cenários dos cards a serem criados.
          Essa etapa gerou oito macro cenários e três cenários complementares
          que estruturaram todo o escopo do projeto.
        </p>
        <p className="mt-6 eyebrow mb-3">8 macro cenários</p>
        <div className="flex flex-wrap gap-2.5">
          {claroData.macro.map((item, index) => (
            <PostItTag key={item} index={index}>
              {item}
            </PostItTag>
          ))}
        </div>
        <p className="mt-5 eyebrow mb-3">3 cenários complementares</p>
        <div className="flex flex-wrap gap-2.5">
          {claroData.comp.map((item, index) => (
            <PostItTag key={item} index={index + 3}>
              {item}
            </PostItTag>
          ))}
        </div>
      </CaseSection>

      <CaseSection
        number="03"
        kicker="Sessão 2 · 29 participantes"
        title="Premissas, restrições e riscos"
      >
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { title: "Premissas", items: claroData.premissas },
            { title: "Restrições", items: claroData.restricoes },
            { title: "Riscos", items: claroData.riscos },
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
        kicker="Sessão 2 · Zen Voting"
        title="Diagrama de Alvo"
      >
        <p className="max-w-3xl body-md">
          O time escreveu em post-its as regras de negócio que deveriam compor
          os novos cards e as posicionou no diagrama, categorizando-as como
          prioritárias, secundárias ou terciárias. A votação gerou uma hierarquia
          clara de regras de negócio.
        </p>
        <div className="mt-6 card-ui p-7 space-y-5">
          <RuleBarChart title="Regras primárias" items={claroData.regrasP} />
          <RuleBarChart title="Regras secundárias" items={claroData.regrasS} />
          <RuleBarChart title="Regras terciárias" items={claroData.regrasT} />
        </div>
      </CaseSection>

      <CaseSection number="05" kicker="Reunião final · 12 participantes" title="MVP Canvas" inverted>
        <div className="card-ui p-7 bg-white">
          <p className="eyebrow mb-3">Objetivo do produto</p>
          <p className="text-lg leading-relaxed text-neutral-950 text-pretty">
            Padronizar todos os cards de venda presentes nas jornadas de sites e
            e-commerce e reformular a arquitetura de informação em busca de
            consistência visual, contemplando todas as personas e dispositivos
            com prioridade mobile first.
          </p>
        </div>
        <div className="mt-4 grid md:grid-cols-2 gap-4">
          <div className="card-ui p-6 bg-white">
            <p className="eyebrow mb-3.5 text-accent">Resultados esperados</p>
            <BulletList items={claroData.resultados} />
          </div>
          <div className="card-ui p-6 bg-white">
            <p className="eyebrow mb-3.5 text-accent">Métricas de validação</p>
            <div className="flex flex-wrap gap-2.5">
              {claroData.metricas.map((metrica, index) => (
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
        kicker="Depois do discovery"
        title="Co-criação com a esteira de e-commerce"
      >
        <p className="max-w-3xl body-md">
          Concluída a definição das regras de negócio, avançamos para reuniões
          de co-criação com designers e contents da esteira de e-commerce da
          Claro. Foi nesse trabalho conjunto, traduzindo a priorização e a
          arquitetura de informação em decisões de layout, que chegamos ao
          resultado final dos cards.
        </p>
        <div className="mt-6 grid sm:grid-cols-2 gap-4">
          <div className="card-ui p-6">
            <p className="text-base font-semibold text-neutral-950 mb-2">
              Trabalho conjunto
            </p>
            <p className="text-sm leading-relaxed text-neutral-500">
              Designers da esteira de e-commerce e o time de DesignOps
              definindo, em conjunto, o formato final do componente.
            </p>
          </div>
          <div className="card p-6 bg-neutral-950 text-white">
            <p className="text-4xl font-extrabold leading-none text-accent">8</p>
            <p className="mt-2 text-sm leading-relaxed text-white/70">
              cenários de card prontos para produção, do desenho ao
              desenvolvimento.
            </p>
          </div>
        </div>
        <div className="mt-8">
          <p className="eyebrow mb-3.5">
            Arquitetura do card · requisitos por ordem de disposição
          </p>
          <CaseImage
            src={claroData.reqImg}
            alt="Diagrama de requisitos do card por ordem de disposição, com prioridades primárias, secundárias e terciárias"
          />
        </div>
        <div className="mt-8">
          <p className="eyebrow mb-3.5">
            Conjunto final · 8 cards, do desenho ao desenvolvimento
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {claroData.cards.map((card) => (
              <CaseImage key={card.src} src={card.src} alt={card.alt} />
            ))}
          </div>
        </div>
      </CaseSection>

      <CaseQuote quote={claroData.quote} maxWidth="max-w-2xl" />
    </CaseStudyLayout>
  );
}
