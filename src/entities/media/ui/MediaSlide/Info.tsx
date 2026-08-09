"use client";

import { ArrowUpRight } from "lucide-react";
import { Movie } from "../../model/types";
import { Button } from "@/shared/components/ui/button";
import { formatDate } from "@/shared/lib/format";
import { FormattedRuntime } from "@/shared/components";
import { GenresList } from "./GenresList";
import { CastList } from "./CastList";
import { Link } from "@/i18n/navigation";

interface MediaCardInfoProps {
   movie: Movie;
   tmdbImgPath: string;
}

export function Info({ movie, tmdbImgPath }: MediaCardInfoProps) {
   return (
      <>
         <h2 className="text-white hover:text-zinc-300 font-semibold text-xl tracking-tighter truncate">
            <Link href={`/movie/${movie.id}`}>{movie.title}</Link>
         </h2>

         <div className="flex items-center gap-2 text-sm text-zinc-400 tracking-tighter min-w-0">
            <span className="shrink-0">{formatDate(movie.release_date)}</span>
            <span className="text-white/20 shrink-0">|</span>

            <FormattedRuntime
               runtime={movie.runtime}
               className="shrink-0"
            />
            <span className="text-white/20 shrink-0">|</span>

            <GenresList genreIds={movie.genre_ids} />
         </div>

         <CastList
            cast={movie.cast}
            tmdbImgPath={tmdbImgPath}
         />

         <Button className="px-0! py-0! h-fit! rounded-none! bg-transparent! cursor-pointer group/link mt-2 flex w-fit items-center gap-1 font-manrope text-[14.5px] text-white/70 underline underline-offset-4 decoration-white/30 transition-colors hover:text-white hover:decoration-white/60">
            Details
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
         </Button>
      </>
   );
}
