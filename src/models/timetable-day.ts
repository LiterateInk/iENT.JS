import type { TimetableEvent } from "./timetable-event";

export type TimetableDay = {
  date: Date
  services: string[]
  events: TimetableEvent[]
};
