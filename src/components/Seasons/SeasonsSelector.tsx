import {
  TRelevantSeasons,
  TSeason,
  TSeasonYearPair,
} from "@./src/lib/seasons-service";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../shadcn/ui/select";

import { capitalizeFirstLetter } from "@./src/lib/utils";

interface SeasonsSelectorProps {
  relevantSeasons: TRelevantSeasons;
  selectedSeason: TSeasonYearPair;
  selectSeason: (season: TSeason) => void;
}

function SeasonsSelector({
  relevantSeasons,
  selectedSeason,
  selectSeason
}: SeasonsSelectorProps) {
  return (
    <Select onValueChange={(value: TSeason) => {selectSeason(value)}}>
      <SelectTrigger className="w-[180px]">
        <SelectValue
          defaultValue={selectedSeason.season}
          placeholder={`${capitalizeFirstLetter(selectedSeason.season)} ${
            selectedSeason.year
          }`}
        />
      </SelectTrigger>
      <SelectContent>
        {relevantSeasons.map((season) => {
          return (
            <SelectItem key={season.season} value={season.season}>
              {`${capitalizeFirstLetter(season.season)} ${season.year}`}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
}

export default SeasonsSelector;
