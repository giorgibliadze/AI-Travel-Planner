"use client";

import { Sparkles, Brain, Zap, Globe } from "lucide-react";
import PlannerForm from "@/components/PlannerForm";
import { useLanguage } from "@/context/LanguageContext";

const featureIcons = [Brain, Zap, Globe, Sparkles];

export default function PlannerHeader() {
  const { t } = useLanguage();
  const pl = t.planner;

  const features = [
    { icon: Brain, label: pl.chip1 ?? "Smart AI" },
    { icon: Zap, label: pl.chip2 ?? "30s Plan" },
    { icon: Globe, label: pl.chip3 ?? "200+ Countries" },
    { icon: Sparkles, label: pl.chip4 ?? "Personalized" },
  ];

  return (
    <div className="min-h-screen dark:bg-[#050816] bg-[#F8FAFC] pt-24 pb-20">
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] bg-blue-600 rounded-full filter blur-[140px] opacity-5" />
        <div className="absolute bottom-1/4 -right-32 w-[400px] h-[400px] bg-teal-500 rounded-full filter blur-[140px] opacity-5" />
      </div>

      <div className="relative max-w-3xl mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border dark:border-blue-500/20 border-blue-200 dark:bg-blue-500/10 bg-blue-50 text-blue-500 text-sm font-medium mb-5">
            <Sparkles className="w-3.5 h-3.5" />
            {pl.pageBadge}
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black dark:text-white text-slate-900 mb-4 leading-tight">
            {pl.pageTitle1}{" "}
            <span className="gradient-text">{pl.pageTitle2}</span>
          </h1>
          <p className="text-lg dark:text-slate-400 text-slate-500 max-w-lg mx-auto">{pl.pageSub}</p>

          <div className="flex flex-wrap items-center justify-center gap-2.5 mt-6">
            {features.map((f) => (
              <div
                key={f.label}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full dark:bg-white/5 bg-white dark:border-white/10 border border-slate-200/80 text-xs dark:text-slate-300 text-slate-600 font-medium shadow-sm"
              >
                <f.icon className="w-3 h-3 text-blue-500" />
                {f.label}
              </div>
            ))}
          </div>
        </div>

        <PlannerForm />
      </div>
    </div>
  );
}
