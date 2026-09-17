"use client";

import { ReactNode, useEffect, useMemo, useState } from "react";
import { Link } from "@/i18n/navigation";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { useLocale, useTranslations } from "next-intl";
import { FormattedRuntime, StarRating, TmdbImage } from "@/shared/components";
import { formatDate } from "@/shared/lib/format";
import { GenresList } from "@/entities/media";
import { MediaFullInfo as MediaDetailsType } from "@/entities/media";

interface MediaDetailsProps {
   id: number;
   mediaType: "movie" | "tv";
   logoWidth?: string;
   children?: ReactNode;
   media?: MediaDetailsType | null;
   isLoading: boolean;
   isMediaPage?: boolean;
}

export function MediaDetails({
   id: mediaId,
   mediaType,
   logoWidth = "w-40 md:w-80 lg:w-120",
   children,
   media,
   isLoading,
   isMediaPage = false,
}: MediaDetailsProps) {
   const t = useTranslations();
   const currentLocale = useLocale();

   const [isDarkLogo, setIsDarkLogo] = useState(false);

   const {
      title,
      tagline,
      logoPath,
      releaseDate = "",
      runtime,
      genres,
      rating,
      productionCountries,
      numberOfSeasons,
   } = media || {};

   const mediaHref = `/${mediaType === "tv" ? "tvshow" : mediaType}/${mediaId}`;
   const date = useMemo(
      () => formatDate(releaseDate, "yearOnly", currentLocale),
      [releaseDate, currentLocale],
   );

   useEffect(() => {
      if (logoPath) {
         getImageLuminance("https://image.tmdb.org/t/p/w200" + logoPath).then(
            (luminance) => {
               if (luminance < 0.15) {
                  setIsDarkLogo(true);
               } else {
                  setIsDarkLogo(false);
               }
            },
         );
      }
   }, [logoPath, mediaId]);

   return (
      <div className="space-y-3 sm:space-y-5 w-full sm:max-w-2xl font-mono">
         {isLoading ? (
            <div>
               <Skeleton className="h-12 w-64 sm:h-16 sm:w-80 md:h-20 md:w-100 mb-4 sm:mb-8 lg:mb-10" />
               <div className="space-y-2 max-w-xl">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-2/4" />
               </div>
               <div className="flex items-center gap-2 sm:gap-3 mt-3 sm:mt-4">
                  <Skeleton className="h-4 w-8" />
                  <span className="text-white/20">|</span>
                  <Skeleton className="h-4 w-11" />
                  <span className="text-white/20">|</span>
                  <Skeleton className="h-4 w-14" />
                  <span className="text-white/20">|</span>
                  <Skeleton className="h-4 w-14" />
               </div>
               <div className="flex items-center gap-2 sm:gap-3 mt-3 sm:mt-4">
                  <Skeleton className="h-7 w-1/5" />
                  <Skeleton className="h-6 w-1/3" />
               </div>
            </div>
         ) : (
            <div
               key={mediaId}
               className="space-y-3 sm:space-y-5 animate-[fadeInUp_0.8s_ease-out] will-change-transform"
            >
               {logoPath ? (
                  <div
                     className={`${isMediaPage ? "mb-5 sm:mb-10" : "mb-3 sm:mb-6 lg:mb-8"}`}
                  >
                     <Link
                        href={mediaHref}
                        className="block group transition-transform duration-500 hover:scale-102 active:scale-95 w-fit"
                     >
                        <TmdbImage
                           src={logoPath}
                           alt={title || "Media title"}
                           width={280}
                           height={240}
                           fadeDuration={300}
                           className={`${isDarkLogo ? "brightness-200 invert" : ""} origin-bottom-left hover:scale-105 select-none h-auto object-contain drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)] ${logoWidth}`}
                        />
                     </Link>
                  </div>
               ) : (
                  <div className="max-w-70 sm:max-w-150">
                     <Link
                        href={mediaHref}
                        className="group inline hover:opacity-90 transition-opacity"
                     >
                        <h1 className="inline text-3xl sm:text-5xl bg-linear-to-r from-zinc-100 via-zinc-400 to-zinc-600 bg-clip-text animate-shimmer font-bold text-white leading-tight">
                           {title}
                        </h1>
                     </Link>
                  </div>
               )}

               {/* media info */}
               {!isMediaPage && (
                  <div className="flex flex-col gap-2 text-white/50">
                     {tagline && (
                        <p className="text-sm font-sans italic sm:text-base md:text-lg leading-relaxed text-white/90 drop-shadow-lg line-clamp-3 sm:line-clamp-4 max-w-xl">
                           {tagline}
                        </p>
                     )}

                     {genres && genres.length > 0 && (
                        <GenresList genreIds={genres.map((g) => g.id)} />
                     )}

                     <div className="flex items-center flex-wrap tracking-tighter gap-2 font-medium drop-shadow-md text-sm cursor-default">
                        {Number(rating) > 0 && (
                           <>
                              <StarRating
                                 text={`${Number(rating).toFixed(1)}`}
                              />
                              <span className="text-white/20">|</span>
                           </>
                        )}

                        {releaseDate && <span>{date}</span>}

                        {mediaType === "movie" && runtime ? (
                           <>
                              <span className="text-white/20">|</span>
                              <FormattedRuntime runtime={runtime} />
                           </>
                        ) : null}

                        {mediaType === "tv" && numberOfSeasons ? (
                           <>
                              <span className="text-white/20">|</span>
                              <span>
                                 {t("mediaDetail.season", {
                                    count: numberOfSeasons,
                                 })}
                              </span>
                           </>
                        ) : null}

                        {productionCountries &&
                           productionCountries.length > 0 && (
                              <>
                                 <span className="text-white/20">|</span>
                                 <span>
                                    {productionCountries
                                       .map((c) => c.iso_3166_1)
                                       .join(", ")}
                                 </span>
                              </>
                           )}
                     </div>

                     {children}
                  </div>
               )}
            </div>
         )}
      </div>
   );
}

// shared/lib/getLogoLuminance.ts
export async function getImageLuminance(url: string): Promise<number> {
   return new Promise((resolve) => {
      const img = new Image();
      img.crossOrigin = "Anonymous"; // Требует CORS со стороны сервера (TMDB поддерживает)
      img.src = url;

      img.onload = () => {
         const canvas = document.createElement("canvas");
         const ctx = canvas.getContext("2d");
         if (!ctx) return resolve(0.5);

         canvas.width = img.width;
         canvas.height = img.height;
         ctx.drawImage(img, 0, 0);

         try {
            const imageData = ctx.getImageData(
               0,
               0,
               canvas.width,
               canvas.height,
            );
            const data = imageData.data;
            let colorSum = 0;
            let alphaPixels = 0;

            // Проходим по всем пикселям и считаем среднюю яркость только видимых пикселей
            for (let i = 0; i < data.length; i += 4) {
               const r = data[i];
               const g = data[i + 1];
               const b = data[i + 2];
               const a = data[i + 3];

               if (a > 50) {
                  // Игнорируем прозрачный фон PNG
                  // Формула воспринимаемой яркости (Relative Luminance)
                  const avg = 0.2126 * r + 0.7152 * g + 0.0722 * b;
                  colorSum += avg;
                  alphaPixels++;
               }
            }

            const finalLuminance =
               alphaPixels > 0 ? colorSum / alphaPixels / 255 : 0;
            resolve(finalLuminance); // Возвращает число от 0 (темный) до 1 (белый)
         } catch (e) {
            // Если CORS заблокирован
            resolve(0.5);
         }
      };

      img.onerror = () => resolve(0.5);
   });
}
