"use client";

import { useEffect, useState, useCallback } from "react";
import { useReducedMotion } from "./useReducedMotion";

type MotionPreference = "animated" | "reduced" | "auto";

const STORAGE_KEY = "nyan-motion";

export function useMotionPreference() {
  const systemReducedMotion = useReducedMotion();
  const [preference, setPreference] = useState<MotionPreference>("auto");
  const [isReduced, setIsReduced] = useState(false);

  // Resolve effective motion state
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as MotionPreference | null;
    
    if (stored === "reduced") {
      setIsReduced(true);
      setPreference("reduced");
    } else if (stored === "animated") {
      setIsReduced(false);
      setPreference("animated");
    } else {
      setIsReduced(systemReducedMotion);
      setPreference("auto");
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
        const newValue = event.newValue as MotionPreference | null;
        if (newValue === "reduced") {
          setIsReduced(true);
          setPreference("reduced");
        } else if (newValue === "animated") {
          setIsReduced(false);
          setPreference("animated");
        } else {
          setIsReduced(systemReducedMotion);
          setPreference("auto");
        }
      }
    };

    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, [systemReducedMotion]);

  const setMotionPreference = useCallback((mode: MotionPreference) => {
    if (mode === "auto") {
      localStorage.removeItem(STORAGE_KEY);
      setIsReduced(systemReducedMotion);
    } else {
      localStorage.setItem(STORAGE_KEY, mode);
      setIsReduced(mode === "reduced");
    }
    setPreference(mode);
  }, [systemReducedMotion]);

  return {
    isReduced,
    preference,
    setMotionPreference,
  };
}
