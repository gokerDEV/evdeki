import ContactSection from "@/components/feature/contact-section";
import NewsCarousel from "@/components/feature/news-carousel";
import type { Locale } from "@/lib/config/site.types";
import MdxSection from "../common/mdx-section";
// import MdxSection from "@/components/common/mdx-section";

export function HomePage({ locale }: { locale: Locale }) {
  return (
    <>
      {/* <Hero locale={locale} /> */}
      <NewsCarousel locale={locale} />
      {/* <DynamicSection
        id="about"
        className="bg-muted/10"
        imagePosition="left"
        locale={locale}
      /> */}
      <MdxSection
        className="bg-muted/10"
        id="about"
        filename="about"
        locale={locale}
        imagePosition="left"
      />
      <ContactSection locale={locale} />
    </>
  );
}
