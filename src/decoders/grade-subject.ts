import type { Cheerio, CheerioAPI } from "cheerio";

import type { Subject } from "~/models";
import { Grade } from "~/models";

import { decodeGrade } from "./grade";

export const decodeGradeSubject = ($: CheerioAPI, container: Cheerio<any>): Subject => {
  const subjectName = container.find(".notes-padding-top").first().text().trim();
  const teacherName = $(container.find(".notes-padding-top")[1]).text().trim();

  const grades = container.find(".border-notes[data-toggle=\"tooltip\"]").map((_, el) => {
    return decodeGrade($, $(el));
  }).toArray();

  const subject: Subject = {
    grades,
    name: subjectName,
    teacherName
  };

  return subject;
};
