"use client";

import { MediaDetails } from "../../model/types";
import { Media } from "./Media";
import { Info } from "./Info";

interface MediaSlideProps {
   media: MediaDetails;
   tmdbImgPath: string;
}

export function MediaSlide({ media, tmdbImgPath }: MediaSlideProps) {
   const backdropUrl = media.backdropPath
      ? `${tmdbImgPath}${media.backdropPath}`
      : null;

   const carouselImages = [
      ...(media.backdrops?.map((b: { file_path: string }) => b.file_path) ||
         []),
   ]
      .filter(Boolean)
      .slice(0, 5) as string[];

   const trailerKey =
      media.videos?.find((v) => v.type === "Trailer" && v.site === "YouTube")
         ?.key || "";

   return (
      <div className="group relative w-full flex flex-col gap-2">
         <Media
            title={media.title}
            backdropUrl={backdropUrl}
            carouselImages={carouselImages}
            trailerKey={trailerKey}
            tmdbImgPath={tmdbImgPath}
         />

         <Info
            media={media}
            tmdbImgPath={tmdbImgPath}
         />
      </div>
   );
}
