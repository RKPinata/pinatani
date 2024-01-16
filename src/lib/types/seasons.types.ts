import {
  Get_Selected_SeasonsQuery
} from "@/__generated__/graphql";
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

/** This some serious type acrobatics (╯°□°）╯︵ ┻━┻
 * referring to the Get_Selected_SeasonsQuery in src/__generated__/graphql.ts
 * TSelectedSeasonsQueryPage is the type of the Page from the query
 * TSelectedSeasonsQueryMedia is the type of the media from media array
 */
export type TSelectedSeasonsQueryPage = NonNullable<
  Get_Selected_SeasonsQuery["Page"]
>;

export type TSelectedSeasonsQueryMedia = NonNullable<
  TSelectedSeasonsQueryPage["media"]
>[number];
