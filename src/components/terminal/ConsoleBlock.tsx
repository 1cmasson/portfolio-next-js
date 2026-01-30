import { cn } from "@/lib/utils";

interface ConsoleBlockProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
}

export function ConsoleBlock({ children, title, className }: ConsoleBlockProps) {
  return (
    <div className={cn("console-block", className)}>
      {title && <header>{title}</header>}
      {children}
    </div>
  );
}
