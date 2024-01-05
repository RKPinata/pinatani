import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { TSeason, TSeasonYearPair } from "./seasons-service";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
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
