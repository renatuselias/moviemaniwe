"use client";

import { useState, useEffect, ReactNode } from "react";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { getMediaExtras } from "../api/getMediaExtras";
import { Skeleton } from "@/shared/ui/shadcn/ui/skeleton";
import { useTranslations } from "next-intl";
import StarRating from "@/shared/ui/components/StarRating";
import { formatRuntime } from "@/shared/lib/utils/format-runtime";
import { ALL_GENRES } from "@/shared/config/tmdb-genres";

interface MediaDetailsProps {
   id: number;
   title: string;
   rating: string | number;
   mediaType: "movie" | "tv";
   children?: ReactNode;
}

type MediaExtras = Awaited<ReturnType<typeof getMediaExtras>>;

export function MediaDetails({
   id: movieId,
   title,
   rating,
   mediaType,
   children,
}: MediaDetailsProps) {
   const t = useTranslations();

   const [isImageLoading, setIsImageLoading] = useState(true);
   const [extras, setExtras] = useState<MediaExtras | null>(null);
   const [extrasLoading, setExtrasLoading] = useState(true);
   const [isVertical, setIsVertical] = useState(false);

   useEffect(() => {
      let isMounted = true;

      async function fetchExtras() {
         setExtrasLoading(true);
         setIsImageLoading(true);
         try {
            const data = await getMediaExtras(movieId, mediaType);
            if (isMounted) setExtras(data);
         } catch (error) {
            console.error("Failed to load extras:", error);
         } finally {
            if (isMounted) setExtrasLoading(false);
         }
      }

      fetchExtras();

      return () => {
         isMounted = false;
      };
   }, [movieId, mediaType]);

   const {
      tagline,
      logo_path,
      release_date,
      runtime,
      genres,
      origin_country: country,
      numberOfSeasons,
   } = extras || {};

   const mediaHref = `/${mediaType === "tv" ? "tvshow" : mediaType}/${movieId}`;

   return (
      <div
         key={`${mediaType}-${movieId}`}
         className="space-y-3 sm:space-y-5 w-full max-w-2xl animate-[fadeInUp_0.8s_ease-out] will-change-transform"
      >
         {extrasLoading ? (
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
            </div>
         ) : (
            <>
               {logo_path ? (
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
                           src={`https://image.tmdb.org/t/p/w500/${logo_path}`}
                           alt={title}
                           width={200}
                           height={240}
                           priority
                           onLoad={(event) => {
                              setIsImageLoading(false);
                              const img = event.currentTarget;
                              setIsVertical(img.naturalHeight > 350);
                           }}
                           className={`select-none w-64 sm:w-80 md:w-100 h-auto object-contain drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)] ${
                              isVertical
                                 ? "max-w-40 sm:max-w-60"
                                 : "w-64 sm:w-80"
                           }`}
                        />
                     </Link>
                  </div>
               ) : (
                  <Link
                     href={mediaHref}
                     className="block group w-fit"
                  >
                     <h1 className="text-3xl bg-linear-to-r from-zinc-100 via-zinc-400 to-zinc-600 bg-clip-text animate-shimmer hover:scale-102 lg:text-5xl font-bold text-white mb-4 sm:mb-8 lg:mb-12">
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
                     <ul className="flex flex-wrap items-center gap-2 text-white/70 tracking-tighter cursor-pointer">
                        {genres.map((genre: { id: number }, index: number) => (
                           <li
                              key={genre.id}
                              className="flex items-center max-[450px]:gap-0 gap-2 max-[450px]:text-xs text-[16px]"
                           >
                              {index > 0 && (
                                 <span className="max-[450px]:hidden block text-white/30 -mt-0.5 select-none text-3xl">
                                    •
                                 </span>
                              )}
                              <span>{t(`genres.${ALL_GENRES[genre.id]}`)}</span>
                           </li>
                        ))}
                     </ul>
                  )}

                  {/* rating, release date, runtime, production countries */}
                  <div className="flex items-center tracking-tighter gap-2 mb-3 sm:mb-4 font-medium drop-shadow-md text-sm cursor-default">
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
                     {release_date && <span>{release_date.split("-")[0]}</span>}

                     {/* if movie - runtime */}
                     {mediaType === "movie" && runtime ? (
                        <>
                           <span className="text-white/20">|</span>
                           <span>
                              {(() => {
                                 const { hour, minute } =
                                    formatRuntime(runtime);
                                 return hour > 0
                                    ? `${hour}${t("mediaDetail.hour")} ${minute}${t("mediaDetail.minute")}`
                                    : `${minute}${t("mediaDetail.minute")}`;
                              })()}
                           </span>
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
                     {country && (
                        <>
                           <span className="text-white/20">|</span>
                           <span>{country}</span>
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
