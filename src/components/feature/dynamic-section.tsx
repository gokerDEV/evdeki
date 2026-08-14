import Image from "next/image";
import SubstackContent from "@/components/common/substack-content";
import { getResolvedSiteConfig } from "@/lib/config/site.resolver";
import type { Locale } from "@/lib/config/site.types";
import { substack } from "@/lib/substack";

interface DynamicSectionProps {
  id: string;
  className?: string;
  imagePosition?: "left" | "right" | "top";
  locale?: Locale;
}

export default async function DynamicSection({
  id,
  className = "",
  imagePosition = "top",
  locale,
}: DynamicSectionProps) {
  if (!locale) return null;
  const config = getResolvedSiteConfig(locale);
  const slug = config.source.substack?.pages?.[id];

  if (!slug) {
    return null;
  }

  const post = await substack.getPost(slug);

  if (!post) {
    return null;
  }

  const coverImage = post.cover_image;
  const hasImage = !!coverImage;
  const isSideBySide =
    hasImage && (imagePosition === "left" || imagePosition === "right");

  // Remove the cover image from the body_html if it exists to avoid duplication
  let cleanedHtml = post.body_html;
  if (coverImage) {
    let filename = "";
    try {
      filename = decodeURIComponent(coverImage).split("/").pop() || "";
    } catch {
      filename = coverImage.split("/").pop() || "";
    }
    const uuidMatch = filename.match(
      /[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}/i,
    );
    const identifier = uuidMatch ? uuidMatch[0] : filename;

    if (identifier) {
      const imageIndex = cleanedHtml.indexOf(identifier);
      if (imageIndex !== -1) {
        const containerStartStr = '<div class="captioned-image-container';
        let startIndex = cleanedHtml.lastIndexOf(containerStartStr, imageIndex);

        if (startIndex === -1) {
          startIndex = cleanedHtml.lastIndexOf("<figure", imageIndex);
        }

        if (startIndex !== -1) {
          const figureEndStr = "</figure></div>";
          let endIndex = cleanedHtml.indexOf(figureEndStr, imageIndex);
          if (endIndex !== -1) {
            endIndex += figureEndStr.length;
            cleanedHtml =
              cleanedHtml.substring(0, startIndex) +
              cleanedHtml.substring(endIndex);
          } else {
            endIndex = cleanedHtml.indexOf("</figure>", imageIndex);
            if (endIndex !== -1) {
              endIndex += "</figure>".length;
              cleanedHtml =
                cleanedHtml.substring(0, startIndex) +
                cleanedHtml.substring(endIndex);
            }
          }
        }
      }
    }
  }

  return (
    <section
      id={id}
      className={`container mx-auto px-4 py-16 md:py-24 ${className}`}
    >
      {!isSideBySide ? (
        <div className="max-w-3xl mx-auto">
          {hasImage && imagePosition === "top" && (
            <div className="relative w-full h-[300px] md:h-[400px] mb-8 rounded-xl overflow-hidden shadow-sm">
              <Image
                src={coverImage}
                alt={post.title}
                fill
                className="object-contain"
              />
            </div>
          )}
          <h2 className="text-3xl font-bold tracking-tight mb-6">
            {post.title}
          </h2>
          <SubstackContent html={cleanedHtml} />
        </div>
      ) : (
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {imagePosition === "left" && (
            <div className="relative  h-full">
              <Image
                src={coverImage}
                alt={post.title}
                fill
                className="object-contain"
              />
            </div>
          )}

          <div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
              {post.title}
            </h2>
            <SubstackContent html={cleanedHtml} />
          </div>

          {imagePosition === "right" && (
            <div className="relative h-full">
              <Image
                src={coverImage}
                alt={post.title}
                fill
                className="object-contain"
              />
            </div>
          )}
        </div>
      )}
    </section>
  );
}
