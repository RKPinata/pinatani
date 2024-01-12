import { SEASONS } from "../seasons-service";

export type TSeason = (typeof SEASONS)[number];

export type TRelevantSeasons = [
  {
    season: (typeof SEASONS)[0];
    year: number;
  },
  {
    season: (typeof SEASONS)[1];
    year: number;
  },
  {
    season: (typeof SEASONS)[2];
    year: number;
  },
  {
    season: (typeof SEASONS)[3];
    year: number;
  }
];

export type TSeasonYearPair = {
  season: TSeason;
  year: number;
};

export type TSeasonYearPairString = `${TSeason}-${number}`;
