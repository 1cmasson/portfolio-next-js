"use client";

import { cn } from "@/lib/utils";
import { useMotionPreference } from "@/hooks";

interface MotionToggleProps {
  className?: string;
}

export function MotionToggle({ className }: MotionToggleProps) {
  const { isReduced, setMotionPreference } = useMotionPreference();

  return (
    <div className={cn("flex gap-2", className)}>
      <button
        type="button"
        onClick={() => setMotionPreference("animated")}
        className={cn(
          "inline-flex items-center gap-2 border border-amber-500/60 px-5 py-2.5 rounded-lg hover:bg-amber-500/10 transition focus-visible",
          isReduced && "opacity-40"
        )}
        aria-pressed={!isReduced}
      >
        <span className="text-sm font-medium uppercase tracking-[0.25em]">
          animations
        </span>
        <span aria-hidden="true">ON</span>
      </button>
      
      <button
        type="button"
        onClick={() => setMotionPreference("reduced")}
        className={cn(
          "inline-flex items-center gap-2 border border-slate-200/50 px-5 py-2.5 rounded-lg hover:bg-slate-200/10 transition focus-visible",
          !isReduced && "opacity-40"
        )}
        aria-pressed={isReduced}
      >
        <span className="text-sm font-medium uppercase tracking-[0.25em]">
          animations
        </span>
        <span aria-hidden="true">OFF</span>
      </button>
    </div>
  );
}
