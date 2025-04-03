export const parseFrenchDateString = (date: string): Date => new Date(date.trim().split("/").reverse().join("-"));
