import { defaultFetcher, type Fetcher } from "@literate.ink/utilities";
import * as cheerio from "cheerio";

import type { Homepage, Metadata } from "~/models";

import { decodeHomepage } from "~/decoders/homepage";
import { decodeMetadata } from "~/decoders/metadata";

export type HomepageResponse = { readonly metadata: Metadata } & Homepage;

export const homepage = async (sessionID: string, fetcher: Fetcher = defaultFetcher): Promise<HomepageResponse> => {
  const response = await fetcher({
    headers: { Cookie: `ient=${sessionID}` },
    redirect: "manual",
    url: new URL("https://www.ient.fr/Welcome")
  });

  const $ = cheerio.load(response.content);

  return {
    metadata: decodeMetadata($),
    ...decodeHomepage($)
  };
};
