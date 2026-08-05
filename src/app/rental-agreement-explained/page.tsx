import type { Metadata } from "next";
import { FileText } from "lucide-react";
import { SEOLanding } from "@/components/seo/landing-template";

export const metadata: Metadata = {
  title: "Rental Agreement Explained in Plain English | Klarium",
  description: "Free AI tool that explains any rental or tenancy agreement clause by clause in simple language. Know your rights before you sign.",
  alternates: { canonical: "/rental-agreement-explained" },
};

export default function Page() {
  return (
    <SEOLanding
      eyebrow="Rental Agreement Explainer"
      title="Understand your rental agreement before you sign"
      subtitle="Tenancy contracts are full of clauses about subletting, deposits, and liability that most tenants never fully read. Klarium explains exactly what you're agreeing to."
      icon={FileText}
      problem="Tenants routinely sign rental agreements without understanding key clauses — deposit conditions, subletting rules, or early termination penalties — leading to disputes later."
      solutionPoints={[
        "Paste any clause or the full agreement for a plain-language breakdown",
        "Understand what you can and cannot do without landlord permission",
        "See what could put your deposit at risk",
        "Get the explanation in your own language"
      ]}
      faqs={[
        { q: "What if my landlord and I disagree on a clause?", a: "Klarium explains what the document says, but disputes should be resolved with a lawyer or local tenant rights organisation if serious." },
        { q: "Does this work for commercial leases too?", a: "Klarium can explain most contract language, though very complex commercial leases may benefit from a lawyer's review as well." }
      ]}
      ctaLabel="Explain My Document"
      ctaHref="/#upload"
    />
  );
}
