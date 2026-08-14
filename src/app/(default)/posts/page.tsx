import { PostsPage } from "@/components/pages/posts";
import { defaultLocale } from "@/lib/config/site.resolver";

export const revalidate = 3600;

export default function Page() {
  return <PostsPage locale={defaultLocale} />;
}
