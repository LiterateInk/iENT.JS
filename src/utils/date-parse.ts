/**
 * Parses a date string in the format "dd/mm/yyyy" and returns a `Date` object.
 */
export const parseFrenchDateString = (date: string): Date =>
  new Date(date.trim().split("/").reverse().join("-"));
