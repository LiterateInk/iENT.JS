import type { CheerioAPI } from "cheerio";

import type { GradeYear } from "~/models/grade-year";

import { decodeGradeYear } from "./grade-year";

export const decodeGradeYears = ($: CheerioAPI): GradeYear[] => {
  const gradeYearContainers = $(".card-header>select>option");

  return gradeYearContainers.map((_, el) => decodeGradeYear($, $(el))).toArray();
};
