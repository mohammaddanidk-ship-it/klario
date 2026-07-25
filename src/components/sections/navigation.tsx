"use client";

import * as React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { LanguageSelector } from "@/components/brand/language-selector";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n/context";
import { cn } from "@/lib/utils";

export function Navigation() {
  const { t, rtl } = useI18n();
  const [scrolled, setScrolled] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const NAV_LINKS = [
    { label: t.nav_platform, href: "#platform" },
    { label: t.nav_features, href: "#features" },
    { label: t.nav_howItWorks, href: "#how-it-works" },
    { label: t.nav_security, href: "#security" },
  ];

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => {
    if (mobileOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [mobileOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-x-0 top-0 z-50"
      >
        <div
          className={cn(
            "transition-all duration-300",
            scrolled
              ? "bg-background/80 backdrop-blur-xl border-b border-border/60"
              : "bg-transparent border-b border-transparent"
          )}
        >
          <nav
            className="container-premium flex h-16 items-center justify-between lg:h-18"
            aria-label="Primary"
          >
            <Link
              href="/"
              className="flex items-center transition-opacity hover:opacity-80"
              aria-label="Klario home"
            >
              <Logo />
            </Link>

            {/* Desktop nav */}
            <div className="hidden lg:flex lg:items-center lg:gap-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-navy hover:dark:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Desktop right cluster */}
            <div className="flex items-center gap-2">
              <LanguageSelector />

              <div className="hidden lg:flex lg:items-center lg:gap-2 lg:ms-1">
                <Button
                  size="sm"
                  asChild
                  className="group h-9 gap-1.5 rounded-full bg-navy px-4 text-sm font-medium text-white shadow-premium-sm transition-all hover:bg-navy-deep hover:shadow-premium dark:bg-white dark:text-navy dark:hover:bg-white/90"
                >
                  <Link href="#upload">
                    {t.nav_getStarted}
                    <ArrowRight className={cn("h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 rtl-flip", rtl && "rtl-flip")} />
                  </Link>
                </Button>
              </div>

              {/* Mobile toggle */}
              <button
                type="button"
                className="inline-flex h-10 w-10 items-center justify-center rounded-md text-navy dark:text-white lg:hidden"
                aria-label={mobileOpen ? t.nav_closeMenu : t.nav_openMenu}
                aria-expanded={mobileOpen}
                onClick={() => setMobileOpen((v) => !v)}
              >
                {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </nav>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl lg:hidden"
          >
            <div className="container-premium flex h-full flex-col pt-20 pb-8">
              <nav
                className="flex flex-col gap-1"
                aria-label="Mobile"
                onClick={() => setMobileOpen(false)}
              >
                {NAV_LINKS.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: rtl ? 8 : -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.04 }}
                  >
                    <Link
                      href={link.href}
                      className="block rounded-lg px-3 py-3.5 text-lg font-medium text-navy dark:text-white hover:bg-muted"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>
              <div className="mt-auto flex flex-col gap-3">
                <Button
                  asChild
                  className="h-11 gap-1.5 rounded-full bg-navy text-sm font-medium text-white shadow-premium dark:bg-white dark:text-navy"
                >
                  <Link href="#upload" onClick={() => setMobileOpen(false)}>
                    {t.nav_getStarted}
                    <ArrowRight className="h-4 w-4 rtl-flip" />
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
