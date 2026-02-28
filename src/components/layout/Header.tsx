"use client";

import Link from "next/link";
import { MotionToggle } from "@/components/animation";
import { Container } from "./Container";

export function Header() {
  return (
    <header className="relative z-10">
      <Container as="nav" className="py-6 flex items-center justify-between">
        <Link
          href="/"
          className="text-sm uppercase tracking-[0.35em] text-[#facc15] hover:text-amber-400 transition focus-visible"
        >
          1cmasson@space:~$
        </Link>

        <div className="flex items-center gap-6">
          <Link
            href="/blog"
            className="text-sm uppercase tracking-[0.25em] text-slate-200/80 hover:text-[#facc15] transition focus-visible"
          >
            blog
          </Link>
          <MotionToggle />
        </div>
      </Container>
    </header>
  );
}
