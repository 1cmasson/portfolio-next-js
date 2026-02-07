import type { Metadata } from "next";
import { Fira_Code } from "next/font/google";
import "./globals.css";

import { SkipLink, Header, Footer } from "@/components/layout";
import { StarfieldCanvas, NyanCatFlyby, MotionProvider } from "@/components/animation";

const firaCode = Fira_Code({
  variable: "--font-terminal",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Nyan Cat Space — Cosmic Terminal Portfolio",
    template: "%s — Nyan Cat Space",
  },
  description:
    "Explore Nyan Cat Space, a terminal-inspired portfolio floating through the cosmos with starfields, Nyan Cat fly-bys, and projects orbiting in neon glow.",
  keywords: [
    "portfolio",
    "developer",
    "frontend",
    "full-stack",
    "react",
    "nextjs",
    "accessibility",
  ],
  authors: [{ name: "Carlos Masson" }],
  creator: "Carlos Masson",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Nyan Cat Space",
    title: "Nyan Cat Space — Cosmic Terminal Portfolio",
    description:
      "Explore Nyan Cat Space, a terminal-inspired portfolio floating through the cosmos.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nyan Cat Space — Cosmic Terminal Portfolio",
    description:
      "A terminal-inspired portfolio floating through the cosmos.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={firaCode.variable}>
      <body className="min-h-screen overflow-x-hidden antialiased">
        <MotionProvider>
          <SkipLink />
          <StarfieldCanvas />
          <NyanCatFlyby />
          <Header />
          {children}
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}
