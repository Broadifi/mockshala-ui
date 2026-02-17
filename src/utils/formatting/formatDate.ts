  //   format published date
  export function formatDate(dateStr: string) {
    const formattedDate = new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });

    return formattedDate;
  }


  export function formatDateToISO(dateStr: string | undefined) {
  if (!dateStr) return undefined;
  const [day, month, year] = dateStr.split('-');
  return `${year}-${month}-${day}`;
}