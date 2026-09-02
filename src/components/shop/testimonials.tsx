import * as React from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";
import { testimonials } from "@/lib/shop-data";
import { Stars } from "./product-card";
import { cn } from "@/lib/utils";

export function Testimonials() {
  const [i, setI] = React.useState(0);
  const [dir, setDir] = React.useState(1);

  const go = React.useCallback((next: number, d: number) => {
    setDir(d);
    setI((next + testimonials.length) % testimonials.length);
  }, []);

  React.useEffect(() => {
    const t = setInterval(() => go(i + 1, 1), 7000);
    return () => clearInterval(t);
  }, [i, go]);

  const item = testimonials[i]!;

  return (
    <section id="reviews" className="bg-cream px-4 py-24 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-3xl text-center">
        <p className="eyebrow text-champagne">Client letters</p>
        <div className="relative mt-10 min-h-[240px]">
          <Quote className="mx-auto size-6 text-champagne" aria-hidden />
          <AnimatePresence mode="wait" custom={dir}>
            <motion.blockquote
              key={i}
              initial={{ opacity: 0, x: dir * 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: dir * -40 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6"
            >
              <p className="font-display text-2xl leading-relaxed sm:text-3xl">“{item.quote}”</p>
              <footer className="mt-6 space-y-2">
                <div className="flex justify-center">
                  <Stars rating={5} />
                </div>
                <p className="text-sm text-foreground">{item.name}</p>
                <p className="text-xs text-muted-foreground">{item.role}</p>
              </footer>
            </motion.blockquote>
          </AnimatePresence>
        </div>

        <div className="mt-8 flex items-center justify-center gap-5">
          <button
            aria-label="Previous testimonial"
            onClick={() => go(i - 1, -1)}
            className="grid size-10 place-items-center rounded-full border border-border transition-colors hover:bg-blush/40"
          >
            <ArrowLeft className="size-4" aria-hidden />
          </button>
          <div className="flex gap-2">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                aria-label={`Go to testimonial ${idx + 1}`}
                aria-current={idx === i}
                onClick={() => go(idx, idx > i ? 1 : -1)}
                className={cn(
                  "h-1.5 rounded-full transition-all",
                  idx === i ? "w-8 bg-champagne" : "w-1.5 bg-border",
                )}
              />
            ))}
          </div>
          <button
            aria-label="Next testimonial"
            onClick={() => go(i + 1, 1)}
            className="grid size-10 place-items-center rounded-full border border-border transition-colors hover:bg-blush/40"
          >
            <ArrowRight className="size-4" aria-hidden />
          </button>
        </div>
      </div>
    </section>
  );
}
