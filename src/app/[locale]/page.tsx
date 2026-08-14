import { HomePage } from "@/components/pages/home";
import { requireSecondaryLocale } from "@/lib/config/site.resolver";

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = requireSecondaryLocale(rawLocale);

  return <HomePage locale={locale} />;
}
