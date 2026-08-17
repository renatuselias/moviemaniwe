"use server";

import { tmdbFetch } from "@/shared/api/tmdb/tmdb-api";
import { TMDB_LANGUAGES } from "@/shared/config/tmdb-languages";
import { CacheConfig } from "@/shared/config/cache";
import { getLocale } from "next-intl/server";
import { TMDBMedia } from "@/shared/types";
import { BaseMedia, FetchMediaParams, MediaDetails } from "../model/types";
import { enrichMediaDetails } from "./enrich-media-details";
import { getCombinedMedia } from "./get-combined-media";

export async function getMedia(
   params: FetchMediaParams,
): Promise<BaseMedia[] | MediaDetails[]> {
   const {
      endpoint,
      mediaType = "movie",
      providerId,
      genreId,
      voteCountGte,
      withoutGenres,
      sortBy = "popularity.desc",
      region = "US",
      page = 1,
      withOriginalLanguage,
      withOriginCountry,
      limit,
      isCarousel = false,
      releaseDateGte,
      releaseDateLte,
   } = params;

   if (mediaType === "all") {
      return getCombinedMedia(params);
   }

   try {
      const locale = await getLocale();
      const lang = TMDB_LANGUAGES[locale] ?? locale;
      const targetEndpoint = endpoint ?? `/discover/${mediaType}`;

      const queryParams: Record<string, string | number | undefined> = {
         language: lang,
         page,
      };

      if (!endpoint) {
         queryParams.with_watch_providers = providerId;
         queryParams.watch_region = region;
         queryParams.with_genres = genreId;
         queryParams["vote_count.gte"] = voteCountGte;
         queryParams.sort_by = sortBy;

         if (withoutGenres) queryParams.without_genres = withoutGenres;
         if (withOriginCountry)
            queryParams.with_origin_country = withOriginCountry;
         if (withOriginalLanguage)
            queryParams.with_original_language = withOriginalLanguage;

         const releaseGteKey =
            mediaType === "tv"
               ? "first_air_date.gte"
               : "primary_release_date.gte";
         const releaseLteKey =
            mediaType === "tv"
               ? "first_air_date.lte"
               : "primary_release_date.lte";

         if (releaseDateGte) queryParams[releaseGteKey] = releaseDateGte;
         if (releaseDateLte) queryParams[releaseLteKey] = releaseDateLte;
      }

      const data = await tmdbFetch(
         targetEndpoint,
         queryParams,
         CacheConfig.LISTS,
      );

      if (!data?.results || data.results.length === 0) {
         return [];
      }

      let rawList: TMDBMedia[] = data.results;

      rawList = rawList.filter((item) => {
         const hasBackdrop = Boolean(item.backdrop_path);

         if (endpoint === "/tv/on_the_air") {
            return hasBackdrop && (item.vote_average ?? 0) >= 7.0;
         }
         return hasBackdrop;
      });

      if (limit) rawList = rawList.slice(0, limit);

      if (isCarousel) {
         const settledResults = await Promise.allSettled(
            rawList.map((item: { id: number }) =>
               enrichMediaDetails(item, mediaType, lang),
            ),
         );

         return settledResults
            .filter(
               (
                  res,
               ): res is PromiseFulfilledResult<
                  Awaited<ReturnType<typeof enrichMediaDetails>>
               > => res.status === "fulfilled" && res.value !== null,
            )
            .map((res) => res.value as MediaDetails);
      }

      return rawList.map(
         (media): BaseMedia => ({
            ...media,
            id: media.id,
            mediaType,
            title: ("title" in media ? media.title : media.name) ?? "No name",
            backdropPath: media.backdrop_path,
            posterPath: media.poster_path,
            rating: media.vote_average ?? 0,
            popularity: media.popularity ?? 0,
         }),
      );
   } catch (error) {
      console.error(`Failed to fetch ${mediaType}:`, error);
      return [];
   }
}
