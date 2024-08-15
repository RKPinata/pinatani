import AiringStatus, { TAiringStatusProps } from "./AiringStatus";

type TInfoModalContentProps = TAiringStatusProps & {};

const InfoModalContent = ({
  episodes,
  nextAiringEpisode,
  startDate,
  endDate,
  status,
}: TInfoModalContentProps) => {
  return (
    <div className="flex flex-col flex-1 p-4">
      <AiringStatus
        episodes={episodes}
        nextAiringEpisode={nextAiringEpisode}
        startDate={startDate}
        status={status}
      />
      <div>description</div>
      <div>genres</div>
      <div>score</div>
      <div>+</div>
    </div>
  );
};
export { InfoModalContent };
