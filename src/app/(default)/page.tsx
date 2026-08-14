import { HomePage } from "@/components/pages/home";
import { defaultLocale } from "@/lib/config/site.resolver";

export default function Page() {
  return <HomePage locale={defaultLocale} />;
}
