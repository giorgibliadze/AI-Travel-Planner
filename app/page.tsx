"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, MapPin, ArrowRight, Star, Zap, Shield, Globe, ChevronRight, Brain, Route, Wallet } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import DestinationCard from "@/components/DestinationCard";
import TestimonialCard from "@/components/TestimonialCard";
import { destinations } from "@/data/destinations";
import { testimonials } from "@/data/testimonials";
import { useLanguage } from "@/context/LanguageContext";

const stepIcons = [MapPin, Wallet, Route];
const benefitIcons = [Brain, Zap, Globe, Shield];

export default function HomePage() {
  const { t } = useLanguage();
  const h = t.home;

  return (
    <div className="dark:bg-[#050816] bg-[#F8FAFC] overflow-hidden">
      {/* ===== HERO ===== */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 pb-16 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1600&q=80" alt="Travel hero" fill className="object-cover" priority />
          <div className="absolute inset-0 dark:bg-[#050816]/80 bg-slate-900/60" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent dark:to-[#050816] to-[#F8FAFC]" />
        </div>
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-600 rounded-full filter blur-[120px] opacity-10 animate-float pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-teal-500 rounded-full filter blur-[120px] opacity-10 animate-float-delay pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-500/30 bg-blue-500/10 backdrop-blur-sm text-blue-300 text-sm font-medium mb-8">
            <Sparkles className="w-3.5 h-3.5" />
            {h.badge}
            <ChevronRight className="w-3.5 h-3.5" />
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-7xl font-black text-white leading-tight tracking-tight mb-6">
            {h.h1a}{" "}
            <span className="gradient-text">{h.h1b}</span>
            <br />
            {h.h1c}
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed mb-10">
            {h.sub}{" "}
            <span className="text-teal-400 font-semibold">{h.subHighlight}</span>
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/planner" className="group flex items-center gap-2.5 px-7 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-teal-500 text-white font-bold text-base hover:shadow-2xl hover:shadow-blue-500/30 hover:-translate-y-1 transition-all duration-300 animate-pulse-glow">
              <Sparkles className="w-5 h-5" />
              {h.cta1}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/destinations" className="flex items-center gap-2.5 px-7 py-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold text-base hover:bg-white/20 transition-all duration-200">
              {h.cta2}
            </Link>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.5 }}
            className="mt-16 flex flex-wrap items-center justify-center gap-8 sm:gap-16">
            {h.stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl sm:text-3xl font-black text-white">{stat.value}</div>
                <div className="text-sm text-slate-400">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Floating cards */}
        <motion.div initial={{ opacity: 0, x: 80 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1, delay: 0.6 }}
          className="hidden lg:block absolute right-8 top-1/3 animate-float">
          <div className="glass rounded-2xl p-3.5 w-52 shadow-2xl">
            <div className="flex items-center gap-2.5 mb-2">
              <div className="relative w-10 h-10 rounded-xl overflow-hidden flex-shrink-0">
                <Image src="https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=100&q=80" alt="Paris" fill className="object-cover" sizes="40px" />
              </div>
              <div>
                <div className="text-white text-sm font-semibold">{h.floatParis.name}</div>
                <div className="text-slate-400 text-xs">{h.floatParis.country}</div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                <span className="text-white text-xs font-medium">4.9</span>
              </div>
              <span className="text-teal-400 text-xs font-bold">{h.floatParis.price}</span>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: -80 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1, delay: 0.7 }}
          className="hidden lg:block absolute left-8 bottom-1/3 animate-float-delay">
          <div className="glass rounded-2xl p-3.5 w-52 shadow-2xl">
            <div className="flex items-center gap-2.5 mb-2">
              <div className="relative w-10 h-10 rounded-xl overflow-hidden flex-shrink-0">
                <Image src="https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=100&q=80" alt="Bali" fill className="object-cover" sizes="40px" />
              </div>
              <div>
                <div className="text-white text-sm font-semibold">{h.floatBali.name}</div>
                <div className="text-slate-400 text-xs">{h.floatBali.country}</div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                <span className="text-white text-xs font-medium">4.8</span>
              </div>
              <span className="text-teal-400 text-xs font-bold">{h.floatBali.price}</span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full dark:bg-blue-500/10 bg-blue-50 dark:text-blue-400 text-blue-600 text-sm font-semibold mb-4 border dark:border-blue-500/20 border-blue-200/80">
              {h.howBadge}
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black dark:text-white text-slate-900 mb-4">{h.howTitle}</h2>
            <p className="text-lg dark:text-slate-400 text-slate-500 max-w-xl mx-auto">{h.howSub}</p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {h.steps.map((step, i) => {
              const Icon = stepIcons[i];
              const nums = ["01", "02", "03"];
              const colors = ["blue", "teal", "amber"];
              return (
                <AnimatedSection key={step.title} delay={i * 0.15}>
                  <div className="relative p-7 rounded-3xl dark:bg-[#0d1117]/80 bg-white border dark:border-white/5 border-slate-200/80 shadow-lg hover:shadow-xl transition-shadow group">
                    <div className="absolute top-5 right-5 text-6xl font-black dark:text-white/3 text-slate-200 select-none">{nums[i]}</div>
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br from-${colors[i]}-600 to-${colors[i]}-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform shadow-lg`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-lg font-bold dark:text-white text-slate-900 mb-2">{step.title}</h3>
                    <p className="text-sm dark:text-slate-400 text-slate-500 leading-relaxed">{step.desc}</p>
                    {i < 2 && (
                      <div className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 z-10">
                        <ChevronRight className="w-6 h-6 dark:text-slate-600 text-slate-300" />
                      </div>
                    )}
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== FEATURED DESTINATIONS ===== */}
      <section className="py-24 px-4 dark:bg-[#070b14] bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <div>
              <span className="inline-block px-4 py-1.5 rounded-full dark:bg-teal-500/10 bg-teal-50 dark:text-teal-400 text-teal-600 text-sm font-semibold mb-4 border dark:border-teal-500/20 border-teal-200/80">
                {h.destBadge}
              </span>
              <h2 className="text-3xl sm:text-4xl font-black dark:text-white text-slate-900">{h.destTitle}</h2>
            </div>
            <Link href="/destinations" className="flex items-center gap-2 text-blue-500 font-semibold hover:gap-3 transition-all text-sm">
              {t.common.viewAll} <ArrowRight className="w-4 h-4" />
            </Link>
          </AnimatedSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {destinations.slice(0, 4).map((dest, i) => (
              <DestinationCard key={dest.id} destination={dest} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ===== AI BENEFITS ===== */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection direction="left">
              <span className="inline-block px-4 py-1.5 rounded-full dark:bg-amber-500/10 bg-amber-50 dark:text-amber-400 text-amber-600 text-sm font-semibold mb-5 border dark:border-amber-500/20 border-amber-200/80">
                {h.aiBadge}
              </span>
              <h2 className="text-3xl sm:text-4xl font-black dark:text-white text-slate-900 mb-5 leading-tight">{h.aiTitle}</h2>
              <p className="text-lg dark:text-slate-400 text-slate-500 leading-relaxed mb-8">
                {h.aiSub1}
                <span className="dark:text-white text-slate-800 font-semibold"> {h.aiSub2}</span>
                {" "}{h.aiSub3}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {h.benefits.map((b, i) => {
                  const Icon = benefitIcons[i];
                  return (
                    <motion.div key={b.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                      className="flex items-start gap-3 p-4 rounded-2xl dark:bg-white/3 bg-slate-50 dark:border-white/5 border border-slate-200/80">
                      <div className="w-9 h-9 rounded-xl bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-4 h-4 text-blue-500" />
                      </div>
                      <div>
                        <div className="text-sm font-bold dark:text-white text-slate-900 mb-0.5">{b.title}</div>
                        <div className="text-xs dark:text-slate-400 text-slate-500 leading-relaxed">{b.desc}</div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </AnimatedSection>

            <AnimatedSection direction="right">
              <div className="relative">
                <div className="relative rounded-3xl overflow-hidden aspect-[4/5] shadow-2xl">
                  <Image src="https://images.unsplash.com/photo-1488085061387-422e29b40080?w=800&q=80" alt="AI Travel" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                </div>
                <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -bottom-6 -left-6 dark:bg-[#0d1117] bg-white rounded-2xl p-4 shadow-2xl border dark:border-white/10 border-slate-200/80 w-56">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="w-4 h-4 text-blue-500" />
                    <span className="text-xs font-semibold dark:text-slate-300 text-slate-600">{h.aiCard.title}</span>
                  </div>
                  <div className="text-sm font-bold dark:text-white text-slate-900">{h.aiCard.trip}</div>
                  <div className="text-xs dark:text-slate-400 text-slate-500">{h.aiCard.budget}</div>
                  <div className="mt-2 w-full h-1.5 rounded-full bg-slate-200 dark:bg-white/10">
                    <div className="h-full w-4/5 rounded-full bg-gradient-to-r from-blue-600 to-teal-500" />
                  </div>
                </motion.div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="py-24 px-4 dark:bg-[#070b14] bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="text-center mb-14">
            <span className="inline-block px-4 py-1.5 rounded-full dark:bg-blue-500/10 bg-blue-50 dark:text-blue-400 text-blue-600 text-sm font-semibold mb-4 border dark:border-blue-500/20 border-blue-200/80">
              {h.reviewsBadge}
            </span>
            <h2 className="text-3xl sm:text-4xl font-black dark:text-white text-slate-900 mb-4">{h.reviewsTitle}</h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {testimonials.slice(0, 4).map((t, i) => (
              <AnimatedSection key={t.id} delay={i * 0.1}>
                <TestimonialCard testimonial={t} />
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FINAL CTA ===== */}
      <section className="py-28 px-4 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image src="https://images.unsplash.com/photo-1530789253388-582c481c54b0?w=1600&q=80" alt="Travel CTA" fill className="object-cover" />
          <div className="absolute inset-0 dark:bg-[#050816]/85 bg-slate-900/75" />
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600 rounded-full filter blur-[120px] opacity-10 pointer-events-none" />
        <AnimatedSection className="relative z-10 max-w-3xl mx-auto text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/80 text-sm font-medium mb-6">
            {h.ctaBadge}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-5 leading-tight">
            {h.ctaH1}{" "}
            <span className="gradient-text">{h.ctaH2}</span>
            <br />
            {h.ctaH3}
          </h2>
          <p className="text-lg text-slate-300 mb-10 max-w-xl mx-auto">{h.ctaSub}</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/planner" className="flex items-center gap-2.5 px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-teal-500 text-white font-bold text-base hover:shadow-2xl hover:shadow-blue-500/30 hover:-translate-y-1 transition-all duration-300">
              <Sparkles className="w-5 h-5" />
              {h.ctaBtn1}
            </Link>
            <Link href="/pricing" className="flex items-center gap-2 text-white/70 hover:text-white font-medium transition-colors text-sm">
              {h.ctaBtn2} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </AnimatedSection>
      </section>
    </div>
  );
}
