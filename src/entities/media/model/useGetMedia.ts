import { useQuery } from "@tanstack/react-query";
import { getCinemaMovies } from "../api/getCinemaMovies";
import {
   NOW_IN_CINEMA_QUERY_KEY,
   MEDIA_EXTRAS_QUERY_KEY,
} from "@/shared/config/query-keys";
import { getMediaDetails } from "../api/getMediaDetails";
import { CacheConfig } from "@/shared/config/cache";

export function useNowPlayingMovies(enabled: boolean = true) {
   return useQuery({
      queryKey: NOW_IN_CINEMA_QUERY_KEY,
      queryFn: () => getCinemaMovies(),
      staleTime: 1000 * 60 * 60,
      enabled,
   });
}

export function useGetExtras(
   mediaId: number,
   mediaType: "movie" | "tv",
   isFoolInfo: boolean = true,
) {
   return useQuery({
      queryKey: [MEDIA_EXTRAS_QUERY_KEY, mediaId, mediaType, isFoolInfo],
      queryFn: () => getMediaDetails(String(mediaId), mediaType, isFoolInfo),
      staleTime: CacheConfig.DETAILS,
      enabled: Boolean(mediaId && mediaType),
   });
}
