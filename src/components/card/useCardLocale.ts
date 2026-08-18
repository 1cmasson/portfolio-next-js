"use client";

import { useCallback, useEffect, useSyncExternalStore } from "react";

import {
  DEFAULT_LOCALE,
  isCardLocale,
  translate,
  type CardLocale,
  type MessageKey,
} from "@/lib/i18n/card-messages";

const STORAGE_KEY = "cm-lang";

/**
 * Resolution order: ?lang= → localStorage → navigator.languages → English.
 */
function resolveLocale(): CardLocale {
  try {
    const fromQuery = new URLSearchParams(window.location.search).get("lang");
    if (isCardLocale(fromQuery)) return fromQuery;
  } catch {
    /* malformed query string */
  }

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (isCardLocale(stored)) return stored;
  } catch {
    /* Safari private mode throws on localStorage access */
  }

  const preferences = navigator.languages ?? [navigator.language];
  for (const preference of preferences) {
    const base = String(preference ?? "").toLowerCase().split("-")[0];
    if (isCardLocale(base)) return base;
  }

  return DEFAULT_LOCALE;
}

/**
 * The locale lives outside React — it comes from the URL, localStorage and the
 * browser's own language list. useSyncExternalStore is the sanctioned way to
 * read that: the server snapshot is always English, so SSR and the hydration
 * render agree (a no-JS visitor and every crawler get a complete page), and
 * React swaps in the real preference immediately afterwards without a
 * setState-inside-an-effect cascade.
 */
let cached: CardLocale | null = null;
const listeners = new Set<() => void>();

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function getSnapshot(): CardLocale {
  if (cached === null) cached = resolveLocale();
  return cached;
}

function getServerSnapshot(): CardLocale {
  return DEFAULT_LOCALE;
}

function persist(locale: CardLocale): void {
  cached = locale;

  try {
    window.localStorage.setItem(STORAGE_KEY, locale);
  } catch {
    /* Safari private mode */
  }

  // A ?lang= in the URL outranks storage on load, so drop it once the visitor
  // picks a language by hand — otherwise a reload would undo them.
  try {
    const url = new URL(window.location.href);
    if (url.searchParams.has("lang")) {
      url.searchParams.delete("lang");
      window.history.replaceState(null, "", url.pathname + url.search + url.hash);
    }
  } catch {
    /* no History API */
  }

  for (const listener of listeners) listener();
}

export function useCardLocale() {
  const locale = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  // <html lang> lives outside the React tree that this component renders, so it
  // still needs an effect. The <title> is rendered by ContactCard instead.
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const selectLocale = useCallback((next: CardLocale) => {
    persist(next);
  }, []);

  const t = useCallback((key: MessageKey) => translate(key, locale), [locale]);

  return { locale, selectLocale, t };
}
