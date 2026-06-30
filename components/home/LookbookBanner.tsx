"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { FiArrowUpRight } from "react-icons/fi";
import { Button } from "@/components/ui/Button";

export function LookbookBanner() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);

  return (
    <section
      ref={ref}
      className="relative h-[80vh] min-h-[520px] overflow-hidden my-24 lg:my-32"
    >
      <motion.div style={{ y }} className="absolute inset-x-0 -top-[10%] -bottom-[10%]">
        <Image
          src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=2000&h=1200&q=80"
          alt="Editorial banner"
          fill
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>
      <div className="absolute inset-0 bg-charcoal-900/40" />
      <div className="relative h-full container-tight flex items-center">
        <div className="max-w-2xl text-ivory-50">
          <p className="text-[11px] uppercase tracking-ultra text-ivory-50/80">
            Editorial · Volume IV
          </p>
          <h2 className="font-display text-5xl md:text-7xl mt-6 leading-[1.05]">
            Quiet for now.
            <br />
            <em className="font-editorial text-brass-light">
              Permanent later.
            </em>
          </h2>
          <p className="mt-6 text-ivory-50/80 max-w-md">
            An essay on the wardrobe pieces we make once — then make again,
            season after season.
          </p>
          <div className="mt-8 flex flex-wrap gap-4 items-center">
            <Link href="/blog/the-language-of-linen">
              <Button size="lg">Read the essay</Button>
            </Link>
            <Link
              href="/shop"
              className="text-[11px] uppercase tracking-widest text-ivory-50/90 border-b border-ivory-50/40 pb-1 hover:text-ivory-50"
            >
              Shop the edit
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
