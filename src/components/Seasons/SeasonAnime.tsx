import { Media } from "@/__generated__/graphql";
import Image from "next/image";

function SeasonAnime({ media }: { media: NonNullable<Media> }) {
  const windowWidth = window.innerWidth;

  return (
    <div className="max-w-[230px]">
      <Image
        src={media.coverImage?.extraLarge ? media.coverImage.extraLarge : ""}
        alt={`${media.title?.english} cover image`}
        width={230}
        height={332}
      />

      <h3>{media.title?.english}</h3>
      <p>{media.startDate?.day}</p>
      <p>{media.startDate?.month}</p>
      <p>{media.startDate?.year}</p>
    </div>
  );
}

export default SeasonAnime;
