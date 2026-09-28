import type { CatalogProduct, CatalogSort } from "@/types/catalog";

// Pure helpers — safe to import from client components (no mock data).

const basePrice = (p: CatalogProduct) => p.variants[0]?.price ?? 0;

/** Filters by category and applies the chosen sort. */
export function filterAndSortCatalog(
  products: CatalogProduct[],
  category: string,
  sort: CatalogSort
): CatalogProduct[] {
  let result =
    category === "all" ? [...products] : products.filter((p) => p.category === category);

  switch (sort) {
    case "price-low":
      result.sort((a, b) => basePrice(a) - basePrice(b));
      break;
    case "price-high":
      result.sort((a, b) => basePrice(b) - basePrice(a));
      break;
    case "popular":
      result.sort((a, b) => b.popularity - a.popularity);
      break;
    case "rating":
      result = result.filter((p) => p.rating >= 4.8).sort((a, b) => b.rating - a.rating);
      break;
  }
  return result;
}
