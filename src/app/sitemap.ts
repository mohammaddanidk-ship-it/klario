import { MetadataRoute } from "next";
import { db } from "@/lib/db";

const BASE = "https://klarium.co";

/**
 * Only URLs that are intentionally indexable should enter this sitemap.
 * Google treats sitemaps as canonical URL hints, so we keep this list clean
 * instead of submitting every database record. See Google Search Central's
 * sitemap guidance.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let dynamic: MetadataRoute.Sitemap = [];

  try {
    const records = await db.explanation.findMany({
      select: {
        slug: true,
        snippets: true,
        createdAt: true,
        updatedAt: true,
      },
      where: {
        snippets: "[]",
      },
      orderBy: { updatedAt: "desc" },
      take: 50000,
    });

    const seen = new Set<string>();

    dynamic = records
      .filter((record) => {
        const slug = record.slug?.trim();
        if (!slug || slug === "document" || seen.has(slug)) return false;
        seen.add(slug);
        return true;
      })
      .map((record) => ({
        url: `${BASE}/explain/${record.slug}`,
        // lastModified should reflect a real content/schema/link update, not
        // an artificial "freshness" date.
        lastModified: record.updatedAt ?? record.createdAt,
        changeFrequency: "monthly" as const,
        priority: 0.7,
      }));
  } catch {
    // Keep the curated sitemap available when the database is unavailable.
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

  // Avoid duplicate URLs if a curated landing page is also represented by a
  // database explanation record.
  const curatedUrls = new Set(curated.map((item) => item.url));
  return [...curated, ...dynamic.filter((item) => !curatedUrls.has(item.url))];
}
