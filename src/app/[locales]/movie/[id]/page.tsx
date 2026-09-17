import { Metadata } from "next";
import { MediaPage } from "@/pages/media/ui/MediaPage";
import { getMediaDetails } from "@/entities/media";
import { notFound } from "next/navigation";
import {
   dehydrate,
   HydrationBoundary,
   QueryClient,
} from "@tanstack/react-query";
import { MEDIA_EXTRAS_QUERY_KEY } from "@/shared/config/query-keys";

interface MoviePageProps {
   params: Promise<{ id: string }>;
}

export async function generateMetadata({
   params,
}: MoviePageProps): Promise<Metadata> {
   const { id } = await params;
   const movie = await getMediaDetails(id, "movie", false);

   if (!movie) {
      return {
         title: "Movie Not Found | MovieMan",
      };
   }

   return {
      title: `${movie.title} | MovieMan`,
      description: movie.overview,
   };
}

export default async function MoviePage({ params }: MoviePageProps) {
   const { id } = await params;
   const numericId = Number(id);
   const queryClient = new QueryClient();

   const queryKey = [MEDIA_EXTRAS_QUERY_KEY, numericId, "movie", true];

   await queryClient.prefetchQuery({
      queryKey,
      queryFn: () => getMediaDetails(id, "movie", true),
   });

   const state = queryClient.getQueryState(queryKey);

   if (!state?.data) {
      notFound();
   }

   return (
      <HydrationBoundary state={dehydrate(queryClient)}>
         <MediaPage
            mediaId={numericId}
            mediaType="movie"
         />
      </HydrationBoundary>
   );
}
