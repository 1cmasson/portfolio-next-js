import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout";
import { ConsoleBlock, HeadlineGlow } from "@/components/terminal";

// Temporary static data - will be replaced with Sanity
const blogPosts = [
  {
    slug: "2025-03-08-markdown-orbit",
    title: "Plotting the Markdown Orbit",
    date: "2025-03-08",
    summary: "How we swapped Sanity for local Markdown while keeping the cosmic terminal vibe intact.",
    tags: ["markdown", "accessibility", "tooling"],
    body: `
The journey to simplify our content pipeline started with a question: do we really need a headless CMS for a portfolio site?

## The Problem

Our original setup used Sanity for everything—blog posts, project descriptions, even small UI copy changes. While powerful, it added complexity:

- Extra build steps for content syncing
- API calls that could fail
- A dashboard most collaborators found intimidating

## The Solution

We moved to local Markdown files with frontmatter. The benefits were immediate:

1. **Version control**: Content lives alongside code
2. **No API calls**: Everything bundles at build time
3. **Familiar editing**: Any text editor works

## Implementation

The transition involved:

- Creating a manifest.json to track posts
- Building a simple frontmatter parser
- Styling the rendered HTML to match our terminal aesthetic

## What's Next

We're planning to add:

- Tag-based filtering
- Search functionality
- RSS feed generation

The cosmic terminal vibe remains intact, now powered by humble Markdown files.
    `,
  },
];

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

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
  const post = blogPosts.find((p) => p.slug === slug);

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
        </header>

        {/* Article Body */}
        <ConsoleBlock className="prose prose-invert prose-green max-w-none">
          <article
            className="space-y-6 text-slate-200/90"
            dangerouslySetInnerHTML={{
              __html: post.body
                .split("\n\n")
                .map((paragraph) => {
                  if (paragraph.startsWith("## ")) {
                    return `<h2 class="text-2xl font-semibold text-[#7cfc00] mt-8 mb-4">${paragraph.slice(3)}</h2>`;
                  }
                  if (paragraph.startsWith("1. ") || paragraph.startsWith("- ")) {
                    const items = paragraph.split("\n").filter(Boolean);
                    const isOrdered = paragraph.startsWith("1. ");
                    const listItems = items
                      .map((item) => `<li class="ml-4">${item.replace(/^[\d]+\.\s|^-\s/, "")}</li>`)
                      .join("");
                    return isOrdered
                      ? `<ol class="list-decimal list-inside space-y-2">${listItems}</ol>`
                      : `<ul class="list-disc list-inside space-y-2">${listItems}</ul>`;
                  }
                  if (paragraph.trim()) {
                    return `<p>${paragraph}</p>`;
                  }
                  return "";
                })
                .join(""),
            }}
          />
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
