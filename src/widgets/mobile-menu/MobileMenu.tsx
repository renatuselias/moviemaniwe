"use client";

import { Link } from "@/i18n/navigation";
import { usePathname, useRouter } from "@/i18n/navigation";
import { Globe2, Check, ChevronUp, ChevronDown } from "lucide-react";
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
   DropdownMenuLabel,
   DropdownMenuSeparator,
   DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";
import { useLocale, useTranslations } from "next-intl";
import { routing, languageNames } from "@/i18n/routing";
import { NAV_ITEMS } from "@/config/navigation";
import { useState } from "react";

export function MobileMenu() {
   const pathname = usePathname();
   const t = useTranslations("menu");
   const locale = useLocale();
   const router = useRouter();

   const [isOpen, setIsOpen] = useState(true);

   const handleLocaleChange = (nextLocale: string) => {
      router.replace(pathname, { locale: nextLocale });
   };

   return (
      <div
         className={`fixed sm:hidden bottom-0 left-0 right-0 z-50 transition-transform duration-500 ease-in-out ${
            isOpen ? "translate-y-0" : "translate-y-[calc(100%-1.55rem)]"
         }`}
      >
         <div className="flex justify-end px-4">
            <button
               onClick={() => setIsOpen((prev) => !prev)}
               className="flex items-center justify-center rounded-t-sm border-x border-t border-border bg-black px-3 py-1 text-muted-foreground transition-colors hover:text-white"
            >
               {isOpen ? (
                  <ChevronDown className="h-4 w-4" />
               ) : (
                  <ChevronUp className="h-4 w-4" />
               )}
            </button>
         </div>

         <nav className="border-t border-border bg-black px-2">
            <ul className="flex items-center justify-around">
               {NAV_ITEMS.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;

                  return (
                     <li key={item.href}>
                        <Link
                           href={item.href}
                           className={`flex w-fit border-t-2 border-transparent h-auto flex-col items-center gap-1 py-1.5 transition-colors hover:text-foreground
                           ${isActive ? "text-white border-white!" : "text-muted-foreground"}`}
                        >
                           <Icon size={18} />
                           <span className="text-[10px]">
                              {t(item.translationKey)}
                           </span>
                        </Link>
                     </li>
                  );
               })}

               <li>
                  <DropdownMenu>
                     <DropdownMenuTrigger>
                        <div className="flex cursor-pointer flex-col items-center border-t-2 border-black justify-center gap-1 py-1.5">
                           <Globe2 size={18} />
                           <span className="text-[10px]">{t("language")}</span>
                        </div>
                     </DropdownMenuTrigger>

                     <DropdownMenuContent
                        side="top"
                        align="center"
                        className="mb-2 z-50 bg-black w-fit max-h-[60vh] overflow-y-auto"
                     >
                        <DropdownMenuGroup>
                           <DropdownMenuLabel className="text-[10px] font-semibold uppercase tracking-widest text-zinc-500">
                              {t("language")}
                           </DropdownMenuLabel>
                           <DropdownMenuSeparator className="bg-white/5" />

                           {routing.locales.map((loc) => (
                              <DropdownMenuItem
                                 key={loc}
                                 onClick={() => handleLocaleChange(loc)}
                                 className="cursor-pointer flex items-center justify-between gap-4 text-xl"
                              >
                                 <span>{languageNames[loc]}</span>
                                 {locale === loc && (
                                    <Check className="w-3.5 h-3.5 text-zinc-300" />
                                 )}
                              </DropdownMenuItem>
                           ))}
                        </DropdownMenuGroup>
                     </DropdownMenuContent>
                  </DropdownMenu>
               </li>
            </ul>
         </nav>
      </div>
   );
}
