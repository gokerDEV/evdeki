import { TagsPage } from "@/components/pages/tags";
import { defaultLocale } from "@/lib/config/site.resolver";

export default function Page() {
  return <TagsPage locale={defaultLocale} />;
}
