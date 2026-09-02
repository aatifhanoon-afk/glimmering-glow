import { CreditCard, Truck, Gift } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useShop } from "@/lib/shop-store";
import { currency } from "@/lib/shop-data";
import { toast } from "sonner";

export function CheckoutModal() {
  const { checkoutOpen, setCheckoutOpen, cart, subtotal, setCartOpen } = useShop();
  const shipping = subtotal > 0 && subtotal < 150 ? 12 : 0;

  return (
    <Dialog open={checkoutOpen} onOpenChange={setCheckoutOpen}>
      <DialogContent className="max-w-lg rounded-sm">
        <DialogHeader>
          <DialogTitle className="font-display text-3xl font-light">Checkout preview</DialogTitle>
          <DialogDescription>
            A demonstration summary — no payment is taken in this experience.
          </DialogDescription>
        </DialogHeader>

        <ul className="max-h-56 space-y-3 overflow-y-auto border-y border-border py-4">
          {cart.map((l) => (
            <li key={l.product.id} className="flex justify-between text-sm">
              <span className="text-muted-foreground">
                {l.product.name} × {l.qty}
              </span>
              <span>{currency(l.product.price * l.qty)}</span>
            </li>
          ))}
          {cart.length === 0 && (
            <li className="text-sm text-muted-foreground">Your bag is empty.</li>
          )}
        </ul>

        <div className="space-y-2 text-sm">
          <div className="flex justify-between text-muted-foreground">
            <span>Shipping</span>
            <span>{shipping ? currency(shipping) : "Complimentary express"}</span>
          </div>
          <div className="flex justify-between font-display text-2xl">
            <span>Total</span>
            <span>{currency(subtotal + shipping)}</span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 pt-2 text-center text-[11px] text-muted-foreground">
          <Perk icon={<Truck className="size-4" aria-hidden />} label="2-day delivery" />
          <Perk icon={<Gift className="size-4" aria-hidden />} label="3 free samples" />
          <Perk icon={<CreditCard className="size-4" aria-hidden />} label="Pay in 4" />
        </div>

        <button
          disabled={cart.length === 0}
          onClick={() => {
            toast.success("Order placed", {
              description: "A confirmation has been sent to your inbox.",
            });
            setCheckoutOpen(false);
            setCartOpen(false);
          }}
          className="mt-2 w-full rounded-sm bg-foreground py-4 text-xs uppercase tracking-[0.25em] text-background transition-opacity hover:opacity-90 disabled:opacity-40"
        >
          Confirm order
        </button>
      </DialogContent>
    </Dialog>
  );
}

function Perk({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1.5 rounded-sm bg-cream py-3">
      <span className="text-champagne">{icon}</span>
      {label}
    </div>
  );
}
