export type TimetableEvent = {
  colorHex: string
  startDate: Date
  endDate: Date
} & (
  | {
    id: number
    type: "lesson"
    title: string
    teacherName: string
    description: string
  }
  | { type: "work" | "holiday" }
);
