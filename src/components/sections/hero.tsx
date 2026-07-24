"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Upload, ShieldCheck, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HeroScene, HeroSceneFallback } from "@/components/three/hero-scene";
import { useI18n } from "@/lib/i18n/context";
import { cn } from "@/lib/utils";

function useReducedMotion() {
  const [reduced, setReduced] = React.useState(false);
  React.useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = () => setReduced(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return reduced;
}

export function Hero() {
  const { t, rtl } = useI18n();
  const reduced = useReducedMotion();
  const [isSmall, setIsSmall] = React.useState(false);
  React.useEffect(() => {
    const mq = window.matchMedia("(max-width: 640px)");
    setIsSmall(mq.matches);
    const handler = () => setIsSmall(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const show3D = !reduced && !isSmall;

  return (
    <section
      className="relative overflow-hidden pt-28 pb-16 sm:pt-32 lg:pt-40 lg:pb-24"
      aria-labelledby="hero-heading"
    >
      {/* Background layers */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid-premium mask-fade-b opacity-60" />
        <div className="absolute left-1/2 top-0 h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-brand/10 blur-[120px]" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </div>

      <div className="container-premium">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-8">
          {/* Left: copy */}
          <div className="flex flex-col items-start text-left">
            <motion.div
              initial={reduced ? undefined : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-3 py-1 text-xs font-medium text-muted-foreground shadow-premium-xs backdrop-blur-sm"
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success/60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-success" />
              </span>
              {t.hero_badge}
              <Sparkles className="h-3 w-3 text-brand" />
            </motion.div>

            <motion.h1
              id="hero-heading"
              initial={reduced ? undefined : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
              className="mt-5 text-balance text-[2rem] font-semibold leading-[1.1] tracking-tight text-navy dark:text-white sm:text-5xl lg:text-[3.75rem] lg:leading-[1.05]"
            >
              {t.hero_title_1}
              <br />
              <span className="text-gradient-navy">{t.hero_title_2}</span>
            </motion.h1>

            <motion.p
              initial={reduced ? undefined : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg"
            >
              {t.hero_subtitle}
            </motion.p>

            {/* On mobile, illustration goes here (between subtext and CTAs) */}
            <motion.div
              initial={reduced ? undefined : { opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6 w-full lg:hidden"
              aria-hidden="true"
            >
              <div className="relative mx-auto aspect-square w-full max-w-[340px]">
                <div className="absolute inset-[10%] rounded-full bg-brand/10 blur-[60px]" />
                <HeroSceneFallback />
              </div>
            </motion.div>

            <motion.div
              initial={reduced ? undefined : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
              className="mt-7 flex w-full flex-col gap-3 sm:flex-row sm:items-center"
            >
              <Button
                asChild
                size="lg"
                className="group h-12 gap-2 rounded-full bg-navy px-7 text-sm font-semibold text-white shadow-premium-lg transition-all hover:bg-navy-deep hover:shadow-premium-xl dark:bg-white dark:text-navy dark:hover:bg-white/90"
              >
                <Link href="#upload">
                  <Upload className="h-4 w-4 rtl-flip" />
                  {t.hero_ctaPrimary}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 rtl-flip" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-12 gap-1.5 rounded-full border-border bg-background/60 px-6 text-sm font-medium text-navy backdrop-blur-sm hover:bg-muted hover:border-brand/40 dark:text-white"
              >
                <Link href="#scam-detector">
                  <ShieldCheck className="h-4 w-4" />
                  {t.hero_ctaSecondary}
                </Link>
              </Button>
            </motion.div>

            {/* Trust badges — honest, not fake certifications */}
            <motion.ul
              initial={reduced ? undefined : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3"
              aria-label="Trust"
            >
              {[t.hero_trust1, t.hero_trust2, t.hero_trust3].map((label) => (
                <li
                  key={label}
                  className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-brand" aria-hidden />
                  {label}
                </li>
              ))}
            </motion.ul>
          </div>

          {/* Right: 3D scene — desktop only */}
          <motion.div
            initial={reduced ? undefined : { opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className={cn(
              "relative hidden aspect-[5/6] w-full max-w-none lg:block",
              "rounded-2xl"
            )}
            aria-hidden="true"
          >
            <div className="absolute inset-[10%] rounded-full bg-brand/10 blur-[80px]" />
            {show3D ? (
              <div className="absolute inset-0">
                <HeroScene />
              </div>
            ) : (
              <HeroSceneFallback />
            )}

            {/* Floating UI chip */}
            <motion.div
              initial={reduced ? undefined : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="absolute bottom-6 right-6 w-64 rtl:right-auto rtl:left-6"
            >
              <div className="rounded-xl border border-border bg-background/85 p-3 shadow-premium-lg backdrop-blur-md">
                <div className="flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-md bg-brand/10">
                    <ShieldCheck className="h-4 w-4 text-brand" />
                  </div>
                  <div className="flex-1">
                    <div className="text-xs font-medium text-navy dark:text-white">
                      {t.hero_chipTitle}
                    </div>
                    <div className="text-[11px] text-muted-foreground">
                      {t.hero_chipSub}
                    </div>
                  </div>
                  <span className="h-1.5 w-1.5 rounded-full bg-success" />
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
