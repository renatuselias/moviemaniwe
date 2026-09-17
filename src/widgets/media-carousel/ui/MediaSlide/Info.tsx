"use client";

import { memo, useMemo } from "react";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { FormattedRuntime, StarRating } from "@/shared/components";
import { Link } from "@/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";
import { TMDBMediaCast } from "@/shared/types";
import { formatDate } from "@/shared/lib/format";
import { CastList, GenresList } from "@/entities/media";

interface SlideInfoProps {
   mediaId: number;
   title: string;
   releaseDate: string;
   runtime: number;
   numberOfSeasons: string;
   genres: { id: number; name: string }[];
   cast: TMDBMediaCast[];
   mediaType: "movie" | "tv";
   tmdbImgPath: string;
   rating?: number;
   onClick: () => void;
}

export const Info = memo(
   function Info({
      mediaId,
      title,
      releaseDate,
      runtime,
      numberOfSeasons,
      genres = [],
      cast = [],
      mediaType,
      tmdbImgPath,
      rating,
      onClick,
   }: SlideInfoProps) {
      const t = useTranslations();
      const currentLocale = useLocale();

      const genreIds = useMemo(() => genres.map((g) => g.id), [genres]);

      const date = useMemo(
         () => formatDate(releaseDate, "yearOnly", currentLocale),
         [releaseDate, currentLocale],
      );

      return (
         <>
            <h2 className="text-white hover:text-zinc-300 font-semibold text-xl tracking-tighter truncate">
               <Link href={`/movie/${mediaId}`}>{title}</Link>
            </h2>

            <div className="flex items-center gap-2 text-sm text-zinc-400 tracking-tighter min-w-0">
               <StarRating text={`${rating && Number(rating).toFixed(1)}`} />
               <span className="text-white/20 shrink-0">|</span>
               <span className="shrink-0">{date}</span>
               <span className="text-white/20 shrink-0">|</span>
               {mediaType === "tv" ? (
                  <span>
                     {t("mediaDetail.season", {
                        count: numberOfSeasons,
                     })}
                  </span>
               ) : (
                  <FormattedRuntime
                     runtime={runtime}
                     className="shrink-0"
                  />
               )}
            </div>
            <GenresList genreIds={genreIds} />

            <CastList
               members={cast}
               type="actors"
               tmdbImgPath={tmdbImgPath}
            />

            <Button
               onClick={onClick}
               className="px-0! py-0! h-fit! rounded-none! bg-transparent! cursor-pointer group/link mt-2 flex w-fit items-center gap-1 font-manrope text-[14.5px] text-white/70 underline underline-offset-4 decoration-white/30 transition-colors hover:text-white hover:decoration-white/60"
            >
               {t("mediaDetail.details")}
               <ArrowUpRight className="h-4 w-4 transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
            </Button>
         </>
      );
   },
   (prevProps, nextProps) => {
      return (
         prevProps.mediaId === nextProps.mediaId &&
         prevProps.title === nextProps.title &&
         prevProps.releaseDate === nextProps.releaseDate &&
         prevProps.runtime === nextProps.runtime &&
         prevProps.tmdbImgPath === nextProps.tmdbImgPath &&
         prevProps.genres === nextProps.genres &&
         prevProps.cast === nextProps.cast
      );
   },
);
