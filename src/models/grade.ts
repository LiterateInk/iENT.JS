import type { Subject } from "./subject";

export interface Grade {
  coefficient: number;
  date: Date;
  outOf: number;
  subject: Subject;
  title: string;
  type: string;
  value: number;
}
