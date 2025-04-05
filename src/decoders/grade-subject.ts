import type { CheerioAPI, Cheerio } from "cheerio";
import { Grade, Subject } from "~/models";
import { decodeGrade } from "./grade";

export const decodeGradeSubject = ($: CheerioAPI, container: Cheerio<any>): Subject => {
  const subjectName = container.find(".notes-padding-top").first().text().trim();
  const teacherName = $(container.find(".notes-padding-top")[1]).text().trim();

  const subject: Subject = {
    name: subjectName,
    teacherName,
    grades: []
  };

  const grades = container.find(".border-notes[data-toggle=\"tooltip\"]").map((_, el) => {
    return decodeGrade($, $(el), subject);
  }).toArray();

  subject.grades = grades;

  return subject;
};
