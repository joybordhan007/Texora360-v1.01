import { cn } from "@/lib/cn";

/** Renders a monochrome Figma SVG so it inherits `color` (e.g. white on the active nav item). */
export function Icon({ src, size = 24, className }: { src: string; size?: number; className?: string }) {
  return (
    <span
      aria-hidden
      className={cn("icon-mask", className)}
      style={{ width: size, height: size, maskImage: `url(${src})`, WebkitMaskImage: `url(${src})` }}
    />
  );
}
