"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { FiHeart } from "react-icons/fi";
import { useWishlistStore } from "@/lib/store/wishlistStore";
import { useCartStore } from "@/lib/store/cartStore";
import { Badge } from "@/components/ui/Badge";
import { Rating } from "@/components/ui/Rating";
import { formatPrice, cn } from "@/lib/utils";
import type { Product } from "@/lib/data/products";

type Props = {
  product: Product;
  priority?: boolean;
  className?: string;
};

export function ProductCard({ product, priority = false, className }: Props) {
  const wishHas = useWishlistStore((s) =>
    s.items.some((i) => i.productId === product.id)
  );
  const wishToggle = useWishlistStore((s) => s.toggle);
  const openCart = useCartStore((s) => s.open);

  const onWish = (e: React.MouseEvent) => {
    e.preventDefault();
    wishToggle({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      image: product.images[0],
      price: product.price,
    });
  };

  const onQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    if (product.isSoldOut) return;
    useCartStore.getState().addItem({
      product,
      size: product.sizes[0],
      color: product.colors[0],
    });
    openCart();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={cn("group relative", className)}
    >
      <Link
        href={`/product/${product.slug}`}
        className="block"
        aria-label={product.name}
      >
        <div className="relative aspect-[4/5] overflow-hidden bg-ivory-100 rounded-sm">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            priority={priority}
            sizes="(max-width: 768px) 50vw, 25vw"
            className={cn(
              "object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
              "group-hover:scale-[1.04]"
            )}
          />
          {/* Second image crossfade on hover */}
          {product.images[1] && (
            <Image
              src={product.images[1]}
              alt=""
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              aria-hidden
              className="object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-700"
            />
          )}

          {/* Top badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {product.isSoldOut && <Badge tone="sold">Sold Out</Badge>}
            {product.isNew && !product.isSoldOut && (
              <Badge tone="new">New</Badge>
            )}
          </div>

          {/* Wishlist heart */}
          <button
            onClick={onWish}
            aria-label="Save to wishlist"
            className={cn(
              "absolute top-3 right-3 h-9 w-9 grid place-items-center rounded-full transition-all",
              "bg-ivory-50/85 backdrop-blur hover:bg-ivory-50",
              wishHas && "bg-brass text-ivory-50 hover:bg-brass"
            )}
          >
            <FiHeart
              size={15}
              className={wishHas ? "fill-current" : ""}
            />
          </button>

          {/* Quick add */}
          {!product.isSoldOut && (
            <motion.button
              onClick={onQuickAdd}
              initial={{ y: 12, opacity: 0 }}
              whileHover={{ y: -1 }}
              className="absolute left-3 right-3 bottom-3 py-2.5 rounded-full bg-ivory-50/95 backdrop-blur text-[11px] uppercase tracking-widest text-charcoal-500 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:bg-charcoal-500 hover:text-ivory-50"
            >
              Quick add
            </motion.button>
          )}

          {product.isSoldOut && (
            <div className="absolute inset-x-3 bottom-3 py-2.5 rounded-full bg-charcoal-900/80 text-center text-[11px] uppercase tracking-widest text-ivory-50">
              Notify when restocked
            </div>
          )}
        </div>

        <div className="mt-4">
          <div className="flex items-start justify-between gap-3">
            <h3 className="font-display text-base leading-snug line-clamp-2 group-hover:text-brass transition-colors">
              {product.name}
            </h3>
            <p className="text-sm tabular-nums shrink-0">
              {formatPrice(product.price)}
            </p>
          </div>
          <div className="mt-2 flex items-center justify-between">
            <Rating value={product.rating} count={product.reviewCount} />
            <div className="flex items-center gap-1">
              {product.colors.slice(0, 4).map((c) => (
                <span
                  key={c.name}
                  title={c.name}
                  className="h-3 w-3 rounded-full border border-charcoal-200"
                  style={{ backgroundColor: c.hex }}
                />
              ))}
              {product.colors.length > 4 && (
                <span className="text-[10px] text-charcoal-400 ml-1">
                  +{product.colors.length - 4}
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
