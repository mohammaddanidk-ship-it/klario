"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  Eye,
  UserCog,
  Lock,
  ShieldCheck,
  Ban,
  AlertCircle,
  type LucideIcon,
} from "lucide-react";
import { Section } from "@/components/brand/section";
import { useI18n } from "@/lib/i18n/context";

interface SecurityPoint {
  icon: LucideIcon;
  title: string;
  description: string;
}

export function Security() {
  const { t } = useI18n();

  const points: SecurityPoint[] = [
    { icon: Eye, title: t.sec_1_title, description: t.sec_1_desc },
    { icon: UserCog, title: t.sec_2_title, description: t.sec_2_desc },
    { icon: Lock, title: t.sec_3_title, description: t.sec_3_desc },
    { icon: ShieldCheck, title: t.sec_4_title, description: t.sec_4_desc },
    { icon: Ban, title: t.sec_5_title, description: t.sec_5_desc },
    { icon: AlertCircle, title: t.sec_6_title, description: t.sec_6_desc },
  ];

  return (
    <Section id="security" className="relative overflow-hidden py-20 sm:py-24 lg:py-32">
      <div className="absolute inset-0 -z-10 bg-navy dark:bg-navy-deep" />
      <div className="absolute inset-0 -z-10 bg-grid-premium opacity-[0.06]" />
      <div className="absolute left-1/2 top-0 h-64 w-[640px] -translate-x-1/2 rounded-full bg-brand/20 blur-[120px]" />

      <div className="container-premium relative">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-brand">
            <span className="h-px w-6 bg-brand/40" aria-hidden />
            {t.sec_eyebrow}
          </span>
          <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
            {t.sec_title}
          </h2>
          <p className="mt-5 text-pretty text-base leading-relaxed text-white/70 sm:text-lg">
            {t.sec_description}
          </p>
        </div>

        <div className="mt-14 grid gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3">
          {points.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="group rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm transition-colors hover:border-white/20 hover:bg-white/[0.07]"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand/15 text-brand">
                <p.icon className="h-5 w-5" aria-hidden />
              </div>
              <h3 className="mt-4 text-base font-semibold tracking-tight text-white">
                {p.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-white/70">
                {p.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Honest compliance strip — no fake badges */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-12 flex flex-col gap-6 rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8"
        >
          <div className="flex items-start gap-3 sm:items-center">
            <ShieldCheck className="h-6 w-6 shrink-0 text-brand" />
            <div>
              <p className="text-sm font-medium text-white">
                {t.sec_stripTitle}
              </p>
              <p className="mt-1 text-sm text-white/60">
                {t.sec_stripDesc}
              </p>
            </div>
          </div>
          <a
            href="#legal"
            className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-white px-5 py-2.5 text-sm font-medium text-navy transition-transform hover:scale-[1.02]"
          >
            {t.sec_stripCta}
          </a>
        </motion.div>
      </div>
    </Section>
  );
}
