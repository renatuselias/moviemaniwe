import Link from "next/link";
import { HeaderClient, MenuList, LanguageSelect } from "@/widgets/header";
import { SearchIcon } from "lucide-react";
import { useTranslations } from "next-intl";

export function Header() {
   const t = useTranslations();

   return (
      <HeaderClient>
         <Link
            prefetch={true}
            href="/"
            className="shrink-0"
         >
            <h1 className="text-xl sm:text-2xl font-bold sm:font-semibold tracking-tight select-none cursor-pointer hover:tracking-normal hover:scale-105 bg-linear-to-r from-zinc-100 via-zinc-400 to-zinc-600 bg-clip-text text-transparent animate-shimmer">
               MovieMan
            </h1>
         </Link>
         <div className="flex grow items-center justify-end gap-2 md:gap-3 lg:gap-6 min-w-0 flex-wrap">
            <button className="flex items-center gap-2 text-sm lg:text-[16px] cursor-pointer text-zinc-400 hover:text-zinc-500 transition-colors duration-700">
               <SearchIcon
                  className="text-zinc-700
                  h-4 w-4 max-[350px]:h-5 max-[350px]:w-5"
               />
               <span className="hidden min-[350px]:block select-none">
                  {t("menu.search")}
               </span>
            </button>
            <span className="text-zinc-600 select-none">|</span>
            <MenuList />
            {/* <span className="hidden sm:block text-zinc-600 select-none">|</span> */}
            <div className="hidden sm:block">
               <LanguageSelect />
            </div>

            {/* <span className="hidden sm:block text-zinc-600 select-none">|</span> */}
            <button
               className="select-none cursor-pointer text-sm md:text-lg tracking-wide font-medium
               bg-linear-to-r from-zinc-100 via-zinc-400 to-zinc-600 bg-clip-text text-transparent animate-shimmer
               hover:scale-110"
            >
               {t("auth.signin")}
            </button>
         </div>
      </HeaderClient>
   );
}
