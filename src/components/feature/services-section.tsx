import {
  Cloud,
  Code,
  Search,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Workflow,
} from "lucide-react";
import type * as React from "react";
import { HeadingAnimation } from "@/components/common/heading-animation";
import services from "@/content/services.json";
import { getDictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/lib/config/site.types";

// Map string icon names from JSON to Lucide components
const IconMap: Record<string, React.ElementType> = {
  Code,
  Workflow,
  Cloud,
  Smartphone,
  Search,
  ShieldCheck,
};

export default async function ServicesSection({ locale }: { locale: Locale }) {
  const dict = await getDictionary(locale);

  return (
    <section id="services" className="container mx-auto px-4 py-20 md:py-32">
      <div className="flex flex-col items-center text-center mb-16">
        <div className="inline-flex items-center rounded-full border px-4 py-1.5 text-sm font-medium mb-6">
          <Sparkles className="mr-2 h-4 w-4 text-primary" />
          {dict.services.badge}
        </div>
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight max-w-2xl">
          <HeadingAnimation>{dict.services.title}</HeadingAnimation>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto px-6">
        {services.map((service) => {
          const Icon = IconMap[service.icon] || Code;

          return (
            <div
              key={service.id}
              className="flex flex-col p-6 rounded-2xl border bg-card text-card-foreground hover:border-primary/50 transition-colors shadow-sm"
            >
              <div className="mb-6">
                <Icon className="h-8 w-8 text-foreground" strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-semibold mb-3 tracking-tight">
                {service.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-8 flex-1">
                {service.description}
              </p>

              <div className="flex flex-wrap gap-2 mt-auto">
                {service.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium bg-muted/30 text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
