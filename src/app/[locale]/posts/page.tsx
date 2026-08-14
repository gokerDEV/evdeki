import { PostsPage } from "@/components/pages/posts";
import { requireSecondaryLocale } from "@/lib/config/site.resolver";

export const revalidate = 3600;

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = requireSecondaryLocale(rawLocale);

  return <PostsPage locale={locale} />;
}
