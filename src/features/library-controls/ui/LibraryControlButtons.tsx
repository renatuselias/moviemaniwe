"use client";

import { useState } from "react";
import { Bookmark, Eye, Heart } from "lucide-react";
import {
   Tooltip,
   TooltipContent,
   TooltipProvider,
   TooltipTrigger,
} from "@/shared/ui/shadcn/ui/tooltip";
import { useTranslations } from "next-intl";
import { cn } from "@/shared/lib/utils";

interface LibraryControlButtonsProps {
   initialWatched?: boolean;
   initialFavorite?: boolean;
   initialBookmarked?: boolean;
   className?: string;
}

export function LibraryControlButtons({
   initialWatched = false,
   initialFavorite = false,
   initialBookmarked = false,
   className,
}: LibraryControlButtonsProps) {
   const t = useTranslations("libraryButtons");

   const [isWatched, setIsWatched] = useState(initialWatched);
   const [isFavorite, setIsFavorite] = useState(initialFavorite);
   const [isBookmarked, setIsBookmarked] = useState(initialBookmarked);

   const toggleWatched = (e: React.MouseEvent) => {
      e.preventDefault();
      setIsWatched((prev) => !prev);
   };

   const toggleFavorite = (e: React.MouseEvent) => {
      e.preventDefault();
      setIsFavorite((prev) => !prev);
   };

   const toggleBookmarked = (e: React.MouseEvent) => {
      e.preventDefault();
      setIsBookmarked((prev) => !prev);
   };

   const buttonSize = 8;
   const iconSize = 4;

   return (
      <TooltipProvider delay={200}>
         <div className={cn("flex items-center gap-1.5 sm:gap-2", className)}>
            <Tooltip>
               <TooltipTrigger>
                  <div
                     onClick={toggleWatched}
                     aria-label="Toggle watched"
                     className={cn(
                        `cursor-pointer flex items-center justify-center h-${buttonSize} w-${buttonSize} rounded-sm backdrop-blur-md transition-all duration-300`,
                        isWatched
                           ? "bg-black/40 text-white/70 border border-white/20"
                           : "bg-black/40 text-white/70 hover:bg-black/30 hover:text-zinc-500 border border-white/10",
                     )}
                  >
                     <Eye
                        className={cn(
                           `h-${iconSize} w-${iconSize} transition-transform active:scale-90`,
                           isWatched && `fill-white/90 text-zinc-800`,
                        )}
                        strokeWidth={1}
                     />
                  </div>
               </TooltipTrigger>
               <TooltipContent side="top">
                  <p>{isWatched ? t("watched") : t("addToWatched")}</p>
               </TooltipContent>
            </Tooltip>

            <Tooltip>
               <TooltipTrigger>
                  <div
                     onClick={toggleFavorite}
                     aria-label="Toggle favorite"
                     className={cn(
                        `cursor-pointer flex justify-center items-center h-${buttonSize} w-${buttonSize} rounded-sm backdrop-blur-md transition-all duration-300`,
                        isFavorite
                           ? "bg-rose-500/10 text-rose-500 hover:bg-rose-500/30 border border-rose-500/40"
                           : "bg-black/40 text-white/70 hover:bg-black/60 hover:text-rose-400 border border-white/10",
                     )}
                  >
                     <Heart
                        className={cn(
                           `h-${iconSize} w-${iconSize} transition-transform active:scale-90`,
                           isFavorite && "fill-rose-500 text-rose-500",
                        )}
                        strokeWidth={1}
                     />
                  </div>
               </TooltipTrigger>
               <TooltipContent side="top">
                  <p>{isFavorite ? t("favorite") : t("addToFavorite")}</p>
               </TooltipContent>
            </Tooltip>

            <Tooltip>
               <TooltipTrigger>
                  <div
                     onClick={toggleBookmarked}
                     aria-label="Toggle bookmark"
                     className={cn(
                        `cursor-pointer flex justify-center items-center h-${buttonSize} w-${buttonSize} rounded-sm backdrop-blur-md transition-all duration-300`,
                        isBookmarked
                           ? "bg-black/40 text-white/70 border border-white/20"
                           : "bg-black/40 text-white/70 hover:bg-black/60 hover:text-zinc-500 border border-white/10",
                     )}
                  >
                     <Bookmark
                        className={cn(
                           `h-${iconSize} w-${iconSize} transition-transform active:scale-90`,
                           isBookmarked && "fill-white/90 text-zinc-500",
                        )}
                        strokeWidth={1}
                     />
                  </div>
               </TooltipTrigger>
               <TooltipContent side="top">
                  <p>{isBookmarked ? t("wishlist") : t("addToWishlist")}</p>
               </TooltipContent>
            </Tooltip>
         </div>
      </TooltipProvider>
   );
}
