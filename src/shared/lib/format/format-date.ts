export function formatDate(date: string, format: "year" | "full" = "year") {
   return format === "year"
      ? date.split("-")[0]
      : date.split("-").reverse().join(".");
}
