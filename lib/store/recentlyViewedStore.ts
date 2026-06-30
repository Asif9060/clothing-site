"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type RecentItem = {
  productId: string;
  slug: string;
  name: string;
  image: string;
  price: number;
};

type RecentState = {
  items: RecentItem[];
  push: (item: RecentItem) => void;
};

export const useRecentlyViewedStore = create<RecentState>()(
  persist(
    (set) => ({
      items: [],
      push: (item) =>
        set((state) => {
          const without = state.items.filter(
            (i) => i.productId !== item.productId
          );
          return { items: [item, ...without].slice(0, 8) };
        }),
    }),
    {
      name: "lv-recent",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
