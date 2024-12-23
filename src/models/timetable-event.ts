export type TimetableEvent = {
  colorHex: string
  startDate: Date
  endDate: Date
} & (
  | {
    type: "lesson"
    title: string
    teacherName: string
    description: string
  }
  | { type: "work" }
);
