"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Upload, Cpu, FileCheck2 } from "lucide-react";
import { Section, SectionHeading } from "@/components/brand/section";
import { useI18n } from "@/lib/i18n/context";

export function HowItWorks() {
  const { t } = useI18n();

  const steps = [
    { n: "01", icon: Upload, title: t.hw_1_title, desc: t.hw_1_desc },
    { n: "02", icon: Cpu, title: t.hw_2_title, desc: t.hw_2_desc },
    { n: "03", icon: FileCheck2, title: t.hw_3_title, desc: t.hw_3_desc },
  ];

  return (
    <Section
      id="how-it-works"
      className="border-y border-border/60 bg-muted/20 py-20 sm:py-24 lg:py-32"
    >
      <div className="container-premium">
        <SectionHeading
          eyebrow={t.hw_eyebrow}
          title={t.hw_title}
          description={t.hw_description}
        />

        <ol className="mt-16 grid gap-10 md:grid-cols-3 md:gap-6 lg:gap-10">
          {steps.map((s, i) => (
            <motion.li
              key={s.n}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="relative flex flex-col"
            >
              {i < steps.length - 1 ? (
                <span
                  aria-hidden
                  className="absolute start-[3.25rem] top-7 hidden h-px w-[calc(100%-3.25rem-1.5rem)] bg-gradient-to-r from-border to-transparent md:block rtl:bg-gradient-to-l"
                />
              ) : null}

              <div className="flex items-center gap-4">
                <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-border bg-background shadow-premium-sm">
                  <s.icon className="h-5 w-5 text-brand" aria-hidden />
                  <span className="absolute -end-2 -top-2 flex h-6 min-w-6 items-center justify-center rounded-full bg-navy px-1.5 text-[11px] font-semibold text-white shadow-premium-xs dark:bg-white dark:text-navy">
                    {s.n}
                  </span>
                </div>
              </div>

              <h3 className="mt-6 text-lg font-semibold tracking-tight text-navy dark:text-white">
                {s.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {s.desc}
              </p>
            </motion.li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
