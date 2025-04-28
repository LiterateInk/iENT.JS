import type { Period, Subject } from "~/models";
import type { GradeYear } from "~/models/grade-year";

import { defaultFetcher, type Fetcher } from "@literate.ink/utilities";

import * as cheerio from "cheerio";
import { decodeGradeYears } from "~/decoders/grade-years";
import { decodeGrades } from "~/decoders/grades";
import { decodePeriod } from "~/decoders/period";
import { YearlyGradesOverview } from "~/utils";

export const getGradeYears = async (sessionID: string, fetcher: Fetcher = defaultFetcher): Promise<GradeYear[]> => {
  const response = await fetcher({
    headers: { Cookie: `ient=${sessionID}` },
    redirect: "manual",
    url: new URL("https://www.ient.fr/notes")
  });

  const $ = cheerio.load(response.content);

  return decodeGradeYears($);
};

export const getGradesForYear = async (sessionID: string, year: number, fetcher: Fetcher = defaultFetcher): Promise<YearlyGradesOverview> => {
  let periodID = 0;

  const periodsMap: Map<Period, Subject[]> = new Map();

  while (periodID >= 0) {
    periodID += 1;

    const response = await fetcher({
      headers: { Cookie: `ient=${sessionID}` },
      redirect: "manual",
      url: new URL(`https://www.ient.fr/notes?annee=${year}&periode=${periodID}`)
    });

    const $ = cheerio.load(response.content);

    const period = decodePeriod($, periodID);
    const subjects = decodeGrades($);

    if (period)
      periodsMap.set(period, subjects);

    const nextPeriodArrow = $(".row.periode>div:nth-child(3) .fa-chevron-right:not(.disabled)");

    if (!nextPeriodArrow.length)
      periodID = -1;
  }

  return new YearlyGradesOverview(periodsMap);
};
