"use client";

import { useState } from "react";
import type { Metadata } from "next";
import { Container } from "@/components/layout";
import { ConsoleBlock, HeadlineGlow } from "@/components/terminal";

// Note: metadata export doesn't work with "use client"
// We'll need to handle this differently in production

export default function ContactPage() {
  const [copyStatus, setCopyStatus] = useState<string>(
    "Transmission status will appear here after copying the address."
  );
  const [statusTone, setStatusTone] = useState<"info" | "success" | "error">("info");

  const email = "carlos@space.dev";
  const mailtoHref = `mailto:${email}?subject=Greetings%20from%20Nyan%20Cat%20Space&body=Hi%20Carlos%2C%0A%0AI%20just%20warped%20in%20from%20the%20portfolio%20terminal%20and%20would%20love%20to%20connect%20about...`;

  const handleCopyEmail = async () => {
    if (!navigator.clipboard) {
      setCopyStatus("Clipboard unsupported. Highlight the address and copy manually.");
      setStatusTone("info");
      return;
    }

    try {
      await navigator.clipboard.writeText(email);
      setCopyStatus("Email copied. Paste it into your mission console.");
      setStatusTone("success");
    } catch (err) {
      console.error("Copy failed:", err);
      setCopyStatus("Copy failed. Highlight and copy manually instead.");
      setStatusTone("error");
    }
  };

  return (
    <main id="main-content" className="relative z-10 px-6 py-16 md:py-24">
      <Container className="space-y-12">
        {/* Hero */}
        <section aria-labelledby="contact-hero" className="space-y-6">
          <p className="text-sm uppercase tracking-[0.35em] text-[#facc15] text-glow-amber">
            open transmission
          </p>
          <HeadlineGlow id="contact-hero">Contact Console</HeadlineGlow>
          <p className="text-slate-200/80 text-lg max-w-3xl">
            Ready to collaborate, chat about cosmic UX, or share a playlist? Fire up a direct email using the
            transmission controls below and the message will land in Carlos&rsquo; inbox in a flash.
          </p>
        </section>

        {/* Contact Console */}
        <ConsoleBlock title="transmission controls" className="space-y-6">
          <p className="text-sm text-slate-200/80">
            Open an email draft or copy the address if you prefer webmail. The console keeps everything accessible for
            keyboard and screen-reader pilots.
          </p>

          {/* Email Address Display */}
          <div className="flex flex-col gap-2">
            <span className="text-xs uppercase tracking-[0.35em] text-[#facc15]" id="contact-address-label">
              mission email
            </span>
            <code
              className="bg-black/40 border border-[rgba(124,252,0,0.4)] px-4 py-3 rounded-lg text-lg font-mono text-[#7cfc00] text-glow-green inline-block"
              tabIndex={0}
              role="text"
              aria-labelledby="contact-address-label"
            >
              {email}
            </code>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4">
            <a
              href={mailtoHref}
              className="inline-flex items-center gap-2 border border-[rgba(124,252,0,0.6)] px-5 py-2.5 rounded-lg hover:bg-[rgba(124,252,0,0.1)] transition focus-visible text-sm font-medium uppercase tracking-[0.25em]"
            >
              send email
              <span aria-hidden="true">➜</span>
            </a>

            <button
              type="button"
              onClick={handleCopyEmail}
              className="inline-flex items-center gap-2 border border-slate-200/50 px-5 py-2.5 rounded-lg hover:bg-slate-200/10 transition focus-visible text-sm font-medium uppercase tracking-[0.25em]"
            >
              copy email
              <span aria-hidden="true">⌘C</span>
            </button>
          </div>

          {/* Helper Text */}
          <p className="text-xs text-slate-200/60">
            No default mail client? Highlight the address above or use the copy helper, then paste into your favorite
            webmail or messenger.
          </p>

          {/* Status */}
          <p
            role="status"
            aria-live="polite"
            className={`text-sm ${
              statusTone === "success"
                ? "text-[#7cfc00]"
                : statusTone === "error"
                ? "text-red-400"
                : "text-slate-200/70"
            }`}
          >
            {copyStatus}
          </p>

          <noscript>
            <p className="text-slate-200/70 text-sm">
              JavaScript is disabled, so the copy helper is unavailable. The email address remains selectable; use your
              OS shortcut to copy it manually.
            </p>
          </noscript>
        </ConsoleBlock>
      </Container>
    </main>
  );
}
