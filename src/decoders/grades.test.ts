import grades from "!/Notes.2.html" with { type: "text" };
import gradesEmpty from "!/Notes.empty.html" with { type: "text" };
import { expect, test } from "bun:test";
import * as cheerio from "cheerio";

import { Grade, Subject } from "~/models";

import { decodeGrades } from "./grades";

test("decodeGrades", () => {
  const $ = cheerio.load(grades);

  const subjects: Subject[] = [
    {
      grades: [],
      name: "Mathématiques",
      teacherName: "Mr EULER"
    },
    {
      grades: [],
      name: "Education socioculturelle",
      teacherName: "Mr OUVERTURE"
    },
    {
      grades: [],
      name: "Sciences éco/sociales et de gestion",
      teacherName: "Mr OUVERTURE"
    },
    {
      grades: [],
      name: "Histoire/géographie",
      teacherName: "Mme MAGELLAN"
    },
    {
      grades: [],
      name: "Informatique et média",
      teacherName: "Mme ORDINATEUR"
    }
  ];

  const gradesArrs: Grade[][] = [
    [
      {
        coefficient: 2,
        date: new Date(2022, 10, 18),
        outOf: 20,
        //@ts-expect-error
        subject: undefined,
        title: "Evaluation chapitre 1",
        type: "Contrôle",
        value: 13
      }
    ],
    [
      {
        coefficient: 1,
        date: new Date(2023, 0, 30),
        outOf: 20,
        //@ts-expect-error
        subject: undefined,
        title: "Participation travaux de groupe",
        type: "Contrôle",
        value: 15
      }
    ],
    [
      {
        coefficient: 1,
        date: new Date(2023, 0, 4),
        outOf: 20,
        //@ts-expect-error
        subject: undefined,
        title: "Budget1",
        type: "Contrôle",
        value: 10.5
      }, {
        coefficient: 1,
        date: new Date(2023, 2, 31),
        outOf: 20,
        //@ts-expect-error
        subject: undefined,
        title: "Budget2",
        type: "Contrôle",
        value: 20
      }
    ],
    [
      {
        coefficient: 1,
        date: new Date(2022, 8, 17),
        outOf: 20,
        //@ts-expect-error
        subject: undefined,
        title: "Carte",
        type: "Contrôle",
        value: 12
      }, {
        coefficient: 1,
        date: new Date(2022, 10, 11),
        outOf: 20,
        //@ts-expect-error
        subject: undefined,
        title: "Questions pour un champion",
        type: "Contrôle",
        value: 1
      }
    ],
    [
      {
        coefficient: 1,
        date: new Date(2022, 10, 7),
        outOf: 20,
        //@ts-expect-error
        subject: undefined,
        title: "contrôle 1",
        type: "Contrôle",
        value: 15.5
      }, {
        coefficient: 1,
        date: new Date(2022, 10, 18),
        outOf: 20,
        //@ts-expect-error
        subject: undefined,
        title: "contrôle 2",
        type: "Contrôle",
        value: 17
      }
    ]
  ];

  gradesArrs.forEach((arr, i) => {
    arr.forEach((grade) => {
      grade.subject = subjects[i];
    });

    subjects[i].grades = arr;
  });

  expect(decodeGrades($)).toStrictEqual(subjects);
});

test("decodeGrades with empty page", () => {
  const $ = cheerio.load(gradesEmpty);

  expect(decodeGrades($)).toBeEmpty();
});
