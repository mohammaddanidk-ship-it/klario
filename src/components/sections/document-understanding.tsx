"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  BookOpen,
  AlignLeft,
  ListChecks,
  Languages,
  AlertTriangle,
  ListOrdered,
  MessageSquareQuote,
  type LucideIcon,
} from "lucide-react";
import { Section, SectionHeading } from "@/components/brand/section";
import { useI18n } from "@/lib/i18n/context";

export function DocumentUnderstanding() {
  const { t } = useI18n();

  const points: {
    n: string;
    icon: LucideIcon;
    title: string;
    desc: string;
  }[] = [
    { n: "01", icon: BookOpen, title: t.du_1_title, desc: t.du_1_desc },
    { n: "02", icon: AlignLeft, title: t.du_2_title, desc: t.du_2_desc },
    { n: "03", icon: ListChecks, title: t.du_3_title, desc: t.du_3_desc },
    { n: "04", icon: Languages, title: t.du_4_title, desc: t.du_4_desc },
    { n: "05", icon: AlertTriangle, title: t.du_5_title, desc: t.du_5_desc },
    { n: "06", icon: ListOrdered, title: t.du_6_title, desc: t.du_6_desc },
    { n: "07", icon: MessageSquareQuote, title: t.du_7_title, desc: t.du_7_desc },
  ];

  return (
    <Section id="document-understanding" className="py-20 sm:py-24 lg:py-32">
      <div className="container-premium">
        <SectionHeading
          eyebrow={t.du_eyebrow}
          title={t.du_title}
          description={t.du_description}
        />

        <ol className="mt-14 grid gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3">
          {points.map((p, i) => (
            <motion.li
              key={p.n}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: (i % 3) * 0.06, ease: [0.16, 1, 0.3, 1] }}
              className="group relative flex flex-col gap-3 rounded-2xl border border-border bg-card p-6 shadow-premium-sm transition-all hover:-translate-y-0.5 hover:shadow-premium sm:p-7"
            >
              <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand/10 text-brand transition-colors group-hover:bg-brand group-hover:text-white">
                  <p.icon className="h-5 w-5" aria-hidden />
                </div>
                <span className="text-xs font-semibold tracking-widest text-muted-foreground/60">
                  {p.n}
                </span>
              </div>
              <h3 className="text-base font-semibold tracking-tight text-navy dark:text-white">
                {p.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {p.desc}
              </p>
            </motion.li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
