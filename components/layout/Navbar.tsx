"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiSearch,
  FiUser,
  FiHeart,
  FiShoppingBag,
  FiMenu,
} from "react-icons/fi";
import { useCartStore } from "@/lib/store/cartStore";
import { useWishlistStore } from "@/lib/store/wishlistStore";
import { useSearchOverlay } from "@/components/layout/SearchOverlay";
import { useMobileMenu } from "@/components/layout/MobileMenu";
import { CATEGORIES } from "@/lib/data/categories";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { name: "Shop", href: "/shop" },
  { name: "Atelier", href: "/about" },
  { name: "Journal", href: "/blog" },
  { name: "Outlets", href: "/contact" },
];

export function Navbar() {
  const cartItems = useCartStore((s) => s.items);
  const wishItems = useWishlistStore((s) => s.items);
  const openCart = useCartStore((s) => s.open);

  const openSearch = useSearchOverlay((s) => s.open);
  const openMobile = useMobileMenu((s) => s.open);

  const [scrolled, setScrolled] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const cartCount = cartItems.reduce((acc, i) => acc + i.quantity, 0);
  const wishCount = wishItems.length;

  return (
    <>
      <header
        className={cn(
          "fixed top-8 left-0 right-0 z-40 transition-all duration-300",
          scrolled && "top-0"
        )}
      >
        <div
          className={cn(
            "transition-all duration-300 border-b",
            scrolled
              ? "bg-ivory-50/85 backdrop-blur-xl border-charcoal-100/70"
              : "bg-ivory-50/60 backdrop-blur-md border-transparent"
          )}
        >
          <div className="container-tight flex items-center justify-between h-16 lg:h-20">
            {/* Mobile menu trigger */}
            <button
              aria-label="Open menu"
              onClick={openMobile}
              className="lg:hidden p-2 -ml-2"
            >
              <FiMenu size={20} />
            </button>

            {/* Logo */}
            <Link
              href="/"
              className="font-display text-xl lg:text-2xl tracking-[0.2em] uppercase"
            >
              Lumen<span className="text-brass">·</span>Vestire
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-10 text-[11px] uppercase tracking-widest">
              <div
                className="relative"
                onMouseEnter={() => setHoveredCategory(true)}
                onMouseLeave={() => setHoveredCategory(false)}
              >
                <Link
                  href="/shop"
                  className="hover:text-brass transition-colors"
                >
                  Shop
                </Link>
                <AnimatePresence>
                  {hoveredCategory && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.18 }}
                      className="absolute top-full left-1/2 -translate-x-1/2 pt-4"
                    >
                      <div className="bg-ivory-50 border border-charcoal-100 shadow-2xl shadow-charcoal-500/5 rounded-2xl p-6 grid grid-cols-7 gap-6 min-w-[820px]">
                        {CATEGORIES.map((c) => (
                          <Link
                            key={c.slug}
                            href={`/shop?category=${encodeURIComponent(c.name)}`}
                            className="group block w-32"
                          >
                            <div className="aspect-[3/4] overflow-hidden rounded-lg bg-ivory-100">
                              <img
                                src={c.image}
                                alt={c.name}
                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                loading="lazy"
                              />
                            </div>
                            <p className="mt-2 text-charcoal-500 text-[11px] uppercase tracking-widest group-hover:text-brass transition-colors">
                              {c.name}
                            </p>
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {NAV_LINKS.slice(1).map((l) => (
                <Link
                  key={l.name}
                  href={l.href}
                  className="hover:text-brass transition-colors"
                >
                  {l.name}
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-1 sm:gap-2">
              <button
                aria-label="Search"
                onClick={openSearch}
                className="p-2 hover:bg-ivory-100 rounded-full transition-colors"
              >
                <FiSearch size={18} />
              </button>
              <Link
                aria-label="Account"
                href="/contact"
                className="hidden sm:inline-flex p-2 hover:bg-ivory-100 rounded-full transition-colors"
              >
                <FiUser size={18} />
              </Link>
              <Link
                aria-label="Wishlist"
                href="/wishlist"
                className="relative p-2 hover:bg-ivory-100 rounded-full transition-colors"
              >
                <FiHeart size={18} />
                {wishCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 min-w-[16px] h-4 px-1 rounded-full bg-charcoal-500 text-ivory-50 text-[10px] grid place-items-center">
                    {wishCount}
                  </span>
                )}
              </Link>
              <button
                aria-label="Cart"
                onClick={openCart}
                className="relative p-2 hover:bg-ivory-100 rounded-full transition-colors"
              >
                <FiShoppingBag size={18} />
                {cartCount > 0 && (
                  <motion.span
                    key={cartCount}
                    initial={{ scale: 0.6, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="absolute -top-0.5 -right-0.5 min-w-[16px] h-4 px-1 rounded-full bg-charcoal-500 text-ivory-50 text-[10px] grid place-items-center"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
