import { TagsPage } from "@/components/pages/tags";
import { defaultLocale } from "@/lib/config/site.resolver";

export const dynamic = "force-dynamic";

export default function Page() {
  return <TagsPage locale={defaultLocale} />;
}
