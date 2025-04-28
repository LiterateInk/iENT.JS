import type { Homepage, Metadata } from "~/models";
import { HttpRequest, send } from "schwi";

import { decodeHomepage } from "~/decoders/homepage";
import { decodeMetadata } from "~/decoders/metadata";

export type HomepageResponse = Homepage & { readonly metadata: Metadata };

export const homepage = async (sessionId: string): Promise<HomepageResponse> => {
  const request = new HttpRequest.Builder("https://www.ient.fr/Welcome")
    .setCookie("ient", sessionId)
    .setRedirection(HttpRequest.Redirection.MANUAL)
    .build();

  const response = await send(request);
  const html = await response.toHTML();

  return {
    metadata: decodeMetadata(html),
    ...decodeHomepage(html)
  };
};
