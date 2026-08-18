"use client";

import { usePathname, useRouter } from "next/navigation";
import siteData from "@/data/site.json";
import { localizedPath } from "@/lib/config/site.paths";
import { getSupportedLocales } from "@/lib/config/site.resolver";
import type { Locale } from "@/lib/config/site.types";
import { cn } from "@/lib/utils";

interface LanguageSwitcherProps {
  locale: Locale;
  onLanguageChange?: () => void;
  className?: string;
  isMobile?: boolean;
  dict?: Record<string, string>;
}

export default function LanguageSwitcher({
  locale,
  onLanguageChange,
  className,
  isMobile = false,
  dict,
}: LanguageSwitcherProps) {
  const router = useRouter();
  const pathname = usePathname();
  const allLocales = getSupportedLocales();

  // Filter only enabled locales
  const enabledLocales = allLocales.filter(
    (loc) =>
      (
        siteData as unknown as {
          i18n: { locales: Record<string, { enabled?: boolean }> };
        }
      ).i18n.locales[loc]?.enabled !== false,
  );

  if (enabledLocales.length <= 1) {
    return null;
  }

  const handleLanguageChange = (newLocale: string) => {
    if (newLocale === locale) return;

    let basePath = pathname;
    if (pathname.startsWith(`/${locale}/`)) {
      basePath = pathname.substring(locale.length + 1);
    } else if (pathname === `/${locale}`) {
      basePath = "/";
    }

    const newPath = localizedPath(newLocale as Locale, basePath);
    router.push(newPath);
    if (onLanguageChange) {
      onLanguageChange();
    }
  };

  if (isMobile) {
    return (
      <div
        className={cn(
          "py-2 border-b border-muted/50 last:border-0 flex items-center justify-between",
          className,
        )}
      >
        <span className="text-base font-medium text-foreground/80">
          {dict?.changeLanguage || "Language"}
        </span>
        <div className="flex items-center gap-1 bg-muted/50 rounded-full p-1 border border-muted-foreground/20">
          {enabledLocales.map((loc) => (
            <button
              key={loc}
              onClick={() => handleLanguageChange(loc)}
              type="button"
              className={cn(
                "px-3 py-1.5 text-xs font-semibold rounded-full transition-all uppercase",
                locale === loc
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {loc}
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex items-center gap-1 bg-muted/30 rounded-full p-1 border border-muted-foreground/20 backdrop-blur-sm",
        className,
      )}
    >
      {enabledLocales.map((loc) => (
        <button
          key={loc}
          onClick={() => handleLanguageChange(loc)}
          type="button"
          className={cn(
            "px-3 py-1.5 text-xs font-semibold rounded-full transition-all uppercase",
            locale === loc
              ? "bg-background text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          {loc}
        </button>
      ))}
    </div>
  );
}
