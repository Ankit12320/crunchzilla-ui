"use client";

import { useSyncExternalStore } from "react";
import Image from "next/image";
import Link from "next/link";
import Icon from "@/components/common/Icon";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  selectCartCount,
  selectCartTotal,
  useCartStore,
} from "@/store/cart-store";
import { buildCartOrderWhatsAppLink } from "@/lib/whatsapp";

const subscribe = () => () => {};

export default function CartDrawer() {
  const isMounted = useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  );

  const items = useCartStore((s) => s.items);
  const isOpen = useCartStore((s) => s.isOpen);
  const closeCart = useCartStore((s) => s.closeCart);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);
  const clearCart = useCartStore((s) => s.clearCart);

  const count = useCartStore(selectCartCount);
  const total = useCartStore(selectCartTotal);

  if (!isMounted) {
    return null;
  }

  const whatsappOrderUrl = buildCartOrderWhatsAppLink(items, total);

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && closeCart()}>
      <SheetContent
        side="right"
        className="flex h-full w-full flex-col bg-surface p-0 sm:max-w-md"
      >
        {/* Drawer Header */}
        <SheetHeader className="border-b border-surface-container-high px-6 py-4">
          <div className="flex items-center justify-between pr-8">
            <div className="flex items-center gap-2">
              <Icon name="shopping_bag" className="text-[24px] text-primary" />
              <SheetTitle className="font-display text-headline-sm font-bold text-primary">
                Your Cart
              </SheetTitle>
              {count > 0 && (
                <span className="rounded-full bg-golden-sand px-2.5 py-0.5 text-label-sm font-bold text-primary">
                  {count} {count === 1 ? "item" : "items"}
                </span>
              )}
            </div>
            {items.length > 0 && (
              <button
                type="button"
                onClick={clearCart}
                className="text-label-sm text-on-surface-variant transition-colors hover:text-error hover:underline"
              >
                Clear all
              </button>
            )}
          </div>
        </SheetHeader>

        {items.length > 0 ? (
          <>
            {/* Scrollable Items List */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
              {items.map((item) => {
                const itemTotal = (item.price || 0) * item.quantity;
                return (
                  <div
                    key={`${item.slug}-${item.variantId}`}
                    className="flex gap-3 rounded-xl bg-pure-parchment p-3.5 shadow-sm border border-surface-container"
                  >
                    {/* Item Thumbnail */}
                    <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-surface-container-low">
                      {item.image ? (
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                          sizes="80px"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-outline">
                          <Icon name="restaurant" className="text-[28px]" />
                        </div>
                      )}
                    </div>

                    {/* Item Info & Quantity Controls */}
                    <div className="flex flex-1 flex-col justify-between">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h4 className="font-display text-title-sm font-bold text-on-surface line-clamp-1">
                            {item.name}
                          </h4>
                          <span className="inline-block rounded bg-surface-container px-2 py-0.5 text-label-sm text-on-surface-variant">
                            {item.variantLabel}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeItem(item.slug, item.variantId)}
                          aria-label={`Remove ${item.name}`}
                          className="text-on-surface-variant transition-colors hover:text-error p-1"
                        >
                          <Icon name="delete" className="text-[18px]" />
                        </button>
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        {/* Quantity Counter */}
                        <div className="flex items-center rounded-full border border-surface-container-high bg-surface">
                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(
                                item.slug,
                                item.variantId,
                                item.quantity - 1
                              )
                            }
                            aria-label="Decrease quantity"
                            className="flex h-7 w-7 items-center justify-center rounded-full text-on-surface transition-colors hover:bg-surface-container-high"
                          >
                            <Icon name="remove" className="text-[16px]" />
                          </button>
                          <span className="w-8 text-center text-label-md font-bold text-on-surface">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(
                                item.slug,
                                item.variantId,
                                item.quantity + 1
                              )
                            }
                            aria-label="Increase quantity"
                            className="flex h-7 w-7 items-center justify-center rounded-full text-on-surface transition-colors hover:bg-surface-container-high"
                          >
                            <Icon name="add" className="text-[16px]" />
                          </button>
                        </div>

                        {/* Price & Subtotal */}
                        <div className="text-right">
                          <span className="text-label-sm text-on-surface-variant block">
                            ₹{item.price} each
                          </span>
                          <span className="font-display text-title-sm font-bold text-primary">
                            ₹{itemTotal}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Sticky Order Summary & WhatsApp CTA */}
            <div className="border-t border-surface-container-high bg-pure-parchment p-6 space-y-4 shadow-lg">
              <div className="space-y-1.5 text-body-sm">
                <div className="flex justify-between text-on-surface-variant">
                  <span>Total Items</span>
                  <span className="font-medium text-on-surface">
                    {count} {count === 1 ? "item" : "items"}
                  </span>
                </div>
                <div className="border-t border-surface-container pt-2 flex items-baseline justify-between">
                  <span className="font-display text-title-md font-bold text-on-surface">
                    Total Amount
                  </span>
                  <div className="text-right">
                    <span className="font-display text-headline-sm font-bold text-primary">
                      ₹{total}
                    </span>
                    <span className="block text-[11px] text-on-surface-variant">
                      Direct product calculation
                    </span>
                  </div>
                </div>
              </div>

              {/* Order via WhatsApp CTA */}
              <a
                href={whatsappOrderUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2.5 rounded-full bg-whatsapp-emerald py-3.5 px-6 text-title-sm font-bold text-pure-parchment shadow-md transition-all duration-200 hover:bg-secondary hover:shadow-lg active:scale-[0.99]"
              >
                <Icon name="chat" className="text-[22px]" />
                Place Order on WhatsApp (₹{total})
              </a>

              <div className="flex items-center justify-center pt-1">
                <Link
                  href="/cart"
                  onClick={closeCart}
                  className="inline-flex items-center gap-1 text-label-md text-primary transition-colors hover:underline"
                >
                  View full cart page
                  <Icon name="arrow_forward" className="text-[16px]" />
                </Link>
              </div>

              <p className="text-center text-[12px] text-on-surface-variant flex items-center justify-center gap-1.5">
                <Icon
                  name="verified_user"
                  className="text-[15px] text-secondary"
                />
                Direct Order on WhatsApp • Pay via UPI/Card • Fresh Batches
              </p>
            </div>
          </>
        ) : (
          /* Empty Cart State */
          <div className="flex flex-1 flex-col items-center justify-center p-8 text-center">
            <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-surface-container-high text-primary">
              <Icon name="shopping_bag" className="text-[40px]" />
            </div>
            <h3 className="font-display text-headline-sm font-bold text-on-surface">
              Your cart is empty
            </h3>
            <p className="mt-2 max-w-xs text-body-md text-on-surface-variant">
              Explore our artisanal, slow-roasted staples from Gaya and Mithila.
            </p>
            <Link
              href="/shop"
              onClick={closeCart}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-roasted-terracotta px-6 py-3 text-title-sm text-pure-parchment shadow-sm transition-all hover:bg-primary"
            >
              Start Shopping
              <Icon name="arrow_forward" className="text-[18px]" />
            </Link>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
