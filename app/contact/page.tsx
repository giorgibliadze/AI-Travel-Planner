"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, MapPin, Send, ChevronDown, CheckCircle2, MessageSquare } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function ContactPage() {
  const { t } = useLanguage();
  const c = t.contact;

  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    setSubmitted(true);
  };

  const contactItems = [
    { icon: Mail, label: c.emailLabel, value: "hello@tripnova.ge", sub: c.emailSub },
    { icon: Phone, label: c.phoneLabel, value: "+995 32 200-00-00", sub: c.phoneSub },
    { icon: MapPin, label: c.addressLabel, value: c.addressValue, sub: c.addressSub },
  ];

  return (
    <div className="min-h-screen dark:bg-[#050816] bg-[#F8FAFC] pt-24 pb-20">
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] bg-blue-600 rounded-full filter blur-[160px] opacity-5" />
        <div className="absolute bottom-1/4 -right-32 w-[400px] h-[400px] bg-teal-500 rounded-full filter blur-[160px] opacity-5" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border dark:border-blue-500/20 border-blue-200 dark:bg-blue-500/10 bg-blue-50 text-blue-500 text-sm font-medium mb-5">
            <MessageSquare className="w-3.5 h-3.5" />
            {c.badge}
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black dark:text-white text-slate-900 mb-4">{c.title}</h1>
          <p className="text-lg dark:text-slate-400 text-slate-500 max-w-xl mx-auto">{c.sub}</p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 mb-16">
          <div className="lg:col-span-2 space-y-4">
            {contactItems.map((item) => (
              <div key={item.label} className="flex items-start gap-4 p-5 rounded-2xl dark:bg-[#0d1117]/80 bg-white border dark:border-white/5 border-slate-200/80 shadow-md">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <div className="text-xs dark:text-slate-400 text-slate-500 font-medium mb-0.5">{item.label}</div>
                  <div className="text-sm font-semibold dark:text-white text-slate-900">{item.value}</div>
                  <div className="text-xs dark:text-slate-500 text-slate-400">{item.sub}</div>
                </div>
              </div>
            ))}

            <div className="rounded-2xl overflow-hidden border dark:border-white/5 border-slate-200/80 shadow-md h-48 relative dark:bg-[#0d1117] bg-slate-100 flex items-center justify-center">
              <div className="absolute inset-0 dark:bg-gradient-to-br dark:from-blue-900/20 dark:to-teal-900/20 bg-gradient-to-br from-blue-50 to-teal-50" />
              <div className="relative text-center">
                <MapPin className="w-8 h-8 dark:text-blue-400 text-blue-400 mx-auto mb-2" />
                <p className="text-sm font-semibold dark:text-white text-slate-700">{c.addressSub}</p>
                <p className="text-xs dark:text-slate-400 text-slate-500">{c.addressValue}</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="rounded-3xl dark:bg-[#0d1117]/80 bg-white border dark:border-white/5 border-slate-200/80 shadow-xl p-7">
              <h2 className="text-xl font-bold dark:text-white text-slate-900 mb-6">{c.formTitle}</h2>

              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div key="success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12">
                    <div className="w-16 h-16 rounded-full bg-teal-500/10 flex items-center justify-center mx-auto mb-4">
                      <CheckCircle2 className="w-8 h-8 text-teal-500" />
                    </div>
                    <h3 className="text-xl font-bold dark:text-white text-slate-900 mb-2">{c.successTitle}</h3>
                    <p className="dark:text-slate-400 text-slate-500 text-sm">{c.successSub}</p>
                  </motion.div>
                ) : (
                  <motion.form key="form" onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold dark:text-slate-400 text-slate-600 uppercase tracking-wide mb-1.5">{c.nameLabel}</label>
                        <input
                          type="text"
                          required
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          placeholder={c.namePlaceholder}
                          className="w-full px-4 py-3 rounded-2xl dark:bg-white/5 bg-slate-50 dark:border-white/10 border border-slate-200 dark:text-white text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold dark:text-slate-400 text-slate-600 uppercase tracking-wide mb-1.5">{c.emailFormLabel}</label>
                        <input
                          type="email"
                          required
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          placeholder="email@example.com"
                          className="w-full px-4 py-3 rounded-2xl dark:bg-white/5 bg-slate-50 dark:border-white/10 border border-slate-200 dark:text-white text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500/50 transition-all text-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold dark:text-slate-400 text-slate-600 uppercase tracking-wide mb-1.5">{c.subjectLabel}</label>
                      <input
                        type="text"
                        value={form.subject}
                        onChange={(e) => setForm({ ...form, subject: e.target.value })}
                        placeholder={c.subjectPlaceholder}
                        className="w-full px-4 py-3 rounded-2xl dark:bg-white/5 bg-slate-50 dark:border-white/10 border border-slate-200 dark:text-white text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500/50 transition-all text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold dark:text-slate-400 text-slate-600 uppercase tracking-wide mb-1.5">{c.messageLabel}</label>
                      <textarea
                        required
                        rows={5}
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        placeholder={c.messagePlaceholder}
                        className="w-full px-4 py-3 rounded-2xl dark:bg-white/5 bg-slate-50 dark:border-white/10 border border-slate-200 dark:text-white text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500/50 transition-all text-sm resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 to-teal-500 text-white font-bold text-sm hover:shadow-xl hover:shadow-blue-500/20 hover:-translate-y-0.5 transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {loading ? (
                        <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> {c.sendingBtn}</>
                      ) : (
                        <><Send className="w-4 h-4" /> {c.sendBtn}</>
                      )}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        <div className="max-w-3xl mx-auto" id="faq">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-black dark:text-white text-slate-900 mb-3">{c.faqTitle}</h2>
            <p className="dark:text-slate-400 text-slate-500 text-sm">{c.faqSub}</p>
          </div>

          <div className="space-y-3">
            {t.faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="rounded-2xl dark:bg-[#0d1117]/80 bg-white border dark:border-white/5 border-slate-200/80 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left"
                >
                  <span className="text-sm font-semibold dark:text-white text-slate-900 pr-4">{faq.q}</span>
                  <motion.div animate={{ rotate: openFaq === i ? 180 : 0 }} transition={{ duration: 0.2 }}>
                    <ChevronDown className="w-4 h-4 dark:text-slate-400 text-slate-400 flex-shrink-0" />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 text-sm dark:text-slate-400 text-slate-500 leading-relaxed border-t dark:border-white/5 border-slate-100 pt-3">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
