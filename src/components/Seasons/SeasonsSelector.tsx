import { TRelevantSeasons, TSeasonYearPair } from "@/lib/types/seasons.types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../shadcn/ui/select";

import {
  capitalizeFirstLetter,
  generateParamFromSeasonYearPair,
} from "@./src/lib/utils";

interface SeasonsSelectorProps {
  relevantSeasons: TRelevantSeasons;
  selectedSeason: TSeasonYearPair;
  selectSeason: (season: string) => void;
  className?: string;
}

function SeasonsSelector({
  relevantSeasons,
  selectedSeason,
  selectSeason,
  className,
}: SeasonsSelectorProps) {
  return (
    <div className={className}>
      <Select
        onValueChange={(value: string) => {
          selectSeason(value);
        }}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue
            defaultValue={generateParamFromSeasonYearPair(selectedSeason)}
            placeholder={`${capitalizeFirstLetter(selectedSeason.season)} ${
              selectedSeason.year
            }`}
          />
        </SelectTrigger>
        <SelectContent>
          {relevantSeasons.map((season) => {
            return (
              <SelectItem
                key={season.season}
                value={generateParamFromSeasonYearPair(season)}
              >
                {`${capitalizeFirstLetter(season.season)} ${season.year}`}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </div>
  );
}

export default SeasonsSelector;
