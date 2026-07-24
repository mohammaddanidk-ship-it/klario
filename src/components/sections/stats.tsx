"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Section } from "@/components/brand/section";
import { useI18n } from "@/lib/i18n/context";

export function Stats() {
  const { t } = useI18n();

  const stats = [
    { value: t.st_1_value, label: t.st_1_label, sub: t.st_1_sub },
    { value: t.st_2_value, label: t.st_2_label, sub: t.st_2_sub },
    { value: t.st_3_value, label: t.st_3_label, sub: t.st_3_sub },
    { value: t.st_4_value, label: t.st_4_label, sub: t.st_4_sub },
  ];

  return (
    <Section className="py-16 sm:py-20 lg:py-24">
      <div className="container-premium">
        <div className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="bg-card p-6 sm:p-8"
            >
              <div className="text-3xl font-semibold tracking-tight text-navy dark:text-white sm:text-4xl">
                {s.value}
              </div>
              <p className="mt-2 text-sm font-medium text-navy dark:text-white">
                {s.label}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">{s.sub}</p>
            </motion.div>
          ))}
        </div>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          {t.st_footnote}
        </p>
      </div>
    </Section>
  );
}
