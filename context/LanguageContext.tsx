"use client";

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { type Lang, translations, type LangTranslations } from "@/lib/i18n";

interface LanguageContextValue {
  language: Lang;
  lang: Lang;
  setLanguage: (l: Lang) => void;
  setLang: (l: Lang) => void;
  t: LangTranslations;
  mounted: boolean;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

function isLang(value: string | null): value is Lang {
  return value === "ka" || value === "en" || value === "ru";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Lang>("ka");
  const [mounted, setMounted] = useState(false);

  const setLanguage = (l: Lang) => {
    setLanguageState(l);
    localStorage.setItem("language", l);
    localStorage.setItem("tripnova-lang", l);
    document.documentElement.lang = l;
  };

  useEffect(() => {
    const savedLang = localStorage.getItem("language") || localStorage.getItem("tripnova-lang");
    const nextLang = isLang(savedLang) ? savedLang : "ka";

    setLanguageState(nextLang);
    document.documentElement.lang = nextLang;
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) document.documentElement.lang = language;
  }, [language, mounted]);

  if (!mounted) {
    return null;
  }

  const setLang = setLanguage;
  const lang = language;

  return (
    <LanguageContext.Provider value={{ language, lang, setLanguage, setLang, t: translations[language], mounted }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used inside LanguageProvider");
  return ctx;
}
