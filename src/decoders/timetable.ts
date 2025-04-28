import type { CheerioAPI } from "cheerio";

import type { Timetable, TimetableDay } from "~/models";

import { mapHoursToDate } from "~/core/map-hours-to-date";
import { onlyNumbers } from "~/core/only-numbers";

import { decodeTimetableContent } from "./timetable-content";
import { decodeTimetableHours } from "./timetable-hours";

export const decodeTimetable = ($: CheerioAPI): Timetable => {
  const { hours, slots } = decodeTimetableHours($);
  let startDate: Date;
  let endDate: Date;

  {
    // "Semaine du DD/MM au DD/MM/YYYY"
    const [start, end] = $(".periode").text().trim().split("au");
    const [startDay, startMonth] = start.split("/").map(onlyNumbers);
    const [endDay, endMonth, endYear] = end.split("/").map(onlyNumbers);

    let startYear = endYear;

    // edge case when the end of the year is reached
    if (startMonth > endMonth) {
      startYear -= 1;
    }

    startDate = new Date(startYear, startMonth - 1, startDay);
    startDate.setHours(0, 0, 0, 0);
    endDate = new Date(endYear, endMonth - 1, endDay);
    endDate.setHours(0, 0, 0, 0);
  }

  const days: Array<TimetableDay> = [];

  $(".row-jour").children(".col-sm-1.col-12").each((index, element) => {
    const day = $(element);

    const date = new Date(startDate);
    date.setDate(startDate.getDate() + index);

    const dateHours = mapHoursToDate(hours, date);

    const services = day.find(`#mat_${index + 1}_service_bulle`)
      .find("td")
      .map((_, element) => $(element).text().trim())
      .toArray();

    const events = decodeTimetableContent($, day, slots, dateHours);

    days.push({ date, events, services });
  });

  return {
    days,
    endDate,
    startDate
  };
};
