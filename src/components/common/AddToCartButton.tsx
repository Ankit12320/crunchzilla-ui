"use client";

import { useAddToCart } from "@/hooks/use-add-to-cart";
import type { CartItem } from "@/types/cart";

interface AddToCartButtonProps {
  item: Omit<CartItem, "quantity">;
  className?: string;
  children: React.ReactNode;
}

/** Client island so server components can render an add-to-cart action. */
export default function AddToCartButton({ item, className, children }: AddToCartButtonProps) {
  const addToCart = useAddToCart();

  return (
    <button type="button" onClick={() => addToCart(item)} className={className}>
      {children}
    </button>
  );
}
