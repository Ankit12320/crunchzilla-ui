import { SITE } from "@/constants/site";

export interface OrderItem {
  name: string;
  variantLabel: string;
  price: number;
  quantity?: number;
}

/** Builds a wa.me link, optionally pre-filled with an encoded message. */
export function whatsappLink(message?: string): string {
  const base = `https://wa.me/${SITE.whatsappNumber}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

/** Formats a structured WhatsApp message strictly following the required order format. */
export function buildWhatsAppOrderMessage(
  items: OrderItem[],
  totalOverride?: number
): string {
  // Include only products added/selected by the customer with valid prices and quantities
  const validItems = (items || []).filter(
    (item) => typeof item.price === "number" && item.price > 0 && (item.quantity ?? 1) > 0
  );

  if (validItems.length === 0) {
    return [
      `Hello ${SITE.name},`,
      ``,
      `I would like to place an order:`,
      ``,
      `Please confirm availability.`,
      ``,
      `Thank you!`,
    ].join("\n");
  }

  let calculatedTotal = 0;
  const itemLines = validItems.map((item, index) => {
    const qty = item.quantity && item.quantity > 0 ? item.quantity : 1;
    const subtotal = qty * item.price;
    calculatedTotal += subtotal;

    const qtyString = qty > 1 ? ` (Qty: ${qty})` : "";
    return `${index + 1}. ${item.name} – ${item.variantLabel}${qtyString} × ₹${item.price} = ₹${subtotal}`;
  });

  const finalTotal = typeof totalOverride === "number" && totalOverride > 0 ? totalOverride : calculatedTotal;

  return [
    `Hello ${SITE.name},`,
    ``,
    `I would like to place an order:`,
    ``,
    ...itemLines,
    ``,
    `Total Amount: ₹${finalTotal}`,
    ``,
    `Please confirm my order.`,
    ``,
    `Thank you!`,
  ].join("\n");
}

/** Builds the WhatsApp link with pre-filled cart order details. */
export function buildCartOrderWhatsAppLink(
  items: OrderItem[],
  total?: number
): string {
  const message = buildWhatsAppOrderMessage(items, total);
  return whatsappLink(message);
}

/** Formats message for cart orders (alias for buildWhatsAppOrderMessage). */
export function buildCartOrderWhatsAppMessage(
  items: OrderItem[],
  total?: number
): string {
  return buildWhatsAppOrderMessage(items, total);
}

/** Formats message for single product card orders (strictly that card only). */
export function buildProductCardWhatsAppMessage(options: {
  name: string;
  variantLabel: string;
  price: number;
  quantity?: number;
  summary?: string;
}): string {
  return buildWhatsAppOrderMessage([
    {
      name: options.name,
      variantLabel: options.variantLabel,
      price: options.price,
      quantity: options.quantity ?? 1,
    },
  ]);
}

/** Builds the WhatsApp link for ordering from a single product card. */
export function buildProductCardWhatsAppLink(options: {
  name: string;
  variantLabel: string;
  price: number;
  quantity?: number;
  summary?: string;
}): string {
  const message = buildProductCardWhatsAppMessage(options);
  return whatsappLink(message);
}
