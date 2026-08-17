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
      | "Bloopers";
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

export interface ProductionCompany {
   id: number;
   name: string;
   logo_path: string | null;
   origin_country: string;
}

export interface ProductionCountry {
   iso_3166_1: string;
   name: string;
}

export interface TMDBNetwork {
   id: number;
   logo_path: string;
   name: string;
   origin_country: string;
}

export interface TMDBMediaCast {
   id: number;
   name: string;
   character: string;
   profilePath: string | null;
}

interface TMDBCrewJob {
   creditId?: string;
   job: string;
   episodeCount?: number;
}

export interface TMDBMediaCrew {
   id: number;
   name: string;
   department?: string;
   profile_path?: string;
   job?: string; // movie
   jobs?: TMDBCrewJob[]; // tv
}

export interface TMDBCreatedBy {
   id: number;
   name: string;
   creditId?: string;
   gender?: number;
   profile_path?: string;
}

interface TMDBBaseMedia {
   id: number;
   backdrop_path: string | null;
   poster_path: string | null;
   vote_average: number;
   popularity: number;
}

interface TMDBMovie extends TMDBBaseMedia {
   media_type: "movie";
   title: string;
   original_title: string;
}

interface TMDBTv extends TMDBBaseMedia {
   media_type: "tv";
   name: string;
   original_name: string;
}

export type TMDBMedia = TMDBMovie | TMDBTv;
// | TMDBTrendingPerson;
