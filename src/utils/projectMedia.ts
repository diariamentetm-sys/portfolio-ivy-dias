import type { Locale } from "../i18n/types";
import type { ManagedProject } from "../content/siteContent";

export type MediaImage = {
  src: string;
  alt?: string;
};

export function getManagedProject(
  projects: ManagedProject[],
  slug: string,
): ManagedProject | undefined {
  return projects.find((project) => project.slug === slug);
}

/** Prefer project-level cover; fall back to a static asset when empty. */
export function resolveOverviewSrc(
  project: ManagedProject | undefined,
  fallback = "",
): string {
  const fromProject = project?.overviewImage?.trim();
  if (fromProject) return fromProject;
  return fallback.trim();
}

/**
 * Section galleries live on locale content. Prefer the active locale;
 * if empty (e.g. upload only saved in PT), fall back to the other locale.
 */
export function getSectionImages(
  project: ManagedProject | undefined,
  locale: Locale,
  sectionIndex: number,
): MediaImage[] {
  if (!project) return [];

  const primary = project[locale].sections[sectionIndex]?.images;
  if (primary?.length) return primary;

  const otherLocale: Locale = locale === "pt" ? "en" : "pt";
  return project[otherLocale].sections[sectionIndex]?.images ?? [];
}

/** Use CMS gallery when present; otherwise keep the hardcoded case assets. */
export function mapManagedOrFallback(
  managed: MediaImage[] | undefined,
  fallback: { src: string; alt: string }[],
): { src: string; alt: string }[] {
  if (managed?.length) {
    return managed.map((image, index) => ({
      src: image.src,
      alt: image.alt?.trim() || fallback[index]?.alt || "",
    }));
  }
  return fallback;
}

export function pickManagedSrc(
  managed: MediaImage[] | undefined,
  index: number,
  fallback: string,
): string {
  return managed?.[index]?.src?.trim() || fallback;
}
