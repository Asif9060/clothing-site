export type ProductCategory =
  | "Shirts"
  | "Pants"
  | "Panjabi"
  | "T-Shirts"
  | "Knit Polos"
  | "Katua"
  | "Winter";

export type ProductColor = {
  name: string;
  hex: string;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  category: ProductCategory;
  price: number;
  comparePrice?: number;
  rating: number;
  reviewCount: number;
  sizes: string[];
  colors: ProductColor[];
  images: string[];
  description: string;
  details: string[];
  materials: string;
  isNew?: boolean;
  isTrending?: boolean;
  isSoldOut?: boolean;
  tags: string[];
};

// Curated Unsplash menswear photos, pre-cropped to 900×1100.
// Each ID is a real photo from Unsplash (CC0 / Unsplash License).
const img = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=900&h=1100&q=80`;

export const PRODUCTS: Product[] = [
  // ── Shirts ──────────────────────────────────────────────
  {
    id: "p01",
    slug: "ivory-poplin-classic-shirt",
    name: "Ivory Poplin Classic Shirt",
    category: "Shirts",
    price: 1990,
    rating: 4.8,
    reviewCount: 124,
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Ivory", hex: "#F6F1E7" },
      { name: "Sand", hex: "#E8DCC4" },
      { name: "Charcoal", hex: "#2E2A22" },
    ],
    images: [
      img("photo-1602810318383-e386cc2a3ccf"),
      img("photo-1598033129183-c4f50c736f10"),
      img("photo-1603252028195-93e240e4eb80"),
      img("photo-1604695573706-53170668f6a6"),
    ],
    description:
      "An everyday classic in featherweight poplin. Our Ivory Poplin shirt is cut for a clean, regular fit with a soft collar and a single chest pocket — the kind of shirt that quietly outlasts every trend.",
    details: [
      "Regular fit, true to size",
      "Soft button-down collar",
      "Single chest patch pocket",
      "Mother-of-pearl buttons",
      "Reinforced side gussets",
    ],
    materials: "100% organic Egyptian cotton poplin, 120 GSM.",
    isNew: true,
    tags: ["bestseller", "cotton", "minimal"],
  },
  {
    id: "p02",
    slug: "sand-linen-camp-shirt",
    name: "Sand Linen Camp Shirt",
    category: "Shirts",
    price: 2290,
    rating: 4.7,
    reviewCount: 86,
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Sand", hex: "#E8DCC4" },
      { name: "Olive", hex: "#6B7548" },
    ],
    images: [
      img("photo-1564584217132-2271feaeb3c5"),
      img("photo-1622445275576-721325763afe"),
      img("photo-1604695573706-53170668f6a6"),
    ],
    description:
      "An unstructured camp shirt in airy European linen. The relaxed shoulder and slightly dropped hem make it ideal for long, slow afternoons.",
    details: ["Camp collar", "Relaxed fit", "Side vents"],
    materials: "100% French linen, 165 GSM.",
    isTrending: true,
    tags: ["linen", "summer"],
  },
  {
    id: "p03",
    slug: "graphite-windowpane-shirt",
    name: "Graphite Windowpane Shirt",
    category: "Shirts",
    price: 2590,
    rating: 4.9,
    reviewCount: 41,
    sizes: ["M", "L", "XL", "XXL"],
    colors: [{ name: "Graphite", hex: "#3A3A3A" }],
    images: [
      img("photo-1602810316693-3667c854239a"),
      img("photo-1620012253295-c15cc3e65df4"),
      img("photo-1603252028195-93e240e4eb80"),
    ],
    description:
      "A considered windowpane check in cool graphite, woven in Portugal. Wears well under tailoring or open over a tee.",
    details: ["Slim modern fit", "Cutaway collar", "Convertible cuffs"],
    materials: "Cotton-linen blend, 140 GSM.",
    isNew: true,
    tags: ["check", "tailored"],
  },
  {
    id: "p04",
    slug: "crimson-pinstripe-shirt",
    name: "Crimson Pinstripe Shirt",
    category: "Shirts",
    price: 2190,
    rating: 4.6,
    reviewCount: 58,
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Crimson", hex: "#8B2A2A" },
      { name: "Indigo", hex: "#2B3A66" },
    ],
    images: [
      img("photo-1603252028195-93e240e4eb80"),
      img("photo-1620012253295-c15cc3e65df4"),
      img("photo-1598033129183-c4f50c736f10"),
    ],
    description:
      "A vintage-leaning pinstripe in saturated crimson. Best worn untucked, sleeves rolled.",
    details: ["Yarn-dyed stripe", "Lightly tapered waist"],
    materials: "100% combed cotton, 110 GSM.",
    tags: ["stripe", "statement"],
  },
  {
    id: "p05",
    slug: "sage-overshirt",
    name: "Sage Brushed Overshirt",
    category: "Shirts",
    price: 2890,
    rating: 4.8,
    reviewCount: 92,
    sizes: ["M", "L", "XL", "XXL"],
    colors: [
      { name: "Sage", hex: "#9CA98C" },
      { name: "Charcoal", hex: "#2E2A22" },
    ],
    images: [
      img("photo-1551488831-00ddcb6c6bd3"),
      img("photo-1611312449412-6cefac5dc3e4"),
      img("photo-1611312449408-fcece27cdbb7"),
    ],
    description:
      "A heavyweight brushed overshirt in mossy sage. Built like a jacket, wears like a shirt.",
    details: ["Two patch pockets", "Horn buttons", "Hidden side pockets"],
    materials: "Heavyweight cotton flannel, 280 GSM.",
    isTrending: true,
    tags: ["outerwear", "fall"],
  },
  {
    id: "p06",
    slug: "smoky-plaid-shirt",
    name: "Smoky Brown Plaid Shirt",
    category: "Shirts",
    price: 2390,
    rating: 4.5,
    reviewCount: 33,
    sizes: ["S", "M", "L", "XL"],
    colors: [{ name: "Smoky Brown", hex: "#6B5544" }],
    images: [
      img("photo-1564859228273-274232fdb516"),
      img("photo-1551488831-00ddcb6c6bd3"),
    ],
    description: "A soft, sun-faded plaid designed to age beautifully.",
    details: ["Yarn-dyed plaid", "Lightly relaxed fit"],
    materials: "100% brushed cotton.",
    tags: ["plaid", "casual"],
  },

  // ── Pants ──────────────────────────────────────────────
  {
    id: "p07",
    slug: "stone-pleated-trouser",
    name: "Stone Pleated Trouser",
    category: "Pants",
    price: 2490,
    rating: 4.8,
    reviewCount: 142,
    sizes: ["28", "30", "32", "34", "36"],
    colors: [
      { name: "Stone", hex: "#C9BBA0" },
      { name: "Charcoal", hex: "#2E2A22" },
      { name: "Black", hex: "#0F0E0A" },
    ],
    images: [
      img("photo-1473966968600-fa801b869a1a"),
      img("photo-1624378439575-d8705ad7ae80"),
      img("photo-1542272604-787c3835535d"),
    ],
    description:
      "A high-rise pleated trouser in stone cotton-linen. Cut wide through the leg with a clean, unbroken break.",
    details: ["Double pleat", "Wide straight leg", "Side adjusters"],
    materials: "Cotton-linen, 240 GSM.",
    isNew: true,
    tags: ["tailored", "minimal"],
  },
  {
    id: "p08",
    slug: "midnight-chino",
    name: "Midnight Chino",
    category: "Pants",
    price: 1990,
    rating: 4.7,
    reviewCount: 211,
    sizes: ["28", "30", "32", "34", "36", "38"],
    colors: [
      { name: "Midnight", hex: "#1B2336" },
      { name: "Olive", hex: "#5B6238" },
      { name: "Sand", hex: "#E8DCC4" },
    ],
    images: [
      img("photo-1542272604-787c3835535d"),
      img("photo-1624378439575-d8705ad7ae80"),
      img("photo-1473966968600-fa801b869a1a"),
    ],
    description:
      "The chino, refined: a clean tapered leg in midnight Japanese cotton twill.",
    details: ["Mid-rise", "Tapered leg", "Hidden coin pocket"],
    materials: "Japanese cotton twill, 280 GSM.",
    isTrending: true,
    tags: ["staple", "everyday"],
  },
  {
    id: "p09",
    slug: "ecru-linen-trouser",
    name: "Ecru Linen Drawstring Trouser",
    category: "Pants",
    price: 2290,
    rating: 4.6,
    reviewCount: 64,
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Ecru", hex: "#EFE7D5" },
      { name: "Slate", hex: "#6E7378" },
    ],
    images: [
      img("photo-1473966968600-fa801b869a1a"),
      img("photo-1542272604-787c3835535d"),
    ],
    description:
      "A drawstring trouser cut from heavyweight Belgian linen. Effortless shape, designed for warm weather.",
    details: ["Drawstring waist", "Wide leg", "Tapered ankle"],
    materials: "100% Belgian linen, 210 GSM.",
    tags: ["linen", "summer"],
  },
  {
    id: "p10",
    slug: "charcoal-wool-trouser",
    name: "Charcoal Wool Trouser",
    category: "Pants",
    price: 3290,
    rating: 4.9,
    reviewCount: 38,
    sizes: ["30", "32", "34", "36"],
    colors: [{ name: "Charcoal", hex: "#2E2A22" }],
    images: [
      img("photo-1624378439575-d8705ad7ae80"),
      img("photo-1473966968600-fa801b869a1a"),
      img("photo-1542272604-787c3835535d"),
    ],
    description: "A dress trouser in dense Italian wool — quietly authoritative.",
    details: ["Flat front", "Lined to knee"],
    materials: "Italian tropical wool, 240 GSM.",
    tags: ["formal", "tailored"],
  },

  // ── Panjabi ──────────────────────────────────────────────
  {
    id: "p11",
    slug: "pearl-embroidred-panjabi",
    name: "Pearl Embroidered Panjabi",
    category: "Panjabi",
    price: 4490,
    rating: 4.9,
    reviewCount: 73,
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Pearl", hex: "#F1E9D6" },
      { name: "Sand", hex: "#E8DCC4" },
    ],
    images: [
      img("photo-1622445275463-afa2ab738c34"),
      img("photo-1597983073512-088a25b9a40a"),
      img("photo-1604644401890-0bd678c83788"),
    ],
    description:
      "A long panjabi with hand-finished embroidery along the placket. Worn at weddings and quiet evenings alike.",
    details: ["Hand embroidery", "Inset side pockets"],
    materials: "Cotton-silk blend with hand embroidery.",
    isNew: true,
    tags: ["occasion", "embroidery"],
  },
  {
    id: "p12",
    slug: "ink-panjabi",
    name: "Ink Long Panjabi",
    category: "Panjabi",
    price: 3990,
    rating: 4.7,
    reviewCount: 49,
    sizes: ["S", "M", "L", "XL"],
    colors: [{ name: "Ink", hex: "#1F2A3A" }],
    images: [
      img("photo-1597983073512-088a25b9a40a"),
      img("photo-1622445275463-afa2ab738c34"),
    ],
    description: "A long-sleeve ink-blue panjabi in matte cotton-silk.",
    details: ["Hidden placket", "Slim shoulder"],
    materials: "Cotton-silk blend, 180 GSM.",
    tags: ["occasion", "deep-tone"],
  },
  {
    id: "p13",
    slug: "sand-eid-panjabi",
    name: "Sand Eid Panjabi",
    category: "Panjabi",
    price: 5490,
    rating: 4.8,
    reviewCount: 21,
    sizes: ["M", "L", "XL"],
    colors: [{ name: "Sand", hex: "#E8DCC4" }],
    images: [
      img("photo-1604644401890-0bd678c83788"),
      img("photo-1622445275463-afa2ab738c34"),
      img("photo-1597983073512-088a25b9a40a"),
    ],
    description: "Limited Eid capsule in sand with a tonal stitch detail.",
    details: ["Numbered edition", "Tonal embroidery"],
    materials: "Cotton-jacquard.",
    isTrending: true,
    tags: ["eid", "limited"],
  },

  // ── T-Shirts ───────────────────────────────────────────
  {
    id: "p14",
    slug: "bone-essentials-tee",
    name: "Bone Essentials Tee",
    category: "T-Shirts",
    price: 1190,
    rating: 4.7,
    reviewCount: 312,
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Bone", hex: "#EFE7D5" },
      { name: "Charcoal", hex: "#2E2A22" },
      { name: "Mauve", hex: "#A38A8E" },
    ],
    images: [
      img("photo-1521572163474-6864f9cf17ab"),
      img("photo-1583743814966-8936f5b7be1a"),
      img("photo-1622445275576-721325763afe"),
    ],
    description:
      "Heavyweight Pima cotton tee with a clean tubular body. Built to be the last white tee you buy.",
    details: ["Tubular body", "Reinforced collar", "Pre-shrunk"],
    materials: "100% Peruvian Pima cotton, 240 GSM.",
    isNew: true,
    tags: ["bestseller", "essentials"],
  },
  {
    id: "p15",
    slug: "coral-contrast-tee",
    name: "Coral Contrast Tee",
    category: "T-Shirts",
    price: 1290,
    rating: 4.5,
    reviewCount: 88,
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Coral", hex: "#D27A66" },
      { name: "Plum", hex: "#5A2A3A" },
    ],
    images: [
      img("photo-1583743814966-8936f5b7be1a"),
      img("photo-1521572163474-6864f9cf17ab"),
    ],
    description: "A short-sleeve tee with a chocolate contrast neck rib.",
    details: ["Contrast neck rib", "Slim straight fit"],
    materials: "100% cotton, 200 GSM.",
    tags: ["contrast", "summer"],
  },
  {
    id: "p16",
    slug: "mauve-relaxed-tee",
    name: "Mauve Relaxed Tee",
    category: "T-Shirts",
    price: 1390,
    rating: 4.6,
    reviewCount: 65,
    sizes: ["M", "L", "XL", "XXL"],
    colors: [{ name: "Mauve", hex: "#A38A8E" }],
    images: [
      img("photo-1622445275576-721325763afe"),
      img("photo-1583743814966-8936f5b7be1a"),
    ],
    description: "An oversized tee in sun-washed mauve.",
    details: ["Drop shoulder", "Boxy fit"],
    materials: "Garment-dyed cotton, 220 GSM.",
    tags: ["relaxed", "garment-dyed"],
  },
  {
    id: "p17",
    slug: "burgundy-relaxed-tee",
    name: "Burgundy Contrast Tee",
    category: "T-Shirts",
    price: 1290,
    rating: 4.7,
    reviewCount: 71,
    sizes: ["S", "M", "L", "XL"],
    colors: [{ name: "Burgundy", hex: "#5A1F2A" }],
    images: [
      img("photo-1583743814966-8936f5b7be1a"),
      img("photo-1521572163474-6864f9cf17ab"),
    ],
    description: "A burgundy tee with a contrasting black rib.",
    details: ["Contrast collar", "Mid-weight jersey"],
    materials: "100% Pima cotton, 200 GSM.",
    isTrending: true,
    tags: ["burgundy", "statement"],
  },

  // ── Knit Polos ────────────────────────────────────────
  {
    id: "p18",
    slug: "olive-knit-polo",
    name: "Olive Knit Polo",
    category: "Knit Polos",
    price: 2390,
    rating: 4.8,
    reviewCount: 54,
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Olive", hex: "#5B6238" },
      { name: "Sand", hex: "#E8DCC4" },
      { name: "Charcoal", hex: "#2E2A22" },
    ],
    images: [
      img("photo-1620012253295-c15cc3e65df4"),
      img("photo-1618354691373-d851c5c3a990"),
      img("photo-1622445275576-721325763afe"),
    ],
    description:
      "A knit polo in moss green, hand-loomed in small batches. The kind of piece you reach for on repeat.",
    details: ["Hand-loomed knit", "Three-button placket", "Ribbed cuffs"],
    materials: "Long-staple cotton knit.",
    isNew: true,
    tags: ["knit", "small-batch"],
  },
  {
    id: "p19",
    slug: "navy-knit-polo",
    name: "Navy Heritage Polo",
    category: "Knit Polos",
    price: 2590,
    rating: 4.7,
    reviewCount: 39,
    sizes: ["M", "L", "XL"],
    colors: [{ name: "Navy", hex: "#1F2A3A" }],
    images: [
      img("photo-1618354691373-d851c5c3a990"),
      img("photo-1620012253295-c15cc3e65df4"),
    ],
    description: "A heritage knit polo in deep navy with bone buttons.",
    details: ["Two-button placket", "Self-collar"],
    materials: "Pima cotton knit, 280 GSM.",
    tags: ["knit", "tailored"],
  },

  // ── Katua ──────────────────────────────────────────────
  {
    id: "p20",
    slug: "ivory-katua",
    name: "Ivory Katua",
    category: "Katua",
    price: 1790,
    rating: 4.6,
    reviewCount: 88,
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Ivory", hex: "#F6F1E7" },
      { name: "Sage", hex: "#9CA98C" },
    ],
    images: [
      img("photo-1597983073512-088a25b9a40a"),
      img("photo-1604644401890-0bd678c83788"),
      img("photo-1622445275463-afa2ab738c34"),
    ],
    description:
      "A traditional short kurta refined in soft cotton. A wardrobe essential for the warm months.",
    details: ["Side slits", "Mandarin collar"],
    materials: "100% cotton voile.",
    tags: ["summer", "tradition"],
  },
  {
    id: "p21",
    slug: "black-katua",
    name: "Black Minimal Katua",
    category: "Katua",
    price: 1890,
    rating: 4.7,
    reviewCount: 52,
    sizes: ["M", "L", "XL"],
    colors: [{ name: "Black", hex: "#0F0E0A" }],
    images: [
      img("photo-1622445275463-afa2ab738c34"),
      img("photo-1597983073512-088a25b9a40a"),
    ],
    description: "A minimalist black katua in soft cotton with concealed placket.",
    details: ["Concealed placket", "Relaxed shoulders"],
    materials: "Cotton voile, 110 GSM.",
    isTrending: true,
    tags: ["minimal", "occasion"],
  },

  // ── Winter ──────────────────────────────────────────────
  {
    id: "p22",
    slug: "almond-merino-sweater",
    name: "Almond Merino Sweater",
    category: "Winter",
    price: 3990,
    rating: 4.9,
    reviewCount: 67,
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Almond", hex: "#D2BE96" },
      { name: "Charcoal", hex: "#2E2A22" },
    ],
    images: [
      img("photo-1620799140408-edc6dcb6d633"),
      img("photo-1611312449412-6cefac5dc3e4"),
      img("photo-1551488831-00ddcb6c6bd3"),
    ],
    description:
      "A fine-gauge merino sweater in almond, knitted in Italy. Lightweight enough to layer, warm enough to anchor an outfit.",
    details: ["Italian-knit", "Fine gauge", "Ribbed hem & cuffs"],
    materials: "100% extrafine merino wool.",
    isNew: true,
    tags: ["merino", "winter"],
  },
  {
    id: "p23",
    slug: "graphite-overcoat",
    name: "Graphite Wool Overcoat",
    category: "Winter",
    price: 8990,
    rating: 4.9,
    reviewCount: 22,
    sizes: ["M", "L", "XL"],
    colors: [{ name: "Graphite", hex: "#3A3A3A" }],
    images: [
      img("photo-1611312449408-fcece27cdbb7"),
      img("photo-1551488831-00ddcb6c6bd3"),
      img("photo-1620799140408-edc6dcb6d633"),
    ],
    description:
      "A long, double-breasted overcoat in dense Italian wool. Hand-finished throughout.",
    details: ["Half-canvas construction", "Bemberg lining", "Peak lapel"],
    materials: "Italian wool-cashmere blend.",
    isTrending: true,
    tags: ["outerwear", "investment"],
  },
  {
    id: "p24",
    slug: "cream-cardigan",
    name: "Cream Shawl Cardigan",
    category: "Winter",
    price: 3490,
    rating: 4.6,
    reviewCount: 41,
    sizes: ["S", "M", "L", "XL"],
    colors: [{ name: "Cream", hex: "#EFE7D5" }],
    images: [
      img("photo-1611312449412-6cefac5dc3e4"),
      img("photo-1620799140408-edc6dcb6d633"),
    ],
    description: "A shawl-collar cardigan in soft cream wool.",
    details: ["Shawl collar", "Horn buttons", "Front pockets"],
    materials: "Wool-blend knit.",
    tags: ["cozy", "winter"],
  },
];

export function findProduct(slug: string) {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function relatedProducts(slug: string, limit = 4) {
  const current = findProduct(slug);
  if (!current) return PRODUCTS.slice(0, limit);
  return PRODUCTS.filter(
    (p) => p.category === current.category && p.slug !== slug
  ).slice(0, limit);
}

export const ALL_CATEGORIES: ProductCategory[] = [
  "Shirts",
  "Pants",
  "Panjabi",
  "T-Shirts",
  "Knit Polos",
  "Katua",
  "Winter",
];
