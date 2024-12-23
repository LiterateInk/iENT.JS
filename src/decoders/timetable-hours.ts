import type { CheerioAPI } from "cheerio";
import { onlyNumbers } from "~/core/only-numbers";

export const decodeTimetableHours = ($: CheerioAPI) => {
  // positions of each hours in the timetable
  const slots: number[] = [];

  // e.g.: ["30", "8h", "30", "9h", "30", "10h"]
  const container = $(".div_planning_heure").first();
  const hours = container.children(".txt_planning_heure").map((_, element) => {
    const hour = $(element);

    // "top:0px;text-align:right;font-size:8px;" -> 0
    const slot = onlyNumbers(hour.attr("style")!.split(";")[0]);
    slots.push(slot);

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

  return {
    hours,
    slots
  };
};
