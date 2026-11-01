import { SITE } from "@/constants/site";
import type { CartItem } from "@/types/cart";

/** Builds a wa.me link, optionally pre-filled with a message. */
export function whatsappLink(message?: string): string {
  const base = `https://wa.me/${SITE.whatsappNumber}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
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

/** Formats a structured WhatsApp message for ordering a single product directly from a card. */
export function buildSingleProductOrderWhatsAppMessage(
  name: string,
  variantLabel: string,
  price: number,
  quantity: number = 1
): string {
  const itemTotal = price * quantity;
  return [
    `🌾 *New Order Request - ${SITE.name}*`,
    `--------------------------------`,
    `*Product:* *${name}* (${variantLabel})`,
    `*Quantity:* ${quantity}`,
    `*Price:* ₹${price}`,
    `*Total Amount:* *₹${itemTotal}*`,
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

/** Builds the WhatsApp link for ordering a single product directly from a card. */
export function buildSingleProductOrderWhatsAppLink(
  name: string,
  variantLabel: string,
  price: number,
  quantity: number = 1
): string {
  const message = buildSingleProductOrderWhatsAppMessage(
    name,
    variantLabel,
    price,
    quantity
  );
  return whatsappLink(message);
}
