"use client";

import { useEffect } from "react";
import { useCartStore } from "@/lib/store/cartStore";
import { useWishlistStore } from "@/lib/store/wishlistStore";
import { useRecentlyViewedStore } from "@/lib/store/recentlyViewedStore";

// Wait until client mounts so persisted zustand state can hydrate
// without causing hydration mismatches.
export function StoreHydration() {
  useEffect(() => {
    // touch stores so they hydrate
    useCartStore.persist?.rehydrate?.();
    useWishlistStore.persist?.rehydrate?.();
    useRecentlyViewedStore.persist?.rehydrate?.();
  }, []);
  return null;
}
