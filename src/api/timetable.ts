import type { Metadata, Timetable } from "~/models";

import { HttpRequest, send } from "schwi";

import { decodeMetadata } from "~/decoders/metadata";
import { decodeTimetable } from "~/decoders/timetable";

export type TimetableResponse = Timetable & { readonly metadata: Metadata };

/**
 * @param sessionID your session token
 * @param date date corresponding to the week you want to retrieve, defaults to today
 * @returns events for the week of the given date
 */
export const timetable = async (sessionID: string, date: Date = new Date()): Promise<TimetableResponse> => {
  const formatter = new Intl.DateTimeFormat("en-CA", { day: "2-digit", month: "2-digit", timeZone: "UTC", year: "numeric" });

  const request = new HttpRequest.Builder("https://www.ient.fr/planninghebdo")
    .setCookie("ient", sessionID)
    .setRedirection(HttpRequest.Redirection.MANUAL)
    .setUrlSearchParameter("date", formatter.format(date))
    .build();

  const response = await send(request);
  const html = await response.toHTML();

  return {
    metadata: decodeMetadata(html),
    ...decodeTimetable(html)
  };
};
