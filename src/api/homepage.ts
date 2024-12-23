import { type Fetcher, defaultFetcher } from "@literate.ink/utilities";
import type { Homepage, Metadata } from "~/models";

import { decodeHomepage } from "~/decoders/homepage";
import { decodeMetadata } from "~/decoders/metadata";

import * as cheerio from "cheerio";

export type HomepageResponse = { readonly metadata: Metadata } & Homepage;

export const homepage = async (sessionID: string, fetcher: Fetcher = defaultFetcher): Promise<HomepageResponse> => {
  const response = await fetcher({
    url: new URL("https://www.ient.fr/Welcome"),
    headers: { Cookie: `ient=${sessionID}` },
    redirect: "manual"
  });

  const $ = cheerio.load(response.content);

  return {
    metadata: decodeMetadata($),
    ...decodeHomepage($)
  };
};
