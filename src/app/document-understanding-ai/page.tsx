import type { Metadata } from "next";
import { BookOpen } from "lucide-react";
import { SEOLanding } from "@/components/seo/landing-template";

export const metadata: Metadata = {
  title: "Document Understanding AI — Explain Any Document | Klarium",
  description: "Free AI that explains any confusing document in plain language — contracts, reports, notices, and more. Private and instant.",
  alternates: { canonical: "/document-understanding-ai" },
};

export default function Page() {
  return (
    <SEOLanding
      eyebrow="Document Understanding AI"
      title="The AI that explains what your document actually means"
      subtitle="Most tools just summarize. Klarium goes further — explaining meaning, surfacing risks, and telling you what to do next, in plain language and your own language."
      icon={BookOpen}
      problem="Important documents — government notices, insurance policies, financial statements — are often written in ways that are technically accurate but practically confusing. People end up guessing at what matters."
      solutionPoints={[
        "Upload any document type — medical, legal, financial, or government",
        "Get a plain-language explanation, not just a shortened summary",
        "See risks and important details clearly flagged",
        "Understand your document in any of 16 supported languages",
      ]}
      faqs={[
        { q: "What types of documents does Klarium understand?", a: "Klarium handles medical reports, legal notices, contracts, bank letters, insurance policies, government notices, and more." },
        { q: "Is this different from a normal AI summarizer?", a: "Yes. A summary shortens text. Klarium explains meaning, flags risks, and tells you what actions to take next." },
        { q: "Do I need an account?", a: "No account is required. Klarium is free to use immediately." },
      ]}
      ctaLabel="Explain My Document"
    />
  );
}
