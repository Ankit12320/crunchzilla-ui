"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import Icon from "@/components/common/Icon";
import CatalogProductCard from "@/components/shop/CatalogProductCard";
import { IMAGES } from "@/constants/images";
import { PRIMARY_BADGE_STYLES, SECONDARY_BADGE_STYLES } from "@/constants/shop";
import { SITE } from "@/constants/site";
import { useAddToCart } from "@/hooks/use-add-to-cart";
import { cn } from "@/lib/utils";
import { buildProductCardWhatsAppLink } from "@/lib/whatsapp";
import type { CatalogProduct } from "@/types/catalog";

const PRODUCT_HERITAGE_INFO: Record<
  string,
  {
    origin: string;
    tradition: string;
    nutrition: string[];
    storage: string;
    ingredients: string;
  }
> = {
  "gaya-tilkut": {
    origin: "Gaya, Southern Bihar",
    tradition:
      "Crafted by traditional Karigars of Gaya through hand-pounding slow-roasted white sesame seeds and pure unrefined sugarcane molasses. Renowned for Makar Sankranti and winter festivities.",
    nutrition: [
      "Rich in dietary calcium and healthy sesamin lignans",
      "Natural iron and minerals from unrefined sugarcane gud",
      "Warming winter superfood supporting bone and joint health",
    ],
    storage: "Store in a dry, airtight container away from direct sunlight and humidity. Shelf life: 90 days.",
    ingredients: "White Sesame Seeds (Til), Pure Sugarcane Jaggery (Gud), Cardamom.",
  },
  "roasted-makhana": {
    origin: "Mithila Wetland Belt (Darbhanga & Madhubani), North Bihar",
    tradition:
      "Naturally harvested foxnuts grown in pristine ponds of Mithila, popped and gently air-roasted in small batches with zero palm oil. An age-old fasting and wellness staple.",
    nutrition: [
      "16g natural plant protein per 100g",
      "Low glycemic index, rich in magnesium and potassium",
      "Completely gluten-free, cholesterol-free, and light on digestion",
    ],
    storage: "Keep in a cool, airtight container to maintain crispness. Shelf life: 6 months.",
    ingredients: "100% Jumbo Grade Lotus Seeds (Phool Makhana).",
  },
  "chana-sattu": {
    origin: "Traditional Wood-Fired Clay Ovens of Bihar",
    tradition:
      "Selected whole Bengal gram slow-roasted over burning wood and sand kilns, ground gently into fine golden flour. Bihar’s beloved powerhouse breakfast and natural cooler.",
    nutrition: [
      "24g high-bioavailability protein per 100g",
      "Packed with dietary fibre for lasting satiety and gut health",
      "Ideal for pre-workout drink, Litti Chokha stuffing, or Sattu Sharbat",
    ],
    storage: "Store in an airtight container in a dry pantry. Shelf life: 4 months.",
    ingredients: "100% Slow-Roasted Bengal Gram (Chana).",
  },
  "katarni-chura": {
    origin: "Bhagalpur & Banka, Eastern Bihar",
    tradition:
      "Geographical Indication (GI) tagged heirloom short-grain aromatic rice, parboiled gently and flattened using traditional stone rollers. Essential for authentic Dahi-Chura.",
    nutrition: [
      "Natural heirloom aroma with zero artificial fragrance",
      "Light, easily digestible complex carbohydrates",
      "High natural iron content from traditional flattening process",
    ],
    storage: "Keep in a cool, moisture-free container. Shelf life: 6 months.",
    ingredients: "100% GI-Tagged Katarni Paddy Rice Flakes.",
  },
  "basmati-poha": {
    origin: "Eastern Plains of Bihar",
    tradition:
      "Long-grain fragrant rice flakes, pressed thinly to soak flavours effortlessly while maintaining a delicate, non-mushy texture for quick, wholesome morning meals.",
    nutrition: [
      "Low fat, easily digestible quick energy",
      "Zero polished starch or artificial whiteners",
      "Rich in vitamin B and essential iron",
    ],
    storage: "Store in an airtight jar in a cool pantry. Shelf life: 6 months.",
    ingredients: "100% Basmati Paddy Rice Flakes.",
  },
  "jaggery-cubes": {
    origin: "Sugarcane Belt of Rural Bihar",
    tradition:
      "Freshly extracted sugarcane juice clarified using natural plant mucilage (Deola bark) without sulphur, chemical bleaching, or artificial hardeners. Cut into convenient daily cubes.",
    nutrition: [
      "Rich in natural iron, potassium, and magnesium",
      "Aids post-meal digestion and natural body cleansing",
      "Unrefined healthy replacement for refined white sugar",
    ],
    storage: "Store in an airtight container in a cool, dry place. Shelf life: 9 months.",
    ingredients: "100% Unrefined Sugarcane Juice (Gud).",
  },
};

const DEFAULT_PRODUCT_GALLERIES: Record<string, string[]> = {
  "gaya-tilkut": [
    "/images/hero/tilkut-hero.gif",
    "/images/products/tilkut-stack-boxes.jpg",
    "/images/products/tilkut-box-packs.jpg",
    "/images/products/tilkut-hamper-collection.jpg",
    "/images/products/tilkut-delivery-boxes.jpg",
    "/images/products/tilkut.jpg",
  ],
  "roasted-makhana": [
    "/images/products/makhana.jpg",
    "/images/products/makhana-packets-bowl.jpg",
    "/images/hero/makhana-chai.jpg",
  ],
};

export default function ProductDetailView({
  product,
  relatedProducts,
}: {
  product: CatalogProduct;
  relatedProducts: CatalogProduct[];
}) {
  const [variantId, setVariantId] = useState(product.variants[0].id);
  const [activeTab, setActiveTab] = useState<"heritage" | "nutrition" | "delivery">("heritage");
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const addToCart = useAddToCart();

  const variant = product.variants.find((v) => v.id === variantId) ?? product.variants[0];
  const heritage = PRODUCT_HERITAGE_INFO[product.slug] ?? {
    origin: "Bihar, India",
    tradition: product.description,
    nutrition: ["100% Natural, zero artificial preservatives", "Wholesome traditional staple"],
    storage: "Store in a cool, dry, airtight container.",
    ingredients: product.name,
  };

  const rawImageList =
    product.images && product.images.length > 0
      ? product.images
      : DEFAULT_PRODUCT_GALLERIES[product.slug] ?? [IMAGES.catalog[product.image]];

  const getProductImageAlt = (slug: string, idx: number, fallback: string) => {
    if (idx === 0) return fallback;
    if (slug === "gaya-tilkut") {
      const tilkutAlts = [
        fallback,
        "Fresh handcrafted Gaya Tilkut discs stacked in packaging with Crunchzilla delivery boxes",
        "Crunchzilla Made To Be Loved gift box with pure Gud Tilkut and Black Sesame Tilkut pouches",
        "Crunchzilla traditional festival hamper with Gaya Tilkut, Makhana, Sattu, Chura, and Desi Gud",
        "Crunchzilla secure tamper-proof delivery boxes for express shipping across India",
        "Authentic Gaya Tilkut golden sesame discs close-up",
      ];
      return tilkutAlts[idx] ?? `${product.name} - View ${idx + 1}`;
    }
    if (slug === "roasted-makhana") {
      const makhanaAlts = [
        fallback,
        "Crunchzilla Artisanal Roasted Makhana premium harvest pouches and fresh pops in bowl",
        "Makhana foxnuts served alongside hot Indian spiced chai",
      ];
      return makhanaAlts[idx] ?? `${product.name} - View ${idx + 1}`;
    }
    return `${product.name} - View ${idx + 1}`;
  };

  const galleryImages: { src: string; alt: string }[] = rawImageList.map((src, idx) => ({
    src,
    alt: getProductImageAlt(product.slug, idx, product.imageAlt),
  }));

  const currentImage = galleryImages[selectedImageIndex] ?? galleryImages[0];

  const handlePrevImage = () => {
    setSelectedImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  const handleNextImage = () => {
    setSelectedImageIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        handleNextImage();
      } else {
        handlePrevImage();
      }
    }
    touchStartX.current = null;
  };

  const discountPercent =
    variant.mrp && variant.mrp > variant.price
      ? Math.round(((variant.mrp - variant.price) / variant.mrp) * 100)
      : null;

  return (
    <div className="w-full bg-surface pb-16">
      {/* Breadcrumb Navigation */}
      <nav
        aria-label="Breadcrumb"
        className="border-b border-surface-container bg-surface-container-low py-3"
      >
        <div className="container-page flex flex-wrap items-center gap-2 text-label-md text-on-surface-variant">
          <Link href="/" className="transition-colors hover:text-primary">
            Home
          </Link>
          <span className="opacity-40">/</span>
          <Link href="/shop" className="transition-colors hover:text-primary">
            Shop All
          </Link>
          <span className="opacity-40">/</span>
          <span aria-current="page" className="font-semibold text-primary truncate max-w-xs">
            {product.name}
          </span>
        </div>
      </nav>

      {/* Main Product Showcase */}
      <section className="container-page py-10 lg:py-16">
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-14">
          {/* Left: Image Gallery / Stage */}
          <div className="lg:col-span-6">
            <div
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              className="group relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-surface-container-low shadow-md select-none"
            >
              {/* Blurred Ambient Background for seamless fill across portrait/landscape ratios */}
              <div
                className="absolute inset-0 bg-cover bg-center blur-2xl opacity-20 scale-110 pointer-events-none"
                style={{ backgroundImage: `url(${currentImage.src})` }}
                aria-hidden="true"
              />
              <Image
                key={currentImage.src}
                src={currentImage.src}
                alt={currentImage.alt}
                fill
                priority={selectedImageIndex === 0}
                unoptimized={currentImage.src.endsWith(".gif")}
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="relative z-1 object-contain transition-transform duration-500 ease-out group-hover:scale-105"
              />

              {/* Badges */}
              <div className="pointer-events-none absolute top-4 left-4 flex flex-col items-start gap-2 z-10">
                <span
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-full px-3.5 py-1 text-label-md font-semibold shadow-sm backdrop-blur-md",
                    PRIMARY_BADGE_STYLES[product.primaryBadge.tone]
                  )}
                >
                  <Icon name={product.primaryBadge.icon} className="text-[16px]" />
                  {product.primaryBadge.label}
                </span>
                <span
                  className={cn(
                    "inline-flex items-center rounded-full px-3 py-1 text-label-sm font-medium",
                    SECONDARY_BADGE_STYLES[product.secondaryBadge.tone]
                  )}
                >
                  {product.secondaryBadge.label}
                </span>
              </div>

              {/* Counter Indicator (when multiple images) */}
              {galleryImages.length > 1 && (
                <div className="absolute top-4 right-4 z-10 rounded-full bg-black/60 px-3 py-1 text-label-xs font-semibold text-pure-parchment backdrop-blur-md">
                  {selectedImageIndex + 1} / {galleryImages.length}
                </div>
              )}

              {/* Prev / Next Chevrons (when multiple images) */}
              {galleryImages.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={handlePrevImage}
                    aria-label="Previous image"
                    className="absolute left-3 top-1/2 z-10 -translate-y-1/2 flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-black/45 text-white shadow-md backdrop-blur-xs transition-all duration-200 hover:bg-black/75 hover:scale-110 active:scale-95"
                  >
                    <Icon name="chevron_left" className="text-[24px]" />
                  </button>
                  <button
                    type="button"
                    onClick={handleNextImage}
                    aria-label="Next image"
                    className="absolute right-3 top-1/2 z-10 -translate-y-1/2 flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-black/45 text-white shadow-md backdrop-blur-xs transition-all duration-200 hover:bg-black/75 hover:scale-110 active:scale-95"
                  >
                    <Icon name="chevron_right" className="text-[24px]" />
                  </button>
                </>
              )}

              {/* Highlight Ribbon */}
              <div className="pointer-events-none absolute right-4 bottom-4 left-4 flex items-center justify-between rounded-xl bg-surface/95 px-4 py-2.5 shadow-md backdrop-blur-md z-10">
                <span className="text-label-md font-bold uppercase tracking-wider text-roasted-terracotta">
                  {product.highlight.left}
                </span>
                <span className="text-label-md font-bold text-secondary">
                  {product.highlight.right}
                </span>
              </div>
            </div>

            {/* Scrollable Thumbnail Strip (when multiple images) */}
            {galleryImages.length > 1 && (
              <div className="mt-3.5 flex items-center gap-3 overflow-x-auto pb-1 scrollbar-none snap-x">
                {galleryImages.map((img, idx) => (
                  <button
                    key={img.src}
                    type="button"
                    onClick={() => setSelectedImageIndex(idx)}
                    aria-label={`View image ${idx + 1}`}
                    className={cn(
                      "relative h-16 w-20 sm:h-18 sm:w-24 shrink-0 overflow-hidden rounded-xl border-2 transition-all duration-200 snap-start focus:outline-hidden",
                      selectedImageIndex === idx
                        ? "border-primary ring-2 ring-primary/40 shadow-md scale-[1.02]"
                        : "border-transparent opacity-65 hover:opacity-100 hover:border-surface-container-high"
                    )}
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      unoptimized={img.src.endsWith(".gif")}
                      sizes="96px"
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Trust Points */}
            <div className="mt-6 grid grid-cols-3 gap-3">
              <div className="flex flex-col items-center rounded-xl bg-surface-container-low p-3 text-center">
                <Icon name="verified" className="text-[22px] text-botanical-forest" />
                <span className="mt-1 text-label-sm font-bold text-on-surface">100% Authentic</span>
                <span className="text-[11px] text-on-surface-variant">{heritage.origin}</span>
              </div>
              <div className="flex flex-col items-center rounded-xl bg-surface-container-low p-3 text-center">
                <Icon name="local_shipping" className="text-[22px] text-spiced-tangerine" />
                <span className="mt-1 text-label-sm font-bold text-on-surface">Express Delivery</span>
                <span className="text-[11px] text-on-surface-variant">Bangalore & Pan-India</span>
              </div>
              <div className="flex flex-col items-center rounded-xl bg-surface-container-low p-3 text-center">
                <Icon name="eco" className="text-[22px] text-secondary" />
                <span className="mt-1 text-label-sm font-bold text-on-surface">Zero Palm Oil</span>
                <span className="text-[11px] text-on-surface-variant">Chemical-Free</span>
              </div>
            </div>
          </div>

          {/* Right: Product Details & Purchase Form */}
          <div className="flex flex-col space-y-6 lg:col-span-6">
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-label-sm font-bold uppercase tracking-wider text-secondary">
                  {product.eyebrow} • {heritage.origin}
                </span>
                <div className="flex items-center gap-1.5 rounded-full bg-golden-sand/40 px-3 py-1 text-warm-amber">
                  <Icon name="star" filled className="text-[16px]" />
                  <span className="text-label-md font-bold text-on-surface">
                    {product.rating.toFixed(1)}
                  </span>
                  <span className="text-label-sm text-on-surface-variant">
                    ({product.reviewCount} Verified Patron Reviews)
                  </span>
                </div>
              </div>

              <h1 className="mt-2 font-display text-headline-lg-mobile font-bold tracking-tight text-on-surface md:text-headline-lg">
                {product.name}
              </h1>

              <p className="mt-3 text-body-lg text-on-surface-variant leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Variant Selector */}
            <div className="space-y-3 rounded-xl bg-surface-container-lowest p-5 shadow-sm border border-outline-variant/30">
              <div className="flex items-center justify-between">
                <span className="text-label-md font-bold uppercase tracking-wider text-on-surface">
                  {product.variantLabel}
                </span>
                <span className="text-label-sm text-botanical-forest font-semibold">
                  ✓ Fresh Batch In Stock
                </span>
              </div>

              <div
                className="flex flex-wrap items-center gap-2.5"
                role="radiogroup"
                aria-label={product.variantLabel}
              >
                {product.variants.map((v) => {
                  const selected = v.id === variant.id;
                  return (
                    <button
                      key={v.id}
                      type="button"
                      role="radio"
                      aria-checked={selected}
                      onClick={() => setVariantId(v.id)}
                      className={cn(
                        "flex min-h-[44px] items-center justify-center rounded-full px-5 py-2 text-label-md font-semibold transition-all active:scale-95 whitespace-nowrap",
                        selected
                          ? "bg-roasted-terracotta text-pure-parchment shadow-md ring-2 ring-roasted-terracotta ring-offset-2"
                          : "bg-surface-container text-on-surface-variant hover:bg-surface-variant"
                      )}
                    >
                      {v.label} — ₹{v.price}
                    </button>
                  );
                })}
              </div>

              {/* Price display */}
              <div className="pt-2 flex items-baseline gap-3">
                <span className="font-display text-display-mobile font-bold text-primary md:text-display-sm">
                  ₹{variant.price}
                </span>
                {variant.mrp && (
                  <>
                    <span className="text-title-md text-on-surface-variant line-through">
                      ₹{variant.mrp}
                    </span>
                    {discountPercent && (
                      <span className="rounded-full bg-golden-sand px-2.5 py-0.5 text-label-sm font-bold text-primary">
                        {discountPercent}% OFF
                      </span>
                    )}
                  </>
                )}
                <span className="text-label-sm text-on-surface-variant">(Inclusive of all taxes)</span>
              </div>
            </div>

            {/* Symmetrical Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
              <button
                type="button"
                onClick={() =>
                  addToCart({
                    slug: product.slug,
                    name: product.name,
                    price: variant.price,
                    variantId: variant.id,
                    variantLabel: variant.label,
                    image: galleryImages[0].src,
                  })
                }
                className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-roasted-terracotta px-6 text-label-lg font-bold text-pure-parchment shadow-md transition-all hover:bg-primary active:scale-[0.98]"
              >
                <Icon name="shopping_bag" className="text-[20px]" />
                <span>Add to Shopping Cart</span>
              </button>

              <a
                href={buildProductCardWhatsAppLink({
                  name: product.name,
                  variantLabel: variant.label,
                  price: variant.price,
                })}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Order ${product.name} directly on WhatsApp`}
                className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-whatsapp-emerald px-6 text-label-lg font-bold text-pure-parchment shadow-md transition-all hover:opacity-95 active:scale-[0.98]"
              >
                <Icon name="chat" className="text-[20px]" />
                <span>Order on WhatsApp</span>
              </a>
            </div>

            <p className="text-center text-label-sm text-on-surface-variant">
              ⚡ Free shipping across India on orders above ₹{SITE.freeShippingAbove} • Express dispatch within 24 hours
            </p>

            {/* Detailed Tabs Section */}
            <div className="pt-4 border-t border-outline-variant/30">
              <div
                className="no-scrollbar touch-scroll-x flex border-b border-surface-container gap-4 sm:gap-6 overflow-x-auto pb-0.5"
                role="tablist"
              >
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeTab === "heritage"}
                  onClick={() => setActiveTab("heritage")}
                  className={cn(
                    "flex min-h-[44px] items-center pb-3 text-label-md font-bold transition-colors border-b-2 whitespace-nowrap shrink-0",
                    activeTab === "heritage"
                      ? "border-primary text-primary"
                      : "border-transparent text-on-surface-variant hover:text-on-surface"
                  )}
                >
                  Heritage &amp; Recipe
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeTab === "nutrition"}
                  onClick={() => setActiveTab("nutrition")}
                  className={cn(
                    "flex min-h-[44px] items-center pb-3 text-label-md font-bold transition-colors border-b-2 whitespace-nowrap shrink-0",
                    activeTab === "nutrition"
                      ? "border-primary text-primary"
                      : "border-transparent text-on-surface-variant hover:text-on-surface"
                  )}
                >
                  Health &amp; Nutrition
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeTab === "delivery"}
                  onClick={() => setActiveTab("delivery")}
                  className={cn(
                    "flex min-h-[44px] items-center pb-3 text-label-md font-bold transition-colors border-b-2 whitespace-nowrap shrink-0",
                    activeTab === "delivery"
                      ? "border-primary text-primary"
                      : "border-transparent text-on-surface-variant hover:text-on-surface"
                  )}
                >
                  Shipping &amp; Storage
                </button>
              </div>

              <div className="pt-4 text-body-md text-on-surface-variant">
                {activeTab === "heritage" && (
                  <div className="space-y-3">
                    <p>{heritage.tradition}</p>
                    <p>
                      <strong>Ingredients:</strong> {heritage.ingredients}
                    </p>
                    <p>
                      <strong>Craft Standard:</strong> Zero chemical preservatives, zero palm oil, authentic stone-ground or slow-roasted method.
                    </p>
                  </div>
                )}

                {activeTab === "nutrition" && (
                  <ul className="space-y-2 list-disc pl-5">
                    {heritage.nutrition.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                )}

                {activeTab === "delivery" && (
                  <div className="space-y-2">
                    <p>
                      <strong>Storage:</strong> {heritage.storage}
                    </p>
                    <p>
                      <strong>Delivery to Bangalore &amp; South India:</strong> Dispatched via air express. Arrives within 2–3 business days across Bengaluru.
                    </p>
                    <p>
                      <strong>Bihar &amp; Rest of India:</strong> Direct dispatch from regional hubs in Bihar and Karnataka.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products from Bihar */}
      {relatedProducts.length > 0 && (
        <section className="border-t border-surface-container bg-surface-container-low py-12 lg:py-16">
          <div className="container-page">
            <div className="mb-8 flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
              <div>
                <span className="text-label-sm font-bold uppercase tracking-widest text-primary">
                  More Traditional Staples
                </span>
                <h2 className="font-display text-headline-md font-bold text-on-surface">
                  You May Also Love
                </h2>
              </div>
              <Link
                href="/shop"
                className="text-label-md font-bold text-primary hover:underline"
              >
                View Complete Shop Catalog →
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedProducts.slice(0, 3).map((item) => (
                <CatalogProductCard key={item.slug} product={item} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

