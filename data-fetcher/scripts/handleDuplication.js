import rawData from "./data/raw-seasonal-data.json" assert { type: "json" };
import data2023 from "../data/yearly-data/2023.json" assert { type: "json" };
import fs from "fs";

/* const seasonData = JSON.parse(rawData)
const sampleSeasonData = JSON.parse(sampleData) */

function findSingleTitles(yearlyData) {
  let singleTitles = [];
  let seasons = yearlyData.seasons;
  console.log(seasons)

  for (const season in seasons) {
    
    for (const anime in season) {
      /* if (anime.titles.length === 1) {
        singleTitles.push({
          mal_id: anime.mal_id,
          title: anime.titles[0],
          year: yearlyData.year,
        }); */
    }
  }

  return singleTitles;
}

function executeScript() {
  const data = findSingleTitles(data2023);
  data.length >= 1 ? createJson(data, "./data/single-titles.json") : null ;
}

function createJson(data, name) {
  // year 0 represents failed data
  fs.writeFileSync(name, JSON.stringify(data, null));
}

executeScript();
