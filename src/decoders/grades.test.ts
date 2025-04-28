import type { Grade, Subject } from "~/models";
import grades from "!/Notes.2.html" with { type: "text" };
import gradesEmpty from "!/Notes.empty.html" with { type: "text" };
import { expect, test } from "bun:test";

import * as cheerio from "cheerio";

import { decodeGrades } from "./grades";

test("decodeGrades", () => {
  const $ = cheerio.load(grades);

  const subjects: Subject[] = [
    {
      grades: [
        {
          coefficient: 2,
          date: new Date(2022, 10, 18),
          outOf: 20,
          title: "Evaluation chapitre 1",
          type: "Contrôle",
          value: 13
        }
      ],
      name: "Mathématiques",
      teacherName: "Mr EULER"
    },
    {
      grades: [
        {
          coefficient: 1,
          date: new Date(2023, 0, 30),
          outOf: 20,
          title: "Participation travaux de groupe",
          type: "Contrôle",
          value: 15
        }
      ],
      name: "Education socioculturelle",
      teacherName: "Mr OUVERTURE"
    },
    {
      grades: [
        {
          coefficient: 1,
          date: new Date(2023, 0, 4),
          outOf: 20,
          title: "Budget1",
          type: "Contrôle",
          value: 10.5
        }, {
          coefficient: 1,
          date: new Date(2023, 2, 31),
          outOf: 20,
          title: "Budget2",
          type: "Contrôle",
          value: 20
        }
      ],
      name: "Sciences éco/sociales et de gestion",
      teacherName: "Mr OUVERTURE"
    },
    {
      grades: [
        {
          coefficient: 1,
          date: new Date(2022, 8, 17),
          outOf: 20,
          title: "Carte",
          type: "Contrôle",
          value: 12
        }, {
          coefficient: 1,
          date: new Date(2022, 10, 11),
          outOf: 20,
          title: "Questions pour un champion",
          type: "Contrôle",
          value: 1
        }
      ],
      name: "Histoire/géographie",
      teacherName: "Mme MAGELLAN"
    },
    {
      grades: [
        {
          coefficient: 1,
          date: new Date(2022, 10, 7),
          outOf: 20,
          title: "contrôle 1",
          type: "Contrôle",
          value: 15.5
        }, {
          coefficient: 1,
          date: new Date(2022, 10, 18),
          outOf: 20,
          title: "contrôle 2",
          type: "Contrôle",
          value: 17
        }
      ],
      name: "Informatique et média",
      teacherName: "Mme ORDINATEUR"
    }
  ];

  expect(decodeGrades($)).toStrictEqual(subjects);
});

test("decodeGrades with empty page", () => {
  const $ = cheerio.load(gradesEmpty);

  expect(decodeGrades($)).toBeEmpty();
});
