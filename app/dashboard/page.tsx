"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { Calendar, CreditCard, MapPin, Settings, Users } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import { createBrowserSupabaseClient } from "@/lib/supabase/client";
import type { SavedTrip } from "@/types/trip";

export default function DashboardPage() {
  const { t } = useLanguage();
  const { user, profile, loading } = useAuth();
  const router = useRouter();
  const supabase = useMemo(() => createBrowserSupabaseClient(), []);
  const [trips, setTrips] = useState<SavedTrip[]>([]);
  const monthlyLimit = profile?.plan === "agency" ? null : profile?.monthly_trip_limit ?? 3;
  const monthlyCount = profile?.monthly_trip_count ?? 0;
  const remainingQuota = monthlyLimit === null ? "∞" : Math.max(0, monthlyLimit - monthlyCount).toString();

  useEffect(() => {
    if (!loading && !user) router.push("/login");
  }, [loading, router, user]);

  useEffect(() => {
    const loadTrips = async () => {
      if (!user) return;
      const { data } = await supabase.from("trips").select("*").order("created_at", { ascending: false });
      setTrips(data ?? []);
    };

    void loadTrips();
  }, [supabase, user]);

  if (loading || !user) return null;

  return (
    <div className="min-h-screen dark:bg-[#050816] bg-[#F8FAFC] pt-28 pb-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-black dark:text-white text-slate-900">{t.dashboard.title}</h1>
          <p className="mt-2 dark:text-slate-400 text-slate-500">{t.dashboard.sub}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="rounded-3xl dark:bg-[#0d1117]/80 bg-white border dark:border-white/5 border-slate-200/80 p-5 shadow-xl">
            <CreditCard className="w-5 h-5 text-blue-500 mb-3" />
            <div className="text-sm dark:text-slate-400 text-slate-500">{t.dashboard.plan}</div>
            <div className="text-2xl font-black dark:text-white text-slate-900 uppercase">{profile?.plan ?? "free"}</div>
          </div>
          <div className="rounded-3xl dark:bg-[#0d1117]/80 bg-white border dark:border-white/5 border-slate-200/80 p-5 shadow-xl">
            <Calendar className="w-5 h-5 text-teal-500 mb-3" />
            <div className="text-sm dark:text-slate-400 text-slate-500">{t.dashboard.usage}</div>
            <div className="text-2xl font-black dark:text-white text-slate-900">
              {monthlyCount} / {monthlyLimit === null ? "∞" : monthlyLimit}
            </div>
          </div>
          <div className="rounded-3xl dark:bg-[#0d1117]/80 bg-white border dark:border-white/5 border-slate-200/80 p-5 shadow-xl">
            <Calendar className="w-5 h-5 text-blue-500 mb-3" />
            <div className="text-sm dark:text-slate-400 text-slate-500">{t.dashboard.remaining}</div>
            <div className="text-2xl font-black dark:text-white text-slate-900">{remainingQuota}</div>
          </div>
          <div className="rounded-3xl dark:bg-[#0d1117]/80 bg-white border dark:border-white/5 border-slate-200/80 p-5 shadow-xl">
            <Settings className="w-5 h-5 text-amber-500 mb-3" />
            <div className="text-sm dark:text-slate-400 text-slate-500">{t.dashboard.account}</div>
            <div className="text-sm font-semibold dark:text-white text-slate-900 truncate">{user.email}</div>
            <Link href="/checkout?plan=pro" className="mt-3 inline-flex px-3 py-1.5 rounded-xl bg-blue-600 text-white text-xs font-bold">{t.dashboard.upgrade}</Link>
          </div>
        </div>

        <div className="flex items-center justify-between gap-4 mb-4">
          <h2 className="text-xl font-black dark:text-white text-slate-900">{t.dashboard.savedTrips}</h2>
          <Link href="/checkout?plan=pro" className="px-4 py-2 rounded-xl bg-blue-600 text-white text-sm font-bold">{t.dashboard.upgrade}</Link>
        </div>

        {trips.length === 0 ? (
          <div className="rounded-3xl dark:bg-[#0d1117]/80 bg-white border dark:border-white/5 border-slate-200/80 p-8 text-center dark:text-slate-400 text-slate-500">
            {t.dashboard.noTrips}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {trips.map((trip) => (
              <div key={trip.id} className="rounded-3xl dark:bg-[#0d1117]/80 bg-white border dark:border-white/5 border-slate-200/80 p-5 shadow-xl">
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div>
                    <div className="flex items-center gap-2 text-blue-500 font-bold">
                      <MapPin className="w-4 h-4" />
                      {trip.destination}
                    </div>
                    <div className="text-sm dark:text-slate-400 text-slate-500">{trip.start_date} - {trip.end_date}</div>
                  </div>
                  <span className="rounded-xl bg-teal-500/10 px-3 py-1 text-xs font-bold text-teal-500">{trip.travel_style}</span>
                </div>
                <div className="grid grid-cols-2 gap-3 text-sm dark:text-slate-300 text-slate-600">
                  <div>{t.dashboard.budget}: {trip.budget}₾</div>
                  <div className="flex items-center gap-1"><Users className="w-3 h-3" />{trip.travelers}</div>
                  <div>{t.dashboard.language}: {trip.language}</div>
                  <div>{t.dashboard.created}: {new Date(trip.created_at).toLocaleDateString()}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
