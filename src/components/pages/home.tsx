import ContactSection from "@/components/feature/contact-section";
import DynamicSection from "@/components/feature/dynamic-section";
import Hero from "@/components/feature/hero";
import NewsCarousel from "@/components/feature/news-carousel";
import ServicesSection from "@/components/feature/services-section";
import TemplatesSection from "@/components/feature/templates-section";
import type { Locale } from "@/lib/config/site.types";
// import MdxSection from "@/components/common/mdx-section";

export function HomePage({ locale }: { locale: Locale }) {
  return (
    <main className="flex-1">
      <Hero locale={locale} />
      <NewsCarousel locale={locale} />
      <DynamicSection
        id="about"
        className="bg-muted/10"
        imagePosition="left"
        locale={locale}
      />
      {/* 
      <MdxSection
        className="bg-muted/10"
        id="about"
        filename="about"
        locale={locale}
        imagePosition="left"
      />
      */}
      <TemplatesSection locale={locale} />
      <ServicesSection locale={locale} />
      <ContactSection locale={locale} />
    </main>
  );
}
