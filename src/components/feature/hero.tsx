import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { HeadingAnimation } from "@/components/common/heading-animation";
import { Button } from "@/components/ui/button";
import { getDictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/lib/config/site.types";

export default async function Hero({ locale }: { locale: Locale }) {
  const dict = await getDictionary(locale);

  return (
    <section className="container mx-auto px-4 pt-20 pb-16 md:pt-32 md:pb-24 flex flex-col items-center text-center">
      <div className="inline-flex items-center rounded-full border px-4 py-1.5 text-sm font-medium mb-8 transition-colors hover:bg-muted/50">
        <span className="flex h-2 w-2 rounded-full bg-primary mr-2"></span>
        {dict.hero.badge}
        <ArrowRight className="ml-2 h-4 w-4 text-muted-foreground" />
      </div>

      <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight max-w-3xl mb-6">
        <HeadingAnimation>{dict.hero.title}</HeadingAnimation>
      </h1>

      <p className="text-xl text-muted-foreground max-w-2xl mb-10">
        {dict.hero.description}
      </p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button size="lg" asChild className="rounded-full px-8 text-base">
          <Link href="#contact">{dict.hero.getDirections}</Link>
        </Button>
        <Button
          size="lg"
          variant="outline"
          asChild
          className="rounded-full px-8 text-base bg-background/50 backdrop-blur-sm"
        >
          <Link href="#about">{dict.hero.aboutUs}</Link>
        </Button>
      </div>
    </section>
  );
}
