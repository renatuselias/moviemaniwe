"use client";

import { useState } from "react";
import { MediaCard } from "@/entities/media";
import { ContentTitle } from "@/shared/components";
import { MediaModal } from "@/widgets/media-modal";
import { TrendingMedia } from "@/entities/media/model/types";

interface MediaGridProps {
   media: TrendingMedia[];
   mediaCount?: number;
   title: string;
   subtitle: string;
}

export function MediaGrid({
   media = [],
   mediaCount = 12,
   title,
   subtitle,
}: MediaGridProps) {
   const [selectedItem, setSelectedItem] = useState<TrendingMedia | null>(null);

   return (
      <section className="w-full flex flex-col gap-5 sm:gap-10">
         <ContentTitle
            title={title}
            subtitle={subtitle}
         />

         <div className="grid grid-cols-3 sm:grid-cols-6 gap-0">
            {media.slice(0, mediaCount).map((item) => (
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
               mediaType={selectedItem.mediaType}
               initialData={{
                  title: title,
                  backdropPath: selectedItem.backdropPath,
               }}
               onClose={() => setSelectedItem(null)}
            />
         )}
      </section>
   );
}
