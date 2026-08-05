import type { Metadata } from "next";
import { ShieldCheck } from "lucide-react";
import { SEOLanding } from "@/components/seo/landing-template";

export const metadata: Metadata = {
  title: "WhatsApp Scam Checker — Free AI Fraud Detection | Klarium",
  description: "Paste any suspicious WhatsApp message and get an instant AI check for scam patterns. Free and private.",
  alternates: { canonical: "/whatsapp-scam-checker" },
};

export default function Page() {
  return (
    <SEOLanding
      eyebrow="WhatsApp Scam Checker"
      title="Is this WhatsApp message a scam?"
      subtitle="Fraudsters increasingly target WhatsApp with fake delivery notices, job offers, and prize messages. Klarium Shield checks any message instantly."
      icon={ShieldCheck}
      problem="WhatsApp scams are rising fast because people trust messages from what looks like a known contact or familiar brand."
      solutionPoints={[
        "Paste any suspicious WhatsApp message for instant analysis",
        "Get a clear scam-or-legitimate verdict",
        "See exactly which red flags were found",
        "Get specific next steps if it's a scam"
      ]}
      faqs={[
        { q: "Does this work for WhatsApp Business messages too?", a: "Yes, any message text can be checked regardless of the account type." },
        { q: "Is this free?", a: "Yes, completely free with no account required." }
      ]}
      ctaLabel="Check This Message"
      ctaHref="/#scam-detector"
    />
  );
}
