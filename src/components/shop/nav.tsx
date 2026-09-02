import * as React from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, ShoppingBag, Heart, Menu, X, Sparkles } from "lucide-react";
import { useShop } from "@/lib/shop-store";
import { cn } from "@/lib/utils";

const links = [
  { label: "Bestsellers", id: "bestsellers" },
  { label: "The Ritual", id: "benefits" },
  { label: "Collections", id: "collections" },
  { label: "Reviews", id: "reviews" },
];

export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function Nav() {
  const { setCartOpen, setSearchOpen, setQuizOpen, count, wishlist } = useShop();
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id: string) => {
    setOpen(false);
    scrollToId(id);
  };

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-background/65 backdrop-blur-xl border-b border-border/70 shadow-[0_8px_40px_-24px_rgba(60,50,45,0.5)]"
          : "bg-transparent",
      )}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:h-20 sm:px-6 lg:px-10"
      >
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="font-display text-xl tracking-[0.28em] uppercase text-foreground sm:text-2xl"
        >
          Maison<span className="text-champagne">·</span>Lumé
        </button>

        <ul className="hidden items-center gap-9 md:flex">
          {links.map((l) => (
            <li key={l.id}>
              <button
                onClick={() => go(l.id)}
                className="relative text-sm text-foreground/80 transition-colors hover:text-foreground after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-0 after:bg-champagne after:transition-all after:duration-300 hover:after:w-full"
              >
                {l.label}
              </button>
            </li>
          ))}
          <li>
            <button
              onClick={() => setQuizOpen(true)}
              className="inline-flex items-center gap-1.5 rounded-full border border-champagne/60 px-4 py-1.5 text-xs tracking-wide text-foreground transition-colors hover:bg-champagne/20"
            >
              <Sparkles className="size-3.5" aria-hidden /> Skin Quiz
            </button>
          </li>
        </ul>

        <div className="flex items-center gap-1">
          <IconBtn label="Search products" onClick={() => setSearchOpen(true)}>
            <Search className="size-5" aria-hidden />
          </IconBtn>
          <IconBtn label={`Wishlist, ${wishlist.length} items`} onClick={() => scrollToId("bestsellers")}>
            <Heart className="size-5" aria-hidden />
            {wishlist.length > 0 && <Badge>{wishlist.length}</Badge>}
          </IconBtn>
          <IconBtn label={`Open bag, ${count} items`} onClick={() => setCartOpen(true)}>
            <ShoppingBag className="size-5" aria-hidden />
            {count > 0 && <Badge>{count}</Badge>}
          </IconBtn>
          <IconBtn label={open ? "Close menu" : "Open menu"} onClick={() => setOpen((o) => !o)} className="md:hidden">
            {open ? <X className="size-5" aria-hidden /> : <Menu className="size-5" aria-hidden />}
          </IconBtn>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-border/60 bg-background/90 backdrop-blur-xl md:hidden"
          >
            <ul className="flex flex-col px-6 py-4">
              {links.map((l) => (
                <li key={l.id}>
                  <button
                    onClick={() => go(l.id)}
                    className="w-full border-b border-border/50 py-3 text-left text-sm"
                  >
                    {l.label}
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={() => {
                    setOpen(false);
                    setQuizOpen(true);
                  }}
                  className="w-full py-3 text-left text-sm text-champagne"
                >
                  Take the skin quiz
                </button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="absolute -right-0.5 -top-0.5 grid size-4 place-items-center rounded-full bg-foreground text-[10px] font-medium text-background">
      {children}
    </span>
  );
}

function IconBtn({
  children,
  label,
  onClick,
  className,
}: {
  children: React.ReactNode;
  label: string;
  onClick: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={cn(
        "relative grid size-10 place-items-center rounded-full text-foreground transition-colors hover:bg-blush/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-champagne",
        className,
      )}
    >
      {children}
    </button>
  );
}
