import type * as cheerio from "cheerio";

import type { Subject } from "~/models";

import { decodeGradeSubject } from "./grade-subject";

export const decodeGrades = ($: cheerio.CheerioAPI): Subject[] => {
  const subjectsRows = $(".card-body>.row").slice(2);
  return subjectsRows.map((_, el) => decodeGradeSubject($, $(el))).toArray();
};
