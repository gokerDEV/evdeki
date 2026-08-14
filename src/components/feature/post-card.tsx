import Image from "next/image";
import Link from "next/link";
import type { SubstackPost } from "@/app/actions";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { localizedPath } from "@/lib/config/site.paths";
import type { Locale } from "@/lib/config/site.types";

export default function PostCard({
  item,
  locale,
  dict,
}: {
  item: SubstackPost;
  locale: Locale;
  dict: Record<string, string>;
}) {
  return (
    <Link
      href={localizedPath(locale, `/posts/${item.slug}`)}
      className="block h-full group"
    >
      <div className="border rounded-lg shadow-sm bg-background overflow-hidden h-full flex flex-col group-hover:border-primary/50 transition-colors">
        {item.cover_image ? (
          <div className="relative w-full h-48 bg-muted border-b">
            <Image
              src={item.cover_image}
              alt={item.title || "News image"}
              fill
              className="object-cover"
            />
          </div>
        ) : (
          <div className="w-full h-48 bg-muted flex items-center justify-center border-b">
            <span className="text-muted-foreground">{dict.noImage}</span>
          </div>
        )}
        <CardHeader className="p-4 pb-2">
          <div className="flex justify-between items-start mb-2 gap-2">
            <div className="text-xs text-muted-foreground whitespace-nowrap mt-1">
              {item.post_date
                ? new Date(item.post_date).toLocaleDateString(locale, {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })
                : ""}
            </div>
            {item.postTags && item.postTags.length > 0 && (
              <div className="flex flex-wrap gap-1 justify-end">
                {item.postTags.map((tag) => (
                  <span
                    key={tag.slug}
                    className="inline-flex items-center rounded-full bg-secondary px-2 py-0.5 text-xs font-medium text-secondary-foreground"
                  >
                    #{tag.name}
                  </span>
                ))}
              </div>
            )}
          </div>
          <CardTitle className="text-lg leading-tight line-clamp-2 group-hover:text-primary transition-colors">
            {item.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-0 flex-1 flex flex-col">
          <p className="text-sm text-muted-foreground line-clamp-3 mb-4 flex-1">
            {item.subtitle || item.description}
          </p>
        </CardContent>
      </div>
    </Link>
  );
}
