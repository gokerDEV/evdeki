import type { MetadataRoute } from "next";
import {
  defaultLocale,
  getResolvedSiteConfig,
  getSecondaryLocales,
} from "@/lib/config/site.resolver";
import { substack } from "@/lib/substack";

export const revalidate = 86400; // Cache for 24 hours

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const config = getResolvedSiteConfig(defaultLocale);
  const baseUrl = config.url;
  const secondaryLocales = getSecondaryLocales();
  const allLocales = [defaultLocale, ...secondaryLocales];

  const createAlternates = (path: string) => {
    const languages: Record<string, string> = {};
    for (const loc of allLocales) {
      languages[loc] =
        loc === defaultLocale
          ? `${baseUrl}${path}`
          : `${baseUrl}/${loc}${path}`;
    }
    return languages;
  };

  const staticRoutes = ["", "/posts"].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: route === "" ? 1 : 0.8,
    alternates: {
      languages: createAlternates(route),
    },
  }));

  const secondaryStaticRoutes = secondaryLocales.flatMap((loc) =>
    ["", "/posts"].map((route) => ({
      url: `${baseUrl}/${loc}${route}`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: route === "" ? 1 : 0.8,
    })),
  );

  // Fetch posts from substack
  const posts = await substack.getPosts(0, 100);
  const postRoutes = posts.map((post) => ({
    url: `${baseUrl}/posts/${post.slug}`,
    lastModified: new Date(post.post_date),
    changeFrequency: "weekly" as const,
    priority: 0.6,
    alternates: {
      languages: createAlternates(`/posts/${post.slug}`),
    },
  }));

  const secondaryPostRoutes = secondaryLocales.flatMap((loc) =>
    posts.map((post) => ({
      url: `${baseUrl}/${loc}/posts/${post.slug}`,
      lastModified: new Date(post.post_date),
      changeFrequency: "weekly" as const,
      priority: 0.6,
    })),
  );

  return [
    ...staticRoutes,
    ...secondaryStaticRoutes,
    ...postRoutes,
    ...secondaryPostRoutes,
  ];
}
