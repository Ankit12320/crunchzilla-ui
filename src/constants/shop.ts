import type {
  CatalogCategory,
  CatalogSort,
  PrimaryBadgeTone,
  SecondaryBadgeTone,
} from "@/types/catalog";

export const CURRENT_BATCH = "Batch #CZ-2025-04 Freshly Packed";

export const SHOP_VALUE_STRIP = [
  { icon: "local_fire_department", label: "Slow-Roasted Heritage", className: "flex" },
  { icon: "psychiatry", label: "Zero Added Palm Oil", className: "hidden sm:flex" },
  { icon: "pin_drop", label: "Direct Origin: Gaya & Mithila", className: "flex" },
  { icon: "format_image_left", label: "FSSAI Certified Fresh Batches", className: "hidden md:flex" },
] as const;

export const CATALOG_CATEGORIES: { id: CatalogCategory | "all"; label: string }[] = [
  { id: "all", label: "All Products" },
  { id: "tilkut", label: "Traditional Tilkut" },
  { id: "makhana", label: "Foxnuts / Makhana" },
  { id: "sattu", label: "Roasted Sattu" },
  { id: "chura", label: "Pantry Cereals (Chura)" },
  { id: "jaggery", label: "Pure Gud / Jaggery" },
];

export const SORT_OPTIONS: { value: CatalogSort; label: string }[] = [
  { value: "featured", label: "Featured Curations" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "popular", label: "Bestsellers First" },
  { value: "rating", label: "Top Rated (4.8+)" },
];

export const PRIMARY_BADGE_STYLES: Record<PrimaryBadgeTone, string> = {
  amber: "bg-warm-amber text-pure-parchment",
  forest: "bg-botanical-forest text-pure-parchment",
  terracotta: "bg-roasted-terracotta text-pure-parchment",
  secondary: "bg-secondary text-pure-parchment",
  neutral: "bg-surface-container-highest text-on-surface",
};

export const SECONDARY_BADGE_STYLES: Record<SecondaryBadgeTone, string> = {
  cardamom: "bg-cardamom-light text-botanical-forest",
  sand: "bg-golden-sand text-tertiary",
};
