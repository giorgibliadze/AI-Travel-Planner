import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/types/supabase";

type BrowserSupabaseClient = ReturnType<typeof createClient<Database, "public">>;

let browserClient: BrowserSupabaseClient | null = null;

export function createBrowserClient() {
  if (browserClient) return browserClient;

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co";
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-anon-key";

  browserClient = createClient<Database, "public">(supabaseUrl, supabaseAnonKey);
  return browserClient;
}

export const createBrowserSupabaseClient = createBrowserClient;
