export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  hero: string;
  body: string[];
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "the-language-of-linen",
    title: "The Language of Linen",
    category: "Material",
    author: "Atelier",
    date: "June 12, 2026",
    readTime: "5 min read",
    hero: "https://images.unsplash.com/photo-1622445275576-721325763afe?auto=format&fit=crop&w=1600&h=1000&q=80",
    excerpt:
      "Why we keep returning to linen — and how to wear it across the warmer months without ever looking overworked.",
    body: [
      "Linen does something quietly radical: it refuses to behave. It creases, softens, and records the day. We treat those marks not as flaws but as evidence of wear — a shirt that has been worn.",
      "In our atelier we work with two mills: a Belgian weaver for shirts and a Portuguese house for trousers. The Belgian yarn is airspun for a more textured hand; the Portuguese is smoother and slub-free, ideal for tailoring-adjacent pieces.",
      "Wear linen once and you'll understand why we've built our warm-weather capsule around it.",
    ],
  },
  {
    slug: "on-quiet-luxury",
    title: "On Quiet Luxury",
    category: "Point of view",
    author: "Hannan Reza",
    date: "May 28, 2026",
    readTime: "4 min read",
    hero: "https://images.unsplash.com/photo-1564859228273-274232fdb516?auto=format&fit=crop&w=1600&h=1000&q=80",
    excerpt:
      "Quiet luxury isn't a trend. It's a return to clothes you don't have to explain.",
    body: [
      "Every few seasons the conversation returns to 'quiet luxury' — usually accompanied by photographs of the same handful of houses. We think of it more plainly: clothing that earns its place in your wardrobe by being well-made, well-cut, and hard to replace.",
      "There is no logo in our clothes, and intentionally so.",
    ],
  },
  {
    slug: "the-panjabi-reimagined",
    title: "The Panjabi, Reimagined",
    category: "Atelier",
    author: "Atelier",
    date: "May 04, 2026",
    readTime: "7 min read",
    hero: "https://images.unsplash.com/photo-1604644401890-0bd678c83788?auto=format&fit=crop&w=1600&h=1000&q=80",
    excerpt:
      "We sat down with our pattern cutter to discuss how a traditional silhouette can be modernized without losing its soul.",
    body: [
      "The challenge of the panjabi is restraint. The garment already carries so much — color, embroidery, occasion — that the cut must remain disciplined.",
      "Our approach: lengthen the body by 1.5cm, raise the armhole, taper the sleeve. Subtle changes that read as new without ever shouting about it.",
    ],
  },
  {
    slug: "care-for-your-merino",
    title: "How to Care for Your Merino",
    category: "Care",
    author: "Atelier",
    date: "April 19, 2026",
    readTime: "3 min read",
    hero: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=1600&h=1000&q=80",
    excerpt:
      "Three rules that will keep a fine merino sweater close to new for a decade.",
    body: [
      "Wash less, fold more, never dry on a radiator.",
      "A merino sweater rewards gentle handling. Hand wash in cool water with a wool-specific detergent; press out water in a towel; lay flat to dry.",
    ],
  },
];
