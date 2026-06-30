"use client";

import { create } from "zustand";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FiSearch, FiX } from "react-icons/fi";
import { useState, useEffect, useMemo } from "react";
import { PRODUCTS } from "@/lib/data/products";
import { formatPrice, cn } from "@/lib/utils";

type State = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
};

export const useSearchOverlay = create<State>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
  toggle: () => set((s) => ({ isOpen: !s.isOpen })),
}));

export function SearchOverlay() {
  const isOpen = useSearchOverlay((s) => s.isOpen);
  const close = useSearchOverlay((s) => s.close);
  const [q, setQ] = useState("");

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        useSearchOverlay.getState().toggle();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [close]);

  const results = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return PRODUCTS.slice(0, 6);
    return PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(term) ||
        p.category.toLowerCase().includes(term) ||
        p.tags.some((t) => t.toLowerCase().includes(term))
    ).slice(0, 8);
  }, [q]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={close}
            className="fixed inset-0 z-[60] bg-charcoal-900/60 backdrop-blur-md"
          />
          <motion.div
            initial={{ y: -40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -40, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-0 left-0 right-0 z-[70] bg-ivory-50 border-b border-charcoal-100"
          >
            <div className="container-tight py-8">
              <div className="flex items-center justify-between mb-6">
                <p className="h-eyebrow">Search</p>
                <button
                  aria-label="Close search"
                  onClick={close}
                  className="p-2 hover:bg-ivory-100 rounded-full"
                >
                  <FiX size={20} />
                </button>
              </div>
              <div className="flex items-center gap-4 border-b border-charcoal-300 pb-4">
                <FiSearch size={22} className="text-charcoal-300" />
                <input
                  autoFocus
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Search pieces, categories, materials…"
                  className="flex-1 bg-transparent outline-none font-display text-2xl md:text-3xl placeholder:text-charcoal-200"
                />
                <span className="hidden sm:inline-block px-2 py-1 rounded bg-ivory-100 text-[10px] tracking-widest uppercase text-charcoal-400">
                  Esc
                </span>
              </div>
              <div className="mt-6">
                <p className="h-eyebrow mb-4">
                  {q ? `Results · ${results.length}` : "Suggested"}
                </p>
                {results.length === 0 ? (
                  <p className="text-charcoal-400 italic font-editorial text-xl">
                    No matches in the atelier.
                  </p>
                ) : (
                  <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {results.map((p) => (
                      <li key={p.id}>
                        <Link
                          href={`/product/${p.slug}`}
                          onClick={close}
                          className="group block"
                        >
                          <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-ivory-100">
                            <Image
                              src={p.images[0]}
                              alt={p.name}
                              fill
                              sizes="(max-width: 768px) 50vw, 25vw"
                              className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                          </div>
                          <p className="mt-2 font-display text-sm">
                            {p.name}
                          </p>
                          <p className="mt-0.5 text-xs text-charcoal-400">
                            {p.category} · {formatPrice(p.price)}
                          </p>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
