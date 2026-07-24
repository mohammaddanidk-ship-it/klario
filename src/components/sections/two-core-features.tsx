"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FileSearch, ShieldAlert, ArrowRight } from "lucide-react";
import { Section, SectionHeading } from "@/components/brand/section";
import { useI18n } from "@/lib/i18n/context";
import { cn } from "@/lib/utils";

export function TwoCoreFeatures() {
  const { t, rtl } = useI18n();

  return (
    <Section id="features" className="py-20 sm:py-24 lg:py-32">
      <div className="container-premium">
        <SectionHeading
          eyebrow={t.tcf_eyebrow}
          title={
            <>
              {t.tcf_title_1} <span className="text-brand">{t.tcf_title_2}</span>
            </>
          }
          description={t.tcf_description}
        />

        <div className="mt-14 grid gap-5 lg:grid-cols-2 lg:gap-6">
          {/* Document Understanding */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="group relative overflow-hidden rounded-2xl border border-border bg-card p-7 shadow-premium-sm transition-all hover:-translate-y-0.5 hover:shadow-premium-lg sm:p-9"
          >
            <FeaturePreview kind="document" />
            <div className="relative">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand/10 text-brand transition-colors group-hover:bg-brand group-hover:text-white">
                <FileSearch className="h-6 w-6" aria-hidden />
              </div>
              <h3 className="mt-5 text-xl font-semibold tracking-tight text-navy dark:text-white">
                {t.tcf_docTitle}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                {t.tcf_docDesc}
              </p>

              {/* Mini list of outputs */}
              <ul className="mt-6 grid grid-cols-1 gap-2 sm:grid-cols-2">
                {[
                  t.du_1_title,
                  t.du_3_title,
                  t.du_5_title,
                  t.du_7_title,
                ].map((label) => (
                  <li
                    key={label}
                    className="flex items-center gap-2 text-xs font-medium text-muted-foreground"
                  >
                    <span className="h-1 w-1 rounded-full bg-brand" aria-hidden />
                    {label}
                  </li>
                ))}
              </ul>

              <Link
                href="#document-understanding"
                className="mt-7 inline-flex items-center gap-1.5 text-sm font-medium text-brand transition-colors hover:text-navy hover:dark:text-white"
              >
                {t.tcf_docCta}
                <ArrowRight className={cn("h-4 w-4 transition-transform group-hover:translate-x-0.5", rtl && "rtl-flip")} />
              </Link>
            </div>
          </motion.div>

          {/* Phishing & Scam Detector */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="group relative overflow-hidden rounded-2xl border border-border bg-card p-7 shadow-premium-sm transition-all hover:-translate-y-0.5 hover:shadow-premium-lg sm:p-9"
          >
            <FeaturePreview kind="scam" />
            <div className="relative">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand/10 text-brand transition-colors group-hover:bg-brand group-hover:text-white">
                <ShieldAlert className="h-6 w-6" aria-hidden />
              </div>
              <h3 className="mt-5 text-xl font-semibold tracking-tight text-navy dark:text-white">
                {t.tcf_scamTitle}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                {t.tcf_scamDesc}
              </p>

              <ul className="mt-6 grid grid-cols-1 gap-2 sm:grid-cols-2">
                {[
                  t.pd_1_title,
                  t.pd_2_title,
                  t.pd_4_title,
                  t.pd_5_title,
                ].map((label) => (
                  <li
                    key={label}
                    className="flex items-center gap-2 text-xs font-medium text-muted-foreground"
                  >
                    <span className="h-1 w-1 rounded-full bg-brand" aria-hidden />
                    {label}
                  </li>
                ))}
              </ul>

              <Link
                href="#scam-detector"
                className="mt-7 inline-flex items-center gap-1.5 text-sm font-medium text-brand transition-colors hover:text-navy hover:dark:text-white"
              >
                {t.tcf_scamCta}
                <ArrowRight className={cn("h-4 w-4 transition-transform group-hover:translate-x-0.5", rtl && "rtl-flip")} />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </Section>
  );
}

/**
 * A small decorative preview tile shown top-right of each feature card.
 * Pure CSS/SVG — no heavy assets. Mirrors the report aesthetic below.
 */
function FeaturePreview({ kind }: { kind: "document" | "scam" }) {
  if (kind === "document") {
    return (
      <div
        aria-hidden
        className="pointer-events-none absolute -top-6 -end-6 h-32 w-44 rounded-xl border border-border bg-muted/40 p-3 opacity-70 transition-opacity group-hover:opacity-100 rtl:-end-auto rtl:-start-6"
      >
        <div className="mb-2 h-1.5 w-10 rounded-full bg-brand" />
        <div className="space-y-1.5">
          <div className="h-1 w-full rounded-full bg-navy/15" />
          <div className="h-1 w-4/5 rounded-full bg-navy/15" />
          <div className="h-1 w-2/3 rounded-full bg-navy/10" />
          <div className="h-1 w-full rounded-full bg-navy/10" />
        </div>
        <div className="mt-2 inline-flex items-center gap-1 rounded bg-success/10 px-1.5 py-0.5 text-[9px] font-semibold text-success">
          <span className="h-1 w-1 rounded-full bg-success" />
          LOW RISK
        </div>
      </div>
    );
  }
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute -top-6 -end-6 h-32 w-44 rounded-xl border border-border bg-muted/40 p-3 opacity-70 transition-opacity group-hover:opacity-100 rtl:-end-auto rtl:-start-6"
    >
      <div className="mb-2 flex items-center justify-between">
        <div className="h-1.5 w-12 rounded-full bg-navy/30" />
        <div className="h-4 w-9 rounded-full bg-warning/20 text-center text-[8px] font-bold leading-4 text-warning">
          74
        </div>
      </div>
      <div className="space-y-1.5">
        <div className="flex items-center gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-warning" />
          <div className="h-1 w-3/4 rounded-full bg-navy/15" />
        </div>
        <div className="flex items-center gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-warning" />
          <div className="h-1 w-4/5 rounded-full bg-navy/15" />
        </div>
        <div className="flex items-center gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-danger" />
          <div className="h-1 w-2/3 rounded-full bg-navy/10" />
        </div>
      </div>
    </div>
  );
}
