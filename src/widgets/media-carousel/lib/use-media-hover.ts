"use client";

import { useState, useRef, useEffect } from "react";

const HOVER_DELAY = 3800;
const CAROUSEL_START_DELAY = 1500;

interface UseMediaHoverProps {
   trailerKey: string | null;
}

export function useMediaHover({ trailerKey }: UseMediaHoverProps) {
   const [isHovered, setIsHovered] = useState(false);
   const [showCarousel, setShowCarousel] = useState(false);
   const [showTrailer, setShowTrailer] = useState(false);
   const [isMuted, setIsMuted] = useState(true);
   const [isPending, setIsPending] = useState(false);

   const [isHoverSupported, setIsHoverSupported] = useState(() => {
      if (typeof window === "undefined") return false;
      return window.matchMedia("(hover: hover)").matches;
   });

   const carouselTimerRef = useRef<NodeJS.Timeout | null>(null);
   const trailerTimerRef = useRef<NodeJS.Timeout | null>(null);

   useEffect(() => {
      const mediaQuery = window.matchMedia("(hover: hover)");
      const handler = (e: MediaQueryListEvent) =>
         setIsHoverSupported(e.matches);

      mediaQuery.addEventListener("change", handler);
      return () => mediaQuery.removeEventListener("change", handler);
   }, []);

   const clearAllTimers = () => {
      if (carouselTimerRef.current) {
         clearTimeout(carouselTimerRef.current);
         carouselTimerRef.current = null;
      }
      if (trailerTimerRef.current) {
         clearTimeout(trailerTimerRef.current);
         trailerTimerRef.current = null;
      }
   };

   const handleMouseEnter = () => {
      if (!isHoverSupported) return;

      setIsHovered(true);

      if (trailerKey) {
         setIsPending(true);

         carouselTimerRef.current = setTimeout(() => {
            setShowCarousel(true);
         }, CAROUSEL_START_DELAY);

         trailerTimerRef.current = setTimeout(() => {
            setShowTrailer(true);
            setShowCarousel(false);
            setIsPending(false);
         }, HOVER_DELAY);
      }
   };

   const handleMouseLeave = () => {
      if (!isHoverSupported) return;

      setIsHovered(false);
      setShowCarousel(false);
      setShowTrailer(false);
      setIsPending(false);
      setIsMuted(true);

      clearAllTimers();
   };

   useEffect(() => {
      return () => clearAllTimers();
   }, []);

   const toggleMute = (e: React.MouseEvent) => {
      e.stopPropagation();
      setIsMuted((prev) => !prev);
   };

   return {
      isHovered,
      showCarousel,
      showTrailer,
      isMuted,
      isPending,
      isHoverSupported,
      handleMouseEnter,
      handleMouseLeave,
      toggleMute,
      HOVER_DELAY,
   };
}
