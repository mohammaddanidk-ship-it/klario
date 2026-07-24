import { MetadataRoute } from "next";
import { db } from "@/lib/db";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_BASE_URL ?? "https://klario.tools";

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
    ...dynamic,
  ];
}
