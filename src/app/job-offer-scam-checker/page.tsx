import type { Metadata } from "next";
import { ShieldCheck } from "lucide-react";
import { SEOLanding } from "@/components/seo/landing-template";

export const metadata: Metadata = {
  title: "Job Offer Scam Checker — Verify Before You Apply | Klarium",
  description: "Check if a job offer or recruiter message is a scam. Free AI analysis of common job fraud patterns.",
  alternates: { canonical: "/job-offer-scam-checker" },
};

export default function Page() {
  return (
    <SEOLanding
      eyebrow="Job Scam Checker"
      title="Is this job offer real or a scam?"
      subtitle="Fake job offers asking for upfront fees or personal banking details are a growing scam category. Klarium checks the message for known fraud patterns."
      icon={ShieldCheck}
      problem="Job seekers, especially those urgently looking for work, are frequent targets of fake recruiter messages asking for money or sensitive information upfront."
      solutionPoints={[
        "Paste the job offer or recruiter message for analysis",
        "Get a clear verdict on whether it shows fraud patterns",
        "Understand exactly what made it suspicious",
        "Get guidance on safe next steps"
      ]}
      faqs={[
        { q: "What are common signs of a fake job offer?", a: "Requests for upfront payment, vague job descriptions, and pressure to act immediately are common red flags Klarium checks for." },
        { q: "Is this free to use?", a: "Yes, completely free." }
      ]}
      ctaLabel="Check This Message"
      ctaHref="/#scam-detector"
    />
  );
}
