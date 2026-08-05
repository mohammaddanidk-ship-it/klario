import type { Metadata } from "next";
import { FileText } from "lucide-react";
import { SEOLanding } from "@/components/seo/landing-template";

export const metadata: Metadata = {
  title: "Bank Rejection Letter Explained | Klarium",
  description: "Understand exactly why your loan or credit application was rejected, in plain language, with your next steps clearly explained.",
  alternates: { canonical: "/bank-rejection-letter-explained" },
};

export default function Page() {
  return (
    <SEOLanding
      eyebrow="Bank Letter Explainer"
      title="Understand why your application was rejected"
      subtitle="Bank rejection letters cite policy sections and ratios that mean nothing to most people. Klarium explains exactly why you were declined and what to do next."
      icon={FileText}
      problem="Bank rejection letters are often vague or use internal policy language that leaves applicants confused about what actually went wrong."
      solutionPoints={[
        "Paste your rejection letter for a clear explanation",
        "Understand exactly which factor caused the rejection",
        "See what you could improve before reapplying",
        "Get the explanation in your own language"
      ]}
      faqs={[
        { q: "Can Klarium guarantee approval next time?", a: "No — Klarium explains what the letter says, not financial advice. For a improvement plan, consult a financial advisor." },
        { q: "Does this work for any type of loan?", a: "Yes — mortgage, personal loan, credit card, and business loan rejections all work." }
      ]}
      ctaLabel="Explain My Document"
      ctaHref="/#upload"
    />
  );
}
