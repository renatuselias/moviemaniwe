import { Building2 } from "lucide-react";
import { TmdbImage } from "@/shared/components";
import { ProductionCompany } from "@/shared/types";
import { useTranslations } from "next-intl";

export function MediaCompanies({
   companies,
}: {
   companies: ProductionCompany[];
}) {
   const t = useTranslations();

   if (!companies?.length) return null;

   return (
      <div className="space-y-2">
         <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-zinc-500">
            <Building2 className="w-3.5 h-3.5 text-zinc-500" />
            <span>{t("mediaDetail.productionCompanies")}</span>
         </div>
         <div className="flex flex-wrap gap-2">
            {companies.map((company) => (
               <div
                  key={company.id}
                  className="px-3 py-2 rounded-xs bg-zinc-900/50 border border-zinc-800/80 hover:border-zinc-700 transition-all group flex items-center justify-center cursor-pointer"
                  title={company.name}
               >
                  {company.logo_path ? (
                     <TmdbImage
                        src={company.logo_path}
                        alt={company.name}
                        width={85}
                        height={24}
                        fadeDuration={300}
                        className="max-h-4.5 w-auto object-contain filter grayscale group-hover:grayscale-0 transition-all opacity-50 group-hover:opacity-100 invert"
                     />
                  ) : (
                     <span className="text-[11px] font-mono text-zinc-400 group-hover:text-zinc-200">
                        {company.name}
                     </span>
                  )}
               </div>
            ))}
         </div>
      </div>
   );
}
