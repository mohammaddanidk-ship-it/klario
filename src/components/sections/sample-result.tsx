"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  FileText,
  Languages,
  Download,
  Send,
  Stethoscope,
  AlertTriangle,
  ListChecks,
  ShieldCheck,
  Globe,
} from "lucide-react";
import { Section, SectionHeading } from "@/components/brand/section";
import { useI18n } from "@/lib/i18n/context";

export function SampleResult() {
  const { t, lang, rtl } = useI18n();
  const [followUp, setFollowUp] = React.useState("");

  return (
    <Section id="sample-result" className="py-20 sm:py-24 lg:py-32">
      <div className="container-premium">
        <SectionHeading
          eyebrow={t.sr_eyebrow}
          title={t.sr_title}
          description={t.sr_description}
        />

        {/* The premium report card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mt-14 overflow-hidden rounded-2xl border border-border bg-card shadow-premium-lg"
        >
          {/* Header bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border bg-muted/30 px-5 py-4 sm:px-7">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-navy text-white dark:bg-white dark:text-navy">
                <FileText className="h-4 w-4" />
              </div>
              <div>
                <div className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                  Klario · AI Report
                </div>
                <div className="text-sm font-semibold text-navy dark:text-white">
                  blood_test_q3.pdf
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-navy hover:dark:text-white"
              >
                <Languages className="h-3.5 w-3.5 text-brand" />
                {t.sr_translate}
              </button>
              <button
                type="button"
                className="inline-flex items-center gap-1.5 rounded-full bg-navy px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-navy-deep dark:bg-white dark:text-navy"
              >
                <Download className="h-3.5 w-3.5" />
                {t.sr_download}
              </button>
            </div>
          </div>

          {/* Body */}
          <div className="grid gap-0 lg:grid-cols-[1.6fr_1fr]">
            {/* Left column: meta + summary + key info + actions */}
            <div className="p-5 sm:p-7 lg:border-e lg:border-border">
              {/* Meta row */}
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                <MetaTile icon={Stethoscope} label={t.sr_docType} value={t.up_type_medical} />
                <MetaTile
                  icon={Globe}
                  label={t.sr_language}
                  value={lang.toUpperCase()}
                />
                <MetaTile
                  icon={ShieldCheck}
                  label={t.sr_riskLevel}
                  value={t.sr_riskLow}
                  tone="success"
                />
              </div>

              {/* Summary */}
              <div className="mt-7">
                <SectionLabel>{t.sr_summary}</SectionLabel>
                <p className="mt-2.5 text-sm leading-relaxed text-navy dark:text-white">
                  {t.sr_summaryBody}
                </p>
              </div>

              {/* Key info */}
              <div className="mt-7">
                <SectionLabel>{t.sr_keyInfo}</SectionLabel>
                <ul className="mt-2.5 space-y-2">
                  {[t.sr_keyInfo_1, t.sr_keyInfo_2, t.sr_keyInfo_3].map((info, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2.5 text-sm text-navy dark:text-white"
                    >
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                      <span className="leading-relaxed">{info}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Actions */}
              <div className="mt-7">
                <SectionLabel>{t.sr_actions}</SectionLabel>
                <ol className="mt-2.5 space-y-2">
                  {[t.sr_action_1, t.sr_action_2, t.sr_action_3].map((action, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2.5 text-sm text-navy dark:text-white"
                    >
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand/10 text-[10px] font-semibold text-brand">
                        {i + 1}
                      </span>
                      <span className="leading-relaxed">{action}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            {/* Right column: warnings + ask AI */}
            <div className="border-t border-border bg-muted/20 p-5 sm:p-7 lg:border-t-0">
              {/* Warnings */}
              <div className="rounded-xl border border-warning/30 bg-warning/5 p-4">
                <div className="flex items-center gap-2 text-warning">
                  <AlertTriangle className="h-4 w-4" />
                  <span className="text-xs font-semibold uppercase tracking-widest">
                    {t.sr_warnings}
                  </span>
                </div>
                <p className="mt-2 text-xs leading-relaxed text-navy/80 dark:text-white/70">
                  {t.sr_warningBody}
                </p>
              </div>

              {/* Ask AI follow-up */}
              <div className="mt-6">
                <SectionLabel icon={ListChecks}>{t.sr_askAi}</SectionLabel>
                <div className="mt-2.5 flex items-center gap-2 rounded-xl border border-border bg-background p-2">
                  <input
                    type="text"
                    value={followUp}
                    onChange={(e) => setFollowUp(e.target.value)}
                    placeholder={t.sr_askAiPlaceholder}
                    className="min-w-0 flex-1 bg-transparent px-2 py-1.5 text-sm text-navy outline-none placeholder:text-muted-foreground dark:text-white"
                  />
                  <button
                    type="button"
                    aria-label={t.sr_askAi}
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-navy text-white transition-colors hover:bg-navy-deep dark:bg-white dark:text-navy"
                  >
                    <Send className={rtl ? "h-3.5 w-3.5 rtl-flip" : "h-3.5 w-3.5"} />
                  </button>
                </div>
                {/* Suggested follow-ups */}
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {[t.sr_action_1, t.sr_keyInfo_1].map((s, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setFollowUp(s)}
                      className="rounded-full border border-border bg-background px-2.5 py-1 text-[11px] font-medium text-muted-foreground transition-colors hover:border-brand/40 hover:text-navy hover:dark:text-white"
                    >
                      {s.length > 32 ? s.slice(0, 32) + "…" : s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Disclaimer */}
              <p className="mt-6 text-[11px] leading-relaxed text-muted-foreground">
                {t.sr_disclaimer}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </Section>
  );
}

function MetaTile({
  icon: Icon,
  label,
  value,
  tone = "default",
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  tone?: "default" | "success";
}) {
  return (
    <div className="rounded-xl border border-border bg-muted/30 p-3">
      <div className="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-widest text-muted-foreground">
        <Icon className="h-3 w-3 text-brand" />
        {label}
      </div>
      <div
        className={
          tone === "success"
            ? "mt-1.5 text-sm font-semibold text-success"
            : "mt-1.5 text-sm font-semibold text-navy dark:text-white"
        }
      >
        {value}
      </div>
    </div>
  );
}

function SectionLabel({
  children,
  icon: Icon,
}: {
  children: React.ReactNode;
  icon?: React.ComponentType<{ className?: string }>;
}) {
  return (
    <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
      {Icon ? <Icon className="h-3 w-3 text-brand" /> : null}
      {children}
    </div>
  );
}
