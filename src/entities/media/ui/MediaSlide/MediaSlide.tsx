"use client";

import { Movie } from "../../model/types";
import { Media } from "./Media";
import { Info } from "./Info";

interface MediaSlideProps {
   movie: Movie;
   tmdbImgPath: string;
}

export function MediaSlide({ movie, tmdbImgPath }: MediaSlideProps) {
   const backdropUrl = movie.backdrop_path
      ? `${tmdbImgPath}${movie.backdrop_path}`
      : null;

   const carouselImages = [...(movie.backdrops?.map((b) => b.file_path) || [])]
      .filter(Boolean)
      .slice(0, 5) as string[];

   const trailerKey =
      movie.videos?.results?.find(
         (v) => v.type === "Trailer" && v.site === "YouTube",
      )?.key || movie.trailerKey;

   return (
      <div className="group relative w-full flex flex-col gap-2">
         <Media
            title={movie.title}
            backdropUrl={backdropUrl}
            carouselImages={carouselImages}
            trailerKey={trailerKey}
            tmdbImgPath={tmdbImgPath}
         />

         <Info
            movie={movie}
            tmdbImgPath={tmdbImgPath}
         />
      </div>
   );
}
