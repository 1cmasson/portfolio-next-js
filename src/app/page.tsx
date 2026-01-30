import Link from "next/link";
import { Container } from "@/components/layout";
import { MotionToggle, StarWarsCrawl } from "@/components/animation";
import { ConsoleBlock, PlanetCard, HeadlineGlow, TimelineEntry } from "@/components/terminal";
import { client, featuredProjectsQuery } from "@/lib/sanity";
import type { Project } from "@/types";

// Fallback data when Sanity is empty
const fallbackProjects: Project[] = [
  {
    slug: "terminal-nebula",
    title: "Terminal Nebula",
    emoji: "🪐",
    summary: "Multiplayer coding playground built for hackathons, featuring real-time pair programming and cosmic themes.",
    tech: ["React", "WebSocket", "TypeScript"],
    links: { source: "https://github.com/1cmasson" },
  },
  {
    slug: "rainbow-drive",
    title: "Rainbow Drive",
    emoji: "🌈",
    summary: "Hardware art installation synchronizing LED matrices with synthesized chip tunes and catnip-scented sensors.",
    tech: ["Arduino", "WebGL", "MIDI"],
  },
  {
    slug: "galactic-docs-api",
    title: "Galactic Docs API",
    emoji: "🛰️",
    summary: "Microservice knowledge base that renders Markdown to terminal dashboards for mission control teams.",
    tech: ["Node.js", "Markdown", "REST"],
    links: { source: "https://github.com/1cmasson" },
  },
];

async function getFeaturedProjects(): Promise<Project[]> {
  try {
    const projects = await client.fetch(featuredProjectsQuery);
    return projects?.length > 0 ? projects : fallbackProjects;
  } catch {
    return fallbackProjects;
  }
}

export default async function HomePage() {
  const featuredProjects = await getFeaturedProjects();
  return (
    <main id="main-content" className="relative z-10">
      {/* Hero Section */}
      <section
        aria-labelledby="hero-title"
        className="min-h-[calc(100vh-200px)] flex items-center px-6 py-16 md:py-24 lg:py-32"
      >
        <Container className="grid lg:grid-cols-[1.2fr,0.8fr] gap-10 items-center">
          <div className="space-y-8">
            <p className="text-sm uppercase tracking-[0.35em] text-[#facc15] text-glow-amber">
              init launch sequence...
            </p>
            
            <HeadlineGlow id="hero-title">
              Nyan Cat Space Terminal
            </HeadlineGlow>
            
            <p className="text-lg md:text-xl text-slate-200/80 max-w-2xl">
              Welcome aboard the cosmic command line. I&rsquo;m Carlos Masson, a full-stack explorer crafting playful
              experiences that orbit creativity, accessibility, and delightful UX. This terminal is a repository of
              adventures launched across the galaxy—from professional missions to experimental nebulae.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 border border-[rgba(124,252,0,0.6)] px-5 py-2.5 rounded-lg hover:bg-[rgba(124,252,0,0.1)] transition focus-visible"
              >
                <span className="text-sm font-medium uppercase tracking-[0.25em]">about</span>
                <span aria-hidden="true">➜</span>
              </Link>
              
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 border border-[rgba(244,114,182,0.5)] px-5 py-2.5 rounded-lg hover:bg-[rgba(244,114,182,0.1)] transition focus-visible"
              >
                <span className="text-sm font-medium uppercase tracking-[0.25em]">projects</span>
                <span aria-hidden="true">☄️</span>
              </Link>
              
              <MotionToggle />
            </div>
          </div>
          
          <StarWarsCrawl>
            <p className="text-[#facc15]">A long time ago in a galaxy far, far away...</p>
            <p>
              A curious developer cat learned that the best way to ship delightful software was to pilot every
              console with empathy, performance, and rhythm. This repo chronicles journeys through SaaS nebulae,
              creative hackathons, and cosmic art experiments.
            </p>
            <p className="text-[#f472b6]">
              Scroll to explore planets containing professional missions, tinkering labs, and collaborations orbiting
              the stars.
            </p>
          </StarWarsCrawl>
        </Container>
      </section>

      {/* About Preview Section */}
      <section className="px-6 py-20 md:py-28 bg-black/40">
        <Container className="grid lg:grid-cols-2 gap-10 items-start">
          <div className="space-y-6">
            <HeadlineGlow as="h2">
              Captain&rsquo;s log preview
            </HeadlineGlow>
            
            <p className="text-slate-200/80 leading-relaxed">
              The About section reads like a system diary: missions shipped, technologies mastered, and favorite cosmic
              companions. Expect ASCII art, command-line output, and the occasional easter egg.
            </p>
            
            <ul className="space-y-3 text-sm text-slate-200/80">
              <TimelineEntry>Highlights from leading design systems and web platform teams</TimelineEntry>
              <TimelineEntry>Experiments involving generative art, retro UI, and playful hardware</TimelineEntry>
              <TimelineEntry>Personal coordinates to collaborate or send space mail</TimelineEntry>
            </ul>
            
            <Link
              href="/about"
              className="inline-flex items-center gap-2 border border-[rgba(124,252,0,0.6)] px-4 py-2 rounded-lg hover:bg-[rgba(124,252,0,0.1)] transition focus-visible"
            >
              enter log
              <span aria-hidden="true">→</span>
            </Link>
          </div>
          
          <ConsoleBlock title="sample output">
            <pre className="text-sm md:text-base text-slate-200/90 whitespace-pre-wrap">
{`nyan@space:~$ cat experience.log

> 2019-2021
  led frontend squads @ hyperdrive labs
  accelerated design system adoption to warp 9

> 2021-2024
  piloted platform guilds for nebulous startups
  delivered resilient web tooling with cosmic uptime

> Present
  crafting playful experiments with accessibility at the helm`}
            </pre>
          </ConsoleBlock>
        </Container>
      </section>

      {/* Projects Preview Section */}
      <section className="px-6 py-20 md:py-28">
        <Container className="space-y-10">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <HeadlineGlow as="h2">
                Projects in orbit
              </HeadlineGlow>
              <p className="text-slate-200/80 max-w-2xl">
                Each planet is a project log with mission details. Hover or tab to feel the gravitational pulse.
              </p>
            </div>
            
            <Link
              href="/projects"
              className="self-start md:self-auto inline-flex items-center gap-2 border border-[rgba(244,114,182,0.5)] px-4 py-2 rounded-lg hover:bg-[rgba(244,114,182,0.1)] transition focus-visible"
            >
              view all
              <span aria-hidden="true">☄</span>
            </Link>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProjects.map((project) => (
              <PlanetCard key={project.slug} project={project} />
            ))}
          </div>
        </Container>
      </section>
    </main>
  );
}
