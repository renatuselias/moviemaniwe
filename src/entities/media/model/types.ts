import {
   ProductionCompany,
   ProductionCountry,
   TMDBVideo,
   TMDBImage,
   TMDBNetwork,
} from "@/shared/types";

export interface TrendingMedia {
   id: number;
   title: string;
   posterPath: string | null;
   backdropPath: string | null;
   mediaType: "movie" | "tv";
}

interface MediaCast {
   id: number;
   name: string;
   character: string;
   profilePath: string | null;
}

interface CrewJob {
   creditId?: string;
   job: string;
   episodeCount?: number;
}

export interface MediaCrew {
   id: number;
   name: string;
   department?: string;
   profile_path?: string;
   job?: string; // movie
   jobs?: CrewJob[]; // tv
}

export interface CreatedBy {
   id: number;
   name: string;
   creditId?: string;
   gender?: number;
   profile_path?: string;
}

export interface MediaDetails {
   id: number;
   title: string;
   posterPath: string;
   backdropPath: string;
   mediaType: "movie" | "tv";
   logoPath: string;
   rating: number;
   genres: { id: number; name: string }[];
   cast: MediaCast[];
   crew: MediaCrew[];
   releaseDate: string; // first air on tv
   lastAirDate: string;
   homepage: string;
   backdrops: TMDBImage[];
   logos: TMDBImage[];
   posters: TMDBImage[];
   inProduction: boolean;
   networks: TMDBNetwork[];
   nextEpisodeToAir: {
      air_date: string;
      episode_number: number;
      season_number: number;
   };
   numberOfSeasons: string;
   productionCompanies: ProductionCompany[];
   productionCountries: ProductionCountry[];
   recommendations: [];
   status: string;
   tagline: string;
   type: string; // tv
   budget: number;
   overview: string;
   revenue: number;
   runtime: number;
   videos: TMDBVideo[];
   createdBy: CreatedBy[];
}
