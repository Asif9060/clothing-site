"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FiTrash2, FiArrowRight } from "react-icons/fi";
import { useCartStore, cartKey } from "@/lib/store/cartStore";
import { QuantityStepper } from "@/components/ui/QuantityStepper";
import { Button } from "@/components/ui/Button";
import { formatPrice, cn } from "@/lib/utils";

export default function CartPage() {
  const items = useCartStore((s) => s.items);
  const update = useCartStore((s) => s.updateQuantity);
  const remove = useCartStore((s) => s.removeItem);

  const subtotal = items.reduce((acc, i) => acc + i.price * i.quantity, 0);
  const shipping = subtotal > 3000 ? 0 : 200;
  const total = subtotal + shipping;

  return (
    <div className="container-tight py-12 lg:py-20">
      <div className="mb-10">
        <p className="h-eyebrow">Bag</p>
        <h1 className="h-display text-4xl md:text-6xl mt-3">
          Your selection.
        </h1>
      </div>

      {items.length === 0 ? (
        <div className="grid place-items-center py-32">
          <div className="text-center max-w-md">
            <p className="font-editorial text-4xl italic text-charcoal-300">
              Your bag is quiet.
            </p>
            <p className="mt-3 text-charcoal-400">
              Add a piece from the new edit — quiet wardrobes begin with
              considered choices.
            </p>
            <Link href="/shop" className="mt-6 inline-block">
              <Button size="lg">Shop the collection</Button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid lg:grid-cols-[1fr_380px] gap-12 lg:gap-20">
          <div>
            <div className="border-b border-charcoal-100 pb-4 mb-6 grid grid-cols-[1fr_auto] gap-6 text-[11px] uppercase tracking-widest text-charcoal-400">
              <span>Piece</span>
              <span className="text-right">Total</span>
            </div>

            <AnimatePresence initial={false}>
              <ul className="divide-y divide-charcoal-100">
                {items.map((item) => {
                  const k = cartKey(
                    item.productId,
                    item.size,
                    item.color.name
                  );
                  return (
                    <motion.li
                      key={k}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="py-6 grid grid-cols-[100px_1fr_auto] gap-5 items-start"
                    >
                      <Link
                        href={`/product/${item.slug}`}
                        className="relative aspect-[4/5] overflow-hidden bg-ivory-100 rounded-sm"
                      >
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          sizes="100px"
                          className="object-cover"
                        />
                      </Link>
                      <div>
                        <Link
                          href={`/product/${item.slug}`}
                          className="font-display text-xl"
                        >
                          {item.name}
                        </Link>
                        <p className="mt-1 text-xs text-charcoal-400 uppercase tracking-widest">
                          {item.color.name} · Size {item.size}
                        </p>
                        <p className="mt-1 text-sm text-charcoal-400">
                          {formatPrice(item.price)}
                        </p>
                        <div className="mt-4 flex items-center gap-4">
                          <QuantityStepper
                            value={item.quantity}
                            onChange={(q) => update(k, q)}
                          />
                          <button
                            onClick={() => remove(k)}
                            className="text-charcoal-300 hover:text-charcoal-500 inline-flex items-center gap-1 text-[11px] uppercase tracking-widest"
                          >
                            <FiTrash2 size={12} />
                            Remove
                          </button>
                        </div>
                      </div>
                      <p className="font-display text-xl tabular-nums">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                    </motion.li>
                  );
                })}
              </ul>
            </AnimatePresence>
          </div>

          <aside className="lg:sticky lg:top-32 self-start">
            <div className="bg-ivory-100 rounded-2xl p-6 lg:p-8">
              <p className="h-eyebrow">Order summary</p>
              <h3 className="font-display text-2xl mt-3">
                {items.length} {items.length === 1 ? "piece" : "pieces"}
              </h3>

              <dl className="mt-6 space-y-3 text-sm">
                <div className="flex justify-between">
                  <dt className="text-charcoal-400">Subtotal</dt>
                  <dd className="tabular-nums">
                    {formatPrice(subtotal)}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-charcoal-400">Shipping</dt>
                  <dd className="tabular-nums">
                    {shipping === 0 ? (
                      <span className="text-brass">Complimentary</span>
                    ) : (
                      formatPrice(shipping)
                    )}
                  </dd>
                </div>
                {subtotal < 3000 && (
                  <p className="text-xs text-charcoal-400 italic">
                    Add {formatPrice(3000 - subtotal)} for complimentary
                    shipping.
                  </p>
                )}
                <div className="border-t border-charcoal-200 pt-3 flex justify-between font-medium">
                  <dt>Total</dt>
                  <dd className="font-display text-2xl tabular-nums">
                    {formatPrice(total)}
                  </dd>
                </div>
              </dl>

              <Link href="/checkout">
                <Button size="lg" fullWidth className="mt-6">
                  Proceed to checkout
                  <FiArrowRight className="ml-2" />
                </Button>
              </Link>
              <Link
                href="/shop"
                className="mt-4 block text-center text-[11px] uppercase tracking-widest text-charcoal-400 hover:text-charcoal-500"
              >
                Continue shopping
              </Link>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}
