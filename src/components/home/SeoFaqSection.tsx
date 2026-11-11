"use client";

import { useState } from "react";
import Icon from "@/components/common/Icon";
import WindowReveal from "@/components/common/WindowReveal";
import { cn } from "@/lib/utils";

interface FaqItem {
  id: string;
  question: string;
  answer: string;
  badge: string;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    id: "near-me-delivery",
    badge: "Nearby & Express Delivery",
    question: "Where can I buy authentic Katarni Chura, Tilkut, Sattu, and Makhana near me?",
    answer:
      "You can order authentic Gaya Tilkut, 100% Pure Chana Sattu, slow-roasted Mithila Makhana, and fragrant Katarni Chura directly from Crunchzilla.in. We offer superfast 1-hour express delivery in Bangalore and express 1-3 day courier delivery across Patna, Bihar, Delhi NCR, Mumbai, Kolkata, Pune, Hyderabad, and all across India.",
  },
  {
    id: "katarni-chura-spec",
    badge: "Katarni Chura (Bihar)",
    question: "What makes Crunchzilla's Katarni Chura from Bihar unique?",
    answer:
      "Our Katarni Chura is made from authentic GI-tagged heirloom Katarni paddy sourced directly from Bhagalpur, Bihar. Unlike heavily polished commercial poha, our Chura is naturally flattened without chemical bleaches. It is celebrated for its natural sweet aroma and tender soft crunch, making it the perfect pair for authentic Dahi-Chura, morning breakfast, or tea-time snacks.",
  },
  {
    id: "gaya-tilkut-fresh",
    badge: "Gaya Tilkut (Handmade)",
    question: "Is authentic Gaya Tilkut available fresh all year round?",
    answer:
      "Yes! Our traditional Karigars hand-pound fresh batches of Gaya Tilkut using slow-roasted white sesame seeds (til) and unrefined sugarcane jaggery (desi gud). Each box is packed in airtight, food-grade packaging to preserve its authentic melt-in-mouth crispness and winter aroma wherever you are.",
  },
  {
    id: "pure-chana-sattu",
    badge: "100% Pure Sattu",
    question: "How is Crunchzilla Chana Sattu roasted and prepared?",
    answer:
      "Crunchzilla Chana Sattu is prepared using 100% whole Bengal gram slow-roasted in traditional wood-fired sand and clay ovens. It is stone-ground fine, retaining 24g of natural plant protein and dietary fibre per 100g with zero adulteration, zero preservatives, and no added starch.",
  },
  {
    id: "whatsapp-ordering",
    badge: "Instant WhatsApp Order",
    question: "How do I order Tilkut, Sattu, Makhana, or Chura nearby on WhatsApp?",
    answer:
      "Ordering on WhatsApp is instant and effortless! Simply click the 'Order on WhatsApp' button on any product card or message our concierge at +91 9448874640 (Order Desk) or +91 7856019631 (Support). Specify your required weight (500g or 1kg) and delivery address for immediate order confirmation and live dispatch updates.",
  },
];

export default function SeoFaqSection() {
  const [openId, setOpenId] = useState<string | null>("near-me-delivery");

  const toggleFaq = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      aria-label="Frequently Asked Questions - Tilkut, Sattu, Makhana, and Katarni Chura Near You"
      className="w-full bg-surface-container-low py-16 md:py-24 border-t border-surface-container"
    >
      <div className="container-page">
        <WindowReveal type="section">
          <div className="mx-auto max-w-4xl">
            {/* Section Header */}
            <div className="text-center space-y-3 mb-10 sm:mb-12">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-golden-sand/90 border border-amber-900/10 px-4 py-1.5 text-label-xs font-bold uppercase tracking-wider text-primary shadow-xs">
                <Icon name="help" className="text-[15px]" />
                Frequently Asked Questions & Local Delivery
              </span>

              <h2 className="font-display text-headline-lg-mobile sm:text-headline-lg font-bold tracking-tight text-primary">
                Tilkut, Sattu, Makhana & Katarni Chura{" "}
                <span className="italic text-secondary">Near You</span>
              </h2>

              <p className="text-body-md text-on-surface-variant max-w-2xl mx-auto">
                Everything you need to know about ordering authentic Bihar heritage delicacies,
                same-day dispatch, and 1-hour fast delivery in Bangalore and across India.
              </p>
            </div>

            {/* Accordion List */}
            <div className="space-y-3.5">
              {FAQ_ITEMS.map((item) => {
                const isOpen = openId === item.id;
                return (
                  <div
                    key={item.id}
                    className="overflow-hidden rounded-2xl bg-pure-parchment border border-amber-900/10 shadow-premium-sm transition-all duration-300 hover:border-amber-900/20"
                  >
                    <button
                      type="button"
                      onClick={() => toggleFaq(item.id)}
                      aria-expanded={isOpen}
                      className="flex w-full items-center justify-between gap-4 p-5 sm:p-6 text-left transition-colors hover:bg-surface-container-low/50"
                    >
                      <div className="space-y-1">
                        <span className="inline-block rounded-md bg-surface-container px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary">
                          {item.badge}
                        </span>
                        <h3 className="font-display text-title-md sm:text-title-lg font-bold text-on-surface">
                          {item.question}
                        </h3>
                      </div>

                      <div
                        className={cn(
                          "flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-surface-container text-primary transition-transform duration-300",
                          isOpen && "rotate-180 bg-primary text-pure-parchment"
                        )}
                      >
                        <Icon name="expand_more" className="text-[20px]" />
                      </div>
                    </button>

                    {isOpen && (
                      <div className="border-t border-surface-container bg-surface-container-low/30 px-5 sm:px-6 py-4 animate-in fade-in-0 duration-200">
                        <p className="text-body-md text-on-surface-variant leading-relaxed">
                          {item.answer}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Local Delivery Footer Banner */}
            <div className="mt-8 rounded-2xl bg-gradient-to-r from-golden-sand/40 via-surface-container to-golden-sand/30 p-5 sm:p-6 border border-amber-900/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
              <div>
                <p className="font-display text-title-sm font-bold text-primary">
                  Need Fresh Chura, Tilkut, Sattu, or Makhana Delivered Nearby Today?
                </p>
                <p className="text-body-sm text-on-surface-variant mt-0.5">
                  Express 1-hour delivery in Bangalore. Reliable nationwide courier dispatch.
                </p>
              </div>

              <a
                href="https://wa.me/919448874640?text=Hi%20Crunchzilla%2C%20I%20want%20to%20order%20fresh%20Tilkut%2C%20Sattu%2C%20Makhana%2C%20and%20Katarni%20Chura%20near%20me."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] shrink-0 items-center justify-center gap-2 rounded-full bg-whatsapp-emerald px-6 py-2.5 text-label-sm font-bold text-pure-parchment shadow-premium-sm transition-all hover:bg-secondary active:scale-95 whitespace-nowrap"
              >
                <Icon name="chat" className="text-[17px]" />
                <span>WhatsApp Instant Order</span>
              </a>
            </div>
          </div>
        </WindowReveal>
      </div>
    </section>
  );
}
