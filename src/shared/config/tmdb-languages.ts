import { Locale } from "next-intl";

export const TMDB_LANGUAGES: Record<Locale, string> = {
   en: "en-US",
   ru: "ru-RU",
   ua: "uk-UA",
};

export const TMDB_LOCALE = (locale: Locale) =>
   locale === "ua" ? "uk-UA" : locale === "ru" ? "ru-RU" : "en-US";
