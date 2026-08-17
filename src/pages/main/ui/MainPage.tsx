import {
   getCountryGenitiveName,
   getCountryName,
   getLanguageByCountry,
   getUserCountryCode,
} from "@/shared/lib/geo";
import { BaseMedia } from "@/entities/media/model/types";
import { getUpcomingDates } from "@/shared/lib/format";
import { HeroCarousel } from "@/widgets/hero-carousel";
import { MediaCarousel } from "@/widgets/media-carousel";
import { MediaGrid } from "@/widgets/media-grid";
import { getLocale, getTranslations } from "next-intl/server";

export async function MainPage({ media }: { media: BaseMedia[] }) {
   const { gte, lte } = getUpcomingDates(150);
   const t = await getTranslations("MainPage.sections");
   const locale = await getLocale();

   const countryCode = await getUserCountryCode();

   const originalLanguage = getLanguageByCountry(countryCode);

   const countryName = getCountryName(countryCode, locale);

   const countryGenitiveName = getCountryGenitiveName(countryCode, locale);

   return (
      <div>
         <HeroCarousel media={media.slice(0, 8)} />
         <div className="mt-20 max-w-375 px-4 sm:px-8 m-auto flex flex-col gap-20 sm:gap-40">
            <MediaGrid
               media={media}
               title={t("trending.title")}
               subtitle={t("trending.subtitle")}
            />

            <MediaCarousel
               title={t("inTheaters.title")}
               subtitle={t("inTheaters.subtitle")}
               mediaType="movie"
               params={{ endpoint: "/movie/now_playing" }}
            />

            <MediaGrid
               title={t("comingSoon.title")}
               subtitle={t("comingSoon.subtitle")}
               mediaType="movie"
               params={{
                  sortBy: "popularity.desc",
                  releaseDateGte: gte,
                  releaseDateLte: lte,
               }}
            />

            <MediaCarousel
               title={t("onTheAir.title")}
               subtitle={t("onTheAir.subtitle")}
               mediaType="tv"
               params={{ endpoint: "/tv/on_the_air" }}
            />

            <MediaGrid
               title={t("localLegends.title")}
               subtitle={t("localLegends.subtitle", {
                  countryGenitive: countryGenitiveName,
               })}
               mediaType="all"
               params={{
                  withOriginalLanguage: originalLanguage,
                  sortBy: "popularity.desc",
                  voteCountGte: 10,
               }}
            />

            <MediaCarousel
               title={t("popularInCountry.title", {
                  country: countryName,
               })}
               subtitle={t("popularInCountry.subtitle")}
               mediaType="all"
               params={{
                  withOriginalLanguage: originalLanguage,
                  sortBy: "popularity.desc",
                  voteCountGte: 100,
               }}
            />

            <MediaGrid
               title={t("actionAdventure.title")}
               subtitle={t("actionAdventure.subtitle")}
               mediaType="tv"
               params={{
                  genreId: 10759,
                  sortBy: "popularity.desc",
                  withoutGenres: 16,
                  voteCountGte: 3000,
               }}
            />

            <MediaCarousel
               title={t("comedy.title")}
               subtitle={t("comedy.subtitle")}
               mediaType="movie"
               params={{
                  genreId: 35,
                  sortBy: "popularity.desc",
                  withoutGenres: "16, 878",
                  voteCountGte: 1500,
               }}
            />

            <MediaCarousel
               title={t("adrenalineRush.title")}
               subtitle={t("adrenalineRush.subtitle")}
               mediaType="movie"
               params={{
                  genreId: 28,
                  sortBy: "popularity.desc",
                  withoutGenres: "878|16",
                  voteCountGte: 1000,
               }}
            />

            <MediaGrid
               title={t("HBO_hits.title")}
               subtitle={t("HBO_hits.subtitle")}
               mediaType="tv"
               params={{
                  providerId: 1899,
                  sortBy: "popularity.desc",
                  withoutGenres: 16,
                  voteCountGte: 2500,
               }}
            />

            <MediaCarousel
               title={t("Apple.title")}
               subtitle={t("Apple.subtitle")}
               mediaType="tv"
               params={{
                  providerId: 350,
                  sortBy: "popularity.desc",
                  voteCountGte: 1500,
               }}
            />

            <MediaGrid
               title={t("Netflix.title")}
               subtitle={t("Netflix.subtitle")}
               mediaType="tv"
               params={{
                  providerId: 8,
                  sortBy: "popularity.desc",
                  voteCountGte: 3000,
                  withoutGenres: 16,
               }}
            />

            <MediaCarousel
               title={t("mindGames.title")}
               subtitle={t("mindGames.subtitle")}
               mediaType="movie"
               params={{
                  genreId: 53,
                  sortBy: "vote_average.desc",
                  voteCountGte: 1500,
               }}
            />

            <MediaGrid
               title={t("EdgeOfYourSeatTV.title")}
               subtitle={t("EdgeOfYourSeatTV.subtitle")}
               mediaType="tv"
               params={{
                  genreId: 9648,
                  sortBy: "popularity.desc",
                  voteCountGte: 1000,
               }}
            />

            <MediaGrid
               title={t("HeartWrenchingStories.title")}
               subtitle={t("HeartWrenchingStories.subtitle")}
               mediaType="movie"
               params={{
                  genreId: 18,
                  sortBy: "vote_average.desc",
                  withoutGenres: "80, 16, 53, 878",
                  voteCountGte: 4000,
               }}
            />

            <MediaCarousel
               title={t("Family.title")}
               subtitle={t("Family.subtitle")}
               mediaType="movie"
               params={{
                  genreId: 10751,
                  sortBy: "popularity.desc",
                  voteCountGte: 1000,
               }}
            />

            <MediaCarousel
               title={t("TimeCapsule.title")}
               subtitle={t("TimeCapsule.subtitle")}
               mediaType="movie"
               params={{
                  releaseDateGte: "1990-01-01",
                  releaseDateLte: "1990-12-31",
                  withoutGenres: 16,
                  sortBy: "vote_average.desc",
                  voteCountGte: 800,
               }}
            />

            <MediaGrid
               title={t("BoxOffice.title")}
               subtitle={t("BoxOffice.subtitle")}
               mediaType="movie"
               params={{
                  sortBy: "revenue.desc",
                  withoutGenres: 16,
               }}
            />

            <MediaCarousel
               title={t("TopRated.title")}
               subtitle={t("TopRated.subtitle")}
               mediaType="movie"
               params={{
                  sortBy: "vote_average.desc",
                  voteCountGte: 5000,
               }}
            />
         </div>
      </div>
   );
}
