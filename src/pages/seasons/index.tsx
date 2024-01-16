import {
  getCurrentAndRelevantSeasons
} from "@/lib/seasons-service";
import { generateParamFromSeasonYearPair } from "@/lib/utils";

/**
 * This Page never gets rendered, it only redirects to the current season.
 */
export const getServerSideProps = () => {
  const now = new Date();
  const { currentSeason } = getCurrentAndRelevantSeasons(now);

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
