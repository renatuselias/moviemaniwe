"use client";

import { useMemo } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Calendar, Clock, Star, Tag, Globe } from "lucide-react";

import { getTopCreators, MediaFullInfo as MediaProps } from "@/entities/media";
import { ALL_GENRES } from "@/shared/config/tmdb-genres";

import { MediaPoster } from "./MediaPoster";
import { MediaFinancials } from "./MediaFinancials";
import { MediaCompanies } from "./MediaCompanies";
import { MediaCreators } from "./MediaCreators";
import { formatDate } from "@/shared/lib/format";
import { MediaCast } from "@/widgets/media-cast/ui/MediaCast";
import { Skeleton } from "@/shared/components/ui/skeleton";

export function MediaFullInfo({
   media,
   mediaType,
   isLoading,
}: {
   media: MediaProps;
   mediaType: "movie" | "tv";
   isLoading: boolean;
}) {
   const currentLocale = useLocale();
   const t = useTranslations();

   const creators = useMemo(() => {
      return getTopCreators(mediaType, media?.createdBy, media?.crew, 7);
   }, [mediaType, media?.createdBy, media?.crew]);

   return (
      <div className="w-full flex flex-col gap-18 md:gap-24 lg:gap-44 text-zinc-200">
         <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-20 items-start border-b pb-6">
            <MediaPoster
               posterPath={media.posterPath || ""}
               title={media.title}
            />

            <div className="md:col-span-8 lg:col-span-9 flex flex-col gap-6">
               {media?.status && (
                  <div className="inline-flex w-fit items-center gap-2 px-3 py-1 rounded-xs bg-emerald-950/40 border border-emerald-800/60 text-xs font-mono font-semibold text-emerald-400 uppercase tracking-wider">
                     <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                     </span>
                     {media.status}
                  </div>
               )}

               <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                  {media?.rating
                     ? media?.rating > 0 && (
                          <div className="flex items-center gap-1.5 px-3 py-1 rounded-xs bg-amber-950/30 border border-amber-800/50 text-amber-400 font-mono text-xs font-semibold">
                             <Star className="w-3.5 h-3.5 fill-amber-400" />
                             <span>{media.rating.toFixed(1)}</span>
                          </div>
                       )
                     : null}
                  {media?.releaseDate && (
                     <div className="flex items-center gap-1.5 px-3 py-1 rounded-xs bg-zinc-900/60 border border-zinc-800 text-zinc-300 font-mono text-xs">
                        <Calendar className="w-3.5 h-3.5 text-zinc-500" />
                        <span>
                           {formatDate(
                              media.releaseDate,
                              "full",
                              currentLocale,
                           )}
                        </span>
                     </div>
                  )}
                  {media?.runtime > 0 && (
                     <div className="flex items-center gap-1.5 px-3 py-1 rounded-xs bg-zinc-900/60 border border-zinc-800 text-zinc-300 font-mono text-xs">
                        <Clock className="w-3.5 h-3.5 text-zinc-500" />
                        <span>{`${media.runtime} ${t("mediaDetail.minute")}`}</span>
                     </div>
                  )}
               </div>

               {media?.genres?.length > 0 && (
                  <div className="space-y-1.5">
                     <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest text-zinc-500">
                        <Tag className="w-3 h-3" />
                        <span>{t("genres.genres")}</span>
                     </div>
                     <div className="flex flex-wrap gap-1.5">
                        {media.genres.map((genre) => (
                           <span
                              key={genre.id}
                              className="px-2.5 py-1 text-xs font-mono rounded-xs border border-zinc-800 bg-zinc-950/40 text-zinc-300 hover:border-zinc-700 transition-colors"
                           >
                              {t(`genres.${ALL_GENRES[genre.id]}`)}
                           </span>
                        ))}
                     </div>
                  </div>
               )}

               {media?.productionCountries?.length > 0 && (
                  <div className="space-y-1.5">
                     <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest text-zinc-500">
                        <Globe className="w-3 h-3" />
                        <span>{t("mediaDetail.productionCountries")}</span>
                     </div>
                     <div className="flex flex-wrap gap-1.5">
                        {media.productionCountries.map((country) => (
                           <span
                              key={country.iso_3166_1}
                              className="px-2.5 py-1 text-xs font-mono rounded-xs border border-zinc-800/80 bg-zinc-900/30 text-zinc-400"
                           >
                              {country.name}
                           </span>
                        ))}
                     </div>
                  </div>
               )}

               <div className="flex gap-10 items-end flex-wrap">
                  {mediaType === "movie" && (
                     <MediaFinancials
                        budget={media.budget}
                        revenue={media.revenue}
                        locale={currentLocale}
                     />
                  )}
                  <MediaCompanies companies={media.productionCompanies} />
               </div>

               <MediaCreators creators={creators} />
            </div>
         </div>

         {isLoading ? (
            <div className="flex flex-col gap-1.5">
               <Skeleton className="max-w-40 h-5 mb-4" />
               <Skeleton className="max-w-5xl h-4" />
               <Skeleton className="max-w-5xl h-4" />
               <Skeleton className="max-w-2xl h-4" />
            </div>
         ) : (
            media?.overview && (
               <div className="space-y-2">
                  <h3 className="text-lg font-mono uppercase tracking-wider text-zinc-100 font-bold">
                     {t("mediaDetail.overview")}
                  </h3>
                  <p className="text-zinc-300 text-base leading-relaxed font-normal max-w-5xl">
                     {media.overview}
                  </p>
               </div>
            )
         )}

         {media?.cast?.length > 0 && <MediaCast mediaCast={media.cast} />}
      </div>
   );
}
