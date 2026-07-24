"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Languages, ArrowLeftRight, Target, Globe2 } from "lucide-react";
import { Section, SectionHeading } from "@/components/brand/section";
import { useI18n } from "@/lib/i18n/context";
import { LANGUAGES } from "@/lib/i18n/config";

export function MultiLanguage() {
  const { t, lang, setLang } = useI18n();

  const pillars = [
    { icon: ArrowLeftRight, title: t.ml_rtl, desc: t.ml_rtlDesc },
    { icon: Target, title: t.ml_accuracy, desc: t.ml_accuracyDesc },
    { icon: Globe2, title: t.ml_global, desc: t.ml_globalDesc },
  ];

  return (
    <Section id="languages" className="relative overflow-hidden py-20 sm:py-24 lg:py-32">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 h-72 w-[640px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/8 blur-[120px]" />
      </div>

      <div className="container-premium">
        <SectionHeading
          eyebrow={t.ml_eyebrow}
          title={
            <>
              {t.ml_title.split(".")[0]}.{" "}
              <span className="text-brand">{t.ml_title.split(".")[1]}.</span>
            </>
          }
          description={t.ml_description}
        />

        {/* Language grid — clickable, instant switch */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mt-14 rounded-2xl border border-border bg-card p-5 shadow-premium-sm sm:p-7"
        >
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm font-medium text-navy dark:text-white">
              <Languages className="h-4 w-4 text-brand" />
              16 languages
            </div>
            <span className="text-xs text-muted-foreground">
              {LANGUAGES.filter((l) => l.rtl).length} RTL · {LANGUAGES.length - LANGUAGES.filter((l) => l.rtl).length} LTR
            </span>
          </div>
          <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
            {LANGUAGES.map((l) => {
              const active = l.code === lang;
              return (
                <li key={l.code}>
                  <button
                    type="button"
                    onClick={() => setLang(l.code)}
                    aria-pressed={active}
                    className={
                      "group flex w-full items-center justify-between gap-2 rounded-lg border px-3 py-2.5 text-start transition-all " +
                      (active
                        ? "border-brand/40 bg-brand/5 shadow-premium-xs"
                        : "border-border bg-muted/30 hover:bg-muted hover:border-brand/30")
                    }
                  >
                    <span className="flex min-w-0 items-center gap-2.5">
                      <span
                        className="flex h-5 w-7 shrink-0 items-center justify-center rounded bg-background text-[10px] font-semibold text-muted-foreground"
                        dir="ltr"
                      >
                        {l.shortLabel}
                      </span>
                      <span
                        className="truncate text-sm font-medium text-navy dark:text-white"
                        dir={l.rtl ? "rtl" : "ltr"}
                        style={{ fontFamily: l.fontStack }}
                      >
                        {l.nativeName}
                      </span>
                    </span>
                    {l.rtl ? (
                      <span className="shrink-0 rounded bg-brand/10 px-1 py-0.5 text-[9px] font-semibold text-brand">
                        RTL
                      </span>
                    ) : null}
                  </button>
                </li>
              );
            })}
          </ul>
        </motion.div>

        {/* Three pillars */}
        <div className="mt-8 grid gap-4 sm:gap-5 md:grid-cols-3">
          {pillars.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-2xl border border-border bg-card p-6 shadow-premium-sm sm:p-7"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand/10 text-brand">
                <p.icon className="h-5 w-5" aria-hidden />
              </div>
              <h3 className="mt-4 text-base font-semibold tracking-tight text-navy dark:text-white">
                {p.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {p.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
