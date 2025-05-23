import grades from "!/Notes.2.html" with { type: "text" };
import gradesEmpty from "!/Notes.empty.html" with { type: "text" };
import { expect, test } from "bun:test";
import * as cheerio from "cheerio";

import { decodePeriod } from "./period";

test("decodePeriod", () => {
  const $ = cheerio.load(grades);
  const period = decodePeriod($, 1);

  expect(period).toStrictEqual({
    endDate: new Date(2023, 1, 20, 23, 59, 59, 999),
    id: 1,
    name: "1ère période",
    startDate: new Date(2022, 8, 1, 0, 0, 0, 0)
  });
});

test("decodePeriod with empty page", () => {
  const $ = cheerio.load(gradesEmpty);
  const period = decodePeriod($, 1);

  expect(period).toBeNull();
});
