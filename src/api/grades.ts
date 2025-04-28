import type { Period, Subject } from "~/models";
import type { GradeYear } from "~/models/grade-year";

import { HttpRequest, send } from "schwi";

import { decodeGradeYears } from "~/decoders/grade-years";
import { decodeGrades } from "~/decoders/grades";
import { decodePeriod } from "~/decoders/period";
import { YearlyGradesOverview } from "~/utils";

export const getGradeYears = async (sessionID: string): Promise<GradeYear[]> => {
  const request = new HttpRequest.Builder("https://www.ient.fr/notes")
    .setRedirection(HttpRequest.Redirection.MANUAL)
    .setCookie("ient", sessionID)
    .build();

  const response = await send(request);
  const html = await response.toHTML();

  return decodeGradeYears(html);
};

export const getGradesForYear = async (sessionID: string, year: number): Promise<YearlyGradesOverview> => {
  let periodID = 0;

  const periodsMap: Map<Period, Subject[]> = new Map();

  while (periodID >= 0) {
    periodID += 1;

    const request = new HttpRequest.Builder("https://www.ient.fr/notes")
      .setRedirection(HttpRequest.Redirection.MANUAL)
      .setUrlSearchParameter("annee", String(year))
      .setUrlSearchParameter("periode", String(periodID))
      .setCookie("ient", sessionID)
      .build();

    const response = await send(request);
    const html = await response.toHTML();

    const period = decodePeriod(html, periodID);
    const subjects = decodeGrades(html);

    if (period)
      periodsMap.set(period, subjects);

    const nextPeriodArrow = html(".row.periode>div:nth-child(3) .fa-chevron-right:not(.disabled)");

    if (!nextPeriodArrow.length)
      periodID = -1;
  }

  return new YearlyGradesOverview(periodsMap);
};
