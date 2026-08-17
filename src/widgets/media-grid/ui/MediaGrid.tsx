"use client";

import { useState, useCallback } from "react";
import { MediaCard } from "@/entities/media";
import { ContentTitle } from "@/shared/components";
import { MediaModal } from "@/widgets/media-modal";
import { BaseMedia, MediaParams } from "@/entities/media/model/types";
import { useMedia } from "@/entities/media/model/useMedia";
import { Skeleton } from "@/shared/components/ui/skeleton";

export interface MediaGridProps {
   media?: BaseMedia[];
   mediaCount?: number;
   title: string;
   subtitle: string;
   mediaType?: "movie" | "tv" | "all";
   params?: MediaParams;
}

export function MediaGrid({
   media: initialMedia,
   mediaCount = 12,
   title,
   subtitle,
   mediaType = "movie",
   params,
}: MediaGridProps) {
   const [selectedItem, setSelectedItem] = useState<BaseMedia | null>(null);

   // fetch media only if there are params and upset initialMedia
   const shouldFetch = Boolean(params) && !initialMedia;

   const { data: fetchResult = [], isLoading } = useMedia({
      ...params,
      mediaType,
      isCarousel: false,
      enabled: shouldFetch,
   });

   const mediaList = initialMedia || fetchResult;

   const handleCloseModal = useCallback(() => {
      setSelectedItem(null);
   }, []);

   const showSkeleton = isLoading && mediaList.length === 0;

   return !isLoading && mediaList.length === 0 ? null : (
      <section className="w-full flex flex-col gap-5 sm:gap-10">
         <ContentTitle
            title={title}
            subtitle={subtitle}
         />

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
                       title={item.title}
                       posterPath={item.posterPath}
                       onClick={() => setSelectedItem(item)}
                    />
                 ))}
         </div>

         {selectedItem && (
            <MediaModal
               mediaId={selectedItem.id}
               mediaType={selectedItem.mediaType || mediaType}
               initialData={{
                  title: selectedItem.title,
                  backdropPath: selectedItem.backdropPath,
               }}
               onClose={handleCloseModal}
            />
         )}
      </section>
   );
}
