import * as React from "react";
import { toast } from "sonner";
import { products, type Product } from "./shop-data";

type CartLine = { product: Product; qty: number };

type ShopState = {
  cart: CartLine[];
  wishlist: string[];
  cartOpen: boolean;
  searchOpen: boolean;
  quizOpen: boolean;
  checkoutOpen: boolean;
  add: (p: Product, qty?: number) => void;
  setQty: (id: string, qty: number) => void;
  remove: (id: string) => void;
  clear: () => void;
  toggleWish: (p: Product) => void;
  setCartOpen: (v: boolean) => void;
  setSearchOpen: (v: boolean) => void;
  setQuizOpen: (v: boolean) => void;
  setCheckoutOpen: (v: boolean) => void;
  count: number;
  subtotal: number;
};

const Ctx = React.createContext<ShopState | null>(null);

export function ShopProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = React.useState<CartLine[]>([]);
  const [wishlist, setWishlist] = React.useState<string[]>([]);
  const [cartOpen, setCartOpen] = React.useState(false);
  const [searchOpen, setSearchOpen] = React.useState(false);
  const [quizOpen, setQuizOpen] = React.useState(false);
  const [checkoutOpen, setCheckoutOpen] = React.useState(false);

  const add = React.useCallback((p: Product, qty = 1) => {
    setCart((c) => {
      const found = c.find((l) => l.product.id === p.id);
      if (found) return c.map((l) => (l.product.id === p.id ? { ...l, qty: l.qty + qty } : l));
      return [...c, { product: p, qty }];
    });
    toast.success(`${p.name} added to your bag`, {
      description: "Complimentary samples included with every order.",
      action: { label: "View bag", onClick: () => setCartOpen(true) },
    });
  }, []);

  const setQty = React.useCallback((id: string, qty: number) => {
    setCart((c) =>
      qty <= 0
        ? c.filter((l) => l.product.id !== id)
        : c.map((l) => (l.product.id === id ? { ...l, qty } : l)),
    );
  }, []);

  const remove = React.useCallback((id: string) => {
    setCart((c) => c.filter((l) => l.product.id !== id));
    toast("Removed from bag");
  }, []);

  const toggleWish = React.useCallback((p: Product) => {
    setWishlist((w) => {
      const has = w.includes(p.id);
      toast(has ? `${p.name} removed from wishlist` : `${p.name} saved to wishlist`);
      return has ? w.filter((i) => i !== p.id) : [...w, p.id];
    });
  }, []);

  const clear = React.useCallback(() => setCart([]), []);

  const setCheckoutOpenSynced = React.useCallback((v: boolean) => {
    if (v) setCartOpen(false);
    setCheckoutOpen(v);
  }, []);

  const count = cart.reduce((n, l) => n + l.qty, 0);
  const subtotal = cart.reduce((n, l) => n + l.qty * l.product.price, 0);

  const value: ShopState = {
    cart,
    wishlist,
    cartOpen,
    searchOpen,
    quizOpen,
    checkoutOpen,
    add,
    setQty,
    remove,
    clear,
    toggleWish,
    setCartOpen,
    setSearchOpen,
    setQuizOpen,
    setCheckoutOpen: setCheckoutOpenSynced,
    count,
    subtotal,
  };

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useShop() {
  const ctx = React.useContext(Ctx);
  if (!ctx) throw new Error("useShop must be used inside ShopProvider");
  return ctx;
}

export function searchProducts(q: string) {
  const term = q.trim().toLowerCase();
  if (!term) return [];
  return products.filter((p) =>
    [p.name, p.tagline, p.category, ...p.concerns].join(" ").toLowerCase().includes(term),
  );
}
