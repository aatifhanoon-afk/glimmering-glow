import * as React from "react";
import { motion } from "motion/react";
import { Heart, Star, Plus } from "lucide-react";
import { currency, type Product } from "@/lib/shop-data";
import { useShop } from "@/lib/shop-store";
import { cn } from "@/lib/utils";

export function Stars({ rating, reviews }: { rating: number; reviews?: number }) {
  return (
    <div className="flex items-center gap-1.5" aria-label={`Rated ${rating} out of 5`}>
      <div className="flex">
        {[1, 2, 3, 4, 5].map((i) => (
          <Star
            key={i}
            aria-hidden
            className={cn(
              "size-3.5",
              i <= Math.round(rating) ? "fill-champagne text-champagne" : "text-border",
            )}
          />
        ))}
      </div>
      <span className="text-xs text-muted-foreground">
        {rating.toFixed(1)}
        {reviews ? ` (${reviews.toLocaleString()})` : ""}
      </span>
    </div>
  );
}

export function ProductCard({ product }: { product: Product }) {
  const { add, toggleWish, wishlist } = useShop();
  const wished = wishlist.includes(product.id);

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex flex-col"
    >
      <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-blush/30">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          width={900}
          height={1100}
          className="absolute inset-0 size-full object-cover transition-all duration-700 group-hover:scale-105 group-hover:opacity-0"
        />
        <img
          src={product.hoverImage}
          alt=""
          aria-hidden
          loading="lazy"
          width={900}
          height={1100}
          className="absolute inset-0 size-full scale-105 object-cover opacity-0 transition-all duration-700 group-hover:scale-100 group-hover:opacity-100"
        />

        {product.badge && (
          <span className="absolute left-3 top-3 rounded-full bg-background/80 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-foreground backdrop-blur">
            {product.badge}
          </span>
        )}

        <button
          type="button"
          onClick={() => toggleWish(product)}
          aria-pressed={wished}
          aria-label={wished ? `Remove ${product.name} from wishlist` : `Save ${product.name} to wishlist`}
          className="absolute right-3 top-3 grid size-9 place-items-center rounded-full bg-background/80 backdrop-blur transition-transform hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-champagne"
        >
          <Heart
            aria-hidden
            className={cn("size-4", wished ? "fill-blush-deep text-blush-deep" : "text-foreground")}
          />
        </button>

        <div className="absolute inset-x-3 bottom-3 translate-y-3 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 focus-within:translate-y-0 focus-within:opacity-100">
          <button
            type="button"
            onClick={() => add(product)}
            className="flex w-full items-center justify-center gap-2 rounded-sm bg-foreground/95 py-3 text-xs uppercase tracking-[0.2em] text-background backdrop-blur transition-colors hover:bg-foreground"
          >
            <Plus className="size-3.5" aria-hidden /> Quick add
          </button>
        </div>
      </div>

      <div className="mt-4 flex flex-1 flex-col gap-1.5">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="font-display text-xl leading-tight">{product.name}</h3>
          <span className="text-sm text-foreground/80">{currency(product.price)}</span>
        </div>
        <p className="text-sm text-muted-foreground">{product.tagline}</p>
        <Stars rating={product.rating} reviews={product.reviews} />
        <button
          type="button"
          onClick={() => add(product)}
          className="mt-3 rounded-sm border border-foreground/25 py-2.5 text-xs uppercase tracking-[0.2em] transition-colors hover:bg-foreground hover:text-background sm:hidden"
        >
          Quick add
        </button>
      </div>
    </motion.article>
  );
}
