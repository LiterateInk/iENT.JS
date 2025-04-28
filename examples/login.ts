import * as ient from "../src";
import { credentials } from "./_credentials";

void (async function main() {
  const sessionID = await ient.login(ient.ProfileKind.Student, credentials.username, credentials.password);

  console.log("you're now authenticated !");
  console.log("use this session id:", sessionID);
}());
