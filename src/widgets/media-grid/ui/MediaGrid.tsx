"use client";

import { useState, useCallback } from "react";
import { MediaCard } from "@/entities/media";
import { ContentTitle } from "@/shared/components";
import { MediaModal } from "@/widgets/media-modal";
import { BaseMedia, MediaParams } from "@/entities/media";
import { useMedia } from "@/entities/media";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { useTranslations } from "next-intl";

export type ExtendedMedia = BaseMedia & {
   poster_path?: string;
   name?: string;
   genre_ids?: number[];
   overview?: string;
   vote_average?: number;
};

interface MediaGridProps {
   media?: ExtendedMedia[];
   mediaCount?: number;
   title: string;
   subtitle: string;
   mediaType?: "movie" | "tv" | "all";
   params?: MediaParams;
   isMediaPage?: boolean;
}

export function MediaGrid({
   media: initialMedia,
   mediaCount = 12,
   title,
   subtitle,
   mediaType = "movie",
   params,
   isMediaPage = false,
}: MediaGridProps) {
   const t = useTranslations("mediaDetail");

   const [selectedItem, setSelectedItem] = useState<ExtendedMedia | null>(null);

   const shouldFetch = Boolean(params) && !initialMedia;

   const { data: fetchResult = [], isLoading } = useMedia({
      ...params,
      mediaType,
      isCarousel: false,
      enabled: shouldFetch,
   });

   // 2. Приводим fetchResult к ExtendedMedia[], чтобы mediaList был единого типа
   const mediaList: ExtendedMedia[] =
      initialMedia || (fetchResult as ExtendedMedia[]);

   const handleCloseModal = useCallback(() => {
      setSelectedItem(null);
   }, []);

   const showSkeleton = isLoading && mediaList.length === 0;

   return !isLoading && mediaList.length === 0 ? null : (
      <section className="w-full flex flex-col gap-5 sm:gap-10">
         {isMediaPage ? (
            <h2 className="text-lg font-mono uppercase tracking-wide text-zinc-100 font-bold">
               {t("recommendations")}
            </h2>
         ) : (
            <ContentTitle
               title={title}
               subtitle={subtitle}
            />
         )}

         <div className="grid grid-cols-3 sm:grid-cols-6 gap-0">
            {showSkeleton
               ? Array.from({ length: mediaCount }).map((_, index) => (
                    <Skeleton
                       key={index}
                       className="aspect-2/3 border border-zinc-800/30 w-full rounded-none"
                    />
                 ))
               : mediaList.slice(0, mediaCount).map((item) => (
                    <MediaCard
                       key={item.id}
                       genre_ids={item?.genre_ids || []}
                       overview={item?.overview || ""}
                       rating={item?.rating || item?.vote_average || 0}
                       title={item.title || item.name || ""}
                       posterPath={item.posterPath || item.poster_path || null}
                       onClick={() => setSelectedItem(item)}
                    />
                 ))}
         </div>

         {selectedItem && (
            <MediaModal
               mediaId={selectedItem.id}
               mediaType={selectedItem.mediaType || mediaType}
               initialData={{
                  title: selectedItem.title || selectedItem.name || "",
                  backdropPath: selectedItem.backdropPath,
               }}
               onClose={handleCloseModal}
            />
         )}
      </section>
   );
}
