"use client";

import Icon from "@/components/common/Icon";
import { selectCartCount, useCartStore } from "@/store/cart-store";

export default function CartButton() {
  const count = useCartStore(selectCartCount);

  return (
    <button
      type="button"
      aria-label={`Shopping cart, ${count} items`}
      className="relative flex h-10 w-10 items-center justify-center rounded-full text-on-surface-variant transition-colors hover:bg-surface-container-high hover:text-on-surface"
    >
      <Icon name="shopping_bag" className="text-[22px]" />
      <span
        key={count}
        className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] leading-none font-bold text-on-primary animate-in zoom-in-125"
      >
        {count}
      </span>
    </button>
  );
}
