"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";
import { ProductGrid } from "@/components/product/ProductGrid";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PRODUCTS, ALL_CATEGORIES } from "@/lib/data/products";

export function CategoryTabs() {
  const [active, setActive] = useState(0);
  const category = ALL_CATEGORIES[active];
  const products = PRODUCTS.filter((p) => p.category === category).slice(0, 8);

  return (
    <section className="container-tight py-24 lg:py-32">
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-12">
        <SectionHeading
          eyebrow="Edit"
          title={
            <>
              Browse by
              <br />
              <em className="font-editorial text-brass">category.</em>
            </>
          }
        />
        <Link
          href={`/shop?category=${encodeURIComponent(category)}`}
          className="self-start lg:self-end inline-flex items-center gap-2 text-[11px] uppercase tracking-widest hover:text-brass"
        >
          View all
          <FiArrowUpRight />
        </Link>
      </div>

      {/* Tabs */}
      <div className="relative mb-12 overflow-x-auto mask-fade-x">
        <div className="flex items-center gap-2 min-w-max">
          {ALL_CATEGORIES.map((cat, i) => {
            const selected = i === active;
            return (
              <button
                key={cat}
                onClick={() => setActive(i)}
                className={`relative px-5 py-3 text-[12px] uppercase tracking-widest rounded-full transition-colors ${
                  selected
                    ? "text-ivory-50"
                    : "text-charcoal-500 hover:bg-ivory-100"
                }`}
              >
                {selected && (
                  <motion.span
                    layoutId="catPill"
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0 bg-charcoal-500 rounded-full"
                  />
                )}
                <span className="relative">{cat}</span>
              </button>
            );
          })}
        </div>
      </div>

      <motion.div
        key={category}
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <ProductGrid products={products} cols={4} />
      </motion.div>
    </section>
  );
}
