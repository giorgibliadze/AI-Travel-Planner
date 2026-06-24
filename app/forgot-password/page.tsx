"use client";

import { useState } from "react";
import { Mail, Sparkles } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";

export default function ForgotPasswordPage() {
  const { t } = useLanguage();
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState<string | null>(null);

  const submit = async () => {
    const error = await resetPassword(email);
    setMessage(error ? t.auth.genericError : t.auth.resetSent);
  };

  return (
    <div className="min-h-screen dark:bg-[#050816] bg-[#F8FAFC] pt-28 pb-16 px-4">
      <div className="max-w-md mx-auto rounded-3xl dark:bg-[#0d1117]/80 bg-white border dark:border-white/5 border-slate-200/80 shadow-xl p-7">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-600 to-teal-500 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-2xl font-black dark:text-white text-slate-900">{t.auth.forgotTitle}</h1>
        </div>
        <label className="block text-sm font-semibold dark:text-slate-300 text-slate-700">
          {t.auth.email}
          <span className="relative mt-2 block">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="w-full pl-11 pr-4 py-3.5 rounded-2xl dark:bg-white/5 bg-slate-50 dark:border-white/10 border border-slate-200 dark:text-white text-slate-900 text-sm" />
          </span>
        </label>
        {message && <div className="mt-4 rounded-2xl bg-blue-500/10 border border-blue-500/20 px-4 py-3 text-sm text-blue-500">{message}</div>}
        <button onClick={submit} disabled={!email} className="mt-5 w-full py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 to-teal-500 text-white font-bold disabled:opacity-50">
          {t.auth.resetButton}
        </button>
      </div>
    </div>
  );
}
