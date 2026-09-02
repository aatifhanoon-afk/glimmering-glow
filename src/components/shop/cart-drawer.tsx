import { motion, AnimatePresence } from "motion/react";
import { X, Minus, Plus, Trash2, ShoppingBag, ShieldCheck } from "lucide-react";
import { useShop } from "@/lib/shop-store";
import { currency } from "@/lib/shop-data";
import { scrollToId } from "./nav";

export function CartDrawer() {
  const { cartOpen, setCartOpen, cart, setQty, remove, subtotal, setCheckoutOpen } = useShop();
  const shipping = subtotal > 0 && subtotal < 150 ? 12 : 0;

  return (
    <AnimatePresence>
      {cartOpen && (
        <div className="fixed inset-0 z-[60]" role="dialog" aria-modal="true" aria-label="Shopping bag">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCartOpen(false)}
            className="absolute inset-0 bg-slate-ink/35 backdrop-blur-sm"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-background shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-border px-6 py-5">
              <h2 className="font-display text-2xl">Your bag</h2>
              <button
                aria-label="Close bag"
                onClick={() => setCartOpen(false)}
                className="grid size-9 place-items-center rounded-full hover:bg-blush/50"
              >
                <X className="size-5" aria-hidden />
              </button>
            </div>

            {cart.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
                <ShoppingBag className="size-8 text-champagne" aria-hidden />
                <p className="text-sm text-muted-foreground">
                  Your bag is empty. Discover the pieces our clients repurchase most.
                </p>
                <button
                  onClick={() => {
                    setCartOpen(false);
                    scrollToId("bestsellers");
                  }}
                  className="rounded-sm bg-foreground px-6 py-3 text-xs uppercase tracking-[0.2em] text-background"
                >
                  Shop bestsellers
                </button>
              </div>
            ) : (
              <>
                <ul className="flex-1 space-y-5 overflow-y-auto px-6 py-6">
                  {cart.map((line) => (
                    <li key={line.product.id} className="flex gap-4">
                      <img
                        src={line.product.image}
                        alt={line.product.name}
                        loading="lazy"
                        width={900}
                        height={1100}
                        className="size-24 rounded-sm object-cover"
                      />
                      <div className="flex flex-1 flex-col">
                        <div className="flex justify-between gap-2">
                          <h3 className="font-display text-lg leading-tight">{line.product.name}</h3>
                          <span className="text-sm">{currency(line.product.price * line.qty)}</span>
                        </div>
                        <p className="text-xs text-muted-foreground">{line.product.tagline}</p>
                        <div className="mt-auto flex items-center gap-3 pt-3">
                          <div className="flex items-center rounded-sm border border-border">
                            <button
                              aria-label={`Decrease quantity of ${line.product.name}`}
                              onClick={() => setQty(line.product.id, line.qty - 1)}
                              className="grid size-8 place-items-center hover:bg-blush/40"
                            >
                              <Minus className="size-3.5" aria-hidden />
                            </button>
                            <span className="w-8 text-center text-sm">{line.qty}</span>
                            <button
                              aria-label={`Increase quantity of ${line.product.name}`}
                              onClick={() => setQty(line.product.id, line.qty + 1)}
                              className="grid size-8 place-items-center hover:bg-blush/40"
                            >
                              <Plus className="size-3.5" aria-hidden />
                            </button>
                          </div>
                          <button
                            aria-label={`Remove ${line.product.name}`}
                            onClick={() => remove(line.product.id)}
                            className="text-muted-foreground transition-colors hover:text-destructive"
                          >
                            <Trash2 className="size-4" aria-hidden />
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="space-y-3 border-t border-border px-6 py-5">
                  <Row label="Subtotal" value={currency(subtotal)} />
                  <Row label="Shipping" value={shipping ? currency(shipping) : "Complimentary"} />
                  <div className="flex justify-between border-t border-border pt-3 font-display text-xl">
                    <span>Total</span>
                    <span>{currency(subtotal + shipping)}</span>
                  </div>
                  <button
                    onClick={() => setCheckoutOpen(true)}
                    className="w-full rounded-sm bg-foreground py-4 text-xs uppercase tracking-[0.25em] text-background transition-opacity hover:opacity-90"
                  >
                    Preview checkout
                  </button>
                  <p className="flex items-center justify-center gap-1.5 text-[11px] text-muted-foreground">
                    <ShieldCheck className="size-3.5" aria-hidden /> Secure payment · 60-day returns
                  </p>
                </div>
              </>
            )}
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between text-sm text-muted-foreground">
      <span>{label}</span>
      <span className="text-foreground">{value}</span>
    </div>
  );
}
