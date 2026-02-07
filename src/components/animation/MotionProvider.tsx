"use client";

import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface MotionContextValue {
  isReduced: boolean;
  toggleMotion: () => void;
}

const MotionContext = createContext<MotionContextValue | null>(null);

const STORAGE_KEY = "nyan-motion";

function getStoredPreference(): "animated" | "reduced" | null {
  if (typeof window === "undefined") return null;
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored === "animated" || stored === "reduced" ? stored : null;
}

export function MotionProvider({ children }: { children: ReactNode }) {
  const systemReducedMotion = useReducedMotion();
  const [isReduced, setIsReduced] = useState(false);

  // Hydrate from localStorage + system preference after mount
  useEffect(() => {
    const stored = getStoredPreference();
    if (stored) {
      setIsReduced(stored === "reduced");
    } else {
      setIsReduced(systemReducedMotion);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Re-sync when system preference changes and user has no override
  useEffect(() => {
    if (!getStoredPreference()) {
      setIsReduced(systemReducedMotion);
    }
  }, [systemReducedMotion]);

  // Update document attribute for CSS
  useEffect(() => {
    document.documentElement.dataset.motion = isReduced ? "reduced" : "animated";
  }, [isReduced]);

  // Listen for storage changes from other tabs
  useEffect(() => {
    const handler = (event: StorageEvent) => {
      if (event.key === STORAGE_KEY) {
        const val = event.newValue;
        if (val === "reduced") setIsReduced(true);
        else if (val === "animated") setIsReduced(false);
        else setIsReduced(systemReducedMotion);
      }
    };

    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, [systemReducedMotion]);

  const toggleMotion = useCallback(() => {
    const next = !isReduced;
    localStorage.setItem(STORAGE_KEY, next ? "reduced" : "animated");
    setIsReduced(next);
  }, [isReduced]);

  return (
    <MotionContext.Provider value={{ isReduced, toggleMotion }}>
      {children}
    </MotionContext.Provider>
  );
}

export function useMotionContext(): MotionContextValue {
  const ctx = useContext(MotionContext);
  if (!ctx) {
    throw new Error("useMotionContext must be used within a MotionProvider");
  }
  return ctx;
}
