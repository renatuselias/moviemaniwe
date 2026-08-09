import { useQuery } from "@tanstack/react-query";
import { getCinemaMovies } from "../api/getCinemaMovies";
import { NOW_IN_CINEMA_QUERY_KEY } from "@/shared/config/query-keys";

export function useNowPlayingMovies(enabled: boolean = true) {
   return useQuery({
      queryKey: NOW_IN_CINEMA_QUERY_KEY,
      queryFn: () => getCinemaMovies(),
      staleTime: 1000 * 60 * 60,
      enabled,
   });
}
