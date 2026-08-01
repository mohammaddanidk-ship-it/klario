import type { Metadata } from "next";
import { Scale } from "lucide-react";
import { SEOLanding } from "@/components/seo/landing-template";

export const metadata: Metadata = {
  title: "Legal Document Explainer AI — Free & Instant | Klarium",
  description: "Free AI tool that explains contracts, legal notices, and agreements in plain language. Understand your rights and risks before you sign.",
  alternates: { canonical: "/legal-document-explainer" },
};

export default function Page() {
  return (
    <SEOLanding
      eyebrow="Legal Document Explainer"
      title="Understand any legal document before you sign"
      subtitle="Contracts, tenancy agreements, and legal notices are written in dense legal language designed for lawyers, not everyday people. Klarium translates the legal jargon into plain language you can actually use."
      icon={Scale}
      problem="Most people sign contracts and agreements without fully understanding what they're agreeing to, because legal language is deliberately dense and technical. This leads to unpleasant surprises down the line."
      solutionPoints={[
        "Paste any clause or upload the full document for a clear explanation",
        "Understand what obligations and risks the document creates for you",
        "See what deadlines or actions are required, clearly flagged",
        "Get the explanation in your own language, not just English legal jargon",
      ]}
      faqs={[
        { q: "Is Klarium a substitute for a lawyer?", a: "No. Klarium helps you understand the basics of a document so you know what questions to ask a qualified lawyer for anything important or high-stakes." },
        { q: "What kinds of legal documents can I upload?", a: "Rental agreements, employment contracts, terms of service, legal notices, court documents, and more." },
        { q: "Is my document kept private?", a: "Yes. Documents are processed in real-time and never stored on our servers." },
      ]}
      ctaLabel="Explain My Document"
    />
  );
}
