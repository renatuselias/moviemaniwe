import { Link } from "@/i18n/navigation";
import {
   Avatar,
   AvatarFallback,
   AvatarImage,
} from "@/shared/components/ui/avatar";
import { useTranslations } from "next-intl";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { TMDBCreatedBy, TMDBMediaCast } from "@/shared/types";

interface MediaCastListProps {
   members: TMDBMediaCast[] | TMDBCreatedBy[];
   tmdbImgPath: string;
   listNum?: number;
   showList?: boolean;
   avatarsCount?: number;
   avatarSize?: number;
   type: "creators" | "actors";
   isLoading?: boolean;
   isSlide?: boolean;
}

export function CastList({
   members = [],
   tmdbImgPath,
   listNum = 2,
   showList = true,
   avatarsCount = 5,
   avatarSize = 7,
   type = "actors",
   isLoading,
   isSlide = true,
}: MediaCastListProps) {
   const t = useTranslations("mediaDetail");

   const topCast = members.slice(0, avatarsCount);
   const mainNames = members.slice(0, listNum);

   return (
      <div className="flex flex-col gap-2 lg:gap-3 w-full">
         <div className="flex items-center gap-3 flex-wrap flex-1">
            <span className="shrink-0 tracking-tight text-[10px] font-extralight text-muted-foreground uppercase">
               {t(type, {
                  count: topCast.length,
               })}
            </span>

            {/* Avatars */}

            {isLoading ? (
               <div className="flex -space-x-1">
                  {Array.from({ length: avatarsCount }).map((_, index) => (
                     <Skeleton
                        key={index}
                        style={{
                           width: avatarSize * 4,
                           height: avatarSize * 4,
                        }}
                        className="rounded-full!"
                     />
                  ))}
               </div>
            ) : (
               <ul className="shrink-0 flex items-center -space-x-1 flex-wrap overflow-hidden">
                  {topCast.map((actor) => {
                     const avatarUrl = actor.profile_path
                        ? `${tmdbImgPath}${actor.profile_path}`
                        : undefined;

                     return avatarUrl ? (
                        <li key={actor.id}>
                           <Link
                              href={`/person/${actor.id}`}
                              className="block transition-transform hover:scale-110 hover:z-10 relative"
                              title={actor.name}
                           >
                              <Avatar
                                 className={`h-${avatarSize} w-${avatarSize} border border-background shrink-0`}
                              >
                                 <AvatarImage
                                    src={avatarUrl}
                                    alt={actor.name || "Actor"}
                                    className="object-cover"
                                 />
                                 <AvatarFallback className="bg-zinc-800 text-[10px] font-medium text-zinc-300">
                                    {actor.name
                                       ? actor.name.slice(0, 2).toUpperCase()
                                       : "AC"}
                                 </AvatarFallback>
                              </Avatar>
                           </Link>
                        </li>
                     ) : null;
                  })}
               </ul>
            )}
         </div>

         {/* Names list */}
         {showList && isLoading ? (
            <div
               className={
                  type === "creators" || isSlide
                     ? "flex-1 min-w-0"
                     : "flex-1 min-w-0 lg:flex-none lg:w-full"
               }
            >
               <div className="flex flex-col gap-1 w-full">
                  <div className="hidden lg:flex flex-col gap-1 w-full">
                     {Array.from({
                        length: isSlide ? 1 : type === "creators" ? 1 : 3,
                     }).map((_, index) => (
                        <Skeleton
                           key={index}
                           className="w-full h-4"
                        />
                     ))}
                  </div>

                  <div className="block lg:hidden w-full">
                     <Skeleton className="w-full h-4" />
                  </div>
               </div>
            </div>
         ) : (
            <div className="text-zinc-400 text-sm truncate min-w-0 text-wrap">
               {mainNames.map((act, index) => {
                  const isLast = index === mainNames.length - 1;
                  return (
                     <span key={act.id}>
                        <Link
                           href={`/person/${act.id}`}
                           className="hover:underline hover:text-zinc-300 transition-colors"
                        >
                           {act.name}
                        </Link>
                        {!isLast ? (
                           <span className="mr-1">,</span>
                        ) : (
                           members.length > 2 && (
                              <span className="ml-1">{t("moreCrews")}</span>
                           )
                        )}
                     </span>
                  );
               })}
            </div>
         )}
      </div>
   );
}
