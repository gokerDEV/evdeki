import { Mail, MapPin, Phone } from "lucide-react";
import { getDictionary } from "@/i18n/get-dictionary";
import { getResolvedSiteConfig } from "@/lib/config/site.resolver";
import type { Locale } from "@/lib/config/site.types";

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

            <div className="flex flex-col gap-6">
              {config.contact?.address && (
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-full mr-4 text-primary shrink-0">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">
                      {dict.contact.address}
                    </h4>
                    <p className="text-muted-foreground whitespace-pre-line text-sm mt-1">
                      {config.contact.address}
                    </p>
                  </div>
                </div>
              )}

              {config.contact?.email && (
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-full mr-4 text-primary shrink-0">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">
                      {dict.contact.email}
                    </h4>
                    <a
                      href={`mailto:${config.contact.email}`}
                      className="text-muted-foreground hover:text-primary transition-colors text-sm mt-1 block"
                    >
                      {config.contact.email}
                    </a>
                  </div>
                </div>
              )}

              {config.contact?.phone && (
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-full mr-4 text-primary shrink-0">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">
                      {dict.contact.phone}
                    </h4>
                    <a
                      href={`tel:${config.contact.phone.replace(/\s+/g, "")}`}
                      className="text-muted-foreground hover:text-primary transition-colors text-sm mt-1 block"
                    >
                      {config.contact.phone}
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>

          {config.contact?.mapEmbedUrl && (
            <div className="h-[400px] md:h-full min-h-[400px] w-full rounded-2xl overflow-hidden shadow-sm border bg-muted relative">
              <iframe
                title="Location Map"
                src={config.contact.mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
