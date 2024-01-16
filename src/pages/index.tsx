import MaxWidthContainer from "@/components/UI/MaxWidthContainer";
import {
  generateParamFromSeasonYearPair,
  getCurrentAndRelevantSeasons,
} from "@/lib/seasons-utils";

import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async () => {
  const now = new Date();
  const { currentSeason } = getCurrentAndRelevantSeasons(now);

  return {
    redirect: {
      destination: `/seasons/${generateParamFromSeasonYearPair(currentSeason)}`,
      permanent: false,
    },
  };
};

export default function Home() {
  return <MaxWidthContainer>Home</MaxWidthContainer>;
}
