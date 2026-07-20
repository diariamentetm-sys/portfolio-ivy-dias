import { supabase, isSupabaseConfigured } from "../lib/supabase";
import {
  defaultSiteContent,
  type ManagedProject,
  type ProjectLocaleContent,
  type SiteContent,
} from "./siteContent";

type SettingsRow = {
  id: string;
  hero_image: string;
  contact_photo: string;
  hero_copy: SiteContent["heroCopy"];
};

type ProjectRow = {
  id: string;
  slug: string;
  n: string;
  published: boolean;
  overview_image: string | null;
  content_en: ProjectLocaleContent;
  content_pt: ProjectLocaleContent;
};

function mapProject(row: ProjectRow): ManagedProject {
  return {
    id: row.id,
    slug: row.slug,
    n: row.n,
    published: row.published,
    overviewImage: row.overview_image ?? "",
    en: row.content_en,
    pt: row.content_pt,
  };
}

export async function fetchSiteContentFromSupabase(): Promise<SiteContent | null> {
  if (!supabase) return null;

  const [settingsResult, projectsResult] = await Promise.all([
    supabase.from("portfolio_site_settings").select("*").eq("id", "default").maybeSingle(),
    supabase.from("portfolio_projects").select("*").order("n", { ascending: true }),
  ]);

  if (settingsResult.error) {
    console.error("Supabase settings error:", settingsResult.error.message);
    return null;
  }

  if (projectsResult.error) {
    console.error("Supabase projects error:", projectsResult.error.message);
    return null;
  }

  const settings = settingsResult.data as SettingsRow | null;
  const projects = (projectsResult.data as ProjectRow[] | null) ?? [];

  return {
    heroImage: settings?.hero_image ?? defaultSiteContent.heroImage,
    contactPhoto: settings?.contact_photo ?? defaultSiteContent.contactPhoto,
    heroCopy: {
      ...defaultSiteContent.heroCopy,
      ...(settings?.hero_copy ?? {}),
    },
    projects: projects.map(mapProject),
  };
}

export async function persistSiteContentToSupabase(content: SiteContent) {
  if (!supabase || !isSupabaseConfigured) return { ok: false as const, error: "Supabase not configured" };

  const { error: settingsError } = await supabase.from("portfolio_site_settings").upsert({
    id: "default",
    hero_image: content.heroImage,
    contact_photo: content.contactPhoto,
    hero_copy: content.heroCopy,
    updated_at: new Date().toISOString(),
  });

  if (settingsError) {
    return { ok: false as const, error: settingsError.message };
  }

  const remote = await supabase.from("portfolio_projects").select("id");
  if (remote.error) {
    return { ok: false as const, error: remote.error.message };
  }

  const remoteIds = new Set((remote.data ?? []).map((row) => row.id as string));
  const localIds = new Set(content.projects.map((project) => project.id));

  const toDelete = [...remoteIds].filter((id) => !localIds.has(id));
  if (toDelete.length > 0) {
    const { error: deleteError } = await supabase
      .from("portfolio_projects")
      .delete()
      .in("id", toDelete);
    if (deleteError) {
      return { ok: false as const, error: deleteError.message };
    }
  }

  if (content.projects.length > 0) {
    const rows = content.projects.map((project) => ({
      id: project.id,
      slug: project.slug,
      n: project.n,
      published: project.published,
      overview_image: project.overviewImage || null,
      content_en: project.en,
      content_pt: project.pt,
      updated_at: new Date().toISOString(),
    }));

    const { error } = await supabase.from("portfolio_projects").upsert(rows, {
      onConflict: "id",
    });
    if (error) {
      return { ok: false as const, error: error.message };
    }
  }

  return { ok: true as const };
}
