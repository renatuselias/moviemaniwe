import { useQuery } from "@tanstack/react-query";
import { getMedia } from "../api/get-media";
import {
   NOW_IN_CINEMA_QUERY_KEY,
   MEDIA_DISCOVER_QUERY_KEY,
} from "@/shared/config/query-keys";
import { CacheConfig } from "@/shared/config/cache";
import { BaseMedia, FetchMediaParams, MediaDetails } from "./types";

export interface UseMediaOptions<
   TIsCarousel extends boolean = false,
> extends FetchMediaParams {
   isCarousel?: TIsCarousel;
   enabled?: boolean;
}

type MediaResult<TIsCarousel extends boolean> = TIsCarousel extends true
   ? MediaDetails
   : BaseMedia;

export function useMedia<TIsCarousel extends boolean = false>({
   endpoint,
   mediaType = "movie",
   providerId,
   genreId,
   voteCountGte,
   withoutGenres,
   releaseDateGte,
   releaseDateLte,
   withOriginalLanguage,
   withOriginCountry,
   sortBy = "popularity.desc",
   region = "US",
   page = 1,
   limit,
   isCarousel,
   enabled = true,
}: UseMediaOptions<TIsCarousel>) {
   const queryKey = endpoint
      ? [NOW_IN_CINEMA_QUERY_KEY, endpoint, mediaType, isCarousel, limit, page]
      : [
           MEDIA_DISCOVER_QUERY_KEY,
           mediaType,
           genreId,
           providerId,
           voteCountGte,
           withoutGenres,
           releaseDateGte,
           releaseDateLte,
           withOriginalLanguage,
           withOriginCountry,
           sortBy,
           region,
           page,
           isCarousel,
           limit,
        ];

   return useQuery<
      BaseMedia[] | MediaDetails[],
      Error,
      Array<MediaResult<TIsCarousel>>
   >({
      queryKey,
      queryFn: () =>
         getMedia({
            endpoint,
            mediaType,
            providerId,
            genreId,
            voteCountGte,
            withoutGenres,
            releaseDateGte,
            releaseDateLte,
            withOriginalLanguage,
            withOriginCountry,
            sortBy,
            region,
            page,
            limit,
            isCarousel,
         }),
      staleTime: CacheConfig.DETAILS,
      enabled,
      select: (data) => data as Array<MediaResult<TIsCarousel>>,
   });
}
