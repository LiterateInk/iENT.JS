export const mapHoursToDate = (hours: string[], day: Date): Date[] => {
  return hours.map((hour) => {
    const [hours, minutes] = hour.split("h").map(Number);

    // use the timetable date and set the hours and minutes
    const date = new Date(day);
    date.setHours(hours, minutes);

    return date;
  });
};
