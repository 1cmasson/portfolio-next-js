import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout";
import { ConsoleBlock, HeadlineGlow, MarkdownRenderer } from "@/components/terminal";
import { blogPosts, getBlogPost } from "@/lib/blog-data";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    return { title: "Post Not Found" };
  }

  return {
    title: post.title,
    description: post.summary,
  };
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <main id="main-content" className="relative z-10 px-6 py-16 md:py-24">
      <Container className="space-y-8 max-w-4xl">
        {/* Back Link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-[#facc15] hover:text-[#7cfc00] transition focus-visible"
        >
          <span aria-hidden="true">←</span>
          Back to blog
        </Link>

        {/* Article Header */}
        <header className="space-y-4">
          <p className="text-sm uppercase tracking-[0.35em] text-[#facc15] text-glow-amber">
            {formatDate(post.date)}
          </p>
          <HeadlineGlow id="article-title">{post.title}</HeadlineGlow>
          <p className="text-lg text-slate-200/80">{post.summary}</p>

          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 text-xs uppercase tracking-[0.25em] text-slate-200/70">
              {post.tags.map((tag) => (
                <span key={tag} className="border border-[rgba(124,252,0,0.3)] px-2 py-1 rounded">
                  {tag}
                </span>
              ))}
            </div>
          )}

          <a
            href="https://multiplayer-dungeon-game-production.up.railway.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-[rgba(124,252,0,0.6)] px-5 py-2.5 rounded-lg hover:bg-[rgba(124,252,0,0.1)] transition focus-visible text-sm font-medium uppercase tracking-[0.25em]"
          >
            🎮 Play the game
            <span aria-hidden="true">→</span>
          </a>
        </header>

        {/* Article Body */}
        <ConsoleBlock>
          <article>
            <MarkdownRenderer content={post.body} />
          </article>
        </ConsoleBlock>

        {/* Footer Navigation */}
        <div className="pt-8 border-t border-[rgba(124,252,0,0.2)]">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-[#facc15] hover:text-[#7cfc00] transition focus-visible"
          >
            <span aria-hidden="true">←</span>
            Back to all posts
          </Link>
        </div>
      </Container>
    </main>
  );
}
