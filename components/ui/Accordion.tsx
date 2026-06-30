"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { FiPlus } from "react-icons/fi";
import { cn } from "@/lib/utils";

export type AccordionItem = {
  title: string;
  body: React.ReactNode;
};

export function Accordion({
  items,
  defaultOpen = 0,
  className,
}: {
  items: AccordionItem[];
  defaultOpen?: number;
  className?: string;
}) {
  const [open, setOpen] = useState<number | null>(defaultOpen);

  return (
    <div className={cn("divide-y divide-charcoal-200/70", className)}>
      {items.map((item, idx) => {
        const isOpen = open === idx;
        return (
          <div key={item.title}>
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : idx)}
              className="w-full flex items-center justify-between py-5 text-left"
              aria-expanded={isOpen}
            >
              <span className="text-xs uppercase tracking-widest text-charcoal-500">
                {item.title}
              </span>
              <FiPlus
                className={cn(
                  "transition-transform duration-300",
                  isOpen && "rotate-45"
                )}
              />
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <div className="pb-6 pr-8 text-sm text-charcoal-400 leading-relaxed">
                    {item.body}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
