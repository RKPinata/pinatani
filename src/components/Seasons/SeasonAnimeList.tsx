import { Media, MediaSeason } from "@/__generated__/graphql";
import { GET_SELECTED_SEASONS } from "@/lib/api/queries";

import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { TRelevantSeasons, TSeasonYearPair } from "@/lib/types/seasons.types";
import { useQuery } from "@apollo/client";
import { useEffect, useMemo, useRef } from "react";
import SeasonAnime from "./SeasonAnime";
import SeasonsSelector from "./SeasonsSelector";

interface SeasonAnimeListProps {
  relevantSeasons: TRelevantSeasons;
  selectedSeason: TSeasonYearPair;
  selectSeason: (season: string) => void;
}

function SeasonAnimeList({
  relevantSeasons,
  selectedSeason,
  selectSeason,
}: SeasonAnimeListProps) {
  const { loading, data, fetchMore, error } = useQuery(GET_SELECTED_SEASONS, {
    variables: {
      page: 1,
      perPage: 30,
      season: selectedSeason.season as MediaSeason,
      seasonYear: selectedSeason.year,
    },
  });

  const bottomBoundaryRef = useRef<HTMLDivElement | null>(null);
  const entry = useIntersectionObserver(bottomBoundaryRef, {
    threshold: 1,
    rootMargin: '50%'
  });
  const isIntersecting = useMemo(() => entry?.isIntersecting || false, [entry]);

  useEffect(() => {
    if (isIntersecting && data?.Page?.pageInfo?.hasNextPage) {
      fetchMore({
        variables: {
          page: data?.Page?.pageInfo?.currentPage! + 1
        },
        // The updateQuery function is used to merge the result of the new query with the existing data.
        updateQuery: (prevData, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prevData;
          return {
            ...prevData,
            Page: {
              ...prevData.Page,
              pageInfo: fetchMoreResult.Page?.pageInfo,
              media: [
                ...(prevData.Page?.media ? prevData.Page?.media : []),
                ...(fetchMoreResult.Page?.media || []),
              ],
            },
          };
        },
      });
    }
  }, [isIntersecting, data, fetchMore]);

  return (
    <div className="grid justify-center grid-cols-seasonListMobile gap-4 sm:grid-cols-seasonListSm sm:gap-4 md:gap-5 lg:grid-cols-seasonListLg xl:gap-6">
      <SeasonsSelector
        relevantSeasons={relevantSeasons}
        selectedSeason={selectedSeason}
        selectSeason={selectSeason}
        className="col-span-2 sm:col-span-3 lg:col-span-4"
      />
      {loading ? (
        <p>Loading...</p>
      ) : (
        data?.Page?.media ?
        data.Page.media.map((anime) => {
          return (
            <SeasonAnime key={anime?.id} media={anime as NonNullable<Media>} />
          );
        }) : <p>No anime found</p>
      )}
      <div ref={bottomBoundaryRef}></div>
    </div>
  );
}

export default SeasonAnimeList;
