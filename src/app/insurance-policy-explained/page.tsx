import type { Metadata } from "next";
import { FileText } from "lucide-react";
import { SEOLanding } from "@/components/seo/landing-template";

export const metadata: Metadata = {
  title: "Insurance Policy Explained Simply | Klarium",
  description: "Free AI tool that explains what your insurance policy actually covers, in plain language. Know what's excluded before you need to claim.",
  alternates: { canonical: "/insurance-policy-explained" },
};

export default function Page() {
  return (
    <SEOLanding
      eyebrow="Insurance Policy Explainer"
      title="Understand what your insurance actually covers"
      subtitle="Insurance policies are written to be technically precise, not easy to read. Klarium explains what's covered, what's excluded, and what could deny your claim."
      icon={FileText}
      problem="Policyholders often discover exclusions and limitations only when filing a claim — after it's too late to have chosen differently."
      solutionPoints={[
        "Paste your policy document for a plain-language summary",
        "See clearly what is and isn't covered",
        "Understand conditions that could void your coverage",
        "Get the explanation in your own language"
      ]}
      faqs={[
        { q: "Can Klarium file a claim for me?", a: "No, Klarium only explains your policy document — claims must be filed directly with your insurer." },
        { q: "What types of insurance does this work for?", a: "Health, auto, home, travel, and life insurance policies all work." }
      ]}
      ctaLabel="Explain My Document"
      ctaHref="/#upload"
    />
  );
}
