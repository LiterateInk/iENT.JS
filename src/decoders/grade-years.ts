import type { CheerioAPI } from "cheerio";
import type { GradeYear } from "~/models/grade-year";

export const decodeGradeYears = ($: CheerioAPI): GradeYear[] => {
  const options = $(".card-header>select>option");

  return options.map((_, element) => {
    const option = $(element);

    return {
      isDefault: ("selected" in option.attr()!),
      label: option.text().replace(/ /g, "").trim(),
      number: parseInt(option.attr()!.value)
    };
  }).toArray();
};
