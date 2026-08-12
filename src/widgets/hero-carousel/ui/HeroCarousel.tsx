"use client";

import { useState, useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { useIsMobile } from "@/shared/lib/hooks/useWindowSize";
import { useTMDBImagePath } from "@/shared/lib/hooks/useTMDBImagePath";
import { BackgroundImage } from "@/shared/components";
import { MediaDetails, useGetExtras } from "@/entities/media";
import { CarouselNavigation } from "./CarouselNavigation";
import { LibraryControlButtons } from "@/features/library-controls";
import { Link } from "@/i18n/navigation";
import { InfoIcon } from "lucide-react";
import { TrendingMedia } from "@/entities/media/model/types";

export function HeroCarousel({ media }: { media: TrendingMedia[] }) {
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

   const {
      id: mediaId,
      title,
      posterPath,
      backdropPath,
      mediaType,
   } = currentMovie;

   const isFullInfo = false;

   const { data: extraMedia, isLoading } = useGetExtras(
      mediaId,
      mediaType,
      isFullInfo,
   );

   const tmdbImgPath = useTMDBImagePath();
   const backdrop = `${tmdbImgPath}${isMobile ? posterPath : backdropPath}`;

   const mediaHref = `/${mediaType === "tv" ? "tvshow" : mediaType}/${mediaId}`;

   return (
      <div className="flex-1 min-h-[90vh] sm:min-h-screen relative flex flex-col justify-end bg-black lg:bg-[#010101]">
         <BackgroundImage
            src={backdrop}
            alt={title}
            imageKey={mediaId}
            loadingText={t("loadingPoster")}
         />

         <div className="relative z-30 w-full px-4 sm:px-8 pt-16 sm:pt-20 lg:pt-24 pb-4 sm:pb-6 md:pb-8 flex flex-col-reverse sm:flex-row items-start sm:items-end justify-end sm:justify-between gap-4 sm:gap-10 mt-auto bg-linear-to-t from-black via-black/90 to-transparent sm:bg-none overflow-hidden">
            <div className="flex flex-col w-full">
               <MediaDetails
                  id={mediaId}
                  mediaType={mediaType}
                  media={extraMedia}
                  isLoading={isLoading}
               >
                  {/* Library control buttons */}
                  <div className="flex gap-3 sm:gap-5 flex-wrap-reverse items-center">
                     <Link
                        href={mediaHref}
                        className="flex transition-all duration-700 bg-transparent items-center gap-2 text-sm! sm:text-md! py-2! px-3! rounded-sm! text-zinc-400 border border-white/10 hover:bg-transparent hover:text-zinc-300 hover:scale-105"
                     >
                        <span className="select-none">Discover</span>
                        <InfoIcon
                           strokeWidth={1.5}
                           size={17}
                        />
                     </Link>
                     <LibraryControlButtons />
                  </div>
               </MediaDetails>
            </div>

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
