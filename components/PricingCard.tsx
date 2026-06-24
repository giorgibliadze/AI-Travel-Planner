"use client";

import { motion } from "framer-motion";
import { Check, X, Sparkles } from "lucide-react";
import Link from "next/link";
import type { PricingPlan } from "@/data/pricing";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";

interface PricingCardProps {
  plan: PricingPlan;
  index?: number;
}

export default function PricingCard({ plan, index = 0 }: PricingCardProps) {
  const { t } = useLanguage();
  const { user } = useAuth();
  const planId = plan.id as "starter" | "pro" | "agency";
  const localPlan = t.pricingPlans[planId];
  const price = plan.price;
  const period = plan.id === "starter" ? t.common.free : plan.period;
  const ctaHref = plan.id === "starter" ? (user ? "/dashboard" : "/register") : `/checkout?plan=${plan.id}`;
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`relative rounded-3xl p-7 border transition-all duration-300 ${
        plan.recommended
          ? "dark:bg-gradient-to-b dark:from-blue-600/20 dark:to-blue-900/20 bg-gradient-to-b from-blue-50 to-blue-100/50 border-blue-500/30 shadow-2xl shadow-blue-500/20 scale-105"
          : "dark:bg-[#0d1117] bg-white dark:border-white/5 border-slate-200/80 shadow-lg"
      }`}
    >
      {plan.recommended && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-4 py-1 rounded-full bg-gradient-to-r from-blue-600 to-teal-500 text-white text-xs font-semibold shadow-lg">
          <Sparkles className="w-3 h-3" />
          {t.common.recommended}
        </div>
      )}

      {/* Header */}
      <div className="mb-6">
        <h3 className="text-lg font-bold dark:text-white text-slate-900 mb-1">{plan.name}</h3>
        <p className="text-sm dark:text-slate-400 text-slate-500">{localPlan.description}</p>
      </div>

      {/* Price */}
      <div className="mb-6">
        <div className="flex items-end gap-1">
          <span className={`text-4xl font-black ${plan.recommended ? "text-blue-400" : "dark:text-white text-slate-900"}`}>
            {plan.id === "starter" ? t.common.free : price}
          </span>
          {plan.id !== "starter" && (
            <span className="text-sm dark:text-slate-400 text-slate-500 mb-1">{t.common.perMonth}</span>
          )}
        </div>
      </div>

      {/* CTA */}
      <Link
        href={ctaHref}
        className={`block w-full text-center py-3 rounded-2xl text-sm font-semibold transition-all duration-200 mb-6 ${
          plan.recommended
            ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:shadow-lg hover:shadow-blue-500/30 hover:-translate-y-0.5"
            : "dark:bg-white/5 bg-slate-100 dark:text-white text-slate-700 dark:hover:bg-white/10 hover:bg-slate-200"
        }`}
      >
        {localPlan.cta}
      </Link>

      {/* Divider */}
      <div className="h-px dark:bg-white/5 bg-slate-200/80 mb-5" />

      {/* Features */}
      <ul className="space-y-3">
        {localPlan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2.5">
            <div className="w-4 h-4 rounded-full bg-teal-500/15 flex items-center justify-center flex-shrink-0 mt-0.5">
              <Check className="w-2.5 h-2.5 text-teal-400" strokeWidth={3} />
            </div>
            <span className="text-sm dark:text-slate-300 text-slate-600">{feature}</span>
          </li>
        ))}
        {localPlan.notIncluded.map((feature) => (
          <li key={feature} className="flex items-start gap-2.5 opacity-40">
            <div className="w-4 h-4 rounded-full bg-slate-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
              <X className="w-2.5 h-2.5 dark:text-slate-400 text-slate-500" strokeWidth={3} />
            </div>
            <span className="text-sm dark:text-slate-400 text-slate-500 line-through">{feature}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
