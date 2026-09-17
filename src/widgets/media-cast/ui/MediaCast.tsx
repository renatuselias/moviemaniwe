import { TMDBMediaCast } from "@/shared/types";
import { CastCarousel } from "./CastCarousel";
import { Profile } from "./Profile";
import { useGetPersonDetails } from "@/entities/person/model/use-get-person-details";
import { Stats } from "./Stats";
import { Biography } from "./Biography";
import { useTranslations } from "next-intl";

export type CastItem = TMDBMediaCast & {
   roles?: Array<{
      character?: string;
      episode_count?: number;
   }>;
};

export function MediaCast({ mediaCast }: { mediaCast: CastItem[] }) {
   const t = useTranslations("mediaDetail");
   const [firstActor, ...remainingCast] = mediaCast;

   const { data: personDetails, isLoading } = useGetPersonDetails(
      firstActor.id,
   );

   const { combined_credits } = personDetails || {};
   const { cast = [], crew = [] } = combined_credits || {};
   const totalCredits = cast.length + crew.length;

   return (
      <section className="w-full space-y-4 ">
         <h3 className="text-lg font-mono uppercase tracking-wide text-zinc-100 font-bold">
            {t("cast")}
         </h3>

         <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 mb-20 min-h-0">
            <Profile
               personDetails={personDetails}
               isLoading={isLoading}
               character={
                  firstActor.roles?.[0]?.character || firstActor.character
               }
            />

            <Stats
               personDetails={personDetails}
               totalCredits={totalCredits}
               isLoading={isLoading}
            />

            <Biography
               biography={personDetails?.biography}
               isLoading={isLoading}
               personId={personDetails?.id}
            />
         </div>

         <CastCarousel cast={remainingCast} />
      </section>
   );
}
