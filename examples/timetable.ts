import * as ient from "../src";
import { credentials } from "./_credentials";

void async function main () {
  const sessionID = await ient.login(ient.ProfileKind.Student, credentials.username, credentials.password);
  const timetable = await ient.timetable(sessionID);
  console.dir(timetable, { depth: Infinity });
}();
