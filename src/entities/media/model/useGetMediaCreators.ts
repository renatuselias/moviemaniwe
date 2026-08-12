import { CreatedBy, MediaCrew } from "./types";

const hasJob = (person: MediaCrew, jobNames: string[]): boolean => {
   if (person.job && jobNames.includes(person.job)) {
      return true;
   }
   if (person.jobs && Array.isArray(person.jobs)) {
      return person.jobs.some((j) => jobNames.includes(j.job));
   }
   return false;
};

export function getTopCreators(
   mediaType: "movie" | "tv",
   createdBy?: CreatedBy[],
   crew: MediaCrew[] = [],
   limit = 3,
): CreatedBy[] {
   // TV completed list created_by
   if (mediaType === "tv" && createdBy && createdBy.length > 0) {
      return createdBy.slice(0, limit);
   }

   const mapCrewToCreator = (person: MediaCrew): CreatedBy => ({
      id: person.id,
      name: person.name,
      profile_path: person.profile_path, 
   });

   if (mediaType === "movie") {
      const directors = crew.filter((person) => hasJob(person, ["Director"]));

      if (directors.length > 0) {
         if (directors.length < limit) {
            const writers = crew.filter((person) =>
               hasJob(person, ["Screenplay", "Writer"]),
            );

            const combined = [...directors, ...writers];
            const unique = Array.from(
               new Map(combined.map((p) => [p.id, p])).values(),
            );

            return unique.slice(0, limit).map(mapCrewToCreator);
         }
         return directors.slice(0, limit).map(mapCrewToCreator);
      }
   }

   // if created_by upset
   const tvCreators = crew.filter((person) =>
      hasJob(person, ["Creator", "Executive Producer"]),
   );

   return tvCreators.slice(0, limit).map(mapCrewToCreator);
}
