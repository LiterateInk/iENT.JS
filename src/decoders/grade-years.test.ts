import { test, expect } from "bun:test";

import * as cheerio from "cheerio";

import grades from "!/Notes.2.html" with { type: "text" };
import { GradeYear } from "~/models/grade-year";
import { decodeGradeYears } from "./grade-years";

test("decodeGradeYears", () => {
  const $ = cheerio.load(grades);

  const years: GradeYear[] = [
    {
      isDefault: true,
      label: "2022/ 2023",
      number: 24
    }, {
      isDefault: false,
      label: "2023/ 2024",
      number: 25
    }, {
      isDefault: false,
      label: "2024/ 2025",
      number: 26
    }
  ];

  expect(decodeGradeYears($)).toStrictEqual(years);
});
