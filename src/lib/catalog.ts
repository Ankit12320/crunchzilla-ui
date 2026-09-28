import type { CatalogProduct, Hamper } from "@/types/catalog";

// Mock data imports — replace with real API calls later
import catalogList from "@/data/mock/catalog.json";
import hamperData from "@/data/mock/hamper.json";

// ─── API Service Layer ─────────────────────────────────────────────
// Replace mock implementations below with real fetch() calls when ready.
// ────────────────────────────────────────────────────────────────────

/**
 * GET /api/products
 * Returns every product in the shop catalog.
 */
export async function fetchCatalog(): Promise<CatalogProduct[]> {
  // TODO: Replace with → const res = await fetch(`${API_BASE}/products`);
  return catalogList as CatalogProduct[];
}

/**
 * GET /api/hampers/featured
 * Returns the featured gift hamper.
 */
export async function fetchFeaturedHamper(): Promise<Hamper> {
  // TODO: Replace with → const res = await fetch(`${API_BASE}/hampers/featured`);
  return hamperData as Hamper;
}
