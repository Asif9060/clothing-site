"use client";

import { motion } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";

export function PromoBar() {
  const messages = [
    "Complimentary shipping over ৳3000",
    "New season: Winter Atelier 2026 is here",
    "Members earn 2× points this week",
  ];

  return (
    <div className="relative bg-charcoal-900 text-ivory-50 overflow-hidden">
      <motion.div
        className="flex whitespace-nowrap py-2.5 text-[11px] tracking-widest uppercase"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          duration: 40,
          ease: "linear",
          repeat: Infinity,
        }}
      >
        {[...messages, ...messages, ...messages, ...messages].map((m, i) => (
          <span
            key={i}
            className="mx-12 inline-flex items-center gap-3 opacity-90"
          >
            <span className="h-1 w-1 rounded-full bg-brass-light" />
            {m}
            <FiArrowUpRight className="opacity-60" />
          </span>
        ))}
      </motion.div>
    </div>
  );
}
