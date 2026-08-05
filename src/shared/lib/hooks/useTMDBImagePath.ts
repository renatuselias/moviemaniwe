"use client";

import { useState, useEffect } from "react";
import { tmdbImages } from "@/shared/config/tmdb-images";

export function useTMDBImagePath() {
   const [isSlow, setIsSlow] = useState<boolean>(false);

   useEffect(() => {
      const checkActualSpeed = async () => {
         const startTime = performance.now();

         try {
            // request to api/ping to check actual speed
            // cache: 'no-store' is needed so that the browser does not take the response from the cache.
            const response = await fetch(`/api/ping?t=${Date.now()}`, {
               method: "HEAD", // HEAD downloads only headers, weighs 0 bytes
               cache: "no-store",
            });

            if (!response.ok) return;

            const endTime = performance.now();
            const duration = endTime - startTime; // Time in milliseconds

            // If the micro-request took longer than 1500ms (1.5 seconds), the network is very slow
            if (duration > 1500) {
               setIsSlow(true);
            } else {
               setIsSlow(false);
            }
         } catch (error) {
            console.log(error);
            // If the request completely failed (no network), consider it bad
            setIsSlow(true);
         }
      };

      // Check once when the page loads
      checkActualSpeed();

      // If you need to check periodically (for example, every 30 seconds):
      const interval = setInterval(checkActualSpeed, 30000);
      return () => clearInterval(interval);
   }, []);

   return isSlow ? tmdbImages.LOW : tmdbImages.HIGH;
}
