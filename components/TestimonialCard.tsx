import Image from "next/image";
import { Star, Quote } from "lucide-react";
import type { Testimonial } from "@/data/testimonials";

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export default function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <div className="relative p-6 rounded-3xl dark:bg-[#0d1117]/80 bg-white border dark:border-white/5 border-slate-200/80 shadow-lg hover:shadow-xl transition-shadow">
      {/* Quote icon */}
      <div className="absolute top-5 right-5 w-8 h-8 rounded-xl bg-blue-500/10 flex items-center justify-center">
        <Quote className="w-4 h-4 text-blue-500" />
      </div>

      {/* Stars */}
      <div className="flex gap-0.5 mb-4">
        {Array.from({ length: testimonial.rating }).map((_, i) => (
          <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
        ))}
      </div>

      {/* Text */}
      <p className="text-sm dark:text-slate-300 text-slate-600 leading-relaxed mb-5">
        &ldquo;{testimonial.text}&rdquo;
      </p>

      {/* Author */}
      <div className="flex items-center gap-3">
        <div className="relative w-10 h-10 rounded-full overflow-hidden ring-2 ring-blue-500/20">
          <Image
            src={testimonial.avatar}
            alt={testimonial.name}
            fill
            className="object-cover"
            sizes="40px"
          />
        </div>
        <div>
          <div className="text-sm font-semibold dark:text-white text-slate-900">{testimonial.name}</div>
          <div className="text-xs dark:text-slate-400 text-slate-500">{testimonial.role} · {testimonial.destination}</div>
        </div>
      </div>
    </div>
  );
}
