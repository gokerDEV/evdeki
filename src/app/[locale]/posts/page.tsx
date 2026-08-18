import { PostsPage } from "@/components/pages/posts";
import { requireSecondaryLocale } from "@/lib/config/site.resolver";

export const dynamic = "force-dynamic";

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = requireSecondaryLocale(rawLocale);

  return <PostsPage locale={locale} />;
}
