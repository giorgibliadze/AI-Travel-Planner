"use client";

import DestinationCard from "@/components/DestinationCard";
import { destinations } from "@/data/destinations";
import { Globe, MapPin } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function DestinationsContent() {
  const { t } = useLanguage();
  const d = t.destinations;

  return (
    <div className="min-h-screen dark:bg-[#050816] bg-[#F8FAFC] pt-24 pb-20">
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-1/3 -right-48 w-[600px] h-[600px] bg-teal-500 rounded-full filter blur-[160px] opacity-5" />
        <div className="absolute bottom-1/3 -left-48 w-[500px] h-[500px] bg-blue-600 rounded-full filter blur-[160px] opacity-5" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border dark:border-teal-500/20 border-teal-200 dark:bg-teal-500/10 bg-teal-50 text-teal-500 text-sm font-medium mb-5">
            <Globe className="w-3.5 h-3.5" />
            {d.badge}
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black dark:text-white text-slate-900 mb-4">{d.title}</h1>
          <p className="text-lg dark:text-slate-400 text-slate-500 max-w-xl mx-auto">{d.sub}</p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-12 mb-12">
          {d.stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-2xl font-black dark:text-white text-slate-900">{s.value}</div>
              <div className="text-xs dark:text-slate-400 text-slate-500 font-medium">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinations.map((dest, i) => (
            <DestinationCard key={dest.id} destination={dest} index={i} />
          ))}
        </div>

        <div className="mt-16 text-center p-10 rounded-3xl dark:bg-gradient-to-br dark:from-blue-600/10 dark:to-teal-500/10 bg-gradient-to-br from-blue-50 to-teal-50 border dark:border-white/5 border-slate-200/80">
          <h3 className="text-xl font-bold dark:text-white text-slate-900 mb-2">{d.ctaTitle}</h3>
          <p className="dark:text-slate-400 text-slate-500 text-sm mb-5">{d.ctaSub}</p>
          <a href="/planner" className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-teal-500 text-white font-semibold hover:shadow-xl hover:shadow-blue-500/20 hover:-translate-y-0.5 transition-all text-sm">
            {d.ctaBtn}
          </a>
        </div>
      </div>
    </div>
  );
}
