"use client";

import { useEffect, useRef, useMemo } from "react";
import { Dialog, DialogContent } from "@/shared/components/ui/dialog";
import { useGetExtras } from "@/entities/media";
import { useTMDBImagePath } from "@/shared/lib/hooks/useTMDBImagePath";
import { BackgroundImage } from "@/shared/components";
import { LibraryControlButtons } from "@/features/library-controls";
import { CastList } from "@/entities/media";
import { getTopCreators } from "@/entities/media";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { MediaDetails } from "@/widgets/media-details";
import { useTranslations } from "next-intl";

interface MediaModalProps {
   mediaId: number;
   mediaType: "movie" | "tv";
   initialData?: { title: string; backdropPath: string | null };
   onClose: () => void;
}

export function MediaModal({
   mediaId,
   mediaType,
   initialData,
   onClose,
}: MediaModalProps) {
   const t = useTranslations("mediaDetail");
   const tmdbImagePath = useTMDBImagePath();

   const contentRef = useRef<HTMLDivElement>(null);

   const { data: extraMedia, isLoading } = useGetExtras(mediaId, mediaType);

   const creators = useMemo(() => {
      return getTopCreators(mediaType, extraMedia?.createdBy, extraMedia?.crew);
   }, [mediaType, extraMedia?.createdBy, extraMedia?.crew]);

   const backGroundSrc = useMemo(() => {
      const path = extraMedia?.backdropPath || initialData?.backdropPath;
      return path ? `${tmdbImagePath}${path}` : null;
   }, [extraMedia?.backdropPath, initialData?.backdropPath, tmdbImagePath]);

   const title = extraMedia?.title || initialData?.title || "No title";

   useEffect(() => {
      const timer = setTimeout(() => {
         if (contentRef.current) {
            contentRef.current.scrollTop = 0;
            contentRef.current.focus({ preventScroll: true });
         }
      }, 0);

      return () => clearTimeout(timer);
   }, [mediaId]);

   return (
      <Dialog
         open={true}
         onOpenChange={(open) => !open && onClose()}
      >
         <DialogContent
            ref={contentRef}
            tabIndex={-1}
            style={{ border: "none", boxShadow: "none", outline: "none" }}
            className="fixed top-1/2 left-1/2! -translate-x-1/2! -translate-y-1/2! w-[90vw]! max-w-[90vw]! lg:w-240! lg:max-w-240! max-h-[90dvh] overflow-y-auto bg-black! border-0! shadow-none! ring-0! outline-none! focus:outline-none! focus-visible:outline-none! rounded-none! px-0! py-0! pb-10! sm:pb-20!"
         >
            <div className="flex flex-col relative w-full bg-black">
               {isLoading ? (
                  <Skeleton
                     className="w-full aspect-video bg-black"
                     aria-hidden="true"
                  />
               ) : (
                  <BackgroundImage
                     src={backGroundSrc}
                     alt={title}
                     imageKey={mediaId}
                     aspectRatio="16/9"
                  />
               )}

               <div
                  className={`relative z-20 px-7 md:px-20 text-white bg-transparent flex flex-col gap-5 ${backGroundSrc || isLoading ? "-mt-6 md:-mt-50" : "mt-10 sm:mt-20"}`}
               >
                  <div className="grid w-full grid-cols-1 gap-6 lg:grid-cols-12 lg:items-end">
                     <div className="lg:col-span-8 xl:col-span-9">
                        <MediaDetails
                           id={mediaId}
                           mediaType={mediaType}
                           media={extraMedia}
                           isLoading={isLoading}
                           logoWidth="w-30 md:w-60 lg:w-70"
                        >
                           <LibraryControlButtons className="mt-2" />
                        </MediaDetails>
                     </div>

                     <div className="flex items-end justify-start lg:col-span-4 lg:justify-end xl:col-span-3">
                        <CastList
                           members={extraMedia?.cast}
                           tmdbImgPath={tmdbImagePath}
                           avatarsCount={5}
                           avatarSize={8}
                           listNum={5}
                           showList={true}
                           type="actors"
                           isLoading={isLoading}
                           isSlide={false}
                        />
                     </div>
                  </div>

                  {extraMedia?.overview && (
                     <div className="flex flex-col gap-2">
                        <h2 className="text-[18px] text-zinc-300">
                           {t("overview")}
                        </h2>
                        {isLoading ? (
                           <div className="flex flex-col gap-2">
                              <Skeleton className="w-full h-4" />
                              <Skeleton className="w-full h-4" />
                              <Skeleton className="w-3/4 h-4" />
                           </div>
                        ) : (
                           <p className="text-zinc-400 text-[16px]! tracking-wide line-clamp-3">
                              {extraMedia?.overview}
                           </p>
                        )}
                     </div>
                  )}

                  <CastList
                     members={creators}
                     tmdbImgPath={tmdbImagePath}
                     showList={true}
                     avatarsCount={3}
                     avatarSize={8}
                     listNum={3}
                     type="creators"
                     isLoading={isLoading}
                     isSlide={false}
                  />

                  <hr className="border-zinc-800" />

                  {/* <div className="flex flex-col gap-5">
                     <h2 className="text-[18px] text-zinc-300">
                        My commentary
                     </h2>
                     <Textarea
                        className="border! border-zinc-800! outline-none! ring-0! focus:outline-none! focus:ring-0! focus-visible:outline-none! focus-visible:ring-0! h-40 rounded-none! px-3! py-2! bg-zinc-950/50"
                        placeholder="Type your comment here."
                        autoFocus={false}
                     />
                  </div> */}
               </div>
            </div>
         </DialogContent>
      </Dialog>
   );
}
