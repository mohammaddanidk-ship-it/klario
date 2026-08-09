"use client";

import * as React from "react";
import Link from "next/link";
import { Logo } from "@/components/brand/logo";
import { LanguageSelector } from "@/components/brand/language-selector";
import { Eye } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";

export function Footer() {
  const { t } = useI18n();

  const columns = [
    {
      title: t.footer_platform,
      links: [
        { label: t.footer_platform_1, href: "#document-understanding" },
        { label: t.footer_platform_2, href: "#scam-detector" },
        { label: t.footer_platform_3, href: "#languages" },
        { label: t.footer_platform_4, href: "#how-it-works" },
      ],
    },
    {
      title: t.footer_security,
      links: [
        { label: t.legal_privacy, href: "#legal" },
        { label: t.legal_terms, href: "#legal" },
        { label: t.legal_aiTransparency, href: "#legal" },
        { label: t.legal_responsibleAi, href: "#legal" },
      ],
    },
    {
      title: "Explore",
      links: [
        { label: "Example Library", href: "/example-library" },
        { label: "Trust Center", href: "/trust-center" },
        { label: "Get Started", href: "#upload" },
      ],
    },
  ];

  return (
    <footer className="mt-auto border-t border-border bg-background">
      <div className="container-premium py-16 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_2.6fr] lg:gap-16">
          {/* Brand + language */}
          <div className="flex flex-col gap-6">
            <Link href="/" aria-label="Klarium home">
              <Logo />
            </Link>
            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
              {t.footer_tagline}
            </p>
            <div className="flex flex-wrap items-center gap-2">
              <LanguageSelector variant="footer" />
            </div>
            {/* Honest trust badges — no fake certifications */}
            <ul className="flex flex-wrap items-center gap-2">
              {[t.trust_1, t.trust_2, t.trust_4].map((b) => (
                <li
                  key={b}
                  className="inline-flex items-center gap-1.5 rounded-md border border-border bg-muted/40 px-2.5 py-1.5 text-xs font-medium text-muted-foreground"
                >
                  <Eye className="h-3.5 w-3.5 text-brand/80" aria-hidden />
                  {b}
                </li>
              ))}
            </ul>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {columns.map((col) => (
              <div key={col.title}>
                <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-navy dark:text-white">
                  {col.title}
                </h3>
                <ul className="mt-4 space-y-3">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <Link
                        href={l.href}
                        className="text-sm text-muted-foreground transition-colors hover:text-navy hover:dark:text-white"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col items-start gap-4 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Klarium. {t.footer_rights}
          </p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-muted-foreground">
            <Link href="#legal" className="hover:text-navy hover:dark:text-white">
              {t.legal_privacy}
            </Link>
            <Link href="#legal" className="hover:text-navy hover:dark:text-white">
              {t.legal_terms}
            </Link>
            <Link href="#legal" className="hover:text-navy hover:dark:text-white">
              {t.legal_cookie}
            </Link>
            <Link href="#legal" className="hover:text-navy hover:dark:text-white">
              {t.legal_disclaimer}
            </Link>
            <span className="inline-flex items-center gap-1.5">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success/60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-success" />
              </span>
              {t.footer_status}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
