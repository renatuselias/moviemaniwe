import Link from "next/link";
import { Home } from "lucide-react";

export default function NotFound() {
   return (
      <div className="relative flex-1 w-full flex flex-col items-center justify-center overflow-hidden">
         {/* Animated Background Elements */}

         <div className="relative z-10 flex flex-col items-center text-center px-4">
            <h1 className="text-[12rem] sm:text-[18rem] font-black leading-none tracking-tighter text-white/5 select-none">
               404
            </h1>
            <div className="-mt-12 sm:-mt-20">
               <h2 className="text-3xl sm:text-5xl font-bold text-white mb-4 uppercase tracking-tight">
                  Not found!
               </h2>

               <p className="text-zinc-500 text-base sm:text-lg max-w-md mx-auto mb-10 font-medium">
                  Page you are looking for does not exist or has been moved.
               </p>

               <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link
                     href="/"
                     className="group relative flex items-center gap-2 px-8 py-4 bg-white text-black rounded-2xl font-bold hover:scale-105 active:scale-95 transition-all duration-300"
                  >
                     <Home className="w-5 h-5" />
                     <span>Click home</span>
                  </Link>
               </div>
            </div>
         </div>
      </div>
   );
}
