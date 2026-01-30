import Link from "next/link";
import { Container } from "./Container";

const footerNavLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

const socialLinks = [
  { 
    label: "GitHub", 
    href: "https://github.com/1cmasson",
    external: true
  },
  { 
    label: "LinkedIn", 
    href: "https://www.linkedin.com/in/carlosmasson",
    external: true
  },
];

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-[rgba(124,252,0,0.2)] bg-black/60">
      <Container className="py-12 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div>
          <p className="uppercase tracking-[0.3em] text-sm text-[#facc15]">
            open transmission
          </p>
          <p className="text-slate-200/80">
            Email:{" "}
            <a
              href="mailto:carlos@space.dev"
              className="underline focus-visible hover:text-[#facc15] transition"
            >
              carlos@space.dev
            </a>
          </p>
          <p className="text-slate-200/60 text-sm mt-2">
            Built with accessibility, cosmic whimsy, and a sprinkle of rainbow pop-tarts.
          </p>
        </div>

        <div className="flex gap-4 text-sm flex-wrap">
          {socialLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-amber-400 transition focus-visible"
            >
              {link.label}
            </a>
          ))}
          
          {footerNavLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hover:text-[#f472b6] transition focus-visible"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </Container>
    </footer>
  );
}
