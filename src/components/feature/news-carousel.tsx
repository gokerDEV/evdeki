import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { getDictionary } from "@/i18n/get-dictionary";
import { localizedPath } from "@/lib/config/site.paths";
import { getResolvedSiteConfig } from "@/lib/config/site.resolver";
import type { Locale } from "@/lib/config/site.types";
import { substack } from "@/lib/substack";
import PostCard from "./post-card";

export default async function NewsCarousel({ locale }: { locale: Locale }) {
  const dict = await getDictionary(locale);
  const config = getResolvedSiteConfig(locale);
  const validTagSlugs = config.source.substack?.tags?.[locale] || [];

  try {
    const fetchedPosts = await substack.getPosts(0, 20);
    const posts =
      validTagSlugs && validTagSlugs.length > 0
        ? fetchedPosts.filter((post) => {
            const hasTags = post.postTags && post.postTags.length > 0;
            if (!hasTags) {
              return validTagSlugs.includes("");
            }
            return post.postTags?.some((tag) => validTagSlugs.includes(tag.slug));
          })
        : fetchedPosts;

    if (posts.length === 0) {
      return null;
    }

    return (
      <section className="px-4 py-12 md:py-16 bg-zinc-50 shadow-inner border-y">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-end mb-8 px-4 md:px-12">
            <div>
              <h2 className="text-2xl font-bold tracking-tight mb-2">
                {dict.newsCarousel.title}
              </h2>
              <p className="text-muted-foreground">
                {dict.newsCarousel.description}
              </p>
            </div>
            <Link
              href={localizedPath(locale, "/posts")}
              className="hidden sm:inline-flex text-sm font-medium text-primary hover:underline"
            >
              {dict.common.viewAll} &rarr;
            </Link>
          </div>

          <div className="px-4 md:px-12">
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-4">
                {posts.map((item) => (
                  <CarouselItem
                    key={item.slug}
                    className="pl-4 md:basis-1/2 lg:basis-1/3"
                  >
                    <PostCard item={item} locale={locale} dict={dict.common} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden md:flex -left-12" />
              <CarouselNext className="hidden md:flex -right-12" />
            </Carousel>
          </div>
        </div>
      </section>
    );
  } catch (error) {
    console.error("Error fetching RSS feed:", error);
    return (
      <div className="p-8 text-center border rounded-lg bg-muted/30 max-w-3xl mx-auto my-12 text-muted-foreground">
        {dict.newsCarousel.error}
      </div>
    );
  }
}
