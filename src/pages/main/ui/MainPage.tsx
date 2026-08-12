import { TrendingMedia } from "@/entities/media/model/types";
import { HeroCarousel } from "@/widgets/hero-carousel";
import { MediaCarousel } from "@/widgets/media-carousel";
import { MediaGrid } from "@/widgets/media-grid";

export function MainPage({ media }: { media: TrendingMedia[] }) {
   return (
      <div>
         <HeroCarousel media={media.slice(0, 8)} />
         <div className="mt-20 max-w-375 px-4 sm:px-8 m-auto flex flex-col gap-20 sm:gap-40">
            <MediaGrid
               media={media}
               title="Trending today"
               subtitle="right now"
            />
            <MediaCarousel
               title="In theaters"
               subtitle="playing now"
            />
            <MediaGrid
               media={media}
               title="In theaters"
               subtitle="playing now"
            />
         </div>
      </div>
   );
}
