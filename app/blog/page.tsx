import Link from "next/link";
import Image from "next/image";
import { BLOG_POSTS } from "@/lib/data/blogPosts";

export default function BlogIndexPage() {
  const [featured, ...rest] = BLOG_POSTS;

  return (
    <div className="container-tight py-12 lg:py-20">
      <div className="mb-14">
        <p className="h-eyebrow">Journal</p>
        <h1 className="h-display text-4xl md:text-6xl mt-3">
          Letters
          <em className="font-editorial text-brass"> from the atelier.</em>
        </h1>
        <p className="mt-4 text-charcoal-400 max-w-xl">
          Essays on materials, fit, and the quiet process behind what we make.
        </p>
      </div>

      {/* Featured */}
      <Link href={`/blog/${featured.slug}`} className="group block mb-16">
        <div className="relative aspect-[16/9] overflow-hidden rounded-sm bg-ivory-100">
          <Image
            src={featured.hero}
            alt={featured.title}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 80vw"
            className="object-cover transition-transform duration-1000 group-hover:scale-[1.03]"
          />
        </div>
        <div className="mt-6 grid md:grid-cols-[1fr_auto] gap-6 items-end">
          <div>
            <p className="text-[11px] uppercase tracking-ultra text-brass">
              {featured.category} · Featured
            </p>
            <h2 className="font-display text-4xl md:text-5xl mt-2 text-balance group-hover:text-brass transition-colors">
              {featured.title}
            </h2>
            <p className="mt-3 text-charcoal-400 max-w-2xl text-balance">
              {featured.excerpt}
            </p>
          </div>
          <p className="text-xs uppercase tracking-widest text-charcoal-400">
            {featured.date} · {featured.readTime}
          </p>
        </div>
      </Link>

      {/* Rest */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
        {rest.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group block"
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-sm bg-ivory-100">
              <Image
                src={post.hero}
                alt={post.title}
                fill
                sizes="(max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <p className="mt-5 text-[11px] uppercase tracking-ultra text-brass">
              {post.category}
            </p>
            <h3 className="mt-2 font-display text-2xl leading-snug group-hover:text-brass transition-colors">
              {post.title}
            </h3>
            <p className="mt-2 text-charcoal-400 text-sm leading-relaxed">
              {post.excerpt}
            </p>
            <p className="mt-4 text-[11px] uppercase tracking-widest text-charcoal-400">
              {post.date} · {post.readTime}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
