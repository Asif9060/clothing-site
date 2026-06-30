import type { MetadataRoute } from "next";
import { PRODUCTS, ALL_CATEGORIES } from "@/lib/data/products";
import { BLOG_POSTS } from "@/lib/data/blogPosts";

const BASE = "https://lumenvestire.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = [
    "",
    "/shop",
    "/cart",
    "/wishlist",
    "/checkout",
    "/about",
    "/contact",
    "/blog",
  ];

  return [
    ...staticPaths.map((p) => ({ url: `${BASE}${p}`, lastModified: new Date() })),
    ...ALL_CATEGORIES.map((c) => ({
      url: `${BASE}/shop?category=${encodeURIComponent(c)}`,
      lastModified: new Date(),
    })),
    ...PRODUCTS.map((p) => ({
      url: `${BASE}/product/${p.slug}`,
      lastModified: new Date(),
    })),
    ...BLOG_POSTS.map((p) => ({
      url: `${BASE}/blog/${p.slug}`,
      lastModified: new Date(),
    })),
  ];
}
