import { TagPage } from "@/components/pages/tag";
import { defaultLocale } from "@/lib/config/site.resolver";

export const dynamic = "force-dynamic";

export default async function Page({
  params,
}: {
  params: Promise<{ tag: string }>;
}) {
  const { tag } = await params;
  return <TagPage locale={defaultLocale} tag={tag} />;
}
