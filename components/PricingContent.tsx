"use client";

import PricingCard from "@/components/PricingCard";
import { pricingPlans } from "@/data/pricing";
import { Check, Sparkles } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function PricingContent() {
  const { t } = useLanguage();
  const p = t.pricing;

  return (
    <div className="min-h-screen dark:bg-[#050816] bg-[#F8FAFC] pt-24 pb-20">
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-600 rounded-full filter blur-[160px] opacity-5" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border dark:border-amber-500/20 border-amber-200 dark:bg-amber-500/10 bg-amber-50 text-amber-500 text-sm font-medium mb-5">
            <Sparkles className="w-3.5 h-3.5" />
            {p.badge}
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black dark:text-white text-slate-900 mb-4">
            {p.title1}{" "}
            <span className="gradient-text">{p.title2}</span>
          </h1>
          <p className="text-lg dark:text-slate-400 text-slate-500 max-w-xl mx-auto">{p.sub}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-center mb-20">
          {pricingPlans.map((plan, i) => (
            <PricingCard key={plan.id} plan={plan} index={i} />
          ))}
        </div>

        <div className="rounded-3xl dark:bg-[#0d1117]/80 bg-white border dark:border-white/5 border-slate-200/80 shadow-xl overflow-hidden">
          <div className="p-6 border-b dark:border-white/5 border-slate-100">
            <h3 className="text-lg font-bold dark:text-white text-slate-900">{p.comparisonTitle}</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="dark:border-white/5 border-slate-100 border-b">
                  <th className="text-left p-4 text-sm dark:text-slate-400 text-slate-500 font-medium">{p.featureLabel}</th>
                  {pricingPlans.map((pl) => (
                    <th key={pl.id} className={`text-center p-4 text-sm font-bold ${pl.recommended ? "text-blue-500" : "dark:text-white text-slate-900"}`}>
                      {pl.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {p.comparison.map((row, i) => (
                  <tr key={row.feature} className={`dark:border-white/5 border-slate-100 border-b last:border-0 ${i % 2 === 0 ? "dark:bg-white/[0.02] bg-slate-50/50" : ""}`}>
                    <td className="p-4 text-sm dark:text-slate-300 text-slate-700">{row.feature}</td>
                    {[row.starter, row.pro, row.agency].map((val, j) => (
                      <td key={j} className="p-4 text-center">
                        {typeof val === "boolean" ? (
                          val ? (
                            <Check className="w-4 h-4 text-teal-500 mx-auto" strokeWidth={3} />
                          ) : (
                            <span className="text-slate-400 text-lg">—</span>
                          )
                        ) : (
                          <span className="text-sm dark:text-slate-300 text-slate-600 font-medium">{val}</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <p className="text-center text-sm dark:text-slate-500 text-slate-400 mt-8">
          {p.footer}{" "}
          <a href="/contact" className="text-blue-500 hover:underline font-medium">{p.footerLink}</a>
          {" "}{p.footerRest}
        </p>
      </div>
    </div>
  );
}
