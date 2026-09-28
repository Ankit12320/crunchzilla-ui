import type { IMAGES } from "@/constants/images";

export type ProductImageKey = keyof typeof IMAGES.products;

export type BadgeTone = "amber" | "forest" | "tertiary";

export interface ProductVariant {
  id: string;
  label: string;
}

export interface Product {
  slug: string;
  name: string;
  price: number;
  subtitle: string;
  description: string;
  image: ProductImageKey;
  imageAlt: string;
  badge: { label: string; tone: BadgeTone };
  rating: number;
  reviewCount: string;
  variants: ProductVariant[];
}
