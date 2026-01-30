import Link from "next/link";
import { cn } from "@/lib/utils";
import type { Project } from "@/types";

interface PlanetCardProps {
  project: Project;
  className?: string;
}

export function PlanetCard({ project, className }: PlanetCardProps) {
  const hasLink = project.links?.caseStudy || project.links?.source || project.links?.demo;
  const linkHref = project.links?.caseStudy || project.links?.source || project.links?.demo;

  return (
    <article
      className={cn("planet-card", className)}
      aria-label={`Project: ${project.title}`}
    >
      <header className="flex items-center justify-between mb-4">
        <span className="text-2xl" aria-hidden="true">
          {project.emoji}
        </span>
        <h3 className="text-xl font-semibold text-[#7cfc00] text-glow-green">
          {project.title}
        </h3>
      </header>

      <p className="text-sm text-slate-200/80 mb-4">
        {project.summary}
      </p>

      {project.tech && project.tech.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tech.map((tech) => (
            <span
              key={tech}
              className="border border-[rgba(124,252,0,0.3)] px-2 py-1 rounded text-xs uppercase tracking-[0.25em] text-slate-200/70"
            >
              {tech}
            </span>
          ))}
        </div>
      )}

      {hasLink && linkHref ? (
        <Link
          href={linkHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm text-[#facc15] hover:text-[#7cfc00] transition focus-visible"
        >
          view project
          <span aria-hidden="true">→</span>
        </Link>
      ) : (
        <span className="text-xs uppercase tracking-[0.3em] text-slate-200/60">
          in development
        </span>
      )}
    </article>
  );
}
