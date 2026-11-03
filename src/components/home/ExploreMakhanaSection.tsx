"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Icon from "@/components/common/Icon";
import { IMAGES } from "@/constants/images";
import { SITE } from "@/constants/site";
import { useAddToCart } from "@/hooks/use-add-to-cart";
import { useCartStore } from "@/store/cart-store";
import { whatsappLink } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

interface MakhanaGrade {
  id: string;
  slug: string;
  title: string;
  gradeBadge: string;
  badgeTone: "amber" | "forest" | "terracotta";
  subtitle: string;
  description: string;
  kernelSize: string;
  purity: string;
  rating: number;
  reviewCount: number;
  image: string;
  imageAlt: string;
  variants: {
    id: string;
    label: string;
    weight: string;
    price: number;
    mrp: number;
  }[];
}

const MAKHANA_GRADES: MakhanaGrade[] = [
  {
    id: "grade-6hp",
    slug: "roasted-makhana",
    title: "Super Premium Makhana (6+ HP)",
    gradeBadge: "Jumbo 6+ HP",
    badgeTone: "amber",
    subtitle: "6-Suta Hand Picked • Top Tier Snacking",
    description:
      "The rarest jumbo lotus pops hand-graded above 20mm. Air-roasted in micro batches with zero palm oil. Fluffy, snow-white, and melt-in-the-mouth crisp.",
    kernelSize: "20–22mm+ Jumbo Diameter",
    purity: "0% Bitter Seeds • 100% Lotus Lily",
    rating: 5.0,
    reviewCount: 98,
    image: IMAGES.products.makhana,
    imageAlt: "Crunchzilla Super Premium 6+ HP Jumbo roasted Mithila Makhana foxnuts in rustic bowl",
    variants: [
      {
        id: "500g",
        label: "500g Pouch",
        weight: "500g",
        price: 800,
        mrp: 899,
      },
      {
        id: "1kg",
        label: "1kg Twin Pack",
        weight: "1kg",
        price: 1600,
        mrp: 1798,
      },
    ],
  },
  {
    id: "grade-5hp",
    slug: "roasted-makhana",
    title: "Premium Makhana (5+ HP)",
    gradeBadge: "Premium 5+ HP",
    badgeTone: "forest",
    subtitle: "5-Suta • Daily Roasted Superfood",
    description:
      "Ideal everyday wellness snack. Hand-graded 17–19mm kernels slow-roasted to golden crisp perfection, retaining natural magnesium, calcium, and plant protein.",
    kernelSize: "17–19mm Medium-Jumbo",
    purity: "Air Roasted • Zero Preservatives",
    rating: 4.9,
    reviewCount: 76,
    image: IMAGES.products.makhanaPackets,
    imageAlt: "Crunchzilla Premium 5+ HP daily roast Makhana packets and fresh roasted bowl",
    variants: [
      {
        id: "500g",
        label: "500g Pouch",
        weight: "500g",
        price: 700,
        mrp: 799,
      },
      {
        id: "1kg",
        label: "1kg Twin Pack",
        weight: "1kg",
        price: 1350,
        mrp: 1598,
      },
    ],
  },
  {
    id: "grade-4hp",
    slug: "roasted-makhana",
    title: "Normal Makhana (4+ HP)",
    gradeBadge: "Normal 4+ HP",
    badgeTone: "terracotta",
    subtitle: "4-Suta • Kitchen & Fasting Grade",
    description:
      "The traditional Mithila home culinary staple. Uniform 14–16mm pops curated specifically for rich makhana kheer, fasting (vrat) snacks, and aromatic curries.",
    kernelSize: "14–16mm Traditional Size",
    purity: "Culinary & Kheer Special",
    rating: 4.8,
    reviewCount: 54,
    image: IMAGES.hero.makhanaChai,
    imageAlt: "Crunchzilla 4+ HP Normal culinary Makhana paired with traditional Indian tea",
    variants: [
      {
        id: "500g",
        label: "500g Pouch",
        weight: "500g",
        price: 550,
        mrp: 649,
      },
      {
        id: "1kg",
        label: "1kg Twin Pack",
        weight: "1kg",
        price: 1050,
        mrp: 1298,
      },
    ],
  },
];

const BADGE_COLOR_MAP = {
  amber: "bg-warm-amber text-pure-parchment border-warm-amber/30",
  forest: "bg-botanical-forest text-pure-parchment border-botanical-forest/30",
  terracotta: "bg-roasted-terracotta text-pure-parchment border-roasted-terracotta/30",
};

export default function ExploreMakhanaSection() {
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({
    "grade-6hp": "500g",
    "grade-5hp": "500g",
    "grade-4hp": "500g",
  });

  const addToCart = useAddToCart();
  const cartItems = useCartStore((s) => s.items);

  const handleVariantChange = (gradeId: string, variantId: string) => {
    setSelectedVariants((prev) => ({ ...prev, [gradeId]: variantId }));
  };

  return (
    <section
      id="explore-makhana"
      aria-label="Explore Makhana Categories"
      className="w-full scroll-mt-header bg-gradient-to-b from-[#F7F4EE] via-[#FAF7F2] to-surface py-16 sm:py-20 md:py-24 border-b border-surface-container"
    >
      <div className="container-page">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center space-y-3 mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 rounded-full bg-golden-sand/90 border border-amber-900/10 px-4 py-1.5 shadow-xs">
            <Icon name="verified" className="text-[17px] text-whatsapp-emerald" />
            <span className="text-label-sm font-bold uppercase tracking-wider text-primary">
              Direct Mithila Farm Craft
            </span>
          </div>

          <h2 className="font-display text-headline-lg-mobile sm:text-headline-lg md:text-display font-bold tracking-tight text-primary">
            Explore Makhana
          </h2>

          <p className="text-body-md sm:text-body-lg text-on-surface-variant max-w-2xl mx-auto leading-relaxed">
            Every lotus pop is sorted using the authentic Mithila Hand-Picked (HP) classification.
            Choose the perfect harvest grade for snacking, family wellness, or festive cooking.
          </p>
        </div>

        {/* 3 Makhana Grade Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {MAKHANA_GRADES.map((grade) => {
            const activeVariantId = selectedVariants[grade.id] || grade.variants[0].id;
            const activeVariant =
              grade.variants.find((v) => v.id === activeVariantId) || grade.variants[0];

            const savings = activeVariant.mrp - activeVariant.price;
            const savingsPercent = Math.round((savings / activeVariant.mrp) * 100);

            // Check if this specific grade variant is already in cart
            const isInCart = cartItems.some(
              (i) => i.slug === grade.slug && i.variantId === `${grade.id}-${activeVariant.id}`
            );

            const handleCardAddToCart = () => {
              addToCart({
                slug: grade.slug,
                name: grade.title,
                price: activeVariant.price,
                variantId: `${grade.id}-${activeVariant.id}`,
                variantLabel: activeVariant.label,
                image: grade.image,
              });
            };

            const whatsappOrderText = `Hi ${SITE.name}, I would like to order ${grade.title} (${activeVariant.label}) for Rs. ${activeVariant.price}.`;

            return (
              <article
                key={grade.id}
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl bg-pure-parchment border border-amber-900/10 shadow-premium-sm transition-all duration-300 hover:shadow-premium-hover hover:-translate-y-1.5"
              >
                {/* Visual Image Stage */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-surface-container-low">
                  <Link
                    href={`/shop/${grade.slug}`}
                    aria-label={`View ${grade.title} details`}
                    className="block h-full w-full"
                  >
                    <Image
                      src={grade.image}
                      alt={grade.imageAlt}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  </Link>

                  {/* Gradient overlay for text contrast */}
                  <div
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60"
                    aria-hidden="true"
                  />

                  {/* Top Grade Badge */}
                  <div className="absolute top-3 left-3 z-10">
                    <span
                      className={cn(
                        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-label-xs font-bold uppercase tracking-wider shadow-sm border",
                        BADGE_COLOR_MAP[grade.badgeTone]
                      )}
                    >
                      <Icon name="stars" className="text-[14px]" />
                      {grade.gradeBadge}
                    </span>
                  </div>

                  {/* Star Rating Badge */}
                  <div className="absolute top-3 right-3 z-10 flex items-center gap-1 rounded-full bg-pure-parchment/95 px-2.5 py-1 text-label-xs font-bold text-on-surface shadow-xs backdrop-blur-md border border-amber-900/10">
                    <Icon name="star" filled className="text-[14px] text-warm-amber" />
                    <span>{grade.rating.toFixed(1)}</span>
                    <span className="text-on-surface-variant font-normal">({grade.reviewCount})</span>
                  </div>

                  {/* Bottom specs preview */}
                  <div className="absolute bottom-2.5 left-3 right-3 z-10 text-pure-parchment text-label-xs font-medium drop-shadow-sm flex items-center justify-between">
                    <span>{grade.kernelSize}</span>
                    <span>Air Roasted</span>
                  </div>
                </div>

                {/* Card Content & Details */}
                <div className="flex flex-1 flex-col justify-between p-5 sm:p-6 space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-display text-title-lg font-bold text-primary group-hover:text-secondary transition-colors">
                        <Link href={`/shop/${grade.slug}`} className="hover:underline">
                          {grade.title}
                        </Link>
                      </h3>
                    </div>

                    <p className="text-label-xs uppercase tracking-wider font-semibold text-roasted-terracotta">
                      {grade.subtitle}
                    </p>

                    <p className="text-body-sm text-on-surface-variant leading-relaxed line-clamp-3">
                      {grade.description}
                    </p>

                    {/* Quick Specs Pill Badges */}
                    <div className="pt-2 flex flex-wrap gap-1.5">
                      <span className="inline-flex items-center gap-1 rounded-md bg-surface-container px-2.5 py-1 text-label-xs text-on-surface-variant">
                        <Icon name="straighten" className="text-[13px] text-primary" />
                        {grade.kernelSize}
                      </span>
                      <span className="inline-flex items-center gap-1 rounded-md bg-surface-container px-2.5 py-1 text-label-xs text-on-surface-variant">
                        <Icon name="check_circle" className="text-[13px] text-whatsapp-emerald" />
                        {grade.purity}
                      </span>
                    </div>
                  </div>

                  {/* Pricing and Variant Switcher */}
                  <div className="space-y-3 pt-3 border-t border-surface-container">
                    {/* Price display with MRP and discount */}
                    <div className="flex items-baseline justify-between">
                      <div className="flex items-baseline gap-2">
                        <span className="font-display text-headline-sm font-bold text-primary">
                          ₹{activeVariant.price}
                        </span>
                        {activeVariant.mrp > activeVariant.price && (
                          <span className="text-body-sm text-on-surface-variant line-through">
                            ₹{activeVariant.mrp}
                          </span>
                        )}
                      </div>

                      {savings > 0 && (
                        <span className="rounded-full bg-botanical-forest/10 border border-botanical-forest/20 px-2 py-0.5 text-label-xs font-bold text-botanical-forest">
                          Save ₹{savings} ({savingsPercent}% OFF)
                        </span>
                      )}
                    </div>

                    {/* Variant Pills Selector */}
                    <div className="flex items-center gap-2">
                      <span className="text-label-xs font-semibold uppercase tracking-wider text-on-surface-variant">
                        Pack Size:
                      </span>
                      <div className="flex flex-wrap gap-1.5" role="radiogroup" aria-label="Select pack size">
                        {grade.variants.map((v) => {
                          const isSelected = v.id === activeVariant.id;
                          return (
                            <button
                              key={v.id}
                              type="button"
                              role="radio"
                              aria-checked={isSelected}
                              onClick={() => handleVariantChange(grade.id, v.id)}
                              className={cn(
                                "flex min-h-[38px] items-center justify-center rounded-full px-3 py-1.5 text-label-xs transition-all active:scale-95",
                                isSelected
                                  ? "bg-primary font-bold text-pure-parchment shadow-xs"
                                  : "bg-surface-container text-on-surface hover:bg-surface-container-high"
                              )}
                            >
                              {v.label} • ₹{v.price}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Action Buttons: Add to Cart + WhatsApp */}
                    <div className="grid grid-cols-2 gap-2 pt-2">
                      <button
                        type="button"
                        onClick={handleCardAddToCart}
                        className={cn(
                          "flex min-h-[44px] items-center justify-center gap-1.5 rounded-full px-4 py-2.5 text-label-sm font-bold transition-all duration-200 active:scale-95",
                          isInCart
                            ? "bg-botanical-forest text-pure-parchment shadow-xs"
                            : "bg-roasted-terracotta text-pure-parchment shadow-premium-sm hover:bg-primary hover:shadow-premium-hover"
                        )}
                        aria-label={`Add ${grade.title} ${activeVariant.label} to cart`}
                      >
                        <Icon name={isInCart ? "check" : "shopping_bag"} className="text-[17px]" />
                        <span>{isInCart ? "Added ✓" : "Add to Cart"}</span>
                      </button>

                      <a
                        href={whatsappLink(whatsappOrderText)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex min-h-[44px] items-center justify-center gap-1.5 rounded-full bg-whatsapp-emerald px-4 py-2.5 text-label-sm font-bold text-pure-parchment shadow-premium-sm transition-all duration-200 hover:bg-secondary hover:shadow-premium-hover active:scale-95"
                        aria-label={`Order ${grade.title} directly via WhatsApp`}
                      >
                        <Icon name="chat" className="text-[17px]" />
                        <span>WhatsApp</span>
                      </a>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Informative Mithila Mandi HP Grading Guide */}
        <div className="mt-12 sm:mt-16 rounded-2xl bg-pure-parchment p-6 sm:p-8 border border-amber-900/10 shadow-premium-sm">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-golden-sand/90 text-primary">
                <Icon name="info" className="text-[24px]" />
              </div>
              <div>
                <h4 className="font-display text-title-md font-bold text-primary">
                  What Does the &ldquo;HP&rdquo; Grading Mean?
                </h4>
                <p className="text-body-sm text-on-surface-variant">
                  &ldquo;HP&rdquo; stands for <strong>Hand Picked</strong> (traditionally measured in Suta). It certifies diameter, density, and puff uniformity.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full md:w-auto">
              <div className="rounded-xl bg-surface-container-low p-3 text-center border border-amber-900/5">
                <span className="block text-label-xs font-bold text-primary uppercase">6+ HP</span>
                <span className="text-body-xs text-on-surface-variant">20–22mm • Snacking Jumbo</span>
              </div>
              <div className="rounded-xl bg-surface-container-low p-3 text-center border border-amber-900/5">
                <span className="block text-label-xs font-bold text-primary uppercase">5+ HP</span>
                <span className="text-body-xs text-on-surface-variant">17–19mm • Daily Wellness</span>
              </div>
              <div className="rounded-xl bg-surface-container-low p-3 text-center border border-amber-900/5">
                <span className="block text-label-xs font-bold text-primary uppercase">4+ HP</span>
                <span className="text-body-xs text-on-surface-variant">14–16mm • Kheer & Vrat</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
