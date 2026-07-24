import * as React from "react";
import { cn } from "@/lib/utils";

/** Small uppercase eyebrow label used above section headings */
export function Eyebrow({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-brand",
        className
      )}
      {...props}
    >
      <span className="h-px w-6 bg-brand/40" aria-hidden />
      {children}
    </span>
  );
}

interface SectionHeadingProps {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
  as?: "h2" | "h3";
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
  as: Tag = "h2",
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className
      )}
    >
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <Tag
        className={cn(
          "text-balance font-semibold tracking-tight text-navy dark:text-white",
          "text-3xl sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]"
        )}
      >
        {title}
      </Tag>
      {description ? (
        <p
          className={cn(
            "text-pretty text-base sm:text-lg leading-relaxed text-muted-foreground",
            align === "center" ? "max-w-2xl" : "max-w-xl"
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}

/** Section wrapper with consistent vertical rhythm */
export function Section({
  children,
  className,
  id,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <section
      id={id}
      className={cn("py-20 sm:py-24 lg:py-32", className)}
      {...props}
    >
      {children}
    </section>
  );
}
