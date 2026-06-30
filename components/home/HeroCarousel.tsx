"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowRight, FiArrowLeft } from "react-icons/fi";
import { Button } from "@/components/ui/Button";

const SLIDES = [
  {
    eyebrow: "Winter Atelier · 2026",
    title: "Worn light,\nmade slowly.",
    description:
      "An heirloom overcoat in graphite Italian wool. Hand-finished throughout, designed to outlast a decade.",
    cta: { label: "Discover the coat", href: "/product/graphite-overcoat" },
    secondary: { label: "View winter", href: "/shop?category=Winter" },
    image: "https://images.unsplash.com/photo-1611312449408-fcece27cdbb7?auto=format&fit=crop&w=1800&h=2200&q=80",
    align: "left" as const,
  },
  {
    eyebrow: "The Panjabi Capsule",
    title: "Embroidery,\nin service\nof restraint.",
    description:
      "Hand-finished pearl panjabi — limited numbered release for the season's quiet occasions.",
    cta: { label: "Shop panjabi", href: "/shop?category=Panjabi" },
    secondary: { label: "Read the story", href: "/blog/the-panjabi-reimagined" },
    image: "https://images.unsplash.com/photo-1604644401890-0bd678c83788?auto=format&fit=crop&w=1800&h=2200&q=80",
    align: "right" as const,
  },
  {
    eyebrow: "Pima Essentials",
    title: "The last\nwhite tee\nyou'll buy.",
    description:
      "Heavyweight Peruvian Pima in a tubular body. Pre-shrunk, reinforced collar, designed for the long game.",
    cta: { label: "Shop tees", href: "/shop?category=T-Shirts" },
    secondary: { label: "Why Pima", href: "/blog/on-quiet-luxury" },
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1800&h=2200&q=80",
    align: "left" as const,
  },
];

export function HeroCarousel() {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const next = () => {
    setDirection(1);
    setActive((p) => (p + 1) % SLIDES.length);
  };
  const prev = () => {
    setDirection(-1);
    setActive((p) => (p - 1 + SLIDES.length) % SLIDES.length);
  };

  useEffect(() => {
    intervalRef.current = setInterval(next, 6500);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const restartAuto = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(next, 6500);
  };

  const slide = SLIDES[active];

  return (
    <section className="relative w-full h-[78vh] min-h-[560px] max-h-[820px] overflow-hidden bg-charcoal-900">
      {/* Backgrounds */}
      <AnimatePresence custom={direction} mode="sync">
        <motion.div
          key={active}
          custom={direction}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          <Image
            src={slide.image}
            alt={slide.title.replace("\n", " ")}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal-900/40 via-charcoal-900/20 to-charcoal-900/0" />
        </motion.div>
      </AnimatePresence>

      {/* Slide content */}
      <div className="relative h-full container-tight flex items-end pb-16 lg:pb-24">
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-2xl text-ivory-50"
          >
            <p className="text-[11px] uppercase tracking-ultra text-ivory-50/80">
              {slide.eyebrow}
            </p>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl xl:text-8xl mt-6 leading-[1.02] text-balance whitespace-pre-line">
              {slide.title}
            </h1>
            <p className="mt-6 text-ivory-50/85 max-w-md text-balance">
              {slide.description}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link href={slide.cta.href}>
                <Button size="lg">
                  {slide.cta.label}
                  <FiArrowRight className="ml-2" />
                </Button>
              </Link>
              <Link
                href={slide.secondary.href}
                className="text-[11px] uppercase tracking-widest text-ivory-50/80 hover:text-ivory-50 border-b border-ivory-50/30 pb-1"
              >
                {slide.secondary.label}
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div className="absolute right-6 lg:right-12 bottom-8 flex items-center gap-3">
        <div className="hidden lg:flex items-center gap-2 mr-4">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setDirection(i > active ? 1 : -1);
                setActive(i);
                restartAuto();
              }}
              className={`h-px w-10 transition-all ${
                i === active ? "bg-ivory-50" : "bg-ivory-50/30"
              }`}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
        <button
          onClick={() => {
            prev();
            restartAuto();
          }}
          aria-label="Previous slide"
          className="h-11 w-11 rounded-full bg-ivory-50/10 backdrop-blur border border-ivory-50/30 grid place-items-center text-ivory-50 hover:bg-ivory-50/20 transition"
        >
          <FiArrowLeft size={16} />
        </button>
        <button
          onClick={() => {
            next();
            restartAuto();
          }}
          aria-label="Next slide"
          className="h-11 w-11 rounded-full bg-ivory-50/10 backdrop-blur border border-ivory-50/30 grid place-items-center text-ivory-50 hover:bg-ivory-50/20 transition"
        >
          <FiArrowRight size={16} />
        </button>
      </div>

      {/* Slide counter */}
      <div className="absolute top-8 right-6 lg:right-12 text-ivory-50/80 text-[11px] uppercase tracking-widest tabular-nums">
        <span className="text-ivory-50">{String(active + 1).padStart(2, "0")}</span>
        <span className="mx-2">/</span>
        {String(SLIDES.length).padStart(2, "0")}
      </div>
    </section>
  );
}
