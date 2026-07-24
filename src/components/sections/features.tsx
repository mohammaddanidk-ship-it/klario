"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  ScanSearch,
  BrainCircuit,
  EyeOff,
  FileStack,
  Gauge,
  ScrollText,
  type LucideIcon,
} from "lucide-react";
import { Section, SectionHeading } from "@/components/brand/section";
import { cn } from "@/lib/utils";

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
  span?: "wide" | "tall" | "default";
}

const FEATURES: Feature[] = [
  {
    icon: ScanSearch,
    title: "Semantic document intelligence",
    description:
      "Aegis reads structure, not just text — clauses, tables, signatures, stamps, and handwriting. It returns answers with citations to the exact line in your file, so you can verify every claim.",
    span: "wide",
  },
  {
    icon: BrainCircuit,
    title: "Private AI models",
    description:
      "Inference runs on models we operate ourselves. No calls to consumer endpoints, no shared context windows, no leakage of your prompt into another tenant's session.",
  },
  {
    icon: EyeOff,
    title: "Automatic PII redaction",
    description:
      "Names, SSNs, account numbers, addresses, and medical record numbers are detected and redacted before the model ever sees them — re-inserted only in your final, encrypted output.",
  },
  {
    icon: FileStack,
    title: "Multi-format ingestion",
    description:
      "PDF, DOCX, scanned images, emails, screenshots, and JSON. OCR is run in-pipeline with the same isolation guarantees as the model itself.",
  },
  {
    icon: Gauge,
    title: "Real-time, at scale",
    description:
      "Median first-token response under 800ms. Built to handle thousand-page filings and 10,000-document batches without queueing or throttling.",
  },
  {
    icon: ScrollText,
    title: "Full audit trail",
    description:
      "Every upload, query, redaction, and export is signed and logged. Export to your SIEM in real time, or retrieve the chain of custody for any document on demand.",
    span: "wide",
  },
];

export function Features() {
  return (
    <Section id="platform" className="py-20 sm:py-24 lg:py-32">
      <div className="container-premium">
        <SectionHeading
          eyebrow="The platform"
          title={
            <>
              Engineering decisions made for{" "}
              <span className="text-brand">the worst-case scenario</span>
            </>
          }
          description="Every feature exists because a regulated industry demanded it. Nothing here is decorative."
        />

        <div className="mt-14 grid gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f, i) => (
            <FeatureCard key={f.title} feature={f} index={i} />
          ))}
        </div>
      </div>
    </Section>
  );
}

function FeatureCard({ feature, index }: { feature: Feature; index: number }) {
  const wide = feature.span === "wide";
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.06, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "group relative flex flex-col gap-4 rounded-2xl border border-border bg-card p-6 shadow-premium-sm transition-all hover:-translate-y-0.5 hover:shadow-premium-lg sm:p-7",
        wide && "md:col-span-2 lg:col-span-2"
      )}
    >
      {/* Hover accent line */}
      <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand/40 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand/10 text-brand transition-colors group-hover:bg-brand group-hover:text-white">
        <feature.icon className="h-5 w-5" aria-hidden />
      </div>

      <div className="flex-1">
        <h3 className="text-lg font-semibold tracking-tight text-navy dark:text-white">
          {feature.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          {feature.description}
        </p>
      </div>

      {wide ? (
        <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
          {["Isolated enclaves", "Signed audit logs", "Cited outputs"].map((tag) => (
            <span
              key={tag}
              className="rounded-md border border-border bg-muted/50 px-2 py-1"
            >
              {tag}
            </span>
          ))}
        </div>
      ) : null}
    </motion.article>
  );
}
