// Navigation
export interface NavItem {
  label: string;
  href: string;
  isExternal?: boolean;
}

// Social links
export interface SocialLink {
  platform: string;
  url: string;
  label: string;
}

// Project
export interface Project {
  slug: string;
  title: string;
  emoji: string;
  summary: string;
  body?: string;
  tech: string[];
  launchDate?: string;
  featured?: boolean;
  links?: {
    demo?: string;
    source?: string;
    caseStudy?: string;
  };
}

// Blog post
export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  summary: string;
  body?: string;
  tags: string[];
  author?: string;
  featuredImage?: string;
}

// Site settings
export interface SiteSettings {
  siteTitle: string;
  siteDescription: string;
  email: string;
  socialLinks: SocialLink[];
  tagline: string;
}
