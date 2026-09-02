import p1 from "@/assets/p1.jpg";
import p2 from "@/assets/p2.jpg";
import p3 from "@/assets/p3.jpg";
import p4 from "@/assets/p4.jpg";
import p5 from "@/assets/p5.jpg";
import p6 from "@/assets/p6.jpg";
import alt1 from "@/assets/alt1.jpg";
import alt2 from "@/assets/alt2.jpg";

export type Category = "Skincare" | "Lips" | "Fragrance" | "Complexion";

export type Product = {
  id: string;
  name: string;
  tagline: string;
  price: number;
  rating: number;
  reviews: number;
  category: Category;
  image: string;
  hoverImage: string;
  badge?: string;
  concerns: string[];
};

export const products: Product[] = [
  {
    id: "rose-elixir",
    name: "Rose Micro-Elixir",
    tagline: "Overnight radiance serum",
    price: 128,
    rating: 4.9,
    reviews: 1284,
    category: "Skincare",
    image: p1,
    hoverImage: alt1,
    badge: "Bestseller",
    concerns: ["dullness", "dryness"],
  },
  {
    id: "silk-cream",
    name: "Silk Veil Cream",
    tagline: "Barrier-restoring moisturiser",
    price: 96,
    rating: 4.8,
    reviews: 942,
    category: "Skincare",
    image: p2,
    hoverImage: alt2,
    concerns: ["dryness", "sensitivity"],
  },
  {
    id: "satin-lip",
    name: "Satin Lip Sculpt",
    tagline: "Weightless blurred colour",
    price: 54,
    rating: 4.7,
    reviews: 613,
    category: "Lips",
    image: p3,
    hoverImage: alt1,
    badge: "New",
    concerns: ["dullness"],
  },
  {
    id: "golden-oil",
    name: "Golden Hour Oil",
    tagline: "Nine-botanical facial oil",
    price: 112,
    rating: 4.9,
    reviews: 1521,
    category: "Skincare",
    image: p4,
    hoverImage: alt2,
    concerns: ["dryness", "fine-lines"],
  },
  {
    id: "blush-compact",
    name: "Blush Compact No.4",
    tagline: "Second-skin powder blush",
    price: 62,
    rating: 4.6,
    reviews: 388,
    category: "Complexion",
    image: p5,
    hoverImage: alt1,
    concerns: ["dullness"],
  },
  {
    id: "eau-de-soie",
    name: "Eau de Soie",
    tagline: "Cashmere musk & neroli",
    price: 165,
    rating: 4.8,
    reviews: 727,
    category: "Fragrance",
    image: p6,
    hoverImage: alt2,
    badge: "Limited",
    concerns: ["sensitivity"],
  },
];

export const categories: Array<Category | "All"> = [
  "All",
  "Skincare",
  "Lips",
  "Complexion",
  "Fragrance",
];

export const testimonials = [
  {
    quote:
      "Six weeks with the Rose Micro-Elixir and my skin looks lit from within. Nothing else comes close.",
    name: "Amara O.",
    role: "Verified client, London",
  },
  {
    quote:
      "The Silk Veil Cream calmed reactive skin I'd struggled with for years. Luxury that actually performs.",
    name: "Elise M.",
    role: "Verified client, Paris",
  },
  {
    quote:
      "Eau de Soie is the first fragrance people stop me about. Soft, warm, unmistakably expensive.",
    name: "Priya R.",
    role: "Verified client, Dubai",
  },
];

export const currency = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
