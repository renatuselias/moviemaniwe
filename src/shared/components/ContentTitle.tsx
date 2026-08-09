export function ContentTitle({
   title,
   subtitle,
}: {
   title: string;
   subtitle: string;
}) {
   return (
      <div className="flex w-fit gap-4">
         <div className="w-1 h-12 animate-shimmer-stick"></div>
         <div className="flex flex-col text-sm">
            <span className="tracking-wider font-semibold uppercase text-xs text-zinc-600">
               {subtitle}
            </span>
            <h2 className="text-2xl font-semibold tracking-tighter">{title}</h2>
         </div>
      </div>
   );
}
