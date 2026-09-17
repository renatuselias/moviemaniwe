import { formatCurrency } from "@/shared/lib/format";
import { DollarSign, TrendingDown, TrendingUp } from "lucide-react";
import { useTranslations } from "next-intl";

interface MediaFinancialsProps {
   budget: number;
   revenue: number;
   locale: string;
}

export function MediaFinancials({
   budget,
   revenue,
   locale,
}: MediaFinancialsProps) {
   const t = useTranslations("mediaDetail");
   const hasFinancials = budget > 0 || revenue > 0;
   if (!hasFinancials) return null;

   const isProfitable = revenue >= budget;

   return (
      <div className="p-4 w-fit rounded-xs bg-zinc-950/40 border border-zinc-800/60 space-y-3">
         <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="text-xs font-mono uppercase tracking-widest text-zinc-400 flex items-center gap-1.5 font-bold">
               <DollarSign className="w-4 h-4 text-emerald-500" />
               {t("financialStats")}
            </span>
            {revenue > 0 && (
               <span
                  className={`inline-flex items-center gap-1 text-[10px] font-mono font-bold px-2 py-0.5 rounded-xs ${
                     isProfitable
                        ? "bg-emerald-950/60 text-emerald-400 border border-emerald-800/50"
                        : "bg-rose-950/60 text-rose-400 border border-rose-800/50"
                  }`}
               >
                  {isProfitable ? (
                     <TrendingUp className="w-3 h-3" />
                  ) : (
                     <TrendingDown className="w-3 h-3" />
                  )}
                  {isProfitable ? t("comSuccess") : t("deficit")}
               </span>
            )}
         </div>

         <div className="flex justify-start gap-5 flex-wrap pt-1">
            {budget > 0 && (
               <div>
                  <p className="text-[10px] font-mono text-zinc-500 uppercase">
                     {t("budget")}
                  </p>
                  <p className="text-base font-bold font-mono text-zinc-100 tracking-tight mt-0.5">
                     {formatCurrency(budget, locale)}
                  </p>
               </div>
            )}
            {revenue > 0 && (
               <div>
                  <p className="text-[10px] font-mono text-zinc-500 uppercase">
                     {t("revenue")}
                  </p>
                  <p
                     className={`text-base font-bold font-mono tracking-tight mt-0.5 ${isProfitable ? "text-emerald-400" : "text-rose-400"}`}
                  >
                     {formatCurrency(revenue, locale)}
                  </p>
               </div>
            )}
         </div>
      </div>
   );
}
