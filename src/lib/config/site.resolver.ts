import rawSiteData from "@/data/site.json";
import { siteConfigSchema } from "./site.schema";
import type {
  Locale,
  LocaleMeta,
  LocaleSourceConfig,
  ResolvedSiteConfig,
  ResolvedSiteContent,
  SiteConfig,
} from "./site.types";

// Parse and validate at runtime (or let it fail early in build)
const parsedConfig = siteConfigSchema.safeParse(rawSiteData);

if (!parsedConfig.success) {
  console.error("Invalid site.json structure:", parsedConfig.error);
  // Optional: throw new Error("Invalid site.json");
}

const siteConfig = rawSiteData as SiteConfig;
export const defaultLocale = siteConfig.i18n.defaultLocale;

export function getSupportedLocales(): Locale[] {
  return Object.keys(siteConfig.i18n.locales) as Locale[];
}

export function isLocale(value: string): value is Locale {
  return getSupportedLocales().includes(value as Locale);
}

export function requireLocale(value: string): Locale {
  if (isLocale(value)) return value as Locale;
  return defaultLocale;
}

export function requireSecondaryLocale(value: string): Locale {
  const loc = requireLocale(value);
  if (loc === defaultLocale) {
    throw new Error(`Expected secondary locale, got default: ${value}`);
  }
  return loc;
}

export function getSecondaryLocales(): Locale[] {
  return getSupportedLocales().filter((l) => l !== defaultLocale);
}

export function getLocaleMeta(locale: Locale): LocaleMeta {
  return siteConfig.i18n.locales[locale];
}

export function getLocaleSource(locale: Locale): LocaleSourceConfig {
  const globalSources = siteConfig.sources?.substack || {};

  const pages: Record<string, string> = {};
  if (globalSources.pages) {
    for (const [pageKey, translations] of Object.entries(globalSources.pages)) {
      if (translations[locale]) {
        pages[pageKey] = translations[locale];
      }
    }
  }

  // The new tags structure maps locale to an array of slugs
  const tags: Record<string, string[]> = {};
  if (globalSources.tags?.[locale]) {
    // We can just pass the array for this locale. We will map it to a dummy key like 'all' if needed, or just return the tags object.
    tags[locale] = globalSources.tags[locale];
  }

  return {
    substack: {
      pages: Object.keys(pages).length > 0 ? pages : undefined,
      tags: Object.keys(tags).length > 0 ? tags : undefined,
    },
  };
}

export function getResolvedSiteContent(locale: Locale): ResolvedSiteContent {
  const content = siteConfig.content;

  const resolveString = (obj?: Record<string, string>) => {
    if (!obj) return "";
    return obj[locale] || obj[defaultLocale] || "";
  };

  const header = (content.navigation?.header || []).map((item) => {
    return item[locale] || item[defaultLocale] || { label: "" };
  });

  return {
    siteName: resolveString(content.siteName),
    description: resolveString(content.description),
    navigation: {
      header,
    },
  };
}

export function getResolvedSiteConfig(locale: Locale): ResolvedSiteConfig {
  const content = getResolvedSiteContent(locale);
  const meta = getLocaleMeta(locale);
  const source = getLocaleSource(locale);

  return {
    locale,
    meta,
    url: siteConfig.shared.url,
    substack: siteConfig.shared.substack,
    socials: siteConfig.shared.socials || {},
    contact: siteConfig.shared.contact || {},
    content,
    source,
  };
}
