"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { useMotionContext } from "./MotionProvider";

interface StarWarsCrawlProps {
  children: React.ReactNode;
  className?: string;
}

export function StarWarsCrawl({ children, className }: StarWarsCrawlProps) {
  const { isReduced } = useMotionContext();
  const [isPaused, setIsPaused] = useState(false);

  const togglePause = () => {
    setIsPaused((prev) => !prev);
  };

  return (
    <aside className={cn("console-block space-y-6", className)} data-crawl>
      <header>star wars crawl</header>
      
      <div className="crawl-text" aria-live="polite">
        <div
          className={cn(
            "crawl-inner space-y-6",
            (isReduced || isPaused) && "animation-paused"
          )}
          style={{
            animationPlayState: isReduced || isPaused ? "paused" : "running",
          }}
        >
          {children}
        </div>
      </div>

      <button
        type="button"
        onClick={togglePause}
        className="inline-flex items-center gap-2 border border-amber-500/60 px-4 py-2 rounded-lg hover:bg-amber-500/10 transition text-sm uppercase tracking-[0.3em] focus-visible"
        aria-pressed={isPaused}
        disabled={isReduced}
      >
        <span aria-hidden="true">{isPaused ? "▶" : "⏸"}</span>
        {isPaused ? "play crawl" : "pause crawl"}
      </button>
    </aside>
  );
}
