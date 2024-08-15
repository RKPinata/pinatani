import { FontMap, Fonts, TextColorMap } from "@lib/constants";
import type { Color, Font, TailwindTextSize } from "@lib/types";
import { cn } from "@lib/utils";
import React from "react";

type TypographyElement = "p" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "span";

type TypographyProps = {
  as?: TypographyElement;
  font?: Font;
  size?: TailwindTextSize;
  color?: Color;
  className?: string;
  children: React.ReactNode;
};

/**
 * Typography component for rendering text with different styles.
 *
 * @param {TypographyElement} as - HTML element to render as.
 * @param {Fonts} font - Font to use for the text.
 * @param {TailwindTextSize} size - Text size.
 * @param {Color} color - Text color.
 * @param {string} className - Additional classes.
 * @param {React.ReactNode} children - Content to render inside the typography element.
 * @returns {JSX.Element} The styled text element.
 */
const Typography: React.FC<TypographyProps> = ({
  as: HTMLTextElement = "p",
  font = Fonts.SK_MODERNIST,
  size = "text-base",
  color = "primary",
  className,
  children,
}) => {
  const colorClassName = TextColorMap[color];
  const fontClassName = FontMap[font];

  return (
    <HTMLTextElement
      className={cn(size, colorClassName, fontClassName, className)}
    >
      {children}
    </HTMLTextElement>
  );
};

export { Typography };
