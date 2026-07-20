import { CaseBlockSection, CaseImage } from "../components/cases/CaseBlocks";
import { CaseStudyLayout } from "../components/layout/CaseStudyLayout";
import { PostItTag, postItTone } from "../components/ui/PostItTag";
import { etituloData } from "../data/caseStudies";
import { caseStudies } from "../data/portfolio";

export function EtituloPage() {
  const config = caseStudies.etitulo;

  return (
    <CaseStudyLayout config={config}>
      <section className="max-w-5xl mx-auto px-5 md:px-16 pb-4">
        <CaseImage
          src={etituloData.overviewImg}
          alt="Capa do case e-Título — TSE · Service Design e redesenho da jornada de onboarding"
          fill
          aspect="aspect-[2528/1328]"
          priority
        />
      </section>

      <CaseBlockSection
        label="01 / 08 · Visão geral"
        title="Um serviço tratado como ecossistema, não apenas como interface"
      >
        <div className="grid md:grid-cols-2 gap-8 md:gap-14">
          <div>
            <p className="body-md">
              Atuei como Service Designer responsável pela condução estratégica
              do projeto, liderando a frente de experiência e articulando um time
              multidisciplinar, com apoio das disciplinas de UX, Consumer
              Insights e Comunicação para garantir uma leitura sistêmica da
              jornada.
            </p>
            <div className="mt-6 grid grid-cols-2 gap-5">
              {[
                ["Papel", "Lead Service Designer"],
                ["Contexto", "Hitss / Claro Brasil"],
                ["Cliente", "Tribunal Superior Eleitoral"],
                ["Período", "2026"],
              ].map(([label, value]) => (
                <div key={label}>
                  <p className="eyebrow mb-1.5">{label}</p>
                  <p className="text-[15px] font-medium text-neutral-950">{value}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="card p-7 bg-neutral-950 text-white">
            <p className="eyebrow mb-4 text-white/50">Impacto estratégico</p>
            <div className="flex flex-col gap-4">
              {etituloData.impacto.map((item) => (
                <div
                  key={item.n}
                  className="grid grid-cols-[26px_1fr] gap-3 items-start"
                >
                  <span className="font-mono text-xs text-accent">{item.n}</span>
                  <span className="text-sm leading-relaxed text-white/80">
                    {item.t}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CaseBlockSection>

      <CaseBlockSection
        label="02 / 08 · Entendendo o problema"
        title="Definição do desafio"
      >
        <div className="divide-y divide-neutral-200">
          {[
            [
              "Problema",
              "Os problemas não estavam em uma funcionalidade isolada, mas na transição entre etapas, na falta de previsibilidade, na ausência de feedback claro e na dependência excessiva da memória e da compreensão do usuário.",
            ],
            [
              "Objetivo",
              "Redesenhar uma nova jornada de onboarding para o e-Título com acessibilidade como foco central. Mais do que adaptar um fluxo existente, repensar a forma como os eleitores acessam o app, com experiência fluida e inclusiva desde o primeiro toque na tela.",
            ],
            [
              "Proposta",
              "Criar uma nova jornada de onboarding (To Be) baseada em pesquisa, benchmarking e testes com usuários, incorporando configurações de acessibilidade desde o início, múltiplos métodos de validação de identidade, feedbacks mais claros e uma estrutura de melhoria contínua por meio de Árvores de Oportunidades.",
            ],
          ].map(([label, text]) => (
            <div
              key={label}
              className="grid md:grid-cols-[minmax(120px,180px)_1fr] gap-4 md:gap-10 py-6 first:pt-0"
            >
              <div className="text-lg font-semibold text-neutral-950">{label}</div>
              <p className="body-md">{text}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 p-8 md:p-11 rounded-card bg-neutral-950">
          <p className="eyebrow mb-4 text-white/50">Quem mais sente</p>
          <p className="text-2xl md:text-4xl font-bold leading-tight text-white max-w-2xl text-pretty">
            Essas dores afetam de forma mais intensa idosos, pessoas com
            necessidades especiais e eleitores em situação de urgência nos dias
            de eleição.
          </p>
        </div>
      </CaseBlockSection>

      <CaseBlockSection
        label="03 / 08 · Abordagem do Service Design"
        title="Quatro fases, uma leitura de ponta a ponta"
      >
        <div className="grid md:grid-cols-2 gap-4">
          {etituloData.fases.map((fase) => (
            <div key={fase.n} className="card p-7">
              <div className="flex items-baseline gap-2.5">
                <span className="font-mono text-xs text-accent">{fase.n}</span>
                <h3 className="text-xl font-semibold text-neutral-950">{fase.t}</h3>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-neutral-500">{fase.d}</p>
              <div className="mt-4 pt-4 border-t border-neutral-200 flex flex-wrap gap-2.5">
                {fase.m.map((method, methodIndex) => (
                  <PostItTag key={method} index={methodIndex}>
                    {method}
                  </PostItTag>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CaseBlockSection>

      <CaseBlockSection
        label="04 / 08 · Personas"
        title="Para quem estamos projetando"
      >
        <p className="max-w-2xl body-md mb-8">
          Três perfis que sintetizam motivações, contextos e barreiras distintas
          diante da Justiça Eleitoral digital.
        </p>
        <div className="grid md:grid-cols-3 gap-4">
          {etituloData.personas.map((persona, index) => (
            <div key={persona.nome} className="card overflow-hidden rounded-2xl">
              {persona.img && (
                <CaseImage
                  src={persona.img}
                  alt={persona.imgAlt ?? persona.nome}
                  className="!rounded-none shadow-none border-b border-neutral-200"
                />
              )}
              <div className="p-7">
                <h3 className="text-xl font-semibold text-neutral-950">
                  {persona.nome}
                </h3>
                <p className="mt-1 text-sm text-neutral-500">{persona.meta}</p>
                <div className="mt-3.5 flex flex-wrap gap-2.5">
                  {persona.tags.map((tag, tagIndex) => (
                    <PostItTag key={tag} index={tagIndex + index}>
                      {tag}
                    </PostItTag>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-neutral-200">
                  <p className="eyebrow mb-1.5 text-accent">Motivação</p>
                  <p className="text-sm leading-relaxed text-neutral-500">
                    {persona.mot}
                  </p>
                </div>
                <div className="mt-3.5">
                  <p className="eyebrow mb-1.5 text-accent">Objetivo</p>
                  <p className="text-sm leading-relaxed text-neutral-500">
                    {persona.obj}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CaseBlockSection>

      <section className="section-inverted py-16 md:py-28">
        <div className="max-w-5xl mx-auto">
          <p className="eyebrow mb-6 text-white/50">05 / 08 · Insight-chave</p>
          <blockquote className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-[1.08] text-white max-w-lg text-balance">
            “O serviço exigia que o eleitor fosse{" "}
            <span className="text-accent">resiliente</span>, quando deveria
            protegê-lo.”
          </blockquote>
          <p className="mt-6 max-w-2xl body-md text-white/70">
            A síntese da jornada revelou que os problemas não estavam em uma
            funcionalidade isolada, mas distribuídos por todo o ecossistema do
            serviço — do onboarding ao uso recorrente, dos players concorrentes
            ao suporte e aos processos internos de governança.
          </p>
        </div>
      </section>

      <CaseBlockSection
        label="06 / 08 · Principais dores identificadas"
        title="Onde a jornada As-Is quebrava"
      >
        <div className="grid md:grid-cols-2 gap-x-10">
          {etituloData.pains.map((pain) => (
            <div
              key={pain.n}
              className="grid grid-cols-[34px_1fr] gap-3.5 py-5 border-t border-neutral-200"
            >
              <span className="font-mono text-xs text-neutral-500">{pain.n}</span>
              <div>
                <p className="eyebrow mb-2 text-accent">{pain.t}</p>
                <p className="body-md text-neutral-950">{pain.d}</p>
              </div>
            </div>
          ))}
        </div>
      </CaseBlockSection>

      <CaseBlockSection
        label="07 / 08 · Jornada To Be"
        title="Um novo onboarding, acessível por padrão"
      >
        <p className="max-w-2xl body-md mb-8">
          Nova jornada de onboarding projetada para acessibilidade, segurança e
          inclusão digital na Justiça Eleitoral — em 12 etapas.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3.5">
          {etituloData.steps.map((step, index) => (
            <div
              key={step.n}
              className="relative overflow-hidden rounded-lg border border-neutral-200 bg-white p-5"
            >
              <span
                aria-hidden
                className={`case-card-accent ${postItTone(index)}`}
              />
              <div className="w-8 h-8 rounded-ui bg-accent text-white flex items-center justify-center font-mono text-xs font-bold">
                {step.n}
              </div>
              <h3 className="mt-3.5 text-base font-semibold text-neutral-950">
                {step.t}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-neutral-500">
                {step.d}
              </p>
            </div>
          ))}
        </div>
      </CaseBlockSection>

      <CaseBlockSection
        label="08 / 08 · Melhoria contínua"
        title="Oportunidades de evolução do serviço"
      >
        <p className="max-w-2xl body-md mb-8">
          A partir das dores e insights, emergiram oportunidades claras —
          organizadas por horizonte de impacto para orientar o roadmap.
        </p>
        <div className="grid md:grid-cols-2 gap-4">
          {etituloData.oportunidades.map((item, index) => (
            <div key={item.n} className="card p-7">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl font-extrabold leading-none text-neutral-200">
                  {item.n}
                </span>
                <PostItTag index={index}>{item.tag}</PostItTag>
              </div>
              <h3 className="text-lg font-semibold text-neutral-950">{item.t}</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-neutral-500">
                {item.d}
              </p>
            </div>
          ))}
        </div>
      </CaseBlockSection>

      <section className="section-inverted py-20 md:py-32">
        <div className="max-w-5xl mx-auto">
          <p className="eyebrow mb-6 text-white/50">
            Novo onboarding e-Título · TSE
          </p>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-none tracking-tight text-white max-w-lg">
            Uma jornada projetada para simplificar a{" "}
            <span className="text-accent">cidadania digital.</span>
          </h2>
        </div>
      </section>
    </CaseStudyLayout>
  );
}
