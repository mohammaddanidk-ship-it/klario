"use client";

import { Eye, Lock, UserCog, ShieldCheck } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";

export function TrustBar() {
  const { t } = useI18n();

  const items = [
    { icon: Eye, label: t.trust_1 },
    { icon: Lock, label: t.trust_2 },
    { icon: UserCog, label: t.trust_3 },
    { icon: ShieldCheck, label: t.trust_4 },
  ];

  return (
    <section
      className="border-y border-border/60 bg-muted/30 py-10"
      aria-label="Trust"
    >
      <div className="container-premium">
        <p className="text-center text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
          {t.trust_label}
        </p>
        <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-5 sm:gap-x-12">
          {items.map((c) => (
            <li
              key={c.label}
              className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-navy hover:dark:text-white"
            >
              <c.icon className="h-4 w-4 text-brand/80" aria-hidden />
              {c.label}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
