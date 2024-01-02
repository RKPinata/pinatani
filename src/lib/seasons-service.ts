const seasons = ["winter", "spring", "summer", "fall"] as const;

type RelevantSeasons = [
  {
    season: "winter";
    year: number;
  },
  {
    season: "spring";
    year: number;
  },
  {
    season: "summer";
    year: number;
  },
  {
    season: "fall";
    year: number;
  }
];

export function getRelevantSeasons(now: Date): RelevantSeasons {
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
        season: seasons[getSeasonIndexFromDate(date)],
        year: date.getFullYear(),
      };
    }
  );

  relevantSeason = relevantSeason.sort((a, b) => {
    return getSeasonIndexFromName(a.season) - getSeasonIndexFromName(b.season);
  });

  return relevantSeason as RelevantSeasons;
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

export function getSeasonIndexFromName(
  seasonName: "winter" | "spring" | "summer" | "fall"
): number {
  return seasons.indexOf(seasonName);
}
