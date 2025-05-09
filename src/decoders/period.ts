import type { CheerioAPI } from "cheerio";

import type { Period } from "~/models";
import { parseFrenchDateString } from "~/utils";

export function decodePeriod($: CheerioAPI, id: number): null | Period {
  const periodString = $(".row.periode>div:nth-child(2)").text();

  if (!periodString)
    return null;

  const periodName = periodString.split("(")[0].trim();
  const periodDateString = periodString.replace(periodName, "").replace("(", "").replace(")", "").replace(" ", "");

  const [startDateString, endDateString] = periodDateString.split("-");

  const startDate = parseFrenchDateString(startDateString);
  const endDate = parseFrenchDateString(endDateString);

  endDate.setHours(23);
  endDate.setMinutes(59);
  endDate.setSeconds(59);
  endDate.setMilliseconds(999);

  return {
    endDate,
    id,
    name: periodName,
    startDate
  };
};
