"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { FiCheck, FiArrowLeft } from "react-icons/fi";
import { useCartStore, cartKey } from "@/lib/store/cartStore";
import { Button } from "@/components/ui/Button";
import { formatPrice, cn } from "@/lib/utils";

const STEPS = [
  { id: 0, label: "Contact" },
  { id: 1, label: "Shipping" },
  { id: 2, label: "Payment" },
];

export default function CheckoutPage() {
  const items = useCartStore((s) => s.items);
  const [step, setStep] = useState(0);

  const subtotal = items.reduce((acc, i) => acc + i.price * i.quantity, 0);
  const shipping = subtotal > 3000 ? 0 : 200;

  return (
    <div className="container-tight py-12 lg:py-20">
      <div className="mb-10">
        <p className="h-eyebrow">Checkout</p>
        <h1 className="h-display text-4xl md:text-6xl mt-3">
          One last step.
        </h1>
      </div>

      {/* Step indicator */}
      <div className="flex items-center gap-2 mb-12">
        {STEPS.map((s, i) => {
          const completed = i < step;
          const active = i === step;
          return (
            <div key={s.id} className="flex items-center gap-2 flex-1">
              <div
                className={cn(
                  "h-9 w-9 rounded-full grid place-items-center text-xs tabular-nums transition-colors",
                  completed && "bg-charcoal-500 text-ivory-50",
                  active && "bg-ivory-100 border border-charcoal-500",
                  !completed && !active && "bg-ivory-100 text-charcoal-300"
                )}
              >
                {completed ? <FiCheck size={14} /> : s.id + 1}
              </div>
              <span className="text-[11px] uppercase tracking-widest">
                {s.label}
              </span>
              {i < STEPS.length - 1 && (
                <div className="flex-1 h-px bg-charcoal-100 mx-2" />
              )}
            </div>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-[1fr_400px] gap-12 lg:gap-20">
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {step === 0 && (
            <section>
              <h2 className="font-display text-3xl mb-1">Contact</h2>
              <p className="text-charcoal-400 text-sm mb-6">
                We'll send your confirmation here.
              </p>
              <div className="space-y-4">
                <Field label="Email" placeholder="you@example.com" type="email" />
                <Field label="Phone" placeholder="+880" type="tel" />
                <label className="flex items-center gap-3 mt-6 text-sm text-charcoal-500">
                  <input type="checkbox" defaultChecked className="accent-charcoal-500" />
                  Email me with news and offers
                </label>
              </div>
            </section>
          )}

          {step === 1 && (
            <section>
              <h2 className="font-display text-3xl mb-1">Shipping</h2>
              <p className="text-charcoal-400 text-sm mb-6">
                Where should we send your order?
              </p>
              <div className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field label="First name" placeholder="Hannan" />
                  <Field label="Last name" placeholder="Reza" />
                </div>
                <Field label="Address" placeholder="House 12, Road 7" />
                <Field label="Apt / Suite / Floor (optional)" placeholder="" />
                <div className="grid sm:grid-cols-3 gap-4">
                  <Field label="City" placeholder="Dhaka" />
                  <Field label="Postal" placeholder="1212" />
                  <Field label="Country" placeholder="Bangladesh" />
                </div>
              </div>
            </section>
          )}

          {step === 2 && (
            <section>
              <h2 className="font-display text-3xl mb-1">Payment</h2>
              <p className="text-charcoal-400 text-sm mb-6">
                All transactions are secure and encrypted.
              </p>
              <div className="space-y-4">
                <div className="border border-charcoal-200 rounded-xl p-4">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="pay"
                      defaultChecked
                      className="accent-charcoal-500"
                    />
                    <span className="text-sm">Credit / Debit card</span>
                  </label>
                </div>
                <div className="border border-charcoal-200 rounded-xl p-4">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="pay"
                      className="accent-charcoal-500"
                    />
                    <span className="text-sm">bKash / Nagad</span>
                  </label>
                </div>
                <div className="border border-charcoal-200 rounded-xl p-4">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="pay"
                      className="accent-charcoal-500"
                    />
                    <span className="text-sm">Cash on delivery</span>
                  </label>
                </div>
              </div>
            </section>
          )}

          <div className="mt-10 flex items-center justify-between border-t border-charcoal-100 pt-6">
            {step > 0 ? (
              <button
                onClick={() => setStep(step - 1)}
                className="inline-flex items-center gap-2 text-[11px] uppercase tracking-widest hover:text-brass"
              >
                <FiArrowLeft size={14} /> Back
              </button>
            ) : (
              <Link
                href="/cart"
                className="inline-flex items-center gap-2 text-[11px] uppercase tracking-widest hover:text-brass"
              >
                <FiArrowLeft size={14} /> Back to bag
              </Link>
            )}
            {step < STEPS.length - 1 ? (
              <Button onClick={() => setStep(step + 1)}>
                Continue
              </Button>
            ) : (
              <Button onClick={() => alert("Order confirmed — demo only.")}>
                Place order
              </Button>
            )}
          </div>
        </motion.div>

        <aside className="lg:sticky lg:top-32 self-start">
          <div className="bg-ivory-100 rounded-2xl p-6 lg:p-8">
            <p className="h-eyebrow">Order summary</p>
            <ul className="mt-6 space-y-4 max-h-72 overflow-y-auto pr-2">
              {items.map((item) => {
                const k = cartKey(
                  item.productId,
                  item.size,
                  item.color.name
                );
                return (
                  <li key={k} className="flex gap-3 items-center">
                    <div className="relative h-16 w-14 rounded-md overflow-hidden bg-ivory-50 shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="56px"
                        className="object-cover"
                      />
                      <span className="absolute -top-1.5 -right-1.5 h-5 w-5 rounded-full bg-charcoal-500 text-ivory-50 text-[10px] grid place-items-center">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-display text-sm leading-tight truncate">
                        {item.name}
                      </p>
                      <p className="text-[11px] uppercase tracking-widest text-charcoal-400">
                        {item.color.name} · {item.size}
                      </p>
                    </div>
                    <p className="text-sm tabular-nums">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                  </li>
                );
              })}
            </ul>
            <div className="mt-6 border-t border-charcoal-200 pt-4 space-y-2 text-sm">
              <Row label="Subtotal" value={formatPrice(subtotal)} />
              <Row
                label="Shipping"
                value={
                  shipping === 0 ? (
                    <span className="text-brass">Free</span>
                  ) : (
                    formatPrice(shipping)
                  )
                }
              />
              <div className="pt-3 mt-3 border-t border-charcoal-200 flex items-baseline justify-between">
                <span className="text-[11px] uppercase tracking-widest text-charcoal-400">
                  Total
                </span>
                <span className="font-display text-2xl tabular-nums">
                  {formatPrice(subtotal + shipping)}
                </span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

function Field({
  label,
  placeholder,
  type = "text",
}: {
  label: string;
  placeholder: string;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="block text-[11px] uppercase tracking-widest text-charcoal-400 mb-2">
        {label}
      </span>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full bg-transparent border-b border-charcoal-200 py-3 outline-none focus:border-charcoal-500 transition-colors"
      />
    </label>
  );
}

function Row({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex justify-between">
      <span className="text-charcoal-400">{label}</span>
      <span className="tabular-nums">{value}</span>
    </div>
  );
}
