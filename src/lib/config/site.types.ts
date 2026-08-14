export type Locale = "tr" | "en" | "de";

export interface LocaleMeta {
  enabled: boolean;
  label: string;
  htmlLang: string;
  intlLocale: string;
  openGraphLocale: string;
  direction: "ltr" | "rtl";
}

export interface Socials {
  twitter?: string;
  linkedin?: string;
  instagram?: string;
  github?: string;
  substack?: string;
}

export interface Contact {
  email?: string;
  phone?: string;
  address?: string;
  mapEmbedUrl?: string;
}

export interface SubstackSource {
  pages?: Record<string, string>;
  tags?: Record<string, string[]>; // Now tags maps a key to an array of slugs for that locale? Wait no.
}

export interface LocaleSourceConfig {
  substack?: SubstackSource;
}

export interface GlobalSubstackSource {
  pages?: Record<string, Record<string, string>>;
  tags?: Record<string, string[]>;
}

export interface GlobalSourcesConfig {
  substack?: GlobalSubstackSource;
}

export interface NavigationItem {
  label: string;
  href?: string;
}

export interface GlobalNavigation {
  header?: Array<Record<string, NavigationItem>>;
}

export interface GlobalSiteContent {
  siteName?: Record<string, string>;
  description?: Record<string, string>;
  navigation?: GlobalNavigation;
}

export interface SiteConfig {
  $schema?: string;
  schemaVersion: number;
  i18n: {
    defaultLocale: Locale;
    locales: Record<Locale, LocaleMeta>;
  };
  shared: {
    url: string;
    substack: string;
    socials?: Socials;
    contact?: Contact;
  };
  sources?: GlobalSourcesConfig;
  content: GlobalSiteContent;
}

export interface ResolvedNavigation {
  header?: Array<NavigationItem>;
}

export interface ResolvedSiteContent {
  siteName: string;
  description: string;
  navigation: ResolvedNavigation;
}

export interface ResolvedSiteConfig {
  locale: Locale;
  meta: LocaleMeta;
  url: string;
  substack: string;
  socials: Socials;
  contact: Contact;
  content: ResolvedSiteContent;
  source: LocaleSourceConfig;
}
