export type TimetableEvent = {
  colorHex: string;
  endDate: Date;
  startDate: Date;
} & (
  | {
    description: string;
    id: number;
    teacherName: string;
    title: string;
    type: "lesson";
  }
  | { type: "holiday" | "work" }
);
