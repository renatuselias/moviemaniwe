import { TmdbImage } from "@/shared/components";

export function MediaPoster({
   posterPath,
   title,
}: {
   posterPath: string;
   title: string;
}) {
   return (
      <div className="hidden md:block md:col-span-4 lg:col-span-3 shrink-0 relative group">
         <div className="absolute -inset-1 rounded-xs bg-linear-to-b from-emerald-500/20 via-transparent to-zinc-900/50 blur-xl opacity-50 group-hover:opacity-100 transition duration-500" />
         <div className="relative aspect-2/3 w-full overflow-hidden rounded-xs border border-zinc-800/80 bg-zinc-900/60 shadow-2xl">
            {posterPath ? (
               <TmdbImage
                  src={posterPath}
                  alt={title || "Poster"}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
               />
            ) : (
               <div className="w-full h-full flex items-center justify-center font-mono text-xs text-zinc-600">
                  NO POSTER
               </div>
            )}
         </div>
      </div>
   );
}
