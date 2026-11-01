import type { CatalogProduct } from "@/types/catalog";
import { fetchCatalog } from "@/lib/catalog";

// ─── API Service Layer ─────────────────────────────────────────────
// Unified catalog service: returns all products synchronized with the Shop catalog.
// ────────────────────────────────────────────────────────────────────

/**
 * Returns all products featured on the home page.
 * Synchronized directly with the Shop catalog so any newly added product
 * automatically appears on the Home page without duplicates or stale data.
 */
export async function fetchBestsellers(): Promise<CatalogProduct[]> {
  return fetchCatalog();
}
