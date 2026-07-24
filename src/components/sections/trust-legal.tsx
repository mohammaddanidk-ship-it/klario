"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Lock,
  FileText,
  AlertTriangle,
  Cookie,
  Brain,
  HeartHandshake,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Section, SectionHeading } from "@/components/brand/section";
import { useI18n } from "@/lib/i18n/context";

interface LegalTab {
  id: string;
  label: string;
  icon: LucideIcon;
  body: string;
}

export function TrustLegal() {
  const { t } = useI18n();

  const tabs: LegalTab[] = [
    { id: "privacy", label: t.legal_privacy, icon: ShieldCheck, body: t.legal_privacyBody },
    { id: "security", label: t.legal_security, icon: Lock, body: t.legal_securityBody },
    { id: "terms", label: t.legal_terms, icon: FileText, body: t.legal_termsBody },
    { id: "cookie", label: t.legal_cookie, icon: Cookie, body: t.legal_cookieBody },
    {
      id: "disclaimer",
      label: t.legal_disclaimer,
      icon: AlertTriangle,
      body: t.legal_disclaimerBody,
    },
    {
      id: "financial",
      label: t.legal_financial,
      icon: Wallet,
      body: t.legal_financialBody,
    },
    {
      id: "aiTransparency",
      label: t.legal_aiTransparency,
      icon: Brain,
      body: t.legal_aiTransparencyBody,
    },
    {
      id: "responsibleAi",
      label: t.legal_responsibleAi,
      icon: HeartHandshake,
      body: t.legal_responsibleAiBody,
    },
  ];

  return (
    <Section id="legal" className="py-20 sm:py-24 lg:py-32">
      <div className="container-premium">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.4fr] lg:gap-16">
          <SectionHeading
            align="left"
            eyebrow={t.legal_eyebrow}
            title={t.legal_title}
            description={t.legal_description}
          />

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-2xl border border-border bg-card p-2 shadow-premium-sm sm:p-3"
          >
            <Tabs defaultValue="privacy" className="w-full">
              <TabsList className="flex h-auto w-full flex-wrap gap-1 rounded-xl bg-muted/40 p-1">
                {tabs.map((tab) => (
                  <TabsTrigger
                    key={tab.id}
                    value={tab.id}
                    className="flex-1 flex-nowrap gap-1.5 rounded-lg px-2.5 py-2 text-xs font-medium data-[state=active]:bg-background data-[state=active]:shadow-premium-xs sm:text-sm"
                  >
                    <tab.icon className="h-3.5 w-3.5" />
                    <span className="hidden md:inline">{tab.label}</span>
                  </TabsTrigger>
                ))}
              </TabsList>

              {tabs.map((tab) => (
                <TabsContent
                  key={tab.id}
                  value={tab.id}
                  className="mt-2 rounded-xl p-4 sm:p-5"
                >
                  <div className="mb-3 flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand/10 text-brand">
                      <tab.icon className="h-4 w-4" />
                    </div>
                    <h3 className="text-sm font-semibold text-navy dark:text-white">
                      {tab.label}
                    </h3>
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {tab.body}
                  </p>
                </TabsContent>
              ))}
            </Tabs>
          </motion.div>
        </div>
      </div>
    </Section>
  );
}
