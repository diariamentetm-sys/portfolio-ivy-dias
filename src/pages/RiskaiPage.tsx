import { CaseBlockSection, CaseImage, CaseQuote } from "../components/cases/CaseBlocks";
import { CasePasswordGate } from "../components/cases/CasePasswordGate";
import { ProductCanvas } from "../components/cases/ProductCanvas";
import { QuotesCarousel } from "../components/cases/QuotesCarousel";
import { ServiceBlueprint } from "../components/cases/ServiceBlueprint";
import { CaseStudyLayout } from "../components/layout/CaseStudyLayout";
import { PostItNote, PostItTag } from "../components/ui/PostItTag";
import { useContent } from "../content/ContentContext";
import { resolveCaseStudyConfig } from "../data/seedProjects";
import { useLocale } from "../i18n/LocaleContext";

function CesScoreCard({
  name,
  score,
  insight,
  index,
}: {
  name: string;
  score: string;
  insight: string;
  index: number;
}) {
  return (
    <PostItNote index={index} compact className="!rotate-0 min-h-[11rem]">
      <div className="flex items-baseline justify-between gap-3">
        <p className="text-sm font-semibold text-neutral-950">{name}</p>
        <p className="font-mono text-2xl font-bold text-accent tabular-nums">
          {score}
        </p>
      </div>
      <p className="mt-4 text-sm leading-relaxed text-neutral-800 text-pretty">
        {insight}
      </p>
    </PostItNote>
  );
}

function WaveRoadmap({
  waves,
}: {
  waves: readonly { n: string; title: string; body: string; milestone?: string }[];
}) {
  return (
    <div className="-mx-5 md:mx-0 overflow-x-auto pb-2">
      <div className="flex min-w-max gap-4 px-5 md:px-0 md:min-w-0 md:grid md:grid-cols-2 xl:grid-cols-3">
        {waves.map((wave, index) => (
          <PostItNote
            key={wave.n}
            index={index}
            compact
            className="w-[16.5rem] shrink-0 md:w-auto !rotate-0"
          >
            <div className="flex items-center justify-between gap-2">
              <p className="font-mono text-xs text-neutral-700">{wave.n}</p>
              {wave.milestone ? (
                <PostItTag index={index} className="!text-[10px]">
                  {wave.milestone}
                </PostItTag>
              ) : null}
            </div>
            <h3 className="mt-3 text-base font-semibold text-neutral-950">
              {wave.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-neutral-800 text-pretty">
              {wave.body}
            </p>
          </PostItNote>
        ))}
      </div>
    </div>
  );
}

function PhaseRoadmap({
  phases,
}: {
  phases: readonly {
    n: string;
    title: string;
    goal: string;
    items: readonly string[];
  }[];
}) {
  return (
    <div className="grid gap-6 md:grid-cols-3 md:gap-5 lg:gap-6">
      {phases.map((phase, phaseIndex) => (
        <article
          key={phase.n}
          className="flex flex-col border-t-2 border-neutral-950 pt-5"
        >
          <p className="font-mono text-xs tracking-wide text-accent">
            {phase.n}
          </p>
          <h3 className="mt-2 text-lg font-bold leading-snug text-neutral-950 text-pretty">
            {phase.title}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-neutral-700 text-pretty">
            {phase.goal}
          </p>
          <ul className="mt-5 flex flex-1 flex-col gap-2.5">
            {phase.items.map((item, index) => (
              <li key={item}>
                <PostItNote
                  index={phaseIndex + index}
                  compact
                  className="!rotate-0 w-full"
                >
                  <p className="text-sm leading-snug text-neutral-950 text-pretty">
                    {item}
                  </p>
                </PostItNote>
              </li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  );
}

const pageCopy = {
  pt: {
    overviewImageAlt:
      "Wireframe da home do RiskAI: sidebar, cards de acesso rápido e barra de conversa com o assistente.",
    overviewImageCaption:
      "Wireframe da home — navegação lateral, atalhos e entrada conversacional do assistente.",
    challengeLabel: "O desafio",
    challengeTitle: "Cinco torres, um processo fragmentado",
    challengeTool: "Briefing + alinhamento de motivadores do negócio",
    toolLabel: "Ferramenta",
    challengeBody:
      "A Petrobras gerencia riscos em cinco frentes — GIR, Projetos, Estocásticos, Operacional e Crédito — e cada torre havia desenvolvido seu próprio jeito de lidar com normas, inspeções, recomendações de seguradoras e históricos de decisão. O trabalho era tecnicamente sólido, mas operacionalmente fragmentado: informação espalhada, retrabalho constante e decisões que dependiam demais da memória de especialistas.",
    challengeInvite:
      "O convite: transformar a gestão de riscos em um processo mais ágil, integrado e inteligente — com experiência unificada para decidir com velocidade e consistência.",
    motivatorsLabel: "Motivadores",
    motivators: [
      {
        t: "Agilidade",
        d: "Menos tempo em buscas manuais; mais tempo para interpretar o que realmente importa.",
      },
      {
        t: "Padronização",
        d: "Unificar metodologias e interpretações entre torres que falavam línguas ligeiramente diferentes.",
      },
      {
        t: "Experiência",
        d: "Evoluir o dia a dia das equipes para algo moderno, intuitivo e capaz de sustentar decisões complexas.",
      },
    ],
    discoveryLabel: "Discovery",
    discoveryTitle: "Cinco movimentos estruturados",
    discoveryTool: "Roteiro de Discovery (Imersão → Melhoria Contínua)",
    discoveryBody:
      "Para chegar lá, desenhamos um discovery em cinco movimentos — da escuta profunda ao roadmap evolutivo.",
    discoveryImageAlt:
      "Quadro Miro do discovery: personas entrevistadas, observações transversais e jornadas AS-IS mapeadas com as torres de risco da Petrobras.",
    discoveryImageCaption:
      "Board Miro Petrobras — personas, observações transversais e jornadas AS-IS do discovery.",
    discovery: [
      {
        n: "01",
        t: "Imersão",
        d: "Entrevistas com as torres, personas e mapeamento das jornadas AS-IS e microjornadas.",
      },
      {
        n: "02",
        t: "Definição",
        d: "Lean Inception: dores, necessidades e oportunidades por torre + direcionadores do MVP.",
      },
      {
        n: "03",
        t: "Ideação",
        d: "Cocriação de fluxos, hipóteses e protótipos navegáveis a partir dos achados.",
      },
      {
        n: "04",
        t: "Validação",
        d: "Testes com usuários reais — mensagens, usabilidade e tomada de decisão.",
      },
      {
        n: "05",
        t: "Melhoria contínua",
        d: "Priorização impacto × esforço e roadmap evolutivo para além do MVP.",
      },
    ],
    immersionLabel: "Imersão",
    immersionTitle: "Ouvindo as cinco torres",
    immersionTool:
      "Entrevistas em profundidade · Jornadas AS-IS · Microjornadas",
    immersionBody:
      "Campo com GIR, Projetos, Estocásticos, Operacional e Crédito gerou um volume que confirmou a hipótese: o problema não era falta de dado — era falta de conexão entre eles.",
    stats: [
      { v: "30+", l: "Insights iniciais" },
      { v: "39", l: "Jornadas mapeadas" },
      { v: "100+", l: "Oportunidades" },
    ],
    painsLabel: "Dores recorrentes",
    painsTool: "Síntese de dores (Lean Inception por torre)",
    pains: [
      "Vasculhar múltiplas bases internas e externas para achar informação crítica",
      "Consolidar recomendações e checar histórico com esforço desproporcional",
      "Interpretação variável de auditorias e seguradoras, sem padrão",
      "Decisões passadas sem rastro claro do porquê",
      "Acesso burocrático a normas e documentos com níveis de confidencialidade",
      "Sem automação no cruzamento Beacon, EPSC, CSB, ANP e Marsh",
      "Difícil comparar versões de documentos e ver o que mudou",
      "Lacunas de integração com crédito, performance e vendas",
    ],
    opportunitiesLabel: "Oportunidades",
    opportunitiesTool: "Mapa de oportunidades a partir das jornadas AS-IS",
    opportunities: [
      "Hub unificado de consulta a inspeções e bases técnicas",
      "Interpretação automática de PDFs e ingestão estruturada",
      "Automação de busca e cruzamento de conteúdos críticos",
      "Conectar performance e vendas via SAP/AIDA ao contexto de risco",
      "Histórico de decisões para recomendações similares",
      "Filtros avançados por risco, torre, severidade, origem e ativo",
      "Fluxos conversacionais na jornada de investigação",
      "Acesso centralizado às normas NORTEC com confidencialidade",
      "Diff automático entre versões e fontes omnidata",
      "Relatórios automáticos, avisos de ciclo e decisão assistida por IA",
    ],
    personasLabel: "Definição",
    personasTitle: "Quinze pessoas, uma dor comum",
    personasTool: "Personas (extraídas das entrevistas reais)",
    personasBody:
      "Construímos 15 personas a partir de entrevistas reais. Em contextos diferentes, as frustrações convergem: confiança, tempo e retrabalho.",
    featuredPersonas: [
      {
        name: "Humberto",
        tower: "RO-BIR · Engenharia",
        quote:
          "Sou usuário básico de IA e conservador: não quero inventar moda, quero padrão. Se a plataforma ler o relatório, me devolver um texto guiado com base nas normas e em casos já aceitos… eu ganho tempo.",
      },
      {
        name: "André",
        tower: "RO-BIR · Early adopter",
        quote:
          "A IA precisa entregar um V0 comprovado — citações em API/NFPA/ABNT, lições aprendidas e casos similares, separando fato de sugestão.",
      },
      {
        name: "Felipe",
        tower: "Operacional",
        quote:
          "Buscar uma recomendação, cruzar com as normas API e consultar o histórico — a AP 74 passou pela mesma situação.",
      },
      {
        name: "Cassiano",
        tower: "Ferramentas",
        quote:
          "O que a gente conseguir automatizar, que a gente consiga gastar menos HH, porque demandas adicionais tão sempre aparecendo.",
      },
      {
        name: "Renan",
        tower: "Projetos · Dados",
        quote:
          "Eu vejo o sucesso quando acontece uma entrega, quando um trabalho que está na minha mão passa pra mão da outra pessoa e anda com aquilo pra frente.",
      },
      {
        name: "Eduardo",
        tower: "Crédito",
        quote:
          "Nosso problema maior é extração de dados de PDFs e pesquisas bibliográficas.",
      },
      {
        name: "Lucas",
        tower: "Crédito",
        quote:
          "Pedir no Teams para o analista de crédito rodar um modelo e já receber o PDF pronto.",
      },
      {
        name: "Cláudia",
        tower: "F&A · Projetos",
        quote:
          "O produto do time é o Mapa de Riscos, não a revisão em si — atrapalha gente chegando sem preparo para discutir risco.",
      },
    ],
    otherPersonasLabel: "Também ouvidos",
    otherPersonas: [
      "Daniel · Projetos",
      "Renan (coord.) · Investimentos",
      "Vanessa · F&A",
      "Alexandre · Estocásticos",
      "Marcus · Estocásticos",
      "Roberta · Crédito",
      "Igor · Crédito",
    ],
    visionLabel: "Visão de produto",
    visionTitle: "O que estávamos construindo, em uma frase",
    visionTool: "Lean UX — declaração de visão (Para / Que / É um / Diferente)",
    lean: [
      {
        k: "Para",
        v: "as equipes de gestão de riscos da Petrobras — GIR, Projetos, Estocásticos, Operacional e Crédito",
      },
      {
        k: "Que",
        v: "precisam acessar informações de risco com agilidade, precisão e consistência",
      },
      {
        k: "É um",
        v: "assistente inteligente de apoio à decisão que centraliza dados, interpreta recomendações e sugere ações",
      },
      {
        k: "Diferente",
        v: "dos processos atuais, distribuídos, manuais e fragmentados",
      },
      {
        k: "Nossa solução",
        v: "oferece uma experiência unificada, conversacional e orientada por evidências",
      },
    ],
    canvasLabel: "Product Canvas",
    canvasTitle: "Doze blocos para dar corpo à visão",
    canvasTool: "Product Canvas (12 blocos)",
    canvasName: "RiskAI · Product Canvas",
    canvas: [
      {
        label: "Segmento de usuário",
        body: "Cinco torres de risco: GIR, Projetos, Estocásticos, Operacional e Crédito.",
      },
      {
        label: "Proposta de valor",
        body: "Assistente que centraliza, interpreta recomendações e sugere ações com evidências.",
      },
      {
        label: "Canais",
        body: "Interface conversacional do RiskAI integrada a SAP, normativos, relatórios e bases RAG no desktop corporativo.",
      },
      {
        label: "Engajamento",
        body: "Chat inteligente, sugestões proativas e personalização por torre e perfil.",
      },
      {
        label: "Hipóteses arriscadas",
        body: "Confiança nas sugestões da IA; bases atualizadas para RAG; adoção unificada apesar de processos distintos.",
      },
      {
        label: "Formato do experimento",
        body: "Protótipo navegável com fluxos conversacionais simulados e testes qualitativos de usabilidade.",
      },
      {
        label: "Métricas",
        body: "CES de linguagem, clareza e esforço; tempo de resposta; redução de esforço percebido; consistência de interpretação.",
      },
      {
        label: "Critérios de sucesso",
        body: "CES ≥ 4,0 · tarefas completas sem suporte · adoção do assistente nas torres participantes.",
      },
      {
        label: "Problema-chave",
        body: "Informação de risco fragmentada em bases, normas e históricos sem conexão operacional.",
      },
      {
        label: "Solução MVP",
        body: "Consulta conversacional a inspeções, Beacon/EPSC, CSB/ANP e Marsh com síntese técnica.",
      },
      {
        label: "Custos / esforço",
        body: "Orquestração RAG, governança de documentos e alinhamento de processos entre torres.",
      },
      {
        label: "Receita de valor",
        body: "Menos HH em busca manual, decisões mais rápidas e padronização da interpretação de risco.",
      },
    ],
    ideationLabel: "Ideação",
    ideationTitle: "Da conversa ao Blueprint TO-BE",
    ideationTool: "Cocriação · Blueprint TO-BE do MVP",
    ideationBody:
      "Mais de 25 funcionalidades idealizadas, 40+ referências de mercado e 12 fluxos priorizados. O centro: desenhar passo a passo a jornada to-be do MVP.",
    journeyLane: "Momento",
    userActionLane: "Ações do usuário",
    systemLane: "Frontstage (interface)",
    backstageLane: "Backstage (ação interna)",
    blueprintTitle: "Blue Print To Be – Fluxo do MVP",
    blueprintStages: [
      {
        journey: "Login",
        userAction:
          "Usuário acessa url do RiskAI que redireciona pro sistema de login próprio da Petrobras.",
        frontstage:
          "URL é um redirecionador para o sistema de login da Petrobras. Token via api como sessão do usuário.",
        backstage:
          "Token é garantido durante sessão do usuário. Inatividade gera necessidade de novo login.",
        tone: "blue" as const,
      },
      {
        journey: "Solicitação de consulta aos relatórios de inspeções",
        userAction:
          "Já logado, usuário utiliza caixa de diálogo para solicitar informações sobre uma recomendação específica",
        frontstage:
          "Sistema identifica a intenção da solicitação e confirma o contexto da torre (Operacional).",
        backstage:
          "Orquestrador detecta a requisição e aciona a RAG base solicitada.",
        tone: "blue" as const,
      },
      {
        journey: "Caso 1) Consulta a relatórios de inspeções",
        userAction: "Usuário consulta a relatórios de inspeção.",
        frontstage:
          "Interface mostra que em instantes irá trazer a resposta a consulta. Ao responder, indaga se usuário gostaria de realizar ações relacionadas ao conteúdo e fornece ctas de validação a resposta.",
        frontstageSpan: 4,
        backstage:
          "Sistema lê informações da AIDA e databricks, buscando relatórios de inspeção.",
        tone: "mint" as const,
      },
      {
        journey:
          "Caso 2) Consulta a relatórios: Beacon do CCPS e Learning Sheets do EPSC",
        userAction:
          "Usuário consulta a relatório Beacon do ccps e learning sheets do epsc.",
        frontstage: null,
        backstage:
          "Sistema lê informações da AIDA e databricks, buscando relatórios do Beacon do ccps e learning sheets do epsc.",
        tone: "mint" as const,
      },
      {
        journey: "Caso 3) Consulta a relatórios: CSB e ANP",
        userAction: "Usuário consulta a relatórios CSB e ANP.",
        frontstage: null,
        backstage:
          "Sistema lê informações da AIDA e databricks, buscando relatórios do CSB e ANP.",
        tone: "mint" as const,
      },
      {
        journey: "Caso 4) Consulta a relatórios: Position Papers da Marsh",
        userAction: "Usuário consulta a relatórios Position papers da marsh.",
        frontstage: null,
        backstage:
          "Sistema lê informações da AIDA e databricks, buscando relatórios do Position papers da marsh.",
        tone: "mint" as const,
      },
      {
        journey: "Busca de informações",
        userAction: "Usuário aguarda o retorno dos resultados.",
        frontstage:
          "Sistema consulta os relatórios técnicos, planos de ação e histórico de tratativas.",
        backstage:
          "Pipelines de ingestão acessam arquivos de uma base única. Motor RAG executa busca semântica e ranqueia resultados por relevância.",
        tone: "lavender" as const,
      },
      {
        journey: "Revisão de diagnóstico",
        userAction:
          "Usuário lê o resumo apresentado e pede detalhes adicionais ou um resumo completo.",
        frontstage:
          "Sistema consolida informações e apresenta resumo técnico da recomendação em texto dissertativo.",
        backstage:
          "NLP realiza extração e sumarização. Metadados são validados com o banco de integridade.",
        tone: "lavender" as const,
      },
    ],
    flowsLabel: "Fluxos conversacionais",
    flowsTitle: "Mesma cadência, quatro fontes",
    flowsTool: "Roteiros conversacionais Usuário ↔ Sistema · Protótipo Figma",
    flowsBody:
      "Quatro roteiros com a mesma narrativa Usuário ↔ Sistema — só muda a base consultada. O produto não reinventa a interação a cada conhecimento.",
    flows: [
      {
        source: "Inspeções",
        q: "Em relação à nova recomendação do inspetor de resseguro sobre Gestão de Mudança Temporária, quais foram as ações adotadas historicamente?",
      },
      {
        source: "Beacon / EPSC",
        q: "Mesma cadência, trocando o tema para Corrosão Galvânica — fonte Beacon do CCPS e Learning Sheets do EPSC.",
      },
      {
        source: "CSB / ANP",
        q: "Tema Dead Legs — consulta a relatórios de CSB e ANP com a mesma lógica de interface e CTAs de validação.",
      },
      {
        source: "Marsh",
        q: "Dúvida sobre Pre-Startup Safety Review — Position Papers da Marsh por trás do mesmo fluxo conversacional.",
      },
    ],
    validationLabel: "Validação",
    validationTitle: "Testando com quem vive o problema",
    validationTool: "Testes de usabilidade qualitativos · CES (Customer Effort Score)",
    validationBody:
      "Cinco entrevistas qualitativas — escolha deliberada. Como defende Nielsen, 5–6 usuários capturam cerca de 85% dos problemas críticos em testes qualitativos. A métrica: CES de 1 a 7.",
    cesAverage: "6,2",
    cesAverageLabel: "CES médio de navegação",
    cesNote: "Mais de 20 comentários espontaneamente positivos",
    cesResults: [
      {
        name: "Humberto",
        score: "6,3",
        insight:
          "Adoção ligada a confiança e previsibilidade — transparência e fontes atualizadas são condição, não nice-to-have.",
      },
      {
        name: "Cassiano",
        score: "6,7",
        insight:
          "Navegou com naturalidade; o desafio real está na contextualização inicial, não na usabilidade em si.",
      },
      {
        name: "Lucas",
        score: "7,0",
        insight:
          "Postura exploratória validou o modelo conversacional para perfis digitais, sem fricções relevantes.",
      },
      {
        name: "Felipe",
        score: "6,8",
        insight:
          "Leu status e relações entre dados com facilidade — ajustes finos de clareza visual restantes.",
      },
      {
        name: "Daniel",
        score: "4,0",
        insight:
          "Sem compreensão rápida do “o que é / para que serve”, a navegação trava — reforçar onboarding conceitual.",
      },
    ],
    quotesLabel: "O que os participantes disseram:",
    quotesPrev: "Depoimento anterior",
    quotesNext: "Próximo depoimento",
    quotes: [
      {
        text: "Foi muito tranquilo, foi uma navegação muito bacana e tô bem contente com as percepções.",
        name: "Humberto",
        role: "Participante · Validação CES",
      },
      {
        text: "No geral, minha percepção é muito igual ao ChatGPT… e isso é bom, porque é o que a gente já usa.",
        name: "Cassiano",
        role: "Participante · Validação CES",
      },
      {
        text: "É uma forma rápida de obter informações relacionadas às inspeções de seguro.",
        name: "Lucas",
        role: "Participante · Validação CES",
      },
      {
        text: "É intuitivo — vocês estão com uma solução que é bem intuitiva.",
        name: "Felipe",
        role: "Participante · Validação CES",
      },
      {
        text: "Não vejo dificuldades de usar a interface.",
        name: "Daniel",
        role: "Participante · Validação CES",
      },
    ],
    validationInsight:
      "O RiskAI saiu validado em essência. As fricções não estavam no valor da solução, e sim na necessidade de reforçar clareza conceitual, orientação de navegação e transparência da informação para perfis mais conservadores.",
    roadmapLabel: "Melhoria contínua",
    roadmapTitle: "Sete ondas até a visão futura",
    roadmapTool: "Matriz impacto × esforço · Sequenciamento de épicos",
    roadmapBody:
      "80 funcionalidades previstas → 21 épicos priorizados → roadmap contínuo com 60+ épicos. Sequenciamento em sete ondas:",
    waves: [
      {
        n: "Onda 1",
        title: "Operacional · Chat + RAG",
        body: "Caixa de diálogo em linguagem natural com RAG/LLM, consulta a inspeções e Beacon CCPS / Learning Sheets EPSC.",
      },
      {
        n: "Onda 2",
        title: "MVP completo",
        body: "Consulta a CSB/ANP e Position Papers da Marsh — marco oficial do MVP.",
        milestone: "MVP",
      },
      {
        n: "Onda 3",
        title: "Projetos & Crédito",
        body: "Dúvidas sobre análise FEL e busca de crédito, performance e vendas no SAP/AIDA.",
      },
      {
        n: "Onda 4",
        title: "Expansão GIR",
        body: "Cronogramas de revisão, produtos RISCOS/GIR/ERM e acesso a SAP GRC RM.",
        milestone: "Expansão",
      },
      {
        n: "Onda 5",
        title: "Fundamentos & Estocásticos",
        body: "Controle por confidencialidade, consulta NORTEC e upload de PDFs.",
      },
      {
        n: "Onda 6",
        title: "Escalabilidade",
        body: "Filtros de bancos, compartilhamento de análises e crédito no AIDA.",
        milestone: "Escala",
      },
      {
        n: "Onda 7",
        title: "Visão futura",
        body: "Notícias pré-cadastradas, risco de crédito e citações estilo NotebookLM para comprovar respostas.",
        milestone: "Futuro",
      },
    ],
    phasesLabel: "Roadmap estratégico",
    phasesTitle: "Três fases de evolução",
    phasesTool: "Roadmap de produto (Quick Wins → Consolidação → Diferenciação)",
    phases: [
      {
        n: "Fase 01",
        title: "Execução rápida · Quick Wins",
        goal: "Entregar valor imediato com baixo esforço e alto impacto.",
        items: [
          "Prompt em linguagem natural",
          "Consulta a crédito no AIDA",
          "Processamento de documentos",
          "Sugestão de planos de resposta",
          "Citações corroborando respostas",
          "Upload e comparação de PDFs",
          "Filtros e alertas automáticos",
          "Histórico de tratativas",
          "Credit-AI e interfaces por fonte",
          "Relatórios PDF e versionamento",
        ],
      },
      {
        n: "Fase 02",
        title: "Consolidação de jornada e retenção",
        goal: "Ampliar funcionalidade e integração da experiência entre torres.",
        items: [
          "Verificação por nível de projeto/ação/risco",
          "Acesso SGRW para revisores",
          "Listas iniciais de risco com severidade",
          "Busca de notícias e padrões",
          "Matriz empresarial e cenários",
          "Edição em transações SAP",
          "Classificação Mapa / Valuation",
          "Exportação PPT + tornado charts",
        ],
      },
      {
        n: "Fase 03",
        title: "Diferenciação e personalização avançada",
        goal: "Experiência de alto valor, inteligente e personalizada.",
        items: [
          "Agente com deadlines e cronograma",
          "Risco similar entre bases diversas",
          "Alertas de maturidade e tempestividade",
          "Sugestões a partir de histórico de projetos",
          "Assistente de revisão anual autônomo",
        ],
      },
    ],
    closeLabel: "Fechando o ciclo",
    closeTool: "Síntese do ciclo Discovery → Validação → Roadmap",
    closeQuote:
      "A tecnologia só ajuda de verdade quando resolve a dor de quem está no dia a dia — seja o Humberto que só confia no que já é padrão, seja o Eduardo que só quer parar de brigar com PDFs.",
    closeBody:
      "Do desafio de unificar cinco torres fragmentadas até um roadmap de mais de 60 iniciativas futuras, o RiskAI nasceu da escuta. A validação confirmou a leitura; o roadmap garante que o produto continue evoluindo com a mesma disciplina.",
  },
  en: {
    overviewImageAlt:
      "RiskAI home wireframe: sidebar, quick-access cards and conversational assistant input bar.",
    overviewImageCaption:
      "Home wireframe — side navigation, shortcuts and conversational assistant entry.",
    challengeLabel: "The challenge",
    challengeTitle: "Five towers, one fragmented process",
    challengeTool: "Briefing + business-driver alignment",
    toolLabel: "Tool",
    challengeBody:
      "Petrobras manages risk across five fronts — GIR, Projects, Stochastic, Operational and Credit — and each tower had developed its own way of handling standards, inspections, insurer recommendations and decision history. The work was technically solid but operationally fragmented: scattered information, constant rework and decisions that relied too heavily on a few specialists’ memory.",
    challengeInvite:
      "The brief: turn risk management into a more agile, integrated and intelligent process — with a unified experience to decide faster and more consistently.",
    motivatorsLabel: "Drivers",
    motivators: [
      {
        t: "Agility",
        d: "Less time on manual searches; more time interpreting what actually matters.",
      },
      {
        t: "Standardization",
        d: "Unify methodologies and interpretations across towers that spoke slightly different languages.",
      },
      {
        t: "Experience",
        d: "Evolve teams’ day-to-day into something modern, intuitive and able to support complex decisions.",
      },
    ],
    discoveryLabel: "Discovery",
    discoveryTitle: "Five structured moves",
    discoveryTool: "Discovery roadmap (Immersion → Continuous improvement)",
    discoveryBody:
      "We designed discovery in five moves — from deep listening to an evolutionary roadmap.",
    discoveryImageAlt:
      "Miro discovery board: interviewed personas, cross-cutting observations and AS-IS journeys mapped with Petrobras risk towers.",
    discoveryImageCaption:
      "Petrobras Miro board — personas, cross-cutting observations and AS-IS journeys from discovery.",
    discovery: [
      {
        n: "01",
        t: "Immersion",
        d: "Tower interviews, personas and AS-IS journeys plus individual micro-journeys.",
      },
      {
        n: "02",
        t: "Definition",
        d: "Lean Inception: pains, needs and opportunities per tower + MVP drivers.",
      },
      {
        n: "03",
        t: "Ideation",
        d: "Co-creation of flows, hypotheses and navigable prototypes from the findings.",
      },
      {
        n: "04",
        t: "Validation",
        d: "Tests with real users — messaging, usability and decision-making.",
      },
      {
        n: "05",
        t: "Continuous improvement",
        d: "Impact × effort prioritization and an evolutionary roadmap beyond the MVP.",
      },
    ],
    immersionLabel: "Immersion",
    immersionTitle: "Listening to the five towers",
    immersionTool: "In-depth interviews · AS-IS journeys · Micro-journeys",
    immersionBody:
      "Fieldwork with GIR, Projects, Stochastic, Operational and Credit produced a volume that confirmed the hypothesis: the problem wasn’t lack of data — it was lack of connection between them.",
    stats: [
      { v: "30+", l: "Initial insights" },
      { v: "39", l: "Journeys mapped" },
      { v: "100+", l: "Opportunities" },
    ],
    painsLabel: "Recurring pains",
    painsTool: "Pain synthesis (Lean Inception by tower)",
    pains: [
      "Digging through multiple internal and external bases for critical information",
      "Consolidating recommendations and checking history at disproportionate cost",
      "Variable interpretation of audits and insurers, without a shared standard",
      "Past decisions without a clear trail of why",
      "Bureaucratic access to standards and documents with confidentiality levels",
      "No automation crossing Beacon, EPSC, CSB, ANP and Marsh",
      "Hard to compare document versions and see what changed",
      "Gaps integrating credit, performance and sales data",
    ],
    opportunitiesLabel: "Opportunities",
    opportunitiesTool: "Opportunity map from AS-IS journeys",
    opportunities: [
      "Unified hub for inspections and technical bases",
      "Automatic PDF interpretation and structured ingestion",
      "Automated search and cross-referencing of critical content",
      "Connect performance and sales via SAP/AIDA to risk context",
      "Decision history for similar recommendations",
      "Advanced filters by risk, tower, severity, source and asset",
      "Conversational flows inside the investigation journey",
      "Centralized NORTEC standards access with confidentiality",
      "Automatic version diffs and omnidata sources",
      "Automatic reports, cycle alerts and AI-assisted decisions",
    ],
    personasLabel: "Definition",
    personasTitle: "Fifteen people, one shared pain",
    personasTool: "Personas (extracted from real interviews)",
    personasBody:
      "We built 15 personas from real interviews. Across different contexts, frustrations converge: trust, time and rework.",
    featuredPersonas: [
      {
        name: "Humberto",
        tower: "RO-BIR · Engineering",
        quote:
          "I’m a basic AI user and conservative: I don’t want fashion, I want a standard. If the platform reads the report and returns guided text based on norms and accepted cases… I save time.",
      },
      {
        name: "André",
        tower: "RO-BIR · Early adopter",
        quote:
          "AI needs to deliver a proven V0 — citations in API/NFPA/ABNT, lessons learned and similar cases, separating fact from suggestion.",
      },
      {
        name: "Felipe",
        tower: "Operational",
        quote:
          "Find a recommendation, cross it with API standards and check history — AP 74 went through the same situation.",
      },
      {
        name: "Cassiano",
        tower: "Tools",
        quote:
          "Whatever we can automate so we spend less person-hours — because additional demands keep showing up.",
      },
      {
        name: "Renan",
        tower: "Projects · Data",
        quote:
          "I see success when a delivery happens — when work leaves my hands and moves forward in someone else’s.",
      },
      {
        name: "Eduardo",
        tower: "Credit",
        quote:
          "Our biggest problem is extracting data from PDFs and bibliographic research.",
      },
      {
        name: "Lucas",
        tower: "Credit",
        quote:
          "Ask on Teams for the credit analyst to run a model and already receive the finished PDF.",
      },
      {
        name: "Cláudia",
        tower: "F&A · Projects",
        quote:
          "The team’s product is the Risk Map, not the review itself — people arriving unprepared to discuss risk gets in the way.",
      },
    ],
    otherPersonasLabel: "Also interviewed",
    otherPersonas: [
      "Daniel · Projects",
      "Renan (coord.) · Investments",
      "Vanessa · F&A",
      "Alexandre · Stochastic",
      "Marcus · Stochastic",
      "Roberta · Credit",
      "Igor · Credit",
    ],
    visionLabel: "Product vision",
    visionTitle: "What we were building, in one sentence",
    visionTool: "Lean UX — vision statement (For / Who / It is / Unlike)",
    lean: [
      {
        k: "For",
        v: "Petrobras risk-management teams — GIR, Projects, Stochastic, Operational and Credit",
      },
      {
        k: "Who",
        v: "need to access risk information with agility, precision and consistency",
      },
      {
        k: "It is",
        v: "an intelligent decision-support assistant that centralizes data, interprets recommendations and suggests actions",
      },
      {
        k: "Unlike",
        v: "today’s distributed, manual and fragmented processes",
      },
      {
        k: "Our solution",
        v: "offers a unified, conversational, evidence-oriented experience",
      },
    ],
    canvasLabel: "Product Canvas",
    canvasTitle: "Twelve blocks to embody the vision",
    canvasTool: "Product Canvas (12 blocks)",
    canvasName: "RiskAI · Product Canvas",
    canvas: [
      {
        label: "User segment",
        body: "Five risk towers: GIR, Projects, Stochastic, Operational and Credit.",
      },
      {
        label: "Value proposition",
        body: "An assistant that centralizes, interprets recommendations and suggests evidence-based actions.",
      },
      {
        label: "Channels",
        body: "RiskAI conversational UI integrated with SAP, standards, reports and RAG bases on the corporate desktop.",
      },
      {
        label: "Engagement",
        body: "Smart chat, proactive suggestions and personalization by tower and profile.",
      },
      {
        label: "Risky assumptions",
        body: "Trust in AI suggestions; up-to-date bases for RAG; unified adoption despite process differences.",
      },
      {
        label: "Experiment format",
        body: "Navigable prototype with simulated conversational flows and qualitative usability tests.",
      },
      {
        label: "Metrics",
        body: "CES for language, clarity and effort; response time; perceived effort reduction; interpretation consistency.",
      },
      {
        label: "Success criteria",
        body: "CES ≥ 4.0 · tasks completed without support · assistant adoption in participating towers.",
      },
      {
        label: "Core problem",
        body: "Risk information fragmented across bases, standards and histories with no operational connection.",
      },
      {
        label: "MVP solution",
        body: "Conversational query across inspections, Beacon/EPSC, CSB/ANP and Marsh with technical synthesis.",
      },
      {
        label: "Cost / effort",
        body: "RAG orchestration, document governance and process alignment across towers.",
      },
      {
        label: "Value return",
        body: "Fewer person-hours on manual search, faster decisions and standardized risk interpretation.",
      },
    ],
    ideationLabel: "Ideation",
    ideationTitle: "From conversation to TO-BE Blueprint",
    ideationTool: "Co-creation · MVP TO-BE Blueprint",
    ideationBody:
      "25+ idealized features, 40+ market references and 12 prioritized flows. The centerpiece: drawing the MVP to-be journey step by step.",
    journeyLane: "Moment",
    userActionLane: "User actions",
    systemLane: "Frontstage (interface)",
    backstageLane: "Backstage (internal action)",
    blueprintTitle: "Blue Print To Be – MVP Flow",
    blueprintStages: [
      {
        journey: "Login",
        userAction:
          "User accesses the RiskAI URL, which redirects to Petrobras’ own login system.",
        frontstage:
          "URL is a redirector to the Petrobras login system. Token via API as the user session.",
        backstage:
          "Token is guaranteed during the user session. Inactivity requires a new login.",
        tone: "blue" as const,
      },
      {
        journey: "Request to consult inspection reports",
        userAction:
          "Once logged in, the user uses the dialog box to request information about a specific recommendation",
        frontstage:
          "The system identifies the request intent and confirms the tower context (Operational).",
        backstage:
          "Orchestrator detects the request and triggers the requested RAG base.",
        tone: "blue" as const,
      },
      {
        journey: "Case 1) Consult inspection reports",
        userAction: "User consults inspection reports.",
        frontstage:
          "Interface shows that the query answer will arrive shortly. When responding, it asks if the user would like related actions and provides CTAs to validate the answer.",
        frontstageSpan: 4,
        backstage:
          "System reads information from AIDA and Databricks, searching inspection reports.",
        tone: "mint" as const,
      },
      {
        journey:
          "Case 2) Consult reports: CCPS Beacon and EPSC Learning Sheets",
        userAction:
          "User consults Beacon CCPS report and EPSC learning sheets.",
        frontstage: null,
        backstage:
          "System reads information from AIDA and Databricks, searching Beacon CCPS reports and EPSC learning sheets.",
        tone: "mint" as const,
      },
      {
        journey: "Case 3) Consult reports: CSB and ANP",
        userAction: "User consults CSB and ANP reports.",
        frontstage: null,
        backstage:
          "System reads information from AIDA and Databricks, searching CSB and ANP reports.",
        tone: "mint" as const,
      },
      {
        journey: "Case 4) Consult reports: Marsh Position Papers",
        userAction: "User consults Marsh Position Papers.",
        frontstage: null,
        backstage:
          "System reads information from AIDA and Databricks, searching Marsh Position Papers.",
        tone: "mint" as const,
      },
      {
        journey: "Information search",
        userAction: "User waits for the results to return.",
        frontstage:
          "System consults technical reports, action plans and treatment history.",
        backstage:
          "Ingestion pipelines access files from a single base. RAG engine runs semantic search and ranks results by relevance.",
        tone: "lavender" as const,
      },
      {
        journey: "Diagnosis review",
        userAction:
          "User reads the presented summary and asks for additional details or a full summary.",
        frontstage:
          "System consolidates information and presents a technical summary of the recommendation in discursive text.",
        backstage:
          "NLP performs extraction and summarization. Metadata is validated against the integrity database.",
        tone: "lavender" as const,
      },
    ],
    flowsLabel: "Conversational flows",
    flowsTitle: "Same cadence, four sources",
    flowsTool: "User ↔ System conversational scripts · Figma prototype",
    flowsBody:
      "Four scripts with the same User ↔ System narrative — only the consulted base changes. The product doesn’t reinvent interaction for every knowledge source.",
    flows: [
      {
        source: "Inspections",
        q: "Regarding the new reinsurer inspector recommendation on Temporary Change Management, what actions were historically taken?",
      },
      {
        source: "Beacon / EPSC",
        q: "Same cadence, swapping the topic to Galvanic Corrosion — Beacon CCPS and EPSC Learning Sheets as the source.",
      },
      {
        source: "CSB / ANP",
        q: "Dead Legs topic — CSB and ANP reports behind the same interface logic and validation CTAs.",
      },
      {
        source: "Marsh",
        q: "Question about Pre-Startup Safety Review — Marsh Position Papers behind the same conversational flow.",
      },
    ],
    validationLabel: "Validation",
    validationTitle: "Testing with people who live the problem",
    validationTool: "Qualitative usability tests · CES (Customer Effort Score)",
    validationBody:
      "Five qualitative interviews — a deliberate choice. As Nielsen argues, 5–6 users capture about 85% of critical issues in qualitative tests. Metric: CES from 1 to 7.",
    cesAverage: "6.2",
    cesAverageLabel: "Average navigation CES",
    cesNote: "20+ spontaneously positive comments",
    cesResults: [
      {
        name: "Humberto",
        score: "6.3",
        insight:
          "Adoption tied to trust and predictability — transparency and updated sources are a condition, not a nice-to-have.",
      },
      {
        name: "Cassiano",
        score: "6.7",
        insight:
          "Navigated naturally; the real challenge is initial contextualization, not usability itself.",
      },
      {
        name: "Lucas",
        score: "7.0",
        insight:
          "Exploratory stance validated the conversational model for digital profiles, with no major friction.",
      },
      {
        name: "Felipe",
        score: "6.8",
        insight:
          "Read status and data relationships easily — only fine visual clarity tweaks left.",
      },
      {
        name: "Daniel",
        score: "4.0",
        insight:
          "Without a quick grasp of “what it is / what it’s for”, navigation stalls — strengthen conceptual onboarding.",
      },
    ],
    quotesLabel: "What participants said:",
    quotesPrev: "Previous quote",
    quotesNext: "Next quote",
    quotes: [
      {
        text: "It was very smooth — really nice navigation and I’m happy with the perceptions.",
        name: "Humberto",
        role: "Participant · CES validation",
      },
      {
        text: "Overall my perception is a lot like ChatGPT… and that’s good, because it’s what we already use.",
        name: "Cassiano",
        role: "Participant · CES validation",
      },
      {
        text: "It’s a fast way to get information related to insurance inspections.",
        name: "Lucas",
        role: "Participant · CES validation",
      },
      {
        text: "It’s intuitive — you have a solution that’s really intuitive.",
        name: "Felipe",
        role: "Participant · CES validation",
      },
      {
        text: "I don’t see difficulties using the interface.",
        name: "Daniel",
        role: "Participant · CES validation",
      },
    ],
    validationInsight:
      "RiskAI left validated in essence. Friction wasn’t in the solution’s value, but in reinforcing conceptual clarity, navigation guidance and information transparency for more conservative profiles.",
    roadmapLabel: "Continuous improvement",
    roadmapTitle: "Seven waves to the future vision",
    roadmapTool: "Impact × effort matrix · Epic sequencing",
    roadmapBody:
      "80 planned features → 21 prioritized epics → continuous roadmap with 60+ epics. Sequencing across seven waves:",
    waves: [
      {
        n: "Wave 1",
        title: "Operational · Chat + RAG",
        body: "Natural-language dialog with RAG/LLM, inspection queries and Beacon CCPS / EPSC Learning Sheets.",
      },
      {
        n: "Wave 2",
        title: "Full MVP",
        body: "CSB/ANP and Marsh Position Papers queries — official MVP milestone.",
        milestone: "MVP",
      },
      {
        n: "Wave 3",
        title: "Projects & Credit",
        body: "FEL risk-analysis questions and credit, performance and sales search in SAP/AIDA.",
      },
      {
        n: "Wave 4",
        title: "GIR expansion",
        body: "Review schedules, RISCOS/GIR/ERM products and SAP GRC RM access.",
        milestone: "Expansion",
      },
      {
        n: "Wave 5",
        title: "Foundations & Stochastic",
        body: "Confidentiality access control, NORTEC queries and PDF upload.",
      },
      {
        n: "Wave 6",
        title: "Scalability",
        body: "Database filters, analysis sharing and credit data in AIDA.",
        milestone: "Scale",
      },
      {
        n: "Wave 7",
        title: "Future vision",
        body: "Pre-registered news, credit risk and NotebookLM-style citations to prove answers.",
        milestone: "Future",
      },
    ],
    phasesLabel: "Strategic roadmap",
    phasesTitle: "Three evolution phases",
    phasesTool: "Product roadmap (Quick Wins → Consolidation → Differentiation)",
    phases: [
      {
        n: "Phase 01",
        title: "Quick wins",
        goal: "Deliver immediate value with low effort and high impact.",
        items: [
          "Natural-language prompt",
          "Credit query in AIDA",
          "Document processing",
          "Response-plan suggestions",
          "Citations backing answers",
          "PDF upload and comparison",
          "Filters and automatic alerts",
          "Treatment history",
          "Credit-AI and source UIs",
          "PDF reports and versioning",
        ],
      },
      {
        n: "Phase 02",
        title: "Journey consolidation & retention",
        goal: "Expand functionality and experience integration across towers.",
        items: [
          "Checks by project/action/risk level",
          "SGRW access for reviewers",
          "Initial risk lists with severity",
          "News search and patterns",
          "Enterprise matrix and scenarios",
          "Edits in SAP transactions",
          "Map / Valuation classification",
          "PPT export + tornado charts",
        ],
      },
      {
        n: "Phase 03",
        title: "Differentiation & advanced personalization",
        goal: "A high-value, intelligent and personalized experience.",
        items: [
          "Agent with deadlines and schedule",
          "Similar risk across diverse bases",
          "Maturity and timeliness alerts",
          "Suggestions from project history",
          "Autonomous annual-review assistant",
        ],
      },
    ],
    closeLabel: "Closing the loop",
    closeTool: "Synthesis of the Discovery → Validation → Roadmap cycle",
    closeQuote:
      "Technology only truly helps when it solves the pain of people in the day-to-day — whether Humberto, who only trusts what’s already standard, or Eduardo, who just wants to stop fighting PDFs.",
    closeBody:
      "From unifying five fragmented towers to a roadmap of 60+ future initiatives, RiskAI was born from listening. Validation confirmed the reading; the roadmap keeps the product evolving with the same discipline.",
  },
} as const;

export function RiskaiPage() {
  const { locale } = useLocale();
  const { content } = useContent();
  const copy = pageCopy[locale];
  const config = resolveCaseStudyConfig(
    "gerenciador-de-riscos-com-ai",
    locale,
    content.projects,
  );

  return (
    <CasePasswordGate
      caseId="gerenciador-de-riscos-com-ai"
      path={config.path}
      title={config.title}
    >
      <CaseStudyLayout config={config}>
      <section className="max-w-5xl mx-auto px-5 md:px-16 pb-4">
        <figure>
          <CaseImage
            src="/images/gerenciador-riscos-home-skeleton.png"
            alt={copy.overviewImageAlt}
            priority
          />
          <figcaption className="mt-3 text-sm text-neutral-500 text-pretty">
            {copy.overviewImageCaption}
          </figcaption>
        </figure>
      </section>

      <CaseBlockSection
        number="01"
        label={copy.challengeLabel}
        title={copy.challengeTitle}
        tool={copy.challengeTool}
        toolLabel={copy.toolLabel}
      >
        <p className="max-w-3xl body-md">{copy.challengeBody}</p>
        <p className="mt-4 max-w-3xl body-md font-medium text-neutral-950">
          {copy.challengeInvite}
        </p>
        <p className="eyebrow mt-10 mb-4 text-accent">{copy.motivatorsLabel}</p>
        <div className="grid md:grid-cols-3 gap-4">
          {copy.motivators.map((item, index) => (
            <PostItNote key={item.t} index={index} compact>
              <PostItTag index={index}>{item.t}</PostItTag>
              <p className="mt-4 text-sm leading-relaxed text-neutral-800">
                {item.d}
              </p>
            </PostItNote>
          ))}
        </div>
      </CaseBlockSection>

      <CaseBlockSection
        number="02"
        label={copy.discoveryLabel}
        title={copy.discoveryTitle}
        tool={copy.discoveryTool}
        toolLabel={copy.toolLabel}
      >
        <p className="max-w-3xl body-md">{copy.discoveryBody}</p>
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {copy.discovery.map((item, index) => (
            <PostItNote key={item.n} index={index} compact className="!rotate-0">
              <p className="font-mono text-xs text-neutral-700">{item.n}</p>
              <h3 className="mt-3 text-lg font-semibold text-neutral-950">
                {item.t}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-neutral-800">
                {item.d}
              </p>
            </PostItNote>
          ))}
        </div>
        <figure className="mt-10">
          <CaseImage
            src="/images/gerenciador-riscos-discovery-miro.png"
            alt={copy.discoveryImageAlt}
            priority
          />
          <figcaption className="mt-3 text-sm text-neutral-500 text-pretty">
            {copy.discoveryImageCaption}
          </figcaption>
        </figure>
      </CaseBlockSection>

      <CaseBlockSection
        number="03"
        label={copy.immersionLabel}
        title={copy.immersionTitle}
        tool={copy.immersionTool}
        toolLabel={copy.toolLabel}
      >
        <p className="max-w-3xl body-md">{copy.immersionBody}</p>
        <div className="mt-8 flex flex-wrap gap-4">
          {copy.stats.map((stat, index) => (
            <PostItNote
              key={stat.l}
              index={index}
              tone="post-it-yellow"
              compact
              className="min-w-[9rem] !rotate-0"
            >
              <p className="stat-value text-accent">{stat.v}</p>
              <p className="mt-2 text-xs text-neutral-700">{stat.l}</p>
            </PostItNote>
          ))}
        </div>
        <div className="mt-12">
          <p className="eyebrow mb-1 text-accent">{copy.painsLabel}</p>
          <p className="mb-4 text-sm text-neutral-600">
            <span className="eyebrow mr-2 text-neutral-500">{copy.toolLabel}</span>
            {copy.painsTool}
          </p>
          <div className="grid sm:grid-cols-2 gap-3">
            {copy.pains.map((item, index) => (
              <PostItNote key={item} index={index} tone="post-it-coral" compact>
                <p className="text-sm leading-relaxed text-neutral-950 text-pretty">
                  {item}
                </p>
              </PostItNote>
            ))}
          </div>
        </div>
        <div className="mt-12">
          <p className="eyebrow mb-1 text-accent">{copy.opportunitiesLabel}</p>
          <p className="mb-4 text-sm text-neutral-600">
            <span className="eyebrow mr-2 text-neutral-500">{copy.toolLabel}</span>
            {copy.opportunitiesTool}
          </p>
          <div className="grid sm:grid-cols-2 gap-3">
            {copy.opportunities.map((item, index) => (
              <PostItNote key={item} index={index} tone="post-it-mint" compact>
                <p className="text-sm leading-relaxed text-neutral-950 text-pretty">
                  {item}
                </p>
              </PostItNote>
            ))}
          </div>
        </div>
      </CaseBlockSection>

      <CaseBlockSection
        number="04"
        label={copy.personasLabel}
        title={copy.personasTitle}
        tool={copy.personasTool}
        toolLabel={copy.toolLabel}
      >
        <p className="max-w-3xl body-md">{copy.personasBody}</p>
        <div className="mt-8 grid md:grid-cols-2 gap-4">
          {copy.featuredPersonas.map((persona, index) => (
            <PostItNote
              key={persona.name}
              index={index}
              compact
              className="!rotate-0"
            >
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-lg font-semibold text-neutral-950">
                  {persona.name}
                </h3>
                <PostItTag index={index}>{persona.tower}</PostItTag>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-neutral-800 italic text-pretty">
                “{persona.quote}”
              </p>
            </PostItNote>
          ))}
        </div>
        <p className="eyebrow mt-10 mb-4 text-accent">
          {copy.otherPersonasLabel}
        </p>
        <div className="flex flex-wrap gap-2.5">
          {copy.otherPersonas.map((name, index) => (
            <PostItTag key={name} index={index}>
              {name}
            </PostItTag>
          ))}
        </div>
      </CaseBlockSection>

      <CaseQuote
        label={copy.visionLabel}
        quote={copy.visionTitle}
        tool={copy.visionTool}
        toolLabel={copy.toolLabel}
        maxWidth="max-w-3xl"
      >
        <div className="mt-6 flex flex-col gap-4 text-left">
          {copy.lean.map((row) => (
            <p key={row.k} className="text-sm md:text-base leading-relaxed">
              <span className="font-mono text-xs uppercase tracking-[0.14em] text-accent mr-2">
                {row.k}
              </span>
              {row.v}
            </p>
          ))}
        </div>
      </CaseQuote>

      <CaseBlockSection
        number="05"
        label={copy.canvasLabel}
        title={copy.canvasTitle}
        tool={copy.canvasTool}
        toolLabel={copy.toolLabel}
      >
        <ProductCanvas title={copy.canvasName} blocks={copy.canvas} />
      </CaseBlockSection>

      <CaseBlockSection
        number="06"
        label={copy.ideationLabel}
        title={copy.ideationTitle}
        tool={copy.ideationTool}
        toolLabel={copy.toolLabel}
      >
        <p className="max-w-3xl body-md">{copy.ideationBody}</p>
        <div className="mt-10">
          <ServiceBlueprint
            title={copy.blueprintTitle}
            journeyLane={copy.journeyLane}
            userActionLane={copy.userActionLane}
            frontstageLane={copy.systemLane}
            backstageLane={copy.backstageLane}
            stages={copy.blueprintStages}
          />
        </div>
      </CaseBlockSection>

      <CaseBlockSection
        number="07"
        label={copy.flowsLabel}
        title={copy.flowsTitle}
        tool={copy.flowsTool}
        toolLabel={copy.toolLabel}
      >
        <p className="max-w-3xl body-md">{copy.flowsBody}</p>
        <div className="mt-8 grid md:grid-cols-2 gap-4">
          {copy.flows.map((flow, index) => (
            <PostItNote
              key={flow.source}
              index={index}
              tone="post-it-blue"
              compact
              className="!rotate-0"
            >
              <PostItTag index={index}>{flow.source}</PostItTag>
              <p className="mt-4 text-sm leading-relaxed text-neutral-900 text-pretty">
                “{flow.q}”
              </p>
            </PostItNote>
          ))}
        </div>
      </CaseBlockSection>

      <CaseBlockSection
        number="08"
        label={copy.validationLabel}
        title={copy.validationTitle}
        tool={copy.validationTool}
        toolLabel={copy.toolLabel}
      >
        <p className="max-w-3xl body-md">{copy.validationBody}</p>
        <div className="mt-8 flex flex-wrap gap-4">
          <PostItNote
            index={0}
            tone="post-it-lavender"
            compact
            className="min-w-[12rem] !rotate-0"
          >
            <p className="stat-value text-accent">{copy.cesAverage}</p>
            <p className="mt-2 text-xs text-neutral-700">
              {copy.cesAverageLabel}
            </p>
          </PostItNote>
          <PostItNote
            index={1}
            tone="post-it-mint"
            compact
            className="max-w-sm !rotate-0"
          >
            <p className="text-sm leading-relaxed text-neutral-900">
              {copy.cesNote}
            </p>
          </PostItNote>
        </div>
        <div className="mt-8 grid md:grid-cols-2 xl:grid-cols-3 gap-4">
          {copy.cesResults.map((result, index) => (
            <CesScoreCard
              key={result.name}
              name={result.name}
              score={result.score}
              insight={result.insight}
              index={index}
            />
          ))}
        </div>
        <QuotesCarousel
          className="mt-12 -mx-5 md:-mx-16 lg:rounded-2xl"
          label={copy.quotesLabel}
          quotes={copy.quotes}
          prevLabel={copy.quotesPrev}
          nextLabel={copy.quotesNext}
        />
        <p className="mt-10 max-w-3xl body-md font-medium text-neutral-950">
          {copy.validationInsight}
        </p>
      </CaseBlockSection>

      <CaseBlockSection
        number="09"
        label={copy.roadmapLabel}
        title={copy.roadmapTitle}
        tool={copy.roadmapTool}
        toolLabel={copy.toolLabel}
      >
        <p className="max-w-3xl body-md mb-8">{copy.roadmapBody}</p>
        <WaveRoadmap waves={copy.waves} />
      </CaseBlockSection>

      <CaseBlockSection
        number="10"
        label={copy.phasesLabel}
        title={copy.phasesTitle}
        tool={copy.phasesTool}
        toolLabel={copy.toolLabel}
      >
        <PhaseRoadmap phases={copy.phases} />
      </CaseBlockSection>

      <CaseQuote
        label={copy.closeLabel}
        quote={copy.closeQuote}
        tool={copy.closeTool}
        toolLabel={copy.toolLabel}
        maxWidth="max-w-3xl"
      >
        <p>{copy.closeBody}</p>
      </CaseQuote>
    </CaseStudyLayout>
    </CasePasswordGate>
  );
}
