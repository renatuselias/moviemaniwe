"use client";

import { useMemo } from "react";
import { useInView } from "react-intersection-observer";
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";
import { MediaSlide, useNowPlayingMovies } from "@/entities/media";
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

interface MediaCarouselProps {
   title: string;
   subtitle: string;
}

export function MediaCarousel({ title, subtitle }: MediaCarouselProps) {
   const { ref, inView } = useInView({
      triggerOnce: true,
      rootMargin: "400px 0px",
   });

   const { data: movies, isLoading } = useNowPlayingMovies(inView);
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
                     <Skeleton className="w-full aspect-video" />
                     <Skeleton className="w-1/2 h-5 rounded-sm" />

                     <div className="flex gap-2">
                        <Skeleton className="w-15 h-5 rounded-sm" />
                        <Skeleton className="w-15 h-5 rounded-sm" />
                        <Skeleton className="w-2/5 h-5 rounded-sm" />
                     </div>
                     <div className="flex gap-2 items-center">
                        <Skeleton className="w-12 h-5 rounded-sm" />
                        <Skeleton className="w-30 h-7 rounded-sm" />
                        <Skeleton className="w-2/5 h-5 rounded-sm" />
                     </div>

                     <Skeleton className="w-20 h-5 rounded-sm" />
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
                           movie={movie}
                           tmdbImgPath={tmdbImgPath}
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
      </section>
   );
}
