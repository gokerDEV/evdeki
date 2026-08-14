import "server-only";
import type { Locale } from "@/lib/config/site.types";

const dictionaries = {
  tr: () => import("./dictionaries/tr.json").then((module) => module.default),
  en: () => import("./dictionaries/en.json").then((module) => module.default),
  de: () => import("./dictionaries/de.json").then((module) => module.default),
};

export const getDictionary = async (locale: Locale) => {
  return dictionaries[locale]?.() ?? dictionaries.tr();
};

// Type helper for the dictionary shape based on default locale
export type Dictionary = Awaited<ReturnType<typeof dictionaries.tr>>;
