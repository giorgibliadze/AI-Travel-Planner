"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Star, MapPin, ArrowRight } from "lucide-react";
import type { Destination } from "@/data/destinations";
import { useLanguage } from "@/context/LanguageContext";

interface DestinationCardProps {
  destination: Destination;
  index?: number;
}

export default function DestinationCard({ destination, index = 0 }: DestinationCardProps) {
  const { t } = useLanguage();
  const destId = destination.id as keyof typeof t.destNames;
  const localDest = t.destNames[destId] ?? { name: destination.nameGe, country: destination.countryGe, description: destination.description };
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -6 }}
      className="group relative rounded-3xl overflow-hidden dark:bg-[#0d1117] bg-white border dark:border-white/5 border-slate-200/80 shadow-lg hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300"
    >
      {/* Image */}
      <div className="relative h-56 overflow-hidden">
        <Image
          src={destination.image}
          alt={localDest.name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-700"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

        {/* Rating badge */}
        <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/20">
          <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
          <span className="text-xs font-semibold text-white">{destination.rating}</span>
        </div>

        {/* Country */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1">
          <MapPin className="w-3.5 h-3.5 text-white/80" />
          <span className="text-xs text-white/90 font-medium">{localDest.country}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-bold dark:text-white text-slate-900">{localDest.name}</h3>
          <div className="text-right">
            <div className="text-xs dark:text-slate-500 text-slate-400">{t.common.from}</div>
            <div className="text-base font-bold text-blue-500">{destination.priceFrom}₾</div>
          </div>
        </div>

        <p className="text-sm dark:text-slate-400 text-slate-500 leading-relaxed mb-4 line-clamp-2">
          {localDest.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {destination.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-0.5 rounded-full text-xs dark:bg-blue-500/10 bg-blue-50 dark:text-blue-400 text-blue-600 dark:border-blue-500/20 border border-blue-200/50 font-medium"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* CTA */}
        <Link
          href="/planner"
          className="flex items-center justify-between w-full px-4 py-2.5 rounded-xl dark:bg-white/5 bg-slate-50 dark:hover:bg-blue-600/20 hover:bg-blue-50 dark:text-white text-slate-700 dark:hover:text-blue-400 hover:text-blue-600 transition-all group/btn text-sm font-medium"
        >
          <span>{t.common.planTrip}</span>
          <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
        </Link>
      </div>
    </motion.div>
  );
}
