"use client";

import { useMemo, useCallback } from "react";
import { Media } from "./Media";
import { Info } from "./Info";
import { MediaDetails } from "@/entities/media";

interface MediaSlideProps {
   media: MediaDetails;
   tmdbImgPath: string;
   onSelect: (media: MediaDetails) => void;
}

export function MediaSlide({ media, tmdbImgPath, onSelect }: MediaSlideProps) {
   const handleSelect = useCallback(() => {
      onSelect(media);
   }, [media, onSelect]);

   const backdropUrl = media.backdropPath
      ? `${tmdbImgPath}${media.backdropPath}`
      : null;

   const carouselImages = useMemo(() => {
      return (media.backdrops || [])
         .map((b) => b.file_path)
         .filter(Boolean)
         .slice(0, 5) as string[];
   }, [media.backdrops]);

   const trailerKey = useMemo(() => {
      return (
         media.videos?.find((v) => v.type === "Trailer" && v.site === "YouTube")
            ?.key || null
      );
   }, [media.videos]);

   return (
      <div className="group relative w-full flex flex-col gap-2">
         <Media
            title={media.title}
            backdropUrl={backdropUrl}
            carouselImages={carouselImages}
            trailerKey={media.trailerKey || trailerKey}
            onClick={handleSelect}
         />

         <Info
            mediaId={media.id}
            title={media.title}
            mediaType={media.mediaType}
            tmdbImgPath={tmdbImgPath}
            releaseDate={media.releaseDate}
            runtime={media.runtime}
            numberOfSeasons={media.numberOfSeasons}
            genres={media.genres}
            cast={media.cast}
            rating={media.rating}
            onClick={handleSelect}
         />
      </div>
   );
}
