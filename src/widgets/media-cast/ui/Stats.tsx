import Link from "next/link";
import { Button } from "@/shared/components/ui/button";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { ArrowUpRight } from "lucide-react";
import { formatDate } from "@/shared/lib/format";
import { TmdbPersonDetail } from "@/entities/person";
import { useLocale, useTranslations } from "next-intl";

interface StatsProps {
   personDetails?: TmdbPersonDetail;
   totalCredits: number;
   isLoading: boolean;
}

export function Stats({ personDetails, totalCredits, isLoading }: StatsProps) {
   const currentLocale = useLocale();
   const t = useTranslations("mediaDetail");

   return (
      <div className="md:col-span-3 lg:col-span-3 space-y-6">
         <div className="space-y-3">
            <span className="block text-xs uppercase tracking-widest text-neutral-500">
               {t("born")}
            </span>
            {isLoading ? (
               <Skeleton className="h-6 w-24" />
            ) : (
               <p className="text-base text-neutral-200">
                  {formatDate(
                     personDetails?.birthday || null,
                     "full",
                     currentLocale,
                  )}
               </p>
            )}
         </div>

         <div className="space-y-3">
            <span className="block text-xs uppercase tracking-widest text-neutral-500">
               {t("birthplace")}
            </span>
            {isLoading ? (
               <Skeleton className="h-6 w-55" />
            ) : (
               <p className="text-base text-neutral-200 leading-snug">
                  {personDetails?.place_of_birth || "—"}
               </p>
            )}
         </div>

         <div className="space-y-3">
            <span className="block text-xs uppercase tracking-widest text-neutral-500">
               {t("credits")}
            </span>
            {isLoading ? (
               <Skeleton className="h-6 w-16" />
            ) : (
               <p className="text-base text-neutral-200">
                  {totalCredits || "—"}
               </p>
            )}
         </div>

         <div className="pt-2">
            <Button
               variant="outline"
               className="border-neutral-800 bg-transparent text-xs uppercase tracking-widest text-neutral-300 hover:bg-neutral-900 hover:text-white rounded-none h-auto p-0! px-0! inline-flex items-center"
            >
               <Link
                  href={`/person/${personDetails?.id}`}
                  className="flex gap-1 px-2 py-2"
               >
                  {t("filmography")}

                  <ArrowUpRight className="ml-2 h-3.5 w-3.5" />
               </Link>
            </Button>
         </div>
      </div>
   );
}
