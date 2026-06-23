"use client";

import Link from "next/link";
import { Plane, Mail, Phone, MapPin, Share2, X, Rss, Globe } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();
  const fl = t.footer.links;

  const footerLinks = {
    platform: [
      { label: fl.planner, href: "/planner" },
      { label: fl.destinations, href: "/destinations" },
      { label: fl.pricing, href: "/pricing" },
      { label: fl.reviews, href: "/reviews" },
    ],
    support: [
      { label: fl.contactLink, href: "/contact" },
      { label: fl.faq, href: "/contact#faq" },
      { label: fl.blog, href: "/blog" },
      { label: fl.api, href: "/api-docs" },
    ],
    legal: [
      { label: fl.privacy, href: "/privacy" },
      { label: fl.terms, href: "/terms" },
      { label: fl.cookies, href: "/cookies" },
    ],
  };

  return (
    <footer className="relative dark:bg-[#030712] bg-slate-900 text-white overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-600 rounded-full filter blur-[120px] opacity-5 pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-teal-500 rounded-full filter blur-[120px] opacity-5 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-teal-500 flex items-center justify-center">
                <Plane className="w-4 h-4 text-white" strokeWidth={2.5} />
              </div>
              <span className="text-xl font-bold text-white">
                Trip<span className="gradient-text">Nova</span> AI
              </span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed mb-6 max-w-xs">
              {t.footer.tagline}
            </p>
            <div className="flex items-center gap-3">
              {[Share2, X, Rss, Globe].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-blue-600/20 hover:border-blue-500/30 transition-colors group"
                >
                  <Icon className="w-4 h-4 text-slate-400 group-hover:text-blue-400 transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">{t.footer.platform}</h4>
            <ul className="space-y-2.5">
              {footerLinks.platform.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-slate-400 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">{t.footer.support}</h4>
            <ul className="space-y-2.5">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-slate-400 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">{t.footer.contact}</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2.5 text-sm text-slate-400">
                <Mail className="w-4 h-4 text-blue-400 flex-shrink-0" />
                hello@tripnova.ge
              </li>
              <li className="flex items-center gap-2.5 text-sm text-slate-400">
                <Phone className="w-4 h-4 text-blue-400 flex-shrink-0" />
                +995 32 200-00-00
              </li>
              <li className="flex items-center gap-2.5 text-sm text-slate-400">
                <MapPin className="w-4 h-4 text-blue-400 flex-shrink-0" />
                {t.footer.address}
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500">{t.footer.copyright}</p>
          <div className="flex items-center gap-4">
            {footerLinks.legal.map((link) => (
              <Link key={link.label} href={link.href} className="text-xs text-slate-500 hover:text-slate-300 transition-colors">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
