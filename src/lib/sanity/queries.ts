import { groq } from "next-sanity";

// Projects
export const projectsQuery = groq`
  *[_type == "project"] | order(launchDate desc) {
    _id,
    title,
    "slug": slug.current,
    emoji,
    summary,
    tech,
    launchDate,
    featured,
    links
  }
`;

export const projectBySlugQuery = groq`
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    emoji,
    summary,
    body,
    tech,
    launchDate,
    links
  }
`;

export const featuredProjectsQuery = groq`
  *[_type == "project" && featured == true] | order(launchDate desc)[0...3] {
    _id,
    title,
    "slug": slug.current,
    emoji,
    summary,
    tech,
    links
  }
`;

// Blog Posts
export const blogPostsQuery = groq`
  *[_type == "blogPost"] | order(date desc) {
    _id,
    title,
    "slug": slug.current,
    date,
    summary,
    tags
  }
`;

export const blogPostBySlugQuery = groq`
  *[_type == "blogPost" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    date,
    summary,
    body,
    tags
  }
`;

// Site Settings
export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    siteTitle,
    siteDescription,
    email,
    socialLinks,
    tagline
  }
`;
