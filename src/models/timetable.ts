import type { TimetableDay } from "./timetable-day";

export interface Timetable {
  days: Array<TimetableDay>;
  endDate: Date;
  startDate: Date;
}
