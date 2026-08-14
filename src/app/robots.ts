import type { MetadataRoute } from "next";
import { getResolvedSiteConfig } from "@/lib/config/site.resolver";

export default function robots(): MetadataRoute.Robots {
  // Use default config to get base url
  // "tr" is default but config.url is the same
  const config = getResolvedSiteConfig("tr");

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${config.url}/sitemap.xml`,
  };
}
