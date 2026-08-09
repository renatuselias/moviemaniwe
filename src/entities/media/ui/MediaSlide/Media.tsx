"use client";

import { useState } from "react";
import Image from "next/image";
import { Film, Volume2, VolumeX } from "lucide-react";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { useMediaHover } from "../../model/useMediaHover";

interface MediaCardMediaProps {
   title: string;
   backdropUrl: string | null;
   carouselImages: string[];
   trailerKey?: string;
   tmdbImgPath: string;
}

export function Media({
   title,
   backdropUrl,
   carouselImages,
   trailerKey,
   tmdbImgPath,
}: MediaCardMediaProps) {
   const [isLoaded, setIsLoaded] = useState(false);

   const {
      isHovered,
      showCarousel,
      showTrailer,
      isMuted,
      isPending,
      isHoverSupported,
      handleMouseEnter,
      handleMouseLeave,
      toggleMute,
      HOVER_DELAY,
   } = useMediaHover({ trailerKey });

   return (
      <div
         className="relative aspect-5/3 w-full overflow-hidden border border-zinc-800 bg-zinc-900 cursor-pointer"
         onMouseEnter={handleMouseEnter}
         onMouseLeave={handleMouseLeave}
      >
         {!isLoaded && (
            <Skeleton className="absolute inset-0 z-10 h-full w-full rounded-none bg-zinc-900" />
         )}

         {backdropUrl ? (
            <Image
               src={backdropUrl}
               alt={title || "Movie Backdrop"}
               fill
               sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
               onLoad={() => setIsLoaded(true)}
               className={`object-cover transition-all duration-700 ease-in-out ${
                  isLoaded ? "opacity-100" : "opacity-0"
               } ${
                  isHovered && !showTrailer
                     ? "scale-105 brightness-40"
                     : "group-hover:scale-105"
               }`}
            />
         ) : (
            <div className="flex h-full w-full items-center justify-center text-zinc-600">
               <Film className="h-10 w-10" />
            </div>
         )}

         {/* Vertical media carousel */}
         {isHoverSupported && carouselImages.length > 0 && (
            <div
               className={`absolute inset-0 z-15 overflow-hidden transition-opacity duration-700 ease-in-out pointer-events-none ${
                  showCarousel ? "opacity-100" : "opacity-0"
               }`}
            >
               <div className="flex flex-col gap-2 animate-vertical-marquee will-change-transform transform-gpu">
                  {[...carouselImages, ...carouselImages].map(
                     (imgPath, idx) => (
                        <div
                           key={`${imgPath}-${idx}`}
                           className="relative aspect-video w-full shrink-0 overflow-hidden"
                        >
                           <Image
                              src={`${tmdbImgPath}${imgPath}`}
                              alt="Carousel frame"
                              fill
                              className="object-cover"
                           />
                        </div>
                     ),
                  )}
               </div>

               <div className="absolute inset-0 bg-black/40 z-20 pointer-events-none" />
            </div>
         )}

         {/* Text overlay with title */}
         <div
            className={`absolute inset-0 z-25 flex items-center justify-center p-4 transition-all duration-500 ease-out pointer-events-none will-change-transform transform-gpu ${
               isHovered && !showTrailer
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-175"
            }`}
         >
            <h3
               className={`font-bold text-xl tracking-tighter text-zinc-100 text-center line-clamp-2 drop-shadow-lg transition-transform duration-700 cubic-bezier(0.34,1.56,0.64,1) ${
                  isHovered && !showTrailer ? "scale-110" : "scale-90"
               }`}
            >
               {title}
            </h3>
         </div>

         {/* 4. Progressbar loading */}
         {isHoverSupported && (
            <div
               className={`absolute bottom-0 left-0 right-0 h-0.5 bg-white/20 z-40 overflow-hidden transition-opacity duration-300 pointer-events-none ${
                  isPending ? "opacity-100" : "opacity-0"
               }`}
            >
               <div
                  className={`h-full bg-white transition-all ease-linear origin-left ${
                     isPending ? "w-full" : "w-0"
                  }`}
                  style={{
                     transitionDuration: isPending ? `${HOVER_DELAY}ms` : "0ms",
                  }}
               />
            </div>
         )}

         {/* 5. Trailer and mute button */}
         {isHoverSupported && trailerKey && (
            <>
               {isHovered && (
                  <iframe
                     src={`https://www.youtube-nocookie.com/embed/${trailerKey}?autoplay=1&mute=${
                        isMuted ? 1 : 0
                     }&controls=0&loop=1&playlist=${trailerKey}&modestbranding=1`}
                     title={title}
                     className={`absolute inset-0 h-full w-full border-0 pointer-events-none scale-150 transition-opacity duration-700 ease-in-out z-30 ${
                        showTrailer ? "opacity-100" : "opacity-0"
                     }`}
                     allow="autoplay; encrypted-media"
                  />
               )}

               <button
                  type="button"
                  onClick={toggleMute}
                  aria-label={isMuted ? "Unmute video" : "Mute video"}
                  className={`absolute bottom-3 right-3 z-40 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white border border-white/10 transition-all duration-500 hover:bg-black/80 hover:scale-110 cursor-pointer ${
                     showTrailer
                        ? "opacity-100 pointer-events-auto"
                        : "opacity-0 pointer-events-none"
                  }`}
               >
                  {isMuted ? (
                     <VolumeX className="h-4 w-4" />
                  ) : (
                     <Volume2 className="h-4 w-4" />
                  )}
               </button>
            </>
         )}
      </div>
   );
}
