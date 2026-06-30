"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { FiArrowUpRight } from "react-icons/fi";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProductGrid } from "@/components/product/ProductGrid";
import { PRODUCTS } from "@/lib/data/products";
import { Button } from "@/components/ui/Button";

export function NewDropsStrip() {
  const newDrops = PRODUCTS.filter((p) => p.isNew).slice(0, 8);
  const trending = PRODUCTS.filter((p) => p.isTrending).slice(0, 4);
  const lookbookRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: lookbookRef,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section className="bg-ivory-100 py-24 lg:py-32">
      <div className="container-tight">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-20 mb-14">
          <SectionHeading
            eyebrow="Just arrived"
            title={
              <>
                New
                <br />
                drops.
              </>
            }
          />
          <div className="lg:pt-10">
            <SectionHeading
              eyebrow="Most trending"
              title={
                <>
                  Pieces
                  <br />
                  we're
                  <em className="font-editorial text-brass"> wearing.</em>
                </>
              }
            />
          </div>
        </div>

        <div className="grid lg:grid-cols-5 gap-10">
          <div className="lg:col-span-3">
            <ProductGrid products={newDrops.slice(0, 4)} cols={2} />
          </div>
          <div className="lg:col-span-2 relative" ref={lookbookRef}>
            <motion.div style={{ y }} className="sticky top-32">
              <Link href="/blog/the-panjabi-reimagined" className="group block">
                <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-ivory-200">
                  <Image
                    src="https://images.unsplash.com/photo-1593038303046-7c5f3aaea1d3?auto=format&fit=crop&w=1200&h=1500&q=80"
                    alt="Lumen Vestire lookbook"
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover transition-transform duration-1000 group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/40 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6 text-ivory-50">
                    <p className="text-[11px] uppercase tracking-ultra text-ivory-50/70">
                      Lookbook · 04
                    </p>
                    <p className="font-display text-3xl mt-2 leading-tight">
                      The Panjabi, reimagined
                    </p>
                    <span className="mt-3 inline-flex items-center gap-2 text-[11px] uppercase tracking-widest border-b border-ivory-50/40 pb-1">
                      Read essay <FiArrowUpRight />
                    </span>
                  </div>
                </div>
              </Link>

              <div className="mt-10">
                <p className="h-eyebrow">Trending this week</p>
                <ul className="mt-4 divide-y divide-charcoal-200">
                  {trending.map((p, i) => (
                    <li key={p.id}>
                      <Link
                        href={`/product/${p.slug}`}
                        className="flex items-center gap-4 py-3 group"
                      >
                        <span className="text-xs text-charcoal-400 tabular-nums w-6">
                          0{i + 1}
                        </span>
                        <span className="relative h-14 w-12 overflow-hidden rounded bg-ivory-50 shrink-0">
                          <Image
                            src={p.images[0]}
                            alt=""
                            fill
                            sizes="48px"
                            className="object-cover"
                          />
                        </span>
                        <span className="flex-1">
                          <span className="block font-display text-sm group-hover:text-brass">
                            {p.name}
                          </span>
                          <span className="block text-[11px] uppercase tracking-widest text-charcoal-400">
                            {p.category}
                          </span>
                        </span>
                        <span className="text-sm tabular-nums">
                          ৳{p.price.toLocaleString()}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="mt-16 flex justify-center">
          <Link href="/shop">
            <Button variant="outline" size="lg">
              View all seasonal pieces
              <FiArrowUpRight className="ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
