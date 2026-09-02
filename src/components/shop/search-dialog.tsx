import * as React from "react";
import { Search, X } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useShop, searchProducts } from "@/lib/shop-store";
import { currency, products } from "@/lib/shop-data";
import { Stars } from "./product-card";

export function SearchDialog() {
  const { searchOpen, setSearchOpen, add } = useShop();
  const [q, setQ] = React.useState("");
  const results = q.trim() ? searchProducts(q) : products.slice(0, 3);

  React.useEffect(() => {
    if (!searchOpen) setQ("");
  }, [searchOpen]);

  return (
    <Dialog open={searchOpen} onOpenChange={setSearchOpen}>
      <DialogContent
        showCloseButton={false}
        className="top-24 max-w-2xl translate-y-0 gap-0 overflow-hidden rounded-sm p-0"
      >
        <DialogTitle className="sr-only">Search products</DialogTitle>
        <DialogDescription className="sr-only">
          Type to search the Maison Lumé collection in real time.
        </DialogDescription>
        <div className="flex items-center gap-3 border-b border-border px-5">
          <Search className="size-4 text-muted-foreground" aria-hidden />
          <input
            autoFocus
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search serums, lips, fragrance…"
            aria-label="Search products"
            className="h-14 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
          <button aria-label="Close search" onClick={() => setSearchOpen(false)}>
            <X className="size-4 text-muted-foreground" aria-hidden />
          </button>
        </div>

        <div className="max-h-[55vh] overflow-y-auto p-2">
          {!q.trim() && (
            <p className="eyebrow px-3 py-2 text-muted-foreground">Popular right now</p>
          )}
          {results.length === 0 ? (
            <p className="px-3 py-8 text-center text-sm text-muted-foreground">
              No matches for “{q}”. Try “serum”, “lips” or “dryness”.
            </p>
          ) : (
            <ul>
              {results.map((p) => (
                <li key={p.id}>
                  <div className="flex items-center gap-4 rounded-sm px-3 py-3 transition-colors hover:bg-blush/30">
                    <img
                      src={p.image}
                      alt={p.name}
                      loading="lazy"
                      width={900}
                      height={1100}
                      className="size-14 rounded-sm object-cover"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-display text-lg leading-tight">{p.name}</p>
                      <p className="truncate text-xs text-muted-foreground">{p.tagline}</p>
                      <Stars rating={p.rating} />
                    </div>
                    <span className="text-sm">{currency(p.price)}</span>
                    <button
                      onClick={() => add(p)}
                      className="rounded-sm border border-foreground/25 px-3 py-2 text-[11px] uppercase tracking-[0.18em] transition-colors hover:bg-foreground hover:text-background"
                    >
                      Add
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
