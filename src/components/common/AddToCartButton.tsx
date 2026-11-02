"use client";

import Icon from "@/components/common/Icon";
import { useAddToCart } from "@/hooks/use-add-to-cart";
import { useCartStore } from "@/store/cart-store";
import { cn } from "@/lib/utils";
import type { CartItem } from "@/types/cart";

interface AddToCartButtonProps {
  item: Omit<CartItem, "quantity">;
  className?: string;
  children?: React.ReactNode;
}

/** Client island so server components can render an add-to-cart action. */
export default function AddToCartButton({ item, className, children }: AddToCartButtonProps) {
  const addToCart = useAddToCart();
  const items = useCartStore((s) => s.items);
  const isInCart = items.some((i) => i.slug === item.slug && i.variantId === item.variantId);

  return (
    <button
      type="button"
      onClick={() => addToCart(item)}
      className={cn(className, isInCart && "bg-botanical-forest hover:bg-secondary")}
    >
      <Icon name={isInCart ? "check" : "shopping_bag"} className="text-[20px] shrink-0" />
      <span>{isInCart ? "In Cart" : children ?? "Add to Cart"}</span>
    </button>
  );
}
