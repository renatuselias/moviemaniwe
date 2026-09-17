"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useTranslations } from "next-intl";

interface BackgroundImageProps {
   src: string | null;
   alt: string;
   imageKey?: string | number;
   loadingText?: string;
   aspectRatio?: string;
}

const globalLoadedImages = new Set<string>();

export function BackgroundImage({
   src,
   alt,
   imageKey,
   loadingText = "Loading...",
   aspectRatio,
}: BackgroundImageProps) {
   const t = useTranslations();

   const isSrc = Boolean(src && !src.includes("null"));
   const validSrc = isSrc ? (src as string) : null;

   const [prevSrc, setPrevSrc] = useState(src);
   const [isLoading, setIsLoading] = useState(() =>
      validSrc ? !globalLoadedImages.has(validSrc) : false,
   );

   if (prevSrc !== src) {
      setPrevSrc(src);
      setIsLoading(validSrc ? !globalLoadedImages.has(validSrc) : false);
   }

   const handleImageLoad = () => {
      if (validSrc) {
         globalLoadedImages.add(validSrc);
      }
      setIsLoading(false);
   };

   const containerClasses = aspectRatio
      ? `relative w-full overflow-hidden select-none shrink-0 bg-black`
      : `absolute inset-0 bg-black overflow-hidden pointer-events-none z-0`;

   return (
      <div
         className={containerClasses}
         style={aspectRatio ? { aspectRatio } : undefined}
      >
         <div className="relative h-full w-full isolate transform-gpu">
            {/* Pulsing Loader */}
            <AnimatePresence mode="wait">
               {isLoading && validSrc && (
                  <motion.div
                     key={`loader-${validSrc}`}
                     initial={{ opacity: 0 }}
                     animate={{ opacity: 1 }}
                     exit={{ opacity: 0 }}
                     transition={{ delay: 0.3 }}
                     className="absolute inset-0 bg-black overflow-hidden z-20"
                  >
                     <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/15 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
                     <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                        <div className="relative">
                           <div className="w-14 h-14 rounded-full border-4 border-white/10 border-t-white/90 animate-spin shadow-[0_0_20px_rgba(255,255,255,0.1)]" />
                           <div className="absolute inset-0 blur-lg bg-white/5 rounded-full" />
                        </div>
                        <span className="text-xs font-bold uppercase tracking-[0.3em] text-white/40 animate-pulse">
                           {loadingText}
                        </span>
                     </div>
                  </motion.div>
               )}
            </AnimatePresence>

            {/* Image (z-0) */}
            <AnimatePresence mode="popLayout">
               <motion.div
                  key={imageKey || validSrc || "no-src"}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                  className="absolute inset-0 z-0 transform-gpu backface-hidden"
               >
                  {validSrc ? (
                     <Image
                        src={validSrc}
                        alt={alt}
                        fill
                        priority={true}
                        quality={90}
                        className="object-cover select-none object-top animate-kenburns"
                        sizes={
                           aspectRatio
                              ? "(max-width: 640px) 92vw, 50vw"
                              : "100vw"
                        }
                        draggable={false}
                        onLoad={handleImageLoad}
                     />
                  ) : (
                     <div className="absolute inset-0 flex items-center justify-center text-white/60 text-xl tracking-widest select-none font-bold bg-black/70">
                        {t("common.noBackground")}
                     </div>
                  )}
               </motion.div>
            </AnimatePresence>
            <div className="absolute inset-0 bg-linear-to-l from-black/60 via-transparent to-transparent z-20 pointer-events-none" />
            <div className="absolute inset-x-0 -bottom-0.5 h-[calc(75%+2px)] bg-linear-to-t from-black via-black/90 via-30% to-transparent z-20 pointer-events-none scale-[1.01] transform-gpu" />
            <div className="absolute inset-0 bg-linear-to-r from-black/60 via-transparent to-transparent z-20 pointer-events-none" />
         </div>
      </div>
   );
}
