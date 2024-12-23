import { type Fetcher, defaultFetcher } from "@literate.ink/utilities";
import type { Timetable, Metadata } from "~/models";

import { decodeTimetable } from "~/decoders/timetable";
import { decodeMetadata } from "~/decoders/metadata";

import * as cheerio from "cheerio";

export type TimetableResponse = { readonly metadata: Metadata } & Timetable;

/**
 * @param sessionID your session token
 * @param date date corresponding to the week you want to retrieve, defaults to today
 * @returns events for the week of the given date
 */
export const timetable = async (sessionID: string, date: Date = new Date(), fetcher: Fetcher = defaultFetcher): Promise<TimetableResponse> => {
  const formatter = new Intl.DateTimeFormat("en-CA", { timeZone: "UTC", year: "numeric", month: "2-digit", day: "2-digit" });

  const response = await fetcher({
    url: new URL(`https://www.ient.fr/planninghebdo?date=${formatter.format(date)}`),
    headers: { Cookie: `ient=${sessionID}` },
    redirect: "manual"
  });

  const $ = cheerio.load(response.content);

  return {
    metadata: decodeMetadata($),
    ...decodeTimetable($)
  };
};
