import type { Metadata } from "next";
import {
  defaultLocale,
  getResolvedSiteConfig,
  getSecondaryLocales,
  requireSecondaryLocale,
} from "@/lib/config/site.resolver";
import { SiteDocument } from "../site-document";

export const dynamicParams = false;

export function generateStaticParams() {
  return getSecondaryLocales().map((locale) => ({
    locale,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = requireSecondaryLocale(rawLocale);
  const config = getResolvedSiteConfig(locale);

  return {
    title: {
      default: config.content.siteName,
      template: `%s | ${config.content.siteName}`,
    },
    description: config.content.description,
    metadataBase: new URL(config.url),
    openGraph: {
      title: config.content.siteName,
      description: config.content.description,
      url: `${config.url}/${locale}`,
      siteName: config.content.siteName,
      images: [
        {
          url: "/opengraph-image.png",
          width: 1200,
          height: 630,
          alt: config.content.siteName,
        },
      ],
      locale: config.meta.openGraphLocale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: config.content.siteName,
      description: config.content.description,
      creator: config.socials.twitter
        ? `@${config.socials.twitter.split("/").pop()}`
        : undefined,
      site: config.socials.twitter
        ? `@${config.socials.twitter.split("/").pop()}`
        : undefined,
    },
    icons: {
      icon: [{ url: "/favicon.ico" }, { url: "/icon.png", type: "image/png" }],
      apple: [{ url: "/apple-icon.png", type: "image/png" }],
    },
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: `${config.url}/${locale}`,
      languages: Object.fromEntries(
        [defaultLocale, ...getSecondaryLocales()].map((loc) => [
          loc,
          loc === defaultLocale ? config.url : `${config.url}/${loc}`,
        ]),
      ),
    },
  };
}

export default async function LocaleRootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = requireSecondaryLocale(rawLocale);

  return <SiteDocument locale={locale}>{children}</SiteDocument>;
}
