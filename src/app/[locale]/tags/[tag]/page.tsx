import { TagPage } from "@/components/pages/tag";
import { requireSecondaryLocale } from "@/lib/config/site.resolver";

export const dynamic = "force-dynamic";

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string; tag: string }>;
}) {
  const { locale: rawLocale, tag } = await params;
  const locale = requireSecondaryLocale(rawLocale);

  return <TagPage locale={locale} tag={tag} />;
}
