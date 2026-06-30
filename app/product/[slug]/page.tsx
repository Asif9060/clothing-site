"use client";

import { notFound } from "next/navigation";
import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiHeart, FiTruck, FiRotateCcw, FiShield } from "react-icons/fi";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Rating } from "@/components/ui/Rating";
import { QuantityStepper } from "@/components/ui/QuantityStepper";
import { SizeSelector } from "@/components/ui/SizeSelector";
import { ColorSwatch } from "@/components/ui/ColorSwatch";
import { Accordion } from "@/components/ui/Accordion";
import { ProductGrid } from "@/components/product/ProductGrid";
import { RecentlyViewed } from "@/components/home/RecentlyViewed";
import {
  findProduct,
  PRODUCTS,
  relatedProducts,
} from "@/lib/data/products";
import { useCartStore } from "@/lib/store/cartStore";
import { useWishlistStore } from "@/lib/store/wishlistStore";
import { useRecentlyViewedStore } from "@/lib/store/recentlyViewedStore";
import { formatPrice, cn } from "@/lib/utils";

export default function ProductDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const product = findProduct(params.slug);
  if (!product) notFound();

  const [activeImage, setActiveImage] = useState(0);
  const [size, setSize] = useState(product.sizes[0]);
  const [color, setColor] = useState(product.colors[0]);
  const [qty, setQty] = useState(1);

  const addItem = useCartStore((s) => s.addItem);
  const openCart = useCartStore((s) => s.open);
  const wishHas = useWishlistStore((s) =>
    s.items.some((i) => i.productId === product.id)
  );
  const wishToggle = useWishlistStore((s) => s.toggle);
  const pushRecent = useRecentlyViewedStore((s) => s.push);

  // Track recently viewed
  useEffect(() => {
    pushRecent({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      image: product.images[0],
      price: product.price,
    });
  }, [product.id, product.slug, product.name, product.images, product.price, pushRecent]);

  const handleAdd = () => {
    addItem({ product, size, color, quantity: qty });
    openCart();
  };

  const related = useMemo(() => relatedProducts(product.slug, 4), [product.slug]);

  return (
    <>
      <div className="container-tight pt-8 pb-20 lg:pt-12 lg:pb-32">
        {/* Breadcrumb */}
        <nav className="text-[11px] uppercase tracking-widest text-charcoal-400 mb-8">
          <Link href="/" className="hover:text-brass">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link href="/shop" className="hover:text-brass">
            Shop
          </Link>
          <span className="mx-2">/</span>
          <Link
            href={`/shop?category=${encodeURIComponent(product.category)}`}
            className="hover:text-brass"
          >
            {product.category}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-charcoal-500">{product.name}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-20">
          {/* Gallery */}
          <div className="grid grid-cols-[80px_1fr] gap-4">
            <div className="flex lg:flex-col gap-3">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={cn(
                    "relative aspect-[4/5] overflow-hidden bg-ivory-100 rounded-sm border transition",
                    i === activeImage
                      ? "border-charcoal-500"
                      : "border-transparent opacity-70 hover:opacity-100"
                  )}
                >
                  <Image
                    src={img}
                    alt={`${product.name} view ${i + 1}`}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
            <div className="relative aspect-[4/5] overflow-hidden bg-ivory-100 rounded-sm">
              <motion.div
                key={activeImage}
                initial={{ opacity: 0, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0"
              >
                <Image
                  src={product.images[activeImage]}
                  alt={product.name}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </motion.div>
              <div className="absolute top-4 left-4 flex flex-col gap-1.5">
                {product.isSoldOut && <Badge tone="sold">Sold Out</Badge>}
                {product.isNew && !product.isSoldOut && (
                  <Badge tone="new">New Drop</Badge>
                )}
              </div>
            </div>
          </div>

          {/* Info */}
          <div className="lg:sticky lg:top-32 lg:self-start">
            <p className="h-eyebrow">{product.category}</p>
            <h1 className="font-display text-3xl md:text-5xl mt-3 leading-tight text-balance">
              {product.name}
            </h1>
            <div className="mt-4 flex items-center gap-4">
              <Rating value={product.rating} count={product.reviewCount} />
              <button className="text-[11px] uppercase tracking-widest text-charcoal-400 hover:text-charcoal-500 border-b border-charcoal-200 pb-0.5">
                Read reviews
              </button>
            </div>

            <p className="mt-6 font-display text-3xl tabular-nums">
              {formatPrice(product.price)}
            </p>

            <p className="mt-6 text-charcoal-400 leading-relaxed">
              {product.description}
            </p>

            <div className="mt-8 space-y-7">
              {/* Color */}
              <div>
                <p className="text-[11px] uppercase tracking-widest text-charcoal-400 mb-3">
                  Color · <span className="text-charcoal-500">{color.name}</span>
                </p>
                <ColorSwatch
                  colors={product.colors}
                  value={color}
                  onChange={setColor}
                />
              </div>

              {/* Size */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <p className="text-[11px] uppercase tracking-widest text-charcoal-400">
                    Size ·{" "}
                    <span className="text-charcoal-500">{size}</span>
                  </p>
                  <button className="text-[11px] uppercase tracking-widest text-charcoal-400 hover:text-charcoal-500 border-b border-charcoal-200 pb-0.5">
                    Size guide
                  </button>
                </div>
                <SizeSelector
                  sizes={product.sizes}
                  value={size}
                  onChange={setSize}
                />
              </div>

              {/* Qty + CTA */}
              <div className="flex flex-wrap items-center gap-4">
                <QuantityStepper value={qty} onChange={setQty} />
                <Button
                  onClick={handleAdd}
                  disabled={product.isSoldOut}
                  size="lg"
                  className="flex-1 min-w-[200px]"
                >
                  {product.isSoldOut ? "Notify when back" : "Add to bag"}
                </Button>
                <button
                  onClick={() =>
                    wishToggle({
                      productId: product.id,
                      slug: product.slug,
                      name: product.name,
                      image: product.images[0],
                      price: product.price,
                    })
                  }
                  className={cn(
                    "h-14 w-14 rounded-full border grid place-items-center transition-colors",
                    wishHas
                      ? "bg-brass text-ivory-50 border-brass"
                      : "border-charcoal-200 hover:border-charcoal-500"
                  )}
                  aria-label="Save to wishlist"
                >
                  <FiHeart size={18} className={wishHas ? "fill-current" : ""} />
                </button>
              </div>
            </div>

            {/* Trust */}
            <ul className="mt-10 grid grid-cols-3 gap-4 border-t border-charcoal-100 pt-6">
              {[
                { Icon: FiTruck, label: "Free shipping" },
                { Icon: FiRotateCcw, label: "30-day returns" },
                { Icon: FiShield, label: "Lifetime repair" },
              ].map(({ Icon, label }) => (
                <li
                  key={label}
                  className="flex items-center gap-2 text-[11px] uppercase tracking-widest text-charcoal-400"
                >
                  <Icon size={14} className="text-brass" />
                  {label}
                </li>
              ))}
            </ul>

            {/* Accordion */}
            <div className="mt-10">
              <Accordion
                items={[
                  {
                    title: "Description",
                    body: <p>{product.description}</p>,
                  },
                  {
                    title: "Materials & Care",
                    body: (
                      <>
                        <p>{product.materials}</p>
                        <ul className="mt-3 space-y-1 list-disc pl-5">
                          <li>Cool wash or hand wash</li>
                          <li>Lay flat to dry</li>
                          <li>Iron on low heat</li>
                          <li>Do not bleach</li>
                        </ul>
                      </>
                    ),
                  },
                  {
                    title: "Size & Fit",
                    body: (
                      <p>
                        True to size. Model is 183cm wearing size M. Detailed
                        measurements available in our size guide.
                      </p>
                    ),
                  },
                  {
                    title: "Shipping & Returns",
                    body: (
                      <>
                        <p>
                          Complimentary shipping on orders over ৳3000.
                          International shipping available to 14 countries.
                        </p>
                        <p className="mt-2">
                          30-day returns on unworn pieces. Free return labels
                          inside every parcel.
                        </p>
                      </>
                    ),
                  },
                ]}
                defaultOpen={0}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <section className="container-tight py-16 lg:py-24 border-t border-charcoal-100">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="h-eyebrow">You may also like</p>
              <h2 className="h-display text-3xl md:text-4xl mt-3">
                From the same edit.
              </h2>
            </div>
            <Link
              href={`/shop?category=${encodeURIComponent(product.category)}`}
              className="hidden sm:inline-flex items-center gap-2 text-[11px] uppercase tracking-widest hover:text-brass"
            >
              More {product.category} →
            </Link>
          </div>
          <ProductGrid products={related} cols={4} />
        </section>
      )}

      <RecentlyViewed />
    </>
  );
}
