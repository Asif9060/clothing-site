"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [focused, setFocused] = useState(false);
  const [done, setDone] = useState(false);

  return (
    <section className="container-tight py-24 lg:py-32">
      <div className="bg-sand-light rounded-3xl p-10 lg:p-20 grid lg:grid-cols-2 gap-10 items-center">
        <div>
          <p className="h-eyebrow">Stay close</p>
          <h2 className="h-display text-4xl md:text-5xl mt-3">
            Letters from
            <br />
            <em className="font-editorial text-brass">the workshop.</em>
          </h2>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (email) setDone(true);
          }}
        >
          <p className="text-charcoal-400 max-w-md">
            Four issues a year. Silhouettes before they hit the floor,
            materials we're studying, and the occasional note from the
            pattern room.
          </p>
          <div
            className={`mt-6 flex items-end border-b transition-colors ${
              focused ? "border-charcoal-500" : "border-charcoal-300"
            }`}
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              placeholder="Your email"
              className="flex-1 bg-transparent text-lg py-3 outline-none placeholder:text-charcoal-300"
            />
            <button
              type="submit"
              className="text-[11px] uppercase tracking-widest hover:text-brass transition-colors pb-3"
            >
              Subscribe →
            </button>
          </div>
          {done && (
            <motion.p
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-3 text-xs uppercase tracking-widest text-brass"
            >
              ✓ Welcome — first letter on launch day.
            </motion.p>
          )}
        </form>
      </div>
    </section>
  );
}
