import { cn } from "@/lib/utils";

type Props = {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: Props) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow && (
        <div className="h-eyebrow mb-4 inline-flex items-center gap-3">
          <span className="h-px w-8 bg-charcoal-300" />
          {eyebrow}
          <span className="h-px w-8 bg-charcoal-300" />
        </div>
      )}
      <h2 className="h-display text-4xl md:text-5xl lg:text-6xl text-balance">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-charcoal-400 max-w-xl text-balance">
          {description}
        </p>
      )}
    </div>
  );
}
