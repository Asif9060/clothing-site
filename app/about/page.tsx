"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion } from "framer-motion";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { FiArrowUpRight } from "react-icons/fi";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const VALUES = [
  {
    n: "01",
    title: "Material first.",
    body: "We pick the cloth before the silhouette. If the mill doesn't take craft seriously, we don't take the order.",
  },
  {
    n: "02",
    title: "Small by design.",
    body: "We release in small runs. Pieces that don't sell aren't sold at a discount — they're retired.",
  },
  {
    n: "03",
    title: "Quiet, not shy.",
    body: "No logos. No banners. The confidence is in the cut, the cloth, the way it wears after a decade.",
  },
  {
    n: "04",
    title: "Made to be repaired.",
    body: "We mend our pieces for life. Send them back; we'll send them on.",
  },
];

export default function AboutPage() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.utils.toArray<HTMLElement>(".reveal").forEach((el) => {
        gsap.from(el, {
          y: 40,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        });
      });
    },
    { scope: ref }
  );

  return (
    <div ref={ref}>
      {/* Hero */}
      <section className="container-tight pt-8 pb-20 lg:pt-16 lg:pb-32">
        <p className="h-eyebrow">The maison</p>
        <h1 className="h-display text-5xl md:text-7xl lg:text-8xl mt-6 leading-[1] text-balance max-w-4xl">
          A quiet wardrobe,
          <br />
          <em className="font-editorial text-brass">made slowly.</em>
        </h1>
        <p className="mt-8 max-w-xl text-lg text-charcoal-400 leading-relaxed text-balance">
          LUMEN VESTIRE is a small menswear house. We design everyday pieces
          with the discipline of a wardrobe, not the runway — and we make
          them to outlast the trend that made us reach for them.
        </p>
      </section>

      {/* Spread 1 */}
      <section className="grid lg:grid-cols-2 gap-0 reveal">
        <div className="relative aspect-[4/5] lg:aspect-auto lg:min-h-[640px]">
          <Image
            src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=1400&h=1700&q=80"
            alt="The atelier"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
        <div className="bg-ivory-100 p-10 lg:p-20 flex items-center">
          <div>
            <p className="h-eyebrow">Founded 2020</p>
            <h2 className="h-display text-4xl md:text-5xl mt-4 text-balance">
              From a single shirt, a philosophy.
            </h2>
            <p className="mt-6 text-charcoal-400 leading-relaxed">
              We began in a small studio in Dhaka with one white shirt — and
              a question we still ask every season: would we recommend this
              to a friend?
            </p>
            <p className="mt-4 text-charcoal-400 leading-relaxed">
              Six years on, we're still answering that question. It's kept us
              small. It's kept us honest.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="container-tight py-24 lg:py-32">
        <SectionHeading
          eyebrow="Our values"
          title={
            <>
              Four things
              <br />
              <em className="font-editorial text-brass">we won't budge on.</em>
            </>
          }
        />
        <div className="grid sm:grid-cols-2 gap-10 lg:gap-14 mt-14">
          {VALUES.map((v) => (
            <div key={v.n} className="reveal">
              <p className="text-xs uppercase tracking-widest text-brass">
                — {v.n}
              </p>
              <h3 className="h-display text-3xl mt-3">{v.title}</h3>
              <p className="mt-4 text-charcoal-400 max-w-md leading-relaxed">
                {v.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Spread 2 */}
      <section className="grid lg:grid-cols-2 gap-0 reveal">
        <div className="bg-ivory-100 order-2 lg:order-1 p-10 lg:p-20 flex items-center">
          <div>
            <p className="h-eyebrow">Impact</p>
            <h2 className="h-display text-4xl md:text-5xl mt-4 text-balance">
              Quietly better,
              <br />
              season after season.
            </h2>
            <p className="mt-6 text-charcoal-400 leading-relaxed">
              88% of fabrics are now from regenerative or recycled sources.
              Every order ships in plastic-free packaging. We won't claim
              perfection — only that we keep reducing.
            </p>
            <Link href="/blog" className="mt-6 inline-block">
              <Button variant="outline" size="md">
                Read the journal
                <FiArrowUpRight className="ml-2" />
              </Button>
            </Link>
          </div>
        </div>
        <div className="relative aspect-[4/5] lg:aspect-auto lg:min-h-[640px] order-1 lg:order-2">
          <Image
            src="https://images.unsplash.com/photo-1582738411706-bfc8e691d1c2?auto=format&fit=crop&w=1400&h=1700&q=80"
            alt="Sustainable materials"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
      </section>

      {/* Quote */}
      <section className="container-tight py-24 lg:py-32 text-center reveal">
        <p className="font-editorial text-3xl md:text-5xl lg:text-6xl italic leading-tight max-w-3xl mx-auto text-balance">
          "We wanted clothes that earned their place. So we made them."
        </p>
        <p className="mt-6 text-xs uppercase tracking-ultra text-charcoal-400">
          — Hannan Reza, Founder
        </p>
      </section>
    </div>
  );
}
