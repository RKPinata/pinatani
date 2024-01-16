import {
  Get_Selected_SeasonsQuery,
  MediaSeason,
} from "@/__generated__/graphql";

export type TSeason = MediaSeason;

export type TRelevantSeasons = [
  {
    season: MediaSeason.Winter;
    year: number;
  },
  {
    season: MediaSeason.Spring;
    year: number;
  },
  {
    season: MediaSeason.Summer;
    year: number;
  },
  {
    season: MediaSeason.Fall;
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


