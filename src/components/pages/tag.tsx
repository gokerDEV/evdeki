import { redirect } from "next/navigation";
import { getArchivePosts } from "@/app/actions";
import PostList from "@/components/feature/post-list";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { getDictionary } from "@/i18n/get-dictionary";
import { localizedPath } from "@/lib/config/site.paths";
import { getResolvedSiteConfig } from "@/lib/config/site.resolver";
import type { Locale } from "@/lib/config/site.types";
import { substack } from "@/lib/substack";

export async function TagPage({
  locale,
  tag,
}: {
  locale: Locale;
  tag: string;
}) {
  const tagData = substack.getTagBySlug(tag);
  const config = getResolvedSiteConfig(locale);

  const localeTags = config.source.substack?.tags?.[locale];
  // If the locale explicitly lists valid tags, and this tag isn't in it, redirect
  if (localeTags && Array.isArray(localeTags) && !localeTags.includes(tag)) {
    redirect(localizedPath(locale, "/tags"));
  }

  // If it is valid for this locale, but Substack has no posts for it, tagData will be null.
  // We create a fallback object so we can render the empty state.
  const resolvedTagData = tagData || { id: "", name: tag, slug: tag };

  const initialPosts = resolvedTagData.id
    ? await getArchivePosts(0, 20, resolvedTagData.id)
    : [];
  const dict = await getDictionary(locale);

  return (
    <div className="flex-1 max-w-7xl mx-auto w-full px-6 md:px-16 pt-16 pb-16">
      <Breadcrumb className="mb-8">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href={localizedPath(locale, "/")}>
              {dict.post.home}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href={localizedPath(locale, "/tags")}>
              {dict.post.tags}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>#{tagData?.name || tag}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="mb-12 text-center md:text-left">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
          #{resolvedTagData.name}
        </h1>
        <p className="text-muted-foreground mt-2 max-w-2xl text-lg md:text-xl">
          {dict.tags.latestUpdates.replace("{tag}", resolvedTagData.name)}
        </p>
      </div>

      <PostList
        initialPosts={initialPosts}
        postTagId={resolvedTagData.id}
        locale={locale}
        dict={{ ...dict.common, noPosts: dict.post.noPosts }}
      />
    </div>
  );
}
