import { Fonts } from "@lib/constants";
import type { Color, Font } from "@lib/types";
import { Typography } from "./Typography";

type HeadingProps = {
  font?: Font;
  color?: Color;
  className?: string;
  children: React.ReactNode;
};

const Heading: React.FC<HeadingProps> = ({
  font = Fonts.WILD_WORLD,
  color,
  className,
  children,
}) => {
  return (
    <Typography
      as="h2"
      font={font}
      size="text-4xl"
      className={className}
      color={color}
    >
      {children}
    </Typography>
  );
};

export { Heading };
