"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FiInstagram, FiFacebook, FiYoutube } from "react-icons/fi";
import { useState } from "react";

const COLUMNS = [
  {
    title: "Maison",
    links: [
      { name: "Our atelier", href: "/about" },
      { name: "Sustainability", href: "/about#impact" },
      { name: "Press", href: "/blog" },
      { name: "Careers", href: "/contact" },
    ],
  },
  {
    title: "Service",
    links: [
      { name: "Contact us", href: "/contact" },
      { name: "Shipping & returns", href: "/contact#shipping" },
      { name: "Size guide", href: "/contact#sizing" },
      { name: "Care guide", href: "/blog" },
    ],
  },
  {
    title: "Discover",
    links: [
      { name: "Shop all", href: "/shop" },
      { name: "Shirts", href: "/shop?category=Shirts" },
      { name: "Panjabi", href: "/shop?category=Panjabi" },
      { name: "Winter atelier", href: "/shop?category=Winter" },
    ],
  },
];

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  return (
    <footer className="relative bg-charcoal-900 text-ivory-100 mt-32 overflow-hidden">
      {/* Top divider */}
      <div className="container-tight">
        <div className="h-px bg-ivory-50/10" />
      </div>

      {/* Newsletter */}
      <section className="container-tight py-20 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-center">
          <div>
            <p className="text-[11px] uppercase tracking-ultra text-ivory-100/60">
              Letters from the atelier
            </p>
            <h2 className="mt-4 font-display text-4xl md:text-5xl text-balance">
              Receive the season's first look.
            </h2>
            <p className="mt-4 text-ivory-100/60 max-w-md">
              Four considered issues a year. No noise, no churn — just
              silhouettes, materials, and stories from the workshop.
            </p>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (email) setSubscribed(true);
            }}
            className="space-y-4"
          >
            <div className="flex items-center border-b border-ivory-100/30 pb-3">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                className="flex-1 bg-transparent text-ivory-50 placeholder:text-ivory-100/40 outline-none text-lg"
              />
              <button
                type="submit"
                className="ml-4 text-[11px] uppercase tracking-widest hover:text-brass transition-colors"
              >
                Subscribe →
              </button>
            </div>
            {subscribed && (
              <motion.p
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-brass-light text-xs uppercase tracking-widest"
              >
                ✓ Welcome. First letter arrives soon.
              </motion.p>
            )}
            <p className="text-[11px] text-ivory-100/40">
              By subscribing you accept our Privacy Policy.
            </p>
          </form>
        </div>
      </section>

      <div className="container-tight">
        <div className="h-px bg-ivory-50/10" />
      </div>

      {/* Columns */}
      <section className="container-tight py-16 lg:py-20 grid grid-cols-2 lg:grid-cols-6 gap-10">
        <div className="col-span-2">
          <Link
            href="/"
            className="font-display text-2xl tracking-[0.2em] uppercase"
          >
            Lumen<span className="text-brass-light">·</span>Vestire
          </Link>
          <p className="mt-4 text-ivory-100/60 text-sm max-w-xs">
            A quiet menswear house. We design everyday pieces with the
            discipline of the wardrobe, not the runway.
          </p>
          <div className="flex items-center gap-3 mt-6">
            {[FiInstagram, FiFacebook, FiYoutube].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="grid place-items-center h-9 w-9 rounded-full bg-ivory-50/5 hover:bg-brass transition-colors"
                aria-label="Social"
              >
                <Icon size={14} />
              </a>
            ))}
          </div>
        </div>

        {COLUMNS.map((col) => (
          <div key={col.title} className="col-span-1">
            <h4 className="text-[11px] uppercase tracking-ultra text-ivory-100/60 mb-5">
              {col.title}
            </h4>
            <ul className="space-y-3">
              {col.links.map((l) => (
                <li key={l.name}>
                  <Link
                    href={l.href}
                    className="text-sm text-ivory-100/85 hover:text-brass-light transition-colors"
                  >
                    {l.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <div className="container-tight">
        <div className="h-px bg-ivory-50/10" />
      </div>

      <section className="container-tight py-8 flex flex-col-reverse md:flex-row items-start md:items-center justify-between gap-6">
        <p className="text-xs text-ivory-100/50">
          © 2026 LUMEN VESTIRE. All rights reserved.
        </p>
        <div className="flex items-center gap-6 text-xs text-ivory-100/50">
          <Link href="#" className="hover:text-ivory-50">
            Privacy
          </Link>
          <Link href="#" className="hover:text-ivory-50">
            Terms
          </Link>
          <Link href="#" className="hover:text-ivory-50">
            Cookies
          </Link>
        </div>
      </section>
    </footer>
  );
}
