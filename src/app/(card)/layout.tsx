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
  // Spanish, to match DEFAULT_LOCALE. Metadata is emitted once at build time —
  // crawlers and link unfurlers never run the client-side language switch, so
  // this has to track the locale the page actually opens in.
  description:
    "Carlos Masson — ingeniero en The Home Depot, radicado en Miami Lakes. Impresiones 3D personalizadas, modelado 3D, animación con IA, llamadas con voz de IA y sitios web ultrarrápidos para negocios locales en Hialeah.",
  alternates: { canonical: "/hi" },
  icons: {
    icon: "/hi/favicon.png",
    apple: "/hi/apple-touch-icon.png",
  },
  openGraph: {
    type: "profile",
    url: "/hi",
    locale: "es_US",
    alternateLocale: ["en_US"],
    title: "Carlos Masson — Sitios web, impresiones 3D e IA",
    description:
      "Creo sitios web ultrarrápidos, impresiones 3D personalizadas y sistemas de IA para negocios locales en Hialeah. Llama o escribe al 786-909-3661.",
    images: [{ url: "/hi/og.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Carlos Masson — Sitios web, impresiones 3D e IA",
    description:
      "Impresiones 3D personalizadas, sistemas de IA y sitios web rápidos para negocios de Hialeah.",
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
  // Matches DEFAULT_LOCALE and the prerendered copy. /hi rewrites this on the
  // client when the visitor switches; /qr marks its own subtree as English.
  return (
    <html lang="es">
      <body className="card-body">{children}</body>
    </html>
  );
}
