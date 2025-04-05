import * as ient from "../src";
import { credentials } from "./_credentials";

void async function main () {
  const sessionID = await ient.login(ient.ProfileKind.Student, credentials.username, credentials.password);

  const years = await ient.getGradeYears(sessionID);
  console.dir(years, { depth: Infinity });

  const currentYear = years.find((year) => year.isDefault);
  if (!currentYear) throw new Error("current year not found");

  const gradesOverview = await ient.getGradesForYear(sessionID, currentYear.number);
  console.dir(gradesOverview, { depth: Infinity });
}();
