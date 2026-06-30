"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { FiFilter, FiX, FiSliders } from "react-icons/fi";
import { ProductGrid } from "@/components/product/ProductGrid";
import { PRODUCTS, ALL_CATEGORIES } from "@/lib/data/products";
import { cn } from "@/lib/utils";

const SIZES = ["XS", "S", "M", "L", "XL", "XXL", "28", "30", "32", "34", "36"];
const PRICE_RANGES = [
  { label: "Under ৳1500", min: 0, max: 1500 },
  { label: "৳1500 – ৳2500", min: 1500, max: 2500 },
  { label: "৳2500 – ৳4000", min: 2500, max: 4000 },
  { label: "Over ৳4000", min: 4000, max: 99999 },
];

const SORTS = [
  { id: "featured", label: "Featured" },
  { id: "price-asc", label: "Price: low to high" },
  { id: "price-desc", label: "Price: high to low" },
  { id: "rating", label: "Top rated" },
];

export default function ShopPage() {
  const params = useSearchParams();

  const initialCategory = params.get("category") || "";
  const [category, setCategory] = useState<string>(initialCategory);
  const [activeSizes, setActiveSizes] = useState<string[]>([]);
  const [priceBucket, setPriceBucket] = useState<number | null>(null);
  const [sort, setSort] = useState("featured");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const toggleSize = (s: string) =>
    setActiveSizes((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]
    );

  const filtered = useMemo(() => {
    let list = [...PRODUCTS];
    if (category) list = list.filter((p) => p.category === category);
    if (activeSizes.length > 0)
      list = list.filter((p) =>
        p.sizes.some((s) => activeSizes.includes(s))
      );
    if (priceBucket !== null) {
      const r = PRICE_RANGES[priceBucket];
      list = list.filter((p) => p.price >= r.min && p.price < r.max);
    }
    switch (sort) {
      case "price-asc":
        list.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        list.sort((a, b) => b.rating - a.rating);
        break;
    }
    return list;
  }, [category, activeSizes, priceBucket, sort]);

  const activeFilterCount =
    (category ? 1 : 0) +
    activeSizes.length +
    (priceBucket !== null ? 1 : 0);

  const FilterContent = () => (
    <div className="space-y-10">
      {/* Category */}
      <div>
        <p className="h-eyebrow mb-4">Category</p>
        <ul className="space-y-2">
          <li>
            <button
              onClick={() => setCategory("")}
              className={cn(
                "text-sm hover:text-brass transition-colors",
                !category && "text-brass"
              )}
            >
              All
            </button>
          </li>
          {ALL_CATEGORIES.map((c) => (
            <li key={c}>
              <button
                onClick={() => setCategory(c)}
                className={cn(
                  "text-sm hover:text-brass transition-colors",
                  category === c && "text-brass"
                )}
              >
                {c}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Size */}
      <div>
        <p className="h-eyebrow mb-4">Size</p>
        <div className="flex flex-wrap gap-2">
          {SIZES.map((s) => (
            <button
              key={s}
              onClick={() => toggleSize(s)}
              className={cn(
                "min-w-[44px] h-10 px-3 text-xs uppercase rounded-full border transition-colors",
                activeSizes.includes(s)
                  ? "bg-charcoal-500 text-ivory-50 border-charcoal-500"
                  : "border-charcoal-200 hover:border-charcoal-500"
              )}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Price */}
      <div>
        <p className="h-eyebrow mb-4">Price</p>
        <ul className="space-y-2">
          {PRICE_RANGES.map((r, i) => (
            <li key={r.label}>
              <button
                onClick={() =>
                  setPriceBucket(priceBucket === i ? null : i)
                }
                className={cn(
                  "text-sm hover:text-brass transition-colors",
                  priceBucket === i && "text-brass"
                )}
              >
                {r.label}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Reset */}
      {activeFilterCount > 0 && (
        <button
          onClick={() => {
            setCategory("");
            setActiveSizes([]);
            setPriceBucket(null);
          }}
          className="text-[11px] uppercase tracking-widest text-charcoal-400 hover:text-charcoal-500 border-b border-charcoal-300 pb-0.5"
        >
          Reset filters
        </button>
      )}
    </div>
  );

  return (
    <div className="container-tight py-12 lg:py-20">
      <div className="mb-10 lg:mb-14">
        <p className="h-eyebrow">Shop</p>
        <h1 className="h-display text-4xl md:text-6xl mt-3">
          {category || "The collection."}
        </h1>
        <p className="mt-3 text-charcoal-400 max-w-xl">
          {filtered.length} {filtered.length === 1 ? "piece" : "pieces"} in
          this edit.
        </p>
      </div>

      <div className="grid lg:grid-cols-[260px_1fr] gap-10 lg:gap-16">
        {/* Sidebar — desktop */}
        <aside className="hidden lg:block sticky top-32 self-start">
          <FilterContent />
        </aside>

        {/* Main */}
        <div>
          <div className="flex items-center justify-between mb-8 gap-4 border-t border-charcoal-100 pt-6">
            <button
              onClick={() => setMobileFiltersOpen(true)}
              className="lg:hidden inline-flex items-center gap-2 text-[11px] uppercase tracking-widest border border-charcoal-200 px-4 py-2 rounded-full"
            >
              <FiFilter size={14} />
              Filter
              {activeFilterCount > 0 && (
                <span className="ml-1 h-4 w-4 rounded-full bg-charcoal-500 text-ivory-50 text-[10px] grid place-items-center">
                  {activeFilterCount}
                </span>
              )}
            </button>

            <div className="ml-auto inline-flex items-center gap-3 text-[11px] uppercase tracking-widest">
              <FiSliders className="text-charcoal-400" />
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="bg-transparent border-b border-charcoal-200 pb-1 focus:border-charcoal-500 outline-none uppercase"
              >
                {SORTS.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="py-20 text-center">
              <p className="font-editorial text-3xl italic text-charcoal-300">
                Nothing matches yet.
              </p>
              <p className="mt-2 text-charcoal-400">
                Adjust the filters and try again.
              </p>
            </div>
          ) : (
            <ProductGrid products={filtered} cols={4} />
          )}
        </div>
      </div>

      {/* Mobile filter sheet */}
      {mobileFiltersOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[80] bg-charcoal-900/60 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileFiltersOpen(false)}
        >
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="absolute inset-x-0 bottom-0 max-h-[85vh] overflow-y-auto bg-ivory-50 rounded-t-3xl p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <p className="h-eyebrow">Filter</p>
              <button
                onClick={() => setMobileFiltersOpen(false)}
                className="p-2 -mr-2"
                aria-label="Close filters"
              >
                <FiX />
              </button>
            </div>
            <FilterContent />
            <button
              onClick={() => setMobileFiltersOpen(false)}
              className="mt-8 w-full h-12 rounded-full bg-charcoal-500 text-ivory-50 uppercase tracking-widest text-xs"
            >
              Show {filtered.length} pieces
            </button>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
