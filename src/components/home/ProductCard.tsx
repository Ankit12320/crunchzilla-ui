"use client";

import { useState } from "react";
import Image from "next/image";
import Icon from "@/components/common/Icon";
import { IMAGES } from "@/constants/images";
import { buildProductCardWhatsAppLink } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";
import { useAddToCart } from "@/hooks/use-add-to-cart";
import type { BadgeTone, Product } from "@/types/product";

const BADGE_STYLES: Record<BadgeTone, string> = {
  amber: "bg-warm-amber text-pure-parchment",
  forest: "bg-botanical-forest text-pure-parchment",
  tertiary: "bg-tertiary-container text-on-tertiary-container",
};

export default function ProductCard({ product }: { product: Product }) {
  const [variantId, setVariantId] = useState(product.variants[0]?.id);
  const addToCart = useAddToCart();

  const variant = product.variants.find((v) => v.id === variantId) ?? product.variants[0];
  const activePrice = variant?.price ?? product.price;

  const handleAddToCart = () => {
    addToCart({
      slug: product.slug,
      name: product.name,
      price: activePrice,
      variantId: variant.id,
      variantLabel: variant.label,
      image: IMAGES.products[product.image],
    });
  };

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl bg-pure-parchment border border-amber-900/10 shadow-premium-sm transition-all duration-300 hover:shadow-premium-hover hover:-translate-y-1.5">
      <div className="relative h-72 overflow-hidden bg-surface-container-high">
        <Image
          src={IMAGES.products[product.image]}
          alt={product.imageAlt}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span
          className={cn(
            "absolute top-4 left-4 rounded-full px-3 py-1 text-label-sm uppercase shadow-sm",
            BADGE_STYLES[product.badge.tone]
          )}
        >
          {product.badge.label}
        </span>
        <span className="absolute top-4 right-4 flex items-center gap-1 rounded-full bg-pure-parchment/90 px-2.5 py-1 text-label-sm text-on-surface shadow-sm backdrop-blur-sm">
          <Icon name="star" filled className="text-[15px] text-warm-amber" />
          <span className="font-bold">{product.rating.toFixed(1)}</span> ({product.reviewCount})
        </span>
      </div>

      <div className="flex flex-1 flex-col justify-between space-y-4 p-6">
        <div>
          <div className="mb-1 flex items-baseline justify-between">
            <h3 className="font-display text-headline-sm font-bold text-primary">{product.name}</h3>
            <span className="font-display text-headline-sm font-bold text-on-surface">
              ₹{activePrice}
            </span>
          </div>
          <p className="mb-2 text-label-sm uppercase tracking-wider text-secondary">
            {product.subtitle}
          </p>
          <p className="text-body-md text-on-surface-variant">{product.description}</p>
        </div>

        <div className="space-y-3 pt-2">
          <div className="flex items-center gap-2">
            <span className="text-label-sm text-on-surface-variant">Size:</span>
            <div className="flex flex-wrap items-center gap-1.5" role="radiogroup" aria-label="Size">
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
                      "flex min-h-[42px] sm:min-h-[38px] items-center justify-center rounded-full px-3.5 py-2 text-xs transition-colors active:scale-95",
                      selected
                        ? "bg-primary font-semibold text-on-primary"
                        : "bg-surface-container text-on-surface hover:bg-surface-container-high"
                    )}
                  >
                    {v.label} {v.price ? `(₹${v.price})` : ""}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 sm:gap-2.5 pt-2">
            <button
              type="button"
              onClick={handleAddToCart}
              className="flex h-11 w-full items-center justify-center gap-1.5 rounded-full bg-roasted-terracotta px-2 sm:px-3 text-label-sm font-bold text-pure-parchment shadow-sm transition-all hover:bg-primary active:scale-[0.98] whitespace-nowrap"
            >
              <Icon name="shopping_bag" className="text-[18px]" />
              <span>Add to Cart</span>
            </button>
            <a
              href={buildProductCardWhatsAppLink({
                name: product.name,
                variantLabel: variant.label,
                price: activePrice,
              })}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Order ${product.name} on WhatsApp`}
              className="flex h-11 w-full items-center justify-center gap-1.5 rounded-full bg-whatsapp-emerald px-2 sm:px-3 text-label-sm font-bold text-pure-parchment shadow-sm transition-all hover:bg-secondary active:scale-[0.98] whitespace-nowrap"
            >
              <Icon name="chat" className="text-[18px] shrink-0" />
              <span className="hidden sm:inline">Order on WhatsApp</span>
              <span className="sm:hidden">WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}
