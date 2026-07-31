import { defineRouting } from "next-intl/routing";

export const locales = ["en", "ru", "ua"] as const;

// (typeof arr)[number] - transforms array to union!
// example: (typeof locales)[1] - 'ru'
export type Locale = (typeof locales)[number]; // type Locale = 'en' | 'ru' | 'ua'

export const languageNames: Record<Locale, string> = {
   en: "English",
   ru: "Русский",
   ua: "Українська",
};

export const routing = defineRouting({
   locales,
   defaultLocale: "en",
   localePrefix: "as-needed",
   localeDetection: true,
});
