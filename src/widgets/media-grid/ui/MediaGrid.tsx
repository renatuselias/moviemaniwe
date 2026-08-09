import { MediaCard, NormalizedMedia } from "@/entities/media";
import { ContentTitle } from "@/shared/components";

interface MediaGridProps {
   media: NormalizedMedia[];
   mediaCount?: number;
   title: string;
   subtitle: string;
}

export function MediaGrid({
   media = [],
   mediaCount = 12,
   title,
   subtitle,
}: MediaGridProps) {
   return (
      <section className="w-full flex flex-col gap-5 sm:gap-10">
         <ContentTitle
            title={title}
            subtitle={subtitle}
         />
         <div className="grid grid-cols-3 sm:grid-cols-6 gap-0">
            {media.slice(0, mediaCount).map((item) => (
               <MediaCard
                  key={item.id}
                  item={item}
               />
            ))}
         </div>
      </section>
   );
}
