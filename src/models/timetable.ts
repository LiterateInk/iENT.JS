import type { TimetableDay } from "./timetable-day";

export type Timetable = {
  days: Array<TimetableDay>
  endDate: Date
  startDate: Date
};
