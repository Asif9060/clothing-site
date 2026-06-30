"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { ProductColor } from "@/lib/data/products";

type Props = {
  colors: ProductColor[];
  value: ProductColor;
  onChange: (c: ProductColor) => void;
  className?: string;
};

export function ColorSwatch({ colors, value, onChange, className }: Props) {
  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {colors.map((c) => {
        const selected = c.name === value.name;
        return (
          <motion.button
            key={c.name}
            type="button"
            onClick={() => onChange(c)}
            whileTap={{ scale: 0.92 }}
            className={cn(
              "group relative h-9 w-9 rounded-full border transition-all",
              selected
                ? "ring-1 ring-offset-2 ring-charcoal-500 ring-offset-ivory-50"
                : "ring-0"
            )}
            style={{
              backgroundColor: c.hex,
              borderColor: selected ? c.hex : "rgba(0,0,0,0.08)",
            }}
            aria-label={c.name}
            title={c.name}
          >
            <span className="sr-only">{c.name}</span>
          </motion.button>
        );
      })}
    </div>
  );
}
