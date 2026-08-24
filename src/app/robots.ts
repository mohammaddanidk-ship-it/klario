import { MetadataRoute } from "next";

// Keep robots.txt on the final live canonical host so Google discovers the
// same host that is listed in the sitemap and page metadata.
const SITE = "https://www.klarium.co";

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
