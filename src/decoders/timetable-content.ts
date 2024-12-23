import type { CheerioAPI, Cheerio } from "cheerio";
import { onlyNumbers } from "~/core/only-numbers";
import { nearest } from "~/core/nearest";
import type { TimetableEvent } from "~/models";

export const decodeTimetableContent = ($: CheerioAPI, container: Cheerio<any>, slots: number[], hours: Date[]): Array<TimetableEvent> => {
  const events: Array<TimetableEvent> = [];

  container.find(".div_jour").children(".sequence").each((_, element) => {
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
        startDate: hours[0],
        endDate: hours[hours.length - 1]
      });
    }
    else if (text === "Congés") {
      events.push({
        type: "holiday",
        colorHex,
        startDate: hours[0],
        endDate: hours[hours.length - 1]
      });
    }
    else {
      // "height:81px" -> 81
      const duration = onlyNumbers(styles.pop()!);
      // "top:63px" -> 63
      const startSlot = nearest(onlyNumbers(styles.pop()!), slots);
      // approximation because the value is not exactly on slots
      const endSlot = nearest(startSlot + duration, slots);

      // we have to do `-1` because of the way the offset is done in CSS
      const startDate = hours[slots.indexOf(startSlot) - 1];
      const endDate = hours[slots.indexOf(endSlot) - 1];

      const id = event.attr("id")!;

      // scrap details from the tooltip
      const [title, teacherName, description] = container
        .find(`#${id}_bulle`)
        .children().map((_, element) => $(element).text().trim())
        .toArray();

      events.push({
        type: "lesson",
        id: onlyNumbers(id),
        colorHex,
        startDate,
        endDate,
        title,
        teacherName,
        description
      });
    }
  });

  events.sort((a, b) => a.startDate.getTime() - b.startDate.getTime());
  return events;
};
