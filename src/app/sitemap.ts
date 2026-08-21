import { MetadataRoute } from "next";
import { db } from "@/lib/db";

const BASE = "https://klarium.co";

// Regenerate periodically so new approved explanation pages become discoverable
// without querying the database on every sitemap request.
export const revalidate = 3600;

/**
 * Only URLs that are intentionally indexable should enter this sitemap.
 * Google treats sitemaps as canonical URL hints, so we keep this list clean
 * instead of submitting every database record.
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
        lastModified: record.updatedAt ?? record.createdAt,
      }));
  } catch {
    // Keep the curated sitemap available when the database is unavailable.
  }

  const curated: MetadataRoute.Sitemap = [
    { url: BASE },
    { url: `${BASE}/trust-center` },
    { url: `${BASE}/medical-report-summary-ai` },
    { url: `${BASE}/doctor-prescription-explained` },
    { url: `${BASE}/legal-document-explainer` },
    { url: `${BASE}/phishing-email-detector` },
    { url: `${BASE}/scam-message-checker` },
    { url: `${BASE}/document-understanding-ai` },
    { url: `${BASE}/rental-agreement-explained` },
    { url: `${BASE}/employment-contract-explainer` },
    { url: `${BASE}/insurance-policy-explained` },
    { url: `${BASE}/bank-rejection-letter-explained` },
    { url: `${BASE}/visa-rejection-letter-explained` },
    { url: `${BASE}/medical-bill-explained` },
    { url: `${BASE}/court-notice-explained` },
    { url: `${BASE}/whatsapp-scam-checker` },
    { url: `${BASE}/job-offer-scam-checker` },
    { url: `${BASE}/crypto-investment-scam-checker` },
    { url: `${BASE}/example-library` },
    { url: `${BASE}/example-library/cbc-blood-test-explained` },
    { url: `${BASE}/example-library/mri-report-explained` },
    { url: `${BASE}/example-library/ct-scan-explained` },
    { url: `${BASE}/example-library/government-letter-explained` },
    { url: `${BASE}/example-library/insurance-claim-explained` },
    { url: `${BASE}/example-library/fake-bank-email-example` },
    { url: `${BASE}/example-library/fake-delivery-scam-example` },
  ];

  const curatedUrls = new Set(curated.map((item) => item.url));
  return [...curated, ...dynamic.filter((item) => !curatedUrls.has(item.url))];
}
