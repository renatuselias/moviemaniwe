"use server";

import { tmdbFetch } from "@/shared/api/tmdb/tmdb-api";
import { CacheConfig } from "@/shared/config/cache";
import { TMDB_LANGUAGES } from "@/shared/config/tmdb-languages";
import { getLocale } from "next-intl/server";

export type MediaType = "movie" | "tv";

export async function getMediaDetails(
   mediaId: string,
   mediaType: MediaType = "movie",
   isFoolInfo: boolean,
) {
   const locale = await getLocale();

   const language = TMDB_LANGUAGES[locale] ?? locale;
   const tmdbLocale = locale === "ua" ? "uk" : locale;

   const creditsEndpoint =
      mediaType === "movie" ? "credits" : "aggregate_credits";

   const [details, credits, recommendations] = await Promise.all([
      tmdbFetch(
         `/${mediaType}/${mediaId}`,
         {
            language,
            append_to_response: "videos,images",
            include_image_language: `${tmdbLocale}`,
         },
         CacheConfig.DETAILS,
      ),
      isFoolInfo
         ? tmdbFetch(
              `/${mediaType}/${mediaId}/${creditsEndpoint}`,
              { language },
              CacheConfig.DETAILS,
           )
         : null,
      isFoolInfo
         ? tmdbFetch(
              `/${mediaType}/${mediaId}/recommendations`,
              { language },
              CacheConfig.LISTS,
           )
         : null,
   ]);

   let videos = details?.videos;
   if (!videos?.results?.length) {
      const fallbackVideos = await tmdbFetch(
         `/${mediaType}/${mediaId}/videos`,
         { language: "en-US" },
         CacheConfig.DETAILS,
      );
      videos = fallbackVideos ?? videos;
   }

   const runtime =
      mediaType === "movie"
         ? details?.runtime || null
         : details?.episode_run_time?.[0] ||
           details?.last_episode_to_air?.runtime ||
           null;

   const logoPath = details?.images?.logos?.[0]?.file_path || null;

   return {
      //...details,
      id: details?.id,
      videos: videos.results,
      title: mediaType === "movie" ? details?.title : details?.name,
      tagline: details?.tagline || "",
      releaseDate: details?.release_date || details?.first_air_date || null,
      runtime,
      numberOfSeasons:
         mediaType === "tv" ? details?.number_of_seasons || null : null,
      logoPath: logoPath,
      homepage: details.homepage,
      rating: details?.vote_average,
      genres: details?.genres || [],
      cast: credits?.cast || [],
      crew: credits?.crew || [],
      networks: details?.networks || [],
      inProduction: details.in_production,
      nextEpisodeToAir:
         mediaType === "tv" ? details?.next_episode_to_air : null,
      productionCompanies: details?.production_companies || [],
      productionCountries: details?.production_countries || [],
      status: details?.status,
      type: mediaType === "tv" ? details?.type : null,
      budget: mediaType === "movie" ? details?.budget : null,
      overview: details?.overview,
      revenue: mediaType === "movie" ? details?.revenue : null,
      mediaType,
      posterPath: details?.poster_path,
      backdropPath: details?.backdrop_path,
      lastAirDate: mediaType === "tv" ? details?.last_air_date : null,
      backdrops: details?.images?.backdrops || [],
      logos: details?.images?.logos || [],
      posters: details?.images?.posters || [],
      createdBy: mediaType === "tv" ? details?.created_by : [],
      recommendations: recommendations?.results || [],
   };
}
