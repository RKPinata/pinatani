import {
  Dialog,
  DialogContent,
  DialogTrigger
} from "@/components/shadcn/ui/dialog";
import { TSelectedSeasonsQueryMedia } from "@/lib/types/seasons.types";

type TSeasonAnimeInfoModalProps = {
  children: React.ReactNode;
  media: NonNullable<TSelectedSeasonsQueryMedia>;
};

function SeasonAnimeInfoModal({ children, media }: TSeasonAnimeInfoModalProps) {
  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent>
        <div>smth</div>
      </DialogContent>
    </Dialog>
  );
}

export default SeasonAnimeInfoModal;
