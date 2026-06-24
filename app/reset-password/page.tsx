"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Lock, Sparkles } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { createBrowserSupabaseClient } from "@/lib/supabase/client";

export default function ResetPasswordPage() {
  const { t } = useLanguage();
  const router = useRouter();
  const supabase = createBrowserSupabaseClient();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    setMessage(null);
    if (password !== confirmPassword) {
      setMessage(t.auth.genericError);
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });
    setLoading(false);
    if (error) {
      setMessage(t.auth.genericError);
      return;
    }

    router.push("/login");
    router.refresh();
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
        <div className="space-y-4">
          <label className="block text-sm font-semibold dark:text-slate-300 text-slate-700">
            {t.auth.password}
            <span className="relative mt-2 block">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input value={password} onChange={(e) => setPassword(e.target.value)} type={showPassword ? "text" : "password"} className="w-full pl-11 pr-12 py-3.5 rounded-2xl dark:bg-white/5 bg-slate-50 dark:border-white/10 border border-slate-200 dark:text-white text-slate-900 text-sm" />
              <button
                type="button"
                aria-label={showPassword ? t.auth.hidePassword : t.auth.showPassword}
                onClick={() => setShowPassword((value) => !value)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-lg dark:text-slate-400 text-slate-500 dark:hover:bg-white/10 hover:bg-slate-200 transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </span>
          </label>
          <label className="block text-sm font-semibold dark:text-slate-300 text-slate-700">
            {t.auth.password}
            <span className="relative mt-2 block">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} type={showPassword ? "text" : "password"} className="w-full pl-11 pr-4 py-3.5 rounded-2xl dark:bg-white/5 bg-slate-50 dark:border-white/10 border border-slate-200 dark:text-white text-slate-900 text-sm" />
            </span>
          </label>
          {message && <div className="rounded-2xl bg-amber-500/10 border border-amber-500/20 px-4 py-3 text-sm text-amber-500">{message}</div>}
          <button onClick={submit} disabled={loading || !password || !confirmPassword} className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 to-teal-500 text-white font-bold disabled:opacity-50">
            {t.auth.resetButton}
          </button>
        </div>
      </div>
    </div>
  );
}
