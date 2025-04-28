import type { Period, Subject } from "~/models";

export class YearlyGradesOverview {
  private gradesPerPeriod: Map<Period, Subject[]>;

  constructor(gradesPerPeriod: Map<Period, Subject[]>) {
    this.gradesPerPeriod = gradesPerPeriod;
  }

  getPeriods = (): Period[] => this.gradesPerPeriod.keys().toArray();

  getSubjectsForPeriod = (period: Period): Subject[] => {
    const subjects = this.gradesPerPeriod.get(period);

    if (subjects === undefined)
      throw "Unknown period.";

    return subjects;
  };
};
