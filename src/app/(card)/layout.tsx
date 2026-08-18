import type { Metadata, Viewport } from "next";

import "./card.css";

/**
 * Second root layout.
 *
 * The (site) group renders the cosmic-terminal chrome — starfield canvas, Nyan
 * Cat fly-by, header, footer, Fira Code. None of that belongs on a lead-capture
 * card handed to a business owner in a parking lot, and a nested layout cannot
 * remove a parent's chrome, so this group gets its own <html>/<body> instead.
 */

// Netlify exposes the production site URL as URL at build time. Set
// NEXT_PUBLIC_SITE_URL to override it (e.g. once a custom domain is attached).
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  process.env.URL ??
  "https://carlosmasson.netlify.app";

export const metadata: Metadata = {
  // Makes the relative OG image below resolve to an absolute URL. iMessage,
  // WhatsApp and Facebook will not render a relative og:image — the shared link
  // degrades to plain text — and this card gets forwarded a lot.
  metadataBase: new URL(siteUrl),
  // No `title` here on purpose. Next re-asserts metadata during hydration, which
  // clobbered a client-set document.title on first load, so ContactCard renders
  // the <title> itself (React 19 hoists it into <head>) and it tracks the
  // selected language. Declaring one here too would emit a second <title>.
  description:
    "Carlos Masson — engineer at The Home Depot, based in Miami Lakes. Custom 3D prints, 3D modeling, AI animation, AI voice calls and highly performant websites for local businesses in Hialeah.",
  alternates: { canonical: "/hi" },
  icons: {
    icon: "/hi/favicon.png",
    apple: "/hi/apple-touch-icon.png",
  },
  openGraph: {
    type: "profile",
    url: "/hi",
    title: "Carlos Masson — Websites, 3D Prints & AI",
    description:
      "I build highly performant websites, custom 3D prints and AI systems for local businesses in Hialeah. Call or text 786-909-3661.",
    images: [{ url: "/hi/og.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Carlos Masson — Websites, 3D Prints & AI",
    description:
      "Custom 3D prints, AI systems and fast websites for Hialeah businesses.",
    images: ["/hi/og.jpg"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#12E8F0",
  colorScheme: "light",
};

export default function CardRootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="card-body">{children}</body>
    </html>
  );
}
