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
import type { CatalogProduct } from "@/types/catalog";

interface ProductQuickViewModalProps {
  product: CatalogProduct | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProductQuickViewModal({
  product,
  isOpen,
  onClose,
}: ProductQuickViewModalProps) {
  const [selectedVariantId, setSelectedVariantId] = useState<string>("");
  const addToCart = useAddToCart();
  const cartItems = useCartStore((s) => s.items);

  if (!isOpen || !product) return null;

  const activeVariantId = selectedVariantId || product.variants[0]?.id;
  const activeVariant =
    product.variants.find((v) => v.id === activeVariantId) ||
    product.variants[0];

  const imageSrc = IMAGES.catalog[product.image];
  const isInCart = cartItems.some(
    (i) => i.slug === product.slug && i.variantId === activeVariant.id
  );

  const savings =
    activeVariant.mrp && activeVariant.mrp > activeVariant.price
      ? activeVariant.mrp - activeVariant.price
      : 0;

  const handleAddToCart = () => {
    addToCart({
      slug: product.slug,
      name: product.name,
      price: activeVariant.price,
      variantId: activeVariant.id,
      variantLabel: activeVariant.label,
      image: imageSrc,
    });
  };

  const whatsappMessage = `Hi ${SITE.name}, I would like to order ${product.name} (${activeVariant.label}) for Rs. ${activeVariant.price}.`;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="quick-view-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto"
    >
      {/* Smooth Backdrop Blur */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/45 backdrop-blur-md transition-opacity duration-300 animate-in fade-in-0"
        aria-hidden="true"
      />

      {/* Elegant Desktop Window Frame Container */}
      <div className="relative w-full max-w-3xl overflow-hidden rounded-2xl sm:rounded-3xl bg-pure-parchment border border-amber-900/15 shadow-2xl transition-all duration-300 animate-window-modal z-10 my-auto">
        {/* Window Title Bar */}
        <div className="flex items-center justify-between border-b border-surface-container bg-surface-container-low px-4 sm:px-6 py-3">
          <div className="flex items-center gap-2">
            {/* Subtle decorative window controls */}
            <div className="flex items-center gap-1.5" aria-hidden="true">
              <span className="h-2.5 w-2.5 rounded-full bg-roasted-terracotta/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-warm-amber/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-botanical-forest/70" />
            </div>
            <span className="text-label-xs uppercase font-bold tracking-wider text-on-surface-variant ml-2">
              Crunchzilla Window • {product.category.toUpperCase()}
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close window"
            className="flex h-8 w-8 items-center justify-center rounded-full text-on-surface-variant transition-colors hover:bg-surface-container-high hover:text-primary active:scale-95"
          >
            <Icon name="close" className="text-[18px]" />
          </button>
        </div>

        {/* Window Body */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-5 sm:p-7 max-h-[80vh] overflow-y-auto">
          {/* Product Image Stage */}
          <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-surface-container-low border border-amber-900/5">
            <Image
              src={imageSrc}
              alt={product.imageAlt}
              fill
              sizes="(min-width: 768px) 380px, 100vw"
              className="object-cover transition-transform duration-500 hover:scale-105"
            />

            <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
              <span className="inline-flex items-center gap-1 rounded-full bg-primary px-3 py-1 text-label-xs font-bold text-pure-parchment shadow-xs">
                <Icon name={product.primaryBadge.icon} className="text-[13px]" />
                {product.primaryBadge.label}
              </span>
            </div>

            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between rounded-xl bg-pure-parchment/95 px-3 py-1.5 text-label-xs text-on-surface backdrop-blur-md border border-amber-900/10">
              <span className="font-semibold text-primary">{product.highlight.left}</span>
              <span className="text-on-surface-variant">{product.highlight.right}</span>
            </div>
          </div>

          {/* Product Details & Actions */}
          <div className="flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="flex items-center gap-1 text-warm-amber">
                <Icon name="star" filled className="text-[16px]" />
                <span className="text-label-sm font-bold text-on-surface">
                  {product.rating.toFixed(1)}
                </span>
                <span className="text-body-xs text-on-surface-variant">
                  ({product.reviewCount} customer reviews)
                </span>
              </div>

              <h3
                id="quick-view-title"
                className="font-display text-headline-sm font-bold text-primary"
              >
                {product.name}
              </h3>

              <p className="text-label-xs uppercase font-semibold tracking-wider text-roasted-terracotta">
                {product.eyebrow}
              </p>

              <p className="text-body-sm text-on-surface-variant leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Price & Variant Selection */}
            <div className="space-y-3 pt-3 border-t border-surface-container">
              <div className="flex items-baseline justify-between">
                <div className="flex items-baseline gap-2">
                  <span className="font-display text-headline-md font-bold text-primary">
                    ₹{activeVariant.price}
                  </span>
                  {activeVariant.mrp && activeVariant.mrp > activeVariant.price && (
                    <span className="text-body-md text-on-surface-variant line-through">
                      ₹{activeVariant.mrp}
                    </span>
                  )}
                </div>

                {savings > 0 && (
                  <span className="rounded-full bg-botanical-forest/10 border border-botanical-forest/20 px-2.5 py-0.5 text-label-xs font-bold text-botanical-forest">
                    Save ₹{savings}
                  </span>
                )}
              </div>

              {/* Variant Selector */}
              <div>
                <span className="text-label-xs font-semibold uppercase tracking-wider text-on-surface-variant block mb-1.5">
                  {product.variantLabel || "Select Size"}:
                </span>
                <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Select size">
                  {product.variants.map((v) => {
                    const isSelected = v.id === activeVariant.id;
                    return (
                      <button
                        key={v.id}
                        type="button"
                        role="radio"
                        aria-checked={isSelected}
                        onClick={() => setSelectedVariantId(v.id)}
                        className={cn(
                          "min-h-[40px] px-3.5 py-1.5 rounded-full text-label-xs font-medium transition-all active:scale-95",
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

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className={cn(
                    "flex min-h-[46px] items-center justify-center gap-2 rounded-full px-4 py-2.5 text-title-sm font-bold transition-all active:scale-95",
                    isInCart
                      ? "bg-botanical-forest text-pure-parchment shadow-xs"
                      : "bg-roasted-terracotta text-pure-parchment shadow-premium-sm hover:bg-primary hover:shadow-premium-hover"
                  )}
                >
                  <Icon name={isInCart ? "check" : "shopping_bag"} className="text-[18px]" />
                  <span>{isInCart ? "Added ✓" : "Add to Cart"}</span>
                </button>

                <a
                  href={whatsappLink(whatsappMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-[46px] items-center justify-center gap-2 rounded-full bg-whatsapp-emerald px-4 py-2.5 text-title-sm font-bold text-pure-parchment shadow-premium-sm transition-all hover:bg-secondary hover:shadow-premium-hover active:scale-95"
                >
                  <Icon name="chat" className="text-[18px]" />
                  <span>WhatsApp</span>
                </a>
              </div>

              {/* Full Page Link */}
              <div className="text-center pt-2">
                <Link
                  href={`/shop/${product.slug}`}
                  onClick={onClose}
                  className="inline-flex items-center gap-1.5 text-label-xs font-bold text-primary hover:underline hover:text-secondary"
                >
                  <span>View Complete Heritage & Origin Details</span>
                  <Icon name="arrow_forward" className="text-[14px]" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

