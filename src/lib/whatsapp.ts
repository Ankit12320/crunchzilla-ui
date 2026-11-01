import { SITE } from "@/constants/site";
import type { CartItem } from "@/types/cart";

/** Builds a wa.me link, optionally pre-filled with a message. */
export function whatsappLink(message?: string): string {
  const base = `https://wa.me/${SITE.whatsappNumber}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

/** Formats a clean WhatsApp message containing ONLY the details and summary from a single product card. */
export function buildProductCardWhatsAppMessage({
  name,
  variantLabel,
  price,
  summary,
}: {
  name: string;
  variantLabel: string;
  price: number;
  summary?: string;
}): string {
  const lines = [
    `Hi ${SITE.name}, I want to order:`,
    ``,
    `• Product: ${name}`,
    `• Size: ${variantLabel}`,
    `• Price: ₹${price}`,
  ];

  if (summary) {
    lines.push(`• Summary: ${summary}`);
  }

  return lines.join("\n");
}

/** Builds the WhatsApp link for ordering a single product card directly. */
export function buildProductCardWhatsAppLink(options: {
  name: string;
  variantLabel: string;
  price: number;
  summary?: string;
}): string {
  const message = buildProductCardWhatsAppMessage(options);
  return whatsappLink(message);
}

/** Formats a structured WhatsApp message for placing a full cart order (only products in cart). */
export function buildCartOrderWhatsAppMessage(
  items: CartItem[],
  total: number
): string {
  const itemLines = items
    .map(
      (item, index) =>
        `${index + 1}. *${item.name}* (${item.variantLabel})\n   Qty: ${item.quantity} × ₹${item.price} = *₹${item.quantity * item.price}*`
    )
    .join("\n\n");

  return [
    `🌾 *New Order Request - ${SITE.name}*`,
    `--------------------------------`,
    `*Products in Order:*`,
    itemLines,
    `--------------------------------`,
    `*Total Amount:* *₹${total}*`,
    `--------------------------------`,
    `📍 *Delivery Details:*`,
    `• Name: `,
    `• Phone Number: `,
    `• Delivery Address: `,
    `• City, State & Pincode: `,
    ``,
    `Please confirm availability and share payment details (UPI/Card/COD). Thank you!`,
  ].join("\n");
}

/** Builds the WhatsApp link with pre-filled cart order details. */
export function buildCartOrderWhatsAppLink(
  items: CartItem[],
  total: number
): string {
  const message = buildCartOrderWhatsAppMessage(items, total);
  return whatsappLink(message);
}
