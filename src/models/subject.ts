import type { Grade } from "./grade";

export interface Subject {
  grades: Grade[];
  name: string;
  teacherName: string;
}
