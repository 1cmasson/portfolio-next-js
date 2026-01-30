import { cn } from "@/lib/utils";

interface HeadlineGlowProps {
  children: React.ReactNode;
  as?: "h1" | "h2" | "h3" | "h4";
  className?: string;
  id?: string;
}

export function HeadlineGlow({
  children,
  as: Component = "h1",
  className,
  id,
}: HeadlineGlowProps) {
  return (
    <Component
      id={id}
      className={cn(
        "font-semibold headline-glow",
        Component === "h1" && "text-4xl md:text-5xl lg:text-6xl",
        Component === "h2" && "text-3xl md:text-4xl",
        Component === "h3" && "text-2xl md:text-3xl",
        Component === "h4" && "text-xl md:text-2xl",
        className
      )}
    >
      {children}
    </Component>
  );
}
