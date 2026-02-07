import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout";
import { HeadlineGlow } from "@/components/terminal";
import { client, blogPostsQuery } from "@/lib/sanity";
import type { BlogPost } from "@/types";

export const metadata: Metadata = {
  title: "Blog",
  description: "Explore Markdown-powered transmissions straight from the Nyan Cat Space terminal.",
};

// Fallback data when Sanity is empty
const fallbackPosts: BlogPost[] = [
  {
    slug: "2025-03-08-markdown-orbit",
    title: "Plotting the Markdown Orbit",
    date: "2025-03-08",
    summary: "How we swapped Sanity for local Markdown while keeping the cosmic terminal vibe intact.",
    tags: ["markdown", "accessibility", "tooling"],
  },
];

async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const posts = await client.fetch(blogPostsQuery);
    return posts?.length > 0 ? posts : fallbackPosts;
  } catch {
    return fallbackPosts;
  }
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
}

export default async function BlogPage() {
  const blogPosts = await getBlogPosts();
  
  return (
    <main id="main-content" className="relative z-10 px-6 py-16 md:py-24">
      <Container className="space-y-12">
        {/* Hero */}
        <section aria-labelledby="blog-hero" className="space-y-6">
          <p className="text-sm uppercase tracking-[0.35em] text-[#facc15] text-glow-amber">
            captain&apos;s log
          </p>
          <HeadlineGlow id="blog-hero">Blog Launch Pad</HeadlineGlow>
          <p className="text-slate-200/80 text-lg max-w-3xl">
            Transmissions from the cosmic terminal. Browse recent posts below or
            open any entry to read the full article with the same terminal glow.
          </p>
        </section>

        {/* Blog Index */}
        <section
          aria-labelledby="blog-index-heading"
          className="rounded-xl border border-[rgba(124,252,0,0.3)] bg-black/60 p-6 md:p-8 shadow-[0_0_40px_rgba(80,255,163,0.08)]"
        >
          <header className="space-y-3 mb-8">
            <p className="text-xs uppercase tracking-[0.35em] text-[#facc15]">recent transmissions</p>
            <div className="flex flex-wrap items-baseline gap-3">
              <h2 id="blog-index-heading" className="text-3xl font-semibold text-[#7cfc00] text-glow-green">
                Latest posts
              </h2>
              <span className="text-xs uppercase tracking-[0.25em] text-slate-200/70">
                {blogPosts.length} {blogPosts.length === 1 ? "post" : "posts"} logged
              </span>
            </div>
            <p className="text-slate-200/80 text-base max-w-3xl">
              Posts render straight from local Markdown. Enable JavaScript for live parsing, or read the pre-rendered
              versions below.
            </p>
          </header>

          {blogPosts.length > 0 ? (
            <ul className="space-y-6">
              {blogPosts.map((post) => (
                <li
                  key={post.slug}
                  className="bg-black/50 border border-[rgba(124,252,0,0.2)] p-4 md:p-6 rounded-lg"
                >
                  <article aria-labelledby={`blog-${post.slug}`}>
                    <header className="space-y-2">
                      <p className="text-xs uppercase tracking-[0.25em] text-[#facc15]">
                        {formatDate(post.date)}
                      </p>
                      <h3
                        id={`blog-${post.slug}`}
                        className="text-2xl font-semibold text-[#7cfc00] text-glow-green"
                      >
                        {post.title}
                      </h3>
                    </header>

                    <p className="text-sm text-slate-200/80 mt-4">{post.summary}</p>

                    {post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-4 text-xs uppercase tracking-[0.25em] text-slate-200/70">
                        {post.tags.map((tag) => (
                          <span
                            key={tag}
                            className="border border-[rgba(124,252,0,0.3)] px-2 py-1 rounded"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-2 text-sm text-[#facc15] hover:text-[#7cfc00] transition mt-6 focus-visible"
                    >
                      Read full article
                      <span aria-hidden="true">→</span>
                    </Link>
                  </article>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-slate-200/70">
              No posts yet. Add a Markdown file under `content/blog/` and update `content/blog/manifest.json` to
              surface it here.
            </p>
          )}
        </section>
      </Container>
    </main>
  );
}
