import type { CheerioAPI } from "cheerio";

import type { Homepage, TimetableEvent } from "~/models";
import { onlyNumbers } from "~/core/only-numbers";
import { nearest } from "~/core/nearest";

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
        const hoursSlots: number[] = [];

        {
          // e.g.: ["30", "8h", "30", "9h", "30", "10h"]
          const hours = body.find(".txt_planning_heure").map((_, element) => {
            const hour = $(element);

            // "top:0px;text-align:right;font-size:8px;" -> 0
            const slot = onlyNumbers(hour.attr("style")!.split(";")[0]);
            hoursSlots.push(slot);

            return hour.text().trim();
          }).toArray();

          // add the hour to the first element
          // e.g.: ["30", "8h"] -> ["7h30", "8h"]
          if (!hours[0].includes("h")) {
            hours[0] = `${Number(hours[1].replace("h", "")) - 1}h${hours[0]}`;
          }

          // add the hour to every other elements
          // e.g.: ["7h", "30", "8h", "30"] -> ["7h", "7h30", "8h", "8h30"]
          for (let index = 0; index < hours.length; index += 1) {
            if (hours[index].includes("h")) continue;
            if (typeof hours[index - 1] === "undefined") break;

            hours[index] = `${hours[index - 1].split("h")[0]}h${hours[index]}`;
          }

          // map the hours to a Date object for easier manipulation
          const mapped = hours.map((hour) => {
            const [hours, minutes] = hour.split("h").map(Number);

            // use the timetable date and set the hours and minutes
            const date = new Date(homepage.timetable.date);
            date.setHours(hours, minutes);

            return date;
          });

          homepage.timetable.hours = mapped;
        }

        {
          const day = body.find(".div_jour");
          const events: TimetableEvent[] = [];

          day.children(".sequence").each((_, element) => {
            const event = $(element);
            const text = event.text().trim();

            // e.g.: "top:63px; height:81px;background: #f00f00;"
            const styles = event.attr("style")!.trim().split(";").filter(Boolean);

            // "background:#f00f00" -> "#f00f00"
            const colorHex = styles.pop()!.split(":")[1].trim();

            if (text === "Entreprise") {
              events.push({
                type: "work",
                colorHex,
                // the first and last hours of the day...
                // that's how they show it in the timetable.
                startDate: homepage.timetable.hours[0],
                endDate: homepage.timetable.hours[homepage.timetable.hours.length - 1]
              });
            }
            else {
              // "height:81px" -> 81
              const duration = onlyNumbers(styles.pop()!);
              // "top:63px" -> 63
              const startSlot = onlyNumbers(styles.pop()!);
              // approximation because the value is not exactly on slots
              const endSlot = nearest(startSlot + duration, hoursSlots);

              // we have to do `-1` because of the way the offset is done in CSS
              const startDate = homepage.timetable.hours[hoursSlots.indexOf(startSlot) - 1];
              const endDate = homepage.timetable.hours[hoursSlots.indexOf(endSlot) - 1];

              // scrap details from the tooltip
              const [title, teacherName, description] = day
                .find(`#${event.attr("id")!}_bulle`)
                .children().map((_, element) => $(element).text().trim())
                .toArray();

              events.push({
                type: "lesson",
                colorHex,
                startDate,
                endDate,
                title,
                teacherName,
                description
              });
            }
          });

          // sort the events by start date
          events.sort((a, b) => a.startDate.getTime() - b.startDate.getTime());
          homepage.timetable.events = events;
        }

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
