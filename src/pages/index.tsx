import MaxWidthContainer from "@/components/UI/MaxWidthContainer";
import { getCurrentAndRelevantSeasons } from "@/lib/seasons-service";
import { generateParamFromSeasonYearPair } from "@/lib/utils";
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
