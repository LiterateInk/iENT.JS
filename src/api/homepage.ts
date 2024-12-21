import { type Fetcher, defaultFetcher } from "@literate.ink/utilities";

export const homepage = async (sessionID: string, fetcher: Fetcher = defaultFetcher) => {
  const response = await fetcher({
    url: new URL("https://www.ient.fr/Welcome"),
    headers: { Cookie: `ient=${sessionID}` },
    redirect: "manual"
  });

  // TODO
  return response.content;
};
