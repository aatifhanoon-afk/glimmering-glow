import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import {
  Leaf,
  FlaskConical,
  Recycle,
  HeartHandshake,
  ArrowRight,
  Sparkles,
  Instagram,
  Mail,
} from "lucide-react";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { ShopProvider, useShop } from "@/lib/shop-store";
import { categories, products, type Category } from "@/lib/shop-data";
import { Nav, scrollToId } from "@/components/shop/nav";
import { ProductCard } from "@/components/shop/product-card";
import { CartDrawer } from "@/components/shop/cart-drawer";
import { SearchDialog } from "@/components/shop/search-dialog";
import { CheckoutModal } from "@/components/shop/checkout-modal";
import { QuizModal } from "@/components/shop/quiz-modal";
import { Testimonials } from "@/components/shop/testimonials";
import { cn } from "@/lib/utils";
import heroImg from "@/assets/hero.jpg";

const title = "Maison Lumé — Luxury Skincare & Colour";
const description =
  "Maison Lumé crafts small-batch luxury skincare, lips and fragrance. Shop bestsellers, take the skin consultation, and build your bespoke ritual.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <ShopProvider>
      <div className="min-h-screen bg-background text-foreground">
        <Nav />
        <main>
          <Hero />
          <Marquee />
          <Benefits />
          <Bestsellers />
          <Testimonials />
          <Newsletter />
        </main>
        <Footer />
        <CartDrawer />
        <SearchDialog />
        <CheckoutModal />
        <QuizModal />
        <Toaster position="bottom-right" />
      </div>
    </ShopProvider>
  );
}

function Hero() {
  const { setQuizOpen } = useShop();
  const ref = React.useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-[92vh] overflow-hidden bg-blush/40">
      <motion.div style={{ y, scale }} className="absolute inset-0">
        <img
          src={heroImg}
          alt="Rose micro-elixir serum resting on blush silk"
          width={1600}
          height={1200}
          className="size-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-cream/90 via-cream/55 to-transparent" />
      </motion.div>

      <motion.div
        style={{ opacity: fade }}
        className="relative mx-auto flex min-h-[92vh] max-w-7xl items-center px-4 pt-28 pb-20 sm:px-6 lg:px-10"
      >
        <div className="max-w-xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="eyebrow text-champagne"
          >
            Small-batch · Paris & Kyoto
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 font-display text-5xl leading-[1.05] sm:text-6xl lg:text-7xl"
          >
            Skin that reads
            <span className="block italic text-blush-deep">like candlelight.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.22 }}
            className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground"
          >
            Nine botanicals, cold-pressed and clinically dosed. Formulated for a slow ritual that
            leaves skin lit from beneath.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.34 }}
            className="mt-9 flex flex-col gap-3 sm:flex-row"
          >
            <button
              onClick={() => scrollToId("bestsellers")}
              className="group inline-flex items-center justify-center gap-2 rounded-sm bg-foreground px-8 py-4 text-xs uppercase tracking-[0.25em] text-background transition-opacity hover:opacity-90"
            >
              Shop the collection
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
            </button>
            <button
              onClick={() => setQuizOpen(true)}
              className="inline-flex items-center justify-center gap-2 rounded-sm border border-foreground/30 bg-background/40 px-8 py-4 text-xs uppercase tracking-[0.25em] backdrop-blur transition-colors hover:bg-background/80"
            >
              <Sparkles className="size-4 text-champagne" aria-hidden /> Take the skin quiz
            </button>
          </motion.div>
        </div>
      </motion.div>

      <div className="pointer-events-none absolute -right-16 bottom-10 hidden size-64 rounded-full bg-champagne/25 blur-3xl lux-float lg:block" />
    </section>
  );
}

function Marquee() {
  const items = ["Cruelty-free", "Dermatologist tested", "Refillable glass", "Cold-pressed", "Paraben-free"];
  return (
    <div className="overflow-hidden border-y border-border bg-background py-4">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-10 gap-y-2 px-4 text-center">
        {items.map((t) => (
          <span key={t} className="eyebrow text-muted-foreground">
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

const benefits = [
  {
    icon: Leaf,
    title: "Botanical-led",
    body: "Cold-pressed rose, camellia and squalane sourced from named growers.",
  },
  {
    icon: FlaskConical,
    title: "Clinically dosed",
    body: "Actives at concentrations proven in third-party trials — never window dressing.",
  },
  {
    icon: Recycle,
    title: "Refillable by design",
    body: "Heavy glass vessels with mail-back refills. 82% less packaging per year.",
  },
  {
    icon: HeartHandshake,
    title: "Concierge care",
    body: "A private consultation with an aesthetician included with every order.",
  },
];

function Benefits() {
  return (
    <section id="benefits" className="px-4 py-24 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-xl">
          <p className="eyebrow text-champagne">The Maison standard</p>
          <h2 className="mt-4 font-display text-4xl sm:text-5xl">Four promises in every jar</h2>
        </div>
        <div className="mt-12 grid gap-px overflow-hidden rounded-sm bg-border sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((b, i) => (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="group relative bg-background p-8 transition-colors duration-500 hover:bg-blush/35"
            >
              <b.icon
                className="size-6 text-champagne transition-transform duration-500 group-hover:-translate-y-1"
                aria-hidden
              />
              <h3 className="mt-6 font-display text-2xl">{b.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{b.body}</p>
              <span className="mt-6 block h-px w-0 bg-champagne transition-all duration-500 group-hover:w-16" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Bestsellers() {
  const [active, setActive] = React.useState<Category | "All">("All");
  const list = active === "All" ? products : products.filter((p) => p.category === active);

  return (
    <section id="bestsellers" className="scroll-mt-24 bg-cream/60 px-4 py-24 sm:px-6 lg:px-10">
      <div id="collections" className="mx-auto max-w-7xl scroll-mt-24">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow text-champagne">Most repurchased</p>
            <h2 className="mt-4 font-display text-4xl sm:text-5xl">Bestsellers</h2>
          </div>
          <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter by category">
            {categories.map((c) => (
              <button
                key={c}
                role="tab"
                aria-selected={active === c}
                onClick={() => setActive(c)}
                className={cn(
                  "relative rounded-full border px-4 py-2 text-xs uppercase tracking-[0.16em] transition-colors",
                  active === c
                    ? "border-foreground bg-foreground text-background"
                    : "border-border hover:border-foreground/50",
                )}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <motion.div
          layout
          className="mt-12 grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {list.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

function Newsletter() {
  const [email, setEmail] = React.useState("");
  return (
    <section className="px-4 py-24 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-3xl rounded-sm border border-champagne/40 bg-blush/25 px-6 py-14 text-center sm:px-12">
        <p className="eyebrow text-champagne">The list</p>
        <h2 className="mt-4 font-display text-4xl">Ten percent, and first access</h2>
        <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground">
          Join for early releases, refill reminders and letters from our formulators.
        </p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!email.includes("@")) {
              toast.error("Please enter a valid email address");
              return;
            }
            toast.success("Welcome to the list", { description: "Your 10% code is on its way." });
            setEmail("");
          }}
          className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
        >
          <label htmlFor="newsletter-email" className="sr-only">
            Email address
          </label>
          <input
            id="newsletter-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="h-12 flex-1 rounded-sm border border-border bg-background px-4 text-sm outline-none focus:border-champagne"
          />
          <button
            type="submit"
            className="h-12 rounded-sm bg-foreground px-7 text-xs uppercase tracking-[0.2em] text-background transition-opacity hover:opacity-90"
          >
            Join
          </button>
        </form>
      </div>
    </section>
  );
}

function Footer() {
  const { setQuizOpen, setSearchOpen } = useShop();
  return (
    <footer className="border-t border-border bg-background px-4 py-14 sm:px-6 lg:px-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-display text-xl uppercase tracking-[0.28em]">
            Maison<span className="text-champagne">·</span>Lumé
          </p>
          <p className="mt-2 text-xs text-muted-foreground">
            © {new Date().getFullYear()} Maison Lumé. Crafted in small batches.
          </p>
        </div>
        <nav aria-label="Footer" className="flex flex-wrap gap-6 text-sm text-muted-foreground">
          <button onClick={() => scrollToId("bestsellers")} className="hover:text-foreground">
            Shop
          </button>
          <button onClick={() => setQuizOpen(true)} className="hover:text-foreground">
            Skin quiz
          </button>
          <button onClick={() => setSearchOpen(true)} className="hover:text-foreground">
            Search
          </button>
          <a href="mailto:concierge@maisonlume.com" className="inline-flex items-center gap-1.5 hover:text-foreground">
            <Mail className="size-4" aria-hidden /> Concierge
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 hover:text-foreground"
          >
            <Instagram className="size-4" aria-hidden /> Instagram
          </a>
        </nav>
      </div>
    </footer>
  );
}
