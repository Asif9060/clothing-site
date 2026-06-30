"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CATEGORIES } from "@/lib/data/categories";

// Per-card layout map — every cell is square on md+, so the grid stays tidy.
// Mobile collapses to a flat 2-col list.
type Cell = {
  size: string; // tailwind classes for aspect ratio at md+
  mobileSize: string; // tailwind classes for aspect ratio at <md
  span?: string; // grid placement classes (md+)
};

const CELL_MAP: Cell[] = [
  // Row 1: Shirts (tall, 2x) | Pants | Panjabi | T-Shirts
  {
    mobileSize: "aspect-[3/4]",
    size: "aspect-[3/4]",
    span: "md:row-span-2",
  },
  { mobileSize: "aspect-[3/4]", size: "aspect-square" },
  { mobileSize: "aspect-[3/4]", size: "aspect-square" },
  { mobileSize: "aspect-[3/4]", size: "aspect-square" },
  // Row 2 (under Shirts): Knit Polos, Katua
  { mobileSize: "aspect-[3/4]", size: "aspect-square" },
  { mobileSize: "aspect-[3/4]", size: "aspect-square" },
  // Row 3: Winter (full-width banner on md+)
  {
    mobileSize: "aspect-[3/4]",
    size: "aspect-[16/9]",
    span: "md:col-span-2",
  },
];

export function ShowByCategory() {
  return (
    <section className="container-tight py-24 lg:py-32">
      <div className="text-center mb-14">
        <SectionHeading
          align="center"
          eyebrow="Edit the wardrobe"
          title={
            <>
              Show
              <em className="font-editorial text-brass"> by category.</em>
            </>
          }
          description="Seven lines, one philosophy — every category considered down to the last seam."
        />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        {CATEGORIES.map((c, idx) => {
          const cell = CELL_MAP[idx] ?? CELL_MAP[CELL_MAP.length - 1];
          return (
            <motion.div
              key={c.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.6,
                delay: idx * 0.06,
                ease: [0.22, 1, 0.36, 1],
              }}
              className={cell.span ?? ""}
            >
              <Link
                href={`/shop?category=${encodeURIComponent(c.name)}`}
                className={`group relative block overflow-hidden bg-ivory-200 rounded-sm ${cell.mobileSize} md:${cell.size}`}
              >
                <Image
                  src={c.image}
                  alt={c.name}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.06]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/65 via-charcoal-900/0 to-transparent" />
                <div className="absolute inset-x-4 bottom-4 text-ivory-50">
                  <p className="text-[10px] md:text-[11px] uppercase tracking-ultra text-ivory-50/75">
                    {c.subtitle}
                  </p>
                  <div className="flex items-end justify-between mt-2">
                    <h3 className="font-display text-xl md:text-2xl lg:text-3xl">
                      {c.name}
                    </h3>
                    <FiArrowUpRight className="opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
