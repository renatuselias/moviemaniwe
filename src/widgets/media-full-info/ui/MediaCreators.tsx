import { Users } from "lucide-react";
import { TmdbImage } from "@/shared/components";
import { TMDBCreatedBy } from "@/shared/types";
import { useTranslations } from "next-intl";

export function MediaCreators({ creators }: { creators: TMDBCreatedBy[] }) {
   const t = useTranslations("mediaDetail");
   if (!creators?.length) return null;

   return (
      <div className="space-y-2">
         <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-zinc-500 font-bold">
            <Users className="w-3.5 h-3.5 text-zinc-500" />
            {t("creators", {
               count: creators.length,
            })}{" "}
         </div>
         <div className="flex flex-wrap gap-2">
            {creators.map((creator) => (
               <div
                  key={`${creator.id}-${creator.job}`}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-xs bg-zinc-900/40 border border-zinc-800/80 hover:border-zinc-700 transition-colors"
               >
                  <div className="relative w-7 h-7 rounded-full overflow-hidden bg-zinc-800 shrink-0 border border-zinc-700/50">
                     {creator.profile_path ? (
                        <TmdbImage
                           src={creator.profile_path}
                           alt={creator.name}
                           fill
                           className="object-cover"
                        />
                     ) : (
                        <div className="w-full h-full flex items-center justify-center font-mono text-[10px] text-zinc-500 font-bold">
                           {creator.name.charAt(0)}
                        </div>
                     )}
                  </div>
                  <div className="flex flex-col">
                     <span className="text-xs font-semibold text-zinc-200">
                        {creator.name}
                     </span>
                     <span className="text-[10px] font-mono text-zinc-500">
                        {creator.job}
                     </span>
                  </div>
               </div>
            ))}
         </div>
      </div>
   );
}
