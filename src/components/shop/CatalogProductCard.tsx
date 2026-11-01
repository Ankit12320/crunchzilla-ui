"use client";

import { useState } from "react";
import Image from "next/image";
import Icon from "@/components/common/Icon";
import { IMAGES } from "@/constants/images";
import { PRIMARY_BADGE_STYLES, SECONDARY_BADGE_STYLES } from "@/constants/shop";
import { useAddToCart } from "@/hooks/use-add-to-cart";
import { cn } from "@/lib/utils";
import { buildProductCardWhatsAppLink } from "@/lib/whatsapp";
import type { CatalogProduct } from "@/types/catalog";

export default function CatalogProductCard({ product }: { product: CatalogProduct }) {
  const [variantId, setVariantId] = useState(product.variants[0].id);
  const [wishlisted, setWishlisted] = useState(false);
  const addToCart = useAddToCart();

  const variant = product.variants.find((v) => v.id === variantId) ?? product.variants[0];
  const image = IMAGES.catalog[product.image];

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-xl bg-pure-parchment shadow-sm transition-all duration-300 hover:shadow-xl">
      {/* Image stage */}
      <div className="relative aspect-[4/3] overflow-hidden bg-surface-container-low">
        <Image
          src={image}
          alt={product.imageAlt}
          fill
          unoptimized={image.endsWith(".gif")}
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />

        <div className="absolute top-3 left-3 flex flex-col items-start gap-1.5">
          <span
            className={cn(
              "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-label-sm shadow-sm",
              PRIMARY_BADGE_STYLES[product.primaryBadge.tone]
            )}
          >
            <Icon name={product.primaryBadge.icon} className="text-[13px]" />
            {product.primaryBadge.label}
          </span>
          <span
            className={cn(
              "inline-flex items-center rounded-full px-2.5 py-0.5 text-label-sm",
              SECONDARY_BADGE_STYLES[product.secondaryBadge.tone]
            )}
          >
            {product.secondaryBadge.label}
          </span>
        </div>

        <button
          type="button"
          aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
          aria-pressed={wishlisted}
          onClick={() => setWishlisted((w) => !w)}
          className={cn(
            "absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-pure-parchment/90 shadow-sm backdrop-blur-sm transition-colors hover:text-primary",
            wishlisted ? "text-primary" : "text-on-surface-variant"
          )}
        >
          <Icon name="favorite" filled={wishlisted} className="text-[18px]" />
        </button>

        <div className="absolute right-3 bottom-3 left-3 flex items-center justify-between rounded-lg bg-surface/90 px-3 py-1.5 backdrop-blur-sm">
          <span className="text-label-sm uppercase text-roasted-terracotta">
            {product.highlight.left}
          </span>
          <span className="text-label-sm font-bold text-secondary">{product.highlight.right}</span>
        </div>
      </div>

      {/* Content */}
      <div className="flex grow flex-col justify-between gap-4 p-5">
        <div>
          <div className="mb-1 flex items-center justify-between gap-2">
            <span className="text-label-sm uppercase tracking-wider text-secondary">
              {product.eyebrow}
            </span>
            <div className="flex items-center gap-1 text-warm-amber">
              <Icon name="star" filled className="text-[15px]" />
              <span className="text-label-sm font-bold text-on-surface">
                {product.rating.toFixed(1)}
              </span>
              <span className="text-label-sm text-on-surface-variant">({product.reviewCount})</span>
            </div>
          </div>
          <h2 className="font-display text-headline-sm font-bold text-on-surface transition-colors group-hover:text-primary">
            {product.name}
          </h2>
          <p className="mt-1.5 line-clamp-2 text-body-sm text-on-surface-variant">
            {product.description}
          </p>
        </div>

        <div className="space-y-2">
          <span className="block text-label-sm uppercase text-on-surface-variant">
            {product.variantLabel}
          </span>
          <div className="flex flex-wrap items-center gap-2" role="radiogroup" aria-label={product.variantLabel}>
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
                    "rounded-full px-3 py-1 text-label-sm transition-all",
                    selected
                      ? "bg-roasted-terracotta text-pure-parchment"
                      : "bg-surface-container text-on-surface-variant hover:bg-surface-variant"
                  )}
                >
                  {v.label} {v.price ? `(₹${v.price})` : ""}
                </button>
              );
            })}
          </div>
        </div>

        {/* Action area */}
        <div className="-mx-5 -mb-5 space-y-3 rounded-b-xl bg-surface-container-low p-5">
          <div className="flex items-baseline justify-between">
            <span className="text-label-sm font-medium text-on-surface-variant">Price</span>
            <div className="flex items-baseline gap-2">
              {variant.mrp && (
                <span className="text-label-sm text-on-surface-variant line-through">
                  ₹{variant.mrp}
                </span>
              )}
              <span className="text-title-lg font-bold leading-none text-primary">₹{variant.price}</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 sm:gap-2.5">
            <button
              type="button"
              onClick={() =>
                addToCart({
                  slug: product.slug,
                  name: product.name,
                  price: variant.price,
                  variantId: variant.id,
                  variantLabel: variant.label,
                  image: image,
                })
              }
              className="flex h-11 w-full items-center justify-center gap-1.5 rounded-full bg-roasted-terracotta px-2 sm:px-3 text-label-sm font-bold text-pure-parchment shadow-sm transition-all hover:bg-primary active:scale-[0.98] whitespace-nowrap"
            >
              <Icon name="shopping_bag" className="text-[18px]" />
              <span>Add to Cart</span>
            </button>
            <a
              href={buildProductCardWhatsAppLink({
                name: product.name,
                variantLabel: variant.label,
                price: variant.price,
              })}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Order ${product.name} on WhatsApp`}
              title="Order on WhatsApp"
              className="flex h-11 w-full items-center justify-center gap-1.5 rounded-full bg-whatsapp-emerald px-2 sm:px-3 text-label-sm font-bold text-pure-parchment shadow-sm transition-all hover:bg-secondary active:scale-[0.98] whitespace-nowrap"
            >
              <Icon name="chat" className="text-[18px]" />
              <span>Order on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}
