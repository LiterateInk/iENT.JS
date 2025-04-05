import type { TimetableEvent } from "./timetable-event";

export type TimetableDay = {
  date: Date
  events: TimetableEvent[]
  services: string[]
};
