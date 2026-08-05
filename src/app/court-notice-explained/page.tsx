import type { Metadata } from "next";
import { FileText } from "lucide-react";
import { SEOLanding } from "@/components/seo/landing-template";

export const metadata: Metadata = {
  title: "Court Notice Explained in Plain Language | Klarium",
  description: "Understand what a court notice or legal summons means and what deadlines you need to know, explained simply.",
  alternates: { canonical: "/court-notice-explained" },
};

export default function Page() {
  return (
    <SEOLanding
      eyebrow="Court Document Explainer"
      title="Understand what your court notice means"
      subtitle="Court notices and legal summons use formal language that can be confusing and stressful to read. Klarium explains what it means and what deadlines matter."
      icon={FileText}
      problem="People receiving court notices are often unsure what's actually required of them and by when, causing unnecessary panic or missed deadlines."
      solutionPoints={[
        "Paste your notice for a clear, calm explanation",
        "Understand exactly what action is required and by when",
        "See what the document is actually asking of you",
        "Get the explanation in your own language"
      ]}
      faqs={[
        { q: "Should I still get a lawyer?", a: "Yes — Klarium helps you understand the document, but court matters should always involve a qualified lawyer." },
        { q: "Is this urgent information private?", a: "Yes, processed in real time and never stored." }
      ]}
      ctaLabel="Explain My Document"
      ctaHref="/#upload"
    />
  );
}
