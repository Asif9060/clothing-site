"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { Product, ProductColor } from "@/lib/data/products";

export type CartLine = {
  productId: string;
  slug: string;
  name: string;
  image: string;
  price: number;
  size: string;
  color: ProductColor;
  quantity: number;
};

type CartState = {
  items: CartLine[];
  isOpen: boolean;
  addItem: (input: {
    product: Product;
    size: string;
    color: ProductColor;
    quantity?: number;
  }) => void;
  removeItem: (key: string) => void;
  updateQuantity: (key: string, qty: number) => void;
  clear: () => void;
  open: () => void;
  close: () => void;
  toggle: () => void;
};

const keyOf = (id: string, size: string, colorName: string) =>
  `${id}__${size}__${colorName}`;

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      isOpen: false,
      addItem: ({ product, size, color, quantity = 1 }) =>
        set((state) => {
          const key = keyOf(product.id, size, color.name);
          const existing = state.items.find(
            (i) =>
              i.productId === product.id &&
              i.size === size &&
              i.color.name === color.name
          );
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.productId === product.id &&
                i.size === size &&
                i.color.name === color.name
                  ? { ...i, quantity: i.quantity + quantity }
                  : i
              ),
              isOpen: true,
            };
          }
          const line: CartLine = {
            productId: product.id,
            slug: product.slug,
            name: product.name,
            image: product.images[0],
            price: product.price,
            size,
            color,
            quantity,
          };
          return { items: [...state.items, line], isOpen: true };
        }),
      removeItem: (key) =>
        set((state) => ({
          items: state.items.filter(
            (i) => keyOf(i.productId, i.size, i.color.name) !== key
          ),
        })),
      updateQuantity: (key, qty) =>
        set((state) => ({
          items:
            qty <= 0
              ? state.items.filter(
                  (i) => keyOf(i.productId, i.size, i.color.name) !== key
                )
              : state.items.map((i) =>
                  keyOf(i.productId, i.size, i.color.name) === key
                    ? { ...i, quantity: qty }
                    : i
                ),
        })),
      clear: () => set({ items: [] }),
      open: () => set({ isOpen: true }),
      close: () => set({ isOpen: false }),
      toggle: () => set((state) => ({ isOpen: !state.isOpen })),
    }),
    {
      name: "lv-cart",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ items: state.items }),
    }
  )
);

export const cartKey = keyOf;
