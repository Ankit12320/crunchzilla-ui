import type { IMAGES } from "@/constants/images";

export type CatalogImageKey = keyof typeof IMAGES.catalog;

export type CatalogCategory = "tilkut" | "makhana" | "sattu" | "chura" | "jaggery";

export type CatalogSort = "featured" | "price-low" | "price-high" | "popular" | "rating";

export type PrimaryBadgeTone = "amber" | "forest" | "terracotta" | "secondary" | "neutral";
export type SecondaryBadgeTone = "cardamom" | "sand";

export interface CatalogVariant {
  id: string;
  label: string;
  price: number;
  /** Original price shown struck through, if discounted */
  mrp?: number;
}

export interface CatalogProduct {
  slug: string;
  name: string;
  category: CatalogCategory;
  eyebrow: string;
  description: string;
  image: CatalogImageKey;
  imageAlt: string;
  primaryBadge: { icon: string; label: string; tone: PrimaryBadgeTone };
  secondaryBadge: { label: string; tone: SecondaryBadgeTone };
  highlight: { left: string; right: string };
  rating: number;
  reviewCount: number;
  /** 0–100, used by "Bestsellers First" sort */
  popularity: number;
  variantLabel: string;
  variants: CatalogVariant[];
}

export interface Hamper {
  slug: string;
  name: string;
  tag: string;
  description: string;
  images: CatalogImageKey[];
  perks: { label: string; value: string; tone: "terracotta" | "secondary" | "amber" }[];
  value: number;
  price: number;
}
