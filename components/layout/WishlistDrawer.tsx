"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiTrash2 } from "react-icons/fi";
import { useWishlistStore } from "@/lib/store/wishlistStore";
import { formatPrice } from "@/lib/utils";

export function WishlistDrawer() {
  const isOpen = useWishlistStore((s) => s.isOpen);
  const close = useWishlistStore((s) => s.close);
  const items = useWishlistStore((s) => s.items);
  const remove = useWishlistStore((s) => s.remove);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={close}
            className="fixed inset-0 z-[60] bg-charcoal-900/40 backdrop-blur-sm"
          />
          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-0 left-0 z-[70] h-full w-full sm:w-[440px] bg-ivory-50 shadow-2xl flex flex-col"
            aria-label="Wishlist"
          >
            <header className="flex items-center justify-between px-6 py-5 border-b border-charcoal-100">
              <div>
                <p className="h-eyebrow">Saved</p>
                <h3 className="font-display text-2xl mt-1">
                  Wishlist{" "}
                  <span className="text-charcoal-400">({items.length})</span>
                </h3>
              </div>
              <button
                aria-label="Close wishlist"
                onClick={close}
                className="p-2 -mr-2 hover:bg-ivory-100 rounded-full"
              >
                <FiX size={20} />
              </button>
            </header>

            {items.length === 0 ? (
              <div className="flex-1 grid place-items-center px-6">
                <div className="text-center">
                  <p className="font-editorial text-3xl italic text-charcoal-300">
                    Quiet for now.
                  </p>
                  <p className="mt-2 text-sm text-charcoal-400">
                    Save pieces to revisit them later.
                  </p>
                </div>
              </div>
            ) : (
              <ul className="flex-1 overflow-y-auto divide-y divide-charcoal-100">
                {items.map((item) => (
                  <li
                    key={item.productId}
                    className="flex gap-4 px-6 py-5 hover:bg-ivory-100/40 transition-colors"
                  >
                    <Link
                      href={`/product/${item.slug}`}
                      onClick={close}
                      className="relative h-28 w-24 rounded-md overflow-hidden bg-ivory-100 shrink-0"
                    >
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="96px"
                        className="object-cover"
                      />
                    </Link>
                    <div className="flex-1 min-w-0">
                      <p className="font-display text-base leading-tight">
                        {item.name}
                      </p>
                      <p className="mt-1 text-sm font-medium tabular-nums">
                        {formatPrice(item.price)}
                      </p>
                      <Link
                        href={`/product/${item.slug}`}
                        onClick={close}
                        className="mt-3 inline-block text-[11px] uppercase tracking-widest text-brass hover:text-charcoal-500"
                      >
                        View piece →
                      </Link>
                    </div>
                    <button
                      onClick={() => remove(item.productId)}
                      aria-label="Remove from wishlist"
                      className="text-charcoal-300 hover:text-charcoal-500 self-start"
                    >
                      <FiTrash2 size={16} />
                    </button>
                  </li>
                ))}
              </ul>
            )}

            <footer className="border-t border-charcoal-100 px-6 py-5">
              <Link
                href="/wishlist"
                onClick={close}
                className="block text-center text-xs uppercase tracking-widest text-charcoal-400 hover:text-charcoal-500"
              >
                Open full wishlist
              </Link>
            </footer>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
