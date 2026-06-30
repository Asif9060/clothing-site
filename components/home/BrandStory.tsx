"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FiArrowUpRight } from "react-icons/fi";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function BrandStory() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ref.current,
          start: "top 70%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      });
      tl.from(".story-eyebrow", { y: 30, opacity: 0, duration: 0.8 })
        .from(".story-title-line", {
          y: 80,
          opacity: 0,
          duration: 1,
          stagger: 0.1,
          ease: "power3.out",
        })
        .from(
          ".story-image",
          { scale: 1.1, opacity: 0, duration: 1.2 },
          "<0.2"
        )
        .from(".story-body", { y: 24, opacity: 0, duration: 0.8 }, "<0.4");
    },
    { scope: ref }
  );

  return (
    <section
      ref={ref}
      className="relative bg-ivory-100 py-24 lg:py-40 overflow-hidden"
    >
      <div className="container-tight grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
        <div className="lg:col-span-5 relative order-2 lg:order-1">
          <div className="story-image relative aspect-[4/5] overflow-hidden rounded-sm bg-ivory-200">
            <Image
              src="https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1400&h=1700&q=80"
              alt="Inside the Lumen Vestire atelier"
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover"
            />
          </div>
          <div className="story-image absolute -bottom-10 -right-6 lg:-right-12 w-40 lg:w-56 aspect-[3/4] overflow-hidden rounded-sm shadow-2xl">
            <Image
              src="https://images.unsplash.com/photo-1622445275463-afa2ab738c34?auto=format&fit=crop&w=800&h=1000&q=80"
              alt="Atelier detail"
              fill
              sizes="224px"
              className="object-cover"
            />
          </div>
        </div>

        <div className="lg:col-span-6 lg:col-start-7 order-1 lg:order-2">
          <p className="story-eyebrow h-eyebrow">The maison</p>
          <h2 className="h-display text-5xl md:text-6xl lg:text-7xl mt-6 text-balance">
            <span className="story-title-line block overflow-hidden">
              <span className="block">A quiet</span>
            </span>
            <span className="story-title-line block overflow-hidden">
              <span className="block italic font-editorial text-brass">
                wardrobe,
              </span>
            </span>
            <span className="story-title-line block overflow-hidden">
              <span className="block">made slowly.</span>
            </span>
          </h2>
          <div className="story-body mt-8 space-y-5 text-charcoal-400 max-w-lg">
            <p>
              LUMEN VESTIRE began with a single question: what would we
              recommend to a friend who wanted clothes that earned their
              place?
            </p>
            <p>
              Six years on, that question still shapes every pattern, every
              mill, every test garment. We work in small runs, with mills who
              share our patience.
            </p>
          </div>
          <Link
            href="/about"
            className="story-body mt-8 inline-flex items-center gap-2 text-[11px] uppercase tracking-widest border-b border-charcoal-500 pb-1 hover:text-brass hover:border-brass"
          >
            Inside the atelier <FiArrowUpRight />
          </Link>
        </div>
      </div>
    </section>
  );
}
