import { TRelevantSeasons, TSeasonYearPair } from "@lib/types/seasons.types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../shadcn/ui/select";

import { capitalizeFirstLetter } from "@root/src/lib/utils/common.utils";
import { generateParamFromSeasonYearPair } from "@root/src/lib/utils/seasons.utils";

interface TSeasonsSelectorProps {
  relevantSeasons: TRelevantSeasons;
  selectedSeason: TSeasonYearPair;
  handleSelectSeason: (season: string) => void;
  className?: string;
}

function SeasonsSelector({
  relevantSeasons,
  selectedSeason,
  handleSelectSeason,
  className,
}: TSeasonsSelectorProps) {
  return (
    <div className={className}>
      <Select
        onValueChange={(value: string) => {
          handleSelectSeason(value);
        }}
      >
        <SelectTrigger className="sm:w-[160px] px-5 rounded-full w-full shadow-xl">
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
