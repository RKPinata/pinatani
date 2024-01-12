import { Media, MediaSeason } from "@/__generated__/graphql";
import { GET_SELECTED_SEASONS } from "@/lib/api/queries";

import { TRelevantSeasons, TSeasonYearPair } from "@/lib/types/seasons.types";
import { useQuery } from "@apollo/client";
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
  const { loading, error, data } = useQuery(GET_SELECTED_SEASONS, {
    variables: {
      page: 1,
      perPage: 45,
      season: selectedSeason.season as MediaSeason,
      seasonYear: selectedSeason.year,
    },
  });

  return (
    <div className="flex flex-col sm:grid sm:justify-center sm:grid-cols-seasonListSm sm:gap-3 md:gap-5 lg:grid-cols-seasonListLg xl:gap-6">
      <SeasonsSelector
        relevantSeasons={relevantSeasons}
        selectedSeason={selectedSeason}
        selectSeason={selectSeason}
        className="sm:col-span-3 lg:col-span-4"
      />
      {loading ? (
        <p>Loading...</p>
      ) : (
        data?.Page?.media &&
        data.Page.media.map((anime) => {
          return (
            <SeasonAnime key={anime?.id} media={anime as NonNullable<Media>} />
          );
        })
      )}
    </div>
  );
}

export default SeasonAnimeList;
