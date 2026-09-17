"use client";

import { useState } from "react";
import Image, { ImageProps } from "next/image";

type TmdbSize =
   | "w92"
   | "w154"
   | "w185"
   | "w200"
   | "w300"
   | "w500"
   | "w780"
   | "w1280"
   | "original";

interface TmdbImageProps extends Omit<ImageProps, "src"> {
   src?: string | null;
   tmdbSize?: TmdbSize;
   fadeDuration?: number;
}

export function TmdbImage({
   src,
   alt,
   className = "",
   style,
   fadeDuration = 700,
   onLoad,
   sizes = "(max-width: 640px) 33vw, 16vw",
   ...props
}: TmdbImageProps) {
   const [isLoaded, setIsLoaded] = useState(false);

   if (!src || src.includes("null")) return null;
   const tmdbSize = "w500";

   const cleanPath = src.startsWith("/") ? src : `/${src}`;
   const fullSrc = src.startsWith("http")
      ? src
      : `https://image.tmdb.org/t/p/${tmdbSize}${cleanPath}`;

   return (
      <Image
         src={fullSrc}
         alt={alt || "Media Image"}
         onLoad={(e) => {
            setIsLoaded(true);
            onLoad?.(e);
         }}
         style={{
            opacity: isLoaded ? 1 : 0,
            transition: `all ${fadeDuration}ms ease-in-out`,
            ...style,
         }}
         className={`object-cover select-none transition-transform duration-500 ease-out group-hover:scale-110 z-10 ${className}`}
         {...props}
         sizes={sizes}
      />
   );
}
