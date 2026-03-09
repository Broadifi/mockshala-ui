export function normalizeDuration(minutes: number): string {
  if (!minutes || minutes <= 0) return "0 mins";

  // Keep minutes if 60 or less
  if (minutes <= 60) {
    return `${minutes} mins`;
  }

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  if (remainingMinutes === 0) {
    return `${hours} hr`;
  }

  return `${hours} hr ${remainingMinutes} mins`;
}