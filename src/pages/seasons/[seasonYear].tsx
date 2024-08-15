import PageContainer from "@components/UI/PageContainer";
import SeasonAnimeList from "@root/src/components/experiences/Seasons/SeasonAnimeList";
import {
  extractSeasonAndYearFromParam,
  generateParamFromSeasonYearPair,
  getCurrentAndRelevantSeasons,
  isValidSeasonParamFormat,
} from "@root/src/lib/utils";

import { useRouter } from "next/router";

function SeasonYear() {
  const router = useRouter();
  const now = new Date();
  const { currentSeason, relevantSeasons } = getCurrentAndRelevantSeasons(now);
  const seasonYearParam = router.query.seasonYear as string;

  /** Url Param are not available on first render
   *  so we return null to avoid errors */
  if (!seasonYearParam) {
    return null;
  }

  const isValidSeasonParam = isValidSeasonParamFormat(seasonYearParam);
  if (!isValidSeasonParam) {
    router.push(`/seasons/${generateParamFromSeasonYearPair(currentSeason)}`);
  }

  const selectedSeason = extractSeasonAndYearFromParam(seasonYearParam);

  const handleSelectSeason = (seasonParam: string): void => {
    router.push(`/seasons/${seasonParam}`);
  };

  return (
    <PageContainer>
      <SeasonAnimeList
        relevantSeasons={relevantSeasons}
        selectedSeason={selectedSeason}
        handleSelectSeason={handleSelectSeason}
      />
    </PageContainer>
  );
}

export default SeasonYear;
