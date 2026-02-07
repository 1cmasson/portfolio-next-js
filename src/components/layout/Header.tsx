"use client";

import Link from "next/link";
import { MotionToggle } from "@/components/animation";
import { Container } from "./Container";

// const navItems: NavItem[] = [
//   { label: "home", href: "/" },
//   { label: "projects", href: "/projects" },
//   // { label: "blog", href: "/blog" },
// ];

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

        {/* <ul className="flex items-center gap-6 text-sm md:text-base">
          {navItems.map((item) => {
            const isActive = 
              item.href === "/" 
                ? pathname === "/" 
                : pathname.startsWith(item.href);
            
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "transition focus-visible",
                    "hover:text-amber-400",
                    isActive && "text-[#facc15] text-glow-amber"
                  )}
                  aria-current={isActive ? "page" : undefined}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul> */}

        <MotionToggle />
      </Container>
    </header>
  );
}
