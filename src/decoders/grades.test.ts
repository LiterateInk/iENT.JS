import { test, expect } from "bun:test";

import * as cheerio from "cheerio";
import { decodeGrades } from "./grades";

import grades from "!/Notes.2.html" with { type: "text" };
import { Grade, Subject } from "~/models";

test("decodeGrades", () => {
  const $ = cheerio.load(grades);

  const subjects: Subject[] = [
    {
      name: "Mathématiques",
      teacherName: "Mr EULER",
      grades: []
    },
    {
      name: "Education socioculturelle",
      teacherName: "Mr OUVERTURE",
      grades: []
    },
    {
      name: "Sciences éco/sociales et de gestion",
      teacherName: "Mr OUVERTURE",
      grades: []
    },
    {
      name: "Histoire/géographie",
      teacherName: "Mme MAGELLAN",
      grades: []
    },
    {
      name: "Informatique et média",
      teacherName: "Mme ORDINATEUR",
      grades: []
    }
  ];

  const gradesArrs: Grade[][] = [
    [
      {
        date: new Date(2022, 10, 18),
        outOf: 20,
        value: 13,
        title: "Evaluation chapitre 1",
        type: "Contrôle",
        coefficient: 2,
        //@ts-expect-error
        subject: undefined
      }
    ],
    [
      {
        date: new Date(2023, 0, 30),
        outOf: 20,
        value: 15,
        title: "Participation travaux de groupe",
        type: "Contrôle",
        coefficient: 1,
        //@ts-expect-error
        subject: undefined
      }
    ],
    [
      {
        date: new Date(2023, 0, 4),
        outOf: 20,
        value: 10.5,
        title: "Budget1",
        type: "Contrôle",
        coefficient: 1,
        //@ts-expect-error
        subject: undefined
      }, {
        date: new Date(2023, 2, 31),
        outOf: 20,
        value: 20,
        title: "Budget2",
        type: "Contrôle",
        coefficient: 1,
        //@ts-expect-error
        subject: undefined
      }
    ],
    [
      {
        date: new Date(2022, 8, 17),
        outOf: 20,
        value: 12,
        title: "Carte",
        type: "Contrôle",
        coefficient: 1,
        //@ts-expect-error
        subject: undefined
      }, {
        date: new Date(2022, 10, 11),
        outOf: 20,
        value: 1,
        title: "Questions pour un champion",
        type: "Contrôle",
        coefficient: 1,
        //@ts-expect-error
        subject: undefined
      }
    ],
    [
      {
        date: new Date(2022, 10, 7),
        outOf: 20,
        value: 15.5,
        title: "contrôle 1",
        type: "Contrôle",
        coefficient: 1,
        //@ts-expect-error
        subject: undefined
      }, {
        date: new Date(2022, 10, 18),
        outOf: 20,
        value: 17,
        title: "contrôle 2",
        type: "Contrôle",
        coefficient: 1,
        //@ts-expect-error
        subject: undefined
      }
    ]
  ]

  gradesArrs.forEach((arr, i) => {
    arr.forEach((grade) => {
      grade.subject = subjects[i];
    });

    subjects[i].grades = arr;
  });

  expect(decodeGrades($)).toStrictEqual(subjects);
});
