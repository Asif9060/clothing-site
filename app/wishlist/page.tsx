"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FiTrash2, FiArrowRight } from "react-icons/fi";
import { useWishlistStore } from "@/lib/store/wishlistStore";
import { Button } from "@/components/ui/Button";
import { formatPrice } from "@/lib/utils";

export default function WishlistPage() {
  const items = useWishlistStore((s) => s.items);
  const remove = useWishlistStore((s) => s.remove);

  return (
    <div className="container-tight py-12 lg:py-20">
      <div className="mb-10">
        <p className="h-eyebrow">Saved</p>
        <h1 className="h-display text-4xl md:text-6xl mt-3">
          Your wishlist.
        </h1>
        <p className="mt-3 text-charcoal-400 max-w-xl">
          {items.length === 0
            ? "No pieces saved yet. Tap the heart on anything that speaks to you."
            : `${items.length} piece${items.length === 1 ? "" : "s"} to revisit.`}
        </p>
      </div>

      {items.length === 0 ? (
        <div className="grid place-items-center py-20">
          <Link href="/shop">
            <Button size="lg">Browse the collection</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-10">
          <AnimatePresence>
            {items.map((item) => (
              <motion.div
                key={item.productId}
                layout
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <Link
                  href={`/product/${item.slug}`}
                  className="group block"
                >
                  <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-ivory-100">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="(max-width: 768px) 50vw, 25vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        remove(item.productId);
                      }}
                      className="absolute top-3 right-3 h-9 w-9 grid place-items-center rounded-full bg-ivory-50/85 backdrop-blur hover:bg-ivory-50"
                      aria-label="Remove from wishlist"
                    >
                      <FiTrash2 size={14} />
                    </button>
                  </div>
                  <p className="mt-4 font-display text-base leading-snug group-hover:text-brass">
                    {item.name}
                  </p>
                  <p className="text-sm tabular-nums mt-1">
                    {formatPrice(item.price)}
                  </p>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
