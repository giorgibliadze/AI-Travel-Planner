"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { Check, CreditCard } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";

const planPrices = {
  pro: "19₾",
  agency: "—",
};

export default function CheckoutPage() {
  const { t } = useLanguage();
  const { user, loading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const plan = searchParams.get("plan") === "agency" ? "agency" : "pro";
  const localPlan = t.pricingPlans[plan];

  useEffect(() => {
    if (!loading && !user) router.push("/login");
  }, [loading, router, user]);

  if (loading || !user) return null;

  return (
    <div className="min-h-screen dark:bg-[#050816] bg-[#F8FAFC] pt-28 pb-16 px-4">
      <div className="max-w-3xl mx-auto rounded-3xl dark:bg-[#0d1117]/80 bg-white border dark:border-white/5 border-slate-200/80 p-7 shadow-xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-blue-600 to-teal-500 flex items-center justify-center">
            <CreditCard className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-black dark:text-white text-slate-900">{t.checkout.title}</h1>
            <p className="text-sm dark:text-slate-400 text-slate-500">{t.checkout.selectedPlan}: {plan}</p>
          </div>
        </div>
        <div className="rounded-2xl dark:bg-white/5 bg-slate-50 p-5 mb-5">
          <div className="flex items-center justify-between mb-4">
            <span className="font-bold dark:text-white text-slate-900">{t.checkout.orderSummary}</span>
            <span className="text-2xl font-black text-blue-500">{planPrices[plan]}</span>
          </div>
          <ul className="space-y-2">
            {localPlan.features.map((feature) => (
              <li key={feature} className="flex items-center gap-2 text-sm dark:text-slate-300 text-slate-600">
                <Check className="w-4 h-4 text-teal-500" />
                {feature}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl bg-amber-500/10 border border-amber-500/20 px-4 py-3 text-sm text-amber-500 mb-5">
          {t.checkout.comingSoon}
        </div>
        <button disabled className="w-full py-3.5 rounded-2xl bg-slate-400/30 dark:text-slate-300 text-slate-600 font-bold cursor-not-allowed">
          {t.checkout.disabledButton}
        </button>
      </div>
    </div>
  );
}
