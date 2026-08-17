"use client";

import { useMemo, useState } from "react";
import { useInView } from "react-intersection-observer";
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";
import { MediaSlide } from "@/entities/media";
import { ContentTitle } from "@/shared/components";
import { useTMDBImagePath } from "@/shared/lib/hooks/useTMDBImagePath";
import {
   Carousel,
   CarouselContent,
   CarouselItem,
   CarouselNext,
   CarouselPrevious,
} from "@/shared/components/ui/carousel";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { MediaDetails, MediaParams } from "@/entities/media/model/types";
import { MediaModal } from "@/widgets/media-modal";
import { useMedia } from "@/entities/media/model/useMedia";

export interface MediaCarouselProps {
   title: string;
   subtitle: string;
   mediaType: "movie" | "tv" | "all";
   limit?: number;
   params: MediaParams;
}

export function MediaCarousel({
   title,
   subtitle,
   mediaType,
   limit = 10,
   params,
}: MediaCarouselProps) {
   const { ref, inView } = useInView({
      triggerOnce: true,
      rootMargin: "400px 0px",
   });

   const [selectedItem, setSelectedItem] = useState<MediaDetails | null>(null);

   const { data: movies = [], isLoading } = useMedia({
      ...params,
      mediaType,
      limit,
      isCarousel: true,
   });
   const tmdbImgPath = useTMDBImagePath();

   const wheelPlugin = useMemo(
      () => WheelGesturesPlugin({ forceWheelAxis: "x" }),
      [],
   );

   return (
      <section
         ref={ref}
         className="w-full flex flex-col gap-5 sm:gap-10"
      >
         <ContentTitle
            title={title}
            subtitle={subtitle}
         />

         {isLoading || !inView ? (
            <div className="w-full flex gap-4">
               {[0, 1].map((index) => (
                  <div
                     key={index}
                     className={`w-full flex-col gap-3 ${
                        index === 1 ? "hidden sm:flex" : "flex"
                     }`}
                  >
                     {/* Backdrop poster */}
                     <Skeleton className="w-full aspect-5/3" />

                     {/* Name */}
                     <Skeleton className="w-1/2 h-5 rounded-sm!" />

                     {/* Info */}
                     <div className="flex gap-2 items-center">
                        <Skeleton className="w-9 h-4 rounded-sm!" />
                        <span className="text-white/20 shrink-0">|</span>
                        <Skeleton className="w-12 h-4 rounded-sm!" />
                        <span className="text-white/20 shrink-0">|</span>
                        <Skeleton className="w-2/5 h-5 rounded-sm!" />
                     </div>

                     {/* Cast */}
                     <div className="flex gap-3 items-center">
                        <Skeleton className="w-12 h-4 rounded-sm!" />
                        <div className="flex -space-x-0.5">
                           {Array.from({ length: 5 }).map((_, index) => (
                              <Skeleton
                                 key={index}
                                 style={{
                                    width: 28,
                                    height: 28,
                                 }}
                                 className="rounded-full!"
                              />
                           ))}
                        </div>

                        <Skeleton className="w-2/5 h-5 rounded-sm!" />
                     </div>

                     <Skeleton className="w-20 h-5 rounded-sm!" />
                  </div>
               ))}
            </div>
         ) : movies && movies.length > 0 ? (
            <Carousel
               opts={{
                  align: "start",
                  loop: true,
                  watchDrag: true,
               }}
               className="w-full relative"
               plugins={[wheelPlugin]}
            >
               <CarouselContent className="-ml-4">
                  {movies.map((movie) => (
                     <CarouselItem
                        key={movie.id}
                        className="basis-full sm:basis-1/2 pl-4"
                     >
                        <MediaSlide
                           media={movie}
                           tmdbImgPath={tmdbImgPath}
                           onSelect={setSelectedItem}
                        />
                     </CarouselItem>
                  ))}
               </CarouselContent>

               <div className="flex gap-2 absolute -top-16 sm:-top-21 right-0">
                  <CarouselPrevious className="static translate-y-0 rounded-xs cursor-pointer max-[380px]:w-8 max-[380px]:h-8 w-10 h-10" />
                  <CarouselNext className="static translate-y-0 rounded-xs cursor-pointer max-[380px]:w-8 max-[380px]:h-8 w-10 h-10" />
               </div>
            </Carousel>
         ) : null}

         {selectedItem && (
            <MediaModal
               mediaId={selectedItem.id}
               mediaType={selectedItem.mediaType}
               initialData={{
                  title: selectedItem.title,
                  backdropPath: selectedItem.backdropPath,
               }}
               onClose={() => setSelectedItem(null)}
            />
         )}
      </section>
   );
}
