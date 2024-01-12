import { Media } from "@/__generated__/graphql";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";

function SeasonAnime({ media }: { media: NonNullable<Media> }) {
  const [previewLoaded, setPreviewLoaded] = useState<Boolean>(false);
  const [imageLoaded, setImageLoaded] = useState<Boolean>(false);

  const imageBgColor = media.coverImage?.color
    ? media.coverImage.color
    : "hsl(0 0% 15%)";

  return (
    <div className="max-w-[230px]">
      <div className="relative w-[230px] h-[332px] rounded-md overflow-hidden">
        {/** Preview Image */}
        <Image
          src={media.coverImage?.medium ? media.coverImage.medium : ""}
          alt={`${media.title?.english} cover image`}
          fill={true}
          objectFit="cover"
          objectPosition="center"
          onLoadingComplete={() => setPreviewLoaded(true)}
          className={cn("z-[1] ", {
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
          objectFit="cover"
          objectPosition="center"
          onLoadingComplete={() => {
            setImageLoaded(true);
          }}
          className={cn(
            "z-[2] bg-transparent transition-opacity duration-500 ease-in",
            {
              "opacity-0": !imageLoaded,
              "opacity-1": imageLoaded,
            }
          )}
        />
      </div>

      <h3>{media.title?.english}</h3>
      <p>{media.startDate?.day}</p>
      <p>{media.startDate?.month}</p>
      <p>{media.startDate?.year}</p>
    </div>
  );
}

export default SeasonAnime;
