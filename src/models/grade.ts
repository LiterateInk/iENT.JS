import { Subject } from "./subject";

export type Grade = {
  coefficient: number,
  date: Date,
  outOf: number,
  subject: Subject
  title: string,
  type: string,
  value: number,
};
