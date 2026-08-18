import { PostsPage } from "@/components/pages/posts";
import { defaultLocale } from "@/lib/config/site.resolver";

export const dynamic = "force-dynamic";

export default function Page() {
  return <PostsPage locale={defaultLocale} />;
}
