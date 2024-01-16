import SeasonAnimeList from "@/components/Seasons/SeasonAnimeList";
import PageContainer from "@/components/UI/PageContainer";
import {
  extractSeasonAndYearFromParam,
  getCurrentAndRelevantSeasons,
} from "@/lib/seasons-utils";

import { useRouter } from "next/router";

function SeasonYear() {
  const router = useRouter();
  const now = new Date();
  const { relevantSeasons } = getCurrentAndRelevantSeasons(now);
  const seasonYearParam = router.query.seasonYear as string;

  /** Url Param are not available on first render
   *  so we return null to avoid errors */
  if (!seasonYearParam) {
    return null;
  }

  const selectedSeason = extractSeasonAndYearFromParam(seasonYearParam);

  const onSelectSeason = (seasonParam: string): void => {
    router.push(`/seasons/${seasonParam}`);
  };

  return (
    <PageContainer>
      <SeasonAnimeList
        relevantSeasons={relevantSeasons}
        selectedSeason={selectedSeason}
        selectSeason={onSelectSeason}
      />
    </PageContainer>
  );
}

export default SeasonYear;
