export const WORK_CATEGORIES = [
  "service-design",
  "continuous-improvement",
  "ux-ui",
] as const;

export type WorkCategory = (typeof WORK_CATEGORIES)[number];

export type WorkCategoryFilter = "all" | WorkCategory;

/** Default category by seeded slug — used when CMS has no category yet. */
export const WORK_CATEGORY_BY_SLUG: Record<string, WorkCategory> = {
  claro: "service-design",
  etitulo: "service-design",
  abtest: "continuous-improvement",
  cashlog: "ux-ui",
  bbnk: "ux-ui",
  trusthub: "ux-ui",
  "policia-federal": "service-design",
  riskai: "service-design",
};

export function resolveWorkCategory(
  slug: string,
  category?: WorkCategory | null,
): WorkCategory {
  if (category && WORK_CATEGORIES.includes(category)) return category;
  return WORK_CATEGORY_BY_SLUG[slug] ?? "ux-ui";
}
