import { type Fetcher, defaultFetcher } from "@literate.ink/utilities";
import type { Period, Subject } from "~/models";

import * as cheerio from "cheerio";
import { decodeGrades } from "~/decoders/grades";
import { YearlyGradesOverview } from "~/utils";
import { decodePeriod } from "~/decoders/period";
import { GradeYear } from "~/models/grade-year";
import { decodeGradeYears } from "~/decoders/grade-years";

export const getGradeYears = async (sessionID: string, fetcher: Fetcher = defaultFetcher): Promise<GradeYear[]> => {
  const response = await fetcher({
    url: new URL("https://www.ient.fr/notes"),
    headers: { Cookie: `ient=${sessionID}` },
    redirect: "manual"
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
      url: new URL(`https://www.ient.fr/notes?annee=${year}&periode=${periodID}`),
      headers: { Cookie: `ient=${sessionID}` },
      redirect: "manual"
    });

    const $ = cheerio.load(response.content);

    const period = decodePeriod($, periodID);
    const subjects = decodeGrades($);

    periodsMap.set(period, subjects);

    const nextPeriodArrow = $(".row.periode>div:nth-child(3) .fa-chevron-right:not(.disabled)");

    if (!nextPeriodArrow.length)
      periodID = -1;
  }

  return new YearlyGradesOverview(periodsMap);
};
