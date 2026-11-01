"use client";

import { useSyncExternalStore } from "react";
import Icon from "@/components/common/Icon";
import { selectCartCount, useCartStore } from "@/store/cart-store";

const subscribe = () => () => {};

export default function CartButton() {
  const isMounted = useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  );

  const count = useCartStore(selectCartCount);
  const openCart = useCartStore((s) => s.openCart);

  const displayCount = isMounted ? count : 0;

  return (
    <button
      type="button"
      onClick={openCart}
      aria-label={`Shopping cart, ${displayCount} items`}
      className="relative flex h-11 w-11 items-center justify-center rounded-full text-on-surface-variant transition-colors hover:bg-surface-container-high hover:text-on-surface active:scale-95"
    >
      <Icon name="shopping_bag" className="text-[22px]" />
      {displayCount > 0 && (
        <span
          key={displayCount}
          className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] leading-none font-bold text-on-primary animate-in zoom-in-125"
        >
          {displayCount}
        </span>
      )}
    </button>
  );
}
