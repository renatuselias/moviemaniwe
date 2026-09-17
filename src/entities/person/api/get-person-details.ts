"use server";

import { tmdbFetch } from "@/shared/api/tmdb/tmdb-api";
import { TMDB_LANGUAGES } from "@/shared/config/tmdb-languages";
import { getLocale } from "next-intl/server";
import { TmdbPersonDetail } from "../model/types";

export async function getPersonDetail(
   personId: number | string,
): Promise<TmdbPersonDetail> {
   const locale = await getLocale();

   const language = TMDB_LANGUAGES[locale] ?? locale;

   return tmdbFetch(
      `/person/${personId}`,
      {
         language,
         append_to_response: "combined_credits,external_ids",
      },
      86400,
   );
}
