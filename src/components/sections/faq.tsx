"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Section, SectionHeading } from "@/components/brand/section";
import { useI18n } from "@/lib/i18n/context";

export function FAQ() {
  const { t } = useI18n();

  const faqs = [
    { q: t.faq_1_q, a: t.faq_1_a },
    { q: t.faq_2_q, a: t.faq_2_a },
    { q: t.faq_3_q, a: t.faq_3_a },
    { q: t.faq_4_q, a: t.faq_4_a },
    { q: t.faq_5_q, a: t.faq_5_a },
    { q: t.faq_6_q, a: t.faq_6_a },
  ];

  return (
    <Section id="docs" className="py-20 sm:py-24 lg:py-32">
      <div className="container-premium">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.4fr] lg:gap-16">
          <SectionHeading
            align="left"
            eyebrow={t.faq_eyebrow}
            title={t.faq_title}
            description={t.faq_description}
          />
          <div className="rounded-2xl border border-border bg-card p-2 shadow-premium-sm sm:p-3">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((f, i) => (
                <AccordionItem
                  key={i}
                  value={`item-${i}`}
                  className="border-border last:border-b-0"
                >
                  <AccordionTrigger className="px-4 py-4 text-start text-[15px] font-medium text-navy hover:no-underline hover:dark:text-white">
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-5 text-sm leading-relaxed text-muted-foreground">
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </Section>
  );
}
