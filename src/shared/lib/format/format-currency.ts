export const formatCurrency = (value: number, locale: string = "en-US") => {
   if (!value) return null;
   return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
   }).format(value);
};
