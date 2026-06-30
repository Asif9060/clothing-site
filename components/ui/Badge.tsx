import { cn } from "@/lib/utils";

type Tone = "default" | "dark" | "outline" | "new" | "sold";

const toneStyles: Record<Tone, string> = {
  default: "bg-ivory-50 text-charcoal-500",
  dark: "bg-charcoal-500 text-ivory-50",
  outline: "bg-transparent text-ivory-50 border border-ivory-50/60",
  new: "bg-brass text-ivory-50",
  sold: "bg-charcoal-900/80 text-ivory-50",
};

export function Badge({
  children,
  tone = "default",
  className,
}: {
  children: React.ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-1 text-[10px] uppercase tracking-widest font-medium rounded-full",
        toneStyles[tone],
        className
      )}
    >
      {children}
    </span>
  );
}
