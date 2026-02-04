// utils/formatNumber.ts
export const formatToK = (num: number) =>
  num >= 1000
    ? `${(num / 1000).toFixed(num % 1000 === 0 ? 0 : 1)}k`
    : num;
