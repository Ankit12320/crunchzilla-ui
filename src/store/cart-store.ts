import { create } from "zustand";
import { persist } from "zustand/middleware";
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

/** Total quantity of items in the cart */
export const selectCartCount = (state: CartState) =>
  state.items.reduce((sum, i) => sum + i.quantity, 0);

/** Total price calculated purely from the products in the cart */
export const selectCartTotal = (state: CartState) =>
  state.items.reduce((sum, i) => sum + (Number(i.price) || 0) * i.quantity, 0);

/** Alias for selectCartTotal */
export const selectCartSubtotal = selectCartTotal;
