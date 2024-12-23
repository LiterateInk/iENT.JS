import { credentials } from "./_credentials";
import * as ient from "../src";

void async function main () {
  const sessionID = await ient.login(ient.ProfileKind.Student, credentials.username, credentials.password);
  const homepage = await ient.homepage(sessionID);
  console.dir(homepage, { depth: Infinity });
}();
