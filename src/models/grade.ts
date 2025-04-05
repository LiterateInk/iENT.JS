import { Subject } from "./subject";

export type Grade = {
  date: Date,
  title: string,
  type: string,
  value: number,
  outOf: number,
  coefficient: number,
  subject: Subject
};
