import {
  AiringSchedule,
  FuzzyDate,
  MediaStatus,
} from "@root/src/__generated__/graphql";
import { formatDayAndMonth } from "@root/src/lib/utils";

export type TAiringStatusProps = {
  episodes?: number | null;
  nextAiringEpisode?: Pick<
    AiringSchedule,
    "airingAt" | "timeUntilAiring" | "episode"
  > | null;
  startDate?: FuzzyDate | null;
  endDate?: FuzzyDate | null;
  status?: MediaStatus | null;
};

function AiringStatus({
  episodes,
  nextAiringEpisode,
  startDate,
  endDate,
  status,
}: TAiringStatusProps) {
  console.log(endDate);
  console.log(startDate);

  const startDateFormatted =
    startDate?.day && startDate?.month && startDate?.year
      ? formatDayAndMonth(startDate)
      : null;
  const endDateFormatted =
    endDate?.day && endDate?.month && endDate?.year
      ? formatDayAndMonth(endDate)
      : null;

  const EpisodeText = (): React.JSX.Element | null => {
    let text: string | null = null;

    switch (status) {
      case MediaStatus.NotYetReleased:
        if (!startDateFormatted) return null;
        text = "Airing in";
        break;
      case MediaStatus.Releasing:
        if (!nextAiringEpisode?.timeUntilAiring) return null;
        text = `Ep ${nextAiringEpisode?.episode} of ${episodes} airing in `;
        break;
      case MediaStatus.Finished:
        if (!startDateFormatted) return null;
        text = `${episodes} episodes aired on`;
        break;
      default:
        text = null;
    }

    return text ? <div>{text}</div> : null;
  };

  const DateText = (): React.JSX.Element => {
    let text: string | null = null;

    switch (status) {
      case MediaStatus.NotYetReleased:
        text = `${startDateFormatted}`;
        break;
      case MediaStatus.Releasing:
        text = `${nextAiringEpisode?.timeUntilAiring}`;
        break;
      case MediaStatus.Finished:
        text = `${endDateFormatted}`;
        break;
      default:
        text = null;
    }

    return <div>{text ? text : "TBA"}</div>;
  };

  return (
    <div>
      <EpisodeText />
      <DateText />
    </div>
  );
}
export default AiringStatus;
