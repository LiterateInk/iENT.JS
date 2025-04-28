import type { CheerioAPI } from "cheerio";

import type { Subject } from "~/models";

import { decodeGradeSubject } from "./grade-subject";

export const decodeGrades = ($: CheerioAPI): Subject[] => {
  const subjectsRows = $(".card-body>.row").slice(2);
  return subjectsRows.map((_, container) =>
    decodeGradeSubject($, $(container))
  ).toArray();
};
