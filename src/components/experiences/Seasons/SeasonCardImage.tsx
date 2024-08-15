import { cn } from "@root/src/lib/utils";
import Image from "next/image";
import { useState } from "react";

type TSeasonCardImageProps = {
  imageSrc: string;
  imageBgColor?: string | null;
  alt: string;
  className?: string;
};

const SeasonCardImage = ({
  imageSrc,
  imageBgColor,
  alt,
  className,
}: TSeasonCardImageProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div
      className="relative w-[160px] h-[240px] sm:w-[200px] sm:h-[300px] rounded-md overflow-hidden"
      style={{
        backgroundColor: imageBgColor ? imageBgColor : "hsl(var(--primary))",
      }} // inline style: tw cant generate classes with dynamic color
    >
      <Image
        src={imageSrc}
        alt={alt}
        fill={true}
        sizes="200px 300px"
        onLoad={() => setImageLoaded(true)}
        className={cn(
          "z-[1] object-cover object-center transition-opacity duration-500 ease-in",
          {
            "opacity-0": !imageLoaded,
            "opacity-1": imageLoaded,
          },
          className
        )}
      />
    </div>
  );
};

export { SeasonCardImage };
