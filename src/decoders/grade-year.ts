import { Cheerio, CheerioAPI } from "cheerio";
import { GradeYear } from "~/models/grade-year";

export const decodeGradeYear = ($: CheerioAPI, container: Cheerio<any>): GradeYear => {
  const number = Number.parseInt(container.attr()!["value"]);
  const isDefault = ("selected" in container.attr()!);
  const label = container.text().trim();

  return {
    isDefault,
    label,
    number
  };
};
