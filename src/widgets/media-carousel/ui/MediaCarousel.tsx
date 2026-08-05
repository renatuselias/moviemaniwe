"use client";

import { useState, useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { useIsMobile } from "@/shared/lib/hooks/useWindowSize";
import { useTMDBImagePath } from "@/shared/lib/hooks/useTMDBImagePath";
import BackgroundImage from "@/shared/ui/components/BackgroundImage";
import { MediaDetails, NormalizedMedia } from "@/entities/media";
import { CarouselNavigation } from "./CarouselNavigation";

export function MediaCarousel({ media }: { media: NormalizedMedia[] }) {
   const t = useTranslations("loaders");

   const sliderTime = 10000;

   const isMobile = useIsMobile();

   const [currentSlide, setCurrentSlide] = useState(0);

   const listRef = useRef<HTMLDivElement>(null);

   // Scroll active item into view
   useEffect(() => {
      const activeItem = listRef.current?.children[currentSlide] as HTMLElement;
      if (activeItem) {
         activeItem.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
   }, [currentSlide]);

   useEffect(() => {
      if (!media || media.length === 0) return;
      const timer = setInterval(() => {
         setCurrentSlide((prev) => (prev + 1) % media.length);
      }, sliderTime);
      return () => clearInterval(timer);
   }, [media, currentSlide]);

   const currentMovie = media[currentSlide];

   const { id, title, rating, posterPath, backdropPath, mediaType } =
      currentMovie;

   const tmdbImgPath = useTMDBImagePath();
   const backdrop = `${tmdbImgPath}${isMobile ? posterPath : backdropPath}`;

   return (
      <div className="flex-1 min-h-[90vh] sm:min-h-screen relative flex flex-col justify-end bg-black lg:bg-[#010101]">
         <BackgroundImage
            src={backdrop}
            alt={title}
            imageKey={id}
            loadingText={t("loadingPoster")}
         />

         <div className="relative z-30 w-full px-8 pt-16 sm:pt-20 lg:pt-24 pb-4 sm:pb-6 md:pb-8 flex flex-col-reverse sm:flex-row items-start sm:items-end justify-end sm:justify-between gap-4 sm:gap-10 mt-auto bg-linear-to-t from-black via-black/90 to-transparent sm:bg-none overflow-hidden">
            <MediaDetails
               id={id}
               title={title}
               rating={rating}
               mediaType={mediaType}
            />

            <CarouselNavigation
               media={media}
               sliderTime={sliderTime}
               currentSlide={currentSlide}
               setCurrentSlide={setCurrentSlide}
            />
         </div>
      </div>
   );
}
