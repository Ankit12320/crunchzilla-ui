import { SITE } from "@/constants/site";
import type { CartItem } from "@/types/cart";

/** Builds a wa.me link, optionally pre-filled with a message. */
export function whatsappLink(message?: string): string {
  const base = `https://wa.me/${SITE.whatsappNumber}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

/** Formats a structured WhatsApp message for placing a full cart order. */
export function buildCartOrderWhatsAppMessage(
  items: CartItem[],
  subtotal: number,
  shippingFee: number,
  grandTotal: number
): string {
  const itemLines = items
    .map(
      (item, index) =>
        `${index + 1}. *${item.name}* (${item.variantLabel})\n   Qty: ${item.quantity} × ₹${item.price} = *₹${item.quantity * item.price}*`
    )
    .join("\n\n");

  const shippingText =
    shippingFee === 0
      ? `FREE (Orders above ₹${SITE.freeShippingAbove})`
      : `₹${shippingFee}`;

  return [
    `🌾 *New Order Request - ${SITE.name}*`,
    `--------------------------------`,
    `*Order Summary:*`,
    itemLines,
    `--------------------------------`,
    `*Items Subtotal:* ₹${subtotal}`,
    `*Delivery Fee:* ${shippingText}`,
    `*Grand Total:* *₹${grandTotal}*`,
    `--------------------------------`,
    `📍 *My Delivery Details:*`,
    `• Name: `,
    `• Phone Number: `,
    `• Delivery Address: `,
    `• City, State & Pincode: `,
    ``,
    `Please confirm the order and share payment details (UPI/Card/COD). Thank you!`,
  ].join("\n");
}

/** Builds the WhatsApp link with the pre-filled cart order message. */
export function buildCartOrderWhatsAppLink(
  items: CartItem[],
  subtotal: number,
  shippingFee: number,
  grandTotal: number
): string {
  const message = buildCartOrderWhatsAppMessage(
    items,
    subtotal,
    shippingFee,
    grandTotal
  );
  return whatsappLink(message);
}
