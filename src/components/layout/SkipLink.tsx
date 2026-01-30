"use client";

interface SkipLinkProps {
  href?: string;
  children?: React.ReactNode;
}

export function SkipLink({ 
  href = "#main-content", 
  children = "Skip to main content" 
}: SkipLinkProps) {
  return (
    <a
      href={href}
      className="skip-link"
    >
      {children}
    </a>
  );
}
