"use client";

import { useState, useEffect } from "react";

export function useIsMobile(breakpoint = 640) {
   const [isMobile, setIsMobile] = useState<boolean | null>(null);

   useEffect(() => {
      const handleResize = () => {
         setIsMobile(window.innerWidth < breakpoint);
      };

      handleResize();

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
   }, [breakpoint]);

   return isMobile ?? false;
}
