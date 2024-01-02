import { getSelectedSeasons } from "@./src/lib/api/queries";
import MaxWidthContainer from "@/components/UI/MaxWidthContainer";
import { gql, useQuery } from "@apollo/client";

function Seasons() {

  const { loading, error, data } = useQuery(getSelectedSeasons, {
    variables: {
      page: 1,
      perPage: 10,
      season: "SUMMER",
      seasonYear: 2021,
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return <MaxWidthContainer>{data.Page.media[0].title.romaji}</MaxWidthContainer>;
}

export default Seasons;
