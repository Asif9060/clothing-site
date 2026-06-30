import type { Metadata } from "next";
import { Inter, Playfair_Display, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PromoBar } from "@/components/layout/PromoBar";
import { CartDrawer } from "@/components/layout/CartDrawer";
import { WishlistDrawer } from "@/components/layout/WishlistDrawer";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { SearchOverlay } from "@/components/layout/SearchOverlay";
import { StoreHydration } from "@/components/layout/StoreHydration";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://lumenvestire.com"),
  title: {
    default: "LUMEN VESTIRE — Tailored light. Worn right.",
    template: "%s · LUMEN VESTIRE",
  },
  description:
    "LUMEN VESTIRE is a refined menswear atelier crafting shirts, pants, panjabi and seasonal essentials with quiet luxury and timeless tailoring.",
  keywords: [
    "menswear",
    "tailored clothing",
    "premium shirts",
    "panjabi",
    "minimal fashion",
    "LUMEN VESTIRE",
  ],
  openGraph: {
    title: "LUMEN VESTIRE — Tailored light. Worn right.",
    description:
      "Refined menswear, made slowly. Shirts, pants, panjabi and seasonal essentials.",
    url: "https://lumenvestire.com",
    siteName: "LUMEN VESTIRE",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "LUMEN VESTIRE — Tailored light. Worn right.",
  },
  icons: {
    icon: "/icon.svg",
    apple: "/apple-icon.svg",
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} ${cormorant.variable}`}
    >
      <body className="min-h-screen bg-ivory-50 text-charcoal-500 antialiased">
        <StoreHydration />
        <PromoBar />
        <Navbar />
        <MobileMenu />
        <SearchOverlay />
        <CartDrawer />
        <WishlistDrawer />
        <main className="pt-[112px] lg:pt-[120px]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
