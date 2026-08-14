import Link from "next/link";
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

export async function TagsPage({ locale }: { locale: Locale }) {
  const dict = await getDictionary(locale);
  const config = getResolvedSiteConfig(locale);
  // Get all tag slugs from substack
  const allTags = substack.getTags();
  let tagSlugs = allTags.map((t) => t.slug);

  // Filter tags if the locale explicitly defines which tags belong to it
  const localeTags = config.source.substack?.tags?.[locale];
  if (localeTags && Array.isArray(localeTags)) {
    tagSlugs = tagSlugs.filter((slug) => localeTags.includes(slug));
  }

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
            <BreadcrumbPage>{dict.post.tags}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="mb-12 text-center md:text-left px-4">
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">
          {dict.post.tags}
        </h1>
        <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mt-4 leading-relaxed">
          {dict.posts?.description || "Browse news by category."}
        </p>
      </div>

      <div className="px-4">
        <div className="flex flex-wrap gap-4">
          {tagSlugs.length > 0 ? (
            tagSlugs.map((slug) => {
              const tagData = substack.getTagBySlug(slug);
              const displayName = tagData ? tagData.name : slug;
              return (
                <Link
                  key={slug}
                  href={localizedPath(locale, `/tags/${slug}`)}
                  className="inline-flex items-center rounded-full border px-4 py-2 text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 hover:bg-secondary"
                >
                  #{displayName}
                </Link>
              );
            })
          ) : (
            <p className="text-muted-foreground">{dict.post.noTags}</p>
          )}
        </div>
      </div>
    </div>
  );
}
