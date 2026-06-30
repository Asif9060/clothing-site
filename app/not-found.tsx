import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="container-tight py-32 text-center">
      <p className="text-[11px] uppercase tracking-ultra text-brass">404</p>
      <h1 className="h-display text-6xl md:text-8xl mt-4">
        Off the
        <em className="font-editorial text-brass"> wardrobe.</em>
      </h1>
      <p className="mt-6 text-charcoal-400 max-w-md mx-auto">
        That page seems to have slipped between the rails. Let's get you back
        to the collection.
      </p>
      <Link href="/" className="inline-block mt-10">
        <Button size="lg">Return home</Button>
      </Link>
    </div>
  );
}
