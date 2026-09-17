import { useTranslations } from "next-intl";
import { formatRuntime } from "@/shared/lib/format";

interface FormattedRuntimeProps {
   runtime: number;
   className?: string;
}

export function FormattedRuntime({
   runtime,
   className,
}: FormattedRuntimeProps) {
   const t = useTranslations();
   const { hour, minute } = formatRuntime(runtime);

   if (!runtime || runtime <= 0) return null;

   const formattedString =
      hour > 0
         ? `${hour}${t("mediaDetail.hour")} ${minute > 0 ? `${minute}${t("mediaDetail.minute")}` : ""}`
         : `${minute}${t("mediaDetail.minute")}`;

   return <span className={className}>{formattedString}</span>;
}
