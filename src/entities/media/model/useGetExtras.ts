import { useQuery } from "@tanstack/react-query";
import { MEDIA_EXTRAS_QUERY_KEY } from "@/shared/config/query-keys";
import { getMediaDetails } from "../api/get-media-details";
import { CacheConfig } from "@/shared/config/cache";

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
