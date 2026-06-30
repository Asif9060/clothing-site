"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FiClock, FiArrowUpRight } from "react-icons/fi";
import { useEffect, useState } from "react";
import { useRecentlyViewedStore } from "@/lib/store/recentlyViewedStore";
import { formatPrice } from "@/lib/utils";

export function RecentlyViewed() {
  const items = useRecentlyViewedStore((s) => s.items);
  const [mounted, setMounted] = useState(false);

  // Only show items after hydration to avoid SSR mismatch
  useEffect(() => setMounted(true), []);

  if (!mounted || items.length === 0) return null;

  return (
    <section className="container-tight py-24 lg:py-32">
      <div className="flex items-end justify-between mb-10">
        <div>
          <p className="h-eyebrow flex items-center gap-2">
            <FiClock size={12} className="text-brass" />
            Recently stalked
          </p>
          <h2 className="h-display text-3xl md:text-4xl mt-3">
            Picked up where you left off.
          </h2>
        </div>
        <Link
          href="/shop"
          className="hidden sm:inline-flex items-center gap-2 text-[11px] uppercase tracking-widest hover:text-brass"
        >
          Continue browsing <FiArrowUpRight />
        </Link>
      </div>
      <div className="overflow-x-auto -mx-4 sm:-mx-6 lg:-mx-10 px-4 sm:px-6 lg:px-10 mask-fade-x">
        <div className="flex gap-5 pb-4 min-w-max">
          {items.map((it) => (
            <Link
              key={it.productId}
              href={`/product/${it.slug}`}
              className="group w-56 shrink-0"
            >
              <div className="relative aspect-[3/4] overflow-hidden rounded-sm bg-ivory-100">
                <Image
                  src={it.image}
                  alt={it.name}
                  fill
                  sizes="224px"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <p className="mt-3 font-display text-sm leading-tight group-hover:text-brass">
                {it.name}
              </p>
              <p className="text-xs text-charcoal-400 tabular-nums mt-0.5">
                {formatPrice(it.price)}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
