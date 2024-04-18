/**
 * Formats a given datetime string into the format "DD/MM/YYYY".
 * 
 * @param datetime The datetime string to be formatted.
 * @returns The date string in "DD/MM/YYYY" format.
 */
export function formatDate(datetime: string): string {
  // Create a new Date object from the provided datetime string
  const date = new Date(datetime);

  // Get the day, month, and year components from the date object
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based
  const year = date.getFullYear().toString();

  return `${day}/${month}/${year}`;
}
