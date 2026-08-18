import { getDictionary } from "@/i18n/get-dictionary";
import { getResolvedSiteConfig } from "@/lib/config/site.resolver";
import type { Locale } from "@/lib/config/site.types";
import Web3FormsContact from "../common/web3forms-contact";
import LocationMapWrapper from "./location-map-wrapper";

export default async function ContactSection({ locale }: { locale: Locale }) {
  const config = getResolvedSiteConfig(locale);
  const dict = await getDictionary(locale);

  return (
    <section id="contact" className="mx-auto px-4 py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold tracking-tight mb-8 text-center">
          {dict.contact.title}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <div className="flex flex-col gap-8 bg-muted/50 p-8 rounded-2xl border">
            <div>
              <h3 className="text-xl font-semibold mb-6">
                {dict.contact.subtitle}
              </h3>
              <p className="text-muted-foreground mb-8">
                {dict.contact.description}
              </p>
            </div>

            {/* Contact Form */}
            <Web3FormsContact dict={dict.contactForm} />
          </div>

          {config.contact?.mapEmbedUrl && (
            <div className="h-[400px] md:h-full min-h-[400px] w-full rounded-2xl overflow-hidden shadow-sm border bg-muted relative">
              <LocationMapWrapper
                lat={41.68}
                lng={26.55}
                radius={2200}
                color="olive"
                zoom={13}
                opacity={0.3}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
