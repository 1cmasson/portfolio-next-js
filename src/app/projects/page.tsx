import type { Metadata } from "next";
import { Container } from "@/components/layout";
import { ConsoleBlock, PlanetCard, HeadlineGlow } from "@/components/terminal";
import { client, projectsQuery } from "@/lib/sanity";
import type { Project } from "@/types";

export const metadata: Metadata = {
  title: "Projects",
  description: "Browse creative experiments and professional missions orbiting the Nyan Cat Space terminal.",
};

// Fallback data when Sanity is empty
const fallbackProjects: Project[] = [
  {
    slug: "cosmic-control-room",
    title: "Cosmic Control Room",
    emoji: "🛰️",
    summary: "Led design system overhaul for mission dashboards serving 200+ analysts. Introduced accessible component tokens, cut UI defects by 45%.",
    tech: ["React", "TypeScript", "Storybook"],
    links: { caseStudy: "https://github.com/1cmasson" },
  },
  {
    slug: "aurora-synth-lab",
    title: "Aurora Synth Lab",
    emoji: "🎹",
    summary: "Browser-based synthesizer built with Web Audio and Canvas. Features cat-triggered pads and modular effects pipeline for live shows.",
    tech: ["Web Audio", "Canvas", "MIDI"],
  },
  {
    slug: "nebula-narrative-engine",
    title: "Nebula Narrative Engine",
    emoji: "📚",
    summary: "Interactive fiction toolkit enabling branching stories delivered via terminal UI. Supports Markdown authoring and real-time previews.",
    tech: ["TypeScript", "Markdown", "React"],
    links: { source: "https://github.com/1cmasson" },
  },
  {
    slug: "rainbow-drive-fleet",
    title: "Rainbow Drive Fleet",
    emoji: "🚀",
    summary: "Fleet of procedurally generated cat rockets displayed at art festivals. Powered by WebGL shaders and MIDI inputs.",
    tech: ["WebGL", "GLSL", "MIDI"],
  },
  {
    slug: "astro-ally",
    title: "Astro Ally",
    emoji: "🧭",
    summary: "Accessibility-first companion app offering WCAG checklists and live contrast tooling inside browser panels.",
    tech: ["React", "Chrome Extension", "WCAG"],
    links: { source: "https://github.com/1cmasson" },
  },
  {
    slug: "lint-in-space",
    title: "Lint in Space",
    emoji: "🛰️",
    summary: "ESLint plugin suite that enforces motion safety, color contrast, and terminal-friendly typography for web teams.",
    tech: ["ESLint", "AST", "Node.js"],
  },
];

async function getProjects(): Promise<Project[]> {
  try {
    const projects = await client.fetch(projectsQuery);
    return projects?.length > 0 ? projects : fallbackProjects;
  } catch {
    return fallbackProjects;
  }
}

// Spotlight project for detailed view
const spotlightProject = {
  title: "Starlit Console Uplink",
  launchDate: "16 Jul 2025",
  summary: "Pair-programming command center that syncs commits with cosmic telemetry and keeps collaborators in flow.",
  tech: ["Vanilla JS", "Tailwind CSS", "Web Components"],
  highlights: [
    "Terminal-grade contrast modes with prefers-reduced-motion guards.",
    "Clipboard helper for sharing invite codes during live pairing.",
    "Offline-first caching so jump drives stay in sync even without uplink coverage.",
  ],
  crewFeedback: '"Feels like coding from a star cruiser." — Beta testers at the Nebula Forge',
  nextSteps: [
    "Expand telemetry overlay for CPU/RAM monitoring.",
    "Add blog stream powered by the new Markdown engine.",
    "Capture Playwright regression journeys once the parser is finalized.",
  ],
};

export default async function ProjectsPage() {
  const projects = await getProjects();
  
  return (
    <main id="main-content" className="relative z-10 px-6 py-16 md:py-24">
      <Container className="space-y-12">
        {/* Hero */}
        <section aria-labelledby="projects-heading" className="space-y-6">
          <p className="text-sm uppercase tracking-[0.35em] text-[#facc15] text-glow-amber">
            project orbit
          </p>
          <HeadlineGlow id="projects-heading">Planets &amp; missions</HeadlineGlow>
          <p className="text-slate-200/80 text-lg max-w-3xl">
            A collection of shipped missions, experimental prototypes, and narrative-driven playgrounds. Each planet
            highlights impact, tools, and cosmic learnings.
          </p>
        </section>

        {/* Project Grid */}
        <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3" aria-label="Project cards">
          {projects.map((project) => (
            <PlanetCard key={project.slug} project={project} />
          ))}
        </section>

        {/* Spotlight */}
        <section
          aria-labelledby="project-spotlight-heading"
          className="rounded-xl border border-[rgba(124,252,0,0.3)] bg-black/60 p-6 md:p-8 shadow-[0_0_40px_rgba(80,255,163,0.08)]"
        >
          <header className="space-y-2 mb-6">
            <p className="text-xs uppercase tracking-[0.35em] text-[#facc15]">project spotlight</p>
            <div className="flex flex-wrap items-baseline gap-3">
              <h2 id="project-spotlight-heading" className="text-3xl font-semibold text-[#7cfc00] text-glow-green">
                {spotlightProject.title}
              </h2>
              <span className="text-sm text-slate-200/70">Launched {spotlightProject.launchDate}</span>
            </div>
            <p className="text-slate-200/80 text-base max-w-3xl">{spotlightProject.summary}</p>
            <div className="flex flex-wrap gap-2 text-xs uppercase tracking-[0.25em] text-slate-200/70">
              {spotlightProject.tech.map((tech) => (
                <span key={tech} className="border border-[rgba(124,252,0,0.3)] px-2 py-1 rounded">
                  {tech}
                </span>
              ))}
            </div>
          </header>

          <article className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-[#7cfc00] mb-3">Mission Overview</h3>
              <p className="text-slate-200/80">
                The Starlit Console bridges remote collaborators through a retro terminal dashboard. Each pane renders
                markdown logs, commit diffs, and mission alerts in real time.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-[#7cfc00] mb-3">Highlights</h3>
              <ul className="space-y-2">
                {spotlightProject.highlights.map((highlight, idx) => (
                  <li key={idx} className="flex gap-2 text-slate-200/80">
                    <span className="text-[#facc15]">•</span>
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>

            <ConsoleBlock>
              <pre className="text-sm text-slate-200/90">
{`// Wormhole handshake (simplified)
await uplink.sync({ channel: 'mission-alpha', retries: 3 });`}
              </pre>
            </ConsoleBlock>

            <p className="text-slate-200/80">
              <strong className="text-[#7cfc00]">Crew feedback:</strong>{" "}
              <em className="text-[#f472b6]">{spotlightProject.crewFeedback}</em>
            </p>

            <div>
              <h3 className="text-xl font-semibold text-[#7cfc00] mb-3">Next Steps</h3>
              <ol className="space-y-2 list-decimal list-inside">
                {spotlightProject.nextSteps.map((step, idx) => (
                  <li key={idx} className="text-slate-200/80">{step}</li>
                ))}
              </ol>
            </div>
          </article>
        </section>
      </Container>
    </main>
  );
}
