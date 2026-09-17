import { Skeleton } from "@/shared/components/ui/skeleton";
import { TmdbImage } from "@/shared/components/TmdbImage";
import { StarRating } from "@/shared/components";
import { GenresList } from "./GenresList";

export function MediaCard({
   genre_ids,
   overview,
   rating,
   title,
   posterPath,
   onClick,
}: {
   genre_ids: number[];
   overview: string;
   rating: number;
   title: string;
   posterPath: string | null;
   onClick: () => void;
}) {
   return (
      <div
         onClick={onClick}
         className="group relative aspect-2/3 w-full overflow-hidden bg-zinc-950 cursor-pointer"
      >
         <Skeleton className="absolute inset-0 h-full w-full rounded-none! border border-zinc-700/30 z-0" />

         <TmdbImage
            src={posterPath}
            alt={title || "Poster"}
            fill
         />

         <div className="px-5 absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center z-20">
            <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-300 ease-out flex flex-col gap-2">
               <h3 className="select-none font-bold text-lg leading-snug tracking-tight text-white drop-shadow-md line-clamp-2">
                  {title}
               </h3>

               <div className="flex flex-col gap-x-3 gap-y-1 text-xs font-medium text-zinc-300">
                  {rating > 0 && (
                     <div className="flex items-center gap-1.5">
                        <span className="text-zinc-400">Rating:</span>
                        <StarRating text={rating.toFixed(1)} />
                     </div>
                  )}
                  <GenresList
                     genreIds={genre_ids}
                     isCard={true}
                  />
               </div>

               {overview && (
                  <p className="line-clamp-3 text-xs leading-relaxed text-zinc-300/90 font-normal mt-1">
                     {overview}
                  </p>
               )}
            </div>
         </div>
      </div>
   );
}
