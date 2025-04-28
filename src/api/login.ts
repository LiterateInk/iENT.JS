import type { ProfileKind } from "~/models";

import { base64 } from "@scure/base";
import { HttpRequest, send } from "schwi";

/**
 * @returns the session ID
 */
export const login = async (profileKind: ProfileKind, username: string, password: string): Promise<string> => {
  const callback = `https://www.ient.fr/login?profil=${profileKind}`;
  let sessionId: string;

  {
    // We have to make an initial request to create a session cookie.
    const request = new HttpRequest.Builder(callback)
      .setRedirection(HttpRequest.Redirection.MANUAL)
      .build();

    const response = await send(request);
    const cookies = response.headers.getSetCookie();
    let cookie = cookies.find((cookie) => cookie.startsWith("ient="));
    if (!cookie) throw new Error("ient cookie not found");

    cookie = cookie.split(";")[0];
    sessionId = cookie.split("=")[1];
  }

  { // Handle the authentication flow.
    const form = new URLSearchParams();
    form.append("lmhidden_service", base64.encode(new TextEncoder().encode(callback)));
    form.append("timezone", "1");
    form.append("user", username);
    form.append("password", password);

    const request = new HttpRequest.Builder("https://auth.ient.fr/cas/login")
      .setMethod(HttpRequest.Method.POST)
      .setUrlSearchParameter("service", callback)
      .setRedirection(HttpRequest.Redirection.MANUAL)
      .setCookie("ient", sessionId)
      .setFormUrlEncodedBody(form)
      .build();

    const response = await send(request);

    // e.g.: "https://www.ient.fr/login?profil=2&ticket=ST-SOMEVERYLONGSTRING"
    const location = response.headers.get("location");
    if (!location) throw new Error("location header not found");

    // Mavigate to this URL to make sure the session cookie is authenticated.
    await send(new HttpRequest.Builder(location)
      .setRedirection(HttpRequest.Redirection.MANUAL)
      .setCookie("ient", sessionId)
      .build());
  }

  { // Navigate to this URL to make sure the session cookie is registered.
    await send(new HttpRequest.Builder(callback)
      .setRedirection(HttpRequest.Redirection.MANUAL)
      .setCookie("ient", sessionId)
      .build());
  }

  return sessionId;
};
