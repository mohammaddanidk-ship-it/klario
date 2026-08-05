import type { Metadata } from "next";
import { FileText } from "lucide-react";
import { SEOLanding } from "@/components/seo/landing-template";

export const metadata: Metadata = {
  title: "Employment Contract Explainer — Understand Your Offer | Klarium",
  description: "Free AI tool that explains employment contracts, offer letters, and job terms in plain language before you sign.",
  alternates: { canonical: "/employment-contract-explainer" },
};

export default function Page() {
  return (
    <SEOLanding
      eyebrow="Employment Contract Explainer"
      title="Understand your job offer before you accept"
      subtitle="Non-compete clauses, probation terms, and notice periods are often buried in dense legal language. Klarium tells you clearly what you're agreeing to."
      icon={FileText}
      problem="Job seekers often accept offers without fully understanding restrictive clauses like non-competes, unpaid notice periods, or vague termination terms."
      solutionPoints={[
        "Paste your offer letter or contract for a clear breakdown",
        "Understand notice periods, non-competes, and probation terms",
        "See what obligations continue after you leave the job",
        "Get answers in your own language"
      ]}
      faqs={[
        { q: "Can Klarium tell me if a clause is legal in my country?", a: "Klarium explains what the clause says, but employment law varies by location — consult a local employment lawyer for anything you're unsure is enforceable." },
        { q: "Is my contract kept private?", a: "Yes, processed in real time and never stored on our servers." }
      ]}
      ctaLabel="Explain My Document"
      ctaHref="/#upload"
    />
  );
}
