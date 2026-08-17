import { Locale } from "next-intl";

export const TMDB_LANGUAGES: Record<Locale, string> = {
   en: "en-US",
   ru: "ru-RU",
   uk: "uk-UA",
};

export const TMDB_LOCALE = (locale: Locale) =>
   locale === "uk" ? "uk-UA" : locale === "ru" ? "ru-RU" : "en-US";
