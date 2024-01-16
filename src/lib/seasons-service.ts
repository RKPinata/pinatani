import { TRelevantSeasons, TSeason, TSeasonYearPair } from "./types/seasons.types";

export const SEASONS = ["WINTER", "SPRING", "SUMMER", "FALL"] as const;

export function getCurrentAndRelevantSeasons(now: Date) {
  const relevantSeasons = getRelevantSeasons(now);
  const currentSeason: TSeasonYearPair =
    relevantSeasons[getSeasonIndexFromDate(now)];

  return {
    currentSeason,
    relevantSeasons,
  }
}

export function getRelevantSeasons(now: Date): TRelevantSeasons {
  const nextOneSeason = doOperationOnMonth({
    operation: "add",
    date: now,
    months: 3,
  });

  const newTwoSeason = doOperationOnMonth({
    operation: "add",
    date: now,
    months: 6,
  });

  const previousSeason = doOperationOnMonth({
    operation: "subtract",
    date: now,
    months: 3,
  });

  let relevantSeason = [now, nextOneSeason, newTwoSeason, previousSeason].map(
    (date) => {
      return {
        season: SEASONS[getSeasonIndexFromDate(date)],
        year: date.getFullYear(),
      };
    }
  );

  relevantSeason = relevantSeason.sort((a, b) => {
    return getSeasonIndexFromName(a.season) - getSeasonIndexFromName(b.season);
  });

  return relevantSeason as TRelevantSeasons;
}

export function doOperationOnMonth({
  operation,
  date,
  months,
}: {
  operation: "add" | "subtract";
  date: Date;
  months: number;
}): Date {
  const newDate = new Date(date);
  switch (operation) {
    case "add":
      newDate.setMonth(date.getMonth() + months);
      break;
    case "subtract":
      newDate.setMonth(date.getMonth() - months);
      break;
    default:
      break;
  }
  return newDate;
}

export function getSeasonIndexFromDate(date: Date): number {
  /** Below calculation is based on ratios
   * 12 months / 4 seasons = 3 months per season
   * Converting a maximum value 11 to maximum 3
   * Then flooring the result to get the current season index
   */
  const month = date.getMonth();
  return Math.floor(month / (12 / 4));
}

export function getSeasonIndexFromName(seasonName: TSeason): number {
  return SEASONS.indexOf(seasonName);
}
