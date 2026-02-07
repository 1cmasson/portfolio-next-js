"use client";

import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { useMotionContext } from "./MotionProvider";

interface MotionToggleProps {
  className?: string;
}

export function MotionToggle({ className }: MotionToggleProps) {
  const { isReduced, toggleMotion } = useMotionContext();

  return (
    <button
      type="button"
      onClick={toggleMotion}
      className={cn(
        "inline-flex items-center gap-1.5 border px-3 py-1.5 rounded-lg transition focus-visible text-sm",
        isReduced
          ? "border-slate-200/50 text-slate-400 hover:bg-slate-200/10"
          : "border-amber-500/60 text-amber-400 hover:bg-amber-500/10",
        className
      )}
      aria-label={isReduced ? "Enable animations" : "Disable animations"}
    >
      <Sparkles className={cn("size-4", !isReduced && "animate-pulse")} aria-hidden="true" />
      <span className="uppercase tracking-[0.25em]">
        {isReduced ? "off" : "on"}
      </span>
    </button>
  );
}
