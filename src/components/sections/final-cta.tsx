"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/brand/section";
import { useI18n } from "@/lib/i18n/context";

export function FinalCTA() {
  const { t, rtl } = useI18n();

  return (
    <Section className="py-20 sm:py-24 lg:py-32">
      <div className="container-premium">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative overflow-hidden rounded-3xl border border-border bg-card p-8 shadow-premium-lg sm:p-12 lg:p-16"
        >
          <div className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-grid-premium opacity-30" />
            <div className="absolute -end-20 -top-20 h-72 w-72 rounded-full bg-brand/10 blur-[100px] rtl:-end-auto rtl:-start-20" />
            <div className="absolute -bottom-24 -start-20 h-72 w-72 rounded-full bg-navy/5 blur-[100px] rtl:-start-auto rtl:-end-20" />
          </div>

          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur-sm">
              <ShieldCheck className="h-3.5 w-3.5 text-brand" />
              {t.cta_badge}
            </span>
            <h2 className="mt-6 text-balance text-3xl font-semibold tracking-tight text-navy dark:text-white sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
              {t.cta_title_1}
              <br />
              <span className="text-brand">{t.cta_title_2}</span>
            </h2>
            <p className="mt-5 text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
              {t.cta_description}
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="group h-12 gap-1.5 rounded-full bg-navy px-6 text-sm font-medium text-white shadow-premium transition-all hover:bg-navy-deep hover:shadow-premium-lg dark:bg-white dark:text-navy"
              >
                <Link href="#upload">
                  {t.cta_primary}
                  <ArrowRight className={"h-4 w-4 transition-transform group-hover:translate-x-0.5" + (rtl ? " rtl-flip" : "")} />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-12 rounded-full border-border bg-background/60 px-6 text-sm font-medium text-navy backdrop-blur-sm hover:bg-muted dark:text-white"
              >
                <Link href="#legal">{t.cta_secondary}</Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </Section>
  );
}
