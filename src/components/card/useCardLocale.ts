"use client";

import { useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";

import {
  CARD_NS,
  DEFAULT_LOCALE,
  normalizeCardLocale,
  type CardLocale,
} from "@/lib/i18n/card-messages";
import {
  cardI18n,
  detectCardLocale,
  persistCardLocale,
} from "@/lib/i18n/card-i18n";

/**
 * The card's binding to i18next.
 *
 * `useTranslation` is passed the card instance explicitly rather than reading
 * the global one, so no `I18nextProvider` has to be threaded through the (card)
 * layout — that layout is a server component and stays one.
 *
 * Resolution order is i18next's: ?lang= → localStorage → navigator → English.
 * It runs in an effect, not at init: the page is statically generated in
 * English, so detecting during the first client render would hand React
 * different markup than the server produced. Detecting after hydration keeps
 * the no-JS visitor and every crawler on a complete page, and the swap lands in
 * the same tick as the rest of the mount effects.
 */
export function useCardLocale() {
  const { t, i18n } = useTranslation(CARD_NS, { i18n: cardI18n });
  const locale = normalizeCardLocale(i18n.resolvedLanguage) ?? DEFAULT_LOCALE;

  useEffect(() => {
    const detected = detectCardLocale();
    if (detected && detected !== cardI18n.resolvedLanguage) {
      void cardI18n.changeLanguage(detected);
    }
  }, []);

  // <html lang> lives outside the React tree this component renders, so it
  // still needs an effect. The <title> is rendered by ContactCard instead.
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const selectLocale = useCallback((next: CardLocale) => {
    persistCardLocale(next);
    void cardI18n.changeLanguage(next);
  }, []);

  return { locale, selectLocale, t };
}
