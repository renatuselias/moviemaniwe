import { tmdbFetch } from "@/shared/api/tmdb/tmdb-api";
import { TMDB_LANGUAGES } from "@/shared/config/tmdb-languages";
import { CacheConfig } from "@/shared/config/cache";
import { getLocale } from "next-intl/server";
import { TMDBMedia } from "@/shared/types";

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
   const results = (data.results as TMDBMedia[])
      .filter(
         (item): item is TMDBMedia =>
            item?.media_type === "movie" || item?.media_type === "tv",
      )
      .map((media) => {
         const isMovie = media.media_type === "movie";
         return {
            id: media.id,
            mediaType: media.media_type,
            title: (isMovie ? media.title : media.name) ?? "No name",
            backdropPath: media.backdrop_path,
            posterPath: media.poster_path,
         };
      });

   return { results };
}
