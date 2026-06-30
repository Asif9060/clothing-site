"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FiPhone, FiMail, FiMapPin } from "react-icons/fi";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";

const OUTLETS = [
  {
    name: "Banani Atelier",
    address: "Level 3, House 45, Road 11, Block C, Banani",
    city: "Dhaka",
    hours: "Mon – Sun · 11:00 – 21:00",
  },
  {
    name: "Mirpur Atelier",
    address: "Level 4, Rupayan Latifa Shamsuddin Square, Mirpur-1",
    city: "Dhaka",
    hours: "Mon – Sun · 11:00 – 21:00",
  },
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="container-tight py-12 lg:py-20">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 mb-24">
        <div>
          <p className="h-eyebrow">Reach us</p>
          <h1 className="h-display text-4xl md:text-6xl mt-3 leading-tight">
            We respond
            <br />
            <em className="font-editorial text-brass"> within a day.</em>
          </h1>
          <p className="mt-6 text-charcoal-400 max-w-md leading-relaxed">
            For orders, sizing, repairs, press, or simply to talk about cloth
            — we'd love to hear from you.
          </p>

          <ul className="mt-10 space-y-4 text-sm">
            <li className="flex items-center gap-3">
              <span className="grid place-items-center h-9 w-9 rounded-full bg-ivory-100 text-brass">
                <FiPhone size={14} />
              </span>
              <div>
                <p className="text-charcoal-400 text-[11px] uppercase tracking-widest">
                  Hotline · 24/7
                </p>
                <p className="font-display text-lg">+880 1707 579207</p>
              </div>
            </li>
            <li className="flex items-center gap-3">
              <span className="grid place-items-center h-9 w-9 rounded-full bg-ivory-100 text-brass">
                <FiMail size={14} />
              </span>
              <div>
                <p className="text-charcoal-400 text-[11px] uppercase tracking-widest">
                  Email
                </p>
                <p className="font-display text-lg">hello@lumenvestire.com</p>
              </div>
            </li>
            <li className="flex items-center gap-3">
              <span className="grid place-items-center h-9 w-9 rounded-full bg-ivory-100 text-brass">
                <FiMapPin size={14} />
              </span>
              <div>
                <p className="text-charcoal-400 text-[11px] uppercase tracking-widest">
                  Atelier
                </p>
                <p className="font-display text-lg">House 45, Banani, Dhaka</p>
              </div>
            </li>
          </ul>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSubmitted(true);
          }}
          className="bg-ivory-100 rounded-2xl p-6 lg:p-10 space-y-5"
        >
          <h2 className="font-display text-2xl">Send a message</h2>
          <Field label="Name" placeholder="Your name" />
          <Field
            label="Email"
            type="email"
            placeholder="you@example.com"
            required
          />
          <Field label="Subject" placeholder="A short summary" />
          <label className="block">
            <span className="block text-[11px] uppercase tracking-widest text-charcoal-400 mb-2">
              Message
            </span>
            <textarea
              rows={5}
              placeholder="Tell us a little about what's on your mind."
              required
              className="w-full bg-transparent border-b border-charcoal-200 py-3 outline-none focus:border-charcoal-500 transition-colors resize-none"
            />
          </label>
          <Button size="lg" fullWidth type="submit">
            {submitted ? "Sent — we'll reply soon" : "Send message"}
          </Button>
          {submitted && (
            <motion.p
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center text-xs uppercase tracking-widest text-brass"
            >
              ✓ We typically respond within 12 hours.
            </motion.p>
          )}
        </form>
      </div>

      {/* Outlets */}
      <section>
        <SectionHeading
          eyebrow="Visit"
          title={
            <>
              Our
              <em className="font-editorial text-brass"> ateliers.</em>
            </>
          }
        />
        <div className="grid sm:grid-cols-2 gap-6 mt-12">
          {OUTLETS.map((o) => (
            <div
              key={o.name}
              className="rounded-2xl border border-charcoal-100 p-8 hover:border-charcoal-300 transition-colors"
            >
              <p className="text-[11px] uppercase tracking-widest text-brass">
                Outlet
              </p>
              <h3 className="font-display text-2xl mt-2">{o.name}</h3>
              <p className="mt-4 text-charcoal-400 text-sm leading-relaxed">
                {o.address}
                <br />
                {o.city}
              </p>
              <p className="mt-4 text-xs uppercase tracking-widest text-charcoal-400">
                {o.hours}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function Field({
  label,
  placeholder,
  type = "text",
  required = false,
}: {
  label: string;
  placeholder: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="block text-[11px] uppercase tracking-widest text-charcoal-400 mb-2">
        {label}
      </span>
      <input
        type={type}
        placeholder={placeholder}
        required={required}
        className="w-full bg-transparent border-b border-charcoal-200 py-3 outline-none focus:border-charcoal-500 transition-colors"
      />
    </label>
  );
}
