"use server";

import { tmdbFetch } from "@/shared/api/tmdb/tmdb-api";
import { TMDB_LANGUAGES } from "@/shared/config/tmdb-languages";
import { CacheConfig } from "@/shared/config/cache";
import { getLocale } from "next-intl/server";
import { TMDBVideo } from "@/shared/types";

function findTrailerKey(
   videos: TMDBVideo[],
   targetLang: string,
): string | null {
   if (!videos.length) return null;

   const trailer =
      videos.find(
         (v) =>
            v.site === "YouTube" &&
            v.type === "Trailer" &&
            v.official &&
            v.iso_639_1 === targetLang,
      ) ||
      videos.find(
         (v) => v.site === "YouTube" && v.type === "Trailer" && v.official,
      ) ||
      videos.find((v) => v.site === "YouTube" && v.type === "Trailer") ||
      videos.find((v) => v.site === "YouTube" && v.type === "Teaser");

   return trailer?.key ?? null;
}

export async function getCinemaMovies() {
   try {
      const locale = await getLocale();
      const lang = TMDB_LANGUAGES[locale] ?? locale;

      const data = await tmdbFetch(
         `/movie/now_playing`,
         { language: lang, page: "1" },
         CacheConfig.LISTS,
      );

      if (!data?.results || data.results.length === 0) {
         return [];
      }

      const topMovies = data.results.slice(0, 10);
      const targetLang = lang.split("-")[0];

      const settledResults = await Promise.allSettled(
         topMovies.map(async (movie: { id: number }) => {
            try {
               const details = await tmdbFetch(
                  `/movie/${movie.id}`,
                  {
                     language: lang,
                     append_to_response: "credits,videos,images",
                     include_video_language: `${lang},en,null`,
                     include_image_language: `${lang},en,null`,
                  },
                  CacheConfig.DETAILS,
               );

               const videos: TMDBVideo[] = details?.videos?.results ?? [];

               return {
                  ...movie,
                  videos,
                  backdropPath: details?.backdrop_path,
                  releaseDate: details?.release_date,
                  genres: details?.genres,
                  runtime: details?.runtime ?? 0,
                  cast: details?.credits?.cast?.slice(0, 8) ?? [],
                  backdrops: details?.images?.backdrops?.slice(0, 5) ?? [],
                  trailerKey: findTrailerKey(videos, targetLang),
               };
            } catch (err) {
               console.error(
                  `Failed to fetch details for movie ${movie.id}:`,
                  err,
               );
               return null;
            }
         }),
      );

      return settledResults
         .filter(
            (
               result,
            ): result is PromiseFulfilledResult<
               NonNullable<Awaited<ReturnType<typeof topMovies.map>>[number]>
            > => result.status === "fulfilled" && result.value !== null,
         )
         .map((result) => result.value);
   } catch (error) {
      console.error("Failed to fetch cinema movies:", error);
      return [];
   }
}
