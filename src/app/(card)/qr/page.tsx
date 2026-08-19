import type { Metadata } from "next";

/**
 * /qr — the scannable code that leads to /hi.
 *
 * Lives in the (card) group so it inherits card.css and the pop-art theme
 * rather than the cosmic-terminal chrome: this page gets projected on a wall or
 * held up on a phone next to the same 3D prints the card is handed out with.
 *
 * The code itself is a static asset, not a runtime render — `public/qr/qr.svg`
 * is the file people print, and the page loads that same file so the displayed
 * code and the download can never drift apart. See public/qr/README.md for the
 * regeneration command; the URL is baked into the module pattern, so a domain
 * change means regenerating both files, not editing text.
 */

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "QR — carlosmasson.netlify.app/hi",
  description:
    "Scannable QR code for the contact card, with SVG and PNG downloads for print and 3D prints.",
  alternates: { canonical: "/qr" },
  // A utility page. Crawl through it to /hi, but don't rank it.
  robots: { index: false, follow: true },
  openGraph: { url: "/qr", title: "Scan me — Carlos Masson" },
};

export default function QrPage() {
  // The (card) root layout now declares <html lang="es"> for /hi. This page's
  // copy is English and is written for me, not for the people the card is
  // handed to, so it marks its own subtree — `lang` on any element overrides
  // the ancestor for screen readers and translation tools.
  return (
    <main className="qr-shell" lang="en">
      <a className="card-mark qr-mark" href="/hi">
        CM
      </a>

      <h1 className="qr-title">Scan me</h1>
      <p className="qr-sub">
        Point a phone camera at the code — it opens my contact card.
      </p>

      <section className="pop-card qr-code-card">
        {/* Pure white plate, never --paper: cameras are tolerant, worn phone
            lenses and cheap webcams are not. */}
        <div className="qr-plate">
          {/* eslint-disable-next-line @next/next/no-img-element -- the QR is a
              fixed-size static SVG; next/image would rasterize it and needs
              dangerouslyAllowSVG to serve it at all. */}
          <img
            src="/qr/qr.svg"
            width={1024}
            height={1024}
            alt="QR code linking to https://carlosmasson.netlify.app/hi"
          />
        </div>
        <code className="qr-target">https://carlosmasson.netlify.app/hi</code>
      </section>

      <section className="pop-card">
        <h2>Download</h2>
        <div className="qr-files">
          <a className="qr-file" href="/qr/qr.svg" download>
            <span>qr.svg</span>
            <span className="qr-why">Vector — print, laser, CAD, any size</span>
          </a>
          <a className="qr-file" href="/qr/qr.png" download>
            <span>qr.png</span>
            <span className="qr-why">1024×1024 raster — slides, chat, docs</span>
          </a>
        </div>
        <p className="qr-meta">
          Error correction M · 4-module quiet zone · black on opaque white
        </p>
      </section>

      <a className="qr-go" href="/hi">
        See the card →
      </a>
    </main>
  );
}
