import { Fonts } from "@lib/constants";
import type { Color, Font } from "@lib/types";
import { Typography } from "./Typography";

type BodyProps = {
  font?: Font;
  color?: Color;
  className?: string;
  children: React.ReactNode;
};

const Body: React.FC<BodyProps> = ({
  font = Fonts.SK_MODERNIST,
  color,
  className,
  children,
}) => {
  return (
    <Typography
      as="p"
      font={font}
      size="text-base"
      className={className}
      color={color}
    >
      {children}
    </Typography>
  );
};

export { Body };
