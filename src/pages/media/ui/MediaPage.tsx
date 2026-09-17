"use client";

import { useGetExtras } from "@/entities/media";
import { BackgroundImage } from "@/shared/components";
import { useTMDBImagePath } from "@/shared/lib/hooks/useTMDBImagePath";
import { useIsMobile } from "@/shared/lib/hooks/useWindowSize";
import { MediaDetails } from "@/widgets/media-details";
import { MediaFullInfo } from "@/widgets/media-full-info";
import { MediaGrid } from "@/widgets/media-grid";
import { useTranslations } from "next-intl";

export function MediaPage({
   mediaType,
   mediaId,
}: {
   mediaType: "movie" | "tv";
   mediaId: number;
}) {
   const isMobile = useIsMobile();
   const t = useTranslations();

   const { data: media, isLoading } = useGetExtras(mediaId, mediaType);

   const tmdbImgPath = useTMDBImagePath();
   const backdrop = `${tmdbImgPath}${isMobile ? media?.posterPath : media?.backdropPath}`;
   const altTitle = media?.title || mediaId;

   return (
      <div className="w-full">
         <div className="flex-1 min-h-[70vh] sm:min-h-screen relative flex flex-col justify-end bg-black lg:bg-[#010101]">
            <BackgroundImage
               src={backdrop}
               alt={altTitle}
               imageKey={mediaId}
               loadingText={t("loaders.loadingPoster")}
            />
            <div className="relative z-30 w-full px-4 sm:px-8 pt-20 lg:pt-24 pb-4 sm:pb-6 md:pb-8">
               <MediaDetails
                  id={mediaId}
                  mediaType={mediaType}
                  media={media}
                  isLoading={isLoading}
                  isMediaPage={true}
               />
            </div>
         </div>

         <div className="w-full max-w-375 px-4 sm:px-8 mx-auto space-y-20 md:space-y-48 mt-12 sm:mt-16 lg:mt-52">
            <MediaFullInfo
               media={media}
               mediaType={mediaType}
               isLoading={isLoading}
            />

            <MediaGrid
               title=""
               subtitle=""
               media={media?.recommendations}
               mediaType={mediaType}
               isMediaPage={true}
            />
         </div>
      </div>
   );
}
