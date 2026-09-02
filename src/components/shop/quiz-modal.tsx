import * as React from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, ArrowRight, Sparkles, Check } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useShop } from "@/lib/shop-store";
import { currency, products, type Product } from "@/lib/shop-data";
import { cn } from "@/lib/utils";

const steps = [
  {
    key: "concern",
    question: "What would you like to change first?",
    options: [
      { value: "dryness", label: "Dryness & tightness" },
      { value: "dullness", label: "Dullness & uneven tone" },
      { value: "fine-lines", label: "Fine lines & firmness" },
      { value: "sensitivity", label: "Redness & sensitivity" },
    ],
  },
  {
    key: "routine",
    question: "How involved is your current routine?",
    options: [
      { value: "minimal", label: "Two steps, maximum" },
      { value: "balanced", label: "A considered four steps" },
      { value: "devoted", label: "A full evening ritual" },
    ],
  },
  {
    key: "finish",
    question: "Which finish do you prefer?",
    options: [
      { value: "dewy", label: "Luminous and dewy" },
      { value: "satin", label: "Soft satin" },
      { value: "matte", label: "Velvet matte" },
    ],
  },
] as const;

function recommend(answers: Record<string, string>): Product[] {
  const concern = answers.concern;
  const core = products.filter((p) => p.concerns.includes(concern));
  const picks = [...core];
  const size = answers.routine === "minimal" ? 2 : answers.routine === "devoted" ? 4 : 3;
  for (const p of products) {
    if (picks.length >= size) break;
    if (!picks.find((x) => x.id === p.id)) picks.push(p);
  }
  return picks.slice(0, size);
}

export function QuizModal() {
  const { quizOpen, setQuizOpen, add, setCartOpen } = useShop();
  const [step, setStep] = React.useState(0);
  const [answers, setAnswers] = React.useState<Record<string, string>>({});
  const done = step >= steps.length;
  const picks = done ? recommend(answers) : [];
  const total = picks.reduce((n, p) => n + p.price, 0);
  const bundlePrice = Math.round(total * 0.85);

  React.useEffect(() => {
    if (!quizOpen) {
      const t = setTimeout(() => {
        setStep(0);
        setAnswers({});
      }, 300);
      return () => clearTimeout(t);
    }
  }, [quizOpen]);

  return (
    <Dialog open={quizOpen} onOpenChange={setQuizOpen}>
      <DialogContent className="max-w-xl rounded-sm">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 font-display text-3xl font-light">
            <Sparkles className="size-5 text-champagne" aria-hidden />
            {done ? "Your bespoke ritual" : "Skin consultation"}
          </DialogTitle>
          <DialogDescription>
            {done
              ? "Curated from your answers, with a bundle saving of 15%."
              : `Step ${step + 1} of ${steps.length} — a one-minute consultation.`}
          </DialogDescription>
        </DialogHeader>

        {!done && (
          <div className="h-px w-full bg-border" role="presentation">
            <motion.div
              className="h-px bg-champagne"
              initial={false}
              animate={{ width: `${((step + 1) / steps.length) * 100}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>
        )}

        <AnimatePresence mode="wait">
          <motion.div
            key={done ? "result" : step}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.3 }}
            className="min-h-[260px]"
          >
            {!done ? (
              <div className="space-y-4">
                <h3 className="font-display text-2xl">{steps[step].question}</h3>
                <div className="grid gap-2">
                  {steps[step].options.map((o) => {
                    const selected = answers[steps[step].key] === o.value;
                    return (
                      <button
                        key={o.value}
                        onClick={() => {
                          setAnswers((a) => ({ ...a, [steps[step].key]: o.value }));
                          setTimeout(() => setStep((s) => s + 1), 180);
                        }}
                        className={cn(
                          "flex items-center justify-between rounded-sm border px-4 py-3 text-left text-sm transition-colors",
                          selected
                            ? "border-champagne bg-champagne/15"
                            : "border-border hover:border-champagne hover:bg-blush/25",
                        )}
                      >
                        {o.label}
                        {selected && <Check className="size-4 text-champagne" aria-hidden />}
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <ul className="space-y-3">
                  {picks.map((p) => (
                    <li key={p.id} className="flex items-center gap-3">
                      <img
                        src={p.image}
                        alt={p.name}
                        loading="lazy"
                        width={900}
                        height={1100}
                        className="size-14 rounded-sm object-cover"
                      />
                      <div className="flex-1">
                        <p className="font-display text-lg leading-tight">{p.name}</p>
                        <p className="text-xs text-muted-foreground">{p.tagline}</p>
                      </div>
                      <span className="text-sm text-muted-foreground line-through">
                        {currency(p.price)}
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="flex items-baseline justify-between border-t border-border pt-3">
                  <span className="eyebrow text-muted-foreground">Bundle price</span>
                  <span className="font-display text-2xl">{currency(bundlePrice)}</span>
                </div>
                <button
                  onClick={() => {
                    picks.forEach((p) => add(p));
                    setQuizOpen(false);
                    setCartOpen(true);
                  }}
                  className="w-full rounded-sm bg-foreground py-4 text-xs uppercase tracking-[0.25em] text-background transition-opacity hover:opacity-90"
                >
                  Add ritual to bag
                </button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-between pt-1">
          <button
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            disabled={step === 0}
            className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.18em] text-muted-foreground disabled:opacity-30"
          >
            <ArrowLeft className="size-3.5" aria-hidden /> Back
          </button>
          {!done && (
            <button
              onClick={() => setStep((s) => s + 1)}
              disabled={!answers[steps[step].key]}
              className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.18em] disabled:opacity-30"
            >
              Continue <ArrowRight className="size-3.5" aria-hidden />
            </button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
