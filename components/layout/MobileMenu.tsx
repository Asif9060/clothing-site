"use client";

import Link from "next/link";
import { create } from "zustand";
import { motion, AnimatePresence } from "framer-motion";
import { FiX } from "react-icons/fi";
import { CATEGORIES } from "@/lib/data/categories";

type State = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
};

export const useMobileMenu = create<State>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
  toggle: () => set((s) => ({ isOpen: !s.isOpen })),
}));

const links = [
  { name: "Shop all", href: "/shop" },
  { name: "Atelier", href: "/about" },
  { name: "Journal", href: "/blog" },
  { name: "Outlets & Contact", href: "/contact" },
  { name: "Wishlist", href: "/wishlist" },
];

export function MobileMenu() {
  const isOpen = useMobileMenu((s) => s.isOpen);
  const close = useMobileMenu((s) => s.close);

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
            className="fixed inset-0 z-[60] bg-charcoal-900/40 backdrop-blur-sm lg:hidden"
          />
          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-0 left-0 bottom-0 z-[70] w-[85%] max-w-[360px] bg-ivory-50 shadow-2xl flex flex-col lg:hidden"
          >
            <header className="flex items-center justify-between px-6 py-5 border-b border-charcoal-100">
              <span className="font-display text-xl tracking-[0.2em] uppercase">
                Lumen·Vestire
              </span>
              <button
                aria-label="Close menu"
                onClick={close}
                className="p-2 -mr-2 hover:bg-ivory-100 rounded-full"
              >
                <FiX size={20} />
              </button>
            </header>
            <nav className="flex-1 overflow-y-auto px-6 py-8">
              <p className="h-eyebrow">Menu</p>
              <ul className="mt-6 space-y-4">
                {links.map((l) => (
                  <li key={l.name}>
                    <Link
                      href={l.href}
                      onClick={close}
                      className="block font-display text-2xl hover:text-brass"
                    >
                      {l.name}
                    </Link>
                  </li>
                ))}
              </ul>

              <p className="h-eyebrow mt-10">Categories</p>
              <ul className="mt-4 grid grid-cols-2 gap-3">
                {CATEGORIES.map((c) => (
                  <li key={c.slug}>
                    <Link
                      href={`/shop?category=${encodeURIComponent(c.name)}`}
                      onClick={close}
                      className="block bg-ivory-100 rounded-lg p-3 hover:bg-ivory-200 transition-colors"
                    >
                      <p className="text-xs uppercase tracking-widest">
                        {c.name}
                      </p>
                      <p className="mt-1 text-[11px] text-charcoal-400">
                        {c.subtitle}
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <footer className="border-t border-charcoal-100 px-6 py-5 text-xs text-charcoal-400">
              <p>Customer care · +880 1707 579207</p>
              <p>hello@lumenvestire.com</p>
            </footer>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
