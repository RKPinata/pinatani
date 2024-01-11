import {
  getRelevantSeasons,
  getSeasonIndexFromDate,
} from "@/lib/seasons-service";
import { TSeasonYearPair } from "@/lib/types/seasons.types";
import { generateParamFromSeasonYearPair } from "@/lib/utils";

/**
 * This Page never gets rendered, it only redirects to the current season.
 */
export const getServerSideProps = () => {
  const now = new Date();
  const relevantSeasons = getRelevantSeasons(now);
  const currentSeason: TSeasonYearPair =
    relevantSeasons[getSeasonIndexFromDate(now)];

  return {
    redirect: {
      destination: `/seasons/${generateParamFromSeasonYearPair(currentSeason)}`,
      permanent: false,
    },
  };
};

function Seasons() {
  return <div>Seasons</div>;
}

export default Seasons;
