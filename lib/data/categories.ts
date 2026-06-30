import type { ProductCategory } from "./products";

export type CategoryCard = {
  name: ProductCategory;
  slug: string;
  subtitle: string;
  image: string;
  productCount: number;
};

// Curated Unsplash photos for each menswear category.
export const CATEGORIES: CategoryCard[] = [
  {
    name: "Shirts",
    slug: "shirts",
    subtitle: "Tailored everyday",
    image:
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=1200&h=1400&q=80",
    productCount: 6,
  },
  {
    name: "Pants",
    slug: "pants",
    subtitle: "Considered silhouettes",
    image:
      "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=1200&h=1400&q=80",
    productCount: 4,
  },
  {
    name: "Panjabi",
    slug: "panjabi",
    subtitle: "Quiet occasion",
    image:
      "https://images.unsplash.com/photo-1622445275463-afa2ab738c34?auto=format&fit=crop&w=1200&h=1400&q=80",
    productCount: 3,
  },
  {
    name: "T-Shirts",
    slug: "t-shirts",
    subtitle: "Pima essentials",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1200&h=1400&q=80",
    productCount: 4,
  },
  {
    name: "Knit Polos",
    slug: "knit-polos",
    subtitle: "Hand-loomed",
    image:
      "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=1200&h=1400&q=80",
    productCount: 2,
  },
  {
    name: "Katua",
    slug: "katua",
    subtitle: "Refined tradition",
    image:
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=1200&h=1400&q=80",
    productCount: 2,
  },
  {
    name: "Winter",
    slug: "winter",
    subtitle: "Heirloom wool",
    image:
      "https://images.unsplash.com/photo-1611312449412-6cefac5dc3e4?auto=format&fit=crop&w=1200&h=1400&q=80",
    productCount: 3,
  },
];
