import { GET_SELECTED_SEASONS } from "@/lib/api/queries";

import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { useWindowSize } from "@/hooks/useWindowSize";
import {
  TRelevantSeasons,
  TSeasonYearPair,
  TSelectedSeasonsQueryMedia,
} from "@/lib/types/seasons.types";
import { useQuery } from "@apollo/client";
import { useEffect, useMemo, useRef } from "react";
import SeasonAnime from "./SeasonAnimeCard";
import SeasonAnimeInfoDrawer from "./SeasonAnimeInfoDrawer";
import SeasonAnimeInfoModal from "./SeasonAnimeInfoModal";
import SeasonsSelector from "./SeasonsSelector";

interface TSeasonAnimeListProps {
  relevantSeasons: TRelevantSeasons;
  selectedSeason: TSeasonYearPair;
  handleSelectSeason: (season: string) => void;
}

function SeasonAnimeList({
  relevantSeasons,
  selectedSeason,
  handleSelectSeason,
}: TSeasonAnimeListProps) {
  const { loading, data, fetchMore, error } = useQuery(GET_SELECTED_SEASONS, {
    variables: {
      page: 1,
      perPage: 16,
      season: selectedSeason.season,
      seasonYear: selectedSeason.year,
    },
  });

  /** Intersection observer setup
   * to fetch more data when the user reaches the bottom of the page
   * which is referenced by the bottomBoundaryRef
   */
  const bottomBoundaryRef = useRef<HTMLDivElement | null>(null);
  const entry = useIntersectionObserver(bottomBoundaryRef, {
    threshold: 1,
    rootMargin: "50%",
  });
  const isIntersecting = useMemo(() => entry?.isIntersecting || false, [entry]);

  const animeList = useMemo(() => {
    return data?.Page?.media || [];
  }, [data]);

  useEffect(() => {
    const shouldLoadMore = data?.Page?.pageInfo?.hasNextPage;

    if (shouldLoadMore) {
      fetchMore({
        variables: {
          page: data?.Page?.pageInfo?.currentPage! + 1,
        },
        // The updateQuery method is used to merge the result of the new query with the existing data.
        updateQuery: (prevData, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prevData;

          const newPageInfo = fetchMoreResult.Page?.pageInfo;
          const newMediaArray = [
            ...(prevData.Page?.media ? prevData.Page?.media : []),
            ...(fetchMoreResult.Page?.media || []),
          ];

          return {
            ...prevData,
            Page: {
              ...prevData.Page,
              pageInfo: newPageInfo,
              media: newMediaArray,
            },
          };
        },
      });
    }
  }, [isIntersecting, data, fetchMore]);

  /** Check window size
   * TODO: Create a proper definition for screen sizes
   */

  const { width } = useWindowSize();
  const isTabletAndSmaller = useMemo(() => {
    return width <= 640;
  }, [width]);

  return (
    <div className="grid justify-center grid-cols-seasonListMobile gap-4 sm:grid-cols-seasonListSm sm:gap-4 md:gap-5 lg:grid-cols-seasonListLg xl:gap-6">
      <SeasonsSelector
        relevantSeasons={relevantSeasons}
        selectedSeason={selectedSeason}
        handleSelectSeason={handleSelectSeason}
        className="sticky z-10 top-4 md:top-10 col-span-2 sm:col-span-3 lg:col-span-4"
      />
      {loading ? (
        <p>Loading...</p>
      ) : (
        animeList.map((anime: TSelectedSeasonsQueryMedia, index) => {
          if (anime === null) {
            return null;
          }
          return isTabletAndSmaller ? (
            <SeasonAnimeInfoDrawer key={index} media={anime}>
              <SeasonAnime media={anime} />
            </SeasonAnimeInfoDrawer>
          ) : (
            <SeasonAnimeInfoModal key={index} media={anime}>
              <SeasonAnime media={anime} />
            </SeasonAnimeInfoModal>
          );
        })
      )}
      {/* TODO: Loading animation */}
      <div ref={bottomBoundaryRef} aria-hidden="true"></div>
    </div>
  );
}

export default SeasonAnimeList;
