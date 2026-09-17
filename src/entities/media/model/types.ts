import {
   ProductionCompany,
   ProductionCountry,
   TMDBVideo,
   TMDBImage,
   TMDBNetwork,
   TMDBMediaCast,
   TMDBMediaCrew,
   TMDBCreatedBy,
   TMDBMediaStatus,
} from "@/shared/types";

export interface BaseMedia {
   id: number;
   mediaType: "movie" | "tv";
   title: string;
   backdropPath: string | null;
   posterPath: string | null;
   rating?: number;
   popularity?: number;
}

export interface MediaDetails extends BaseMedia {
   releaseDate: string;
   videos: TMDBVideo[];
   backdrops: TMDBImage[];
   trailerKey: string | null;
   numberOfSeasons: string;
   cast: TMDBMediaCast[];
   runtime: number;
   genres: { id: number; name: string }[];
}

export interface MediaFullInfo extends MediaDetails {
   logoPath: string;
   crew: TMDBMediaCrew[];
   lastAirDate: string;
   homepage: string;
   logos: TMDBImage[];
   posters: TMDBImage[];
   inProduction: boolean;
   networks: TMDBNetwork[];
   nextEpisodeToAir: {
      air_date: string;
      episode_number: number;
      season_number: number;
   };
   productionCompanies: ProductionCompany[];
   productionCountries: ProductionCountry[];
   recommendations: [];
   status: TMDBMediaStatus;
   tagline: string;
   type: string; // tv
   budget: number;
   overview: string;
   revenue: number;
   createdBy: TMDBCreatedBy[];
}

export interface FetchMediaParams {
   endpoint?: string;
   mediaType?: "movie" | "tv" | "all";
   providerId?: number;
   genreId?: number;
   voteCountGte?: number;
   withOriginalLanguage?: string;
   withOriginCountry?: string;
   withoutGenres?: string | number; // e.g. 16 or "16,10762"
   releaseDateGte?: string;
   releaseDateLte?: string;
   sortBy?:
      | "popularity.desc"
      | "vote_average.desc"
      | "primary_release_date.desc"
      | "revenue.desc";
   region?: string;
   page?: number;
   limit?: number;
   isCarousel?: boolean;
}

type EndpointParams = {
   endpoint: string;
   genreId?: never;
   providerId?: never;
   sortBy?: never;
   region?: never;
   page?: never;
};

type DiscoverParams = {
   endpoint?: never;
   genreId?: number;
   providerId?: number;
   sortBy?: FetchMediaParams["sortBy"];
   region?: string;
   voteCountGte?: number;
   page?: number;
   releaseDateGte?: string;
   releaseDateLte?: string;
   withOriginalLanguage?: string;
   withOriginCountry?: string;
   withoutGenres?: string | number; // e.g. 16 or "16,10762"
};

export type MediaParams = EndpointParams | DiscoverParams;
