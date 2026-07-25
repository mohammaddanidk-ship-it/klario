import type { Metadata } from "next";
import { ShieldCheck } from "lucide-react";
import { SEOLanding } from "@/components/seo/landing-template";

export const metadata: Metadata = {
  title: "Phishing Email Detector — Free AI Fraud Check | Klario",
  description: "Paste any suspicious email and get an instant AI analysis of whether it's phishing or legitimate. Free, private, and precise.",
  alternates: { canonical: "/phishing-email-detector" },
};

export default function Page() {
  return (
    <SEOLanding
      eyebrow="Phishing Email Detector"
      title="Is this email a scam? Find out instantly."
      subtitle="Phishing emails are designed to look real — impersonating your bank, a delivery company, or a government agency. Klario Shield analyses any email and tells you clearly if it's fraudulent."
      icon={ShieldCheck}
      problem="Scam emails cost people billions every year. Fraudsters use urgency, fake logos, and convincing language to trick even careful people into clicking dangerous links or sharing personal information."
      solutionPoints={[
        "Paste the email text or upload a screenshot for instant analysis",
        "Get a clear verdict — scam or legitimate — with a confidence score",
        "See exactly which red flags were identified in the message",
        "Get specific next steps for what to do if it's a scam",
      ]}
      faqs={[
        { q: "How accurate is Klario Shield?", a: "Klario Shield checks for well-documented phishing patterns including suspicious links, urgency tactics, and impersonation techniques. For anything involving your bank details, always verify directly with the organisation as well." },
        { q: "Do I need to create an account?", a: "No. Klario Shield is free to use with no account or sign-up required." },
        { q: "What should I do if Klario identifies a scam?", a: "Do not click any links, do not reply, and do not share personal information. Contact the organisation directly using a number from their official website." },
      ]}
      ctaLabel="Check This Email"
      ctaHref="/#scam-detector"
    />
  );
}
