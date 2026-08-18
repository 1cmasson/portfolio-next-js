"use client";

import Image from "next/image";
import { ArrowUpRight, MessageCircle, Phone, UserRoundPlus } from "lucide-react";
import { useCallback, useEffect, useRef } from "react";

import { CARD_LOCALES, type CardLocale, type MessageKey } from "@/lib/i18n/card-messages";
import { useCardLocale } from "./useCardLocale";

const PHONE_HREF = "tel:+17869093661";
const PHONE_DISPLAY = "786-909-3661";
const EMAIL = "carlosmasson96@gmail.com";
const VCARD_HREF = "/hi/carlos-masson.vcf";

const WORK: ReadonlyArray<{ name: string; href: string; kind: MessageKey }> = [
  { name: "La Capital Medical Center", href: "https://lacapitalmedicalcenter.com/", kind: "work.medical" },
  { name: "Delgado Legal, P.A.", href: "https://delgadolegalpa.com/", kind: "work.legal" },
  { name: "Todd Nepola", href: "https://toddnepola.com/", kind: "work.realestate" },
  { name: "Double R Vending", href: "https://doublervending.com/", kind: "work.vending" },
];

const SERVICES: readonly MessageKey[] = [
  "services.prints",
  "services.modeling",
  "services.animation",
  "services.voice",
  "services.web",
  "services.ai",
  "services.martech",
];

const LOCALE_LABELS: Record<CardLocale, string> = { en: "EN", es: "ES" };

export function ContactCard() {
  const { locale, selectLocale, t } = useCardLocale();
  const barRef = useRef<HTMLDivElement>(null);
  const shellRef = useRef<HTMLElement>(null);

  // The action bar is fixed, so the page has to reserve room for it. Its height
  // depends on the language — the Spanish "Guardar contacto" wraps to two lines
  // — so measure it rather than assume. offsetHeight already includes the
  // safe-area padding.
  const syncBarClearance = useCallback(() => {
    const bar = barRef.current;
    const shell = shellRef.current;
    if (!bar || !shell) return;
    shell.style.paddingBottom = `${bar.offsetHeight + 24}px`;
  }, []);

  useEffect(() => {
    syncBarClearance();

    const bar = barRef.current;
    if (bar && typeof ResizeObserver === "function") {
      const observer = new ResizeObserver(syncBarClearance);
      observer.observe(bar);
      return () => observer.disconnect();
    }

    window.addEventListener("resize", syncBarClearance);
    return () => window.removeEventListener("resize", syncBarClearance);
  }, [syncBarClearance, locale]);

  return (
    <>
      {/* React 19 hoists this into <head>; it is the page's only <title>. */}
      <title>{t("meta.title")}</title>

      <header className="card-topbar">
        <span className="card-mark" aria-hidden="true">
          CM
        </span>
        <div className="langswitch" role="group" aria-label={t("lang.aria")}>
          {CARD_LOCALES.map((code) => (
            <button
              key={code}
              type="button"
              aria-pressed={locale === code}
              onClick={() => selectLocale(code)}
            >
              {LOCALE_LABELS[code]}
            </button>
          ))}
        </div>
      </header>

      <main className="card-shell" ref={shellRef}>
        <section className="card-hero">
          {/* Already sized and compressed to exactly what the page renders, so
              it skips the image optimizer — one fewer hop on a QR-scan landing. */}
          <Image
            className="card-avatar"
            src="/hi/carlos.webp"
            alt={t("hero.avatarAlt")}
            width={152}
            height={152}
            priority
            unoptimized
          />
          <p className="card-eyebrow">{t("hero.eyebrow")}</p>
          <h1>{t("hero.greeting")}</h1>
          <p className="card-intro">{t("hero.intro")}</p>
        </section>

        <section className="pop-card card-why">
          <h2>{t("why.title")}</h2>
          <p className="lead">{t("why.lead")}</p>
          <p>{t("why.body")}</p>
        </section>

        <section className="pop-card">
          <h2>{t("services.title")}</h2>
          <ul className="chips">
            {SERVICES.map((key) => (
              <li key={key}>{t(key)}</li>
            ))}
          </ul>
          <p className="chips-more">{t("services.more")}</p>
        </section>

        <section className="pop-card">
          <h2>{t("work.title")}</h2>
          <ul className="worklist">
            {WORK.map((site) => (
              <li key={site.href}>
                <a href={site.href} target="_blank" rel="noopener noreferrer">
                  <span className="meta">
                    <span>{site.name}</span>
                    <span className="kind">{t(site.kind)}</span>
                  </span>
                  <ArrowUpRight className="arrow" size={20} aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </section>

        <section className="pop-card card-game">
          <h2>{t("game.title")}</h2>
          <p>{t("game.body")}</p>
          <a
            href="https://multiplayer-dungeon-game-production.up.railway.app/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>{t("game.cta")}</span>
            <ArrowUpRight size={18} aria-hidden="true" />
          </a>
        </section>

        <section className="pop-card card-mission">
          <p>{t("mission.body")}</p>
        </section>

        <section className="pop-card card-contact">
          <h2>{t("contact.title")}</h2>
          <div className="row">
            <span className="label">{t("contact.phoneLabel")}</span>
            <a className="value" href={PHONE_HREF}>
              {PHONE_DISPLAY}
            </a>
          </div>
          <div className="row">
            <span className="label">{t("contact.emailLabel")}</span>
            <a className="value" href={`mailto:${EMAIL}`}>
              {EMAIL}
            </a>
          </div>
        </section>

        <footer className="card-footer">{t("footer.note")}</footer>
      </main>

      <div className="actionbar" ref={barRef}>
        <div className="actionbar-inner">
          <p className="actionbar-hint">{t("cta.hint")}</p>
          <nav className="actions" aria-label={t("cta.aria")}>
            <a className="act-call" href={PHONE_HREF}>
              <Phone aria-hidden="true" />
              <span>{t("cta.call")}</span>
            </a>
            <a className="act-text" href="sms:+17869093661">
              <MessageCircle aria-hidden="true" />
              <span>{t("cta.text")}</span>
            </a>
            {/* No `download` attribute on purpose: on iOS that saves the file to
                Files instead of opening the native "Add to Contacts" sheet. */}
            <a className="act-save" href={VCARD_HREF} type="text/vcard">
              <UserRoundPlus aria-hidden="true" />
              <span>{t("cta.save")}</span>
            </a>
          </nav>
        </div>
      </div>
    </>
  );
}
