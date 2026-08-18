import type { Locale } from "@/lib/config/site.types";
import { MdxContent } from "./mdx-content";

interface MdxSectionProps {
  id: string;
  filename: string;
  locale: Locale;
  className?: string;
  imagePosition?: "left" | "right";
}

export default function MdxSection({
  id,
  filename,
  locale,
  className = "",
  imagePosition,
}: MdxSectionProps) {
  // Resolve localized filename (e.g. "about" -> "about-tr.mdx")
  const localizedFilename = `${filename}-${locale}.mdx`;

  return (
    <section id={id} className={`mx-auto px-4 py-16 md:py-24 ${className}`}>
      <MdxContent filename={localizedFilename} imagePosition={imagePosition} />
    </section>
  );
}
