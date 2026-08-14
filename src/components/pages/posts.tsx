import { getArchivePosts } from "@/app/actions";
import FilteredPostList from "@/components/feature/filtered-post-list";
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

export async function PostsPage({ locale }: { locale: Locale }) {
  const initialPosts = await getArchivePosts(0, 20);
  const dict = await getDictionary(locale);
  const config = getResolvedSiteConfig(locale);
  const validTagSlugs = config.source.substack?.tags?.[locale] || [];

  return (
    <div className="flex-1 max-w-7xl mx-auto w-full px-6 md:px-16 pt-32 pb-16">
      <Breadcrumb className="mb-8 px-4">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href={localizedPath(locale, "/")}>
              {dict.post.home}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{dict.post.news}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="mb-12 text-center md:text-left px-4">
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">
          {dict.posts.title}
        </h1>
        <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mt-4 leading-relaxed">
          {dict.posts.description}
        </p>
      </div>

      <FilteredPostList
        initialPosts={initialPosts}
        locale={locale}
        dict={{ ...dict.common, noPosts: dict.post.noPosts }}
        validTagSlugs={validTagSlugs}
      />
    </div>
  );
}
