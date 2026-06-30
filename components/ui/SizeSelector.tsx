"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type Props = {
  sizes: string[];
  value: string;
  onChange: (s: string) => void;
  className?: string;
};

export function SizeSelector({ sizes, value, onChange, className }: Props) {
  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {sizes.map((s) => {
        const selected = value === s;
        return (
          <motion.button
            key={s}
            type="button"
            whileTap={{ scale: 0.95 }}
            onClick={() => onChange(s)}
            className={cn(
              "min-w-[52px] h-11 px-4 text-xs uppercase tracking-widest rounded-full border transition-colors duration-200",
              selected
                ? "bg-charcoal-500 text-ivory-50 border-charcoal-500"
                : "bg-transparent text-charcoal-500 border-charcoal-200 hover:border-charcoal-500"
            )}
          >
            {s}
          </motion.button>
        );
      })}
    </div>
  );
}
