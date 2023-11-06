import fetch from "node-fetch";
import fs from "fs";
//I should have just used ts  ¯\_(ツ)_/¯

/**
 * seasons data structure
 * { year: number, seasons: winter , spring , summer , fall }
 */
import seasons from "./data/seasons.json" assert { type: "json" };
import seasonsTest from "./data/seasons-test.json" assert { type: "json" };
/**
 * API LIMIT
 * request per second: 3
 * request per minute: 60
 *
 * https://api.jikan.moe/v4/seasons/{year}/{season}
 * */
const seasonsAPI = "https://api.jikan.moe/v4/seasons";

/**
 * failed data model
 * { year: number, seasons: winter | spring | summer | fall }
 */
let failed = [];

/* yearData data model
  [{ year: number,
  { winter: {data},
    spring: {data},
    summer: {data},
    fall: {data} 
  }},...] */
let yearData = [];

/* Initialize token bucket*/
const secondLimit = 3;
const minuteLimit = 60;
let previousSecondRefill = Date.now();
let previousMinuteRefill = Date.now();
let secondTokenBucket = secondLimit;
let minuteTokenBucket = minuteLimit;

async function fetchAllSeasonsData(seasons) {
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

  for (const item of seasons) {
    let seasonsData = {};
    for (const season of item.seasons) {
      const data = await fetchSeasonData(
        item.year,
        season,
        secondTokenBucket,
        minuteTokenBucket
      );
      console.log(data);
      if (data) {
        seasonsData[season] = data;
      } else {
        handleFetchFailure(item.year, season);
      }
      console.log("Fetching Next Season");
    }
    yearData.push({ year: item.year, ...seasonsData });
  }

  async function fetchSeasonData(year, season) {
    let data = {};
    let currentPage = 1;
    let hasNextPage = true;

    // wait for token bucket to refill

    try {
      while (hasNextPage) {
        // Implement token bucket algorithm
        while (secondTokenBucket <= 0 || minuteTokenBucket <= 0) {
          console.log("waiting for token bucket to refill");
          refillTokenBucket();
          console.log(
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

        data = { ...data, ...responseData.data };
        console.log(`fetched ${season} ${year} page ${currentPage}`);
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
}

function addToJSON(data, year, season, fileName) {
  fs.writeFileSync(fileName, JSON.stringify(data, null));
  console.log(`Added data to ${fileName}`);
}

async function fetchSeed(seasons, outputFileName, failedFileName) {
  await fetchAllSeasonsData(seasons);
  addToJSON(yearData, outputFileName);
  addToJSON(failed, failedFileName);
}

fetchSeed(seasonsTest, "./data/sample-seasonal-data.json", "./data/failed-seasons.json");

