import { Media } from "@/__generated__/graphql";
import { Badge } from "@/components/shadcn/ui/badge";
import { cn } from "@/lib/utils";
import { Info } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Button } from "../shadcn/ui/button";

function SeasonAnime({ media }: { media: NonNullable<Media> }) {
  const [previewLoaded, setPreviewLoaded] = useState<Boolean>(false);
  const [imageLoaded, setImageLoaded] = useState<Boolean>(false);

  const imageBgColor = media.coverImage?.color
    ? media.coverImage.color
    : "hsl(0 0% 15%)";

  return (
    <div className="max-w-[230px] bg-card rounded-md">
      <div className="relative w-[160px] h-[240px] sm:w-[200px] sm:h-[300px] rounded-md overflow-hidden">
        {/** Preview Image */}
        <Image
          src={media.coverImage?.medium ? media.coverImage.medium : ""}
          alt={`${media.title?.english} cover image`}
          fill={true}
          sizes="200px 300px"
          onLoad={() => setPreviewLoaded(true)}
          className={cn("z-[1] object-cover object-center", {
            "blur-sm": previewLoaded,
          })}
          style={{
            backgroundColor: imageBgColor,
          }} // inline style: tw cant generate classes with dynamic color
        />

        {/** Full Image */}
        <Image
          src={media.coverImage?.extraLarge ? media.coverImage.extraLarge : ""}
          alt={`${media.title?.english} cover image`}
          fill={true}
          sizes="200px 300px"
          onLoad={() => {
            setImageLoaded(true);
          }}
          className={cn(
            "z-[2] object-cover object-center bg-transparent transition-opacity duration-500 ease-in ",
            {
              "opacity-0": !imageLoaded,
              "opacity-1": imageLoaded,
            }
          )}
        />
      </div>

      <div className="px-3 py-3 flex flex-col gap-4">
        <div className="border-b pb-2">
          <h3 className="h-[40px] overflow-hidden line-clamp-2 text-sm font-semibold text-stone-300">
            {media.title?.english ||
              media.title?.romaji ||
              media.title?.native ||
              "Title Unavailable"}
          </h3>
        </div>
        <div className="flex flex-wrap items-start gap-1 h-[48px] overflow-hidden">
          {media.genres?.length === 0 ? (
            <Badge variant="secondary">Unknown</Badge>
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
        <div className="flex gap-2">
          <Button
            className="flex-1 border-none rounded-full text-sm text-slate-300"
            variant="secondary"
            size="sm"
          >
            Add To Watchlist
          </Button>
          <button className="text-slate-300">
            <Info />
          </button>
        </div>
      </div>
    </div>
  );
}

export default SeasonAnime;
