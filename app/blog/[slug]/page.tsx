import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { BLOG_POSTS } from "@/lib/data/blogPosts";
import { FiArrowLeft } from "react-icons/fi";

export function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

export default function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = BLOG_POSTS.find((p) => p.slug === params.slug);
  if (!post) notFound();

  const related = BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <article className="container-narrow py-12 lg:py-20">
      <Link
        href="/blog"
        className="inline-flex items-center gap-2 text-[11px] uppercase tracking-widest hover:text-brass"
      >
        <FiArrowLeft size={14} /> All articles
      </Link>
      <p className="mt-8 text-[11px] uppercase tracking-ultra text-brass">
        {post.category}
      </p>
      <h1 className="mt-3 h-display text-4xl md:text-6xl text-balance">
        {post.title}
      </h1>
      <p className="mt-6 text-charcoal-400">
        {post.date} · {post.readTime} · by {post.author}
      </p>

      <div className="relative aspect-[16/9] my-10 overflow-hidden rounded-sm bg-ivory-100">
        <Image
          src={post.hero}
          alt={post.title}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 60vw"
          className="object-cover"
        />
      </div>

      <div className="prose-container space-y-6 text-lg leading-relaxed text-charcoal-500 max-w-2xl">
        {post.body.map((para, i) => (
          <p
            key={i}
            className={
              i === 0
                ? "font-editorial text-2xl italic text-charcoal-300"
                : ""
            }
          >
            {para}
          </p>
        ))}
      </div>

      <div className="mt-16 pt-10 border-t border-charcoal-100">
        <p className="h-eyebrow">Continue reading</p>
        <div className="grid sm:grid-cols-2 gap-8 mt-6">
          {related.map((r) => (
            <Link
              key={r.slug}
              href={`/blog/${r.slug}`}
              className="group block"
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-sm bg-ivory-100">
                <Image
                  src={r.hero}
                  alt={r.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <p className="mt-3 text-[11px] uppercase tracking-ultra text-brass">
                {r.category}
              </p>
              <h3 className="mt-1 font-display text-2xl group-hover:text-brass">
                {r.title}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </article>
  );
}
