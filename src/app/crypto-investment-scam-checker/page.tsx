import type { Metadata } from "next";
import { ShieldCheck } from "lucide-react";
import { SEOLanding } from "@/components/seo/landing-template";

export const metadata: Metadata = {
  title: "Crypto Investment Scam Checker | Klarium",
  description: "Check if a cryptocurrency investment offer or message is a scam. Free AI fraud detection.",
  alternates: { canonical: "/crypto-investment-scam-checker" },
};

export default function Page() {
  return (
    <SEOLanding
      eyebrow="Crypto Scam Checker"
      title="Is this crypto investment offer a scam?"
      subtitle="Cryptocurrency scams promise guaranteed returns and use urgency tactics. Klarium checks any investment pitch or message for known fraud patterns."
      icon={ShieldCheck}
      problem="Crypto investment scams cost people significant savings by promising unrealistic guaranteed returns and pressuring quick decisions."
      solutionPoints={[
        "Paste the investment offer or message for analysis",
        "Get a clear scam-or-legitimate verdict",
        "Understand exactly which red flags were found",
        "Get guidance on protecting your funds"
      ]}
      faqs={[
        { q: "Can Klarium verify a specific crypto exchange?", a: "Klarium checks message patterns for fraud, but always independently verify any platform through official regulatory sources." },
        { q: "Is this free?", a: "Yes, completely free with no account required." }
      ]}
      ctaLabel="Check This Message"
      ctaHref="/#scam-detector"
    />
  );
}
