import type { Testimonial } from "@/types/testimonial";

// Mock data imports — replace with real API calls later
import testimonialsList from "@/data/mock/testimonials.json";

/**
 * GET /api/testimonials
 * Returns customer reviews shown on the home page.
 */
export async function fetchTestimonials(): Promise<Testimonial[]> {
  // TODO: Replace with → const res = await fetch(`${API_BASE}/testimonials`);
  return testimonialsList as Testimonial[];
}
