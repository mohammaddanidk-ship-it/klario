import * as React from "react";
import { cn } from "@/lib/utils";

interface LogoProps extends React.SVGProps<SVGSVGElement> {
  showWordmark?: boolean;
  variant?: "default" | "light";
}

/**
 * Klario brand mark.
 *
 * A lens / aperture motif — Klario comes from "to clarify". The mark
 * reads as a focused eye: layered arcs converging to a center point,
 * forming both a lens and a stylised "K" aperture. Geometric, calm,
 * trustworthy. Reads cleanly at 16px and 256px.
 */
export function Logo({
  showWordmark = true,
  variant = "default",
  className,
  ...props
}: LogoProps) {
  const mark = (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Klario"
      className={cn("h-8 w-8", className)}
      {...props}
    >
      {/* Outer ring — the lens body */}
      <circle
        cx="16"
        cy="16"
        r="13"
        stroke="currentColor"
        strokeWidth="1.5"
        className="text-navy dark:text-white"
        opacity={0.25}
      />
      {/* Aperture blades — three converging arcs, forming a K + focus point */}
      <path
        d="M16 4.5 9 16l7 11.5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-navy dark:text-white"
      />
      <path
        d="M16 4.5 23 16l-7 11.5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-brand"
      />
      {/* Center focus dot — the clarified point */}
      <circle cx="16" cy="16" r="2.4" fill="currentColor" className="text-brand" />
      <circle cx="16" cy="16" r="4.2" stroke="currentColor" strokeWidth="1" className="text-brand" opacity={0.4} />
    </svg>
  );

  if (!showWordmark) return mark;

  return (
    <span className="inline-flex items-center gap-2.5">
      {mark}
      <span
        className={cn(
          "text-[17px] font-semibold tracking-tight leading-none",
          variant === "light" ? "text-white" : "text-navy dark:text-white"
        )}
      >
        Klario
      </span>
    </span>
  );
}
