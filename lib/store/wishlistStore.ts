"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type WishItem = {
  productId: string;
  slug: string;
  name: string;
  image: string;
  price: number;
};

type WishState = {
  items: WishItem[];
  isOpen: boolean;
  toggle: (item: WishItem) => void;
  remove: (productId: string) => void;
  has: (productId: string) => boolean;
  open: () => void;
  close: () => void;
};

export const useWishlistStore = create<WishState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      toggle: (item) =>
        set((state) => {
          const exists = state.items.find(
            (i) => i.productId === item.productId
          );
          return {
            items: exists
              ? state.items.filter((i) => i.productId !== item.productId)
              : [...state.items, item],
          };
        }),
      remove: (productId) =>
        set((state) => ({
          items: state.items.filter((i) => i.productId !== productId),
        })),
      has: (productId) => !!get().items.find((i) => i.productId === productId),
      open: () => set({ isOpen: true }),
      close: () => set({ isOpen: false }),
    }),
    {
      name: "lv-wishlist",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ items: state.items }),
    }
  )
);
