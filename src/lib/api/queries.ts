import { gql } from "@/__generated__/gql";

export const GET_SELECTED_SEASONS = gql(`
  query GET_SELECTED_SEASONS(
    $page: Int
    $perPage: Int
    $season: MediaSeason
    $seasonYear: Int
  ) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        currentPage
        hasNextPage
        lastPage
      }
      media(
        season: $season
        seasonYear: $seasonYear
        type: ANIME
        isAdult: false
        sort: POPULARITY_DESC
      ) {
        id
        status
        title {
          romaji
          english
          native
        }
        coverImage {
          color
          medium
          extraLarge
        }
        format
        genres
        status
        episodes
        nextAiringEpisode {
          airingAt
          timeUntilAiring
          episode
        }
        startDate {
          day
          month
          year
        }
      }
    }
  }
`);
