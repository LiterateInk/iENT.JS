import type { ProfileKind } from "~/models";
import { defaultFetcher, type Fetcher, getCookiesFromResponse, getHeaderFromResponse } from "@literate.ink/utilities";

import { base64 } from "@scure/base";

/**
 * @returns the session ID
 */
export const login = async (profileKind: ProfileKind, username: string, password: string, fetcher: Fetcher = defaultFetcher): Promise<string> => {
  const callback = `https://www.ient.fr/login?profil=${profileKind}`;
  let sessionID: string;

  {
    // We have to make an initial request to create a session cookie.
    const response = await fetcher({
      redirect: "manual",
      url: new URL(callback)
    });

    const cookies = getCookiesFromResponse(response);
    const cookie = cookies.find((cookie) => cookie.startsWith("ient="));
    if (!cookie) throw new Error("ient cookie not found");

    sessionID = cookie.split("=")[1];
  }

  { // Handle the authentication flow.
    const form = new URLSearchParams();
    form.append("lmhidden_service", base64.encode(new TextEncoder().encode(callback)));
    form.append("timezone", "1");
    form.append("user", username);
    form.append("password", password);

    const response = await fetcher({
      content: form.toString(),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Cookie": `ient=${sessionID}`
      },
      method: "POST",
      redirect: "manual",
      url: new URL(`https://auth.ient.fr/cas/login?service=${encodeURIComponent(callback)}`)
    });

    // e.g.: "https://www.ient.fr/login?profil=2&ticket=ST-SOMEVERYLONGSTRING"
    const location = getHeaderFromResponse(response, "location");
    if (!location) throw new Error("location header not found");

    // Mavigate to this URL to make sure the session cookie is authenticated.
    await fetcher({
      headers: {
        Cookie: `ient=${sessionID}`
      },
      redirect: "manual",
      url: new URL(location)
    });
  }

  { // Navigate to this URL to make sure the session cookie is registered.
    await fetcher({
      headers: {
        Cookie: `ient=${sessionID}`
      },
      redirect: "manual",
      url: new URL(callback)
    });
  }

  return sessionID;
};
