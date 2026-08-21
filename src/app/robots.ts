import { MetadataRoute } from "next";

// Keep robots.txt on the canonical production domain. This prevents a stale
// deployment environment variable from advertising a Vercel preview sitemap.
const SITE = "https://klarium.co";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/api/"],
      },
    ],
    sitemap: `${SITE}/sitemap.xml`,
    host: SITE,
  };
}
