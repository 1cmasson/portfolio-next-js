"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Container } from "./Container";
import type { NavItem } from "@/types";

const navItems: NavItem[] = [
  { label: "home", href: "/" },
  { label: "about", href: "/about" },
  { label: "projects", href: "/projects" },
  { label: "blog", href: "/blog" },
  { label: "contact", href: "/contact" },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="relative z-10">
      <Container as="nav" className="py-6 flex items-center justify-between">
        <Link
          href="/"
          className="text-sm uppercase tracking-[0.35em] text-[#facc15] hover:text-amber-400 transition focus-visible"
        >
          nyan@space:~$
        </Link>

        <ul className="flex items-center gap-6 text-sm md:text-base">
          {navItems.map((item) => {
            const isActive = 
              item.href === "/" 
                ? pathname === "/" 
                : pathname.startsWith(item.href);
            
            const isContact = item.label === "contact";

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "transition focus-visible",
                    isContact 
                      ? "hover:text-[#f472b6]" 
                      : "hover:text-amber-400",
                    isActive && "text-[#facc15] text-glow-amber"
                  )}
                  aria-current={isActive ? "page" : undefined}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </Container>
    </header>
  );
}
