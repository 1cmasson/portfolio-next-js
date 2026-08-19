import { createInstance, type i18n as I18nInstance } from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

import {
  CARD_LOCALES,
  CARD_NS,
  CARD_RESOURCES,
  DEFAULT_LOCALE,
  normalizeCardLocale,
  type CardLocale,
} from "./card-messages";

/**
 * The i18next instance behind the /hi card.
 *
 * This replaces a hand-rolled `translate()` that was written specifically to
 * avoid i18next on this page. The tradeoff was measured, not assumed: the swap
 * costs +27.9 KB gzip (163.7 → 191.6 KB of JS on /hi). That is the price of the
 * standard API and ecosystem; the page is still statically prerendered and
 * fully readable before any of it executes, which is what actually governs how
 * fast a QR scan paints.
 *
 * Two things here are deliberate and easy to undo by accident:
 *
 * 1. `lng: DEFAULT_LOCALE` rather than letting the detector pick at init. The
 *    page is `force-static`, so the HTML is generated at build time in
 *    DEFAULT_LOCALE; if the detector ran during module init the first client
 *    render could disagree with that HTML and React would throw a hydration
 *    mismatch.
 *    Detection is instead run once on mount (see `detectCardLocale`), which is
 *    the same server-then-swap sequence the page has always used. The build now
 *    emits Spanish, so the swap only happens for a visitor who asked for
 *    English — the default costs no re-render at all.
 *
 * 2. `keySeparator: false` / `nsSeparator: false`. The catalogue keys contain
 *    dots ("hero.greeting"); without this i18next reads them as a path into a
 *    nested object and every lookup misses.
 */
export const LOCALE_STORAGE_KEY = "cm-lang";
const QUERY_PARAM = "lang";

function createCardI18n(): I18nInstance {
  const instance = createInstance();

  void instance
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      resources: CARD_RESOURCES,
      lng: DEFAULT_LOCALE,
      fallbackLng: DEFAULT_LOCALE,
      supportedLngs: CARD_LOCALES,
      ns: [CARD_NS],
      defaultNS: CARD_NS,
      keySeparator: false,
      nsSeparator: false,
      interpolation: {
        // React escapes for us; double-escaping mangles the "…" and "·" copy.
        escapeValue: false,
      },
      detection: {
        // No "navigator" on purpose. Spanish is the default the card is meant
        // to open in, so an en-US phone should still see Spanish rather than be
        // quietly switched — only an explicit signal moves off it: a ?lang= in
        // the link, or a previous tap on the EN toggle. Re-adding "navigator"
        // to this list restores browser-language auto-detection.
        order: ["querystring", "localStorage"],
        lookupQuerystring: QUERY_PARAM,
        lookupLocalStorage: LOCALE_STORAGE_KEY,
        // Storage is written only when the visitor picks a language by hand
        // (see `persistCardLocale`), so a shared ?lang= link never sticks.
        caches: [],
      },
      react: {
        // Resources are bundled, so init is synchronous — there is nothing to
        // suspend on, and suspending would blank a QR-scan landing page.
        useSuspense: false,
      },
    });

  return instance;
}

// Module scope: created once per process. On the server it is only ever read at
// DEFAULT_LOCALE, so the shared instance carries no per-request state.
export const cardI18n = createCardI18n();

/**
 * Runs i18next's own detector (?lang= → localStorage) and narrows the result to
 * a locale we actually ship. Browser-only; returns undefined on the server and
 * whenever nothing explicit was found — which is the common case, and leaves
 * the page on DEFAULT_LOCALE.
 */
export function detectCardLocale(): CardLocale | undefined {
  const detected = cardI18n.services.languageDetector?.detect();
  if (!detected) return undefined;

  for (const candidate of Array.isArray(detected) ? detected : [detected]) {
    const locale = normalizeCardLocale(candidate);
    if (locale) return locale;
  }

  return undefined;
}

/**
 * Remembers an explicit choice, and drops a `?lang=` that would otherwise
 * outrank storage on the next load and silently undo the visitor.
 */
export function persistCardLocale(locale: CardLocale): void {
  try {
    window.localStorage.setItem(LOCALE_STORAGE_KEY, locale);
  } catch {
    /* Safari private mode throws on localStorage access */
  }

  try {
    const url = new URL(window.location.href);
    if (url.searchParams.has(QUERY_PARAM)) {
      url.searchParams.delete(QUERY_PARAM);
      window.history.replaceState(null, "", url.pathname + url.search + url.hash);
    }
  } catch {
    /* no History API */
  }
}
