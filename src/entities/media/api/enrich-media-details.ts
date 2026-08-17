"use server";

import { tmdbFetch } from "@/shared/api/tmdb/tmdb-api";
import { CacheConfig } from "@/shared/config/cache";
import { TMDBVideo } from "@/shared/types";
import { findTrailerKey } from "../lib/find-trailer-key";
import { MediaDetails } from "../model/types";

export async function enrichMediaDetails(
   item: { id: number },
   mediaType: "movie" | "tv",
   lang: string,
): Promise<MediaDetails | null> {
   try {
      const details = await tmdbFetch(
         `/${mediaType}/${item.id}`,
         {
            language: lang,
            append_to_response: "credits,videos,images",
            include_video_language: `${lang},en,null`,
            include_image_language: `${lang},en,null`,
         },
         CacheConfig.DETAILS,
      );

      if (
         !details?.backdrop_path ||
         !details?.vote_average ||
         details?.vote_average < 6
      ) {
         return null;
      }

      const videos: TMDBVideo[] = details?.videos?.results ?? [];
      const targetLang = lang.split("-")[0];

      return {
         ...details,
         id: details?.id,
         title: details?.title ?? details?.name ?? "No name",
         videos,
         mediaType,
         rating: details?.vote_average,
         backdropPath: details?.backdrop_path,
         posterPath: details?.poster_path,
         releaseDate: details?.release_date ?? details?.first_air_date,
         genres: details?.genres,
         runtime: details?.runtime ?? details?.episode_run_time?.[0] ?? 0,
         numberOfSeasons: details?.number_of_seasons ?? 0,
         cast: details?.credits?.cast?.slice(0, 8) ?? [],
         backdrops: details?.images?.backdrops?.slice(0, 5) ?? [],
         trailerKey: findTrailerKey(videos, targetLang) ?? null,
      };
   } catch (err) {
      console.error(
         `Failed to fetch details for ${mediaType} ${item.id}:`,
         err,
      );
      return null;
   }
}
