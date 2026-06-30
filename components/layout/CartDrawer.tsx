"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiTrash2 } from "react-icons/fi";
import { useCartStore, cartKey } from "@/lib/store/cartStore";
import { QuantityStepper } from "@/components/ui/QuantityStepper";
import { Button } from "@/components/ui/Button";
import { formatPrice, cn } from "@/lib/utils";

export function CartDrawer() {
  const isOpen = useCartStore((s) => s.isOpen);
  const close = useCartStore((s) => s.close);
  const items = useCartStore((s) => s.items);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);

  const subtotal = items.reduce((acc, i) => acc + i.price * i.quantity, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={close}
            className="fixed inset-0 z-[60] bg-charcoal-900/40 backdrop-blur-sm"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-0 right-0 z-[70] h-full w-full sm:w-[440px] bg-ivory-50 shadow-2xl flex flex-col"
            aria-label="Shopping cart"
          >
            <header className="flex items-center justify-between px-6 py-5 border-b border-charcoal-100">
              <div>
                <p className="h-eyebrow">Your Bag</p>
                <h3 className="font-display text-2xl mt-1">
                  {items.length} {items.length === 1 ? "item" : "items"}
                </h3>
              </div>
              <button
                aria-label="Close cart"
                onClick={close}
                className="p-2 -mr-2 hover:bg-ivory-100 rounded-full"
              >
                <FiX size={20} />
              </button>
            </header>

            {items.length === 0 ? (
              <div className="flex-1 grid place-items-center px-6">
                <div className="text-center">
                  <p className="font-editorial text-3xl italic text-charcoal-300">
                    Your bag is quiet.
                  </p>
                  <p className="mt-2 text-sm text-charcoal-400">
                    Begin with a wardrobe essential.
                  </p>
                  <Button
                    variant="secondary"
                    size="md"
                    className="mt-6"
                    onClick={close}
                  >
                    Continue shopping
                  </Button>
                </div>
              </div>
            ) : (
              <>
                <ul className="flex-1 overflow-y-auto divide-y divide-charcoal-100">
                  {items.map((item) => {
                    const k = cartKey(
                      item.productId,
                      item.size,
                      item.color.name
                    );
                    return (
                      <li
                        key={k}
                        className="flex gap-4 px-6 py-5 hover:bg-ivory-100/40 transition-colors"
                      >
                        <div
                          className="relative h-24 w-20 rounded-md overflow-hidden bg-ivory-100 shrink-0"
                        >
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            sizes="80px"
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <p className="font-display text-base leading-tight">
                                {item.name}
                              </p>
                              <p className="mt-1 text-xs text-charcoal-400">
                                {item.color.name} · {item.size}
                              </p>
                            </div>
                            <p className="text-sm font-medium tabular-nums">
                              {formatPrice(item.price * item.quantity)}
                            </p>
                          </div>
                          <div className="mt-3 flex items-center justify-between">
                            <QuantityStepper
                              value={item.quantity}
                              onChange={(q) => updateQuantity(k, q)}
                              className="scale-[0.85] origin-left"
                            />
                            <button
                              onClick={() => removeItem(k)}
                              aria-label="Remove from bag"
                              className="text-charcoal-300 hover:text-charcoal-500"
                            >
                              <FiTrash2 size={16} />
                            </button>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>

                <footer className="border-t border-charcoal-100 px-6 py-5 space-y-4 bg-ivory-50">
                  <div className="flex items-baseline justify-between">
                    <span className="text-xs uppercase tracking-widest text-charcoal-400">
                      Subtotal
                    </span>
                    <span className="font-display text-2xl tabular-nums">
                      {formatPrice(subtotal)}
                    </span>
                  </div>
                  <p className="text-xs text-charcoal-400">
                    Shipping and duties calculated at checkout.
                  </p>
                  <Link href="/checkout" onClick={close}>
                    <Button size="lg" fullWidth>
                      Checkout
                    </Button>
                  </Link>
                  <Link
                    href="/cart"
                    onClick={close}
                    className="block text-center text-xs uppercase tracking-widest text-charcoal-400 hover:text-charcoal-500"
                  >
                    View full bag
                  </Link>
                </footer>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
