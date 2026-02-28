import Link from "next/link";
import { cn } from "@/lib/utils";
import type { BlogPost } from "@/types";

interface BlogCardProps {
  post: BlogPost;
  className?: string;
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

export function BlogCard({ post, className }: BlogCardProps) {
  return (
    <article
      className={cn("planet-card", className)}
      aria-label={`Blog post: ${post.title}`}
    >
      <header className="flex items-center justify-between mb-4">
        <span className="text-2xl" aria-hidden="true">
          📝
        </span>
        <p className="text-xs uppercase tracking-[0.25em] text-[#facc15]">
          {formatDate(post.date)}
        </p>
      </header>

      <h3 className="text-xl font-semibold text-[#7cfc00] text-glow-green mb-2">
        {post.title}
      </h3>

      <p className="text-sm text-slate-200/80 mb-4">
        {post.summary}
      </p>

      {post.tags && post.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="border border-[rgba(124,252,0,0.3)] px-2 py-1 rounded text-xs uppercase tracking-[0.25em] text-slate-200/70"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      <Link
        href={`/blog/${post.slug}`}
        className="inline-flex items-center gap-2 text-sm text-[#facc15] hover:text-[#7cfc00] transition focus-visible"
      >
        read post
        <span aria-hidden="true">→</span>
      </Link>
    </article>
  );
}
