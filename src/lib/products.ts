import type { Product } from "@/types/product";

// Mock data imports — replace with real API calls later
import productsList from "@/data/mock/products.json";

// ─── API Service Layer ─────────────────────────────────────────────
// Replace mock implementations below with real fetch() calls when ready.
// ────────────────────────────────────────────────────────────────────

/**
 * GET /api/products/bestsellers
 * Returns the products featured on the home page.
 */
export async function fetchBestsellers(): Promise<Product[]> {
  // TODO: Replace with → const res = await fetch(`${API_BASE}/products/bestsellers`);
  return productsList as Product[];
}
