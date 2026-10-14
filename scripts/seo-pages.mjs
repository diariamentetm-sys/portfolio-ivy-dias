/** Public pages used to stamp unique meta into dist HTML shells (SPA crawlability). */
export const SITE_ORIGIN = "https://www.ivydc.cx";
export const DEFAULT_OG_IMAGE = `${SITE_ORIGIN}/images/ivy-hero-glass-board.png`;
export const LOCALES = ["pt", "en"];

const pagesByLocale = {
  pt: [
    {
      barePath: "/",
      title: "Ivy DC | Customer Experience Specialist | UX & Service Design",
      description:
        "Portfólio de Ivy Dias de Campos: 20+ anos em CX, Service Design e User Research. Cases reais com TSE, Claro, Polícia Federal, TrustHub e fintechs B2B.",
      type: "website",
    },
    {
      barePath: "/cases/cashlog",
      title: "Cashlog Raízen | UX & Machine Learning | Ivy DC",
      description:
        "Case UX/UI do Cashlog (Raízen): plataforma de demandas de investimento com machine learning, pesquisa com 15 profissionais e 8 perfis de usuário distintos.",
      type: "article",
    },
    {
      barePath: "/cases/claro",
      title: "Claro Empresas | Customer Experience | Ivy DC",
      description:
        "Discovery e Service Design dos cards de vendas no portal Claro.com.br: regras de negócio, arquitetura de informação e DesignOps para o e-commerce.",
      type: "article",
    },
    {
      barePath: "/cases/abtest",
      title: "Claro A/B Tests | CRO & Experimentação | Ivy DC",
      description:
        "Case de CRO na Claro: testes A/B data-driven para elevar conversão, validar hipóteses de produto e evoluir a experiência digital com experimentação contínua.",
      type: "article",
    },
    {
      barePath: "/cases/etitulo",
      title: "e-Título TSE | Service Design & A11y | Ivy DC",
      description:
        "Redesenho do onboarding do e-Título (TSE): Service Design com acessibilidade, inclusão digital e jornada completa do eleitor desde o primeiro acesso ao app.",
      type: "article",
    },
    {
      barePath: "/cases/bbnk",
      title: "BBNK | Banking as a Service | Ivy DC",
      description:
        "Case BBNK: experiência bancária white label e banking as a service com navegação dinâmica e foco em operações rápidas e seguras.",
      type: "article",
    },
    {
      barePath: "/cases/trusthub",
      title: "TrustHub | Conta Digital PME | Ivy DC",
      description:
        "Case TrustHub: conta digital para PMEs com pagamentos, transferências e suporte em uma experiência clara e consistente.",
      type: "article",
    },
    {
      barePath: "/cases/policia-federal",
      title: "Polícia Federal | Workshop Service Design | Ivy DC",
      description:
        "Workshop de padronização de computadores na Polícia Federal: facilitação, jornadas AS-IS/TO-BE e backlog priorizado de Service Design.",
      type: "article",
    },
    {
      barePath: "/entre-jornadas",
      title: "Entre Jornadas | Blog de CX | Ivy DC",
      description:
        "Blog de Ivy Dias sobre Customer Experience, service design e construção de produtos digitais.",
      type: "website",
    },
    {
      barePath: "/entre-jornadas/por-que-a-area-de-produtos-nao-gosta-de-cx",
      title:
        "Por que a área de Produtos não gosta de CX? | Entre Jornadas | Ivy DC",
      description:
        "Observações de quem vivenciou o atrito entre CX e Produtos: backlog, política interna e até onde a voz do cliente pode circular.",
      type: "article",
    },
    {
      barePath: "/entre-jornadas/pequenas-realidades-impossiveis-nos-dias-de-hoje",
      title:
        "Pequenas realidades impossíveis nos dias de hoje | Entre Jornadas | Ivy DC",
      description:
        "Uma lembrança de 2011 que ainda pergunta se certos encontros de trabalho cabem no mundo de hoje.",
      type: "article",
    },
    {
      barePath: "/entre-jornadas/como-mostrei-o-que-era-cx",
      title:
        "Como mostrei o trabalho de CX num lugar onde ninguém sabia bem se isso era pra comer ou passar no cabelo. | Entre Jornadas | Ivy DC",
      description:
        "Cheguei como CX num portal de telecom sem território definido. Mapeamento, pesquisa e rotina com o time foram o caminho para conquistar espaço e voz para o cliente.",
      type: "article",
    },
    {
      barePath: "/entre-jornadas/projeto-atrasado-problema-nao-era-cronograma",
      title:
        "O projeto estava atrasado, mas o problema não era o cronograma | Entre Jornadas | Ivy DC",
      description:
        "A história de um discovery de inteligência artificial que tinha cronograma, método e um time excelente. Só esqueceram de combinar com a organização.",
      type: "article",
    },
  ],
  en: [
    {
      barePath: "/",
      title: "Ivy DC | Customer Experience Specialist | UX & Service Design",
      description:
        "Portfolio of Ivy Dias de Campos: 20+ years in CX, Service Design and User Research. Real cases with TSE, Claro, Federal Police, TrustHub and B2B fintechs.",
      type: "website",
    },
    {
      barePath: "/cases/cashlog",
      title: "Cashlog Raízen | UX & Machine Learning | Ivy DC",
      description:
        "Cashlog (Raízen) UX/UI case: investment-demand platform with machine learning, research with 15 professionals and 8 distinct user profiles.",
      type: "article",
    },
    {
      barePath: "/cases/claro",
      title: "Claro Empresas | Customer Experience | Ivy DC",
      description:
        "Discovery and Service Design for sales cards on Claro.com.br: business rules, information architecture and DesignOps for e-commerce.",
      type: "article",
    },
    {
      barePath: "/cases/abtest",
      title: "Claro A/B Tests | CRO & Experimentation | Ivy DC",
      description:
        "CRO case at Claro: data-driven A/B tests to lift conversion, validate product hypotheses and evolve the digital experience.",
      type: "article",
    },
    {
      barePath: "/cases/etitulo",
      title: "e-Título TSE | Service Design & A11y | Ivy DC",
      description:
        "e-Título (TSE) onboarding redesign: Service Design with accessibility, digital inclusion and the full voter journey from first access.",
      type: "article",
    },
    {
      barePath: "/cases/bbnk",
      title: "BBNK | Banking as a Service | Ivy DC",
      description:
        "BBNK case: white-label banking and banking-as-a-service experience with dynamic navigation and fast, secure operations.",
      type: "article",
    },
    {
      barePath: "/cases/trusthub",
      title: "TrustHub | SME Digital Account | Ivy DC",
      description:
        "TrustHub case: digital account for SMEs with payments, transfers and support in a clear, consistent experience.",
      type: "article",
    },
    {
      barePath: "/cases/policia-federal",
      title: "Federal Police | Service Design Workshop | Ivy DC",
      description:
        "Federal Police computer-standardization workshop: facilitation, AS-IS/TO-BE journeys and a prioritized Service Design backlog.",
      type: "article",
    },
    {
      barePath: "/entre-jornadas",
      title: "Between Journeys | CX Blog | Ivy DC",
      description:
        "Ivy Dias’s blog on Customer Experience, service design and building digital products.",
      type: "website",
    },
    {
      barePath: "/entre-jornadas/por-que-a-area-de-produtos-nao-gosta-de-cx",
      title:
        "Why doesn’t the Product area like CX? | Between Journeys | Ivy DC",
      description:
        "Notes from living the friction between CX and Product: backlog ownership, internal politics, and how far the customer’s voice is allowed to travel.",
      type: "article",
    },
    {
      barePath: "/entre-jornadas/pequenas-realidades-impossiveis-nos-dias-de-hoje",
      title: "Small impossible realities these days | Between Journeys | Ivy DC",
      description:
        "A 2011 memory that still asks whether some ways of working can exist today.",
      type: "article",
    },
    {
      barePath: "/entre-jornadas/como-mostrei-o-que-era-cx",
      title:
        "How I showed what CX was in a place where nobody knew if it was something to eat or put in your hair | Between Journeys | Ivy DC",
      description:
        "I arrived as CX on a telecom portal with no defined territory. Mapping, research, and routines with the team were how I earned space and a voice for the customer.",
      type: "article",
    },
    {
      barePath: "/entre-jornadas/projeto-atrasado-problema-nao-era-cronograma",
      title:
        "The project was late, but the problem wasn’t the schedule | Between Journeys | Ivy DC",
      description:
        "The story of an AI discovery that had a timeline, a method, and a strong team, and still stumbled on what the organization never agreed to.",
      type: "article",
    },
  ],
};

function localizePath(locale, barePath) {
  if (barePath === "/") return `/${locale}`;
  return `/${locale}${barePath}`;
}

export const publicPages = LOCALES.flatMap((locale) =>
  pagesByLocale[locale].map((page) => ({
    path: localizePath(locale, page.barePath),
    barePath: page.barePath,
    locale,
    title: page.title,
    description: page.description,
    type: page.type,
    image: DEFAULT_OG_IMAGE,
    lang: locale === "pt" ? "pt-BR" : "en",
  })),
);
