// Static copy for the Contact Us page.
// Class strings live here in full so Tailwind can detect them.

import { SITE } from "@/constants/site";

export const CONTACT_TRUST_BADGES = [
  { icon: "verified", label: `FSSAI Lic: ${SITE.fssaiLicense}`, className: "text-botanical-forest" },
  { icon: "local_shipping", label: `Pan-India Free Delivery > ₹${SITE.freeShippingAbove}`, className: "text-spiced-tangerine" },
  { icon: "bolt", label: `${SITE.supportHours} WhatsApp Support`, className: "text-secondary" },
] as const;

export const INQUIRY_CATEGORIES = [
  "Product Inquiry",
  "Order Status",
  "Bulk / Corporate Gifting",
  "Wholesale Distribution",
  "Feedback & Suggestions",
] as const;

export type InquiryCategory = (typeof INQUIRY_CATEGORIES)[number];

export interface Faq {
  question: string;
  answer: string;
  /** Phrase inside `answer` rendered in bold */
  emphasis?: string;
}

export const FAQS: Faq[] = [
  {
    question: "How fresh are Crunchzilla products upon delivery?",
    answer:
      "All our staples—including traditional Gaya Tilkut, organic Katarni Chura, pure Chana Sattu, and Phool Makhana—are crafted and roasted in frequent small batches. We never stock warehoused inventory for months. Each package is hermetically sealed to preserve raw aroma, crunch, and authentic homemade taste right to your dining table.",
  },
  {
    question: "Do you deliver across all pincodes in India?",
    answer:
      `Yes, absolutely. We dispatch pan-India using premium express air courier networks (Bluedart, Delhivery, DTDC). Shipping is completely FREE on all orders above ₹${SITE.freeShippingAbove}. Metro deliveries typically arrive in 2–3 business days, with rest-of-India reaching within 4–5 business days.`,
    emphasis: `FREE on all orders above ₹${SITE.freeShippingAbove}`,
  },
  {
    question: "Can I place orders directly over WhatsApp?",
    answer:
      `Yes, many of our regular patrons prefer WhatsApp! Simply tap the WhatsApp button anywhere on our website, text our concierge (${SITE.phoneDisplay}), available ${SITE.supportHours}, with the items you desire and your delivery address. We will immediately confirm with a secure UPI / payment link and provide live dispatch tracking.`,
  },
  {
    question: "Are there any preservatives, palm oil, or added chemicals used?",
    answer:
      "Never. Our founding philosophy is 100% clean kitchen food. We do not use palm oil, hydrogenated fats, chemical preservatives, or synthetic flavor boosters. Every ingredient list reads like a traditional grandmother’s pantry list: slow-roasted seeds, pure organic sugarcane jaggery, whole chickpeas, and pure regional botanicals.",
  },
  {
    question: "What is your policy for damaged packages or replacements?",
    answer:
      `If your parcel arrives damaged or seal broken during courier transit, simply share a quick photograph with us over WhatsApp (${SITE.phoneDisplay}) or email within 48 hours. We dispatch an instant replacement batch at zero cost, no questions asked.`,
  },
];
