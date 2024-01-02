import { gql } from "@apollo/client";

export const getSelectedSeasons = gql`
  query GetSelectedSeasons(
    $page: Int
    $perPage: Int
    $season: MediaSeason
    $seasonYear: Int
  ) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        total
        currentPage
        lastPage
        hasNextPage
        perPage
      }
      media(season: $season, seasonYear: $seasonYear) {
        id
        idMal
        status
        title {
          romaji
          english
          native
        }
        type
        genres
        bannerImage
        status
        episodes
        nextAiringEpisode {
          airingAt
          timeUntilAiring
          episode
        }
      }
    }
  }
`;
