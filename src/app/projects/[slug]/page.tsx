import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout";
import { ConsoleBlock, HeadlineGlow, TimelineEntry } from "@/components/terminal";

// Temporary static data - will be replaced with Sanity
const projects = [
  {
    slug: "cosmic-control-room",
    title: "Cosmic Control Room",
    emoji: "🛰️",
    summary: "Led design system overhaul for mission dashboards serving 200+ analysts.",
    tech: ["React", "TypeScript", "Storybook"],
    launchDate: "2023-06-15",
    body: {
      overview:
        "The Cosmic Control Room project involved redesigning the mission control dashboard used by over 200 analysts. The goal was to create a cohesive design system that improved accessibility and reduced UI defects.",
      challenges: [
        "Legacy codebase with inconsistent component usage",
        "No existing design tokens or documentation",
        "Tight deadline with ongoing feature development",
      ],
      solutions: [
        "Created a comprehensive component library with Storybook",
        "Implemented design tokens for colors, spacing, and typography",
        "Built automated visual regression testing",
      ],
      results: [
        "45% reduction in UI-related bugs",
        "Component adoption across 12+ product squads",
        "Design handoff time reduced by 60%",
      ],
    },
    links: { caseStudy: "https://github.com/1cmasson" },
  },
  {
    slug: "aurora-synth-lab",
    title: "Aurora Synth Lab",
    emoji: "🎹",
    summary: "Browser-based synthesizer with cat-triggered pads and modular effects.",
    tech: ["Web Audio", "Canvas", "MIDI"],
    body: {
      overview:
        "Aurora Synth Lab is an experimental browser-based synthesizer that combines the Web Audio API with creative interaction patterns, including motion-triggered sound pads.",
      challenges: [
        "Low-latency audio in the browser",
        "Complex signal routing for modular effects",
        "Cross-browser MIDI support",
      ],
      solutions: [
        "Optimized AudioWorklet for minimal latency",
        "Built a visual node-based routing system",
        "Created a MIDI abstraction layer for broad support",
      ],
      results: [
        "Sub-10ms audio latency achieved",
        "Featured at 2 electronic music festivals",
        "Open-sourced with 500+ GitHub stars",
      ],
    },
  },
];

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return { title: "Project Not Found" };
  }

  return {
    title: project.title,
    description: project.summary,
  };
}

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

function formatDate(dateString?: string): string {
  if (!dateString) return "Date TBA";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <main id="main-content" className="relative z-10 px-6 py-16 md:py-24">
      <Container className="space-y-8 max-w-4xl">
        {/* Back Link */}
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-sm text-[#facc15] hover:text-[#7cfc00] transition focus-visible"
        >
          <span aria-hidden="true">←</span>
          Back to projects
        </Link>

        {/* Project Header */}
        <header className="space-y-4">
          <div className="flex items-center gap-4">
            <span className="text-4xl" aria-hidden="true">
              {project.emoji}
            </span>
            <HeadlineGlow id="project-title">{project.title}</HeadlineGlow>
          </div>
          <p className="text-lg text-slate-200/80">{project.summary}</p>

          <div className="flex flex-wrap items-center gap-4">
            {project.launchDate && (
              <span className="text-sm text-slate-200/70">Launched {formatDate(project.launchDate)}</span>
            )}
            {project.tech.length > 0 && (
              <div className="flex flex-wrap gap-2 text-xs uppercase tracking-[0.25em] text-slate-200/70">
                {project.tech.map((tech) => (
                  <span key={tech} className="border border-[rgba(124,252,0,0.3)] px-2 py-1 rounded">
                    {tech}
                  </span>
                ))}
              </div>
            )}
          </div>

          {project.links && (
            <div className="flex gap-4">
              {project.links.caseStudy && (
                <a
                  href={project.links.caseStudy}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border border-[rgba(124,252,0,0.6)] px-4 py-2 rounded-lg hover:bg-[rgba(124,252,0,0.1)] transition focus-visible text-sm"
                >
                  View Live
                  <span aria-hidden="true">→</span>
                </a>
              )}
            </div>
          )}
        </header>

        {/* Project Body */}
        {project.body && (
          <div className="space-y-8">
            <ConsoleBlock title="mission overview" className="space-y-4">
              <p className="text-slate-200/90">{project.body.overview}</p>
            </ConsoleBlock>

            <div className="grid md:grid-cols-2 gap-6">
              <ConsoleBlock title="challenges" className="space-y-4">
                <ul className="space-y-2">
                  {project.body.challenges.map((challenge, idx) => (
                    <TimelineEntry key={idx}>{challenge}</TimelineEntry>
                  ))}
                </ul>
              </ConsoleBlock>

              <ConsoleBlock title="solutions" className="space-y-4">
                <ul className="space-y-2">
                  {project.body.solutions.map((solution, idx) => (
                    <TimelineEntry key={idx}>{solution}</TimelineEntry>
                  ))}
                </ul>
              </ConsoleBlock>
            </div>

            <ConsoleBlock title="results" className="space-y-4">
              <ul className="space-y-2">
                {project.body.results.map((result, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-slate-200/90">
                    <span className="text-[#7cfc00]">✓</span>
                    {result}
                  </li>
                ))}
              </ul>
            </ConsoleBlock>
          </div>
        )}

        {/* Footer Navigation */}
        <div className="pt-8 border-t border-[rgba(124,252,0,0.2)]">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm text-[#facc15] hover:text-[#7cfc00] transition focus-visible"
          >
            <span aria-hidden="true">←</span>
            Back to all projects
          </Link>
        </div>
      </Container>
    </main>
  );
}
