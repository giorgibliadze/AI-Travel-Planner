import { createClient } from "@supabase/supabase-js";
import { SUPABASE_ANON_KEY, SUPABASE_URL } from "@/lib/config";
import type { Database } from "@/types/supabase";

type BrowserSupabaseClient = ReturnType<typeof createClient<Database, "public">>;

let browserClient: BrowserSupabaseClient | null = null;

export function createBrowserClient() {
  if (browserClient) return browserClient;

  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    throw new Error("Supabase browser environment variables are missing.");
  }

  browserClient = createClient<Database, "public">(SUPABASE_URL, SUPABASE_ANON_KEY);
  return browserClient;
}

export const createBrowserSupabaseClient = createBrowserClient;
