import { SeasonCardImage } from "@components/experiences/Seasons/SeasonCardImage";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@components/shadcn/ui/dialog";
import { Title } from "@components/typography";
import { TSelectedSeasonsQueryMedia } from "@lib/types/seasons.types";
import { getPreferredMediaTitle } from "@root/src/lib/utils";

type TSeasonAnimeInfoModalProps = {
  children: React.ReactNode;
  media: NonNullable<TSelectedSeasonsQueryMedia>;
};

function SeasonAnimeInfoModal({ children, media }: TSeasonAnimeInfoModalProps) {
  const {
    id,
    coverImage,
    format,
    genres,
    episodes,
    nextAiringEpisode,
    startDate,
    endDate,
    status,
    title,
  } = media;
  /**
   * Implement:
   * Next airing date / last aired date
   * description
   * genres
   * score if available
   */
  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className="w-xl max-w-xl flex flex-col items-center">
        <Title className="text-foreground">
          {getPreferredMediaTitle(title!)}
        </Title>
        <div className="flex w-full bg-card rounded-md">
          <SeasonCardImage
            imageSrc={coverImage?.extraLarge ? coverImage.extraLarge : ""}
            alt={`${title?.english} cover image`}
            imageBgColor={coverImage?.color}
          />
          Work in Progress
          {/* <InfoModalContent
            episodes={episodes}
            nextAiringEpisode={nextAiringEpisode}
            startDate={startDate}
            status={status}
            endDate={endDate}
          /> */}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default SeasonAnimeInfoModal;
