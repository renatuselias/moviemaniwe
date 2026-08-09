export interface TMDBVideo {
   id: string;
   iso_639_1: string;
   iso_3166_1: string;
   key: string;
   name: string;
   site: string;
   size: number;
   type:
      | "Trailer"
      | "Teaser"
      | "Clip"
      | "Featurette"
      | "Behind the Scenes"
      | "Bolloper";
   official: boolean;
   published_at: string;
}

export interface TMDBImage {
   aspect_ratio: number;
   height: number;
   iso_639_1: string | null;
   file_path: string;
   vote_average: number;
   vote_count: number;
   width: number;
}

export interface TMDBImages {
   backdrops: TMDBImage[];
   posters: TMDBImage[];
   logos?: TMDBImage[];
}

export interface BaseMedia {
   id: number;
   backdrop_path: string;
   poster_path: string;
   overview: string;
   popularity: number;
   vote_average: number;
   vote_count: number;
   genre_ids: number[];
   genres: { id: number; name: string }[];
   tagline?: string;
   origin_country?: string[];
   videos?: { results: TMDBVideo[] };
   images?: TMDBImages;
}
