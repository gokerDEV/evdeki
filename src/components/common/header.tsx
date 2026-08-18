"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import * as React from "react";
import { Button } from "@/components/ui/button";

import { localizedPath } from "@/lib/config/site.paths";
import {
  getResolvedSiteConfig,
  getSupportedLocales,
} from "@/lib/config/site.resolver";
import type { Locale } from "@/lib/config/site.types";
import { cn } from "@/lib/utils";
import LanguageSwitcher from "./language-switcher";

export default function Header({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Record<string, string>;
}) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [activeSection, setActiveSection] = React.useState("");
  const config = getResolvedSiteConfig(locale);
  const router = useRouter();
  const pathname = usePathname();
  const _locales = getSupportedLocales();

  const _handleLanguageChange = (newLocale: string) => {
    if (newLocale === locale) return;

    let basePath = pathname;
    if (pathname.startsWith(`/${locale}/`)) {
      basePath = pathname.substring(locale.length + 1);
    } else if (pathname === `/${locale}`) {
      basePath = "/";
    }

    const newPath = localizedPath(newLocale as Locale, basePath);
    router.push(newPath);
  };

  const navigationItems = config.content.navigation?.header || [];

  const getHref = (href: string | undefined) => {
    if (!href) return localizedPath(locale, "/");
    if (href.startsWith("tag:")) {
      return localizedPath(locale, `/tags/${href.replace("tag:", "")}`);
    }
    if (href.startsWith("#")) {
      return localizedPath(locale, `/${href}`);
    }
    return localizedPath(locale, href);
  };

  React.useEffect(() => {
    const handleScroll = () => {
      const sectionIds = navigationItems
        .filter((item) => item.href?.startsWith("#"))
        .map((item) => item.href?.replace("#", "") || "");
      let current = "";

      for (const id of sectionIds) {
        if (!id) continue;
        const element = document.getElementById(id);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 3) {
            current = `#${id}`;
          }
        }
      }

      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    const timeout = setTimeout(handleScroll, 100);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timeout);
    };
  }, [navigationItems]);

  return (
    <>
      <header className="fixed top-6 left-1/2 z-50 w-[calc(100%-2rem)] max-w-6xl -translate-x-1/2 rounded-xl border bg-background/80 backdrop-blur-md px-4 py-3 shadow-sm transition-all">
        <div className="flex items-center justify-between">
          <Link
            href={localizedPath(locale, "/")}
            className="flex items-center space-x-2"
          >
            {/* biome-ignore lint/performance/noImgElement: SVG optimization not needed */}
            <img
              src="/logotype.svg"
              alt={config.content.siteName}
              className="h-8 w-auto"
            />
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {navigationItems.map((item) => {
              const href = getHref(item.href);
              return (
                <Link
                  key={item.label}
                  href={href}
                  className={cn(
                    "text-lg font-medium transition-colors hover:text-foreground relative",
                    activeSection === item.href
                      ? "text-foreground font-semibold"
                      : "text-foreground/60",
                  )}
                >
                  {item.label}
                  {activeSection === item.href && (
                    <span className="absolute -bottom-[22px] left-0 w-full h-[2px] bg-primary rounded-t-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <LanguageSwitcher locale={locale} />
            <Button asChild className="rounded-full px-6 text-base">
              <Link href={getHref("#contact")}>{dict.contactUs}</Link>
            </Button>
          </div>

          <div className="flex items-center md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="h-8 w-8 rounded-md"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">{dict.openMenu}</span>
            </Button>
          </div>
        </div>
      </header>

      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm md:hidden">
          <div className="fixed left-4 right-4 top-4 rounded-2xl border bg-background p-4 shadow-lg">
            <div className="mb-6 flex items-center justify-between">
              <Link
                href={localizedPath(locale, "/")}
                className="flex items-center"
                onClick={() => setIsOpen(false)}
              >
                {/* biome-ignore lint/performance/noImgElement: SVG optimization not needed */}
                <img
                  src="/logo.svg"
                  alt={config.content.siteName}
                  className="h-8 w-auto"
                />
              </Link>
              <div className="flex items-center gap-2">
                <Button asChild className="rounded-full px-5 h-10">
                  <Link
                    href={getHref("#contact")}
                    onClick={() => setIsOpen(false)}
                  >
                    {dict.contactUs}
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                  className="h-10 w-10 rounded-md border-muted-foreground/20"
                >
                  <X className="h-5 w-5" />
                  <span className="sr-only">{dict.closeMenu}</span>
                </Button>
              </div>
            </div>

            <nav className="flex flex-col gap-4">
              {navigationItems.map((item) => (
                <Link
                  key={item.label}
                  href={getHref(item.href)}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "text-base font-medium py-2 border-b border-muted/50 last:border-0 transition-colors flex items-center justify-between",
                    activeSection === item.href
                      ? "text-primary font-bold"
                      : "text-foreground/80 hover:text-foreground",
                  )}
                >
                  {item.label}
                  {activeSection === item.href && (
                    <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                  )}
                </Link>
              ))}

              <LanguageSwitcher
                locale={locale}
                isMobile={true}
                dict={dict}
                onLanguageChange={() => setIsOpen(false)}
              />
            </nav>

            <div className="mt-6">
              <Button
                variant="secondary"
                asChild
                className="w-full h-12 rounded-xl text-base bg-muted/50 hover:bg-muted"
              >
                <Link
                  href={getHref("#contact")}
                  onClick={() => setIsOpen(false)}
                >
                  {dict.contactUs}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
