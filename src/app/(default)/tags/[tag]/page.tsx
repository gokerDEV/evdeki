import { TagPage } from "@/components/pages/tag";
import { defaultLocale } from "@/lib/config/site.resolver";

export const revalidate = 3600;

export default async function Page({
  params,
}: {
  params: Promise<{ tag: string }>;
}) {
  const { tag } = await params;
  return <TagPage locale={defaultLocale} tag={tag} />;
}
