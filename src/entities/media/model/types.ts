import { BaseMedia } from "@/shared/types";

export interface Movie extends BaseMedia {
   media_type: "movie";
   title: string;
   original_title: string;
   original_language: string;
   release_date: string;
   runtime: number;
   adult: boolean;
   video: boolean;
   logo_path?: string;
   production_countries?: { iso_3166_1: string; name: string }[];
   production_companies?: {
      id: number;
      name: string;
      logo_path: string | null;
      origin_country: string;
   }[];
   budget?: number;
   revenue?: number;
}

export interface TvSeries extends BaseMedia {
   media_type: "tv";
   name: string;
   first_air_date: string;
   last_air_date?: string;
   number_of_seasons: number;
   number_of_episodes: number;
   status: string;
   seasons?: {
      id: number;
      season_number: number;
      name: string;
      overview: string;
      air_date: string;
      episode_count: number;
   }[];
   created_by?: {
      id: number;
      name: string;
      profile_path: string | null;
   }[];
   production_countries?: { iso_3166_1: string; name: string }[];
   production_companies?: {
      id: number;
      name: string;
      logo_path: string | null;
      origin_country: string;
   }[];
}

export type MediaItem = Movie | TvSeries;

export interface NormalizedMedia {
   id: number;
   title: string;
   releaseDate: string;
   posterPath: string | null;
   backdropPath: string | null;
   voteAverage: number;
   mediaType: "movie" | "tv";
   overview?: string;
   rating: number;
}
