"use client";

import { FiStar } from "react-icons/fi";
import { cn } from "@/lib/utils";

export function Rating({
  value,
  count,
  size = 13,
  className,
}: {
  value: number;
  count?: number;
  size?: number;
  className?: string;
}) {
  const full = Math.floor(value);
  const half = value - full >= 0.5;

  return (
    <div className={cn("inline-flex items-center gap-1", className)}>
      <div className="flex items-center gap-[2px] text-brass">
        {Array.from({ length: 5 }).map((_, i) => {
          const filled = i < full || (i === full && half);
          return (
            <FiStar
              key={i}
              size={size}
              className={filled ? "fill-current" : "text-charcoal-200"}
            />
          );
        })}
      </div>
      {typeof count === "number" && (
        <span className="text-xs text-charcoal-400">({count})</span>
      )}
    </div>
  );
}
