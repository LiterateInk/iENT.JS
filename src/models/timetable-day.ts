import type { TimetableEvent } from "./timetable-event";

export interface TimetableDay {
  date: Date;
  events: TimetableEvent[];
  services: string[];
}
