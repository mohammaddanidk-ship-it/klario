"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Gauge,
  ListTree,
  Link2,
  ListOrdered,
  type LucideIcon,
} from "lucide-react";
import { Section, SectionHeading } from "@/components/brand/section";
import { useI18n } from "@/lib/i18n/context";

export function PhishingDetector() {
  const { t } = useI18n();

  const points: { n: string; icon: LucideIcon; title: string; desc: string }[] = [
    { n: "01", icon: ShieldCheck, title: t.pd_1_title, desc: t.pd_1_desc },
    { n: "02", icon: Gauge, title: t.pd_2_title, desc: t.pd_2_desc },
    { n: "03", icon: ListTree, title: t.pd_3_title, desc: t.pd_3_desc },
    { n: "04", icon: Link2, title: t.pd_4_title, desc: t.pd_4_desc },
    { n: "05", icon: ListOrdered, title: t.pd_5_title, desc: t.pd_5_desc },
  ];

  return (
    <Section
      id="scam-detector"
      className="relative overflow-hidden border-y border-border/60 bg-muted/20 py-20 sm:py-24 lg:py-32"
    >
      <div className="container-premium">
        <SectionHeading
          eyebrow={t.pd_eyebrow}
          title={t.pd_title}
          description={t.pd_description}
        />

        {/* Risk score visual + reasons grid */}
        <div className="mt-14 grid gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-8">
          {/* Risk score visual — sample, illustrative */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center justify-center rounded-2xl border border-border bg-card p-8 shadow-premium-sm sm:p-10"
          >
            <div className="relative h-44 w-44">
              <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
                <circle cx="60" cy="60" r="52" stroke="currentColor" strokeWidth="8" fill="none" className="text-muted/40" />
                <circle
                  cx="60"
                  cy="60"
                  r="52"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                  strokeLinecap="round"
                  className="text-warning"
                  strokeDasharray={`${(74 / 100) * 2 * Math.PI * 52} ${2 * Math.PI * 52}`}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-semibold tracking-tight text-navy dark:text-white">
                  74
                </span>
                <span className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground">
                  / 100
                </span>
              </div>
            </div>
            <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-warning/30 bg-warning/10 px-3 py-1.5 text-xs font-semibold text-warning">
              <span className="h-1.5 w-1.5 rounded-full bg-warning" />
              {t.pd_2_title}
            </div>
            <p className="mt-3 text-center text-xs text-muted-foreground">
              {t.pd_description}
            </p>
          </motion.div>

          {/* Reasons list */}
          <div className="grid gap-4 sm:grid-cols-2">
            {points.map((p, i) => (
              <motion.div
                key={p.n}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                className="group flex flex-col gap-3 rounded-2xl border border-border bg-card p-5 shadow-premium-sm transition-all hover:-translate-y-0.5 hover:shadow-premium sm:p-6"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand/10 text-brand transition-colors group-hover:bg-brand group-hover:text-white">
                    <p.icon className="h-4 w-4" aria-hidden />
                  </div>
                  <span className="text-xs font-semibold tracking-widest text-muted-foreground/60">
                    {p.n}
                  </span>
                </div>
                <h3 className="text-sm font-semibold tracking-tight text-navy dark:text-white">
                  {p.title}
                </h3>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  {p.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
