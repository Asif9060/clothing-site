"use client";

import { ProductCard } from "@/components/product/ProductCard";
import type { Product } from "@/lib/data/products";
import { cn } from "@/lib/utils";

export function ProductGrid({
  products,
  cols = 4,
  className,
}: {
  products: Product[];
  cols?: 2 | 3 | 4;
  className?: string;
}) {
  const gridCols = {
    2: "grid-cols-2",
    3: "grid-cols-2 md:grid-cols-3",
    4: "grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
  }[cols];

  return (
    <div className={cn("grid gap-x-5 gap-y-10", gridCols, className)}>
      {products.map((p, i) => (
        <ProductCard key={p.id} product={p} priority={i < 4} />
      ))}
    </div>
  );
}
