import { cn } from "@/lib/utils";
import type { ElementType, ComponentPropsWithoutRef } from "react";

type ContainerProps<T extends ElementType = "div"> = {
  children: React.ReactNode;
  className?: string;
  as?: T;
} & Omit<ComponentPropsWithoutRef<T>, "className" | "children">;

export function Container<T extends ElementType = "div">({ 
  children, 
  className,
  as,
  ...props
}: ContainerProps<T>) {
  const Component = as || "div";
  return (
    <Component className={cn("max-w-6xl mx-auto px-6", className)} {...props}>
      {children}
    </Component>
  );
}
