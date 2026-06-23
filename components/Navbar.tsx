"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Plane, ChevronDown } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { useLanguage } from "@/context/LanguageContext";
import type { Lang } from "@/lib/i18n";

const langLabels: Record<Lang, string> = { ka: "KA", en: "EN", ru: "RU" };
const langFlags: Record<Lang, string> = { ka: "🇬🇪", en: "🇬🇧", ru: "🇷🇺" };
const allLangs: Lang[] = ["ka", "en", "ru"];

export default function Navbar() {
  const { t, lang, setLang } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: "/", label: t.nav.home },
    { href: "/planner", label: t.nav.planner },
    { href: "/destinations", label: t.nav.destinations },
    { href: "/pricing", label: t.nav.pricing },
    { href: "/contact", label: t.nav.contact },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { setMobileOpen(false); }, [pathname]);

  useEffect(() => {
    const close = () => setLangOpen(false);
    if (langOpen) document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, [langOpen]);

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "dark:bg-[#050816]/90 bg-white/90 backdrop-blur-xl shadow-lg shadow-black/5 border-b border-white/10"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-600 to-teal-500 flex items-center justify-center shadow-lg group-hover:shadow-blue-500/30 transition-shadow">
                <Plane className="w-4 h-4 text-white" strokeWidth={2.5} />
              </div>
              <span className="text-xl font-bold dark:text-white text-slate-900">
                Trip<span className="gradient-text">Nova</span>
              </span>
            </Link>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    pathname === link.href
                      ? "dark:bg-white/10 bg-blue-50 dark:text-white text-blue-600 font-semibold"
                      : "dark:text-slate-300 text-slate-600 dark:hover:text-white hover:text-slate-900 dark:hover:bg-white/5 hover:bg-slate-100"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Right side */}
            <div className="flex items-center gap-2">
              <ThemeToggle />

              {/* Language Switcher — Desktop */}
              <div className="hidden md:block relative" onClick={(e) => e.stopPropagation()}>
                <button
                  onClick={() => setLangOpen(!langOpen)}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl dark:bg-white/5 bg-slate-100 dark:text-slate-300 text-slate-600 dark:hover:bg-white/10 hover:bg-slate-200 transition-all text-sm font-semibold border dark:border-white/5 border-slate-200/80"
                >
                  <span>{langFlags[lang]}</span>
                  <span>{langLabels[lang]}</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${langOpen ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence>
                  {langOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 top-full mt-1.5 w-32 rounded-2xl dark:bg-[#0d1117]/95 bg-white/95 backdrop-blur-xl border dark:border-white/10 border-slate-200/80 shadow-xl overflow-hidden"
                    >
                      {allLangs.map((l) => (
                        <button
                          key={l}
                          onClick={() => { setLang(l); setLangOpen(false); }}
                          className={`w-full flex items-center gap-2.5 px-4 py-2.5 text-sm font-medium transition-colors ${
                            lang === l
                              ? "dark:bg-blue-600/20 bg-blue-50 dark:text-blue-400 text-blue-600"
                              : "dark:text-slate-300 text-slate-600 dark:hover:bg-white/5 hover:bg-slate-50"
                          }`}
                        >
                          <span className="text-base">{langFlags[l]}</span>
                          <span>{langLabels[l]}</span>
                          {lang === l && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-500" />}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link
                href="/planner"
                className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 text-white text-sm font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-200 hover:-translate-y-0.5"
              >
                <Plane className="w-3.5 h-3.5" />
                {t.nav.start}
              </Link>
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden p-2 rounded-xl dark:text-white text-slate-700 dark:hover:bg-white/10 hover:bg-slate-100 transition-colors"
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-16 left-0 right-0 z-40 dark:bg-[#050816]/95 bg-white/95 backdrop-blur-xl border-b dark:border-white/10 border-slate-200 shadow-xl"
          >
            <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                    pathname === link.href
                      ? "dark:bg-white/10 bg-blue-50 dark:text-white text-blue-600 font-semibold"
                      : "dark:text-slate-300 text-slate-600"
                  }`}
                >
                  {link.label}
                </Link>
              ))}

              {/* Mobile Language Switcher */}
              <div className="mt-2 mb-1">
                <div className="flex items-center gap-2">
                  {allLangs.map((l) => (
                    <button
                      key={l}
                      onClick={() => setLang(l)}
                      className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                        lang === l
                          ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20"
                          : "dark:bg-white/5 bg-slate-100 dark:text-slate-300 text-slate-600"
                      }`}
                    >
                      <span>{langFlags[l]}</span>
                      <span>{langLabels[l]}</span>
                    </button>
                  ))}
                </div>
              </div>

              <Link
                href="/planner"
                className="mt-1 px-4 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 text-white text-sm font-semibold text-center"
              >
                {t.nav.startMobile}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
