import { Figtree, Geist, Geist_Mono, Outfit } from "next/font/google";
import "./styles/globals.css";
import Footer from "@/components/common/footer";
import Header from "@/components/common/header";
import { getDictionary } from "@/i18n/get-dictionary";
import { getLocaleMeta } from "@/lib/config/site.resolver";
import type { Locale } from "@/lib/config/site.types";
import { cn } from "@/lib/utils";

const figtreeHeading = Figtree({
  subsets: ["latin"],
  variable: "--font-heading",
});

const outfit = Outfit({ subsets: ["latin"], variable: "--font-sans" });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function SiteDocument({
  locale,
  children,
}: {
  locale: Locale;
  children: React.ReactNode;
}) {
  const meta = getLocaleMeta(locale);
  const dict = await getDictionary(locale);

  return (
    <html
      lang={meta.htmlLang}
      dir={meta.direction}
      className={cn(
        "h-full",
        "antialiased",
        "scroll-smooth",
        geistSans.variable,
        geistMono.variable,
        "font-sans",
        outfit.variable,
        figtreeHeading.variable,
      )}
    >
      <body className="min-h-full flex flex-col bg-zinc-50">
        <div className="relative min-h-screen text-foreground">
          <div className="pointer-events-none fixed inset-0 z-0">
            <div className="mx-auto h-full max-w-7xl border-x border-border/60" />
          </div>

          <div className="relative z-10 flex flex-col min-h-screen">
            <Header locale={locale} dict={dict.nav} />
            <main className="flex-1 w-full">{children}</main>
            <Footer locale={locale} />
          </div>
        </div>
      </body>
    </html>
  );
}
