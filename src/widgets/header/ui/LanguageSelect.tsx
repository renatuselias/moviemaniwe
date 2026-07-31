"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import {
   Select,
   SelectContent,
   SelectGroup,
   SelectItem,
   SelectLabel,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select";
import { Globe } from "lucide-react";
import { languageNames } from "@/i18n/routing";

export function LanguageSelect() {
   const locale = useLocale();
   const pathname = usePathname();
   const router = useRouter();

   const t = useTranslations();

   function handleLocaleChange(nextLocale: string | null) {
      if (!nextLocale) return;
      router.replace(pathname, { locale: nextLocale });
   }

   return (
      <Select
         value={locale}
         onValueChange={handleLocaleChange}
      >
         <SelectTrigger className="h-6! lg:h-7! px-1 text-[10px] lg:text-xs font-medium cursor-pointer rounded-sm border border-border">
            <SelectValue>
               <div className="flex items-center gap-0.5 font-semibold text-zinc-300">
                  <Globe className="h-3! w-3! lg:h-3.5! lg:w-3.5! opacity-70" />
                  <span>{locale.toUpperCase()}</span>
               </div>
            </SelectValue>
         </SelectTrigger>

         <SelectContent
            alignItemWithTrigger={false}
            className="rounded-sm! bg-black"
         >
            <SelectGroup>
               <SelectLabel>{t("menu.language")}</SelectLabel>
               {routing.locales.map((item) => (
                  <SelectItem
                     key={item}
                     value={item}
                     className="cursor-pointer"
                  >
                     {languageNames[item]}
                  </SelectItem>
               ))}
            </SelectGroup>
         </SelectContent>
      </Select>
   );
}
