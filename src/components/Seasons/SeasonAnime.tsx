import { Media } from "@/__generated__/graphql";
import Image from "next/image";
import { useState } from "react";

function SeasonAnime({ media }: { media: NonNullable<Media> }) {
  const [imageIsLoading, setIsImageLoading] = useState<Boolean>(true);

  const handleImageLoad = () => {
    setIsImageLoading(false);
  };

  const imageBgColor = media.coverImage?.color
    ? media.coverImage.color
    : "hsl(0 0% 15%)";

  return (
    <div className="max-w-[230px]">
      <div className="relative w-[230px] h-[332px]">
        {/** Preview */}
        <Image
          src={media.coverImage?.medium ? media.coverImage.medium : ""}
          alt={`${media.title?.english} cover image`}
          fill={true}
          objectFit="cover"
          objectPosition="center"
          style={{
            zIndex: 1,
            backgroundColor: imageBgColor,
            visibility: imageIsLoading ? "visible" : "hidden",
          }}
        />
        <Image
          src={media.coverImage?.extraLarge ? media.coverImage.extraLarge : ""}
          alt={`${media.title?.english} cover image`}
          fill={true}
          objectFit="cover"
          objectPosition="center"
          onLoadingComplete={handleImageLoad}
          style={{
            zIndex: 2,
            backgroundColor: imageBgColor,
            opacity: imageIsLoading ? 0 : 1,
            transitionProperty: "opacity",
            transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
            transitionDuration: "150ms",
          }}
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
