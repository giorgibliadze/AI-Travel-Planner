export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  process.env.NEXT_PUBLIC_APP_URL ||
  "https://ai-travel-planner-1t7z.vercel.app/";

export const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  process.env.NEXT_PUBLIC_TRAVEL_SITE_URLSUPABASE_URL ||
  process.env.TRAVEL_SUPABASE_URL ||
  process.env.SUPABASE_URL;

export const SUPABASE_ANON_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  process.env.NEXT_PUBLIC_TRAVEL_SITE_URLSUPABASE_ANON_KEY ||
  process.env.NEXT_PUBLIC_TRAVEL_SITE_URLSUPABASE_PUBLISHABLE_KEY ||
  process.env.TRAVEL_SUPABASE_ANON_KEY ||
  process.env.TRAVEL_SUPABASE_PUBLISHABLE_KEY ||
  process.env.SUPABASE_ANON_KEY ||
  process.env.SUPABASE_PUBLISHABLE_KEY;

export const SUPABASE_SERVICE_ROLE_KEY =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.TRAVEL_SUPABASE_SERVICE_ROLE_KEY ||
  process.env.TRAVEL_SUPABASE_SECRET_KEY ||
  process.env.SUPABASE_SECRET_KEY;
