import { SITE } from "@/constants/site";

/** Builds a wa.me link, optionally pre-filled with a message. */
export function whatsappLink(message?: string): string {
  const base = `https://wa.me/${SITE.whatsappNumber}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
