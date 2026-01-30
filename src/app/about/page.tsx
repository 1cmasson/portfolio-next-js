import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout";
import { ConsoleBlock, HeadlineGlow, TimelineEntry } from "@/components/terminal";

export const metadata: Metadata = {
  title: "About",
  description: "Learn about Carlos Masson's cosmic adventures: experience log, skills, and interests wrapped in a terminal UI.",
};

export default function AboutPage() {
  return (
    <main id="main-content" className="relative z-10 px-6 py-16 md:py-24">
      <Container className="space-y-16">
        {/* Hero */}
        <section aria-labelledby="about-heading" className="space-y-6">
          <p className="text-sm uppercase tracking-[0.35em] text-[#facc15] text-glow-amber">
            whoami
          </p>
          <HeadlineGlow id="about-heading">Carlos Masson</HeadlineGlow>
          <p className="text-slate-200/80 text-lg leading-relaxed max-w-3xl">
            I&rsquo;m a full-stack engineer and creative technologist who loves mixing accessibility, storytelling, and
            playful aesthetics. My happy place is shipping features that make people grin while staying fast, reliable,
            and inclusive.
          </p>
        </section>

        {/* Experience */}
        <section aria-labelledby="experience-heading">
          <ConsoleBlock title="missions accomplished" className="space-y-6">
            <ol className="space-y-4 text-sm md:text-base text-slate-200/90">
              <TimelineEntry>
                <div className="flex flex-col gap-1">
                  <span className="text-[#facc15] font-semibold uppercase tracking-[0.25em]">
                    2019 – 2021
                  </span>
                  <span>
                    Hyperdrive Labs — engineered a multi-tenant design system adopted by 12+ product squads.
                  </span>
                </div>
              </TimelineEntry>
              <TimelineEntry>
                <div className="flex flex-col gap-1">
                  <span className="text-[#facc15] font-semibold uppercase tracking-[0.25em]">
                    2021 – 2024
                  </span>
                  <span>
                    Quasar Collective — led platform guilds modernizing legacy stacks into resilient Jamstack apps.
                  </span>
                </div>
              </TimelineEntry>
              <TimelineEntry>
                <div className="flex flex-col gap-1">
                  <span className="text-[#facc15] font-semibold uppercase tracking-[0.25em]">
                    Present
                  </span>
                  <span>
                    Independent explorer — prototyping whimsical experiences, mentoring devs, and co-hosting creative code jams.
                  </span>
                </div>
              </TimelineEntry>
            </ol>
          </ConsoleBlock>
        </section>

        {/* Skills Grid */}
        <section aria-labelledby="skills-heading" className="grid md:grid-cols-2 gap-8">
          <ConsoleBlock title="skill matrix" className="space-y-4">
            <ul className="space-y-2 text-sm md:text-base text-slate-200/90">
              <TimelineEntry>TypeScript, JavaScript, React, Vue, Astro</TimelineEntry>
              <TimelineEntry>CSS architecture, design systems, Tailwind</TimelineEntry>
              <TimelineEntry>Accessibility audits, WCAG 2.1 AA remediation</TimelineEntry>
              <TimelineEntry>Canvas animations, creative coding, shaders</TimelineEntry>
              <TimelineEntry>DX tooling, component libraries, Storybook</TimelineEntry>
            </ul>
          </ConsoleBlock>

          <ConsoleBlock title="fun experiments" className="space-y-4">
            <ul className="space-y-2 text-sm md:text-base text-slate-200/90">
              <TimelineEntry>Generative pixel art cat planets</TimelineEntry>
              <TimelineEntry>Retro terminal streaming overlays</TimelineEntry>
              <TimelineEntry>DIY synthesizer with laser-cut enclosure</TimelineEntry>
              <TimelineEntry>Interactive story zines in DWEB</TimelineEntry>
              <TimelineEntry>Solar-powered web installations</TimelineEntry>
            </ul>
          </ConsoleBlock>
        </section>

        {/* ASCII Art */}
        <section aria-labelledby="ascii-heading">
          <ConsoleBlock title="ascii snippet">
            <pre
              className="text-sm md:text-base text-slate-200/90 whitespace-pre overflow-x-auto"
              role="img"
              aria-label="ASCII art of Nyan Cat flying through space"
            >
{`_/﹋\\_
(˚ˎ 。7
 |、˜〵
 じしˍ,)ノ  nyan-cat.space — pursuing delight at light speed`}
            </pre>
          </ConsoleBlock>
        </section>

        {/* Contact CTA */}
        <section aria-labelledby="contact-heading" id="contact">
          <ConsoleBlock title="drop a transmission" className="space-y-4">
            <p className="text-sm md:text-base text-slate-200/90">
              Reach out for collaborations, speaking, or to swap space-themed playlists.
            </p>
            <div className="flex flex-wrap gap-4 text-sm md:text-base">
              <Link
                href="/contact"
                className="border border-[rgba(124,252,0,0.6)] px-4 py-2 rounded-lg hover:bg-[rgba(124,252,0,0.1)] transition focus-visible"
              >
                open contact console
              </Link>
              <a
                href="mailto:carlos@space.dev"
                className="border border-amber-500/60 px-4 py-2 rounded-lg hover:bg-amber-500/10 transition focus-visible"
              >
                carlos@space.dev
              </a>
              <a
                href="https://www.linkedin.com/in/carlosmasson"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-[rgba(244,114,182,0.6)] px-4 py-2 rounded-lg hover:bg-[rgba(244,114,182,0.1)] transition focus-visible"
              >
                LinkedIn
              </a>
              <a
                href="https://github.com/1cmasson"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-[rgba(244,114,182,0.6)] px-4 py-2 rounded-lg hover:bg-[rgba(244,114,182,0.1)] transition focus-visible"
              >
                GitHub
              </a>
            </div>
          </ConsoleBlock>
        </section>
      </Container>
    </main>
  );
}
