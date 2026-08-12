"use client";

import { Dialog, DialogContent } from "@/shared/components/ui/dialog";
import { MediaDetails, useGetExtras } from "@/entities/media";
import { useTMDBImagePath } from "@/shared/lib/hooks/useTMDBImagePath";
import { BackgroundImage } from "@/shared/components";
import { LibraryControlButtons } from "@/features/library-controls";
import { CastList } from "@/entities/media/ui/MediaSlide/CastList";
import { getTopCreators } from "@/entities/media/model/useGetMediaCreators";
import { Textarea } from "@/shared/components/ui/textarea";

interface MediaModalProps {
   mediaId: number;
   mediaType: "movie" | "tv";
   initialData: { title: string; backdropPath: string | null };
   onClose: () => void;
}

export function MediaModal({
   mediaId,
   mediaType,
   initialData,
   onClose,
}: MediaModalProps) {
   const tmdbImagePath = useTMDBImagePath();
   const isFullInfo = true;

   const { data: extraMedia, isLoading } = useGetExtras(
      mediaId,
      mediaType,
      isFullInfo,
   );

   const creators = getTopCreators(
      mediaType,
      extraMedia?.createdBy,
      extraMedia?.crew,
   );

   const backGroundSrc = extraMedia?.backdropPath
      ? `${tmdbImagePath}${extraMedia.backdropPath}`
      : initialData.backdropPath;

   const title = extraMedia?.title || initialData.title || "No title";

   return (
      <Dialog
         open={true}
         onOpenChange={(open) => !open && onClose()}
      >
         <DialogContent
            style={{ border: "none", boxShadow: "none", outline: "none" }}
            className="fixed top-1/2 left-1/2! -translate-x-1/2! -translate-y-1/2! w-[90vw]! max-w-[90vw]! lg:w-240! lg:max-w-240! max-h-[90dvh] overflow-y-auto bg-black! border-0! shadow-none! ring-0! outline-none! rounded-none! px-0! py-0! pb-10! sm:pb-20!"
         >
            <div className="flex flex-col relative w-full bg-black">
               <BackgroundImage
                  src={backGroundSrc}
                  alt={title}
                  imageKey={mediaId}
                  aspectRatio="16/9"
               />

               <div className="relative z-20 px-10 sm:px-20 text-white bg-transparent flex flex-col gap-5 -mt-6">
                  <MediaDetails
                     id={mediaId}
                     mediaType={mediaType}
                     media={extraMedia}
                     isLoading={isLoading}
                     logoWidth="w-30 md:w-60 lg:w-70"
                  >
                     <LibraryControlButtons />
                  </MediaDetails>

                  <CastList
                     members={extraMedia?.cast}
                     tmdbImgPath={tmdbImagePath}
                     avatarsCount={5}
                     avatarSize={8}
                     listNum={5}
                     showList={true}
                     type="actors"
                  />
                  <p className=" text-zinc-400 text-[16px]! tracking-wide ">
                     {extraMedia?.overview}
                  </p>
                  <CastList
                     members={creators}
                     tmdbImgPath={tmdbImagePath}
                     showList={true}
                     avatarsCount={5}
                     avatarSize={10}
                     listNum={3}
                     type="creators"
                  />

                  <hr />

                  <div className="flex flex-col gap-5">
                     <h2 className="text-[18px] tracking-wider">
                        My commentary
                     </h2>
                     <Textarea
                        className="border! outline-none! ring-0! focus:outline-none! focus:ring-0! focus-visible:outline-none! focus-visible:ring-0! h-40 rounded-none! px-1! py-1!"
                        placeholder="Type your comment here."
                        autoFocus={false}
                     />
                  </div>
               </div>
            </div>
         </DialogContent>
      </Dialog>
   );
}
