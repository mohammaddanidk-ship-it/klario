import type { Metadata } from "next";
import { FileText } from "lucide-react";
import { SEOLanding } from "@/components/seo/landing-template";

export const metadata: Metadata = {
  title: "Medical Bill Explained — Understand Every Charge | Klarium",
  description: "Free AI tool that explains confusing medical bills and insurance statements, charge by charge, in plain language.",
  alternates: { canonical: "/medical-bill-explained" },
};

export default function Page() {
  return (
    <SEOLanding
      eyebrow="Medical Bill Explainer"
      title="Understand every charge on your medical bill"
      subtitle="Medical bills are full of procedure codes and insurance jargon most patients can't decode. Klarium explains what you're actually being charged for."
      icon={FileText}
      problem="Medical billing errors are common, but patients often can't identify them because bills use procedure codes and insurance terminology they don't understand."
      solutionPoints={[
        "Paste your bill or statement for a plain-language breakdown",
        "Understand what each charge and code actually means",
        "Spot potential billing errors worth questioning",
        "Get the explanation in your own language"
      ]}
      faqs={[
        { q: "Can Klarium dispute a bill for me?", a: "No, Klarium explains the bill's content — disputes should go through your insurer or the billing department directly." },
        { q: "Is my medical bill kept private?", a: "Yes, processed in real time and never stored." }
      ]}
      ctaLabel="Explain My Document"
      ctaHref="/#upload"
    />
  );
}
