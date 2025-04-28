import type { Cheerio, CheerioAPI } from "cheerio";
import type { Element } from "domhandler";

import type { Grade } from "~/models";
import { parseFrenchDateString } from "~/utils";

export const decodeGrade = ($: CheerioAPI, container: Cheerio<Element>): Grade => {
  const [day, month, year] = container.find(".note-date")
    .text().trim().split("/");
  const date = parseFrenchDateString(day + "/" + month + "/" + "20" + year);

  const outOf = parseInt(container.find(".note-sur").text().trim().substring(1));
  const value = parseFloat(container.find(".note-note").text().trim());
  const title = container.find(".detail-absences-txt").text().trim();

  const infoContainer = $(container.find(".detail-absences").first());

  const type = infoContainer.find("div")
    .first().text().trim();

  const coefficient = parseFloat(
    $(infoContainer.find("div")[1])
      .text().trim()
      .replace("Coeff ", "")
  );

  return {
    coefficient,
    date,
    outOf,
    title,
    type,
    value
  };
};
