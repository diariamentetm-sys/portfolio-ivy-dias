import type {
  AbTestBlock,
  CardImage,
  Fase,
  FunilItem,
  Impacto,
  Oportunidade,
  Pain,
  PaletteColor,
  Persona,
  RuleBar,
  StepItem,
} from "../types/cases";
import type { MetaItem, ProfileItem } from "../types/portfolio";

const CLARO_UPLOADS = "/uploads/claro-exportados";
const RAIZEN_UPLOADS = "/uploads/raizen-exportados";
const TSE_UPLOADS = "/uploads/tse-exportados";

function claroAsset(fileName: string) {
  return `${CLARO_UPLOADS}/${encodeURIComponent(fileName)}`;
}

function raizenAsset(fileName: string) {
  return `${RAIZEN_UPLOADS}/${encodeURIComponent(fileName)}`;
}

function tseAsset(fileName: string) {
  return `${TSE_UPLOADS}/${encodeURIComponent(fileName)}`;
}

export const cashlogData = {
  perfis: [
    { t: "Gestor de Finanças", d: "Aprovação financeira" },
    { t: "Gerente de Área", d: "Aprovação técnica" },
    { t: "Gestor de Negócios", d: "Prospecção e alocação" },
    { t: "Analista", d: "Validação de dados" },
    { t: "Priorizador", d: "Fila de demandas" },
    { t: "Colaborador", d: "Entrada de dados" },
    { t: "Administrador", d: "Gestão do sistema" },
    { t: "Coordenador de Área", d: "Planejamento geral" },
  ] satisfies ProfileItem[],
  descobertas: [
    "Processo manual e desconectado entre as áreas",
    "Ausência de critérios unificados de priorização",
    "Falta de visibilidade do status das aprovações",
    "Duplicidade de inputs e retrabalho frequente",
  ],
  diretrizes: [
    {
      n: "01",
      d: "Facilitar o input de dados, tornando mais otimizado o processo de envio de novas demandas.",
    },
    {
      n: "02",
      d: "Otimizar novas solicitações a partir da predição de dados baseados no histórico de pedidos.",
    },
    {
      n: "03",
      d: "Fornecer dados mais analíticos e feedbacks dinâmicos dos status das solicitações.",
    },
  ],
  palette: [
    { hex: "#740075", name: "Deep Purple" },
    { hex: "#F7E3F7", name: "Light Pink" },
    { hex: "#FFD740", name: "Golden Yellow" },
    { hex: "#FDFFA8", name: "Pale Yellow" },
    { hex: "#FA08FB", name: "Hot Magenta" },
  ] satisfies PaletteColor[],
  contextImg: raizenAsset("raizen-planta-1200x900.webp"),
  researchImg: raizenAsset(
    "626626054_18325297450218950_2392364704513771273_n.jpg",
  ),
  wireframes: [
    {
      src: raizenAsset("wire-criacao-de-demanda-cashlog.png"),
      alt: "Wireframe — criação de demanda no Cashlog",
    },
    {
      src: raizenAsset("wire-confirmacao-da-demanda-cashlog.png"),
      alt: "Wireframe — confirmação da demanda no Cashlog",
    },
    {
      src: raizenAsset("wire-dashboard-cashlog.png"),
      alt: "Wireframe — dashboard de gestão financeira",
    },
    {
      src: raizenAsset("wire-priorizador-cashlog.png"),
      alt: "Wireframe — fila do priorizador de demandas",
    },
    {
      src: raizenAsset("wire-resumo-da-demanda-cashlog.png"),
      alt: "Wireframe — resumo da demanda de investimento",
    },
  ] satisfies CardImage[],
  uiScreens: [
    {
      src: raizenAsset("ui-dashboard-cashlog-ivy-dias-de-campos.png"),
      alt: "UI em alta fidelidade — dashboard de gestão financeira Cashlog",
    },
    {
      src: raizenAsset("ui-priorizador-cashlog-ivy-dias-de-campos.png"),
      alt: "UI em alta fidelidade — tela do priorizador Cashlog",
    },
    {
      src: raizenAsset("ui-criaca-de-demanda-cashlog-ivy-dias-de-campos.png"),
      alt: "UI em alta fidelidade — criação de demanda Cashlog",
    },
  ] satisfies CardImage[],
  quote:
    "O projeto Cashlog foi uma oportunidade de aplicar UX em uma complexidade operacional, onde a interface precisava ser ao mesmo tempo intuitiva para colaboradores operacionais e poderosa o suficiente para suportar as decisões estratégicas de diretores em múltiplas áreas de negócio.",
};

export const claroData = {
  meta: [
    { k: "Papel", v: "Service Designer" },
    { k: "Time", v: "DesignOps · Claro" },
    { k: "Período", v: "2023 – 2024" },
    { k: "Sessões", v: "8 reuniões" },
    { k: "Participantes", v: "12 a 45 pessoas" },
    { k: "Entregável", v: "Redesign dos Cards" },
  ] satisfies MetaItem[],
  about: [
    "Atuei como service designer no time de DesignOps da Claro na condução do discovery do componente Card de vendas para os países AMX.",
    "O objetivo era consolidar as regras de negócio e a arquitetura de informação que dariam base aos novos modelos de card — um primeiro caminho a ser priorizado dentro de um momento de definição do processo de design.",
  ],
  perfis: [
    "Gerentes de Produto",
    "Squad Leads",
    "Product Managers",
    "Product Owners",
    "Tech Leads",
    "Lead de CX",
    "Product Designers",
  ],
  funil: [
    { s: "Kick Off", n: 42, d: "Abertura e contexto", w: "100%" },
    { s: "Sessão 1", n: 45, d: "Objetivos e premissas", w: "100%" },
    { s: "Sessão 2", n: 29, d: "Diagrama de Alvo + Zen Voting", w: "64%" },
    { s: "Reunião Final", n: 12, d: "Fechamento do ranking", w: "27%" },
  ] satisfies FunilItem[],
  macro: ["Aparelho", "Combo PF", "Combo PME", "Celular", "Fixo", "Internet", "TV / OTT", "Acessórios"],
  comp: ["Vitrine / Carrinho", "Preço", "Regras gerais"],
  premissas: [
    "Distinção visual entre os segmentos PME e PF",
    "Acessibilidade e modularidade para todos os cenários de card",
    "Padronização de taxonomia para CTAs, títulos e subtítulos",
    "No e-commerce, o book de marketing determina todos os atributos do produto",
  ],
  restricoes: [
    "Abordagem mobile first",
    "Máximo de um CTA primário por card",
    "Safe área vertical — card não ultrapassa um scroll",
  ],
  riscos: [
    "Falta de padronização na taxonomia de nomes de planos",
    "Limitação dos sistemas SAP e MIND para contemplar todas as informações",
    "Processo ainda manual; ideal seria automatizado para todos os canais",
    "Necessidade de manter engajamento dos times do discovery até o handoff",
  ],
  regrasP: [
    { t: "Preço", v: 16, pct: "100%" },
    { t: "Características e nome do plano", v: 13, pct: "81%" },
    { t: "CTA assinar / comprar / agendar visita", v: 12, pct: "75%" },
    { t: "CTA ver detalhes", v: 8, pct: "50%" },
    { t: "Apps inclusos no plano", v: 6, pct: "38%" },
    { t: "Cupom de desconto", v: 4, pct: "25%" },
  ] satisfies RuleBar[],
  regrasS: [
    { t: "Detalhes do plano", v: 7, pct: "44%" },
    { t: "Bônus adicional + serviços adicionais", v: 5, pct: "31%" },
  ] satisfies RuleBar[],
  regrasT: [
    { t: "Serviços adicionais ao plano", v: 5, pct: "31%" },
    { t: "CTA compra em débito automático / boleto", v: 4, pct: "25%" },
    { t: "Informativo de desconto de/por", v: 4, pct: "25%" },
  ] satisfies RuleBar[],
  resultados: [
    "Jornadas unificadas nos sites e e-commerce",
    "Aderência aos padrões de marca Claro",
    "Engajamento dos times de negócio e design no uso dos componentes",
    "Adoção por parceiros da Claro em suas comunicações online",
  ],
  metricas: ["CSAT", "CES", "TNPS", "Taxa de conversão", "Taxa de abandono", "Produtividade das equipes"],
  reqImg: claroAsset("Requisitos por ordem de disposição.png"),
  overviewImg: claroAsset(
    "cards-de-vendas-ecommerce-AMX-Claro-Ivy-Dias-de-Campos.png",
  ),
  cards: [
    {
      src: claroAsset("Cards - Combo PF-1.png"),
      alt: "Card Combo PF — 500 Mega com Globoplay e Pós 50 Giga",
    },
    {
      src: claroAsset("Cards - Combo PF-2.png"),
      alt: "Card Combo PF — 500 Mega, R$ 189,90/mês",
    },
    {
      src: claroAsset("Cards - Combo PME.png"),
      alt: "Card Combo PME — 400 Mega para empresas, R$ 119,90/mês",
    },
    {
      src: claroAsset("Cards - Plano celular.png"),
      alt: "Card Plano celular — 15GB + 5GB de bônus, plano controle",
    },
    {
      src: claroAsset("Cards - Telefone fixo.png"),
      alt: "Card Telefone fixo — Ilimitado Brasil total, R$ 30,90/mês",
    },
    {
      src: claroAsset("Cards - TV.png"),
      alt: "Card TV — 4K Claro tv+ com Paramount+ e Globoplay",
    },
    {
      src: claroAsset("Cards - Aparelhos.png"),
      alt: "Card Aparelho — Samsung Galaxy A54 5G 256GB",
    },
    {
      src: claroAsset("Cards - Acessórios.png"),
      alt: "Card Acessório — Apple AirPod, R$ 1.529,90",
    },
  ] satisfies CardImage[],
  quote:
    "Esse projeto ilustra bem o tipo de trabalho que faço como service designer dentro de um time multidisciplinar: conduzir dinâmicas com grupos numerosos e transformar conhecimento disperso sobre regras de negócio em artefatos de decisão que orientam com clareza as etapas seguintes do processo de design.",
};

export const abtestData = {
  closingQuote:
    "Design que se prova no número: cada decisão de interface amarrada a uma hipótese e a uma métrica de negócio.",
  tests: [
    {
      label: "Teste 01 · Hub Claro TV+",
      title:
        "Hipótese: um novo Hub de Claro TV+ gera mais conversão de pedido e engajamento.",
      duration: "30 dias",
      device: "Desktop e mobile",
      metric: "Conclusão de pedido com TV",
      result: "+19%",
      resultLabel: "no número de pedidos com TV",
      image: claroAsset("clarotv.jpg"),
      imageAlt:
        "Split test do Hub Claro TV+ — original x variante, resultado +19% em pedidos com TV",
    },
    {
      label: "Teste 02 · Página de Atendimento",
      title:
        "Hipótese: uma nova página de Atendimento, criada com base em CSAT e testes A/B, gera mais engajamento.",
      duration: "42 dias",
      device: "Desktop e mobile",
      metric: "Interação com a página",
      result: "+38%",
      resultLabel: "de interação com cards e shortcuts",
      image: claroAsset("pagina-autoatendimento.jpg"),
      imageAlt:
        "Split test da página de Atendimento da Claro — resultado +38% de interação com cards e shortcuts",
      imageFirst: true,
    },
  ] satisfies AbTestBlock[],
};

export const etituloData = {
  overviewImg: tseAsset("capa-tse-ivy-dias-de-campos.png"),
  headerStats: [
    { value: "12", label: "etapas no novo onboarding" },
    { value: "3", label: "personas guiando a experiência" },
    { value: "4", label: "fases de Service Design" },
  ],
  impacto: [
    { n: "01", t: "Decisões de roadmap mais orientadas à experiência do cidadão" },
    { n: "02", t: "Redução de erros, retrabalho e pressão sobre canais de suporte" },
    { n: "03", t: "Aumento da confiança institucional no serviço digital" },
    { n: "04", t: "Evolução do e-Título como plataforma central da cidadania digital" },
  ] satisfies Impacto[],
  fases: [
    {
      n: "01",
      t: "Discovery",
      d: "Entender o problema de forma sistêmica, a partir de dados, pessoas e concorrência.",
      m: ["Análise competitiva", "Pesquisa", "Análise Heurística", "Comunicação comparada"],
    },
    {
      n: "02",
      t: "Definição",
      d: "Transformar achados dispersos em insights acionáveis para tomada de decisão.",
      m: ["Jornada As-Is", "Personas", "Insights-chave"],
    },
    {
      n: "03",
      t: "Ideação",
      d: "Co-criar a nova jornada com o time multidisciplinar e a Justiça Eleitoral.",
      m: ["Workshops", "Jornada To-Be", "UI Design"],
    },
    {
      n: "04",
      t: "Validação",
      d: "Confrontar as hipóteses com eleitores reais e priorizar melhorias contínuas.",
      m: ["Testes de usabilidade", "Árvores de Oportunidades"],
    },
  ] satisfies Fase[],
  personas: [
    {
      nome: "Antonio Fagundes",
      meta: "75 anos · Aposentado",
      tags: ["Baixa afinidade digital", "Autonomia"],
      mot: "Busca praticidade para resolver pendências eleitorais sem se deslocar até um cartório ou zona eleitoral.",
      obj: "Garantir que consiga realizar tarefas eleitorais sem depender de outras pessoas.",
      img: tseAsset("persona-1-antonio-ivy-dias-de-campos.png"),
      imgAlt: "Persona Antonio Fagundes — eleitor idoso com baixa afinidade digital",
    },
    {
      nome: "Augusto dos Anjos",
      meta: "58 anos · Deficiência visual",
      tags: ["Mangá", "Artes plásticas", "Leitor de tela"],
      mot: "A ideia de ter um título digital facilita a vida, principalmente quando não quer carregar o título físico.",
      obj: "Usar o e-Título como alternativa acessível ao processo presencial, com funcionalidades adaptadas.",
      img: tseAsset("persona-2-augusto-ivy-dias-de-campos.png"),
      imgAlt: "Persona Augusto dos Anjos — eleitor com deficiência visual e leitor de tela",
    },
    {
      nome: "Clara Nunes",
      meta: "27 anos · Nativa digital",
      tags: ["Eficiência", "Mobile-first"],
      mot: "Gosta de soluções digitais e eficientes que se integrem bem ao seu cotidiano.",
      obj: "Resolver questões eleitorais digitalmente, sem sair de casa ou enfrentar filas.",
      img: tseAsset("persona-3-clara-ivy-dias-de-campos.png"),
      imgAlt: "Persona Clara Nunes — eleitora nativa digital e mobile-first",
    },
  ] satisfies Persona[],
  pains: [
    { n: "01", t: "Descoberta", d: "Dúvidas sobre segurança, confiabilidade e facilidade de uso já na primeira abertura." },
    { n: "02", t: "Aceite de termos", d: "Falta de explicação sobre a necessidade dos aceites regulatórios e de notificações." },
    { n: "03", t: "Permissões", d: "Pedidos de permissão sem contexto geram desconfiança no eleitor." },
    { n: "04", t: "Cadastro", d: "Erros ao digitar os dados e falta de clareza sobre a obrigatoriedade dos campos." },
    { n: "05", t: "Validação facial", d: "Dificuldade na validação biométrica, sobretudo para idosos e menos familiarizados com tecnologia." },
    { n: "06", t: "Home logada", d: "A home não dá prévia das funções; dificuldade de encontrar recursos como a justificativa de ausência." },
  ] satisfies Pain[],
  steps: [
    { n: "01", t: "Home splash", d: "Carrossel explicativo com CTAs de acesso e modal de permissão para notificações." },
    { n: "02", t: "Personalização", d: "Ajusta acessibilidade — contraste e leitor de tela — e configura navegação assistida." },
    { n: "03", t: "Aceite de termos", d: "Lê sobre as funcionalidades e acessa os termos via hiperlinks antes de aceitar." },
    { n: "04", t: "Dados pessoais", d: "Orientações sobre o preenchimento obrigatório e inserção dos dados do cadastro eleitoral." },
    { n: "05", t: "Validação do dispositivo", d: "Explicações sobre a confirmação de identidade enquanto o dispositivo é validado." },
    { n: "06", t: "Questionário", d: "Responde três perguntas pessoais para confirmação de identidade, sem reiniciar o fluxo se errar." },
    { n: "07", t: "Dicas para selfie", d: "Explicações sobre a prova de vida via selfie em vídeo, com acesso à câmera." },
    { n: "08", t: "Ativação biométrica", d: "Validação biométrica por reconhecimento facial; após confirmada, avança." },
    { n: "09", t: "Cadastro de senha", d: "Define e confirma a senha, escolhe permitir ou não a autenticação biométrica." },
    { n: "10", t: "Preferências", d: "Escolhe notificações e preferências de uso e informativos da Justiça Eleitoral." },
    { n: "11", t: "Conclusão", d: "Mensagem de cadastro concluído; escolhe entre tour guiado ou acessar a home." },
    { n: "12", t: "Home logada", d: "Visualização do título, biometria, onde votar, justificativa, perfil e menu de serviços." },
  ] satisfies StepItem[],
  oportunidades: [
    {
      n: "01",
      tag: "Impacto rápido",
      t: "Aceites com contexto",
      d: "Explicações claras e contextuais sobre a necessidade e a utilidade dos aceites regulatórios e de notificações.",
    },
    {
      n: "02",
      tag: "Impacto rápido",
      t: "Transparência de limitações",
      d: "Deixar claro quais limitações o eleitor sem biometria cadastrada enfrentará, antes que a ação ocorra.",
    },
    {
      n: "03",
      tag: "Estrutural",
      t: "Acessibilidade por padrão",
      d: "Incorporar configurações de acessibilidade desde o primeiro toque, com múltiplos métodos de validação.",
    },
    {
      n: "04",
      tag: "Governança",
      t: "Árvores de Oportunidades",
      d: "Estruturar uma prática de melhoria contínua, conectando dores mapeadas a oportunidades priorizadas.",
    },
  ] satisfies Oportunidade[],
};
