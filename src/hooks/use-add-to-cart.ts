"use client";

import { useCallback } from "react";
import { useCartStore } from "@/store/cart-store";
import { useToastStore } from "@/store/toast-store";
import type { CartItem } from "@/types/cart";

/** Adds an item to the cart and shows the confirmation toast. */
export function useAddToCart() {
  const addItem = useCartStore((s) => s.addItem);
  const showToast = useToastStore((s) => s.show);

  return useCallback(
    (item: Omit<CartItem, "quantity">) => {
      addItem(item);
      showToast(`Added ${item.name} (₹${item.price}) to your cart!`);
    },
    [addItem, showToast]
  );
}
