"use client";

import { FiMinus, FiPlus } from "react-icons/fi";
import { cn } from "@/lib/utils";

type Props = {
  value: number;
  onChange: (n: number) => void;
  min?: number;
  max?: number;
  className?: string;
};

export function QuantityStepper({
  value,
  onChange,
  min = 1,
  max = 99,
  className,
}: Props) {
  return (
    <div
      className={cn(
        "inline-flex items-center border border-charcoal-200 rounded-full overflow-hidden bg-ivory-50",
        className
      )}
    >
      <button
        type="button"
        aria-label="Decrease quantity"
        onClick={() => onChange(Math.max(min, value - 1))}
        className="h-10 w-10 grid place-items-center text-charcoal-500 hover:bg-ivory-100 disabled:opacity-40"
        disabled={value <= min}
      >
        <FiMinus size={14} />
      </button>
      <span className="w-10 text-center text-sm tabular-nums">{value}</span>
      <button
        type="button"
        aria-label="Increase quantity"
        onClick={() => onChange(Math.min(max, value + 1))}
        className="h-10 w-10 grid place-items-center text-charcoal-500 hover:bg-ivory-100 disabled:opacity-40"
        disabled={value >= max}
      >
        <FiPlus size={14} />
      </button>
    </div>
  );
}
