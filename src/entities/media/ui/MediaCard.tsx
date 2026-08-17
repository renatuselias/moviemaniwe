"use client";

import { useState } from "react";
import Image from "next/image";
import { Skeleton } from "@/shared/components/ui/skeleton";

export function MediaCard({
   title,
   posterPath,
   onClick,
}: {
   title: string;
   posterPath: string | null;
   onClick: () => void;
}) {
   const [isLoaded, setIsLoaded] = useState(false);

   return (
      <div
         onClick={onClick}
         className="group relative aspect-2/3 w-full overflow-hidden bg-zinc-950 cursor-pointer"
      >
         {!isLoaded && (
            <Skeleton className="absolute inset-0 z-10 h-full w-full rounded-none border border-zinc-800/30" />
         )}

         <Image
            src={`https://image.tmdb.org/t/p/w500${posterPath}`}
            alt={title || "Poster"}
            fill
            sizes="(max-width: 640px) 33vw, 16vw"
            onLoad={() => setIsLoaded(true)}
            style={!isLoaded ? { opacity: 0 } : undefined}
            className={`
               object-cover transition-transform duration-500 ease-out select-none group-hover:scale-110
               ${isLoaded ? "opacity-100" : "opacity-0"}
            `}
         />

         <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-20">
            <h3 className="select-none font-bold text-xl tracking-tighter mb-5 text-zinc-300 w-full px-2 text-center">
               {title}
            </h3>
         </div>
      </div>
   );
}
