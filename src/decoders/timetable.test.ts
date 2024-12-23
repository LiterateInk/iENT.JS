import { expect, test } from "bun:test";
import * as cheerio from "cheerio";

import { decodeTimetable } from "./timetable";

import timetable_during_work from "!/planninghebdo.1.html" with { type: "text" };
import timetable_full_lessons from "!/planninghebdo.2.html" with { type: "text" };
import timetable_during_vacations from "!/planninghebdo.3.html" with { type: "text" };

// (edge case) transition means from 30/12 to 05/01/2025
test("decodeTimetable during work week with end of the year", () => {
  const $ = cheerio.load(timetable_during_work);
  const timetable = decodeTimetable($);
});

test("decodeTimetable for an entire full week of lessons", () => {
  const $ = cheerio.load(timetable_full_lessons);
  const timetable = decodeTimetable($);
  // console.dir(timetable, { depth: Infinity });
});

test("decodeTimetable during vacations", () => {
  const $ = cheerio.load(timetable_during_vacations);
  const timetable = decodeTimetable($);

  const startDate = new Date("2024-04-15");
  expect(timetable.startDate).toStrictEqual(startDate);

  const endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + 6); // until sunday in the UI
  expect(timetable.endDate).toStrictEqual(endDate);

  // it still shows the view from monday to friday
  expect(timetable.days).toHaveLength(5);

  for (const day of timetable.days) {
    expect(day.events).toHaveLength(1);
    const event = day.events[0];

    const expectedStartDate = new Date(day.date);
    expectedStartDate.setHours(7, 30, 0, 0);

    const expectedEndDate = new Date(day.date);
    expectedEndDate.setHours(19, 30, 0, 0);

    expect(event).toStrictEqual({
      type: "holiday",
      colorHex: "#fbf2e4",
      startDate: expectedStartDate,
      endDate: expectedEndDate
    });
  }
});
