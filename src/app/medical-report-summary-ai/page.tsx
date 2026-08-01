import type { Metadata } from "next";
import { HeartPulse } from "lucide-react";
import { SEOLanding } from "@/components/seo/landing-template";

export const metadata: Metadata = {
  title: "Medical Report Summary AI — Understand Your Results | Klarium",
  description: "Free AI tool that explains medical reports, lab results, and diagnoses in plain language. Private, instant, no account required.",
  alternates: { canonical: "/medical-report-summary-ai" },
};

export default function Page() {
  return (
    <SEOLanding
      eyebrow="Medical Report Summary AI"
      title="Understand your medical report in plain language"
      subtitle="Lab results, diagnoses, and doctor's notes are full of medical terminology. Klarium explains what your report actually means, what to watch for, and what questions to ask your doctor."
      icon={HeartPulse}
      problem="Medical reports use clinical terms most patients don't understand — abbreviations, reference ranges, and diagnoses that sound frightening without context. This leaves people anxious or unsure what to do next."
      solutionPoints={[
        "Upload or paste your report and get a plain-language explanation in seconds",
        "See what each result means and whether it's a cause for concern",
        "Get a clear list of what to bring up with your doctor at your next visit",
        "Available in 16 languages, including RTL languages like Arabic and Urdu",
      ]}
      faqs={[
        { q: "Is Klarium a substitute for my doctor?", a: "No. Klarium helps you understand your report so you can have a more informed conversation with your doctor. It is not medical advice and should never replace professional consultation." },
        { q: "Is my medical report stored anywhere?", a: "No. Klarium processes your document in real-time and never stores it on our servers." },
        { q: "What file types can I upload?", a: "You can paste text directly, or upload a photo, scan, or PDF of your report." },
      ]}
      ctaLabel="Explain My Medical Report"
    />
  );
}
