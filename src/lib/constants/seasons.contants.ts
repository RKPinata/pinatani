import { MediaSeason } from "@/__generated__/graphql";

/** Intention:
 *  Generated MediaSeason is not in intended order
 *  intended: [winter, spring, summer, fall] with index 0, 1, 2, 3 respectively
 *  This is to make sure that the SEASON constant is in the intended order
 */
const SEASONS_UNORDERED_WITH_INTENDED_INDEX = Object.values(MediaSeason).map(
  (season: MediaSeason) => {
    return {
      WINTER: {
        intendedIndex: 0,
        season,
      },
      SPRING: {
        intendedIndex: 1,
        season,
      },
      SUMMER: {
        intendedIndex: 2,
        season,
      },
      FALL: {
        intendedIndex: 3,
        season,
      },
    }[season];
  }
);
const SEASONS_WITH_ORDERED_INDEX = SEASONS_UNORDERED_WITH_INTENDED_INDEX.sort(
  (a, b) => {
    return a.intendedIndex - b.intendedIndex;
  }
);
export const SEASONS = SEASONS_WITH_ORDERED_INDEX.map(
  (season) => season.season
);
