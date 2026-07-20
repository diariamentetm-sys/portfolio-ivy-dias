import { supabase, isSupabaseConfigured } from "./supabase";

const BUCKET = "portfolio-media";
const MAX_BYTES = 5 * 1024 * 1024;
const ALLOWED_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
]);

function extensionFor(file: File) {
  const fromName = file.name.split(".").pop()?.toLowerCase();
  if (fromName && ["jpg", "jpeg", "png", "webp", "gif"].includes(fromName)) {
    return fromName === "jpeg" ? "jpg" : fromName;
  }
  if (file.type === "image/png") return "png";
  if (file.type === "image/webp") return "webp";
  if (file.type === "image/gif") return "gif";
  return "jpg";
}

export async function uploadPortfolioImage(
  file: File,
  folder: "hero" | "contact" | "projects",
): Promise<{ ok: true; url: string } | { ok: false; error: string }> {
  if (!supabase || !isSupabaseConfigured) {
    return { ok: false, error: "Supabase is not configured" };
  }

  if (!ALLOWED_TYPES.has(file.type)) {
    return { ok: false, error: "Use JPG, PNG, WEBP or GIF" };
  }

  if (file.size > MAX_BYTES) {
    return { ok: false, error: "Image must be 5MB or smaller" };
  }

  const path = `${folder}/${Date.now()}-${crypto.randomUUID().slice(0, 8)}.${extensionFor(file)}`;

  const { error } = await supabase.storage.from(BUCKET).upload(path, file, {
    cacheControl: "3600",
    upsert: false,
    contentType: file.type,
  });

  if (error) {
    return { ok: false, error: error.message };
  }

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
  return { ok: true, url: data.publicUrl };
}
