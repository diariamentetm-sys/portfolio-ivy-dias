/**
 * Visual metadata for the v2 project stage.
 * Slugs come from the live inventory — no invented clients.
 */
export type ProjectVisual = {
  slug: string;
  displayName: string;
  themeColor: string;
  summary: string;
  order: number;
};

/** Initial morph/stage order (Fase B+). Colors are proposals, not client brand books. */
export const projectVisuals: ProjectVisual[] = [
  {
    slug: "claro",
    displayName: "claro",
    themeColor: "#45CDE2",
    summary: "Service Design · portal e jornadas B2B",
    order: 1,
  },
  {
    slug: "cashlog",
    displayName: "cashlog",
    themeColor: "#FFE32B",
    summary: "UX/UI · demanda de investimento com ML",
    order: 2,
  },
  {
    slug: "etitulo",
    displayName: "e-titulo",
    themeColor: "#FF58A4",
    summary: "Service Design · onboarding eleitoral",
    order: 3,
  },
  {
    slug: "policia-federal",
    displayName: "policia",
    themeColor: "#C8E66B",
    summary: "Workshop · padronização nacional (Polícia Federal)",
    order: 4,
  },
  {
    slug: "bbnk",
    displayName: "bbnk",
    themeColor: "#45CDE2",
    summary: "UX/UI · banking as a service",
    order: 5,
  },
  {
    slug: "trusthub",
    displayName: "trusthub",
    themeColor: "#FF58A4",
    summary: "UX/UI · conta digital PME",
    order: 6,
  },
  {
    slug: "abtest",
    displayName: "abtest",
    themeColor: "#FFE32B",
    summary: "CRO · experimentação contínua",
    order: 7,
  },
  {
    slug: "gerenciador-de-riscos-com-ai",
    displayName: "riskai",
    themeColor: "#C8E66B",
    summary: "Discovery · IA e governança",
    order: 8,
  },
];
