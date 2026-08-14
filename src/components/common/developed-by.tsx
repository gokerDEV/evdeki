import Link from "next/link";
import siteData from "@/data/site.json";
export default function DevelopedBy({
  dict,
}: {
  dict: Record<string, string>;
}) {
  return (
    <div className="flex items-center gap-3">
      <Link
        href={`https://uygulama.net/?ref=${encodeURIComponent(siteData.shared.url)}#templates`}
        className="shrink-0 transition-opacity hover:opacity-80"
      >
        {/* biome-ignore lint/performance/noImgElement: SVG optimization not needed */}
        <img src="/lama.svg" alt="uyguLama" className="h-10 w-auto" />
      </Link>
      <p className="text-sm text-muted-foreground text-left leading-tight">
        {dict.developedByPrefix && (
          <>
            {dict.developedByPrefix}
            <br className="hidden sm:block" />
          </>
        )}
        <Link
          href={`https://uygulama.net/?ref=${encodeURIComponent(siteData.shared.url)}#templates`}
          className="hover:text-primary transition-colors font-semibold"
        >
          {dict.developedByTemplate}
        </Link>
        {dict.developedBySuffix1 && ` ${dict.developedBySuffix1}`}
        {dict.developedBySuffix2 && (
          <>
            <br className="hidden sm:block" /> {dict.developedBySuffix2}
          </>
        )}
      </p>
    </div>
  );
}
