import { TMDBVideo } from "@/shared/types";

export function findTrailerKey(
   videos: TMDBVideo[],
   targetLang: string,
): string | null {
   if (!videos.length) return null;

   const trailer =
      videos.find(
         (v) =>
            v.site === "YouTube" &&
            v.type === "Trailer" &&
            v.official &&
            v.iso_639_1 === targetLang,
      ) ||
      videos.find(
         (v) => v.site === "YouTube" && v.type === "Trailer" && v.official,
      ) ||
      videos.find((v) => v.site === "YouTube" && v.type === "Trailer") ||
      videos.find((v) => v.site === "YouTube" && v.type === "Teaser");

   return trailer?.key ?? null;
}
