import type { CheerioAPI } from "cheerio";

import type { Homepage } from "~/models";
import { mapHoursToDate } from "~/core/map-hours-to-date";
import { decodeTimetableContent } from "./timetable-content";
import { decodeTimetableHours } from "./timetable-hours";

export const decodeHomepage = ($: CheerioAPI): Homepage => {
  const homepage: Homepage = {
    news: "",
    timetable: {
      date: new Date(),
      hours: [],
      events: []
    },
    messages: []
  };

  $(".card.card-primary").each((_, element) => {
    const card = $(element);

    const title = card.find(".card-header").text().trim();
    let body = card.find(".card-body");

    switch (title) {
      case "News": {
        const data = body.html()?.trim() ?? "";
        homepage.news = data;
        break;
      }

      case "Planning": {
        body = card.find("a").first();

        {
          // e.g.: "/planninghebdo?date=2024-12-20"
          const date = body.attr("href")!;

          homepage.timetable.date = new Date(date.split("=")[1]);
          // reset the hours, to prevent any issues with timezone
          homepage.timetable.date.setHours(0, 0, 0, 0);
        }

        // positions of each hours in the timetable
        const { hours, slots } = decodeTimetableHours($);
        homepage.timetable.hours = mapHoursToDate(hours, homepage.timetable.date);

        const events = decodeTimetableContent($, body, slots, homepage.timetable.hours);
        homepage.timetable.events = events;

        break;
      }

      case "Messagerie": {
        homepage.messages = body.find("ul.chat > li > a").map((_, element) => {
          const message = $(element);
          const body = message.find(".chat-body");
          const id = decodeURIComponent(message.attr("href")!.split("?id=")[1]);

          const header = body.children().first();
          const sender = header.find("strong").text().trim();
          const sentDisplayDate = header.find("small").text().trim();

          const subjectContainer = header.next();
          const subject = subjectContainer.text().trim();

          const contentContainer = subjectContainer.next();
          const content = contentContainer.text().trim();

          return { id, sender, sentDisplayDate, subject, content };
        }).toArray();

        break;
      }

      // TODO: whenever an account supports them...
      case "Travail à faire":
      case "Dernières notes":
      case "Dernières absences":
        break;
    }
  });

  return homepage;
};
