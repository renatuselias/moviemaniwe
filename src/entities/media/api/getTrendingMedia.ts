import { tmdbFetch } from "@/shared/api/tmdb/tmdb-api";
import { TMDB_LANGUAGES } from "@/shared/config/tmdb-languages";
import { CacheConfig } from "@/shared/config/cache";
import { getLocale } from "next-intl/server";

import { MediaItem, NormalizedMedia } from "../model/types";
import { normalizeMedia } from "../model/normalize-media";

export async function getTrendingMedia(timeWindow: "day" | "week" = "day") {
   const locale = await getLocale();
   const lang = TMDB_LANGUAGES[locale] ?? locale;

   const data = await tmdbFetch(
      `/trending/all/${timeWindow}`,
      { language: lang },
      CacheConfig.LISTS,
   );

   if (!data?.results || data.results.length === 0) {
      return { results: [] };
   }

   // exclude persons (actor, directors, writers..)
   const results: NormalizedMedia[] = data.results
      .filter((item: unknown): item is MediaItem => {
         if (typeof item !== "object" || item === null) return false;

         const mediaType = (item as Record<string, unknown>).media_type;
         return mediaType === "movie" || mediaType === "tv";
      })
      .map(normalizeMedia);

   return { results };
}
