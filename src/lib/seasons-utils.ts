import { SEASONS } from "./constants/seasons.contants";
import {
  TRelevantSeasons,
  TSeason,
  TSeasonYearPair,
} from "./types/seasons.types";

export function getCurrentAndRelevantSeasons(now: Date) {
  const relevantSeasons = getRelevantSeasons(now);
  const currentSeason: TSeasonYearPair =
    relevantSeasons[getSeasonIndexFromDate(now)];

  return {
    currentSeason,
    relevantSeasons,
  };
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

export function extractSeasonAndYearFromParam(param: string): TSeasonYearPair {
  // eg: "winter-2021" path: /seasons/winter-2021
  const [season, year] = param.split("-");

  return {
    season: season.toUpperCase() as TSeason,
    year: parseInt(year),
  };
}

export function generateParamFromSeasonYearPair(
  seasonYearPair: TSeasonYearPair
): string {
  const { season, year } = seasonYearPair;

  return `${String(season).toLocaleLowerCase()}-${year}`;
}

export function isValidSeasonParamFormat(str: string) {
  /**
   * ^ asserts the start of the string.
   * (winter|spring|summer|fall) matches one of the four seasons: winter, spring, summer, or fall.
   * - matches the hyphen character.
   * (19|20) matches either "19" or "20".
   * \d{2} matches exactly two digits.
   * $ asserts the end of the string.
   */
  const regex = /^(winter|spring|summer|fall)-(19|20)\d{2}$/;
  return regex.test(str);
}
