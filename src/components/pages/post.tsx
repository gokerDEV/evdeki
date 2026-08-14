import Link from "next/link";
import { notFound } from "next/navigation";
import SubstackContent from "@/components/common/substack-content";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Card, CardContent } from "@/components/ui/card";
import { getDictionary } from "@/i18n/get-dictionary";
import { localizedPath } from "@/lib/config/site.paths";
import type { Locale } from "@/lib/config/site.types";
import { substack } from "@/lib/substack";

async function getPost(slug: string) {
  return substack.getPost(slug);
}

export async function PostPage({
  locale,
  slug,
}: {
  locale: Locale;
  slug: string;
}) {
  const post = await getPost(slug);
  const dict = await getDictionary(locale);

  if (!post) {
    notFound();
  }

  // Locale fallback validation check will be added in Phase 5

  return (
    <div className="flex-1 max-w-7xl mx-auto w-full px-6 md:px-16 pt-32 pb-16">
      <Breadcrumb className="mb-8">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href={localizedPath(locale, "/")}>
              {dict.post.home}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          {post.postTags && post.postTags.length > 0 ? (
            <>
              <BreadcrumbItem>
                <BreadcrumbLink
                  href={localizedPath(locale, `/tags/${post.postTags[0].slug}`)}
                >
                  {post.postTags[0].name}
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
            </>
          ) : (
            <>
              <BreadcrumbItem>
                <BreadcrumbLink href={localizedPath(locale, "/posts")}>
                  {dict.post.news}
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
            </>
          )}
          <BreadcrumbItem>
            <BreadcrumbPage className="line-clamp-1">
              {post.title}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <Card className="border-muted/60 shadow-sm p-6 md:p-10">
        <CardContent className="">
          <div className="flex flex-col md:flex-row justify-between items-baseline gap-4  mb-6">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
              {post.title}
            </h1>
            <div className="flex justify-end items-center gap-4 text-sm text-muted-foreground">
              {post.post_date && (
                <time dateTime={post.post_date} className="whitespace-nowrap">
                  {new Date(post.post_date).toLocaleDateString(locale, {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </time>
              )}
              {post.wordcount > 0 && (
                <span className="flex items-center gap-1 whitespace-nowrap">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-4 h-4"
                    role="img"
                    aria-label="Read time"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                  {Math.ceil(post.wordcount / 200)} {dict.post.minRead}
                </span>
              )}
            </div>
          </div>
          {post.subtitle && (
            <h2 className="text-xl text-gray-500 mb-8">{post.subtitle}</h2>
          )}

          <SubstackContent html={post.body_html} />

          {post.postTags && post.postTags.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-2">
              {post.postTags.map((tag) => (
                <Link
                  key={tag.id}
                  href={localizedPath(locale, `/tags/${tag.slug}`)}
                  className="inline-flex items-center rounded-md bg-muted px-2.5 py-0.5 text-xs font-semibold text-muted-foreground transition-colors hover:bg-muted/80 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                >
                  #{tag.name}
                </Link>
              ))}
            </div>
          )}

          {post.canonical_url && (
            <div className="mt-12 flex justify-center border-t pt-8">
              <a
                href={post.canonical_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 items-center justify-center rounded-md bg-secondary px-8 text-sm font-medium text-secondary-foreground shadow-sm transition-colors hover:bg-secondary/80 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              >
                {dict.post.readOnSubstack}
              </a>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
