// import Link from "next/link";
import { Container } from "@/components/layout";
import { ConsoleBlock, PlanetCard, HeadlineGlow, TimelineEntry } from "@/components/terminal";
import { client, projectsQuery } from "@/lib/sanity";
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

async function getProjects(): Promise<Project[]> {
  try {
    const projects = await client.fetch(projectsQuery);
    return projects?.length > 0 ? projects : fallbackProjects;
  } catch {
    return fallbackProjects;
  }
}

export default async function HomePage() {
  const allProjects = await getProjects();
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
              ~/ initializing...
            </p>
            
            <HeadlineGlow id="hero-title">
              Welcome. I&rsquo;m Carlos.
            </HeadlineGlow>
            
            <p className="text-lg md:text-xl text-slate-200/80 max-w-2xl">
              I&rsquo;m a technology curious engineer exploring different architectural domains using AI coding agents,
              from gaming and web development to backend systems and databases.
            </p>
            <p className="text-lg md:text-xl text-slate-200/80 max-w-2xl">
              I work primarily in JavaScript and modern web stacks, building enterprise tools in my 9 to 5 and
              supporting local businesses with fast, interactive websites.
            </p>
            <p className="text-lg md:text-xl text-slate-200/80 max-w-2xl">
              Dad. Husband. Builder. I love cooking, trading Bitcoin, and spending time with my family.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <a
                href="#about"
                className="inline-flex items-center gap-2 border border-[rgba(124,252,0,0.6)] px-5 py-2.5 rounded-lg hover:bg-[rgba(124,252,0,0.1)] transition focus-visible"
              >
                <span className="text-sm font-medium uppercase tracking-[0.25em]">about</span>
                <span aria-hidden="true">➜</span>
              </a>
              
              {/* <Link
                href="/projects"
                className="inline-flex items-center gap-2 border border-[rgba(244,114,182,0.5)] px-5 py-2.5 rounded-lg hover:bg-[rgba(244,114,182,0.1)] transition focus-visible"
              >
                <span className="text-sm font-medium uppercase tracking-[0.25em]">projects</span>
                <span aria-hidden="true">☄️</span>
              </Link> */}
            </div>
          </div>
          

        </Container>
      </section>

      {/* About / Resume Section */}
      <section id="about" className="px-6 py-20 md:py-28 bg-black/40">
        <Container className="space-y-16">
          {/* Intro */}
          <div className="space-y-6">
            <p className="text-sm uppercase tracking-[0.35em] text-[#facc15] text-glow-amber">
              whoami
            </p>
            <HeadlineGlow as="h2">About Me</HeadlineGlow>
            <p className="text-slate-200/80 text-lg leading-relaxed max-w-3xl">
              Software Engineer with 4+ years of experience building frontend applications, design
              systems and developer tooling at enterprise scale. Specialized in Node.js, GitHub
              Actions CI/CD pipelines, agentic AI tools and React used across hundreds of
              repositories. Passionate about replacing manual processes with scripts, pipelines and
              agentic workflows that improve quality, velocity and developer experience.
            </p>
            <p className="text-slate-200/60 text-base">
              Fluent in English and Spanish. Based in Miami, FL.
            </p>
            <a
              href="/assets/carlos-masson-resume.pdf"
              download
              className="inline-flex items-center gap-2 border border-[rgba(124,252,0,0.6)] px-4 py-2 rounded-lg hover:bg-[rgba(124,252,0,0.1)] transition focus-visible text-sm font-medium uppercase tracking-[0.25em]"
            >
              download resume
              <span aria-hidden="true">⬇</span>
            </a>
          </div>

          {/* Experience */}
          <section aria-labelledby="experience-heading">
            <ConsoleBlock title="experience" className="space-y-6">
              <ol className="space-y-6 text-sm md:text-base text-slate-200/90">
                <TimelineEntry>
                  <div className="flex flex-col gap-2">
                    <span className="text-[#facc15] font-semibold uppercase tracking-[0.25em]">
                      Oct 2022 – Present
                    </span>
                    <span className="font-semibold">The Home Depot — Software Engineer II</span>
                    <ul className="list-disc list-inside space-y-1 text-slate-200/70">
                      <li>Implemented GitHub Actions pipelines to measure React component health across 400+ repositories.</li>
                      <li>Built an AI-powered NLP tool using Gemini that lets developers query internal docs, metrics and ownership data in natural language.</li>
                      <li>Deployed an MCP RAG server indexing documentation and engineering knowledge to power contextual AI and Copilot workflows.</li>
                      <li>Led development of Harmony, a StoryBook-like platform providing a UI playground and capturing analytics from Core Web Vitals, New Relic, GitHub, and Jira.</li>
                      <li>Maintained and enhanced a WebdriverIO E2E testing framework for critical mobile and desktop user flows.</li>
                    </ul>
                  </div>
                </TimelineEntry>
                <TimelineEntry>
                  <div className="flex flex-col gap-2">
                    <span className="text-[#facc15] font-semibold uppercase tracking-[0.25em]">
                      Aug 2021 – Oct 2022
                    </span>
                    <span className="font-semibold">The Home Depot — Software Engineer I</span>
                    <ul className="list-disc list-inside space-y-1 text-slate-200/70">
                      <li>Built an internal UI component intelligence platform (API &amp; React UI) with a centralized database of metadata for all web components.</li>
                      <li>Developed a Node.js CLI authentication framework implementing OIDC/OAuth flows for secure login and token management.</li>
                      <li>Contributed to the Stencil Design System, creating accessible, mobile-first React components.</li>
                      <li>Collaborated with UX and platform teams to enforce WCAG accessibility and consistent design primitives across the organization.</li>
                    </ul>
                  </div>
                </TimelineEntry>
              </ol>
            </ConsoleBlock>
          </section>

          {/* Skills */}
          <section aria-labelledby="skills-heading" className="grid md:grid-cols-2 gap-8">
            <ConsoleBlock title="skill matrix" className="space-y-4">
              <ul className="space-y-2 text-sm md:text-base text-slate-200/90">
                <TimelineEntry>
                  <span className="text-[#facc15] font-semibold">Frontend &amp; UI:</span>{" "}
                  React, TypeScript, JavaScript, HTML, CSS, Design Systems, Accessibility (WCAG), Storybook
                </TimelineEntry>
                <TimelineEntry>
                  <span className="text-[#facc15] font-semibold">Backend &amp; Tooling:</span>{" "}
                  Node.js, REST APIs, CLI Development, OAuth/OIDC, WebdriverIO, GraphQL, Apollo Cache
                </TimelineEntry>
                <TimelineEntry>
                  <span className="text-[#facc15] font-semibold">CI/CD &amp; DevEx:</span>{" "}
                  GitHub Actions, Jest, ESLint, ViteJS, Grafana
                </TimelineEntry>
              </ul>
            </ConsoleBlock>

            <ConsoleBlock title="emerging tech" className="space-y-4">
              <ul className="space-y-2 text-sm md:text-base text-slate-200/90">
                <TimelineEntry>
                  <span className="text-[#facc15] font-semibold">AI &amp; Automation:</span>{" "}
                  Gemini API, RAG, MCP Servers, Agentic Coding, GitHub Copilot CLI, NLP Search
                </TimelineEntry>
                <TimelineEntry>
                  <span className="text-[#facc15] font-semibold">Datastores &amp; Infra:</span>{" "}
                  MongoDB, Internal APIs, Cloud-native workflows
                </TimelineEntry>
              </ul>
            </ConsoleBlock>
          </section>

          {/* Education */}
          <section aria-labelledby="education-heading">
            <ConsoleBlock title="education" className="space-y-4">
              <ol className="space-y-4 text-sm md:text-base text-slate-200/90">
                <TimelineEntry>
                  <div className="flex flex-col gap-1">
                    <span className="text-[#facc15] font-semibold uppercase tracking-[0.25em]">
                      Aug 2021
                    </span>
                    <span>B.S. in Computer Science, Minor in Economics</span>
                    <span className="text-slate-200/60">Florida International University</span>
                  </div>
                </TimelineEntry>
                <TimelineEntry>
                  <div className="flex flex-col gap-1">
                    <span className="text-[#facc15] font-semibold uppercase tracking-[0.25em]">
                      Aug 2019
                    </span>
                    <span>A.A. in Computer Science</span>
                    <span className="text-slate-200/60">Miami-Dade College</span>
                  </div>
                </TimelineEntry>
              </ol>
            </ConsoleBlock>
          </section>
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
            
            {/* <Link
              href="/projects"
              className="self-start md:self-auto inline-flex items-center gap-2 border border-[rgba(244,114,182,0.5)] px-4 py-2 rounded-lg hover:bg-[rgba(244,114,182,0.1)] transition focus-visible"
            >
              view all
              <span aria-hidden="true">☄</span>
            </Link> */}
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allProjects.map((project) => (
              <PlanetCard key={project.slug} project={project} />
            ))}
          </div>
        </Container>
      </section>
    </main>
  );
}
