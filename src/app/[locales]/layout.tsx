import type { Metadata } from "next";
import { Montserrat, Geist } from "next/font/google";
import "@/app/globals.css";

import { Header } from "@/widgets/header";
import { cn } from "@/shared/lib/utils";
import { MobileMenu } from "@/widgets/mobile-menu";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages, getTranslations } from "next-intl/server";
import QueryProvider from "@/shared/lib/providers/QueryProvider";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

const montserrat = Montserrat({
   subsets: ["latin"],
   display: "swap",
   weight: ["400", "500", "600", "700"],
   variable: "--font-montserrat",
});

export async function generateMetadata(): Promise<Metadata> {
   const locale = await getLocale();
   const t = await getTranslations({ locale, namespace: "meta" });

   return {
      title: "MovieMan",
      description: t("mainPageDescription"),
   };
}

export default async function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   const locale = await getLocale();
   const messages = await getMessages();

   const htmlLang = locale === "ua" ? "uk" : locale;

   return (
      <html
         lang={htmlLang}
         className={cn(
            "h-full",
            "antialiased",
            montserrat.variable,
            "font-sans",
            geist.variable,
         )}
      >
         <body className="min-h-full flex flex-col">
            <NextIntlClientProvider messages={messages}>
               <QueryProvider>
                  <div className="flex flex-col min-h-dvh relative">
                     <Header />
                     <main className="flex-1 flex flex-col">{children}</main>
                     <MobileMenu />
                     {/* <Footer /> */}
                  </div>
               </QueryProvider>
            </NextIntlClientProvider>
         </body>
      </html>
   );
}
