"use client";

import { useState } from "react";
import Image from "next/image";
import Icon from "@/components/common/Icon";
import { IMAGES } from "@/constants/images";
import { whatsappLink } from "@/lib/whatsapp";
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

  const handleAddToCart = () => {
    addToCart({
      slug: product.slug,
      name: product.name,
      price: product.price,
      variantId: variant.id,
      variantLabel: variant.label,
    });
  };

  return (
    <article className="group flex flex-col overflow-hidden rounded-xl bg-pure-parchment shadow-md transition-all duration-300 hover:shadow-xl">
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
              ₹{product.price}
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
            <div className="flex items-center gap-1.5" role="radiogroup" aria-label="Size">
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
                      "rounded-full px-3 py-1 text-xs transition-colors",
                      selected
                        ? "bg-primary font-semibold text-on-primary"
                        : "bg-surface-container text-on-surface hover:bg-surface-container-high"
                    )}
                  >
                    {v.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={handleAddToCart}
              className="flex w-full items-center justify-center gap-1.5 rounded-full bg-surface-container-high py-2.5 text-title-sm text-on-surface transition-all hover:bg-primary-container hover:text-on-primary-container"
            >
              <Icon name="shopping_bag" className="text-[18px]" />
              Add to Cart
            </button>
            <a
              href={whatsappLink(
                `Hi, I want to buy ${product.name} ${variant.label} (₹${product.price})`
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center rounded-full bg-roasted-terracotta py-2.5 text-title-sm text-on-primary shadow-sm transition-all hover:bg-primary"
            >
              Quick Buy
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}
