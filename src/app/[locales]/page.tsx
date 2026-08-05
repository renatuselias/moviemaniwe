import { MainPage } from "@/pages/main";
// import { getDiscoverMovies } from "@/entities/media";
import { getTrendingMedia } from "@/entities/media";

export default async function Home() {
   // const data = await getDiscoverMovies("28", "1");
   const data = await getTrendingMedia();

   return <MainPage media={data.results} />;
}
