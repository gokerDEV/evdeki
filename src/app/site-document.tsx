import { Gochi_Hand } from "next/font/google";
import "./styles/globals.css";
import Footer from "@/components/common/footer";
import Header from "@/components/common/header";
import { getDictionary } from "@/i18n/get-dictionary";
import { getLocaleMeta } from "@/lib/config/site.resolver";
import type { Locale } from "@/lib/config/site.types";
import { cn } from "@/lib/utils";

const figtree = Gochi_Hand({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: "400",
});

const gochiHand = Gochi_Hand({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: "400",
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
        figtree.variable,
        gochiHand.variable,
        "font-sans",
      )}
    >
      <body className="min-h-full flex flex-col bg-zinc-50">
        <div className="relative min-h-screen text-foreground">
          <div className="pointer-events-none fixed inset-0 z-0">
            <div className="mx-auto h-full max-w-7xl border-x border-border/60" />
          </div>

          <div className="relative z-10 flex flex-col min-h-screen">
            <div className="fixed top-14 left-0 w-full h-[1px] bg-border/60 z-40 shadow" />
            <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-7xl h-14 z-30 pointer-events-none backdrop-blur-md" />
            <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-7xl border-l border-r h-14 z-30 pointer-events-none bg-gradient-to-b from-background/90 to-transparent" />

            <Header locale={locale} dict={dict.nav} />
            <main className="grow w-full mt-13">{children}</main>
            <Footer locale={locale} />
          </div>
        </div>
      </body>
    </html>
  );
}
