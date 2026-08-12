"use client";

import { useState, ReactNode } from "react";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { useTranslations } from "next-intl";
import { FormattedRuntime, StarRating } from "@/shared/components";
import { formatDate } from "@/shared/lib/format";
import { GenresList } from "./MediaSlide/GenresList";
import { MediaDetails as MediaDetailsType } from "../model/types";

interface MediaDetailsProps {
   id: number;
   mediaType: "movie" | "tv";
   logoWidth?: string;
   children?: ReactNode;
   media?: MediaDetailsType;
   isLoading: boolean;
}

export function MediaDetails({
   id: movieId,
   mediaType,
   logoWidth = "w-40 md:w-80 lg:w-100",
   children,
   media,
   isLoading,
}: MediaDetailsProps) {
   const t = useTranslations();

   const [isImageLoading, setIsImageLoading] = useState(true);

   const {
      title,
      tagline,
      logoPath,
      releaseDate,
      runtime,
      genres,
      rating,
      productionCountries,
      numberOfSeasons,
   } = media || {};

   const mediaHref = `/${mediaType === "tv" ? "tvshow" : mediaType}/${movieId}`;

   return (
      <div
         key={`${mediaType}-${movieId}`}
         className="space-y-3 sm:space-y-5 w-full sm:max-w-2xl animate-[fadeInUp_0.8s_ease-out] will-change-transform"
      >
         {isLoading ? (
            <div>
               <Skeleton className="h-12 w-64 sm:h-16 sm:w-80 md:h-20 md:w-100 bg-white/20 rounded-sm mb-4 sm:mb-8 lg:mb-10" />
               <div className="space-y-2 max-w-xl">
                  <Skeleton className="h-4 bg-white/20 rounded-sm w-3/4" />
                  <Skeleton className="h-4 bg-white/20 rounded-sm w-2/4" />
               </div>
               <div className="flex items-center gap-2 sm:gap-3 mt-3 sm:mt-4">
                  <Skeleton className="h-4 w-8 bg-white/20 rounded-sm" />
                  <span className="text-white/20">|</span>
                  <Skeleton className="h-4 w-11 bg-white/20 rounded-sm" />
                  <span className="text-white/20">|</span>
                  <Skeleton className="h-4 w-14 bg-white/20 rounded-sm" />
                  <span className="text-white/20">|</span>
                  <Skeleton className="h-4 w-14 bg-white/20 rounded-sm" />
               </div>
               <div className="flex items-center gap-2 sm:gap-3 mt-3 sm:mt-4">
                  <Skeleton className="h-7 w-1/5 bg-white/20 rounded-sm" />
                  <Skeleton className="h-6 w-1/3 bg-white/20 rounded-sm" />
               </div>
            </div>
         ) : (
            <>
               {logoPath ? (
                  <div
                     className={`mb-3 sm:mb-6 lg:mb-8 origin-bottom-left ${
                        isImageLoading ? "opacity-0" : "opacity-100"
                     } transition-opacity duration-300`}
                  >
                     <Link
                        href={mediaHref}
                        className="block group transition-transform duration-500 hover:scale-102 active:scale-95 w-fit"
                     >
                        <Image
                           src={`https://image.tmdb.org/t/p/w500/${logoPath}`}
                           alt={title || "Media title"}
                           width={200}
                           height={240}
                           priority
                           onLoad={() => {
                              setIsImageLoading(false);
                           }}
                           className={`select-none  h-auto object-contain drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)] ${logoWidth}`}
                        />
                     </Link>
                  </div>
               ) : (
                  <Link
                     href={mediaHref}
                     className="block group w-fit"
                  >
                     <h1 className="text-2xl sm:text-3xl bg-linear-to-r from-zinc-100 via-zinc-400 to-zinc-600 bg-clip-text animate-shimmer hover:scale-102 lg:text-5xl font-bold text-white mb-4 sm:mb-8 lg:mb-12">
                        {title}
                     </h1>
                  </Link>
               )}

               {/* media info */}
               <div className="flex flex-col gap-2 text-white/50">
                  {/* tagline */}
                  {tagline && (
                     <p className="text-sm italic sm:text-base md:text-lg leading-relaxed text-white/90 drop-shadow-lg line-clamp-3 sm:line-clamp-4 max-w-xl">
                        {tagline}
                     </p>
                  )}
                  {/* genres */}
                  {genres && genres.length > 0 && (
                     <GenresList
                        genreIds={genres.map((g: { id: number }) => g.id)}
                     />
                  )}

                  {/* rating, release date, runtime, production countries */}
                  <div className="flex items-center flex-wrap tracking-tighter gap-2 mb-3 sm:mb-4 font-medium drop-shadow-md text-sm cursor-default">
                     {/* rating */}
                     {Number(rating) > 0 && (
                        <>
                           <StarRating
                              text={`${rating && Number(rating).toFixed(1)}`}
                           />
                           <span className="text-white/20">|</span>
                        </>
                     )}
                     {/* release date */}
                     {releaseDate && <span>{formatDate(releaseDate)}</span>}

                     {/* if movie - runtime */}
                     {mediaType === "movie" && runtime ? (
                        <>
                           <span className="text-white/20">|</span>
                           <FormattedRuntime runtime={runtime} />
                        </>
                     ) : null}

                     {/* if tv - number of seasons */}
                     {mediaType === "tv" && numberOfSeasons ? (
                        <>
                           <span className="text-white/20">|</span>
                           <span>
                              {t("mediaDetail.season", {
                                 count: numberOfSeasons,
                              })}
                           </span>
                        </>
                     ) : null}

                     {/* production countries */}
                     {productionCountries && (
                        <>
                           <span className="text-white/20">|</span>
                           <span>
                              {productionCountries
                                 .map((c) => c.iso_3166_1)
                                 .join(", ")}
                           </span>
                        </>
                     )}
                  </div>

                  {children}
               </div>
            </>
         )}
      </div>
   );
}
