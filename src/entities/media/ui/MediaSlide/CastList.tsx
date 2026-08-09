import { Link } from "@/i18n/navigation";
import {
   Avatar,
   AvatarFallback,
   AvatarImage,
} from "@/shared/components/ui/avatar";

interface CastMember {
   id: number;
   name: string;
   profile_path?: string | null;
}

interface MediaCastListProps {
   cast?: CastMember[];
   tmdbImgPath: string;
}

export function CastList({ cast = [], tmdbImgPath }: MediaCastListProps) {
   if (!cast.length) return null;

   const topCast = cast.slice(0, 5);
   const mainNames = cast.slice(0, 2);

   return (
      <div className="flex items-center gap-3">
         <span className="shrink-0 tracking-tight text-[10px] font-extralight text-muted-foreground uppercase">
            Starring
         </span>

         {/* Avatars */}
         <ul className="shrink-0 flex items-center -space-x-2 overflow-hidden">
            {topCast.map((actor) => {
               const avatarUrl = actor.profile_path
                  ? `${tmdbImgPath}${actor.profile_path}`
                  : undefined;

               return (
                  <li key={actor.id}>
                     <Link
                        href={`/person/${actor.id}`}
                        className="block transition-transform hover:scale-110 hover:z-10 relative"
                        title={actor.name}
                     >
                        <Avatar className="h-7 w-7 border border-background shrink-0">
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
               );
            })}
         </ul>

         {/* Names list */}
         <div className="text-zinc-400 text-sm truncate min-w-0">
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
                        cast.length > 2 && <span className="ml-1">& more</span>
                     )}
                  </span>
               );
            })}
         </div>
      </div>
   );
}
