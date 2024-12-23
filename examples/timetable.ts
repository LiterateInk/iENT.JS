import { credentials } from "./_credentials";
import * as ient from "../src";

void async function main () {
  const sessionID = await ient.login(ient.ProfileKind.Student, credentials.username, credentials.password);
  const timetable = await ient.timetable(sessionID);
  console.dir(timetable, { depth: Infinity });
}();
