"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "outline";
type Size = "sm" | "md" | "lg";

type Props = Omit<HTMLMotionProps<"button">, "ref"> & {
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
};

const variantStyles: Record<Variant, string> = {
  primary:
    "bg-charcoal-500 text-ivory-50 hover:bg-charcoal-900 disabled:opacity-50",
  secondary:
    "bg-ivory-50 text-charcoal-500 border border-charcoal-200 hover:border-charcoal-500",
  ghost:
    "bg-transparent text-charcoal-500 hover:bg-ivory-100",
  outline:
    "bg-transparent text-charcoal-500 border border-charcoal-500 hover:bg-charcoal-500 hover:text-ivory-50",
};

const sizeStyles: Record<Size, string> = {
  sm: "h-9 px-4 text-[11px]",
  md: "h-11 px-6 text-xs",
  lg: "h-14 px-8 text-sm",
};

export const Button = forwardRef<HTMLButtonElement, Props>(
  (
    {
      variant = "primary",
      size = "md",
      fullWidth = false,
      className,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <motion.button
        ref={ref}
        whileTap={{ scale: 0.97 }}
        whileHover={{ y: -1 }}
        transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "inline-flex items-center justify-center uppercase tracking-widest font-medium rounded-full transition-colors duration-300 outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-charcoal-500",
          variantStyles[variant],
          sizeStyles[size],
          fullWidth && "w-full",
          className
        )}
        {...props}
      >
        {children}
      </motion.button>
    );
  }
);
Button.displayName = "Button";
