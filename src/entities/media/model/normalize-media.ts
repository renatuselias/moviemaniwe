import { MediaItem, NormalizedMedia } from "./types";

export function normalizeMedia(item: MediaItem): NormalizedMedia {
   const isMovie = item.media_type === "movie";

   return {
      id: item.id,
      title: isMovie ? item.title : item.name,
      releaseDate: isMovie ? item.release_date : item.first_air_date,
      posterPath: item.poster_path ?? null,
      backdropPath: item.backdrop_path ?? null,
      voteAverage: item.vote_average ?? 0,
      mediaType: item.media_type,
      overview: item.overview,
      rating: item.vote_average,
      // cast: item.cast,
      // trailerUrl: item.trailerUrl,
   };
}
