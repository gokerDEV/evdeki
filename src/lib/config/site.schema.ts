import { z } from "zod";

const localeMetaSchema = z.object({
  enabled: z.boolean(),
  label: z.string(),
  htmlLang: z.string(),
  intlLocale: z.string(),
  openGraphLocale: z.string(),
  direction: z.enum(["ltr", "rtl"]),
});

const socialsSchema = z.object({
  twitter: z.string().optional(),
  linkedin: z.string().optional(),
  instagram: z.string().optional(),
  github: z.string().optional(),
  substack: z.string().optional(),
});

const contactSchema = z.object({
  email: z.string().optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
  mapEmbedUrl: z.string().optional(),
});

const substackSourceSchema = z.object({
  pages: z.record(z.string(), z.record(z.string(), z.string())).optional(),
  tags: z.record(z.string(), z.array(z.string())).optional(),
});

const sourcesSchema = z.object({
  substack: substackSourceSchema.optional(),
});

const navigationItemSchema = z.object({
  label: z.string(),
  href: z.string().optional(),
});

const siteContentSchema = z.object({
  siteName: z.record(z.string(), z.string()).optional(),
  description: z.record(z.string(), z.string()).optional(),
  navigation: z
    .object({
      header: z.array(z.record(z.string(), navigationItemSchema)).optional(),
    })
    .optional(),
});

export const siteConfigSchema = z.object({
  $schema: z.string().optional(),
  schemaVersion: z.literal(2),
  i18n: z.object({
    defaultLocale: z.enum(["tr", "en", "de"]),
    locales: z.record(localeMetaSchema),
  }),
  shared: z.object({
    url: z.string(),
    substack: z.string(),
    socials: socialsSchema.optional(),
    contact: contactSchema.optional(),
  }),
  sources: sourcesSchema.optional(),
  content: siteContentSchema,
});
