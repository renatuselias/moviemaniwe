"use server";

import { BaseMedia, FetchMediaParams, MediaDetails } from "../model/types";
import { getMedia } from "./get-media";

export async function getCombinedMedia(
   params: FetchMediaParams,
): Promise<BaseMedia[] | MediaDetails[]> {
   try {
      const { sortBy = "popularity.desc", limit } = params;

      const [movies, tvShows] = await Promise.all([
         getMedia({ ...params, mediaType: "movie" }),
         getMedia({ ...params, mediaType: "tv" }),
      ]);

      let combined = [...movies, ...tvShows];

      if (sortBy.includes("vote_average")) {
         combined.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
      } else {
         combined.sort((a, b) => (b.popularity ?? 0) - (a.popularity ?? 0));
      }

      if (limit) {
         combined = combined.slice(0, limit);
      }

      return combined;
   } catch (error) {
      console.error("Failed to fetch all media:", error);
      return [];
   }
}
