import { supabaseAdmin } from "@/lib/supabase/admin";
import { getBearerToken, createServerSupabaseClient } from "@/lib/supabase/server";
import type { Subscription } from "@/types/auth";

const ADMIN_EMAILS = ["bliadze1997@gmail.com"];

export async function GET(request: Request) {
  const token = getBearerToken(request);
  if (!token) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const supabase = createServerSupabaseClient(token);
  const { data: authData, error: authError } = await supabase.auth.getUser(token);

  if (authError || !authData.user?.email) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!ADMIN_EMAILS.includes(authData.user.email)) {
    return Response.json({ error: "Forbidden" }, { status: 403 });
  }

  const [profiles, trips, subscriptions] = await Promise.all([
    supabaseAdmin.from("profiles").select("*").order("created_at", { ascending: false }),
    supabaseAdmin.from("trips").select("id", { count: "exact", head: true }),
    supabaseAdmin.from("subscriptions").select("*").order("started_at", { ascending: false }),
  ]);

  if (profiles.error || trips.error || subscriptions.error) {
    return Response.json({ error: "Failed to load admin data." }, { status: 500 });
  }

  const subscriptionRows = (subscriptions.data ?? []) as Subscription[];

  return Response.json({
    profiles: profiles.data ?? [],
    tripsCount: trips.count ?? 0,
    subscriptions: subscriptionRows,
    activeSubscriptionsCount: subscriptionRows.filter((subscription) => subscription.status === "active").length,
  });
}
