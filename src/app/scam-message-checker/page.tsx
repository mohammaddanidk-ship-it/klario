import type { Metadata } from "next";
import { ShieldCheck } from "lucide-react";
import { SEOLanding } from "@/components/seo/landing-template";

export const metadata: Metadata = {
  title: "Scam Message Checker — Free AI Fraud Detection | Klarium",
  description: "Check any suspicious text message, WhatsApp message, or DM for signs of fraud. Free instant AI analysis.",
  alternates: { canonical: "/scam-message-checker" },
};

export default function Page() {
  return (
    <SEOLanding
      eyebrow="Scam Message Checker"
      title="Check any suspicious message before you respond"
      subtitle="Scam messages don't just come by email anymore — SMS, WhatsApp, and social media DMs are common attack routes too. Klarium Shield checks any message for fraud patterns instantly."
      icon={ShieldCheck}
      problem="Fraudsters increasingly use text messages and messaging apps because people trust them more than email. Fake delivery notices, prize notifications, and impersonated contacts trick thousands of people daily."
      solutionPoints={[
        "Paste any suspicious text message or DM for instant analysis",
        "Get a clear scam-or-legitimate verdict with a confidence rating",
        "Understand exactly why the message was flagged",
        "Receive specific guidance on what to do next",
      ]}
      faqs={[
        { q: "Does this work for WhatsApp messages?", a: "Yes. Paste the text of any message from any platform — SMS, WhatsApp, Instagram, or elsewhere — for analysis." },
        { q: "Is this free?", a: "Yes, completely free with no account required." },
        { q: "What if the scammer already has my information?", a: "Contact your bank immediately if you've shared financial details, and report the message to your local cybercrime authority." },
      ]}
      ctaLabel="Check This Message"
      ctaHref="/#scam-detector"
    />
  );
}
