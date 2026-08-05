import { MetadataRoute } from "next";
import { db } from "@/lib/db";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_BASE_URL ?? "https://klarium.co";

  let dynamic: MetadataRoute.Sitemap = [];
  try {
    const records = await db.explanation.findMany({
      select: { slug: true, updatedAt: true, docType: true },
      orderBy: { createdAt: "desc" },
      take: 50000,
    });
    dynamic = records.map(r => ({
      url:             `${base}/explain/${r.slug}`,
      lastModified:    r.updatedAt,
      changeFrequency: "monthly" as const,
      priority:        0.7,
    }));
  } catch { /* DB not ready yet */ }

  return [
    { url: base,            lastModified: new Date(), changeFrequency: "daily",  priority: 1.0 },
    { url: `${base}/#upload`,        lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/#scam-detector`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/trust-center`,   lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/medical-report-summary-ai`,  lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/legal-document-explainer`,   lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/phishing-email-detector`,    lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/scam-message-checker`,       lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/document-understanding-ai`,  lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/rental-agreement-explained`,      lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/employment-contract-explainer`,   lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/insurance-policy-explained`,      lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/bank-rejection-letter-explained`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/visa-rejection-letter-explained`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/medical-bill-explained`,          lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/court-notice-explained`,          lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/whatsapp-scam-checker`,           lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/job-offer-scam-checker`,          lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/crypto-investment-scam-checker`,  lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/example-library`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    { url: `${base}/example-library/cbc-blood-test-explained`,    lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/example-library/mri-report-explained`,        lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/example-library/ct-scan-explained`,           lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/example-library/government-letter-explained`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/example-library/insurance-claim-explained`,   lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/example-library/fake-bank-email-example`,     lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/example-library/fake-delivery-scam-example`,  lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    ...dynamic,
  ];
}
