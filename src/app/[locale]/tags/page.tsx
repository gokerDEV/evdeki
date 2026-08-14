import { TagsPage } from "@/components/pages/tags";
import type { Locale } from "@/lib/config/site.types";

export default async function Page({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  return <TagsPage locale={locale} />;
}
