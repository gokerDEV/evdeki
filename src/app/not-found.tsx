import Link from "next/link";
import { getDictionary } from "@/i18n/get-dictionary";
import { defaultLocale } from "@/lib/config/site.resolver";
import { SiteDocument } from "./site-document";

export default async function NotFound() {
  const dict = await getDictionary(defaultLocale);
  return (
    <SiteDocument locale={defaultLocale}>
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-24 text-center">
        <h1 className="text-6xl md:text-8xl font-black text-zinc-200 mt-12 mb-6 tracking-tighter">
          404
        </h1>
        <h2 className="text-3xl font-bold tracking-tight mb-4 text-foreground">
          {dict.notFound.title}
        </h2>
        <p className="text-muted-foreground mb-10 max-w-md">
          {dict.notFound.description}
        </p>

        <Link
          href="/"
          className="inline-flex h-11 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
        >
          {dict.notFound.returnHome}
        </Link>
      </div>
    </SiteDocument>
  );
}
