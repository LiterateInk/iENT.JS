import type { Metadata, Timetable } from "~/models";
import { defaultFetcher, type Fetcher } from "@literate.ink/utilities";

import * as cheerio from "cheerio";

import { decodeMetadata } from "~/decoders/metadata";
import { decodeTimetable } from "~/decoders/timetable";

export type TimetableResponse = Timetable & { readonly metadata: Metadata };

/**
 * @param sessionID your session token
 * @param date date corresponding to the week you want to retrieve, defaults to today
 * @returns events for the week of the given date
 */
export const timetable = async (sessionID: string, date: Date = new Date(), fetcher: Fetcher = defaultFetcher): Promise<TimetableResponse> => {
  const formatter = new Intl.DateTimeFormat("en-CA", { day: "2-digit", month: "2-digit", timeZone: "UTC", year: "numeric" });

  const response = await fetcher({
    headers: { Cookie: `ient=${sessionID}` },
    redirect: "manual",
    url: new URL(`https://www.ient.fr/planninghebdo?date=${formatter.format(date)}`)
  });

  const $ = cheerio.load(response.content);

  return {
    metadata: decodeMetadata($),
    ...decodeTimetable($)
  };
};
