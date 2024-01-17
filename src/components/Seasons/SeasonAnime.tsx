import { Badge } from "@/components/shadcn/ui/badge";
import { TSelectedSeasonsQueryMedia } from "@/lib/types/seasons.types";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";

function SeasonAnime({
  media,
}: {
  media: NonNullable<TSelectedSeasonsQueryMedia>;
}) {
  const [imageLoaded, setImageLoaded] = useState<Boolean>(false);

  const imageBgColor = media.coverImage?.color
    ? media.coverImage.color
    : "hsl(0 0% 15%)";

  return (
    <div className="max-w-[230px] bg-card rounded-md">
      <div
        className="relative w-[160px] h-[240px] sm:w-[200px] sm:h-[300px] rounded-md overflow-hidden"
        style={{
          backgroundColor: imageBgColor,
        }} // inline style: tw cant generate classes with dynamic color
      >
        <Image
          src={media.coverImage?.extraLarge ? media.coverImage.extraLarge : ""}
          alt={`${media.title?.english} cover image`}
          fill={true}
          sizes="200px 300px"
          onLoad={() => setImageLoaded(true)}
          className={cn(
            "z-[1] object-cover object-center transition-opacity duration-500 ease-in",
            {
              "opacity-0": !imageLoaded,
              "opacity-1": imageLoaded,
            }
          )}
        />

        {/* Overlay */}
        <Badge
          variant="secondary"
          className="absolute z-[2] bottom-1 left-2 font-semibold text-foreground"
        >
          {media.format ? media.format : ""}
        </Badge>
      </div>

      {/** Content */}
      <div className="px-3 py-3 flex flex-col gap-3">
        <div className="border-b pb-3">
          <h3 className="h-[40px] overflow-hidden line-clamp-2 text-sm font-semibold text-stone-300">
            {media.title?.english ||
              media.title?.romaji ||
              media.title?.native ||
              "Title Unavailable"}
          </h3>
        </div>
        <div className="flex flex-wrap items-start gap-1 h-[48px] overflow-hidden">
          {media.genres?.length === 0 ? (
            <Badge variant="secondary" className="text-stone-400">
              Unknown
            </Badge>
          ) : (
            media.genres?.map((genre) => {
              return (
                <Badge variant="outline" key={genre} className="text-stone-400">
                  {genre}
                </Badge>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

export default SeasonAnime;
