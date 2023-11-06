import rawData from "./data/raw-seasonal-data.json" assert { type: "json" };
const seasonData = JSON.parse(rawData)

function findSingleTitles(seasonDataJson) {
  let singleTitles = []

  for (year of seasonData) {
    for (num of year.season) {
      if (num.titles.length === 1) {
        singleTitles.push(
          {
            mal_id: num.mal_id,
            title: num.titles[0],
            year: year.year
          }
        )
      }
    }
  }

  return singleTitles
}

function executeScript(){
  const data = findSingleTitles(seasonData);
  addToJSON(data, "./data/single-titles.json");
  console.log("added to json")
}

executeScript()

