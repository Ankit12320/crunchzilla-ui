"use client";

import { useSyncExternalStore } from "react";
import Image from "next/image";
import Link from "next/link";
import Icon from "@/components/common/Icon";
import { SITE } from "@/constants/site";
import {
  selectCartCount,
  selectCartSubtotal,
  selectShippingFee,
  selectCartTotal,
  useCartStore,
} from "@/store/cart-store";
import { buildCartOrderWhatsAppLink } from "@/lib/whatsapp";

const subscribe = () => () => {};

export default function CartView() {
  const isMounted = useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  );

  const items = useCartStore((s) => s.items);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);
  const clearCart = useCartStore((s) => s.clearCart);

  const count = useCartStore(selectCartCount);
  const subtotal = useCartStore(selectCartSubtotal);
  const shippingFee = selectShippingFee(subtotal);
  const grandTotal = selectCartTotal(subtotal);

  if (!isMounted) {
    return (
      <div className="container-page py-16 text-center">
        <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  const freeShippingThreshold = SITE.freeShippingAbove;
  const amountNeededForFreeShipping = Math.max(
    0,
    freeShippingThreshold - subtotal
  );
  const freeShippingProgress = Math.min(
    100,
    Math.round((subtotal / freeShippingThreshold) * 100)
  );

  const whatsappOrderUrl = buildCartOrderWhatsAppLink(
    items,
    subtotal,
    shippingFee,
    grandTotal
  );

  if (items.length === 0) {
    return (
      <section className="w-full py-16 sm:py-24">
        <div className="container-page max-w-lg text-center">
          <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-surface-container-high text-primary">
            <Icon name="shopping_bag" className="text-[48px]" />
          </div>
          <h1 className="font-display text-headline-md font-bold text-on-surface">
            Your Cart is Empty
          </h1>
          <p className="mt-3 text-body-lg text-on-surface-variant">
            Looks like you haven&apos;t added any traditional staples yet. Explore our fresh batches of Tilkut, Makhana, Sattu and more!
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 rounded-full bg-roasted-terracotta px-8 py-3.5 text-title-sm text-pure-parchment shadow-md transition-all hover:bg-primary"
            >
              Start Shopping
              <Icon name="arrow_forward" className="text-[18px]" />
            </Link>
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full bg-surface-container-highest px-6 py-3.5 text-title-sm text-on-surface transition-colors hover:bg-surface-container-high"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full py-8 sm:py-12">
      <div className="container-page">
        {/* Breadcrumb & Title */}
        <div className="mb-8 space-y-2">
          <nav className="flex items-center gap-2 text-label-sm text-on-surface-variant">
            <Link href="/" className="hover:text-primary">
              Home
            </Link>
            <span>/</span>
            <span className="text-on-surface font-semibold">Shopping Cart</span>
          </nav>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <h1 className="font-display text-display-mobile sm:text-headline-lg font-bold text-primary">
                Shopping Cart
              </h1>
              <span className="rounded-full bg-golden-sand px-3 py-1 text-label-md font-bold text-primary">
                {count} {count === 1 ? "item" : "items"}
              </span>
            </div>
            <button
              type="button"
              onClick={clearCart}
              className="flex items-center gap-1.5 text-label-md text-on-surface-variant transition-colors hover:text-error"
            >
              <Icon name="delete_sweep" className="text-[18px]" />
              Clear entire cart
            </button>
          </div>
        </div>

        {/* Free Delivery Bar */}
        <div className="mb-8 rounded-2xl bg-surface-container-low p-4 sm:p-5 border border-surface-container-high">
          {amountNeededForFreeShipping > 0 ? (
            <div className="space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-2 text-body-md text-on-surface">
                <span>
                  Add items worth{" "}
                  <strong className="text-primary font-bold">
                    ₹{amountNeededForFreeShipping}
                  </strong>{" "}
                  more to get <strong>FREE Delivery</strong> across India!
                </span>
                <span className="text-label-md font-bold text-secondary">
                  {freeShippingProgress}% achieved
                </span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-surface-container-highest">
                <div
                  className="h-full rounded-full bg-secondary transition-all duration-300"
                  style={{ width: `${freeShippingProgress}%` }}
                />
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2.5 text-title-sm font-bold text-secondary">
              <Icon name="check_circle" filled className="text-[22px]" />
              <span>
                🎉 Congratulations! Your order qualifies for{" "}
                <strong>FREE Delivery</strong> anywhere in India.
              </span>
            </div>
          )}
        </div>

        {/* Cart Content: Items & Summary */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start">
          {/* Products List (Left 8 Cols) */}
          <div className="space-y-4 lg:col-span-8">
            {items.map((item) => {
              const itemTotal = (item.price || 0) * item.quantity;
              return (
                <article
                  key={`${item.slug}-${item.variantId}`}
                  className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-2xl bg-pure-parchment p-4 sm:p-5 shadow-sm border border-surface-container transition-all hover:shadow-md"
                >
                  <div className="flex items-center gap-4">
                    {/* Thumbnail */}
                    <div className="relative h-20 w-20 sm:h-24 sm:w-24 shrink-0 overflow-hidden rounded-xl bg-surface-container-low">
                      {item.image ? (
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          sizes="96px"
                          className="object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-outline">
                          <Icon name="restaurant" className="text-[32px]" />
                        </div>
                      )}
                    </div>

                    {/* Details */}
                    <div>
                      <h2 className="font-display text-title-md font-bold text-on-surface">
                        {item.name}
                      </h2>
                      <div className="mt-1 flex items-center gap-2">
                        <span className="rounded-full bg-surface-container px-2.5 py-0.5 text-label-sm text-on-surface-variant font-medium">
                          {item.variantLabel}
                        </span>
                        <span className="text-body-sm text-on-surface-variant">
                          ₹{item.price} each
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Quantity & Subtotal */}
                  <div className="flex w-full sm:w-auto items-center justify-between sm:justify-end gap-6 border-t sm:border-t-0 pt-3 sm:pt-0 border-surface-container">
                    {/* Quantity Selector */}
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
                        className="flex h-8 w-8 items-center justify-center rounded-full text-on-surface transition-colors hover:bg-surface-container-high"
                      >
                        <Icon name="remove" className="text-[16px]" />
                      </button>
                      <span className="w-10 text-center text-label-lg font-bold text-on-surface">
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
                        className="flex h-8 w-8 items-center justify-center rounded-full text-on-surface transition-colors hover:bg-surface-container-high"
                      >
                        <Icon name="add" className="text-[16px]" />
                      </button>
                    </div>

                    {/* Item Total */}
                    <div className="text-right min-w-[80px]">
                      <span className="block font-display text-title-lg font-bold text-primary">
                        ₹{itemTotal}
                      </span>
                    </div>

                    {/* Delete Item */}
                    <button
                      type="button"
                      onClick={() => removeItem(item.slug, item.variantId)}
                      aria-label={`Remove ${item.name}`}
                      className="p-1.5 text-on-surface-variant transition-colors hover:text-error"
                    >
                      <Icon name="delete" className="text-[20px]" />
                    </button>
                  </div>
                </article>
              );
            })}

            <div className="pt-2">
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 text-title-sm font-semibold text-primary hover:underline"
              >
                <Icon name="arrow_back" className="text-[18px]" />
                Add more items from Shop
              </Link>
            </div>
          </div>

          {/* Order Summary & WhatsApp CTA (Right 4 Cols / Bottom on Mobile) */}
          <div className="lg:col-span-4">
            <div className="sticky top-header rounded-2xl bg-pure-parchment p-6 shadow-md border border-surface-container space-y-6">
              <h2 className="font-display text-headline-sm font-bold text-on-surface border-b border-surface-container pb-4">
                Order Summary
              </h2>

              <div className="space-y-3 text-body-md">
                <div className="flex justify-between text-on-surface-variant">
                  <span>Subtotal ({count} items)</span>
                  <span className="font-semibold text-on-surface">
                    ₹{subtotal}
                  </span>
                </div>
                <div className="flex justify-between text-on-surface-variant">
                  <span>Delivery Charges</span>
                  <span
                    className={
                      shippingFee === 0
                        ? "font-bold text-secondary"
                        : "font-semibold text-on-surface"
                    }
                  >
                    {shippingFee === 0 ? "FREE" : `₹${shippingFee}`}
                  </span>
                </div>
                <div className="border-t border-surface-container pt-3 flex items-baseline justify-between">
                  <span className="font-display text-title-lg font-bold text-on-surface">
                    Grand Total
                  </span>
                  <div className="text-right">
                    <span className="font-display text-headline-md font-bold text-primary">
                      ₹{grandTotal}
                    </span>
                    <span className="block text-label-sm text-on-surface-variant">
                      Inclusive of all taxes
                    </span>
                  </div>
                </div>
              </div>

              {/* WhatsApp Checkout Button */}
              <div className="space-y-3">
                <a
                  href={whatsappOrderUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-2.5 rounded-full bg-whatsapp-emerald py-4 px-6 text-title-md font-bold text-pure-parchment shadow-md transition-all duration-200 hover:bg-secondary hover:shadow-lg active:scale-[0.99]"
                >
                  <Icon name="chat" className="text-[24px]" />
                  Place Order on WhatsApp
                </a>

                <p className="text-center text-label-sm text-on-surface-variant">
                  Clicking will open WhatsApp with your itemized order details pre-filled.
                </p>
              </div>

              {/* Guarantees */}
              <div className="rounded-xl bg-surface-container-low p-4 space-y-2 border border-surface-container-high text-body-sm text-on-surface-variant">
                <div className="flex items-center gap-2">
                  <Icon name="verified" className="text-[18px] text-secondary" />
                  <span>100% Traditional wood-fired recipes</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="payments" className="text-[18px] text-secondary" />
                  <span>Secure UPI, Cards & NetBanking payments</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="local_shipping" className="text-[18px] text-secondary" />
                  <span>Safe break-free packaging across India</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
