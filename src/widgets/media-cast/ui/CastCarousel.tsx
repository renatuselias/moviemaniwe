"use client";

import { useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";
import { User } from "lucide-react";
import { TmdbImage } from "@/shared/components";
import {
   Carousel,
   CarouselContent,
   CarouselItem,
   CarouselNext,
   CarouselPrevious,
} from "@/shared/components/ui/carousel";
import { TMDBMediaCast } from "@/shared/types";
import { Skeleton } from "@/shared/components/ui/skeleton";

// Extends TMDBMediaCast to support aggregate TV cast structures
export type CastItem = TMDBMediaCast & {
   roles?: Array<{
      character?: string;
      episode_count?: number;
   }>;
};

export function CastCarousel({ cast }: { cast: CastItem[] }) {
   const wheelPlugin = useMemo(
      () => WheelGesturesPlugin({ forceWheelAxis: "x" }),
      [],
   );

   return (
      <div className="w-full space-y-4">
         <Carousel
            opts={{
               align: "start",
               loop: true,
               watchDrag: true,
            }}
            className="w-full relative"
            plugins={[wheelPlugin]}
         >
            <CarouselContent className="-ml-3">
               {cast.map((actor) => {
                  // Resolve character name for movies or TV aggregate credits
                  const characterName =
                     actor.character ||
                     actor.roles
                        ?.map((r) => r.character)
                        .filter(Boolean)
                        .join(" / ");

                  return (
                     <CarouselItem
                        key={`${actor.id}-${characterName || actor.profile_path}`}
                        className="pl-0 basis-1/3 sm:basis-1/4 md:basis-1/5 lg:basis-1/6"
                     >
                        <Link
                           href={`/person/${actor.id}`}
                           prefetch={false}
                           className="block h-full"
                        >
                           <motion.div
                              whileHover={{ y: -4 }}
                              transition={{ duration: 0.2 }}
                              className="group relative flex flex-col h-full rounded-none transition-colors duration-300 overflow-hidden shadow-lg select-none"
                           >
                              {/* Poster image container */}
                              <div className="relative aspect-2/3 w-full overflow-hidden">
                                 <Skeleton className="absolute inset-0 h-full w-full rounded-none! border border-zinc-700/30 z-0" />

                                 {actor.profile_path ? (
                                    <TmdbImage
                                       src={actor.profile_path}
                                       alt={actor.name || "Actor"}
                                       fill
                                       className="object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                 ) : (
                                    <div className="relative w-full h-full bg-zinc-950 z-10 flex flex-col items-center justify-center gap-2 font-mono text-xs text-zinc-600 ">
                                       <User className="w-8 h-8 text-zinc-700 stroke-[1.5]" />
                                       <span className="text-[10px] tracking-widest uppercase">
                                          {actor.name || "Unknown"}
                                       </span>
                                    </div>
                                 )}

                                 {/* Gradient overlay */}
                                 <div className="absolute inset-0 bg-linear-to-t from-zinc-950 via-transparent to-transparent opacity-80" />
                              </div>

                              {/* Metadata block */}
                              <div className="p-3 flex flex-col justify-between grow gap-1.5 z-10 border-t border-zinc-800/60">
                                 <h4 className="text-sm text-zinc-100 group-hover:text-zinc-400 transition-colors line-clamp-1 leading-snug">
                                    {actor.name}
                                 </h4>

                                 {characterName && (
                                    <div className="flex items-center gap-1.5">
                                       <p className="text-[11px] text-zinc-400 line-clamp-1 leading-tight">
                                          {characterName}
                                       </p>
                                    </div>
                                 )}
                              </div>
                           </motion.div>
                        </Link>
                     </CarouselItem>
                  );
               })}
            </CarouselContent>

            {/* Carousel navigation controls */}
            <div className="flex gap-2 absolute -top-16 sm:-top-20 right-0">
               <CarouselPrevious className="static translate-y-0 rounded-xs bg-zinc-900/90 hover:bg-zinc-800 border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-white cursor-pointer max-[380px]:w-8 max-[380px]:h-8 w-10 h-10 transition-all" />
               <CarouselNext className="static translate-y-0 rounded-xs bg-zinc-900/90 hover:bg-zinc-800 border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-white cursor-pointer max-[380px]:w-8 max-[380px]:h-8 w-10 h-10 transition-all" />
            </div>
         </Carousel>
      </div>
   );
}
