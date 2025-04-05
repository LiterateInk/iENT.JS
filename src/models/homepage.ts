import type { MessagePreview } from "./message-preview";
import type { TimetableEvent } from "./timetable-event";

export type Homepage = {
  /** sorted by the most recent first */
  messages: MessagePreview[]

  /**
   * Raw HTML of the news card body, this is because it can be fully customizable.
   * Can be an empty string if there is no news card.
   */
  news: string;

  timetable: {
    date: Date;
    /** events sorted by the most recent first */
    events: TimetableEvent[];
    /** slots available */
    hours: Date[];
  }
};
