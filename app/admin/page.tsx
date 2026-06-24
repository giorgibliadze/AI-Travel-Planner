"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Shield, Users, CreditCard, BarChart3 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import type { Profile, Subscription } from "@/types/auth";

interface AdminSummary {
  profiles: Profile[];
  tripsCount: number;
  subscriptions: Subscription[];
  activeSubscriptionsCount: number;
}

export default function AdminPage() {
  const { t } = useLanguage();
  const { session, user } = useAuth();
  const router = useRouter();
  const [summary, setSummary] = useState<AdminSummary | null>(null);
  const [forbidden, setForbidden] = useState(false);

  useEffect(() => {
    if (!user) {
      router.push("/login");
      return;
    }

    const load = async () => {
      if (!session?.access_token) return;
      const response = await fetch("/api/admin/summary", {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });
      if (response.status === 403 || response.status === 401) {
        setForbidden(true);
        return;
      }
      const data: unknown = await response.json();
      if (
        typeof data === "object" &&
        data !== null &&
        "profiles" in data &&
        "tripsCount" in data &&
        "subscriptions" in data &&
        "activeSubscriptionsCount" in data
      ) {
        setSummary(data as AdminSummary);
      }
    };

    void load();
  }, [router, session, user]);

  if (!user) return null;
  if (forbidden) {
    return <div className="min-h-screen dark:bg-[#050816] bg-[#F8FAFC] pt-28 px-4 text-center text-amber-500">{t.admin.forbidden}</div>;
  }

  return (
    <div className="min-h-screen dark:bg-[#050816] bg-[#F8FAFC] pt-28 pb-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-blue-600 to-teal-500 flex items-center justify-center">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-3xl font-black dark:text-white text-slate-900">{t.admin.title}</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: t.admin.users, value: summary?.profiles.length ?? 0, icon: Users },
            { label: t.admin.trips, value: summary?.tripsCount ?? 0, icon: BarChart3 },
            { label: t.admin.subscriptions, value: summary?.activeSubscriptionsCount ?? 0, icon: CreditCard },
            { label: t.admin.revenue, value: "—", icon: CreditCard },
          ].map((item) => (
            <div key={item.label} className="rounded-3xl dark:bg-[#0d1117]/80 bg-white border dark:border-white/5 border-slate-200/80 p-5 shadow-xl">
              <item.icon className="w-5 h-5 text-blue-500 mb-3" />
              <div className="text-sm dark:text-slate-400 text-slate-500">{item.label}</div>
              <div className="text-2xl font-black dark:text-white text-slate-900">{item.value}</div>
            </div>
          ))}
        </div>
        <div className="rounded-3xl dark:bg-[#0d1117]/80 bg-white border dark:border-white/5 border-slate-200/80 overflow-hidden shadow-xl">
          <div className="p-5 border-b dark:border-white/5 border-slate-100 font-bold dark:text-white text-slate-900">{t.admin.users}</div>
          <div className="divide-y dark:divide-white/5 divide-slate-100">
            {(summary?.profiles ?? []).map((profile) => (
              <div key={profile.id} className="p-4 grid grid-cols-1 md:grid-cols-4 gap-2 text-sm dark:text-slate-300 text-slate-600">
                <span>{profile.email}</span>
                <span>{t.admin.plans}: {profile.plan}</span>
                <span>{profile.monthly_trip_count} / {profile.monthly_trip_limit}</span>
                <span>{new Date(profile.created_at).toLocaleDateString()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
