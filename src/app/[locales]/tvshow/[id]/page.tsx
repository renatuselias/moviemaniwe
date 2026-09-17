import { notFound } from "next/navigation";
import { Metadata } from "next";
import { MediaPage } from "@/pages/media/ui/MediaPage";
import { getMediaDetails } from "@/entities/media";
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
   const tv = await getMediaDetails(id, "tv", false);

   if (!tv) {
      return {
         title: "TV Show Not Found | MovieMan",
      };
   }

   return {
      title: `${tv.title} | MovieMan`,
      description: tv.overview,
   };
}

export default async function TvPage({ params }: MoviePageProps) {
   const { id } = await params;
   const numericId = Number(id);
   const queryClient = new QueryClient();

   const queryKey = [MEDIA_EXTRAS_QUERY_KEY, numericId, "tv", true];

   await queryClient.prefetchQuery({
      queryKey,
      queryFn: () => getMediaDetails(id, "tv", true),
   });

   const state = queryClient.getQueryState(queryKey);

   if (!state?.data) {
      notFound();
   }

   return (
      <HydrationBoundary state={dehydrate(queryClient)}>
         <MediaPage
            mediaId={numericId}
            mediaType="tv"
         />
      </HydrationBoundary>
   );
}
