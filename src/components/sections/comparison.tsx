"use client";

import * as React from "react";
import { Check, X, Minus } from "lucide-react";
import { Section, SectionHeading } from "@/components/brand/section";
import { useI18n } from "@/lib/i18n/context";

interface Row {
  feature: string;
  generic: "yes" | "no" | "partial";
  klarium: "yes" | "no" | "partial";
}

const ROWS: Row[] = [
  { feature: "Understands document type automatically", generic: "partial", klarium: "yes" },
  { feature: "Structured report with risks flagged", generic: "no", klarium: "yes" },
  { feature: "Confidence rating on every answer", generic: "no", klarium: "yes" },
  { feature: "Clear 'what to do next' guidance", generic: "no", klarium: "yes" },
  { feature: "Built-in scam and phishing detection", generic: "no", klarium: "yes" },
  { feature: "Explains in your own language automatically", generic: "partial", klarium: "yes" },
  { feature: "No prompt engineering required", generic: "no", klarium: "yes" },
  { feature: "Documents never stored", generic: "partial", klarium: "yes" },
  { feature: "Free to use, no account needed", generic: "partial", klarium: "yes" },
];

function Icon({ status }: { status: "yes" | "no" | "partial" }) {
  if (status === "yes") return (
    <span style={{ display: "inline-flex", width: 22, height: 22, borderRadius: "50%", background: "#DCFCE7", alignItems: "center", justifyContent: "center" }}>
      <Check size={13} color="#15803D" strokeWidth={3} />
    </span>
  );
  if (status === "no") return (
    <span style={{ display: "inline-flex", width: 22, height: 22, borderRadius: "50%", background: "#FEE2E2", alignItems: "center", justifyContent: "center" }}>
      <X size={13} color="#B91C1C" strokeWidth={3} />
    </span>
  );
  return (
    <span style={{ display: "inline-flex", width: 22, height: 22, borderRadius: "50%", background: "#FEF3C7", alignItems: "center", justifyContent: "center" }}>
      <Minus size={13} color="#B45309" strokeWidth={3} />
    </span>
  );
}

export function Comparison() {
  return (
    <Section id="comparison" className="py-20 sm:py-24">
      <div className="container-premium">
        <SectionHeading
          eyebrow="Why Klarium"
          title="Not just another AI chat window"
          description="General AI assistants can explain things if you know exactly how to ask. Klarium is built specifically for this one job — no prompting skills required."
        />

        <div className="mx-auto mt-12 max-w-2xl overflow-hidden rounded-2xl border border-border bg-card shadow-premium">
          {/* Header row */}
          <div className="grid grid-cols-[1fr_auto_auto] items-center gap-4 border-b border-border bg-muted/30 px-5 py-4 sm:px-6">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Feature</span>
            <span className="w-20 text-center text-xs font-semibold uppercase tracking-wider text-muted-foreground sm:w-24">Generic AI</span>
            <span className="w-20 text-center text-xs font-semibold uppercase tracking-wider text-brand sm:w-24">Klarium</span>
          </div>

          {/* Rows */}
          {ROWS.map((row, i) => (
            <div key={row.feature}
              className="grid grid-cols-[1fr_auto_auto] items-center gap-4 px-5 py-3.5 sm:px-6"
              style={{ borderBottom: i < ROWS.length - 1 ? "1px solid #F3F4F6" : "none" }}>
              <span className="text-sm text-navy dark:text-white">{row.feature}</span>
              <span className="flex w-20 justify-center sm:w-24"><Icon status={row.generic} /></span>
              <span className="flex w-20 justify-center sm:w-24"><Icon status={row.klarium} /></span>
            </div>
          ))}
        </div>

        <p className="mx-auto mt-6 max-w-lg text-center text-xs text-muted-foreground">
          This comparison reflects typical general-purpose AI assistants used without specialized prompting. Individual results with any AI tool may vary.
        </p>
      </div>
    </Section>
  );
}
