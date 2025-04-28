import * as ient from "../src";
import { credentials } from "./_credentials";

void (async function main() {
  const sessionID = await ient.login(ient.ProfileKind.Student, credentials.username, credentials.password);
  const homepage = await ient.homepage(sessionID);
  console.dir(homepage, { depth: Infinity });
}());
