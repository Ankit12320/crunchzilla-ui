import { create } from "zustand";
import { persist } from "zustand/middleware";
import { SITE } from "@/constants/site";
import type { CartItem } from "@/types/cart";

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (slug: string, variantId: string) => void;
  updateQuantity: (slug: string, variantId: string, quantity: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      isOpen: false,
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
      addItem: (item) =>
        set((state) => {
          const existing = state.items.find(
            (i) => i.slug === item.slug && i.variantId === item.variantId
          );
          if (existing) {
            return {
              isOpen: true,
              items: state.items.map((i) =>
                i === existing ? { ...i, quantity: i.quantity + 1 } : i
              ),
            };
          }
          return {
            isOpen: true,
            items: [...state.items, { ...item, quantity: 1 }],
          };
        }),
      removeItem: (slug, variantId) =>
        set((state) => ({
          items: state.items.filter(
            (i) => !(i.slug === slug && i.variantId === variantId)
          ),
        })),
      updateQuantity: (slug, variantId, quantity) =>
        set((state) => {
          if (quantity <= 0) {
            return {
              items: state.items.filter(
                (i) => !(i.slug === slug && i.variantId === variantId)
              ),
            };
          }
          return {
            items: state.items.map((i) =>
              i.slug === slug && i.variantId === variantId
                ? { ...i, quantity }
                : i
            ),
          };
        }),
      clearCart: () => set({ items: [] }),
    }),
    {
      name: "crunchzilla-cart-storage",
      partialize: (state) => ({ items: state.items }),
    }
  )
);

export const selectCartCount = (state: CartState) =>
  state.items.reduce((sum, i) => sum + i.quantity, 0);

export const selectCartSubtotal = (state: CartState) =>
  state.items.reduce((sum, i) => sum + (Number(i.price) || 0) * i.quantity, 0);

export const selectShippingFee = (subtotal: number) => {
  if (subtotal === 0 || subtotal >= SITE.freeShippingAbove) {
    return 0;
  }
  return 50; // Standard nominal shipping charge for orders below threshold
};

export const selectCartTotal = (subtotal: number) =>
  subtotal + selectShippingFee(subtotal);
