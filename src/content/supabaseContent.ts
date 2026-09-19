import { supabase, isSupabaseConfigured } from "../lib/supabase";
import {
  defaultSiteContent,
  mergeBlogPosts,
  normalizeSiteContent,
  type BlogPost,
  type ManagedProject,
  type ProjectLocaleContent,
  type SiteContent,
} from "./siteContent";
import { resolveWorkCategory } from "../data/workCategories";
import type { BlogPostLocaleContent, BlogPostStatus } from "./blog";

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
  category: string | null;
  overview_image: string | null;
  content_en: ProjectLocaleContent;
  content_pt: ProjectLocaleContent;
};

type BlogPostRow = {
  id: string;
  slug: string;
  status: BlogPostStatus;
  published_at: string | null;
  scheduled_at: string | null;
  cover_image: string | null;
  tags: string[] | null;
  content_en: BlogPostLocaleContent;
  content_pt: BlogPostLocaleContent;
  created_at: string;
  updated_at: string;
};

function mapProject(row: ProjectRow): ManagedProject {
  return {
    id: row.id,
    slug: row.slug,
    n: row.n,
    published: row.published,
    category: resolveWorkCategory(row.slug, row.category as ManagedProject["category"]),
    overviewImage: row.overview_image ?? "",
    en: row.content_en,
    pt: row.content_pt,
  };
}

function mapBlogPost(row: BlogPostRow): BlogPost {
  return {
    id: row.id,
    slug: row.slug,
    status: row.status === "published" ? "published" : "draft",
    publishedAt: row.published_at,
    scheduledAt: row.scheduled_at,
    coverImage: row.cover_image ?? "",
    tags: row.tags ?? [],
    en: row.content_en ?? { title: "", excerpt: "", body: "" },
    pt: row.content_pt ?? { title: "", excerpt: "", body: "" },
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function blogPostToRow(post: BlogPost) {
  return {
    id: post.id,
    slug: post.slug,
    status: post.status,
    published_at: post.publishedAt,
    scheduled_at: post.scheduledAt,
    cover_image: post.coverImage || null,
    tags: post.tags,
    content_en: post.en,
    content_pt: post.pt,
    created_at: post.createdAt,
    updated_at: post.updatedAt,
  };
}

export async function fetchSiteContentFromSupabase(): Promise<SiteContent | null> {
  if (!supabase) return null;

  const [settingsResult, projectsResult, blogResult] = await Promise.all([
    supabase.from("portfolio_site_settings").select("*").eq("id", "default").maybeSingle(),
    supabase.from("portfolio_projects").select("*").order("n", { ascending: true }),
    supabase.from("portfolio_blog_posts").select("*").order("published_at", {
      ascending: false,
      nullsFirst: false,
    }),
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
  const blogPosts = blogResult.error
    ? mergeBlogPosts(undefined)
    : mergeBlogPosts(
        ((blogResult.data as BlogPostRow[] | null) ?? []).map(mapBlogPost),
      );

  if (blogResult.error) {
    console.warn(
      "Supabase blog posts unavailable (table may be missing):",
      blogResult.error.message,
    );
  }

  return normalizeSiteContent({
    heroImage: settings?.hero_image ?? defaultSiteContent.heroImage,
    contactPhoto: settings?.contact_photo ?? defaultSiteContent.contactPhoto,
    heroCopy: {
      ...defaultSiteContent.heroCopy,
      ...(settings?.hero_copy ?? {}),
    },
    projects: projects.map(mapProject),
    blogPosts,
  });
}

export async function persistSiteContentToSupabase(content: SiteContent) {
  if (!supabase || !isSupabaseConfigured) {
    return { ok: false as const, error: "Supabase not configured" };
  }

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
      category: project.category ?? null,
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

  const blogRemote = await supabase.from("portfolio_blog_posts").select("id");
  if (!blogRemote.error) {
    const blogRemoteIds = new Set(
      (blogRemote.data ?? []).map((row) => row.id as string),
    );
    const blogLocalIds = new Set(content.blogPosts.map((post) => post.id));
    const blogToDelete = [...blogRemoteIds].filter((id) => !blogLocalIds.has(id));

    if (blogToDelete.length > 0) {
      const { error: blogDeleteError } = await supabase
        .from("portfolio_blog_posts")
        .delete()
        .in("id", blogToDelete);
      if (blogDeleteError) {
        return { ok: false as const, error: blogDeleteError.message };
      }
    }

    if (content.blogPosts.length > 0) {
      const { error: blogUpsertError } = await supabase
        .from("portfolio_blog_posts")
        .upsert(content.blogPosts.map(blogPostToRow), { onConflict: "id" });
      if (blogUpsertError) {
        return { ok: false as const, error: blogUpsertError.message };
      }
    }
  } else {
    console.warn(
      "Skipping blog persist — portfolio_blog_posts missing:",
      blogRemote.error.message,
    );
  }

  return { ok: true as const };
}
