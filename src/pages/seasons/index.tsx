import SeasonsSelector from "@./src/components/Seasons/SeasonsSelector";
import PageContainer from "@./src/components/UI/PageContainer";
import { getSelectedSeasons } from "@./src/lib/api/queries";
import {
  TRelevantSeasons,
  TSeason,
  TSeasonYearPair,
  getRelevantSeasons,
  getSeasonIndexFromDate,
  getSeasonIndexFromName,
} from "@./src/lib/seasons-service";
import { useQuery } from "@apollo/client";
import { useCallback, useState } from "react";

function Seasons() {
  const now = new Date();
  const relevantSeasons: TRelevantSeasons = getRelevantSeasons(now);

  const [selectedSeasonIndex, setSelectedSeasonIndex] = useState<number>(
    getSeasonIndexFromDate(now)
  );

  const getSelectedSeason: () => TSeasonYearPair = useCallback(() => {
    return relevantSeasons[selectedSeasonIndex];
  }, [relevantSeasons, selectedSeasonIndex]);

  const onSelectSeason = (season: TSeason): void => {
    setSelectedSeasonIndex(getSeasonIndexFromName(season));
  };

  const { loading, error, data } = useQuery(getSelectedSeasons, {
    variables: {
      page: 1,
      perPage: 15,
      season: getSelectedSeason().season,
      seasonYear: getSelectedSeason().year,
    },
  });

  return (
    <PageContainer>
      {/* {data.Page.media.map((media: any) => {
        return (
          <div key={media.id}>
            <p>{media.title.english}</p>
          </div>
        );
      })} */}
      <SeasonsSelector
        relevantSeasons={relevantSeasons}
        selectedSeason={getSelectedSeason()}
        selectSeason={onSelectSeason}
      />
      
    </PageContainer>
  );
}

export default Seasons;
