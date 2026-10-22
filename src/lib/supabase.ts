import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

/**
 * Shared Supabase project (Vaibes) uses two app schemas:
 * - `vaibes` → agency site
 * - `ivy_dc` → this portfolio CMS
 */
export const SUPABASE_CMS_SCHEMA = "ivy_dc";
export const SUPABASE_VAIBES_SCHEMA = "vaibes";

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(supabaseUrl!, supabaseAnonKey!, {
      db: { schema: SUPABASE_CMS_SCHEMA },
    })
  : null;
