import { Link } from "@/i18n/navigation";
import { MOVIE_GENRES } from "@/shared/config/tmdb-genres";
import { useTranslations } from "next-intl";

interface MediaGenresListProps {
   genreIds?: number[];
}

export function GenresList({ genreIds = [] }: MediaGenresListProps) {
   const t = useTranslations();

   const validGenres = genreIds
      .map((id) => ({ id, key: MOVIE_GENRES[id] }))
      .filter((g): g is { id: number; key: string } => Boolean(g.key));

   if (!validGenres.length) return null;

   return (
      <p className="truncate min-w-0 text-sm text-muted-foreground">
         {validGenres.map((genre, index) => {
            const isLast = index === validGenres.length - 1;
            return (
               <span
                  key={genre.id}
                  className="inline"
               >
                  <Link
                     href={`/genre/${genre.id}`}
                     className="hover:underline hover:text-white transition-colors"
                  >
                     {t(`genres.${genre.key}`)}
                  </Link>
                  {!isLast && <span className="mr-1">,</span>}
               </span>
            );
         })}
      </p>
   );
}
