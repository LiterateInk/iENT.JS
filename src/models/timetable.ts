import type { TimetableDay } from "./timetable-day";

export type Timetable = {
  startDate: Date
  endDate: Date
  days: Array<TimetableDay>
};
