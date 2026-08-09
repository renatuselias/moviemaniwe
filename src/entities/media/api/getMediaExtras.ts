"use server";

import { tmdbFetch } from "@/shared/api/tmdb/tmdb-api";
import { getLocale } from "next-intl/server";
import { CacheConfig } from "@/shared/config/cache";

export async function getMediaExtras(
   mediaId: number,
   mediaType: "movie" | "tv" = "movie",
) {
   const locale = await getLocale();

   const tmdbLocale = locale === "ua" ? "uk" : locale;

   const details = await tmdbFetch(
      `/${mediaType}/${mediaId}`,
      {
         language: tmdbLocale,
         append_to_response: "images",
         include_image_language: `${tmdbLocale},null`,
      },
      CacheConfig.LISTS,
   );

   const runtime =
      mediaType === "movie"
         ? details?.runtime || null
         : details?.episode_run_time?.[0] || null;

   const originCountry =
      details?.origin_country?.[0] ||
      details?.production_countries?.[0]?.iso_3166_1 ||
      "";

   return {
      tagline: details?.tagline || "",

      release_date: details?.release_date || details?.first_air_date || null,

      runtime,

      numberOfSeasons:
         mediaType === "tv" ? details?.number_of_seasons || null : null,

      origin_country: originCountry,

      logo_path: details?.images?.logos?.[0]?.file_path
         ? details.images.logos[0].file_path
         : null,

      genres: details?.genres || [],
   };
}
