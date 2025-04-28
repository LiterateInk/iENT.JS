import type { Cheerio, CheerioAPI } from "cheerio";
import type { Element } from "domhandler";

import type { Subject } from "~/models";
import { decodeGrade } from "./grade";

export const decodeGradeSubject = ($: CheerioAPI, container: Cheerio<Element>): Subject => {
  const name = container.find(".notes-padding-top").first().text().trim();
  const teacherName = $(container.find(".notes-padding-top")[1]).text().trim();

  const grades = container.find(".border-notes[data-toggle=\"tooltip\"]").map((_, el) => {
    return decodeGrade($, $(el));
  }).toArray();

  const subject: Subject = {
    grades,
    name,
    teacherName
  };

  return subject;
};
