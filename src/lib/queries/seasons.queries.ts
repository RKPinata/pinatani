import { gql } from "@src/__generated__/gql";

const GET_SELECTED_SEASONS = gql(`
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
        endDate {
          day
          month
          year
        }
      }
    }
  }
`);

export { GET_SELECTED_SEASONS };
