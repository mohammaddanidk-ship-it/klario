import type { Metadata } from "next";
import { FileText } from "lucide-react";
import { SEOLanding } from "@/components/seo/landing-template";

export const metadata: Metadata = {
  title: "Visa Rejection Letter Explained | Klarium",
  description: "Understand exactly why your visa was rejected and what your options are, explained in plain language, free.",
  alternates: { canonical: "/visa-rejection-letter-explained" },
};

export default function Page() {
  return (
    <SEOLanding
      eyebrow="Visa Document Explainer"
      title="Understand your visa rejection letter"
      subtitle="Visa rejection letters cite specific regulations and codes that are hard to interpret. Klarium explains what went wrong and what your realistic options are."
      icon={FileText}
      problem="Visa applicants often receive rejection letters citing regulation codes with no plain explanation, leaving them unsure whether to appeal, reapply, or seek other options."
      solutionPoints={[
        "Paste your rejection letter for a clear breakdown",
        "Understand the specific reason cited for rejection",
        "See what general next steps are commonly available",
        "Get the explanation in your own language"
      ]}
      faqs={[
        { q: "Can Klarium help me appeal?", a: "Klarium explains the letter's content. For an appeal strategy, consult an immigration lawyer." },
        { q: "Does this work for any country's visa system?", a: "Yes, Klarium can explain visa correspondence from any country in 16 languages." }
      ]}
      ctaLabel="Explain My Document"
      ctaHref="/#upload"
    />
  );
}
