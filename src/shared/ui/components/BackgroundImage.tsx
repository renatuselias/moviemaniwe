"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useTranslations } from "next-intl";

interface BackgroundImageProps {
   src: string;
   alt: string;
   imageKey?: string | number;
   loadingText?: string;
   animation?: boolean;
}

const globalLoadedImages = new Set<string>();

export default function BackgroundImage({
   src,
   alt,
   imageKey,
   loadingText = "Loading...",
}: BackgroundImageProps) {
   const t = useTranslations();

   const [prevSrc, setPrevSrc] = useState(src);
   const [isLoading, setIsLoading] = useState(
      () => !globalLoadedImages.has(src),
   );

   if (prevSrc !== src) {
      setPrevSrc(src);
      setIsLoading(!globalLoadedImages.has(src));
   }

   const handleImageLoad = () => {
      globalLoadedImages.add(src);
      setIsLoading(false);
   };

   const isSrc = Boolean(src && !src.includes("null"));

   return (
      <div className="absolute inset-x-0 top-0 h-[75dvh] lg:h-full lg:inset-0 bg-black lg:bg-transparent overflow-hidden pointer-events-none z-0">
         <div className="relative h-full w-full">
            {/* Pulsing Loader */}
            <AnimatePresence mode="wait">
               {isLoading && isSrc && (
                  <motion.div
                     key={`loader-${src}`}
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

            {/* Image */}
            <AnimatePresence mode="popLayout">
               <motion.div
                  key={imageKey || src}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                  className="absolute inset-0"
               >
                  <Image
                     src={src}
                     alt={alt}
                     fill
                     priority={true}
                     quality={90}
                     className="object-cover select-none object-top animate-kenburns"
                     sizes="100vw"
                     draggable={false}
                     onLoad={handleImageLoad}
                  />

                  {!isSrc && (
                     <div className="absolute inset-0 flex items-center justify-center text-white/60 text-xl tracking-widest select-none font-bold bg-black/70">
                        {t("common.noBackground")}
                     </div>
                  )}
               </motion.div>
            </AnimatePresence>

            {/* Optimized Overlay System */}
            <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-black/20 lg:from-[#010101] z-10" />
            <div className="absolute inset-0 bg-linear-to-l from-black/60 via-transparent to-transparent lg:via-40% z-10" />
         </div>
      </div>
   );
}
