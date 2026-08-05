import { NormalizedMedia } from "@/entities/media";
import { MediaCarousel } from "@/widgets/media-carousel/ui/MediaCarousel";

export function MainPage({ media }: { media: NormalizedMedia[] }) {
   return (
      <div>
         <MediaCarousel media={media.slice(0, 8)} />
         {/* <div className="w-100 h-100 border-4 border-yellow-400"></div> */}
      </div>
   );
}
