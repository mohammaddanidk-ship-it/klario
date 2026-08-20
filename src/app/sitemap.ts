import { MetadataRoute } from "next";
import { db } from "@/lib/db";

const BASE = "https://klarium.co";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let dynamic: MetadataRoute.Sitemap = [];

  try {
    const records = await db.explanation.findMany({
      select: { slug: true, snippets: true },
      orderBy: { createdAt: "desc" },
      take: 50000,
    });

    dynamic = records
      .filter((r) => r.slug && r.slug !== "document" && r.snippets === "[]")
      .map((r) => ({
        url: `${BASE}/explain/${r.slug}`,
        changeFrequency: "monthly" as const,
        priority: 0.7,
      }));
  } catch {
    // Keep the curated sitemap available even when the database is unavailable.
  }

  const curated: MetadataRoute.Sitemap = [
    { url: BASE, changeFrequency: "daily", priority: 1.0 },
    { url: `${BASE}/trust-center`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/medical-report-summary-ai`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/doctor-prescription-explained`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/legal-document-explainer`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/phishing-email-detector`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/scam-message-checker`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/document-understanding-ai`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/rental-agreement-explained`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/employment-contract-explainer`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/insurance-policy-explained`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/bank-rejection-letter-explained`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/visa-rejection-letter-explained`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/medical-bill-explained`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/court-notice-explained`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/whatsapp-scam-checker`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/job-offer-scam-checker`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/crypto-investment-scam-checker`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/example-library`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE}/example-library/cbc-blood-test-explained`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/example-library/mri-report-explained`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/example-library/ct-scan-explained`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/example-library/government-letter-explained`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/example-library/insurance-claim-explained`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/example-library/fake-bank-email-example`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/example-library/fake-delivery-scam-example`, changeFrequency: "monthly", priority: 0.7 },
  ];

  return [...curated, ...dynamic];
}
