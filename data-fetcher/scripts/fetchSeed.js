import fetch from "node-fetch";
import fs from "fs";
//I should have just used ts  ¯\_(ツ)_/¯

/**
 * seasons data schema
 * { year: number, seasons: winter:[] , spring:[] , summer:[] , fall:[] }
 */
import seasons from "../data/seasons.json" assert { type: "json" };
import seasonsTest from "../data/seasons-test.json" assert { type: "json" };
/**
 * API LIMIT
 * request per second: 3
 * request per minute: 60
 *
 * https://api.jikan.moe/v4/seasons/{year}/{season}
 * */
const seasonsAPI = "https://api.jikan.moe/v4/seasons";

/**
 * failed data schema
 * { year: number, seasons: winter | spring | summer | fall }
 */
let failed = [];

/* Initialize token bucket*/
const secondLimit = 3;
const minuteLimit = 60;
let previousSecondRefill = Date.now();
let previousMinuteRefill = Date.now();
let secondTokenBucket = secondLimit;
let minuteTokenBucket = minuteLimit;

/* Rate Limiting Algorithm Functions */
function refillTokenBucket() {
  const currentTime = Date.now();

  if (currentTime - previousSecondRefill >= 1000) {
    secondTokenBucket = secondLimit;
    previousSecondRefill = Date.now();
    console.log("refilled second bucket", secondTokenBucket);
  }
  if (currentTime - previousMinuteRefill >= 60000) {
    minuteTokenBucket = minuteLimit;
    previousMinuteRefill = Date.now();
    console.log("refilled minute bucket", minuteTokenBucket);
  }
}

function waitTokenBucketRefill() {
  const currentTime = Date.now();
  const secondBucketRefillTime = previousSecondRefill + 2500;
  const minuteBucketRefillTime = previousMinuteRefill + 70000;
  const waitTime = Math.min(
    secondBucketRefillTime - currentTime,
    minuteBucketRefillTime - currentTime
  );
  return new Promise((resolve) => setTimeout(resolve, waitTime));
}

function consumeToken() {
  secondTokenBucket--;
  minuteTokenBucket--;
}

/* Fetching Data */
async function fetchYearData(seasons) {
  /* type yearObject{
    year: number;
    seasons: string[];
  } */

  for (const yearObject of seasons) {
    /* animeYearlyData data schema
    { year: number,
      seasons:{ winter:{}, spring:{}, summer:{}, fall:{} }
    } */
    let animeYearlyData = { year: yearObject.year, seasons: {} };
    for (const season of yearObject.seasons) {
      const data = await fetchSeasonData(
        yearObject.year,
        season,
        secondTokenBucket,
        minuteTokenBucket
      );
      animeYearlyData.seasons[season] = data;
      console.info("Fetching Next Season", season, yearObject.year);
    }

    createJson(animeYearlyData, yearObject.year);
  }
}

async function fetchSeasonData(year, season) {
  let data = [];
  let currentPage = 1;
  let hasNextPage = true;

  // wait for token bucket to refill

  try {
    while (hasNextPage) {
      // Implement token bucket algorithm
      while (secondTokenBucket <= 0 || minuteTokenBucket <= 0) {
        console.info("waiting for token bucket to refill");
        refillTokenBucket();
        console.info(
          `second bucket: ${secondTokenBucket}, minute bucket: ${minuteTokenBucket}`
        );
        await waitTokenBucketRefill();
      }

      console.log(`fetching ${season} ${year} page ${currentPage}`);
      const response = await fetch(
        `${seasonsAPI}/${year}/${season}?page=${currentPage}`
      );
      if (!response.ok) {
        console.error(
          `Failed to fetch data from ${season} ${year} page ${currentPage}`,
          response
        );
        handleFetchFailure(year, season);
        break;
      }
      consumeToken();
      const responseData = await response.json();
      console.log(responseData);

      data = [ ...data, ...responseData.data ];
      console.info(
        `Successfullly fetched ${season} ${year} page ${currentPage}`
      );
      console.log(responseData.pagination);

      hasNextPage = responseData.pagination.has_next_page;
      currentPage++;
    }
  } catch (error) {
    console.error(error);
  }
  return data;
}

function handleFetchFailure(year, season) {
  failed.push({ year: year, season: season });
}

function createJson(data, year) {
  // year 0 represents failed data
  const fileName = year === 0 ? "./data/failed-seasons.json" : `./data/yearly-data/${year}.json`;

  fs.writeFileSync(fileName, JSON.stringify(data, null));
  console.info(`Added ${year} data to ${fileName}`);
}

async function execute(seasons) {
  await fetchYearData(seasons);
  if (failed.length > 0) {
    createJson(failed, 0);
  }
}

execute(seasons);
