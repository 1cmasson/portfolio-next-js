import { cn } from "@/lib/utils";

interface TimelineEntryProps {
  children: React.ReactNode;
  className?: string;
}

export function TimelineEntry({ children, className }: TimelineEntryProps) {
  return (
    <li className={cn("timeline-entry", className)}>
      {children}
    </li>
  );
}
