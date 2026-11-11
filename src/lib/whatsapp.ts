import { SITE } from "@/constants/site";

export interface OrderItem {
  name: string;
  variantLabel: string;
  price: number;
  quantity?: number;
}

/**
 * Returns a sanitized international phone number with digits only (no '+', spaces, or hyphens).
 */
export function getSanitizedWhatsAppNumber(phone?: string): string {
  const raw = phone || SITE.whatsappNumber;
  return raw.replace(/\D/g, "");
}

/**
 * Builds a standard WhatsApp click-to-chat URL using wa.me.
 * Strictly encodes the message with encodeURIComponent to support Android, iPhone, and Desktop.
 * Example format: https://wa.me/919448874640?text=ENCODED_MESSAGE
 */
export function whatsappLink(message?: string, phone?: string): string {
  const cleanNumber = getSanitizedWhatsAppNumber(phone);
  const base = `https://wa.me/${cleanNumber}`;
  if (!message || !message.trim()) {
    return base;
  }
  return `${base}?text=${encodeURIComponent(message.trim())}`;
}

/**
 * Builds a direct WhatsApp Web URL for desktop browsers as an alternative/fallback.
 */
export function whatsappWebLink(message?: string, phone?: string): string {
  const cleanNumber = getSanitizedWhatsAppNumber(phone);
  const base = `https://web.whatsapp.com/send?phone=${cleanNumber}`;
  if (!message || !message.trim()) {
    return base;
  }
  return `${base}&text=${encodeURIComponent(message.trim())}`;
}

/**
 * Formats a structured WhatsApp message strictly following the required order format.
 * Uses standard ASCII characters (e.g. 'Rs.' instead of '₹', '-' instead of '–', 'x' instead of '×')
 * to avoid Unicode decoding errors across various mobile WhatsApp app versions.
 */
export function buildWhatsAppOrderMessage(
  items: OrderItem[],
  totalOverride?: number,
  customerName?: string
): string {
  // Include only actual products added/selected by the customer with valid prices and quantities
  const validItems = (items || []).filter(
    (item) => typeof item.price === "number" && item.price > 0 && (item.quantity ?? 1) > 0
  );

  if (validItems.length === 0) {
    return [
      `Hello ${SITE.brandName},`,
      ``,
      `I would like to place an order for authentic food products from Bihar.`,
      `Please share your available products and pricing.`,
      ``,
      `Thank you!`,
    ].join("\n");
  }

  let calculatedTotal = 0;
  const itemLines = validItems.map((item, index) => {
    const qty = item.quantity && item.quantity > 0 ? item.quantity : 1;
    const subtotal = qty * item.price;
    calculatedTotal += subtotal;

    return `${index + 1}. ${item.name} (${item.variantLabel})\n   Quantity: ${qty} | Price: Rs. ${item.price} each | Subtotal: Rs. ${subtotal}`;
  });

  const finalTotal =
    typeof totalOverride === "number" && totalOverride > 0 ? totalOverride : calculatedTotal;

  const trimmedName = customerName?.trim();

  const lines = [
    `Hello ${SITE.brandName},`,
    ``,
    `I would like to place an order:`,
    ...(trimmedName ? [``, `Customer Name: ${trimmedName}`] : []),
    ``,
    `Order Details:`,
    ...itemLines,
    ``,
    `Total Order Amount: Rs. ${finalTotal}`,
    ``,
    `Please confirm my order and share delivery / payment details.`,
    ``,
    `Thank you!`,
  ];

  return lines.join("\n");
}

/** Builds the WhatsApp link with pre-filled cart order details. */
export function buildCartOrderWhatsAppLink(
  items: OrderItem[],
  total?: number,
  customerName?: string
): string {
  const message = buildWhatsAppOrderMessage(items, total, customerName);
  return whatsappLink(message);
}

/** Formats message for cart orders (alias for buildWhatsAppOrderMessage). */
export function buildCartOrderWhatsAppMessage(
  items: OrderItem[],
  total?: number,
  customerName?: string
): string {
  return buildWhatsAppOrderMessage(items, total, customerName);
}

/** Formats message for single product card orders (strictly that card only). */
export function buildProductCardWhatsAppMessage(options: {
  name: string;
  variantLabel: string;
  price: number;
  quantity?: number;
  customerName?: string;
}): string {
  return buildWhatsAppOrderMessage(
    [
      {
        name: options.name,
        variantLabel: options.variantLabel,
        price: options.price,
        quantity: options.quantity ?? 1,
      },
    ],
    undefined,
    options.customerName
  );
}

/** Builds the WhatsApp link for ordering from a single product card. */
export function buildProductCardWhatsAppLink(options: {
  name: string;
  variantLabel: string;
  price: number;
  quantity?: number;
  customerName?: string;
}): string {
  const message = buildProductCardWhatsAppMessage(options);
  return whatsappLink(message);
}
