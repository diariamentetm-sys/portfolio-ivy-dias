import { CaseBlockSection, CaseQuote } from "../components/cases/CaseBlocks";
import { ServiceBlueprint } from "../components/cases/ServiceBlueprint";
import { CaseStudyLayout } from "../components/layout/CaseStudyLayout";
import { PostItNote, PostItTag } from "../components/ui/PostItTag";
import { useContent } from "../content/ContentContext";
import { resolveCaseStudyConfig } from "../data/seedProjects";
import { useLocale } from "../i18n/LocaleContext";
import {
  getManagedProject,
  getSectionImages,
  resolveOverviewSrc,
} from "../utils/projectMedia";

const OVERVIEW_FALLBACK = "/images/policia-federal-overview.png";
const OVERVIEW_CACHE_BUST = "v=20260722workshop";

function withOverviewCacheBust(src: string) {
  if (!src.includes("policia-federal-overview")) return src;
  const [path] = src.split("?");
  return `${path}?${OVERVIEW_CACHE_BUST}`;
}

const pageCopy = {
  pt: {
    overviewLabel: "Visão geral",
    overviewTitle: "Padronização nacional de computadores",
    overviewBody:
      "O Workshop de Padronização de Computadores reuniu representantes da Polícia Federal de diversas regiões do Brasil para revisar o processo de disponibilização de equipamentos e construir uma proposta de padronização nacional. O encontro combinou facilitação, roteirização e Design de Serviço — e o extrato abaixo reúne os resultados de cada ferramenta em post-its, como no workshop.",
    agendaLabel: "Agenda",
    agendaTitle: "Roteiro do workshop",
    agendaBody:
      "A sessão seguiu um roteiro claro: alinhar o desafio, mapear o cenário atual e desenhar o futuro desejado.",
    agenda: [
      {
        n: "01",
        t: "Alinhamento do desafio",
        d: "Construção coletiva da pergunta norteadora e alinhamento de expectativas entre as regiões.",
      },
      {
        n: "02",
        t: "Jornada AS IS",
        d: "Mapeamento do cenário de uso atual: recebimento, distribuição e renovação de equipamentos.",
      },
      {
        n: "03",
        t: "Jornada TO BE",
        d: "Desenho colaborativo do processo futuro, com responsabilidades e pontos de contato definidos.",
      },
    ],
    asIsLabel: "AS IS",
    asIsTitle: "Jornada do cenário atual",
    asIsBody:
      "Especialistas compartilharam o funcionamento real do processo enquanto os demais participantes registravam dificuldades e oportunidades. Três frentes estruturaram o mapa:",
    asIs: [
      {
        t: "Recebimento",
        d: "Como os equipamentos chegam à instituição e entram no fluxo operacional.",
      },
      {
        t: "Distribuição",
        d: "Como os ativos são alocados às unidades e às demandas regionais.",
      },
      {
        t: "Renovação",
        d: "Como acontece a substituição e o ciclo de vida dos computadores em uso.",
      },
    ],
    challengeLabel: "Desafio",
    challenge:
      "Como podemos melhorar o modelo atual de disponibilização de computadores da Polícia Federal?",
    challengeContext:
      "O workshop partiu dessa pergunta para revisar um processo que precisava ser mais padronizado, eficiente e aderente às diferentes realidades da instituição.",
    hmwLabel: "How Might We",
    hmwTitle: "Problemas convertidos em oportunidades",
    hmwBody:
      "Na dinâmica Como Podemos?, cada fricção do AS IS virou uma pergunta aberta de inovação — o registro do workshop, em post-its:",
    hmw: [
      "Como podemos justificar equipamentos de maior custo quando a necessidade for real?",
      "Como podemos flexibilizar a MOC sem perder controle institucional?",
      "Como podemos definir critérios claros de distribuição?",
      "Como podemos identificar a real necessidade do usuário (função, competências e TI)?",
      "Como podemos definir cenários de uso com mais clareza?",
      "Como podemos rever a obrigatoriedade de determinados equipamentos?",
    ],
    solutionLabel: "TO BE",
    solutionTitle: "Dois fluxos da jornada futura",
    solutionBody:
      "Na sessão de Design de Serviços, consolidamos os insights em dois service blueprints TO BE — faixa de ações do usuário e faixa de frontstage (canais e sistemas), com post-its alinhados na linha do tempo:",
    journeyLane: "jornada",
    frontstageLane: "frontstage",
    flows: [
      {
        t: "Recebimento e distribuição de computadores",
        stages: [
          {
            journey: "MOC obrigatório por determinação TOP/BOTTOM",
            frontstage: "E-mail e papel de parede por superintendência",
            tone: "blue" as const,
          },
          {
            journey: "Entrega dos kits",
            frontstage: "NTIS",
            tone: "blue" as const,
          },
          {
            journey: "Comunicar deadline para devolução do equipamento antigo",
            frontstage: null,
            tone: "blue" as const,
          },
          {
            journey: "Recolhimento do equipamento antigo",
            frontstage: null,
            tone: "mint" as const,
          },
          {
            journey: "Equipamentos distribuídos de acordo com a MOC",
            frontstage: "NTIS",
            tone: "mint" as const,
          },
        ],
      },
      {
        t: "Renovação de computadores",
        stages: [
          {
            journey: "Consultar a área técnica sobre o melhor equipamento",
            frontstage: null,
            tone: "lavender" as const,
          },
          {
            journey:
              "Assim que for solicitado novo equipamento, equipe DTI notifica usuário",
            frontstage: "TEAM",
            tone: "lavender" as const,
          },
          {
            journey:
              "Formulário para entendimento de novas demandas, aplicado de tempos em tempos",
            frontstage: "Formulário com tipo e quantidade",
            tone: "lavender" as const,
          },
          {
            journey: "Recolhimento do equipamento antigo",
            frontstage: "NTIS",
            tone: "mint" as const,
          },
          {
            journey: "Equipamentos distribuídos de acordo com a MOC",
            frontstage: "NTIS",
            tone: "mint" as const,
          },
        ],
      },
    ],
    resultsLabel: "Resultado",
    resultsTitle: "O que o workshop consolidou",
    resultsBody:
      "Mais do que um fluxograma, o encontro criou consenso operacional. Os principais resultados:",
    results: [
      "Alinhamento entre áreas e regiões da Polícia Federal",
      "Consolidação da jornada futura (TO BE)",
      "Modelo padronizado de disponibilização",
      "Visão compartilhada do processo",
      "Backlog de melhorias para evolução contínua",
    ],
    nextLabel: "Próximos passos",
    nextTitle: "Visão do backlog futuro",
    nextBody:
      "O time identificou algumas dores na atual jornada, formando um composto de dores a serem abordadas em dinâmicas futuras.",
    backlog: [
      "Como podemos aumentar a vida útil dos desktops que estão fora da garantia?",
      "Como podemos estender a vida útil dos equipamentos Ultrabook?",
      "Como podemos definir o tempo para substituição? Quais critérios?",
      "Como podemos gerar procedimentos que possam separar os equipamentos insensíveis, a reparar, a doar, a utilizar?",
      "Como podemos ter um sistema eficiente de gestão de patrimônio que atenda as especificidades de equipamento de TIC?",
      "Como podemos impedir que as localidades adquiram outros desktops / ultrabooks via T.A.C.?",
      "Como podemos evitar que equipamentos ainda úteis sejam enviados ao depósito com a chegada de novos?",
    ],
  },
  en: {
    overviewLabel: "Overview",
    overviewTitle: "National computer standardization",
    overviewBody:
      "The Computer Standardization Workshop brought together Federal Police representatives from regions across Brazil to review how equipment is made available and to build a national standardization proposal. Facilitation, scripting, and Service Design shaped the session — and the extract below captures each tool’s outcomes as post-its, just as in the workshop.",
    agendaLabel: "Agenda",
    agendaTitle: "Workshop script",
    agendaBody:
      "The session followed a clear path: align on the challenge, map the current scenario, and design the desired future.",
    agenda: [
      {
        n: "01",
        t: "Challenge alignment",
        d: "Collective framing of the guiding question and shared expectations across regions.",
      },
      {
        n: "02",
        t: "AS-IS journey",
        d: "Mapping the current scenario: receiving, distributing, and renewing equipment.",
      },
      {
        n: "03",
        t: "TO-BE journey",
        d: "Collaborative design of the future process, with responsibilities and touchpoints defined.",
      },
    ],
    asIsLabel: "AS IS",
    asIsTitle: "Current-state journey",
    asIsBody:
      "Specialists shared how the process really worked while others captured friction and opportunities. Three fronts structured the map:",
    asIs: [
      {
        t: "Receiving",
        d: "How equipment enters the institution and the operational flow.",
      },
      {
        t: "Distribution",
        d: "How assets are allocated to units and regional demands.",
      },
      {
        t: "Renewal",
        d: "How replacement and the computer lifecycle work in practice.",
      },
    ],
    challengeLabel: "Challenge",
    challenge:
      "How might we improve the Federal Police’s current model for making computers available?",
    challengeContext:
      "The workshop started from this question to revise a process that needed to be more standardized, efficient, and aligned with the institution’s diverse realities.",
    hmwLabel: "How Might We",
    hmwTitle: "Problems turned into opportunities",
    hmwBody:
      "In the How Might We exercise, each AS-IS friction became an open innovation question — the workshop record, as post-its:",
    hmw: [
      "How might we justify higher-cost equipment when the need is real?",
      "How might we make the MOC more flexible without losing institutional control?",
      "How might we define clear distribution criteria?",
      "How might we identify the user’s real needs (role, skills, and IT)?",
      "How might we define usage scenarios more clearly?",
      "How might we revisit mandatory requirements for certain equipment?",
    ],
    solutionLabel: "TO BE",
    solutionTitle: "Two flows of the future journey",
    solutionBody:
      "In the Service Design session, we consolidated insights into two TO-BE service blueprints — a user-actions lane and a frontstage lane (channels and systems), with post-its aligned on the timeline:",
    journeyLane: "journey",
    frontstageLane: "frontstage",
    flows: [
      {
        t: "Receiving and distributing computers",
        stages: [
          {
            journey: "Mandatory MOC by TOP/BOTTOM determination",
            frontstage: "Email and wallpaper by superintendency",
            tone: "blue" as const,
          },
          {
            journey: "Kit delivery",
            frontstage: "NTIS",
            tone: "blue" as const,
          },
          {
            journey: "Communicate deadline to return old equipment",
            frontstage: null,
            tone: "blue" as const,
          },
          {
            journey: "Collect old equipment",
            frontstage: null,
            tone: "mint" as const,
          },
          {
            journey: "Equipment distributed according to the MOC",
            frontstage: "NTIS",
            tone: "mint" as const,
          },
        ],
      },
      {
        t: "Computer renewal",
        stages: [
          {
            journey: "Consult the technical area about the best equipment",
            frontstage: null,
            tone: "lavender" as const,
          },
          {
            journey:
              "As soon as new equipment is requested, the DTI team notifies the user",
            frontstage: "TEAM",
            tone: "lavender" as const,
          },
          {
            journey:
              "Form to understand new demands, applied from time to time",
            frontstage: "Form with type and quantity",
            tone: "lavender" as const,
          },
          {
            journey: "Collect old equipment",
            frontstage: "NTIS",
            tone: "mint" as const,
          },
          {
            journey: "Equipment distributed according to the MOC",
            frontstage: "NTIS",
            tone: "mint" as const,
          },
        ],
      },
    ],
    resultsLabel: "Outcome",
    resultsTitle: "What the workshop consolidated",
    resultsBody:
      "More than a flowchart, the session built operational consensus. Key outcomes:",
    results: [
      "Alignment across Federal Police areas and regions",
      "Consolidated future journey (TO-BE)",
      "Standardized provisioning model",
      "Shared process vision",
      "Improvement backlog for continuous evolution",
    ],
    nextLabel: "Next steps",
    nextTitle: "Future backlog vision",
    nextBody:
      "The team identified pain points in the current journey, forming a set of issues to address in future workshops.",
    backlog: [
      "How might we increase the lifespan of desktops that are out of warranty?",
      "How might we extend the lifespan of Ultrabook equipment?",
      "How might we define the time for replacement? Which criteria?",
      "How might we create procedures to separate equipment: to repair, to donate, to reuse?",
      "How might we have an efficient asset management system that meets ICT equipment specificities?",
      "How might we prevent locations from acquiring other desktops / ultrabooks via T.A.C.?",
      "How might we avoid sending still-useful equipment to storage when new ones arrive?",
    ],
  },
} as const;

export function PoliciaFederalPage() {
  const { locale } = useLocale();
  const { content } = useContent();
  const copy = pageCopy[locale];
  const config = resolveCaseStudyConfig(
    "policia-federal",
    locale,
    content.projects,
  );
  const project = getManagedProject(content.projects, "policia-federal");
  const overviewSrc = resolveOverviewSrc(project, OVERVIEW_FALLBACK);
  const overviewImages = getSectionImages(project, locale, 0);

  const heroSrc = withOverviewCacheBust(
    overviewSrc || overviewImages[0]?.src?.trim() || OVERVIEW_FALLBACK,
  );

  return (
    <CaseStudyLayout config={config}>
      <CaseBlockSection label={copy.overviewLabel} title={copy.overviewTitle}>
        <p className="max-w-3xl body-md">{copy.overviewBody}</p>
        {heroSrc ? (
          <div className="mt-8">
            <img
              src={heroSrc}
              alt={`${config.title}${config.titleAccent ?? ""}`}
              className="block h-auto w-full rounded-2xl shadow-card bg-white"
              loading="eager"
              decoding="async"
            />
          </div>
        ) : null}
      </CaseBlockSection>

      <CaseBlockSection label={copy.agendaLabel} title={copy.agendaTitle}>
        <p className="max-w-3xl body-md">{copy.agendaBody}</p>
        <div className="mt-8 grid md:grid-cols-3 gap-4">
          {copy.agenda.map((item, index) => (
            <PostItNote key={item.n} index={index} compact>
              <p className="font-mono text-xs text-neutral-700">{item.n}</p>
              <h3 className="mt-3 text-xl font-semibold text-neutral-950">
                {item.t}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-neutral-800">
                {item.d}
              </p>
            </PostItNote>
          ))}
        </div>
      </CaseBlockSection>

      <CaseQuote
        label={copy.challengeLabel}
        quote={copy.challenge}
        maxWidth="max-w-3xl"
      >
        <p>{copy.challengeContext}</p>
      </CaseQuote>

      <CaseBlockSection label={copy.asIsLabel} title={copy.asIsTitle}>
        <p className="max-w-3xl body-md">{copy.asIsBody}</p>
        <div className="mt-8 grid md:grid-cols-3 gap-4">
          {copy.asIs.map((item, index) => (
            <PostItNote key={item.t} index={index + 1} compact>
              <PostItTag index={index}>{item.t}</PostItTag>
              <p className="mt-4 text-sm leading-relaxed text-neutral-800">
                {item.d}
              </p>
            </PostItNote>
          ))}
        </div>
      </CaseBlockSection>

      <CaseBlockSection label={copy.hmwLabel} title={copy.hmwTitle}>
        <p className="max-w-3xl body-md">{copy.hmwBody}</p>
        <div className="mt-8 grid sm:grid-cols-2 gap-4">
          {copy.hmw.map((item, index) => (
            <PostItNote key={item} index={index} compact>
              <p className="eyebrow mb-3 text-neutral-700">
                {locale === "pt" ? "Como podemos?" : "How might we?"}
              </p>
              <p className="text-sm leading-relaxed text-neutral-950 text-pretty">
                {item}
              </p>
            </PostItNote>
          ))}
        </div>
      </CaseBlockSection>

      <CaseBlockSection label={copy.solutionLabel} title={copy.solutionTitle}>
        <p className="max-w-3xl body-md">{copy.solutionBody}</p>
        <div className="mt-10 flex flex-col gap-16">
          {copy.flows.map((flow, flowIndex) => (
            <ServiceBlueprint
              key={flow.t}
              title={flow.t}
              journeyLane={copy.journeyLane}
              frontstageLane={copy.frontstageLane}
              stages={flow.stages}
              toneOffset={flowIndex * 2}
            />
          ))}
        </div>
      </CaseBlockSection>

      <CaseBlockSection label={copy.resultsLabel} title={copy.resultsTitle}>
        <p className="max-w-3xl body-md">{copy.resultsBody}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          {copy.results.map((item, index) => (
            <PostItTag
              key={item}
              index={index}
              className="max-w-full whitespace-normal text-left leading-snug"
            >
              {item}
            </PostItTag>
          ))}
        </div>
      </CaseBlockSection>

      <CaseBlockSection label={copy.nextLabel} title={copy.nextTitle}>
        <p className="max-w-3xl body-md">{copy.nextBody}</p>
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {copy.backlog.map((item, index) => (
            <PostItNote key={item} index={index} tone="post-it-coral" compact>
              <p className="text-sm leading-relaxed text-neutral-950 text-pretty">
                {item}
              </p>
            </PostItNote>
          ))}
        </div>
      </CaseBlockSection>
    </CaseStudyLayout>
  );
}
